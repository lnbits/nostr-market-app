# Logging System

This application uses a centralized logging system to replace scattered console statements throughout the codebase.

## Features

- **Contextual Logging**: Each component/composable has its own logger context
- **Log Levels**: ERROR, WARN, INFO, DEBUG, TRACE with environment-based defaults
- **Styled Output**: Color-coded console output with timestamps and context
- **Performance Monitoring**: Built-in timing utilities
- **Log History**: In-memory log storage for debugging
- **Configurable**: Per-context log levels and global settings

## Usage

### Basic Usage
```javascript
import { useLogger } from './composables/useLogger';

const logger = useLogger('myComponent');

logger.error('Something went wrong', errorObject);
logger.warn('Warning message');
logger.info('Info message');
logger.debug('Debug information', { data: 'example' });
logger.trace('Trace message');
```

### With Context
```javascript
// In a composable
export function useMyFeature() {
  const logger = useLogger('myFeature');
  
  const doSomething = () => {
    logger.debug('Starting operation');
    // ... operation code
    logger.info('Operation completed');
  };
  
  return { doSomething };
}
```

### Performance Monitoring
```javascript
const logger = useLogger('performance');

// Method 1: Using time utilities
const result = logger.time('database-query', () => {
  return performDatabaseQuery();
});

// Method 2: Using performance markers
import { perf } from './composables/useLogger';

perf.mark('api-call');
await makeApiCall();
perf.measure('api-call'); // Logs timing automatically
```

### Child Loggers
```javascript
const logger = useLogger('parent');
const childLogger = logger.child('child'); // Creates 'parent:child' context

childLogger.info('Message'); // Logs as [parent:child] Message
```

### Configuration
```javascript
import { updateLogConfig, LOG_LEVELS } from './composables/useLogger';

// Update global log level
updateLogConfig({
  level: LOG_LEVELS.INFO,
  useColors: true,
  includeTimestamp: true
});

// Set context-specific log levels
updateLogConfig({
  contextLevels: {
    'storage': LOG_LEVELS.WARN,
    'relay': LOG_LEVELS.DEBUG
  }
});
```

## Current Implementation

The logging system has been implemented throughout the codebase:

- **Storage operations**: `useLocalStorage` uses 'storage' context
- **Relay operations**: `useRelay` uses 'relay' context  
- **Event processing**: `useEvents` uses 'events' context
- **Market operations**: `useMarket` uses 'market' context
- **Order management**: `useOrders` uses 'orders' context
- **Store actions**: `marketStore` uses 'store' context

## Log Levels

- **ERROR** (0): Critical errors that need immediate attention
- **WARN** (1): Warnings about potential issues  
- **INFO** (2): General information about application flow
- **DEBUG** (3): Detailed debugging information
- **TRACE** (4): Very detailed tracing information

## Environment Configuration

- **Development**: Default log level is DEBUG
- **Production**: Default log level is WARN

## Benefits

1. **Centralized Control**: All logging goes through one system
2. **Better Debugging**: Contextual information and structured data
3. **Performance Insights**: Built-in timing and performance monitoring
4. **Consistent Format**: Standardized log output across the application
5. **Configurable**: Easy to adjust log levels per context or globally
6. **Production Ready**: Automatically reduces log noise in production

## Migration from Console

The old console statements have been replaced with appropriate logger calls:
- `console.error` → `logger.error`
- `console.warn` → `logger.warn`  
- `console.log` → `logger.debug` or `logger.info`
- Removed debug `console.log` statements in Vue components

This provides better control over logging output and improved debugging capabilities.