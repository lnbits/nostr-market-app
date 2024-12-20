import { useMarketStore } from "../stores/marketStore.js";
import { useQuasar } from "quasar"
import { useEventBus } from "./eventBus"

export function useRelay() {
  const marketStore = useMarketStore();
  const eventBus = useEventBus()
  const $q = useQuasar()

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
    if (!marketStore.relaysData) {
      marketStore.relaysData = {};
    }

    if (!marketStore.markets?.length) return;

    for (const market of marketStore.markets) {
      for (const relayUrl of market.relays) {
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
    console.log("### getLastEventForRelay", relayUrl, relay);
    return relay?.lastEventAt || 0;
  };

  const connectToRelay = async (relayKey) => {
    const relayData = marketStore.relaysData[relayKey];
    try {
      console.log(`Trying to connect to relay ${relayData.relayUrl}`);
      relayData.relay = NostrTools.relayInit(relayData.relayUrl);
      relayData.relay.on("connect", () => {
        relayData.connected = true;
        relayData.error = null;
        console.log(`🟢 Connected to relay ${relayData.relayUrl}`);
        queryRelay(relayKey);
      });
      relayData.relay.on("error", (error) => {
        console.warn(`Error by relay ${relayData.relayUrl}`);
        relayData.connected = false;
        relayData.error = error;
      });
      await relayData.relay.connect();
    } catch (error) {
      relayData.connected = false;
      relayData.error = `${error}`;
      console.warn(`Failed to connect to ${relayData.relayUrl}`);
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

    if (phase === 'all' || phase === 'stalls') {
      filters.push({
        kinds: [30017],
        authors,
        since: relayData.lastEventAt + 1,
      });
    }

    if (phase === 'all' || phase === 'products') {
      filters.push({
        kinds: [30018],
        authors,
        since: relayData.lastEventAt + 1,
      });
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
    const relayData = marketStore.relaysData[relayKey];

    const stallFilters = buildRelayFilters(relayData, 'stalls');
    const stallEvents = await relayData.relay.list(stallFilters);
    if (stallEvents?.length) {
      await eventBus.processEvents(stallEvents, relayData);
    }

    const productFilters = buildRelayFilters(relayData, 'products');
    const productEvents = await relayData.relay.list(productFilters);
    if (productEvents?.length) {
      await eventBus.processEvents(productEvents, relayData);
    }

    const allFilters = buildRelayFilters(relayData, 'all');
    relayData.sub = relayData.relay.sub(allFilters);
    relayData.sub.on(
      "event",
      (event) => {
        eventBus.processEvent(event, relayData);
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
      console.warn(error);
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
