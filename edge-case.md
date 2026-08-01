# 🛡️ Zepto Category Discovery: Edge Cases & Mitigations

This document outlines critical edge cases in the AI-powered category discovery recommendation engine and the design strategies to mitigate them.

---

## 📋 Edge Case Matrix

| Edge Case | Impact | Proposed Mitigation Strategy |
| :--- | :--- | :--- |
| **1. Cold Start User** (New signup with zero history) | Recommender cannot find affinity or calculate personalization. | * **Demographic Fallback:** Recommend globally trending categories in the user's localized hub (dark store).<br>* **Quick Affinity Capturing:** Show a low-friction onboard carousel of broad categories (e.g., "Snacks", "Fresh Produce") to capture initial preferences. |
| **2. Cold Start Category** (Newly launched category with no transaction history) | Model has zero historical collaborative filtering data. | * **Content-Based Similarity:** Map the new category using textual metadata and taxonomy to existing categories.<br>* **Exploration Boost:** Allocate a small percentage (e.g., 2-5%) of recommendation slots to "exploration" to randomly seed and gather data on new categories. |
| **3. False Lifestyle Inference** (Recommending Baby Care or Pet Care to users without infants/pets) | High friction; recommendations feel irrelevant and annoying rather than helpful. | * **High-Confidence Thresholding:** Set a high-affinity threshold for specialized categories (Baby/Pet care) based on adjacent purchases (e.g., pet accessories, diapers, baby food).<br>* **Immediate Demotion:** If a user dismisses a niche category recommendation once, instantly demote its rank to zero for 30 days. |
| **4. Out-of-Stock (OOS) Targets** (Category recommended but inventory is empty at local hub) | Click leads to empty PDP, ruining user experience. | * **Real-Time Inventory Filter:** The serving API must query local dark store inventory before returning recommendations. If top-performing products in the category are < 2, suppress that category. |
| **5. High-Frequency Users** (Orders multiple times a day) | Over-exposure to the same discovery widgets. | * **Session Cap:** Limit discovery recommendations to once per 24 hours per user, or once every 3 orders to prevent user annoyance. |
| **6. Sensitive/Restricted Categories** (e.g., Sexual Wellness, Alcohol, Tobacco, Paan Corner) | Recommending these inappropriately can cause brand damage. | * **Guardrail Exclusion Lists:** Explicitly blacklist sensitive categories from the discovery model candidates. These categories should only be found via direct search or explicit user opt-in. |
| **7. Seasonal & Festive Anomalies** (e.g., Diwali lights in March, ice creams during heavy monsoon) | Irrelevant recommendations reduce trust. | * **Real-Time Context Tuning:** Tie recommendation scores to localized APIs (e.g., weather feeds, current holiday events) and apply seasonal decay factors. |
| **8. Dynamic Cart Changes** (User adds items during session) | Recommendation becomes redundant if user already added a product from that category. | * **Real-time Deduplication:** Dynamically strip candidate categories from the recommendation list if the user's active cart contains any SKU from that category. |
| **9. A/B Test Cannibalization & Baseline Distortions** (Promo seasons distorting secondary KPIs like AOV/revenue) | Distorts AOV and incremental revenue metric tracking. | * **Experiment Isolation:** Exclude flat discount periods or platform-wide sales from primary/secondary KPI evaluation. Measure lift strictly against matched-control users during standard operations. |
