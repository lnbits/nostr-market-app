# Nostr Market App - Improvement Plan

This document outlines recommended improvements for the Nostr Market App, organized by category and priority.

## Table of Contents

1. [Code Quality & Bug Fixes](#1-code-quality--bug-fixes)
2. [Architecture Improvements](#2-architecture-improvements)
3. [Missing Features](#3-missing-features)
4. [Performance Optimizations](#4-performance-optimizations)
5. [Testing Strategy](#5-testing-strategy)
6. [Developer Experience](#6-developer-experience)
7. [UX Improvements](#7-ux-improvements)
8. [Quick Wins](#8-quick-wins)
9. [Priority Ranking](#9-priority-ranking)

---

## 1. Code Quality & Bug Fixes

### Immediate Issues

| Issue | Location | Fix |
|-------|----------|-----|
| Typo: `currencty` → `currency` | `src/composables/useEvents.js:129` | Simple text fix |
| Typo: `relaysHealtCheck` → `relaysHealthCheck` | `src/composables/useRelay.js:13` | Rename function |
| Missing `window.` prefix for NostrTools | `src/composables/useDirectMessage.js:27-40` | Add `window.NostrTools` |
| Inconsistent NostrTools access | Various files | Standardize to `window.NostrTools` everywhere |
| Debug console.log statements | `src/composables/useRelay.js` (multiple lines) | Remove or convert to logger |

### Mixed Logging

The codebase has both raw `console.log('[DEBUG]...')` statements and the proper `useLogger` system. Files with debug statements to clean up:

- `src/composables/useRelay.js` - Lines 31, 44, 53, 95, 101, 187-189, 198, 203, 212-216, 219, 223-225, 234
- `src/pages/MarketPage.vue` - Line 856

**Action:** Remove debug console statements or migrate to `useLogger` composable.

---

## 2. Architecture Improvements

### 2.1 Private Key Handling (Security)

**Current State:**
- Private keys stored in localStorage (`nostrmarket.account`)
- Vulnerable to XSS attacks that could exfiltrate keys

**Recommendations:**

1. **Prioritize NIP-07 browser extension support**
   - The `useExtension` flag exists but is underutilized
   - Make extension-based auth the default/recommended path
   - Add prominent UI guidance to install Alby/nos2x

2. **Encrypt sensitive data at rest**
   - Use WebCrypto API to encrypt account data
   - Derive encryption key from user passphrase

3. **Add security warnings**
   - Warn users when pasting raw private keys
   - Show indicator when using extension vs raw key

### 2.2 Relay Connection Resilience

**Current State:**
```javascript
// Fixed 30s health check interval, no backoff strategy
setInterval(() => { ... }, 30 * 1000);
```

**Recommendations:**

1. **Exponential backoff for failed connections**
   ```javascript
   // Suggested implementation
   const backoffMs = Math.min(1000 * Math.pow(2, retryCount), 60000);
   ```

2. **Connection quality scoring**
   - Track latency per relay
   - Track success/failure rate
   - Prioritize faster/more reliable relays

3. **UI indicators**
   - Show relay connection status (connected/connecting/failed)
   - Allow manual reconnection

### 2.3 State Management Refactoring

**Current State:**
- Single `marketStore.js` at ~450 lines handling everything

**Recommendation:** Split into focused stores:

```
src/stores/
├── marketplaceStore.js   # markets, stalls, products, relays
├── userStore.js          # account, orders, DMs, profiles
└── uiStore.js            # activePage, dialogs, filters, sort
```

---

## 3. Missing Features

### 3.1 Offline Support (PWA)

**Current State:**
- Quasar PWA is configured but minimal
- No offline caching strategy

**Recommendations:**

1. **Cache critical data for offline browsing**
   - Stalls and products in IndexedDB
   - User's order history

2. **Offline queue for actions**
   - Queue orders when offline
   - Sync when connection restored
   - Queue DMs for later delivery

3. **UI indicators**
   - "Offline" banner when disconnected
   - "Pending sync" indicator for queued actions

### 3.2 Enhanced Search & Discovery

1. **Full-text search** across product names, descriptions, categories
2. **Search history** with recent/saved searches
3. **Filter presets** - save and restore filter combinations
4. **Product recommendations** based on browsing history

### 3.3 Order Tracking Improvements

1. **Order status timeline** - visual representation of order progress
2. **Per-order messaging** - threaded conversation with merchant about specific order
3. **Order notifications** - push notifications for status changes (PWA)
4. **Order dispute flow** - structured process for issues

---

## 4. Performance Optimizations

### 4.1 Component Splitting

**Current State:**
- `MarketPage.vue` is 930+ lines handling all page rendering

**Recommendation:** Extract into focused components:

```
src/components/
├── layout/
│   ├── MarketHeader.vue        # Logo, search, button group
│   ├── MarketBreadcrumb.vue    # Navigation breadcrumbs
│   └── CategoryBar.vue         # Horizontal category chips
├── dialogs/
│   ├── AccountDialog.vue       # Login/key entry
│   ├── InvoiceDialog.vue       # Payment QR code
│   └── NaddrDialog.vue         # Published market address
└── pages/
    └── MarketPage.vue          # Simplified orchestrator
```

### 4.2 Data Loading Optimization

**Current State:**
```javascript
// Loads ALL stalls, then ALL products sequentially
const stallEvents = await relayData.relay.list(stallFilters);
const productEvents = await relayData.relay.list(productFilters);
```

**Recommendations:**

1. **Pagination/cursor-based loading**
   - Load first 50 products, fetch more on scroll
   - Use `limit` in Nostr filters

2. **Lazy image loading**
   - Intersection Observer for off-screen images
   - Placeholder/skeleton while loading

3. **Response caching**
   - Cache relay responses with TTL
   - Invalidate on subscription updates

### 4.3 Reactivity Optimization

**Current State:**
```javascript
// 50+ refs extracted from store
const { ... } = storeToRefs(marketStore);
```

**Recommendations:**
- Use `computed()` for derived data instead of direct refs
- Avoid unnecessary re-renders with `shallowRef` where appropriate
- Consider `markRaw()` for non-reactive data (relay connections)

---

## 5. Testing Strategy

### Current State

No tests exist in the codebase.

### Recommended Test Coverage

**Priority 1 - Critical Paths:**
- Order placement flow (end-to-end)
- NIP-04 encryption/decryption
- Key validation (`isValidKey`, nip19 encoding/decoding)
- Relay filter building

**Priority 2 - Data Integrity:**
- Event processing (stall, product, DM events)
- localStorage persistence and restoration
- Shopping cart operations (add, remove, checkout)
- Product queue (waiting for stalls)

**Priority 3 - UI Components:**
- Component snapshot tests
- Filter/sort behavior
- Navigation flow

### Suggested Stack

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@vue/test-utils": "^2.4.0",
    "msw": "^2.0.0",
    "@testing-library/vue": "^8.0.0"
  }
}
```

### Example Test Structure

```
tests/
├── unit/
│   ├── composables/
│   │   ├── useEvents.test.js
│   │   ├── useRelay.test.js
│   │   └── useShoppingCart.test.js
│   └── utils/
│       ├── validation.test.js
│       └── crypto.test.js
├── integration/
│   ├── orderFlow.test.js
│   └── relayConnection.test.js
└── mocks/
    └── nostrTools.js
```

---

## 6. Developer Experience

### 6.1 TypeScript Migration

**Benefits for this codebase:**
- Nostr events have complex, kind-specific content structures
- Many functions pass untyped objects
- IDE autocomplete for store/composable methods
- Catch errors at compile time

**Migration path:**
1. Add `tsconfig.json` with loose settings
2. Rename files incrementally (`.js` → `.ts`)
3. Add types for Nostr events first (most complex)
4. Type composable return values
5. Gradually enable stricter checks

### 6.2 Code Organization

**Current:**
```
src/
├── composables/     # 11 files
├── components/      # 14 files (flat)
├── stores/          # 1 file
└── utils/           # 7 files
```

**Recommended:**
```
src/
├── composables/
│   ├── nostr/           # useRelay, useEvents, useDirectMessage
│   ├── commerce/        # useOrders, useShoppingCart
│   └── storage/         # useAppStorage, useLocalStorage
├── components/
│   ├── market/          # CustomerMarket, CustomerStall, CustomerStallList
│   ├── cart/            # ShoppingCartList, ShoppingCartCheckout
│   ├── user/            # UserConfig, UserChat, UserProfile
│   ├── common/          # ProductCard, ButtonGroup, ProductFilter
│   └── dialogs/         # Extracted dialog components
├── stores/
│   ├── marketplaceStore.js
│   ├── userStore.js
│   └── uiStore.js
├── types/               # TypeScript interfaces (when migrated)
└── utils/
```

---

## 7. UX Improvements

### 7.1 Accessibility

- [ ] Add ARIA labels to all interactive elements
- [ ] Keyboard navigation support (tab order, Enter/Space activation)
- [ ] Screen reader announcements for async operations
- [ ] Focus management in dialogs
- [ ] Color contrast compliance (WCAG AA)

### 7.2 Error Handling

**Current State:**
```javascript
} catch (error) {
  logger.warn('Failed to place order', error)
  $q.notify({ type: "warning", message: "Failed to place order!" })
}
```

**Improvements:**

1. **User-friendly error messages**
   - Explain what went wrong in plain language
   - Suggest next steps

2. **Retry mechanisms**
   - "Try again" button for transient failures
   - Auto-retry with backoff for network errors

3. **Error boundary component**
   - Catch rendering errors
   - Show fallback UI instead of blank screen

### 7.3 Loading States

- [ ] Skeleton loaders for content (instead of spinners)
- [ ] Progress indicators for multi-step operations
- [ ] Optimistic UI updates for cart operations
- [ ] Streaming/progressive loading for product lists

---

## 8. Quick Wins

Low effort, high impact improvements:

| Improvement | Effort | Impact |
|-------------|--------|--------|
| Remove dead code and comments (e.g., "commented out by cursor") | 1h | Clean codebase |
| Standardize on `useAppStorage`, remove deprecated `useStorage` | 2h | Reduce confusion |
| Add relay connection status indicators in UI | 3h | User confidence |
| Product image gallery (show all images, not just first) | 3h | Better product display |
| Pre-select user's country/region in shipping selector | 2h | Faster checkout |
| Remember last active page on refresh | 1h | Better UX |
| Add "copy to clipboard" feedback animation | 1h | Polish |
| Fix typos (currencty, relaysHealtCheck) | 30m | Code quality |

---

## 9. Priority Ranking

| Priority | Category | Effort | Impact | Status |
|----------|----------|--------|--------|--------|
| 1 | Bug fixes (typos, NostrTools consistency) | Low | Medium | [ ] |
| 2 | Remove debug console.log statements | Low | Low | [ ] |
| 3 | NIP-07 extension as primary auth method | Medium | High | [ ] |
| 4 | Split MarketPage.vue into smaller components | Medium | High | [ ] |
| 5 | Add basic test coverage (critical paths) | Medium | High | [ ] |
| 6 | Relay connection resilience (backoff, status) | Medium | Medium | [ ] |
| 7 | TypeScript migration | High | High | [ ] |
| 8 | Offline/PWA support | High | Medium | [ ] |

---

## Implementation Notes

### Getting Started

1. Start with Priority 1 (bug fixes) - can be done in a single PR
2. Priority 2 (console.log cleanup) - pairs well with Priority 1
3. Priority 3-4 can be worked on in parallel by different developers

### Branching Strategy

```
main
├── fix/typos-and-nostrtools      # Priority 1
├── fix/remove-debug-logs         # Priority 2
├── feature/nip07-auth            # Priority 3
├── refactor/split-market-page    # Priority 4
└── test/critical-paths           # Priority 5
```

### Breaking Changes

- Store splitting (Priority 2.3) may require updates to all components
- TypeScript migration will require build config changes
- Consider feature flags for gradual rollout of major changes

---

*Last updated: January 2026*
