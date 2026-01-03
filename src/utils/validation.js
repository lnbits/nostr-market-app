/**
 * Validation utility functions
 */

/**
 * Check if a string is valid JSON
 * @param {string} str - String to validate
 * @returns {boolean} - True if valid JSON
 */
export function isJson(str) {
  if (typeof str !== "string") {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Check if a key is valid (supports both hex and bech32 formats)
 * @param {string} key - Key to validate
 * @param {string} prefix - Expected prefix for bech32 keys (default: "n")
 * @returns {boolean} - True if valid key
 */
export function isValidKey(key, prefix = "n") {
  try {
    if (key && key.startsWith(prefix)) {
      let { _, data } = NostrTools.nip19.decode(key);
      key = data;
    }
    return isValidKeyHex(key);
  } catch (error) {
    return false;
  }
}

/**
 * Check if a key is valid hex format
 * @param {string} key - Key to validate
 * @returns {boolean} - True if valid hex key
 */
export function isValidKeyHex(key) {
  return !!key?.toLowerCase()?.match(/^[0-9a-f]{64}$/);
}

/**
 * Check if a string is a valid image URL
 * @param {string} string - URL to validate
 * @returns {boolean} - True if valid image URL
 */
export function isValidImageUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}