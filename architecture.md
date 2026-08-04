# 🏗️ ContextPulse Architecture (Emerald & Teal Edition)

This document details the system architecture for **ContextPulse**, the AI-powered category discovery engine embedded inside the checkout page. The system is designed with a premium, original **Emerald Green & Teal Glassmorphic UI theme** (moving away from generic competitor purple clones to build a distinct brand identity).

---

## 🗺️ System Overview

The system is split into four main layers:
1. **Data & Feature Layer:** Computes user purchase histories, active category exclusions, and contextual/weather signals.
2. **AI & Prediction Layer (ContextPulse Engine):**
   * **Intent Parser:** Maps cart contents to higher-level lifestyle profiles (e.g. *Fitness*, *Breakfast*, *Pet Parent*).
   * **Category Filter:** Matches detected intents with adjacent categories the user rarely or never purchases, prioritizing new category exploration.
   * **Micro-Trial Selector:** Filters catalog listings for trial packs and mini-sizes priced strictly under ₹99.
3. **API & Serving Layer:** Serves structured recommendations, implements 5-minute memory TTL caching, handles CORS middleware headers for Vercel/Railway cross-origin hosting, and captures real-time A/B telemetry metrics.
4. **Interactive Checkout & Simulator View:** 
   * **Clean Checkout View:** Focuses exclusively on **Cart Items Summary** and **AI Picks** (with details like Delivering to, Delivery Slot, and Payment cards removed to reduce visual cognitive overload).
   * **Multi-Store Simulator:** Supports switching between different stores (Zepto, Monsoon, Super Mall, Fresh) to change category context dynamically.
   * **Dedicated Categories Tab:** Allows manual navigation and exploration of products within discovery categories.
   * **State Reset Guardrail:** Fully resets cart state, product catalogs, and category lists upon checkout completion.

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
        ServingAPI --> CacheManager[5-min Cache Manager]
        ServingAPI --> Telemetry[Telemetry tracker]
    end

    %% Client App
    subgraph Checkout Integration & Simulator
        ServingAPI --> |✨ AI Picks for You| CheckoutScreen[Zepto Checkout Page]
        CheckoutScreen --> |Multi-Store Tabs / Categories View| SimulatorFrame[High-Fidelity Simulator]
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
* **Cache Controller:** Stores recommendations payload in an in-memory cache keyed by user ID, temperature, weather, and cart hash with a **5-minute TTL** to bypass expensive LLM calls during rapid checkout edits.
* **CORS Access Middleware:** Express header controller allows cross-origin requests from Vercel-hosted frontend instances to the Railway API server.
* **Telemetry Tracker:** Logs checkout completion, CTR, and conversion metrics via `POST /api/telemetry/event` and `GET /api/telemetry/metrics`.

### 4. Simulator UI & State Reset Handler
* **Dual-State Add-To-Cart Buttons:** The `+ ADD` or `Try for ₹XX` CTAs turn into purple `✓ ADDED` state when clicked, modifying the client-side cart array instantly and triggering telemetry tracking.
* **UI State Reset:** After completing checkout, the client-side cart is emptied, and the DOM triggers `renderProducts()`, `renderTrendingProducts()`, and `renderCategoryProducts()` to clean the screen and prevent stale, cached quantities from appearing on the store homepage.

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
    Note over API: Check memory cache first
    alt Cache Hit
        API-->>User: Render "✨ AI Picks for You" (from Cache)
    else Cache Miss
        API->>Engine: Resolve Intent & Exclusions
        Note over Engine: Intent: Fitness; Exclude: Regularly purchased groceries
        Engine->>Engine: Generate recommendations (Micro-sample, Bundle)
        Engine-->>API: Recommendations (1. Shaker, 2. Hydration Drink < ₹99)
        API->>Inv: Validate stock at local hub
        Inv-->>API: Stock Validated (All in stock)
        API-->>User: Render "✨ AI Picks for You"
    end
    User->>API: Click "+ ADD" on Gym Shaker
    API-->>User: Update Subtotal & Total Instantly (Toast message & Telemetry event)
    User->>User: Complete Order & Click Checkout
    Note over User: Local cart array is emptied; homepage products state is reset.
    User->>DB: Log checkout_completed, new_category_conversion, revenue=₹199
```
