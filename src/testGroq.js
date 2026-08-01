const { getUserCategoryProfile } = require("./services/userProfile");
const { getContextSignals } = require("./services/context");
const { getGroqRecommendations } = require("./services/groqService");

async function dryRunTest() {
  console.log("=== Dry Running Groq Personalization Engine ===");

  // Mock User 1 (Regular buyer of Fruits, Dairy, Snacks)
  // Discovery Candidates should be: Beverages, Baby Care, Pet Care, Personal Care, Home Organization
  const userProfile = getUserCategoryProfile("1");
  const context = getContextSignals(32, "rainy"); // Monsoon season test

  console.log("Input Profile Candidates:", userProfile.discoveryCandidates);
  console.log("Input Profile Exclusions (Do Not Suggest):", userProfile.purchasedCategories);
  console.log("Input Context:", context);

  console.log("\nQuerying Groq API...");
  try {
    const result = await getGroqRecommendations(userProfile, context);
    console.log("\n=== Recommendation Output ===");
    console.log(JSON.stringify(result, null, 2));

    // Verify exclusions rule
    const recommendations = result.recommendations || [];
    const violated = recommendations.some(rec => userProfile.purchasedCategories.includes(rec.category));
    if (violated) {
      console.error("❌ ERROR: Excluded category was recommended!");
    } else {
      console.log("✅ SUCCESS: Exclusions rules strictly followed.");
    }
  } catch (error) {
    console.error("❌ Test Failed:", error.message);
  }
}

dryRunTest();
