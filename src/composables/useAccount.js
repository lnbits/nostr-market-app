import { useQuasar } from 'quasar'
import { useMarketStore } from '../stores/marketStore'
import { useRelay } from './useRelay'

export function useAccount() {
  const $q = useQuasar()
  const marketStore = useMarketStore()
  const { requeryAllRelays } = useRelay()

  function generateKeyPair() {
    marketStore.accountDialog.data.key = NostrTools.generatePrivateKey()
    marketStore.accountDialog.data.watchOnly = false
  }

  function openAccountDialog() {
    marketStore.accountDialog.show = true
  }

  async function createAccount() {
    if (isValidKey(marketStore.accountDialog.data.key, "nsec")) {
      let { key, watchOnly } = marketStore.accountDialog.data
      if (key.startsWith("n")) {
        let { type, data } = NostrTools.nip19.decode(key)
        key = data
      }
      const privkey = watchOnly ? null : key
      const pubkey = watchOnly ? key : NostrTools.getPublicKey(key)
      $q.localStorage.set("nostrmarket.account", {
        privkey,
        pubkey,
        nsec: NostrTools.nip19.nsecEncode(key),
        npub: NostrTools.nip19.npubEncode(pubkey),
        useExtension: false,
      })
      marketStore.accountDialog.data = {
        watchOnly: false,
        key: null,
      }
      marketStore.accountDialog.show = false
      marketStore.account = $q.localStorage.getItem("nostrmarket.account")
      await requeryAllRelays()
    }
    marketStore.accountDialog.show = false
  }

  function logout() {
    window.localStorage.removeItem("nostrmarket.account")
    clearNonAccountData()
    window.location.href = window.location.origin + window.location.pathname
    marketStore.account = null
    marketStore.accountMetadata = null
  }

  // commented out lines were added by cursor
  function clearAllData() {
    $q.dialog({
      // title: 'Confirm',
      message: "This will remove all information about merchants, products, relays and others. You will NOT be logged out. Do you want to proceed?",
      cancel: true,
      // persistent: true
    }).onOk(async () => {
      clearNonAccountData()
      window.location.href = window.location.origin + window.location.pathname
    })
  }

  function clearNonAccountData() {
    $q.localStorage
      .getAllKeys()
      .filter((key) => key !== "nostrmarket.account")
      .forEach((key) => window.localStorage.removeItem(key))
      marketStore.orders = [];
      marketStore.config = { opts: null };
      marketStore.shoppingCarts = [];
      marketStore.checkoutCart = null;
  }

  return {
    generateKeyPair,
    openAccountDialog,
    createAccount,
    logout,
    clearAllData,
  }
}
