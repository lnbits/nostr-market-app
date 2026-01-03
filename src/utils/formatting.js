/**
 * Formatting utility functions
 */

/**
 * Format satoshi value with locale formatting
 * @param {number} value - Value to format
 * @returns {string} - Formatted value
 */
export function formatSat(value) {
  return new Intl.NumberFormat(window.LOCALE).format(value);
}

/**
 * Format value as satoshi or BTC
 * @param {number} val - Value to format
 * @param {boolean} showUnit - Whether to show unit (default: true)
 * @param {boolean} showSats - Whether to show as sats or BTC (default: false)
 * @returns {string} - Formatted value
 */
export function satOrBtc(val, showUnit = true, showSats = false) {
  const value = showSats
    ? formatSat(val)
    : val == 0
    ? 0.0
    : (val / 100000000).toFixed(8);
  if (!showUnit) return value;
  return showSats ? value + " sat" : value + " BTC";
}

/**
 * Format currency value
 * @param {number} value - Value to format
 * @param {string} currency - Currency code
 * @returns {string} - Formatted currency value
 */
export function formatCurrency(value, currency) {
  try {
    return new Intl.NumberFormat(window.LOCALE, {
      style: "currency",
      currency: currency,
    }).format(value);
  } catch (error) {
    return value;
  }
}

/**
 * Get time from now string
 * @param {Date|number} time - Time to calculate from
 * @returns {string} - Time from now description
 */
export function timeFromNow(time) {
  // Get timestamps
  let unixTime = new Date(time).getTime();
  if (!unixTime) return;
  let now = new Date().getTime();

  // Calculate difference
  let difference = unixTime / 1000 - now / 1000;

  // Setup return object
  let tfn = {};

  // Check if time is in the past, present, or future
  tfn.when = "now";
  if (difference > 0) {
    tfn.when = "future";
  } else if (difference < -1) {
    tfn.when = "past";
  }

  // Convert difference to absolute
  difference = Math.abs(difference);

  // Calculate time unit
  if (difference / (60 * 60 * 24 * 365) > 1) {
    // Years
    tfn.unitOfTime = "years";
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
  } else if (difference / (60 * 60 * 24 * 45) > 1) {
    // Months
    tfn.unitOfTime = "months";
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
  } else if (difference / (60 * 60 * 24) > 1) {
    // Days
    tfn.unitOfTime = "days";
    tfn.time = Math.floor(difference / (60 * 60 * 24));
  } else if (difference / (60 * 60) > 1) {
    // Hours
    tfn.unitOfTime = "hours";
    tfn.time = Math.floor(difference / (60 * 60));
  } else if (difference / 60 > 1) {
    // Minutes
    tfn.unitOfTime = "minutes";
    tfn.time = Math.floor(difference / 60);
  } else {
    // Seconds
    tfn.unitOfTime = "seconds";
    tfn.time = Math.floor(difference);
  }

  // Return time from now data
  return `${tfn.time} ${tfn.unitOfTime}`;
}