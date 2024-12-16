import { useQuasar } from 'quasar'
import { useMarketStore } from '../stores/marketStore'
import { useStorage } from './useStorage'
import { handleOrderStatusUpdate } from './useOrders'
import { useEventBus } from './eventBus'

export function useEvents() {
  const $q = useQuasar()
  const marketStore = useMarketStore()
  const storage = useStorage()
  const eventBus = useEventBus()

  // Create a queue for products waiting for their stalls
  let pendingProducts = [];

  const processProfileEvents = (e) => {
    try {
      marketStore.profiles = marketStore.profiles.filter((p) => p.pubkey !== e.pubkey)
      marketStore.profiles.push({ pubkey: e.pubkey, ...e.content })
      $q.localStorage.set("nostrmarket.profiles", marketStore.profiles)
    } catch (error) {
      console.warn(error)
    }
  }

  const processStallEvents = (e) => {
    let stall;
    try {
      stall = typeof e.content === 'string' ? JSON.parse(e.content) : e.content;
      console.log("Processing stall:", stall);
    } catch (error) {
      console.error('Failed to parse stall event content:', error);
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
      console.log("Adding new stall:", stallToProcess);
      marketStore.stalls.push(stallToProcess);
    } else {
      console.log("Updating existing stall");
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
      console.log(`Processing ${productsForThisStall.length} pending products for stall ${stallToProcess.id}`);
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
      console.log("Parsed product:", p);
    } catch (error) {
      console.error('Failed to parse product event content:', error);
      return;
    }

    const stall = marketStore.stalls.find(s => s.id === p.stall_id);

    if (!stall) {
      console.log("Queueing product waiting for stall:", p.stall_id);
      pendingProducts.push({ product: p, event: e });
      return;
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
    console.log("Finding product with id:", product.id, "and pubkey:", product.pubkey);
    const productIndex = marketStore.products.findIndex(
      (p) => p.id === product.id && p.pubkey === product.pubkey
    )
    console.log("Product index:", productIndex);

    if (productIndex === -1) {
      console.log("Adding new product");
      marketStore.products.push(product)
      return
    }

    console.log("Updating existing product");
    const existingProduct = marketStore.products[productIndex]
    existingProduct.relayUrls = [
      ...new Set(product.relayUrls.concat(existingProduct.relayUrls)),
    ]
    if (existingProduct.createdAt < product.createdAt) {
      marketStore.products.splice(productIndex, 1, product)
    }
  }

  const handlePaymentRequest = (json) => {
    console.warn("inside handle payment request")
    console.log(json)
    if (json.id && json.id !== marketStore.activeOrderId) {
      console.log('woof')
      return
    }
    if (!json.payment_options?.length) {
      console.log('meow')
      marketStore.qrCodeDialog.data.message = json.message || "Unexpected error"
      return
    }

    console.log('moo')
    console.log(json.payment_options)
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
    console.log("inside handlestructuredm")
    console.log(event, peerPubkey)
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
      console.warn("Unable to handle incomming DM", e);
    }
  }

  const processDmEvents = async (e) => {
    if (!marketStore.account?.pubkey) return
    const receiverPubkey = e.tags.find(
      ([k, v]) => k === "p" && v && v !== ""
    )[1]
    const isSentByMe = e.pubkey === marketStore.account.pubkey
    if (receiverPubkey !== marketStore.account.pubkey && !isSentByMe) {
      console.warn("Unexpected DM. Dropped!")
      return
    }

    const peerPubkey = isSentByMe ? receiverPubkey : e.pubkey
    e.content = await NostrTools.nip04.decrypt(
      marketStore.account.privkey,
      peerPubkey,
      e.content
    )

    storage.persistDMEvent(e, peerPubkey)

    if (isJson(e.content)) {
      console.warn("inside persistDMEvent")
      await handleStructuredDm(e, peerPubkey);
      // eventBus.processEvent(e, { type: 'dm', peerPubkey })
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

  // Register event handlers
  eventBus.registerHandler(0, processProfileEvents)
  eventBus.registerHandler(4, processDmEvents)
  eventBus.registerHandler(5, processDeleteEvents)
  eventBus.registerHandler(30017, processStallEvents)
  eventBus.registerHandler(30018, processProductEvents)

  return {
    processEvents: eventBus.processEvents
  }
}

function isJson(str) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
