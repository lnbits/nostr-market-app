/**
 * Logger composable for centralized logging
 */

import { ref, readonly } from 'vue';
import { 
  LOG_LEVELS, 
  DEFAULT_LOG_CONFIG, 
  LOG_STYLES,
  getConsoleMethod,
  formatLogMessage,
  shouldLog
} from '../utils/logging';

/**
 * Global logging state
 */
const logConfig = ref({ ...DEFAULT_LOG_CONFIG });
const logHistory = ref([]);

/**
 * Update logging configuration
 */
export function updateLogConfig(newConfig) {
  logConfig.value = { ...logConfig.value, ...newConfig };
}

/**
 * Get current logging configuration
 */
export function getLogConfig() {
  return readonly(logConfig);
}

/**
 * Get log history
 */
export function getLogHistory() {
  return readonly(logHistory);
}

/**
 * Clear log history
 */
export function clearLogHistory() {
  logHistory.value = [];
}

/**
 * Add log entry to history
 */
function addToHistory(level, context, message, data, timestamp) {
  const entry = {
    level,
    context,
    message,
    data,
    timestamp,
    id: Date.now() + Math.random()
  };
  
  logHistory.value.unshift(entry);
  
  // Keep only the most recent entries
  if (logHistory.value.length > logConfig.value.maxLogEntries) {
    logHistory.value = logHistory.value.slice(0, logConfig.value.maxLogEntries);
  }
}

/**
 * Core logging function
 */
function log(level, context, message, data = null) {
  const config = logConfig.value;
  
  // Check if we should log this message
  if (!shouldLog(level, context, config)) {
    return;
  }
  
  const timestamp = new Date();
  const consoleMethod = getConsoleMethod(level);
  const formattedMessage = formatLogMessage(level, context, message, config);
  
  // Add to history
  addToHistory(level, context, message, data, timestamp);
  
  // Log to console
  if (config.useColors && LOG_STYLES[level]) {
    consoleMethod(`%c${formattedMessage}`, LOG_STYLES[level], data || '');
  } else {
    if (data) {
      consoleMethod(formattedMessage, data);
    } else {
      consoleMethod(formattedMessage);
    }
  }
}

/**
 * Logger composable
 */
export function useLogger(context = null) {
  
  /**
   * Log error message
   */
  const error = (message, data = null) => {
    log(LOG_LEVELS.ERROR, context, message, data);
  };
  
  /**
   * Log warning message
   */
  const warn = (message, data = null) => {
    log(LOG_LEVELS.WARN, context, message, data);
  };
  
  /**
   * Log info message
   */
  const info = (message, data = null) => {
    log(LOG_LEVELS.INFO, context, message, data);
  };
  
  /**
   * Log debug message
   */
  const debug = (message, data = null) => {
    log(LOG_LEVELS.DEBUG, context, message, data);
  };
  
  /**
   * Log trace message
   */
  const trace = (message, data = null) => {
    log(LOG_LEVELS.TRACE, context, message, data);
  };
  
  /**
   * Create a child logger with extended context
   */
  const child = (childContext) => {
    const fullContext = context ? `${context}:${childContext}` : childContext;
    return useLogger(fullContext);
  };
  
  /**
   * Log with custom level
   */
  const logWithLevel = (level, message, data = null) => {
    log(level, context, message, data);
  };
  
  /**
   * Group related log messages
   */
  const group = (groupName, fn) => {
    if (shouldLog(LOG_LEVELS.DEBUG, context, logConfig.value)) {
      console.group(formatLogMessage(LOG_LEVELS.DEBUG, context, groupName, logConfig.value));
    }
    try {
      fn();
    } finally {
      if (shouldLog(LOG_LEVELS.DEBUG, context, logConfig.value)) {
        console.groupEnd();
      }
    }
  };
  
  /**
   * Time a function execution
   */
  const time = (label, fn) => {
    const startTime = performance.now();
    const result = fn();
    const endTime = performance.now();
    debug(`${label} took ${(endTime - startTime).toFixed(2)}ms`);
    return result;
  };
  
  /**
   * Time an async function execution
   */
  const timeAsync = async (label, fn) => {
    const startTime = performance.now();
    const result = await fn();
    const endTime = performance.now();
    debug(`${label} took ${(endTime - startTime).toFixed(2)}ms`);
    return result;
  };
  
  /**
   * Log object in a formatted way
   */
  const object = (message, obj) => {
    debug(message, obj);
  };
  
  /**
   * Conditional logging
   */
  const conditional = (condition, level, message, data = null) => {
    if (condition) {
      log(level, context, message, data);
    }
  };
  
  return {
    error,
    warn,
    info,
    debug,
    trace,
    child,
    logWithLevel,
    group,
    time,
    timeAsync,
    object,
    conditional,
    
    // Expose log levels for convenience
    LOG_LEVELS,
    
    // Context information
    context: readonly(ref(context))
  };
}

/**
 * Global logger instance
 */
export const logger = useLogger();

/**
 * Performance monitoring utilities
 */
export const perf = {
  /**
   * Mark the start of a performance measurement
   */
  mark: (name) => {
    if (shouldLog(LOG_LEVELS.DEBUG, 'perf', logConfig.value)) {
      performance.mark(`${name}-start`);
    }
  },
  
  /**
   * Measure performance from a mark
   */
  measure: (name) => {
    if (shouldLog(LOG_LEVELS.DEBUG, 'perf', logConfig.value)) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const entries = performance.getEntriesByName(name);
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        logger.debug(`Performance: ${name} took ${lastEntry.duration.toFixed(2)}ms`);
      }
    }
  }
};