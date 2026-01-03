import { useQuasar } from 'quasar'
import { useMarketStore } from '../stores/marketStore'
import { useShoppingCart } from '../composables/useShoppingCart'
import { useStorage } from '../composables/useStorage'
import { useRelay } from '../composables/useRelay'
import { useLogger } from './useLogger'

const marketStore = useMarketStore()

export function handleOrderStatusUpdate(jsonData) {
  const $q = useQuasar()
  if (jsonData.id && jsonData.id !== marketStore.activeOrderId) {
    return
  }
  if (marketStore.qrCodeDialog.dismissMsg) {
    marketStore.qrCodeDialog.dismissMsg()
  }
  marketStore.qrCodeDialog.show = false
  const message = jsonData.shipped
    ? "Order shipped"
    : jsonData.paid
      ? "Order paid"
      : "Order notification"
  $q.notify({
    type: "positive",
    message: message,
    caption: jsonData.message || "",
  })
}

export function useOrders() {
  const $q = useQuasar()
  const shoppingCart = useShoppingCart()
  const storage = useStorage()
  const relayService = useRelay()
  const logger = useLogger('orders')

  const placeOrder = async ({ event, order, cartId }) => {
    if (!marketStore.account?.privkey) {
      marketStore.openAccountDialog()
      return
    }
    try {
      marketStore.activeOrderId = order.id
      event.content = await window.NostrTools.nip04.encrypt(
        marketStore.account.privkey,
        marketStore.checkoutStall.pubkey,
        JSON.stringify(order)
      )

      event.id = window.NostrTools.getEventHash(event)
      event.sig = await window.NostrTools.getSignature(event, marketStore.account.privkey)

      await sendOrderEvent(event)
      storage.persistOrderUpdate(
        marketStore.checkoutStall.pubkey,
        event.created_at,
        order
      )
      shoppingCart.removeCart(cartId)
      marketStore.setActivePage("shopping-cart-list")
    } catch (error) {
      logger.warn('Failed to place order', error)
      $q.notify({
        type: "warning",
        message: "Failed to place order!",
      })
    }
  }

  const sendOrderEvent = async (event) => {
    const merchantPubkey = event.tags
      .filter((t) => t[0] === "p")
      .map((t) => t[1])

    const merchantRelays = relayService.findRelaysForMerchant(merchantPubkey[0])
    const relayCount = await relayService.publishEventToRelays(event, merchantRelays)
    $q.notify({
      type: relayCount ? "positive" : "warning",
      message: relayCount
        ? `The order has been placed (${relayCount} relays)!`
        : "Order could not be placed",
    })
    marketStore.qrCodeDialog = {
      data: {
        payment_request: null,
        message: null,
      },
      dismissMsg: null,
      show: !!relayCount,
    }
  }


  return {
    placeOrder,
  }
}
