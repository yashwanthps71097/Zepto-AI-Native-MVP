// Mock dark store inventory checker

// Simulating category stock quantities at the user's localized dark store hub
const DARK_STORE_INVENTORY = {
  "Fruits & Vegetables": 150,
  "Dairy, Bread & Eggs": 80,
  "Cold Drinks & Juices": 90,
  "Snacks & Munchies": 120,
  "Breakfast & Instant Food": 75,
  "Sweet Craving": 110,
  "Tea, Coffee & More": 65,
  "Atta, Rice, Oil & Dal": 130,
  "Masala & Spices": 85,
  "Chicken, Meat & Fish": 40,
  "Organic & Healthy": 50,
  "Baby Care": 0, // Mock: Completely Out of Stock!
  "Pet Care": 25,
  "Personal Care": 45,
  "Cleaning Essentials": 35,
  "Home Needs": 55,
  "Ice Cream & Sweet Tooth": 70,
  "Biscuits & Cookies": 85,
  "Electronics": 95,
  "Home Appliances": 50,
  "Shops": 60,
  "Fashion": 75
};

/**
 * Validates if a category is currently in-stock at the localized dark store
 * @param {string} category Category name to check
 * @returns {boolean} True if category has active inventory (> 2 SKUs)
 */
function isCategoryInStock(category) {
  const stock = DARK_STORE_INVENTORY[category];
  return typeof stock === "number" && stock > 2;
}

module.exports = {
  isCategoryInStock,
  DARK_STORE_INVENTORY
};
