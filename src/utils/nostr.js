/**
 * Nostr utility functions
 */

/**
 * Default relay URLs
 */
export const defaultRelays = [
  "wss://relay.damus.io",
  "wss://relay.snort.social",
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.zebedee.cloud",
  "wss://nostr.walletofsatoshi.com",
];

/**
 * Convert Nostr event to object with parsed content and tags
 * @param {Object} event - Nostr event
 * @returns {Object} - Processed event object
 */
export function eventToObj(event) {
  try {
    event.content = JSON.parse(event.content) || null;
  } catch {}

  return {
    ...event,
    ...Object.values(event.tags).reduce((acc, tag) => {
      let [key, value] = tag;
      if (key == "t") {
        return { ...acc, [key]: [...(acc[key] || []), value] };
      } else {
        return { ...acc, [key]: value };
      }
    }, {}),
  };
}

/**
 * Compare products for sorting
 * @param {Object} a - First product
 * @param {Object} b - Second product
 * @param {string} sortBy - Field to sort by
 * @param {string} sortOrder - Sort order ('asc' or 'desc')
 * @returns {number} - Comparison result
 */
export function productCompare(a, b, sortBy, sortOrder) {
  let va = a[sortBy];
  let vb = b[sortBy];
  if (sortOrder !== "asc") {
    [vb, va] = [va, vb];
  }
  if (!va && !vb) return 0;
  if (!va) return -1;
  if (!vb) return 1;

  if (Array.isArray(va)) {
    return va.join().localeCompare(vb.join());
  }
  if (typeof va === "string") {
    return va.localeCompare(vb);
  }
  return va - vb;
}