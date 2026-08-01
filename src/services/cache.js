// Simple in-memory cache manager with TTL (Time-to-Live) configuration

const store = new Map();

/**
 * Saves a payload in cache
 * @param {string} key Cache key
 * @param {any} value Data to store
 * @param {number} ttlSeconds Time-to-live in seconds (default 300s / 5 min)
 */
function set(key, value, ttlSeconds = 300) {
  const expiry = Date.now() + (ttlSeconds * 1000);
  store.set(key, { value, expiry });
}

/**
 * Retrieves a payload from cache if active and not expired
 * @param {string} key Cache key
 * @returns {any|null} Cached value or null if expired/non-existent
 */
function get(key) {
  const cachedItem = store.get(key);
  if (!cachedItem) return null;

  if (Date.now() > cachedItem.expiry) {
    store.delete(key); // Clear expired entry
    return null;
  }

  return cachedItem.value;
}

/**
 * Flush cache entries (for debug/reset)
 */
function flush() {
  store.clear();
}

module.exports = {
  set,
  get,
  flush
};
