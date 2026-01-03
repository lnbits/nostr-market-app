/**
 * Centralized logging configuration and utilities
 */

/**
 * Log levels enum
 */
export const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
};

/**
 * Log level names for display
 */
export const LOG_LEVEL_NAMES = {
  [LOG_LEVELS.ERROR]: 'ERROR',
  [LOG_LEVELS.WARN]: 'WARN',
  [LOG_LEVELS.INFO]: 'INFO',
  [LOG_LEVELS.DEBUG]: 'DEBUG',
  [LOG_LEVELS.TRACE]: 'TRACE'
};

/**
 * Default logging configuration
 */
export const DEFAULT_LOG_CONFIG = {
  // Current log level (only messages at this level or higher will be logged)
  level: process.env.NODE_ENV === 'production' ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG,
  
  // Whether to include timestamps
  includeTimestamp: true,
  
  // Whether to include log levels in output
  includeLevel: true,
  
  // Whether to include context/component names
  includeContext: true,
  
  // Whether to use colors in console output
  useColors: true,
  
  // Whether to enable persistence (could be extended later)
  enablePersistence: false,
  
  // Maximum number of log entries to keep in memory
  maxLogEntries: 1000,
  
  // Context-specific log levels
  contextLevels: {
    'storage': LOG_LEVELS.WARN,
    'relay': LOG_LEVELS.INFO,
    'events': LOG_LEVELS.INFO,
    'market': LOG_LEVELS.INFO,
    'orders': LOG_LEVELS.INFO,
    'account': LOG_LEVELS.INFO
  }
};

/**
 * Console styling for different log levels
 */
export const LOG_STYLES = {
  [LOG_LEVELS.ERROR]: 'color: #ff6b6b; font-weight: bold;',
  [LOG_LEVELS.WARN]: 'color: #ffa500; font-weight: bold;',
  [LOG_LEVELS.INFO]: 'color: #4ecdc4; font-weight: normal;',
  [LOG_LEVELS.DEBUG]: 'color: #95a5a6; font-weight: normal;',
  [LOG_LEVELS.TRACE]: 'color: #bdc3c7; font-weight: normal;'
};

/**
 * Get the appropriate console method for a log level
 */
export function getConsoleMethod(level) {
  switch (level) {
    case LOG_LEVELS.ERROR:
      return console.error;
    case LOG_LEVELS.WARN:
      return console.warn;
    case LOG_LEVELS.INFO:
      return console.info;
    case LOG_LEVELS.DEBUG:
    case LOG_LEVELS.TRACE:
    default:
      return console.log;
  }
}

/**
 * Format timestamp for log entries
 */
export function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    fractionalSecondDigits: 3
  });
}

/**
 * Format log message with metadata
 */
export function formatLogMessage(level, context, message, config = DEFAULT_LOG_CONFIG) {
  const parts = [];
  
  if (config.includeTimestamp) {
    parts.push(`[${formatTimestamp()}]`);
  }
  
  if (config.includeLevel) {
    parts.push(`[${LOG_LEVEL_NAMES[level]}]`);
  }
  
  if (config.includeContext && context) {
    parts.push(`[${context}]`);
  }
  
  return parts.join(' ') + (parts.length > 0 ? ' ' : '') + message;
}

/**
 * Check if a log message should be logged based on configuration
 */
export function shouldLog(level, context, config = DEFAULT_LOG_CONFIG) {
  // Check context-specific log level first
  if (context && config.contextLevels[context] !== undefined) {
    return level <= config.contextLevels[context];
  }
  
  // Fall back to global log level
  return level <= config.level;
}