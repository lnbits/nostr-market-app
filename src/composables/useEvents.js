import { useQuasar } from 'quasar'
import { useMarketStore } from '../stores/marketStore'
import { useStorage } from './useStorage'
import { useEventBus } from './eventBus'

export function useEvents() {
  const $q = useQuasar()
  const marketStore = useMarketStore()
  const storage = useStorage()
  const eventBus = useEventBus()

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
    processStall({
      ...e.content,
      id: e.d,
      pubkey: e.pubkey,
      createdAt: e.created_at,
      eventId: e.id,
      relayUrls: [e.relayUrl],
    })
  }

  const processStall = (stall) => {
    const stallIndex = marketStore.stalls.findIndex(
      (s) => s.id === stall.id && s.pubkey === stall.pubkey
    )
    if (stallIndex === -1) {
      marketStore.stalls.push(stall)
      return
    }

    const existingStall = marketStore.stalls[stallIndex]

    if (existingStall.createdAt < stall.createdAt) {
      marketStore.stalls.splice(stallIndex, 1, stall)
      marketStore.products
        .filter((p) => p.pubkey === stall.pubkey && p.stall_id === stall.id)
        .forEach((p) => (p.stallName = stall.name))
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

    const stall = marketStore.stalls.find((s) => s.id == p.stall_id)
    console.log("Found stall:", stall);

    if (!stall) {
      console.log("No stall found for stall_id:", p.stall_id);
      return;
    }

    if (p.currency != "sat") {
      p.formatedPrice = marketStore.getAmountFormated(p.price, p.currency)
    }

    const productToProcess = {
      ...p,
      stallName: stall.name,
      images: p.images || [p.image],
      pubkey: e.pubkey,
      id: e.d,
      categories: e.t,
      eventId: e.id,
      createdAt: e.created_at,
      relayUrls: [e.relayUrl],
    };

    console.log("Processing product:", productToProcess);
    processProduct(productToProcess);
    console.log("Current products array:", marketStore.products);
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
      eventBus.processEvent(e, { type: 'dm', peerPubkey })
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
