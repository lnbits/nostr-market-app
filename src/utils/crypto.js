/**
 * Cryptography utility functions
 */

/**
 * Generate SHA-256 hash of a string
 * @param {string} string - String to hash
 * @returns {Promise<string>} - Hex encoded hash
 */
export async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}