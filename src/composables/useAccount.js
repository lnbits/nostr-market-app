import { useQuasar } from 'quasar'
import { useMarketStore } from '../stores/marketStore'
import { useRelay } from './useRelay'
import { useAppStorage } from './useAppStorage'
import { isValidKey } from '../utils'
import { STORAGE_KEYS } from '../utils/storage-keys'

export function useAccount() {
  const $q = useQuasar()
  const marketStore = useMarketStore()
  const { requeryAllRelays } = useRelay()
  const appStorage = useAppStorage()

  function generateKeyPair() {
    marketStore.accountDialog.data.key = window.NostrTools.generatePrivateKey()
    marketStore.accountDialog.data.watchOnly = false
  }

  function openAccountDialog() {
    marketStore.accountDialog.show = true
  }

  async function createAccount() {
    if (isValidKey(marketStore.accountDialog.data.key, "nsec")) {
      let { key, watchOnly } = marketStore.accountDialog.data
      if (key.startsWith("n")) {
        let { type, data } = window.NostrTools.nip19.decode(key)
        key = data
      }
      const privkey = watchOnly ? null : key
      const pubkey = watchOnly ? key : window.NostrTools.getPublicKey(key)
      const accountData = {
        privkey,
        pubkey,
        nsec: window.NostrTools.nip19.nsecEncode(key),
        npub: window.NostrTools.nip19.npubEncode(pubkey),
        useExtension: false,
      }
      appStorage.persistAccount(accountData)
      marketStore.accountDialog.data = {
        watchOnly: false,
        key: null,
      }
      marketStore.accountDialog.show = false
      marketStore.account = $q.localStorage.getItem(STORAGE_KEYS.ACCOUNT)
      await requeryAllRelays()
    }
    marketStore.accountDialog.show = false
  }

  function logout() {
    appStorage.clearAccount()
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
    appStorage.clearNonAccountData()
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
