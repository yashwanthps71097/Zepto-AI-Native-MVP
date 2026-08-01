const { telemetryLogs } = require("../data/mockDb");

/**
 * Logs a customer telemetry event
 * @param {object} event { userId, eventType ('impression'|'click'|'cart_add'|'conversion'), category, revenue }
 * @returns {object} Confirmed event details
 */
function logTelemetryEvent(event) {
  const loggedEvent = {
    eventId: `evt_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    userId: event.userId,
    eventType: event.eventType,
    category: event.category,
    revenue: event.revenue || 0,
    metadata: event.metadata || {}
  };

  telemetryLogs.push(loggedEvent);
  return loggedEvent;
}

/**
 * Calculates current aggregate metrics based on telemetry logs
 * @returns {object} Core analytics indicators
 */
function getTelemetryMetrics() {
  const totalImpressions = telemetryLogs.filter(e => e.eventType === "impression").length;
  const totalClicks = telemetryLogs.filter(e => e.eventType === "click").length;
  const totalAddCart = telemetryLogs.filter(e => e.eventType === "cart_add").length;
  const totalConversions = telemetryLogs.filter(e => e.eventType === "conversion").length;

  const checkoutsLoaded = telemetryLogs.filter(e => e.eventType === "checkout_loaded").length;
  const checkoutsCompleted = telemetryLogs.filter(e => e.eventType === "checkout_completed").length;

  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const addCartRate = totalClicks > 0 ? (totalAddCart / totalClicks) * 100 : 0;
  const conversionRate = totalAddCart > 0 ? (totalConversions / totalAddCart) * 100 : 0;
  const checkoutCompletionRate = checkoutsLoaded > 0 ? (checkoutsCompleted / checkoutsLoaded) * 100 : 100;
  
  const incrementalRevenue = telemetryLogs
    .filter(e => e.eventType === "conversion")
    .reduce((sum, e) => sum + e.revenue, 0);

  return {
    metricsCaptured: telemetryLogs.length,
    impressions: totalImpressions,
    clicks: totalClicks,
    addCartEvents: totalAddCart,
    conversions: totalConversions,
    checkoutsLoaded,
    checkoutsCompleted,
    clickThroughRatePercent: parseFloat(ctr.toFixed(2)),
    addToCartRatePercent: parseFloat(addCartRate.toFixed(2)),
    conversionRatePercent: parseFloat(conversionRate.toFixed(2)),
    checkoutCompletionRatePercent: parseFloat(checkoutCompletionRate.toFixed(2)),
    incrementalRevenueGenerated: incrementalRevenue
  };
}

module.exports = {
  logTelemetryEvent,
  getTelemetryMetrics
};
