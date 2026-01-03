# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `quasar dev` - starts hot-reload dev server
- **Build**: `quasar build` - builds for production in `market/` directory
- **Lint**: `npm run lint` or `yarn lint` - runs ESLint on JS/Vue files
- **Format**: `npm run format` or `yarn format` - formats code with Prettier
- **Test**: `npm run test` - currently no tests specified

## Architecture Overview

This is a Vue 3 + Quasar + Pinia application that implements a decentralized Nostr marketplace. The architecture follows a composable pattern with centralized state management.

### Key Architectural Patterns

**State Management**: 
- Uses Pinia store (`marketStore.js`) as the single source of truth
- Store contains market data, user accounts, products, stalls, orders, and UI state
- Store handles complex business logic like filtering, sorting, and data transformations

**Composables Pattern**:
- Business logic is modularized into composables in `src/composables/`
- Key composables: `useMarket`, `useAccount`, `useRelay`, `useEvents`, `useOrders`, `useShoppingCart`, `useDirectMessage`, `useStorage`
- Composables handle Nostr protocol interactions, relay management, and data persistence

**Nostr Integration**:
- Built around Nostr protocol for decentralized marketplace functionality
- Uses relay pools for real-time data synchronization
- Handles various Nostr event types (30017 for stalls, 30018 for products, 30019 for markets)
- Implements direct messaging between buyers and sellers

**Component Structure**:
- Single-page application with dynamic component rendering based on `activePage` state
- Main layout (`MainLayout.vue`) with conditional component rendering
- Components handle UI logic while composables handle business logic
- Uses Quasar UI components throughout

### Data Flow

1. **Initialization**: App loads markets from localStorage, connects to Nostr relays
2. **Data Fetching**: Composables fetch stalls, products, and user data from Nostr relays
3. **State Updates**: All data flows through the Pinia store
4. **UI Updates**: Components reactively update based on store state changes
5. **Persistence**: Critical data is persisted to localStorage via storage composable

### Key Configuration

- **Quasar Config**: Build outputs to `market/` directory, uses hash routing
- **Pinia**: Centralized store with getters for computed data and actions for mutations
- **Vue Router**: Simple routing with main layout and error handling
- **ESLint + Prettier**: Code quality and formatting tools configured

### Development Notes

- Uses Vue 3 Composition API throughout
- Quasar provides UI components and utilities ($q.notify, $q.dialog, $q.localStorage)
- Build targets modern browsers (ES2019+)
- No current test suite - tests would need to be added
- Direct relay connections for real-time Nostr data