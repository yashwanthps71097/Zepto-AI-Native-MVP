require("dotenv").config();
const express = require("express");
const { getContextSignals } = require("./src/services/context");
const { getUserCategoryProfile } = require("./src/services/userProfile");
const { logTelemetryEvent, getTelemetryMetrics } = require("./src/services/telemetry");
const { getDiscoveryRecommendations } = require("./src/services/recommendation");

const app = express();
app.use(express.json());

// Enable CORS for cross-origin frontend requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
// Disable caching for all static files to ensure immediate updates
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});
app.use(express.static("public", { etag: false }));

const PORT = process.env.PORT || 8080;



// Endpoint 1: Fetch user history, target candidates and seasonal context
app.get("/api/users/:id/profile", (req, res) => {
  const userId = req.params.id;
  const { temp, weather } = req.query;

  try {
    const userProfile = getUserCategoryProfile(userId);
    const context = getContextSignals(temp, weather);

    res.json({
      success: true,
      data: {
        userProfile,
        context
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint: Fetch personalized category recommendations with fallback and inventory checks
app.get("/api/users/:id/recommendations", async (req, res) => {
  const userId = req.params.id;
  const { temp, weather, cart } = req.query;
  const cartItems = cart ? cart.split(",") : [];

  try {
    const recommendationPayload = await getDiscoveryRecommendations(userId, temp, weather, cartItems);
    res.json({
      success: true,
      ...recommendationPayload
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint 2: Log telemetry events
app.post("/api/telemetry/event", (req, res) => {
  const { userId, eventType, category, revenue, metadata } = req.body;

  if (!userId || !eventType || !category) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: userId, eventType, category"
    });
  }

  try {
    const loggedEvent = logTelemetryEvent({ userId, eventType, category, revenue, metadata });
    res.status(201).json({ success: true, event: loggedEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint 3: Fetch aggregated metrics
app.get("/api/telemetry/metrics", (req, res) => {
  try {
    const metrics = getTelemetryMetrics();
    res.json({ success: true, metrics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Zepto Discovery engine running on port ${PORT} in ${process.env.ENV || 'development'} mode`);
});
