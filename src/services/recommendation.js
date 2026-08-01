const cache = require("./cache");
const inventory = require("./inventory");
const groqService = require("./groqService");
const userProfileService = require("./userProfile");
const contextService = require("./context");

/**
 * Static fallback mechanism when Groq API fails or times out
 * @param {object} userProfile User profile data containing candidates
 * @param {object} context Context signals
 * @returns {object} Fallback recommendation list
 */
const PRODUCT_CATEGORY_MAP = {
  "Organic Broccoli": "Fruits & Vegetables",
  "Godrej Jersey Milk": "Dairy, Bread & Eggs",
  "Paper Boat Coconut Water": "Cold Drinks & Juices",
  "Crax Corn Rings": "Snacks & Munchies",
  "Maggi Noodles Pack": "Breakfast & Instant Food",
  "Cadbury Dairy Milk Silk": "Sweet Craving",
  "Nescafe Gold Coffee Jar": "Tea, Coffee & More",
  "Fortune Mustard Oil": "Atta, Rice, Oil & Dal",
  "Catch Turmeric Powder": "Masala & Spices",
  "Chicken Breast Boneless": "Chicken, Meat & Fish",
  "Organic Red Apples": "Fruits & Vegetables",
  "Huggies Soft Baby Wipes": "Baby Care",
  "Pedigree Chicken Treats": "Pet Care",
  "Nivea Soft Mini Moisturizer": "Personal Care",
  "Vim Dishwash Liquid Gel": "Cleaning Essentials",
  "Organizer Storage Drawer": "Home Needs",
  "Kwality Walls Choco Brownie": "Ice Cream & Sweet Tooth",
  "Good Day Cashew Cookies": "Biscuits & Cookies",
  "Fresh Bananas": "Fruits & Vegetables",
  "Red Tomatoes": "Fruits & Vegetables",
  "Amul Salted Butter": "Dairy, Bread & Eggs",
  "White Eggs (6 Pack)": "Dairy, Bread & Eggs",
  "Coca Cola Zero Sugar": "Cold Drinks & Juices",
  "Lays Potato Chips Classic": "Snacks & Munchies",
  "Rusk Crispy Toast": "Biscuits & Cookies",
  "Kellogg's Corn Flakes": "Breakfast & Instant Food",
  "KitKat Share Bag": "Sweet Craving",
  "Taj Mahal Tea Dust": "Tea, Coffee & More",
  "Aashirvaad Shudh Chakki Atta": "Atta, Rice, Oil & Dal",
  "MDH Kitchen King Masala": "Masala & Spices",
  "Johnson's Baby Powder": "Baby Care",
  "Whiskas Dry Cat Food": "Pet Care",
  "Colgate MaxFresh toothpaste": "Personal Care",
  "Lizol Floor Cleaner Citrus": "Cleaning Essentials",
  "Syska 9W LED Bulb": "Home Needs",
  "Oreo Creme Biscuits": "Biscuits & Cookies",
  "Boat Wireless Earphones": "Electronics",
  "Fast Charging Cable USB-C": "Electronics",
  "Electric Kettle 1.5L": "Home Appliances",
  "Handheld Garment Steamer": "Home Appliances",
  "Local Specialty Gift Box": "Shops",
  "Artisanal Handmade Candles": "Shops",
  "Zepto Classic Cotton T-Shirt": "Fashion",
  "Unisex Summer Sunglasses": "Fashion"
};

const ADJACENCY_MAP = {
  "Fruits & Vegetables": ["Organic & Healthy", "Tea, Coffee & More", "Masala & Spices", "Personal Care"],
  "Dairy, Bread & Eggs": ["Breakfast & Instant Food", "Cold Drinks & Juices", "Sweet Craving", "Biscuits & Cookies"],
  "Cold Drinks & Juices": ["Snacks & Munchies", "Sweet Craving", "Ice Cream & Sweet Tooth", "Tea, Coffee & More"],
  "Snacks & Munchies": ["Cold Drinks & Juices", "Ice Cream & Sweet Tooth", "Biscuits & Cookies", "Tea, Coffee & More"],
  "Breakfast & Instant Food": ["Dairy, Bread & Eggs", "Cold Drinks & Juices", "Tea, Coffee & More", "Fruits & Vegetables"],
  "Sweet Craving": ["Ice Cream & Sweet Tooth", "Biscuits & Cookies", "Snacks & Munchies", "Tea, Coffee & More"],
  "Tea, Coffee & More": ["Biscuits & Cookies", "Breakfast & Instant Food", "Dairy, Bread & Eggs", "Sweet Craving"],
  "Atta, Rice, Oil & Dal": ["Masala & Spices", "Organic & Healthy", "Cleaning Essentials", "Home Needs"],
  "Masala & Spices": ["Atta, Rice, Oil & Dal", "Chicken, Meat & Fish", "Organic & Healthy", "Home Needs"],
  "Chicken, Meat & Fish": ["Masala & Spices", "Cold Drinks & Juices", "Atta, Rice, Oil & Dal", "Organic & Healthy"],
  "Organic & Healthy": ["Fruits & Vegetables", "Personal Care", "Tea, Coffee & More", "Baby Care"],
  "Baby Care": ["Personal Care", "Home Needs", "Cleaning Essentials", "Organic & Healthy"],
  "Pet Care": ["Home Needs", "Cleaning Essentials", "Personal Care", "Organic & Healthy"],
  "Personal Care": ["Baby Care", "Cleaning Essentials", "Home Needs", "Organic & Healthy"],
  "Cleaning Essentials": ["Home Needs", "Personal Care", "Baby Care", "Atta, Rice, Oil & Dal"],
  "Home Needs": ["Cleaning Essentials", "Personal Care", "Home Appliances", "Electronics"],
  "Ice Cream & Sweet Tooth": ["Sweet Craving", "Biscuits & Cookies", "Cold Drinks & Juices", "Snacks & Munchies"],
  "Biscuits & Cookies": ["Tea, Coffee & More", "Sweet Craving", "Dairy, Bread & Eggs", "Snacks & Munchies"],
  "Electronics": ["Home Appliances", "Home Needs", "Shops", "Fashion"],
  "Home Appliances": ["Electronics", "Home Needs", "Cleaning Essentials", "Shops"],
  "Shops": ["Fashion", "Electronics", "Home Appliances", "Home Needs"],
  "Fashion": ["Shops", "Personal Care", "Electronics", "Home Needs"]
};

/**
 * Static fallback mechanism when Groq API fails or times out
 * @param {object} userProfile User profile data containing candidates and active cartItems
 * @param {object} context Context signals
 * @returns {object} Fallback recommendation list
 */
function getStaticFallbackRecommendations(userProfile, context) {
  console.warn("⚠️ Warning: Falling back to local rule-based category discovery.");
  
  // Extract active cart item names and map to their categories
  const cartNames = userProfile.cartItems || [];
  const cartCategories = cartNames.map(name => PRODUCT_CATEGORY_MAP[name]).filter(Boolean);
  
  // Find adjacent discovery categories
  let recommendedCats = [];
  cartCategories.forEach(cat => {
    const adj = ADJACENCY_MAP[cat] || [];
    recommendedCats.push(...adj);
  });
  
  // Filter eligible discovery candidates that user hasn't purchased
  const eligibleCats = recommendedCats.filter(cat => userProfile.discoveryCandidates.includes(cat));
  const uniqueEligibleCats = [...new Set(eligibleCats)];
  
  // Backfill with other candidates if we have less than 3
  let fallbackCategories = uniqueEligibleCats.slice(0, 3);
  if (fallbackCategories.length < 3) {
    const extraCats = userProfile.discoveryCandidates.filter(cat => !fallbackCategories.includes(cat));
    fallbackCategories = [...fallbackCategories, ...extraCats].slice(0, 3);
  }

  // Create intent title based on detected cart items
  const inferredIntent = cartCategories.length > 0 
    ? `${cartCategories[0]} Expansion`
    : "Explore New Categories";
  
  const recommendations = fallbackCategories.map(cat => ({
    category: cat,
    reason: `Matches your shopping routine`,
    isTrial: true,
    trialPrice: 79
  }));

  return {
    intent: inferredIntent,
    recommendations,
    bundle: {
      name: `${context.season} Discovery Bundle`,
      categories: fallbackCategories.slice(0, 2),
      savings: 30,
      price: 139
    },
    source: "fallback_static_rules"
  };
}

/**
 * Orchestrates fetching user profiles, context, triggering Groq, adding guardrails, and post-filtering inventory
 * @param {string} userId User ID
 * @param {number} temp Temperature parameter (optional)
 * @param {string} weather Weather parameter (optional)
 * @returns {Promise<object>} Final category recommendations
 */
async function getDiscoveryRecommendations(userId, temp, weather, cartItems = []) {
  const cacheKey = `recs_${userId}_${temp || '25'}_${weather || 'clear'}_${cartItems.slice().sort().join("_")}`;
  
  // 1. Check Caching Layer
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`⚡ Cache Hit for User ID: ${userId}`);
    return { ...cachedData, source: "cache" };
  }

  // 2. Fetch User Profile and Context Signals
  const userProfile = userProfileService.getUserCategoryProfile(userId);
  userProfile.cartItems = cartItems;
  const context = contextService.getContextSignals(temp, weather);

  // If user has zero discovery candidates left (rare, has bought everything)
  if (userProfile.discoveryCandidates.length === 0) {
    return { recommendations: [], source: "engine_empty_candidates" };
  }

  let finalPayload;
  
  // 3. Execute Groq completions API with Timeout handling
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Groq API Timeout limit reached")), 4000)
    );

    const apiPromise = groqService.getGroqRecommendations(userProfile, context);

    // Race the API completion against the timeout guard
    const llmResult = await Promise.race([apiPromise, timeoutPromise]);
    
    finalPayload = {
      intent: llmResult.intent || "General Discovery",
      recommendations: llmResult.recommendations || [],
      bundle: llmResult.bundle || null,
      source: "groq_llm"
    };
  } catch (error) {
    console.error(`❌ Recommendation Engine Error: ${error.message}`);
    // Fall back to rule-based recommendations
    finalPayload = getStaticFallbackRecommendations(userProfile, context);
  }

  // 4. Post-LLM Inventory Filtration
  // Remove categories that are out-of-stock at the user's localized hub
  finalPayload.recommendations = finalPayload.recommendations.filter(rec => {
    const inStock = inventory.isCategoryInStock(rec.category);
    if (!inStock) {
      console.log(`🚫 Filtering out ${rec.category} from recommendations due to Out-of-Stock (OOS) status.`);
    }
    return inStock;
  });

  // Filter bundle if any of its categories are out of stock
  if (finalPayload.bundle && finalPayload.bundle.categories) {
    const bundleOOS = finalPayload.bundle.categories.some(cat => !inventory.isCategoryInStock(cat));
    if (bundleOOS) {
      console.log(`🚫 Disabling bundle "${finalPayload.bundle.name}" due to Out-of-Stock (OOS) items in the bundle.`);
      finalPayload.bundle = null;
    } else {
      // Calculate realistic price and savings if LLM returns 0 or null values
      const categoryDefaults = {
        "Fruits & Vegetables": 80,
        "Dairy, Bread & Eggs": 90,
        "Cold Drinks & Juices": 60,
        "Snacks & Munchies": 45,
        "Breakfast & Instant Food": 75,
        "Sweet Craving": 95,
        "Tea, Coffee & More": 120,
        "Atta, Rice, Oil & Dal": 180,
        "Masala & Spices": 55,
        "Chicken, Meat & Fish": 250,
        "Organic & Healthy": 140,
        "Baby Care": 160,
        "Pet Care": 190,
        "Personal Care": 110,
        "Cleaning Essentials": 90,
        "Home Needs": 150,
        "Ice Cream & Sweet Tooth": 120,
        "Biscuits & Cookies": 45,
        "Electronics": 399,
        "Home Appliances": 1499,
        "Shops": 250,
        "Fashion": 299
      };

      let originalSum = 0;
      finalPayload.bundle.categories.forEach(cat => {
        originalSum += categoryDefaults[cat] || 100;
      });

      const calculatedPrice = Math.round(originalSum * 0.8); // 20% discount
      const calculatedSavings = originalSum - calculatedPrice;

      if (!finalPayload.bundle.price || finalPayload.bundle.price <= 0) {
        finalPayload.bundle.price = calculatedPrice;
      }
      if (!finalPayload.bundle.savings || finalPayload.bundle.savings <= 0) {
        finalPayload.bundle.savings = calculatedSavings;
      }
    }
  }

  // 5. Store in Cache for 5 minutes
  cache.set(cacheKey, finalPayload, 300);

  return finalPayload;
}

module.exports = {
  getDiscoveryRecommendations
};
