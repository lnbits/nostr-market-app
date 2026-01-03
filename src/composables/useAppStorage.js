/**
 * App-specific storage composable
 * Handles application data persistence with proper typing and validation
 */

import { useLocalStorage } from './useLocalStorage';
import { useMarketStore } from '../stores/marketStore';
import { 
  STORAGE_KEYS, 
  getDirectMessageKey, 
  getOrdersKey, 
  extractPubkeyFromDMKey,
  extractPubkeyFromOrderKey,
  isDirectMessageKey,
  isOrdersKey
} from '../utils/storage-keys';

export function useAppStorage() {
  const localStorage = useLocalStorage();
  const marketStore = useMarketStore();

  /**
   * Initialize app data from localStorage
   * Replaces the complex restoreFromStorage function
   */
  const initializeAppData = () => {
    // Core app data
    marketStore.markets = localStorage.getItem(STORAGE_KEYS.MARKETS, []);
    marketStore.shoppingCarts = localStorage.getItem(STORAGE_KEYS.SHOPPING_CARTS, []);
    marketStore.profiles = localStorage.getItem(STORAGE_KEYS.PROFILES, []);
    marketStore.account = localStorage.getItem(STORAGE_KEYS.ACCOUNT, null);
    marketStore.stalls = localStorage.getItem(STORAGE_KEYS.STALLS, []);
    marketStore.products = localStorage.getItem(STORAGE_KEYS.PRODUCTS, []);

    // UI configuration
    const uiConfig = localStorage.getItem(STORAGE_KEYS.MARKETPLACE_CONFIG, {
      ui: { darkMode: true }
    });

    // Sort configuration
    const sortConfig = localStorage.getItem(STORAGE_KEYS.SORT, {});
    if (sortConfig.by) {
      marketStore.sort.by = sortConfig.by;
    }
    if (sortConfig.order) {
      marketStore.sort.order = sortConfig.order;
    }

    // App configuration
    marketStore.config = {
      ...marketStore.config,
      opts: { ...marketStore.config.opts, ...uiConfig }
    };

    // Orders data
    initializeOrdersData();

    // Read notes
    const readNotes = localStorage.getItem(STORAGE_KEYS.READ_NOTES, {});
    marketStore.readNotes = { ...marketStore.readNotes, ...readNotes };

    // Markets selection state
    marketStore.allMarketsSelected = !marketStore.markets.find(m => !m.selected);
  };

  /**
   * Initialize orders data from localStorage
   */
  const initializeOrdersData = () => {
    const orderKeys = localStorage.getKeysByPrefix(STORAGE_KEYS.ORDERS);
    orderKeys.forEach(key => {
      const pubkey = extractPubkeyFromOrderKey(key);
      marketStore.orders[pubkey] = localStorage.getItem(key, []);
    });
  };

  /**
   * Persist core app data
   */
  const persistCoreData = () => {
    localStorage.setItem(STORAGE_KEYS.MARKETS, marketStore.markets);
    localStorage.setItem(STORAGE_KEYS.SHOPPING_CARTS, marketStore.shoppingCarts);
    localStorage.setItem(STORAGE_KEYS.PROFILES, marketStore.profiles);
    localStorage.setItem(STORAGE_KEYS.STALLS, marketStore.stalls);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, marketStore.products);
  };

  /**
   * Persist stalls and products data
   */
  const persistStallsAndProducts = () => {
    localStorage.setItem(STORAGE_KEYS.STALLS, marketStore.stalls);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, marketStore.products);
  };

  /**
   * Persist relays data
   */
  const persistRelaysData = () => {
    const relaysData = Object.values(marketStore.relaysData)
      .filter(r => !!r)
      .map(relayData => ({
        lastEventAt: relayData.lastEventAt,
        relayUrl: relayData.relayUrl,
      }));
    
    localStorage.setItem(STORAGE_KEYS.RELAYS, relaysData);
  };

  /**
   * Persist account data
   */
  const persistAccount = (accountData) => {
    localStorage.setItem(STORAGE_KEYS.ACCOUNT, accountData);
  };

  /**
   * Persist markets data
   */
  const persistMarkets = () => {
    localStorage.setItem(STORAGE_KEYS.MARKETS, marketStore.markets);
  };

  /**
   * Persist UI configuration
   */
  const persistUiConfig = (config) => {
    localStorage.setItem(STORAGE_KEYS.MARKETPLACE_CONFIG, config);
  };

  /**
   * Persist sort configuration
   */
  const persistSortConfig = (sortBy, sortOrder) => {
    localStorage.setItem(STORAGE_KEYS.SORT, { by: sortBy, order: sortOrder });
  };

  /**
   * Persist read notes
   */
  const persistReadNotes = () => {
    localStorage.setItem(STORAGE_KEYS.READ_NOTES, marketStore.readNotes);
  };

  /**
   * Persist direct message event
   */
  const persistDMEvent = (event, peerPubkey) => {
    const key = getDirectMessageKey(peerPubkey);
    const dms = localStorage.getItem(key, {
      events: [],
      lastCreatedAt: 0,
    });

    // Check if event already exists
    const existingEvent = dms.events.find(e => e.id === event.id);
    if (existingEvent) return;

    // Add new event
    dms.events.push(event);
    dms.events.sort((a, b) => a.created_at - b.created_at);
    dms.lastCreatedAt = dms.events[dms.events.length - 1].created_at;
    dms.peerPubkey = peerPubkey;

    localStorage.setItem(key, dms);

    // Update store if needed
    if (marketStore.dmEvents?.peerPubkey === peerPubkey) {
      marketStore.dmEvents = localStorage.getItem(key, {});
    } else {
      // Force refresh
      marketStore.dmEvents = { ...marketStore.dmEvents };
    }
  };

  /**
   * Get direct messages for a peer
   */
  const getDirectMessages = (peerPubkey) => {
    const key = getDirectMessageKey(peerPubkey);
    return localStorage.getItem(key, {
      events: [],
      lastCreatedAt: 0,
    });
  };

  /**
   * Persist order update
   */
  const persistOrderUpdate = (pubkey, eventCreatedAt, orderUpdate) => {
    const key = getOrdersKey(pubkey);
    let orders = localStorage.getItem(key, []);
    const orderIndex = orders.findIndex(o => o.id === orderUpdate.id);

    if (orderIndex === -1) {
      // New order
      orders.unshift({
        ...orderUpdate,
        eventCreatedAt,
        createdAt: eventCreatedAt,
      });
    } else {
      // Update existing order
      let order = orders[orderIndex];

      if (orderUpdate.type === 0) {
        order.createdAt = eventCreatedAt;
        order = {
          ...order,
          ...orderUpdate,
          message: order.message || orderUpdate.message,
        };
      } else {
        order = order.eventCreatedAt < eventCreatedAt
          ? { ...order, ...orderUpdate }
          : { ...orderUpdate, ...order };
      }

      orders.splice(orderIndex, 1, order);
    }

    // Update store and localStorage
    marketStore.orders[pubkey] = orders;
    marketStore.orders = { ...marketStore.orders };
    localStorage.setItem(key, orders);
  };

  /**
   * Get orders for a pubkey
   */
  const getOrders = (pubkey) => {
    const key = getOrdersKey(pubkey);
    return localStorage.getItem(key, []);
  };

  /**
   * Clear account data
   */
  const clearAccount = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCOUNT);
  };

  /**
   * Clear all non-account data
   */
  const clearNonAccountData = () => {
    const allKeys = localStorage.getAllKeys();
    allKeys
      .filter(key => key !== STORAGE_KEYS.ACCOUNT)
      .forEach(key => localStorage.removeItem(key));
  };

  /**
   * Clear all app data
   */
  const clearAllData = () => {
    const allKeys = localStorage.getAllKeys();
    allKeys
      .filter(key => key.startsWith('nostrmarket.'))
      .forEach(key => localStorage.removeItem(key));
  };

  /**
   * Get all direct message keys
   */
  const getAllDMKeys = () => {
    return localStorage.getKeysByPrefix(STORAGE_KEYS.DIRECT_MESSAGES);
  };

  /**
   * Get all order keys
   */
  const getAllOrderKeys = () => {
    return localStorage.getKeysByPrefix(STORAGE_KEYS.ORDERS);
  };

  return {
    // Initialization
    initializeAppData,
    initializeOrdersData,

    // Core data persistence
    persistCoreData,
    persistStallsAndProducts,
    persistRelaysData,
    persistAccount,
    persistMarkets,
    persistUiConfig,
    persistSortConfig,
    persistReadNotes,

    // Direct messages
    persistDMEvent,
    getDirectMessages,
    getAllDMKeys,

    // Orders
    persistOrderUpdate,
    getOrders,
    getAllOrderKeys,

    // Cleanup
    clearAccount,
    clearNonAccountData,
    clearAllData,
  };
}