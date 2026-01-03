import { useAppStorage } from './useAppStorage';

/**
 * @deprecated Use useAppStorage instead
 * This file is kept for backward compatibility
 */
export function useStorage() {
  const appStorage = useAppStorage();
  
  // Backward compatibility - delegate to new storage system
  const restoreFromStorage = () => {
    appStorage.initializeAppData();
  };

  const persistStallsAndProducts = () => {
    appStorage.persistStallsAndProducts();
  };

  const persistRelaysData = () => {
    appStorage.persistRelaysData();
  };

  const persistDMEvent = (event, peerPubkey) => {
    appStorage.persistDMEvent(event, peerPubkey);
  };

  const persistOrderUpdate = (pubkey, eventCreatedAt, orderUpdate) => {
    appStorage.persistOrderUpdate(pubkey, eventCreatedAt, orderUpdate);
  };

  return {
    restoreFromStorage,
    persistStallsAndProducts,
    persistOrderUpdate,
    persistRelaysData,
    persistDMEvent,
  };
}