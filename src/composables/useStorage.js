import { useQuasar } from "quasar";
import { useMarketStore } from "../stores/marketStore.js";

export function useStorage() {
  const marketStore = useMarketStore();
  const $q = useQuasar();
  const restoreFromStorage = () => {
    marketStore.markets = $q.localStorage.getItem("nostrmarket.markets") || [];
    marketStore.allMarketsSelected = !marketStore.markets.find(
      (m) => !m.selected
    );

    marketStore.shoppingCarts =
      $q.localStorage.getItem("nostrmarket.shoppingCarts") || [];

    marketStore.profiles =
      $q.localStorage.getItem("nostrmarket.profiles") || [];

    marketStore.account =
      $q.localStorage.getItem("nostrmarket.account") || null;

    marketStore.stalls = $q.localStorage.getItem("nostrmarket.stalls") || [];
    marketStore.products =
      $q.localStorage.getItem("nostrmarket.products") || [];

    const uiConfig = $q.localStorage.getItem(
      "nostrmarket.marketplaceConfig"
    ) || {
      ui: { darkMode: true },
    };

    if (!marketStore.sort) {
      marketStore.sort = {
        options: [
          { field: "categories", label: "Categories" },
          { field: "name", label: "Name" },
          { field: "description", label: "Description" },
          { field: "stallName", label: "Stall" },
          { field: "price", label: "Price" },
          { field: "currency", label: "Currency" },
          { field: "createdAt", label: "Changed" },
        ],
        by: "name",
        order: "asc",
      };
    }

    const sort = $q.localStorage.getItem("nostrmarket.sort") || {};
    if (sort) {
      marketStore.sort.by = sort.by;
      marketStore.sort.order = sort.order;
    }

    if (!marketStore.config) {
      marketStore.config = {
        opts: null,
      };
    }

    marketStore.config = {
      ...marketStore.config,
      opts: { ...marketStore.config.opts, ...uiConfig },
    };

    const prefix = "nostrmarket.orders.";
    const orderKeys = $q.localStorage
      .getAllKeys()
      .filter((k) => k.startsWith(prefix));
    orderKeys.forEach((k) => {
      const pubkey = k.substring(prefix.length);
      marketStore.orders[pubkey] = $q.localStorage.getItem(k);
    });

    const readNotes = $q.localStorage.getItem("nostrmarket.readNotes") || {};
    marketStore.readNotes = { ...marketStore.readNotes, ...readNotes };
  };

  const persistStallsAndProducts = () => {
    $q.localStorage.set("nostrmarket.stalls", marketStore.stalls);
    $q.localStorage.set("nostrmarket.products", marketStore.products);
  };

  const persistRelaysData = () => {
    $q.localStorage.set(
      "nostrmarket.relays",
      Object.values(marketStore.relaysData)
        .filter((r) => !!r)
        .map((relayData) => ({
          lastEventAt: relayData.lastEventAt,
          relayUrl: relayData.relayUrl,
        }))
    );
  };

  const persistDMEvent = (event, peerPubkey) => {
    const dms = $q.localStorage.getItem(`nostrmarket.dm.${peerPubkey}`) || {
      events: [],
      lastCreatedAt: 0,
    };
    const existingEvent = dms.events.find((e) => e.id === event.id);
    if (existingEvent) return;

    dms.events.push(event);
    dms.events.sort((a, b) => a.created_at - b.created_at);
    dms.lastCreatedAt = dms.events[dms.events.length - 1].created_at;
    dms.peerPubkey = peerPubkey;

    $q.localStorage.set(`nostrmarket.dm.${peerPubkey}`, dms);

    if (marketStore.dmEvents?.peerPubkey === peerPubkey) {
      marketStore.dmEvents =
        $q.localStorage.getItem(`nostrmarket.dm.${peerPubkey}`) || {};
    } else {
      // just to force refresh
      marketStore.dmEvents = { ...marketStore.dmEvents };
    }
  };

  const persistOrderUpdate = (pubkey, eventCreatedAt, orderUpdate) => {
    let orders = $q.localStorage.getItem(`nostrmarket.orders.${pubkey}`) || [];
    const orderIndex = orders.findIndex((o) => o.id === orderUpdate.id);

    if (orderIndex === -1) {
      orders.unshift({
        ...orderUpdate,
        eventCreatedAt,
        createdAt: eventCreatedAt,
      });
      marketStore.orders[pubkey] = orders;
      marketStore.orders = { ...marketStore.orders };
      $q.localStorage.set(`nostrmarket.orders.${pubkey}`, orders);
      return;
    }

    let order = orders[orderIndex];

    if (orderUpdate.type === 0) {
      order.createdAt = eventCreatedAt;
      order = {
        ...order,
        ...orderUpdate,
        message: order.message || orderUpdate.message,
      };
    } else {
      order =
        order.eventCreatedAt < eventCreatedAt
          ? { ...order, ...orderUpdate }
          : { ...orderUpdate, ...order };
    }

    orders.splice(orderIndex, 1, order);
    marketStore.orders[pubkey] = orders;
    marketStore.orders = { ...marketStore.orders };
    $q.localStorage.set(`nostrmarket.orders.${pubkey}`, orders);
  };

  return {
    restoreFromStorage,
    persistStallsAndProducts,
    persistOrderUpdate,
    persistRelaysData,
    persistDMEvent,
  };
}
