const { TRANSACTION_HISTORY, CATEGORIES } = require("../data/mockDb");

/**
 * Builds user's profile including active categories (bought in past 90 days)
 * and candidate discovery categories (categories never bought in past 90 days).
 * @param {string} userId 
 * @returns {object} User category profile
 */
function getUserCategoryProfile(userId) {
  // Filter transactions for this user
  const userTx = TRANSACTION_HISTORY.filter(tx => tx.userId === userId);

  // Extract unique categories purchased
  const purchasedCategories = new Set(userTx.map(tx => tx.category));

  // Excluded categories = active categories already purchased in the last 90 days
  const excludedCategories = Array.from(purchasedCategories);

  // Eligible Discovery Categories = Categories that exist in Catalog but NOT purchased
  const discoveryCandidates = CATEGORIES.filter(cat => !purchasedCategories.has(cat));

  return {
    userId,
    purchasedCategories: excludedCategories,
    discoveryCandidates,
    totalPastOrders: userTx.length
  };
}

module.exports = {
  getUserCategoryProfile
};
