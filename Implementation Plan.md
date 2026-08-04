# 📅 Zepto ContextPulse: AI-Powered New Category Discovery Spec

This implementation plan details the product specification, user flows, AI recommendation logic, and engineering rollout status for **Zepto ContextPulse**.

---

## 🎯 Goal & Deployments
Replace the current generic recommendation strategy with an AI-powered discovery experience that helps users purchase products from **new categories they have not explored before**, directly supporting the business goal of increasing the percentage of Monthly Active Customers purchasing from at least one new category every month.

* ⚡ **Live Interactive Simulator:** [https://zepto-ai-native-mvp.vercel.app](https://zepto-ai-native-mvp.vercel.app)
* ⚙️ **AI Recommendation Backend:** [https://zepto-ai-native-mvp.onrender.com](https://zepto-ai-native-mvp.onrender.com)

---

## 💡 Product Vision & Simulator Contexts
Users frequently reorder the same grocery items every week, creating highly repetitive, routine shopping habits. 

Instead of showing generic "Frequently Bought Together" recommendations, **ContextPulse** analyzes the user's current cart, purchase history, and shopping intent to recommend products from **adjacent lifestyle categories** that the user has not purchased recently. 

To fully test and visualize the impact of this recommendation engine across different seasonal and lifestyle environments, the MVP includes a high-fidelity **interactive phone simulator** with store switching capabilities:
* **Zepto Store:** Focuses on fresh daily essentials and grocery items.
* **Monsoon Store:** Tailored for monsoon-specific hot items (tea, coffee).
* **Super Mall:** Emphasizes premium lifestyle items, personal care, and electronics.
* **Fresh Farm:** Tailored for organic fruits, vegetables, and healthy items.

---

## 👤 User Flow
1. User shops in the simulated Zepto app, optionally switching between different stores or categories.
2. User adds products to the cart.
3. User taps **Proceed to Checkout**.
4. The existing Zepto Checkout page loads in a simplified layout.
5. Before the Payment section, the new ContextPulse AI recommendation module appears.
6. The client fires a request to `/api/users/:id/recommendations`.
7. AI detects the user's shopping intent from the current cart and filters out previously purchased categories.
8. Personalized recommendations are displayed as three cards:
   * **Primary Discovery Card:** A recommended product from a new category with an AI-reason badge.
   * **Micro-Trial Card:** A low-friction sample pack under ₹99.
   * **Lifestyle Bundle:** A pre-packaged set of items with an automated 20% discount.
9. User can add products to their order with a single tap. The button instantly changes state to a purple `✓ ADDED` button.
10. Order summary subtotal and delivery fee update instantly in the UI.
11. User completes checkout by clicking **Place Order**.
12. The simulator logs conversion metrics, empties the cart, resets all item quantity indicators on the homepage/category screens, and returns the user to the cart view.

---

## 📱 UI Integration & Visual Branding

### 🎨 Visual Theme: Emerald & Teal Glassmorphism
The interface features a completely original startup visual identity (avoiding generic competitor purple/pink clones):
* **Primary color:** `#10B981` (Emerald Green)
* **Secondary color:** `#2563EB` (Teal Blue)
* **Glassmorphic surface:** Semi-transparent white panels (`#FFFFFF` with soft drop shadows and thin borders) laid over a Slate 50 background (`#F8FAFC`).
* **Inter Typeface:** Anti-aliased typography (e.g. `28px` bold headings, `13px` medium navigation labels).

### 📐 Simplified Checkout Layout
To keep the checkout flow fast and reduce cognitive load, the page layout is structured cleanly:
* **Removed Sections:** Delivering to, Delivery Slot, and Payment cards are omitted.
* **Core Components:**
  1. **Cart Items Summary Card:** Displays active items with interactive quantity increment/decrement (`-` and `+`) buttons.
  2. **✨ AI Picks for You Module:** Renders personalized discovery targets, micro-trials, and bundles.
  3. **Bill Summary Card:** Lists subtotal, delivery fee, and grand total.
  4. **Place Order CTA:** Full-width Emerald green checkout button at the bottom.

---

## ✨ AI Recommendation Module

### Header & Copy
* **Section Title:** `✨ AI Picks for You`
* **Subtitle:** `"Discover products from categories you haven't explored yet."`

### Card Elements
Each recommendation card contains:
* Product Image / Emoji
* Product Name
* Price
* Category Name
* **🆕 New Category** badge
* AI explanation
* Add button

---

## 🧠 AI Intent Detection & Recommendation Logic

### Intent Mapping Examples
* **Cart:** `[Protein Powder, Oats, Bananas]` 
  * *Intent:* Fitness Lifestyle
  * *Recommended New Categories:* Personal Care, Hydration, Sports Accessories
  * *Products:* Mini Face Wash, Gym Shaker, Electrolyte Drink
* **Cart:** `[Bread, Milk, Eggs]`
  * *Intent:* Breakfast Routine
  * *Recommended New Categories:* Coffee, Kitchen Accessories, Healthy Snacks
* **Cart:** `[Pet Food]`
  * *Intent:* Pet Parent
  * *Recommended New Categories:* Cleaning Supplies, Home Fresheners, Pet Accessories

### Prioritization Hierarchy
1. New categories never purchased.
2. Categories purchased infrequently.
3. High relevance to detected intent.
4. High-rated products.
5. Popular among similar users.
6. Low-friction trial products.

> [!IMPORTANT]
> Avoid recommending products that belong to categories the user already purchases regularly.

---

## 📦 Trial-Size & Bundle Strategies

### Micro-Trial Products ("Try Something New")
To reduce purchase hesitation when entering a new category, recommend trial-size products:
* Price strictly below **₹99**
* Trial packs, mini variants, and sample sizes
* **CTA:** `"Try for ₹79"`

### Bundle Suggestions
AI-generated lifestyle bundles (e.g. *Healthy Morning Bundle*) must introduce at least one product from a new category. Show total bundle savings and an `"Add Bundle"` button.

---

## 📊 Success Metrics & Live Telemetry

To track business impact, the simulator incorporates a real-time **Telemetry Dashboard** measuring the following live KPIs:
* **Impressions & Clicks:** Total views and clicks on AI-recommended products.
* **Click-Through Rate (CTR):** Percentage of users engaging with recommendations.
* **Add-To-Cart (ATC) Rate:** Percentage of recommendations added to the checkout cart.
* **Incremental Revenue (AOV Uplift):** Sum of additional purchases generated exclusively from the AI recommendation cards.
* **New Category Adoption / Conversion Rate:** The percentage of orders where the user completes checkout with at least one newly recommended category item.
* **State Reset Guardrail:** Verifies that completion of checkout resets the simulator cart and homepage lists, allowing clean, repeatable user trials.

---

## 📅 Rollout Phases & Current Status (COMPLETED)

### Phase 1: Data Foundations & Telemetry (100% COMPLETE)
* Establish telemetry tracking for primary KPI and secondary metric logs. Set up context and exclusion stores.

### Phase 2: Intent Detection & Groq Prompt Tuning (100% COMPLETE)
* Implement the LLM intent parser and recommendation builder (exclusively using Groq Llama-3.1 models) returning structured JSON containing AI explanations and category mappings.

### Phase 3: Serving Wrapper & Guardrails (100% COMPLETE)
* Deploy low-latency REST/gRPC wrappers with memory-caching layer (5-minute TTL to prevent multiple API hits for same cart), dark store inventory check integrations, and API timeouts.
* Implement a backend Bundle Price Guardrail Validator that intercepts generated bundles, ensuring that any missing prices or savings are computed automatically based on category defaults with a 20% discount applied.

### Phase 4: UI Checkout Widgets & Experimentation (100% COMPLETE)
* Launch the native checkout page component (`✨ AI Picks for You`) and telemetry dashboard tracking metrics.
* Fix state-reset bugs to ensure that upon completing checkout, all homepage quantities reset to zero and the shopping loop starts clean.

