import { useQuasar } from 'quasar'
import { useMarketStore } from '../stores/marketStore'
import { useStorage } from './useStorage'
import { useAppStorage } from './useAppStorage'
import { handleOrderStatusUpdate } from './useOrders'
import { isJson } from '../utils'
import { STORAGE_KEYS } from '../utils/storage-keys'
import { useLogger } from './useLogger'

export function useEvents() {
  const $q = useQuasar()
  const marketStore = useMarketStore()
  const storage = useStorage()
  const appStorage = useAppStorage()
  const logger = useLogger('events')

  // Create a queue for products waiting for their stalls
  let pendingProducts = [];
  
  // Track processed event IDs to prevent duplicates
  const processedEventIds = new Set()

  const processProfileEvents = (e) => {
    try {
      marketStore.profiles = marketStore.profiles.filter((p) => p.pubkey !== e.pubkey)
      marketStore.profiles.push({ pubkey: e.pubkey, ...e.content })
      appStorage.persistCoreData()
    } catch (error) {
      logger.warn('Error processing profile event', error)
    }
  }

  const processStallEvents = (e) => {
    let stall;
    try {
      stall = typeof e.content === 'string' ? JSON.parse(e.content) : e.content;
      logger.debug('Processing stall from merchant', { 
        stallId: stall.id || e.d,
        stallName: stall.name,
        merchantPubkey: e.pubkey,
        relayUrl: e.relayUrl
      });
    } catch (error) {
      logger.error('Failed to parse stall event content from merchant', { merchantPubkey: e.pubkey, error });
      return;
    }

    const stallToProcess = {
      ...stall,
      pubkey: e.pubkey,
      id: e.d || stall.id,
      eventId: e.id,
      createdAt: e.created_at,
      relayUrls: [e.relayUrl],
    };

    const stallIndex = marketStore.stalls.findIndex(
      (s) => s.id === stallToProcess.id && s.pubkey === stallToProcess.pubkey
    );

    if (stallIndex === -1) {
      logger.debug('Adding new stall from merchant', { 
        stallId: stallToProcess.id,
        stallName: stallToProcess.name,
        merchantPubkey: stallToProcess.pubkey,
        relayUrl: e.relayUrl
      });
      marketStore.stalls.push(stallToProcess);
    } else {
      logger.debug('Updating existing stall from merchant', {
        stallId: stallToProcess.id,
        stallName: stallToProcess.name,
        merchantPubkey: stallToProcess.pubkey,
        relayUrl: e.relayUrl
      });
      const existingStall = marketStore.stalls[stallIndex];
      if (existingStall.createdAt < stallToProcess.createdAt) {
        marketStore.stalls.splice(stallIndex, 1, stallToProcess);
      }
    }

    // Process any pending products that were waiting for this stall
    const productsForThisStall = pendingProducts.filter(
      item => item.product.stall_id === stallToProcess.id
    );

    if (productsForThisStall.length > 0) {
      logger.debug(`Processing ${productsForThisStall.length} pending products for stall ${stallToProcess.id}`);
      productsForThisStall.forEach(item => {
        processProductWithStall(item.product, item.event, stallToProcess);
      });

      // Remove processed products from pending queue
      pendingProducts = pendingProducts.filter(
        item => item.product.stall_id !== stallToProcess.id
      );
    }
  }

  const processProductEvents = (e) => {
    let p;
    try {
      p = typeof e.content === 'string' ? JSON.parse(e.content) : e.content;
      logger.debug('Processing product from merchant', { 
        productId: p.id || e.d,
        productName: p.name,
        stallId: p.stall_id,
        merchantPubkey: e.pubkey,
        relayUrl: e.relayUrl
      });
    } catch (error) {
      logger.error('Failed to parse product event content from merchant', { merchantPubkey: e.pubkey, error });
      return;
    }

    const stall = marketStore.stalls.find(s => s.id === p.stall_id);

    if (!stall) {
      logger.debug('Queueing product from merchant waiting for stall', { 
        productId: p.id || e.d,
        productName: p.name,
        stallId: p.stall_id,
        merchantPubkey: e.pubkey
      });
      pendingProducts.push({ product: p, event: e });
      return;
    }

    if (p.currencty != "sat") {
      p.formattedPrice = marketStore.getAmountFormatted(p.price, p.currency)
    }

    processProductWithStall(p, e, stall);
  }

  const processProductWithStall = (p, e, stall) => {
    const categories = e.tags
      .filter(tag => tag[0] === 't')
      .map(tag => tag[1]);
    const productToProcess = {
      ...p,
      stallName: stall.name,
      images: p.images || [p.image],
      pubkey: e.pubkey,
      id: e.d || p.id,
      categories: categories,
      eventId: e.id,
      createdAt: e.created_at,
      relayUrls: [e.relayUrl],
    };

    processProduct(productToProcess);
  }

  const processProduct = (product) => {
    logger.debug('Processing product from merchant', { 
      productId: product.id, 
      productName: product.name,
      stallName: product.stallName,
      merchantPubkey: product.pubkey 
    });
    const productIndex = marketStore.products.findIndex(
      (p) => p.id === product.id && p.pubkey === product.pubkey
    )

    if (productIndex === -1) {
      logger.debug('Adding new product from merchant', {
        productId: product.id,
        productName: product.name,
        stallName: product.stallName,
        merchantPubkey: product.pubkey,
        price: product.price,
        currency: product.currency
      });
      marketStore.products.push(product)
      return
    }

    logger.debug('Updating existing product from merchant', {
      productId: product.id,
      productName: product.name,
      merchantPubkey: product.pubkey
    });
    const existingProduct = marketStore.products[productIndex]
    existingProduct.relayUrls = [
      ...new Set(product.relayUrls.concat(existingProduct.relayUrls)),
    ]
    if (existingProduct.createdAt < product.createdAt) {
      marketStore.products.splice(productIndex, 1, product)
    }
  }

  const handlePaymentRequest = (json) => {
    if (json.id && json.id !== marketStore.activeOrderId) {
      return
    }
    if (!json.payment_options?.length) {
      marketStore.qrCodeDialog.data.message = json.message || "Unexpected error"
      return
    }

    const paymentRequest = json.payment_options.find(
      (o) => o.type == "ln"
    ).link
    if (!paymentRequest) return
    marketStore.qrCodeDialog.data.payment_request = paymentRequest
    marketStore.qrCodeDialog.dismissMsg = $q.notify({
      timeout: 10000,
      message: "Waiting for payment...",
    })
  }

  const handleStructuredDm = async (event, peerPubkey) => {
    try {
      const jsonData = JSON.parse(event.content);
      if ([0, 1, 2].indexOf(jsonData.type) !== -1) {
        storage.persistOrderUpdate(peerPubkey, event.created_at, jsonData);
      }
      if (jsonData.type === 1) {
        handlePaymentRequest(jsonData);
      } else if (jsonData.type === 2) {
        handleOrderStatusUpdate(jsonData);
      }
    } catch (e) {
      logger.warn('Unable to handle incoming DM', e);
    }
  }

  const processDmEvents = async (e) => {
    if (!marketStore.account?.pubkey) return
    const receiverPubkey = e.tags.find(
      ([k, v]) => k === "p" && v && v !== ""
    )[1]
    const isSentByMe = e.pubkey === marketStore.account.pubkey
    if (receiverPubkey !== marketStore.account.pubkey && !isSentByMe) {
      logger.warn('Unexpected DM dropped', { senderPubkey: e.pubkey, receiverPubkey })
      return
    }

    const peerPubkey = isSentByMe ? receiverPubkey : e.pubkey
    e.content = await window.NostrTools.nip04.decrypt(
      marketStore.account.privkey,
      peerPubkey,
      e.content
    )

    storage.persistDMEvent(e, peerPubkey)

    if (isJson(e.content)) {
      await handleStructuredDm(e, peerPubkey);
    }
  }

  const processDeleteEvents = async (e) => {
    const deletedEventIds = (e.tags || [])
      .filter((t) => t[0] === "e")
      .map((t) => t[1])

    const deletedStallsIds = marketStore.stalls
      .filter(
        (s) => s.pubkey === e.pubkey && deletedEventIds.includes(s.eventId)
      )
      .map((s) => s.id)

    const isDeletedProduct = (p) =>
      p.pubkey === e.pubkey &&
      (deletedEventIds.includes(p.eventId) ||
        deletedStallsIds.includes(p.stall_id))
    marketStore.products = marketStore.products.filter((p) => !isDeletedProduct(p))

    const isDeletedStall = (s) =>
      s.pubkey === e.pubkey && deletedEventIds.includes(s.eventId)
    marketStore.stalls = marketStore.stalls.filter((s) => !isDeletedStall(s))
  }

  const processEvent = async (event, relayData) => {
    if (processedEventIds.has(event.id)) return
    processedEventIds.add(event.id)

    switch (event.kind) {
      case 0:
        return processProfileEvents(event)
      case 4:
        return processDmEvents(event)
      case 5:
        return processDeleteEvents(event)
      case 30017:
        return processStallEvents(event)
      case 30018:
        return processProductEvents(event)
    }
  }

  const processEvents = async (events, relayData) => {
    if (!events?.length) return

    for (const event of events) {
      await processEvent(event, relayData)
    }
  }

  return {
    processEvents,
    processEvent
  }
}

