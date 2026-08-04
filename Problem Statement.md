# 🎯 Zepto ContextPulse: AI-Powered New Category Discovery Problem Statement

---

## 📌 Context & Problem Definition

Zepto has successfully established daily and weekly shopping habits for millions of users who rely on the platform for fast delivery of groceries, snacks, beverages, and household essentials. While this drives strong repeat purchases, it also creates highly repetitive shopping behavior, where customers repeatedly buy products from the same categories and rarely explore other relevant categories available on the platform (e.g., pet care, baby care, personal care, home organization, or fitness).

Existing recommendation surfaces, such as "Frequently Bought Together," "You May Also Like," and promotional banners, primarily encourage repeat purchases or product-level upselling rather than helping users discover entirely new categories. As a result, users miss opportunities to satisfy additional lifestyle needs within the Zepto ecosystem, while Zepto loses potential revenue from cross-category purchases.

---

## 🎯 Proposed Solution: ContextPulse (Emerald & Teal Edition)

**ContextPulse** replaces generic checkout recommendation strategies with an AI-powered discovery experience designed to help users purchase products from **new categories they have not explored before**. 

The system features an original **Emerald Green & Teal Glassmorphism visual theme** (retaining standard quick-commerce UX while establishing a distinctive visual brand identity) and is integrated directly into a simplified checkout page layout to:
1. **Analyze shopping intent** from the current cart (e.g., inferring a "Fitness Lifestyle" intent from protein powder and oats, or a "Breakfast Routine" from bread and eggs).
2. **Prioritize new and unexplored categories** that the user rarely or never purchases, suppressing recommendations for categories they already buy regularly.
3. **Display transparent reasons** explaining why each product is shown (e.g., *"New category for you"* or *"Easy way to explore something new"*).
4. **Reduce friction** with a "Try Something New" strategy that offers micro-trial products priced under ₹99 (mini-sizes, sample packs) with a clear `"Try for ₹XX"` CTA.
5. **Update cart summaries instantly** with interactive, one-tap checkout add-on actions, including dual-state toggle buttons.
6. **Minimize clutter:** Focuses the layout exclusively on the Cart Summary and the ContextPulse AI Picks, removing redundant address and slot cards to expedite checkout completion.
7. **Simulate Live Contexts:** Offers a high-fidelity interactive multi-store simulator (switching between Zepto Fresh, Monsoon Store, Super Mall, and Fresh Farm) and a dedicated Categories tab to test intent extraction under various scenarios.

### 🌐 Live Deployments
* **Interactive Frontend Simulator:** [https://zepto-ai-native-mvp.vercel.app](https://zepto-ai-native-mvp.vercel.app)
* **AI Recommendation Backend:** [https://zepto-ai-native-mvp.onrender.com](https://zepto-ai-native-mvp.onrender.com) (Deployed on Render, integrated with Groq Llama-3.1)

---

## 📊 Success Metrics & Live Telemetry

To track business impact, the simulator incorporates a real-time **Telemetry Dashboard** measuring the following live KPIs:
* **Impressions & Clicks:** Total views and clicks on AI-recommended products.
* **Click-Through Rate (CTR):** Percentage of users engaging with recommendations.
* **Add-To-Cart (ATC) Rate:** Percentage of recommendations added to the checkout cart.
* **Incremental Revenue (AOV Uplift):** Sum of additional purchases generated exclusively from the AI recommendation cards.
* **New Category Adoption / Conversion Rate:** The percentage of orders where the user completes checkout with at least one newly recommended category item.
* **State Reset Guardrail:** Verifies that completion of checkout resets the simulator cart and homepage lists, allowing clean, repeatable user trials.

