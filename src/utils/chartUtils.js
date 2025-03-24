/**
 * Creates a linear gradient for chart backgrounds
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {string} startColor - Starting color (rgba format)
 * @param {string} endColor - Ending color (rgba format)
 * @returns {CanvasGradient|string} The gradient object or fallback color
 */
export const getGradient = (ctx, startColor, endColor) => {
  // Return fallback color if context is not available
  if (!ctx) {
    return startColor;
  }

  // Check if chart and chartArea are available
  if (!ctx.chart || !ctx.chart.chartArea) {
    return startColor;
  }

  // Make sure the chart area has height
  const chartArea = ctx.chart.chartArea;
  if (
    !chartArea ||
    chartArea.bottom === undefined ||
    chartArea.top === undefined
  ) {
    return startColor;
  }

  // Create the gradient
  try {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );

    gradient.addColorStop(0, endColor);
    gradient.addColorStop(1, startColor);

    return gradient;
  } catch (error) {
    console.warn("Error creating gradient:", error);
    return startColor;
  }
};
