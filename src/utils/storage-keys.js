/**
 * Centralized localStorage key constants
 * All localStorage keys used throughout the application
 */

export const STORAGE_KEYS = {
  // Core app data
  ACCOUNT: 'nostrmarket.account',
  MARKETS: 'nostrmarket.markets',
  STALLS: 'nostrmarket.stalls',
  PRODUCTS: 'nostrmarket.products',
  PROFILES: 'nostrmarket.profiles',
  SHOPPING_CARTS: 'nostrmarket.shoppingCarts',
  RELAYS: 'nostrmarket.relays',
  
  // UI state
  SORT: 'nostrmarket.sort',
  MARKETPLACE_CONFIG: 'nostrmarket.marketplaceConfig',
  READ_NOTES: 'nostrmarket.readNotes',
  
  // Dynamic keys (with prefixes)
  DIRECT_MESSAGES: 'nostrmarket.dm.',
  ORDERS: 'nostrmarket.orders.',
};

/**
 * Helper functions for dynamic keys
 */
export const getDirectMessageKey = (pubkey) => `${STORAGE_KEYS.DIRECT_MESSAGES}${pubkey}`;
export const getOrdersKey = (pubkey) => `${STORAGE_KEYS.ORDERS}${pubkey}`;

/**
 * Check if a key is a direct message key
 */
export const isDirectMessageKey = (key) => key.startsWith(STORAGE_KEYS.DIRECT_MESSAGES);

/**
 * Check if a key is an orders key
 */
export const isOrdersKey = (key) => key.startsWith(STORAGE_KEYS.ORDERS);

/**
 * Get all app-related keys (for cleanup operations)
 */
export const getAllAppKeys = () => Object.values(STORAGE_KEYS).filter(key => !key.endsWith('.'));

/**
 * Extract pubkey from dynamic keys
 */
export const extractPubkeyFromDMKey = (key) => key.substring(STORAGE_KEYS.DIRECT_MESSAGES.length);
export const extractPubkeyFromOrderKey = (key) => key.substring(STORAGE_KEYS.ORDERS.length);