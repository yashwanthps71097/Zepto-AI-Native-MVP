# 📅 Zepto ContextPulse: AI-Powered New Category Discovery Spec

This implementation plan details the product specification, user flows, AI recommendation logic, and engineering rollout phases for **Zepto ContextPulse**.

---

## 🎯 Goal
Replace the current generic recommendation strategy with an AI-powered discovery experience that helps users purchase products from **new categories they have not explored before**, directly supporting the business goal of increasing the percentage of Monthly Active Customers purchasing from at least one new category every month. 

This feature is implemented **inside the existing Zepto checkout flow**, not as a separate application or redesigned checkout page.

---

## 💡 Product Vision
Users frequently reorder the same grocery items every week, creating highly repetitive, routine shopping habits. 

Instead of showing generic "Frequently Bought Together" recommendations, **ContextPulse** analyzes the user's current cart, purchase history, and shopping intent to recommend products from **adjacent lifestyle categories** that the user has not purchased recently. The objective is to encourage catalog exploration while maintaining a seamless, frictionless checkout experience.

---

## 👤 User Flow
1. User shops normally in the Zepto app.
2. User adds products to the cart.
3. User taps **Proceed to Checkout**.
4. The existing Zepto Checkout page loads.
5. Before the Payment section, the new ContextPulse AI recommendation module appears.
6. AI detects the user's shopping intent from the current cart.
7. AI identifies adjacent categories the user rarely or never purchases.
8. Personalized recommendations are displayed.
9. User can add products with one tap.
10. Order summary updates instantly.

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

## 📊 Success Metrics

### Primary KPI
* Percentage of **Monthly Active Customers (MAC)** purchasing from at least one new category every month.

### Supporting Metrics
* Cross-category conversion rate.
* Recommendation CTR & Add-to-Cart rates.
* New category adoption rate.
* Average Order Value (AOV).
* Repeat purchases in newly discovered categories.
* Checkout completion rate (verifying no abandonment increase).

---

## 📅 Rollout Phases

### Phase 1: Data Foundations & Telemetry
* **Goal:** Establish telemetry tracking for primary KPI and secondary metric logs. Set up context and exclusion stores.

### Phase 2: Intent Detection & Groq Prompt Tuning
* **Goal:** Implement the LLM intent parser and recommendation builder (exclusively using Groq Llama models) returning structured JSON containing AI explanations and category mappings.

### Phase 3: Serving Wrapper & Guardrails
* **Goal:** Deploy low-latency REST/gRPC wrappers with Redis caching, dark store inventory check integrations, and API timeouts.

### Phase 4: UI Checkout Widgets & Experimentation
* **Goal:** Launch the native checkout page component (`✨ AI Picks for You`) and split traffic to measure conversion lifts.
