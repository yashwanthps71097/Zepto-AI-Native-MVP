# 🏗️ ContextPulse Architecture (Emerald & Teal Edition)

This document details the system architecture for **ContextPulse**, the AI-powered category discovery engine embedded inside the checkout page. The system is designed with a premium, original **Emerald Green & Teal Glassmorphic UI theme** (moving away from generic competitor purple clones to build a distinct brand identity).

---

## 🗺️ System Overview

The system is split into three main layers:
1. **Data & Feature Layer:** Computes user purchase histories, active category exclusions, and contextual/weather signals.
2. **AI & Prediction Layer (ContextPulse Engine):**
   * **Intent Parser:** Maps cart contents to higher-level lifestyle profiles (e.g. *Fitness*, *Breakfast*, *Pet Parent*).
   * **Category Filter:** Matches detected intents with adjacent categories the user rarely or never purchases, prioritizing new category exploration.
   * **Micro-Trial Selector:** Filters catalog listings for trial packs and mini-sizes priced strictly under ₹99.
3. **API & Serving Layer:** Serves structured recommendations, handles CORS middleware headers for Vercel/Railway cross-origin hosting, and captures A/B metrics.
4. **Clean Checkout View:** Focuses exclusively on **Cart Items Summary** and **AI Picks** (with details like Delivering to, Delivery Slot, and Payment cards removed to reduce visual cognitive overload).

```mermaid
graph TD
    %% Data Sources
    subgraph Data & Feature Layer
        CartData[Active Cart Items] --> IntentParser[Intent Parser LLM]
        BatchData[(User History & Exclusions)] --> CategoryFilter[Category Excluder]
        Catalog[(Catalog & Trial SKUs < ₹99)] --> CategoryFilter
    end

    %% Model Pipeline
    subgraph AI Engine (ContextPulse)
        IntentParser --> |Detected Intent| Ranker[Contextual Ranker]
        CategoryFilter --> |Eligible Unexplored Categories| Ranker
        Ranker --> BundleBuilder[Bundle & Micro-Sample Generator]
        BundleBuilder --> StockFilter[Dark Store Inventory Filter]
    end

    %% Serving & API
    subgraph Serving Layer
        StockFilter --> ServingAPI[ContextPulse API]
        ServingAPI --> Telemetry[Telemetry tracker]
    end

    %% Client App
    subgraph Checkout Integration
        ServingAPI --> |✨ AI Picks for You| CheckoutScreen[Zepto Checkout Page]
    end

    %% Feedback loop
    CheckoutScreen -.-> |Add-to-cart & Checkout Events| Telemetry
```

---

## 🛠️ Core Components

### 1. Intent Parser & Excluder
* **Intent Inference:** Analyzes current items in the cart to detect shopping intents:
  * Cart: `[Protein, Oats]` -> Intent: `Fitness Lifestyle`
  * Cart: `[Bread, Milk]` -> Intent: `Breakfast Routine`
  * Cart: `[Pet Food]` -> Intent: `Pet Parent`
* **Exclusion Handler:** Reads the Feature Store to extract categories purchased by the user, suppressing regular categories to prioritize discovery.

### 2. ContextPulse Recommendation Engine
* **Contextual Ranker:** Matches the parsed intent with adjacent discovery categories.
* **Micro-Trial Selector:** Searches the catalog for trial-size SKUs matching the target category priced under ₹99.
* **Bundle Generator:** Evaluates margins and rules to package 2-3 items together (incorporating at least one new category) with savings metadata.
* **Fallback Rule Engine:** If the LLM API is unavailable, the engine falls back to a local **Category Adjacency Matrix** (mapping current cart item categories to relevant adjacent categories).
* **Bundle Price Guardrail Validator:** A backend validator inspects the generated bundle prices. If the LLM returns 0 for a bundle's price or savings, the validator dynamically calculates typical category prices and applies a **20% bundle discount** before serving.

### 3. Serving & Telemetry API
* **Endpoint (`GET /api/users/:id/recommendations`):** Returns:
  1. Primary Discovery Recommendation (with AI reason badge).
  2. Micro-Sample Tryout (with price and `"Try for ₹XX"` metadata).
  3. Complementary Bundle option (with total savings and bundle price).
* **CORS Access Middleware:** Express header controller allows cross-origin requests from Vercel-hosted frontend instances to the Railway API server.
* **Telemetry Tracker:** Logs checkout completion, CTR, and conversion metrics.

---

## 🔄 Dynamic Recommendation Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User as User Checkout
    participant API as ContextPulse API
    participant Engine as AI Engine
    participant Inv as Inventory System
    participant DB as Telemetry DB

    User->>API: Load Checkout (Cart: [Protein, Oats])
    API->>Engine: Resolve Intent & Exclusions
    Note over Engine: Intent: Fitness; Exclude: Regularly purchased groceries
    Engine->>Engine: Generate recommendations (Micro-sample, Bundle)
    Engine-->>API: Recommendations (1. Shaker, 2. Hydration Drink < ₹99)
    API->>Inv: Validate stock at local hub
    Inv-->>API: Stock Validated (All in stock)
    API-->>User: Render "✨ AI Picks for You"
    User->>API: Click "+ ADD" on Gym Shaker
    API-->>User: Update Subtotal & Total Instantly (Toast message)
    User->>User: Complete Order
    User->>DB: Log checkout_completed, new_category_conversion, revenue=₹199
```
