import { useMarketStore } from "../stores/marketStore.js";
import { useQuasar } from "quasar"
import { useEvents } from "./useEvents"
import { hash } from "../utils"
import { useLogger } from "./useLogger"

export function useRelay() {
  const marketStore = useMarketStore();
  const eventService = useEvents()
  const $q = useQuasar()
  const logger = useLogger('relay')

  const startRelaysHealtCheck = () => {
    setInterval(() => {
      if (!marketStore.relaysData) return;

      Object.keys(marketStore.relaysData).forEach((k) => {
        const relayData = marketStore.relaysData[k];
        if (relayData?.relay?.status === WebSocket.CLOSED) {
          connectToRelay(k);
        }
      });
    }, 30 * 1000);
  };

  const toRelayKey = async (relayUrl) => {
    return "relay" + (await hash(relayUrl));
  };

  const loadRelaysData = async () => {
    console.log('[DEBUG] loadRelaysData called');
    if (!marketStore.relaysData) {
      marketStore.relaysData = {};
    }

    if (!marketStore.markets?.length) {
      logger.debug('No markets configured, skipping relay data loading');
      return;
    }

    logger.debug('Loading relay data for markets', { marketCount: marketStore.markets.length });

    for (const market of marketStore.markets) {
      console.log('[DEBUG] Processing market:', market.opts?.name, 'merchants:', market.opts?.merchants);
      logger.debug('Loading relay data for market', { 
        marketName: market.opts?.name, 
        relayCount: market.relays?.length, 
        merchantCount: market.opts?.merchants?.length,
        merchants: market.opts?.merchants
      });
      
      for (const relayUrl of market.relays) {
        console.log('[DEBUG] Loading relay data for:', relayUrl, 'with merchants:', market.opts.merchants);
        await loadRelayData(relayUrl, market.opts.merchants);
      }
    }

    Object.keys(marketStore.relaysData).forEach(connectToRelay);
  };

  const loadRelayData = async (relayUrl, merchants) => {
    const relayKey = await toRelayKey(relayUrl);
    if (!marketStore.relaysData) {
      marketStore.relaysData = {};
    }

    marketStore.relaysData[relayKey] = marketStore.relaysData[relayKey] || {
      relayUrl,
      connected: false,
      error: null,
      merchants: [],
      lastEventAt: getLastEventDateForRelay(relayUrl),
    };
    const relayData = marketStore.relaysData[relayKey];
    relayData.merchants = [...new Set(relayData.merchants.concat(merchants))];
  };

  const getLastEventDateForRelay = (relayUrl) => {
    const relay = ($q.localStorage.getItem("nostrmarket.relays") || []).find(
      (r) => r.relayUrl === relayUrl
    );
    logger.debug('Getting last event for relay', { relayUrl, relay });
    return relay?.lastEventAt || 0;
  };

  const connectToRelay = async (relayKey) => {
    const relayData = marketStore.relaysData[relayKey];
    try {
      logger.info(`Connecting to relay ${relayData.relayUrl}`);
      relayData.relay = window.NostrTools.relayInit(relayData.relayUrl);
      relayData.relay.on("connect", () => {
        relayData.connected = true;
        relayData.error = null;
        logger.info(`Connected to relay ${relayData.relayUrl}`);
        console.log('[DEBUG] Relay connected callback triggered for:', relayData.relayUrl, 'relayKey:', relayKey);
        logger.debug('Relay connected, starting query', {
          relayUrl: relayData.relayUrl,
          merchantCount: relayData.merchants?.length,
          merchants: relayData.merchants
        });
        console.log('[DEBUG] About to call queryRelay with key:', relayKey);
        queryRelay(relayKey);
      });
      relayData.relay.on("error", (error) => {
        logger.warn(`Error from relay ${relayData.relayUrl}`, error);
        relayData.connected = false;
        relayData.error = error;
      });
      await relayData.relay.connect();
    } catch (error) {
      relayData.connected = false;
      relayData.error = `${error}`;
      logger.error(`Failed to connect to ${relayData.relayUrl}`, error);
    }
  };

  const requeryAllRelays = async () => {
    Object.keys(marketStore.relaysData).forEach(async (relayKey) => {
      await requeryRelay(relayKey);
    });
  };

  const requeryRelay = async (relayKey) => {
    const relayData = marketStore.relaysData[relayKey];
    if (relayData.connected) {
      relayData.sub?.unsub();
      queryRelay(relayKey);
    }
  };

  const buildRelayFilters = (relayData, phase = 'all') => {
    const authors = relayData.merchants;
    const filters = [];
    
    logger.debug('Building relay filters', {
      relayUrl: relayData.relayUrl,
      phase,
      merchantCount: authors?.length,
      merchants: authors,
      lastEventAt: relayData.lastEventAt
    });

    if (phase === 'all' || phase === 'stalls') {
      const filter = {
        kinds: [30017],
        authors,
      };
      // Only add 'since' if we have a meaningful lastEventAt (> 0)
      if (relayData.lastEventAt > 0) {
        filter.since = relayData.lastEventAt + 1;
      }
      filters.push(filter);
    }

    if (phase === 'all' || phase === 'products') {
      const filter = {
        kinds: [30018],
        authors,
      };
      // Only add 'since' if we have a meaningful lastEventAt (> 0)
      if (relayData.lastEventAt > 0) {
        filter.since = relayData.lastEventAt + 1;
      }
      filters.push(filter);
    }

    if (marketStore.account?.pubkey) {
      const since = 0;
      filters.push(
        {
          kinds: [4],
          "#p": [marketStore.account.pubkey],
          since,
        },
        {
          kinds: [4],
          authors: [marketStore.account.pubkey],
          since,
        }
      );
    }

    return filters;
  };

  const queryRelay = async (relayKey) => {
    console.log('[DEBUG] queryRelay called with key:', relayKey);
    const relayData = marketStore.relaysData[relayKey];
    console.log('[DEBUG] relayData found:', JSON.stringify(relayData, null, 2));
    
    logger.debug('Querying relay for merchant data', {
      relayUrl: relayData.relayUrl,
      merchants: relayData.merchants,
      merchantCount: relayData.merchants?.length
    });

    const stallFilters = buildRelayFilters(relayData, 'stalls');
    console.log('[DEBUG] Stall filters:', JSON.stringify(stallFilters, null, 2));
    logger.debug('Fetching stalls from relay', { relayUrl: relayData.relayUrl, filters: stallFilters });
    
    try {
      const stallEvents = await relayData.relay.list(stallFilters);
      console.log('[DEBUG] Stall events received:', stallEvents?.length || 0, stallEvents);
      if (stallEvents?.length) {
        logger.debug('Processing stall events from relay', {
          relayUrl: relayData.relayUrl,
          stallCount: stallEvents.length,
          merchantsWithStalls: [...new Set(stallEvents.map(e => e.pubkey))]
        });
        await eventService.processEvents(stallEvents, relayData);
      } else {
        console.log('[DEBUG] No stall events found for merchant');
      }
    } catch (error) {
      console.error('[DEBUG] Error fetching stall events:', error);
    }

    const productFilters = buildRelayFilters(relayData, 'products');
    console.log('[DEBUG] Product filters:', JSON.stringify(productFilters, null, 2));
    logger.debug('Fetching products from relay', { relayUrl: relayData.relayUrl, filters: productFilters });
    
    try {
      const productEvents = await relayData.relay.list(productFilters);
      console.log('[DEBUG] Product events received:', productEvents?.length || 0, productEvents);
      if (productEvents?.length) {
        logger.debug('Processing product events from relay', {
          relayUrl: relayData.relayUrl,
          productCount: productEvents.length,
          merchantsWithProducts: [...new Set(productEvents.map(e => e.pubkey))]
        });
        await eventService.processEvents(productEvents, relayData);
      } else {
        console.log('[DEBUG] No product events found for merchant');
      }
    } catch (error) {
      console.error('[DEBUG] Error fetching product events:', error);
    }

    const allFilters = buildRelayFilters(relayData, 'all');
    relayData.sub = relayData.relay.sub(allFilters);
    relayData.sub.on(
      "event",
      (event) => {
        logger.debug('Real-time event received from relay', {
          relayUrl: relayData.relayUrl,
          eventKind: event.kind,
          merchantPubkey: event.pubkey,
          eventType: event.kind === 30017 ? 'stall' : event.kind === 30018 ? 'product' : 'other'
        });
        eventService.processEvent(event, relayData);
      },
      { id: "masterSub" }
    );
  };

  const publishEventToRelays = async (event, relayUrls) => {
    let count = 0;
    for (const relayUrl of relayUrls) {
      if (await publishEventToRelay(event, relayUrl)) {
        count++;
      }
    }
    return count;
  };

  const publishEventToRelay = async (event, relayUrl) => {
    try {
      const relayKey = await toRelayKey(relayUrl);
      const relayData = marketStore.relaysData[relayKey];
      if (relayData?.connected) {
        await relayData.relay.publish(event);
      }
      return true;
    } catch (error) {
      logger.warn('Error publishing event to relay', error);
      return false;
    }
  };

  const findRelaysForMerchant = (pubkey) => {
    const relaysForMerchant = marketStore.markets
      .filter((m) => m.opts.merchants.includes(pubkey))
      .map((m) => m.relays)
      .flat();

    return [...new Set(relaysForMerchant)];
  };

  return {
    startRelaysHealtCheck,
    toRelayKey,
    loadRelaysData,
    loadRelayData,
    connectToRelay,
    requeryAllRelays,
    requeryRelay,
    buildRelayFilters,
    queryRelay,
    publishEventToRelays,
    findRelaysForMerchant,
  };
}
