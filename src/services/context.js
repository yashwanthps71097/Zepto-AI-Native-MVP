// Service to evaluate seasonal and weather contexts

/**
 * Returns contextual attributes based on current conditions
 * @param {string} temp - Temperature in celsius (optional)
 * @param {string} weather - Current weather (e.g. "rainy", "sunny") (optional)
 * @returns {object} Context metadata
 */
function getContextSignals(temp, weather) {
  const currentMonth = new Date().getMonth(); // 0 = Jan, 6 = Jul, etc.
  
  let season = "Standard";
  if (currentMonth >= 2 && currentMonth <= 5) {
    season = "Summer";
  } else if (currentMonth >= 6 && currentMonth <= 9) {
    season = "Monsoon";
  } else if (currentMonth >= 10 || currentMonth <= 1) {
    season = "Winter";
  }

  // Build recommendation contextual overrides
  return {
    season,
    weather: weather || "clear",
    temperature: temp ? parseFloat(temp) : 25,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  getContextSignals
};
