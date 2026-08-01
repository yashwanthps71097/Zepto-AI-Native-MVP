// Simple in-memory mock database for category catalog and user transaction history

const CATEGORIES = [
  "Fruits & Vegetables",
  "Dairy, Bread & Eggs",
  "Cold Drinks & Juices",
  "Snacks & Munchies",
  "Breakfast & Instant Food",
  "Sweet Craving",
  "Tea, Coffee & More",
  "Atta, Rice, Oil & Dal",
  "Masala & Spices",
  "Chicken, Meat & Fish",
  "Organic & Healthy",
  "Baby Care",
  "Pet Care",
  "Personal Care",
  "Cleaning Essentials",
  "Home Needs",
  "Ice Cream & Sweet Tooth",
  "Biscuits & Cookies",
  "Electronics",
  "Home Appliances",
  "Shops",
  "Fashion"
];

// Mock historical transactions spanning the last 90 days
// Format: { userId, timestamp, category, amount }
const TRANSACTION_HISTORY = [
  // User 1: Regular Grocery & Dairy Buyer (No Baby, Pet or Home Organization)
  { userId: "1", date: "2026-06-01", category: "Fruits & Vegetables", amount: 250 },
  { userId: "1", date: "2026-06-05", category: "Dairy, Bread & Eggs", amount: 120 },
  { userId: "1", date: "2026-06-12", category: "Fruits & Vegetables", amount: 300 },
  { userId: "1", date: "2026-06-15", category: "Snacks & Munchies", amount: 90 },
  { userId: "1", date: "2026-07-10", category: "Dairy, Bread & Eggs", amount: 140 },
  { userId: "1", date: "2026-07-28", category: "Fruits & Vegetables", amount: 280 },

  // User 2: Snack and Beverage heavy shopper (Potential candidate for Personal Care/Home items)
  { userId: "2", date: "2026-05-15", category: "Snacks & Munchies", amount: 450 },
  { userId: "2", date: "2026-06-01", category: "Cold Drinks & Juices", amount: 200 },
  { userId: "2", date: "2026-07-02", category: "Snacks & Munchies", amount: 380 },
  { userId: "2", date: "2026-07-20", category: "Cold Drinks & Juices", amount: 180 }
];

// Memory store for telemetry logs (impressions, clicks, conversions)
const telemetryLogs = [];

module.exports = {
  CATEGORIES,
  TRANSACTION_HISTORY,
  telemetryLogs
};
