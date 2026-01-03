/**
 * Generic localStorage composable
 * Provides a clean interface for localStorage operations
 */

import { useQuasar } from 'quasar';
import { useLogger } from './useLogger';

export function useLocalStorage() {
  const $q = useQuasar();
  const logger = useLogger('storage');

  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} - Stored value or default
   */
  const getItem = (key, defaultValue = null) => {
    try {
      return $q.localStorage.getItem(key) || defaultValue;
    } catch (error) {
      logger.warn(`Error getting localStorage item "${key}"`, error);
      return defaultValue;
    }
  };

  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} - Success status
   */
  const setItem = (key, value) => {
    try {
      $q.localStorage.set(key, value);
      return true;
    } catch (error) {
      logger.warn(`Error setting localStorage item "${key}"`, error);
      return false;
    }
  };

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} - Success status
   */
  const removeItem = (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.warn(`Error removing localStorage item "${key}"`, error);
      return false;
    }
  };

  /**
   * Check if key exists in localStorage
   * @param {string} key - Storage key
   * @returns {boolean} - Whether key exists
   */
  const hasItem = (key) => {
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      logger.warn(`Error checking localStorage item "${key}"`, error);
      return false;
    }
  };

  /**
   * Clear all localStorage items
   * @returns {boolean} - Success status
   */
  const clear = () => {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      logger.warn('Error clearing localStorage', error);
      return false;
    }
  };

  /**
   * Get all keys from localStorage
   * @returns {string[]} - Array of keys
   */
  const getAllKeys = () => {
    try {
      return $q.localStorage.getAllKeys();
    } catch (error) {
      logger.warn('Error getting all localStorage keys', error);
      return [];
    }
  };

  /**
   * Get keys matching a prefix
   * @param {string} prefix - Key prefix to match
   * @returns {string[]} - Array of matching keys
   */
  const getKeysByPrefix = (prefix) => {
    try {
      return getAllKeys().filter(key => key.startsWith(prefix));
    } catch (error) {
      logger.warn(`Error getting keys with prefix "${prefix}"`, error);
      return [];
    }
  };

  /**
   * Remove all keys matching a prefix
   * @param {string} prefix - Key prefix to match
   * @returns {boolean} - Success status
   */
  const removeKeysByPrefix = (prefix) => {
    try {
      const keysToRemove = getKeysByPrefix(prefix);
      keysToRemove.forEach(key => removeItem(key));
      return true;
    } catch (error) {
      logger.warn(`Error removing keys with prefix "${prefix}"`, error);
      return false;
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
    hasItem,
    clear,
    getAllKeys,
    getKeysByPrefix,
    removeKeysByPrefix,
  };
}