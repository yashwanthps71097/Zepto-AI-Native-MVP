const dotenv = require("dotenv");
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

/**
 * Calls Groq API to retrieve personalized category recommendations
 * @param {object} userProfile User purchase history and candidate discovery categories
 * @param {object} context Seasonal, weather, and temporal signals
 * @returns {Promise<object>} JSON recommendations object
 */
async function getGroqRecommendations(userProfile, context) {
  if (!GROQ_API_KEY || GROQ_API_KEY === "your_groq_api_key_here") {
    throw new Error("Missing or invalid GROQ_API_KEY in environment configuration.");
  }

  const systemPrompt = `You are a high-performance, personalized Category Discovery recommender engine ("ContextPulse") for Zepto.
Analyze the user's active cart items and:
1. Detect shopping intent (e.g., "Fitness Lifestyle", "Breakfast Routine", "Pet Parent", "Home Utility").
2. Recommend 1-3 product categories that the user has NEVER purchased before, helping them discover new parts of the catalog.
3. For each recommended category, provide a transparent AI explanation chosen from:
   - "New category for you"
   - "Popular with shoppers like you"
   - "Matches your shopping routine"
   - "Easy trial under ₹99"
   - "Based on your current cart"
4. Flag if a category has trial options under ₹99 ("isTrial": true, with a "trialPrice" under 99).
5. Suggest a complementary discovery bundle grouping 2-3 items if appropriate.

Strict rules:
- Only recommend categories present in the "Discovery Candidates" list.
- NEVER recommend categories present in the "Exclusions" list.
- Ensure the recommendations align with the current weather, temperature, and season.
- Respond with nothing except valid, parseable JSON matching this schema:
{
  "intent": "string",
  "recommendations": [
    {
      "category": "string",
      "reason": "string",
      "isTrial": true,
      "trialPrice": 79
    }
  ],
  "bundle": {
    "name": "string",
    "categories": ["string"],
    "savings": 45,
    "price": 249
  }
}`;

  const userPrompt = `Context Signals:
- Season: ${context.season}
- Weather: ${context.weather}
- Temperature: ${context.temperature}°C

Active Checkout Cart:
${JSON.stringify(userProfile.cartItems || ["Organic Milk"])}

User Profile Data:
- Total past orders: ${userProfile.totalPastOrders}
- Exclusions (DO NOT RECOMMEND): ${JSON.stringify(userProfile.purchasedCategories)}
- Discovery Candidates (CHOOSE FROM ONLY): ${JSON.stringify(userProfile.discoveryCandidates)}

Generate recommendations now.`;

  const payload = {
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.2
  };

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API completion failed: status=${response.status} body=${errText}`);
  }

  const result = await response.json();
  const rawContent = result.choices[0].message.content;
  return JSON.parse(rawContent);
}

module.exports = {
  getGroqRecommendations
};
