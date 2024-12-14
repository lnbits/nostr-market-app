import { useQuasar } from "quasar";
import { useMarketStore } from "../stores/marketStore";
import { useStorage } from "./useStorage";
import { useRelay } from "./useRelay";
import { useEvents } from "./useEvents";

export function useMarket() {
  const $q = useQuasar();
  const marketStore = useMarketStore();
  const storage = useStorage();
  const relayService = useRelay();
  const eventService = useEvents();

  const navigateTo = (
    page,
    opts = { stall: null, product: null, pubkey: null }
  ) => {
    console.log("### navigateTo", page, opts);

    const { stall, product, pubkey } = opts;
    const url = new URL(window.location);

    const merchantPubkey =
      pubkey || this.stalls.find((s) => s.id == stall)?.pubkey;
    url.searchParams.set("merchant", merchantPubkey);

    if (page === "stall" || page === "product") {
      if (stall) {
        this.activeStall = stall;
        this.setActivePage("customer-stall");
        url.searchParams.set("stall", stall);

        this.activeProduct = product;
        if (product) {
          url.searchParams.set("product", product);
        } else {
          url.searchParams.delete("product");
        }
      }
    } else {
      this.activeMarket = null;
      this.activeStall = null;
      this.activeProduct = null;

      url.searchParams.delete("merchant");
      url.searchParams.delete("stall");
      url.searchParams.delete("product");

      this.setActivePage(page);
    }

    window.history.pushState({}, "", url);
    // this.activePage = page
  };

  const createMarket = async (navigateToConfig, merchants) => {
    try {
      marketStore.setActivePage("loading");
      const market = {
        d: crypto.randomUUID(),
        pubkey: marketStore.account?.pubkey || "",
        relays: [...defaultRelays],
        selected: true,
        opts: {
          name: "New Market",
          merchants: merchants || [],
          ui: {},
        },
      };
      marketStore.markets.unshift(market);
      $q.localStorage.set("nostrmarket.markets", marketStore.markets);

      for (const relayUrl of market.relays) {
        // do not wait for relays
        _handleNewRelay(relayUrl, market);
      }
      if (navigateToConfig === true) {
        showMarketConfig(0);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      marketStore.setActivePage("market-config");
    }
  };

  const addMarket = async (naddr) => {
    if (!naddr) return;

    try {
      marketStore.setActivePage("loading");
      const { type, data } = NostrTools.nip19.decode(naddr);
      if (type !== "naddr" || data.kind !== 30019) return; // just double check

      const market = {
        d: data.identifier,
        pubkey: data.pubkey,
        relays: data.relays,
        selected: true,
      };

      const pool = new NostrTools.SimplePool();
      const event = await pool.get(market.relays, {
        kinds: [30019],
        limit: 1,
        authors: [market.pubkey],
        "#d": [market.d],
      });

      if (!event) return;

      if (isJson(event.content)) {
        market.opts = JSON.parse(event.content);
        $q.dialog(
          confirm(
            `Do you want to use the look and feel of the '${market.opts.name}' market?`
          )
        ).onOk(async () => {
          marketStore.config = { ...marketStore.config, opts: market.opts };
          storage.applyUiConfigs(market?.opts);
        });
      }

      marketStore.markets = marketStore.markets.filter(
        (m) => m.d !== market.d || m.pubkey !== market.pubkey
      );
      marketStore.markets.unshift(market);
      $q.localStorage.set("nostrmarket.markets", marketStore.markets);

      for (const relayUrl of market.relays) {
        await _handleNewRelay(relayUrl, market);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      marketStore.setActivePage("market");
    }
  };

  const updateMarket = (market) => {
    try {
      marketStore.isLoading = true;

      const { d, pubkey } = market;

      const existingMarket =
        marketStore.markets.find((m) => m.d === d && m.pubkey === pubkey) || {};

      const newMerchants = market.opts?.merchants.filter(
        (m) => !existingMarket.opts?.merchants.includes(m)
      );
      const removedMerchants = existingMarket.opts?.merchants.filter(
        (m) => !market.opts?.merchants.includes(m)
      );
      const newRelays = market.relays.filter(
        (r) => !existingMarket.relays.includes(r)
      );
      const removedRelays = existingMarket.relays.filter(
        (r) => !market.relays.includes(r)
      );

      marketStore.markets = marketStore.markets.filter(
        (m) => m.d !== d || m.pubkey !== pubkey
      );
      marketStore.markets.unshift(market);
      $q.localStorage.set("nostrmarket.markets", marketStore.markets);

      removedMerchants?.forEach(_handleRemoveMerchant);
      newMerchants?.forEach((m) => _handleNewMerchant(market, m));

      console.log("### newRelays", newRelays);
      console.log("### removedRelays", removedRelays);

      newRelays?.forEach((r) => _handleNewRelay(r, market));
      removedRelays?.forEach(_handleRemovedRelay);

      // stalls and products can be removed when a market is updated
      storage.persistStallsAndProducts();
      storage.persistRelaysData();
    } catch (error) {
      console.warn(error);
    } finally {
      marketStore.isLoading = false;
    }
  };
  const deleteMarket = (market) => {
    try {
      marketStore.isLoading = true;

      const { d, pubkey } = market;
      marketStore.markets = marketStore.markets.filter(
        (m) => m.d !== d || m.pubkey !== pubkey
      );
      $q.localStorage.set("nostrmarket.markets", marketStore.markets);
      if (
        marketStore.activeMarket &&
        marketStore.activeMarket.d === d &&
        marketStore.activeMarket.pubkey === pubkey
      ) {
        marketStore.activeMarket = null;
        marketStore.navigateTo("market");
        storage.updateUiConfig(marketStore.markets[0]);
      }
      market.opts.merchants?.forEach(_handleRemoveMerchant);
      market.relays?.forEach(_handleRemovedRelay);

      storage.persistStallsAndProducts();
      storage.persistRelaysData();
    } catch (error) {
      console.warn(error);
    } finally {
      marketStore.isLoading = false;
    }
  };
  const toggleMarket = () => {
    marketStore.allMarketsSelected = !marketStore.markets.find(
      (m) => !m.selected
    );
    $q.localStorage.set("nostrmarket.markets", marketStore.markets);
  };
  const toggleAllMarkets = () => {
    marketStore.markets.forEach(
      (m) => (m.selected = marketStore.allMarketsSelected)
    );
    $q.localStorage.set("nostrmarket.markets", marketStore.markets);
  };
  const showMarketConfig = (index) => {
    marketStore.activeMarket = marketStore.markets[index];
    marketStore.transitToPage("market-config");
  };
  const publishNaddr = async (marketData) => {
    if (!marketStore.account?.privkey) {
      marketStore.openAccountDialog();
      $q.notify({
        message: "Login Required!",
        icon: "warning",
      });
      return;
    }

    console.log("### marketData", marketData);
    const identifier = marketData.d ?? crypto.randomUUID();
    const event = {
      ...(await NostrTools.getBlankEvent()),
      kind: 30019,
      content: JSON.stringify(marketData.opts),
      created_at: Math.floor(Date.now() / 1000),
      tags: [["d", identifier]],
      pubkey: marketStore.account.pubkey,
    };
    event.id = NostrTools.getEventHash(event);
    try {
      event.sig = await NostrTools.signEvent(
        event,
        marketStore.account.privkey
      );

      const relayCount = await relayService.publishEventToRelays(
        event,
        marketData.relays
      );

      $q.notify({
        type: relayCount ? "positive" : "warning",
        message: relayCount
          ? `The market profile has been published tp (${relayCount} relays)!`
          : "The market profile could not be published",
      });
    } catch (err) {
      console.error(err);
      $q.notify({
        message: "Cannot publish market profile",
        caption: `Error: ${err}`,
        color: "negative",
      });
      return;
    }
    const naddr = NostrTools.nip19.naddrEncode({
      pubkey: event.pubkey,
      kind: 30019,
      identifier: identifier,
      relays: marketData.relays,
    });
    marketStore.naddrDialog.publishedNaddr = naddr;
    marketStore.naddrDialog.show = true;
  };

  const _handleNewMerchant = (market, merchantPubkey) => {
    Object.keys(marketStore.relaysData).forEach(async (relayKey) => {
      const relayData = marketStore.relaysData[relayKey];
      if (!market.relays.includes(relayData.relayUrl)) return;
      if (relayData.merchants.includes(merchantPubkey)) return;

      const events = await relayData.relay.list([
        { kinds: [30017, 30018], authors: [merchantPubkey] },
      ]);
      await eventService.processEvents(events, relayData);

      relayData.merchants.push(merchantPubkey);
      await relayService.requeryRelay(relayKey);
    });
  };

  const _handleNewRelay = async (relayUrl, market) => {
    const relayKey = await relayService.toRelayKey(relayUrl);
    if (marketStore.relaysData[relayKey]) {
      const relayData = marketStore.relaysData[relayKey];
      const events = await relayData.relay.list([
        { kinds: [30017, 30018], authors: market.opts.merchants },
      ]);

      await eventService.processEvents(events, relayData);
      relayData.merchants = [
        ...new Set(relayData.merchants.concat(market.opts.merchants)),
      ];
      await relayService.requeryRelay(relayKey);
    } else {
      await relayService.loadRelayData(relayUrl, market.opts.merchants);
      await relayService.connectToRelay(relayKey);
    }
  };
  const _handleRemoveMerchant = (merchantPubkey) => {
    const marketWithMerchant = marketStore.markets.find((m) =>
      m.opts.merchants.find((mr) => mr === merchantPubkey)
    );
    // other markets still have this merchant
    if (marketWithMerchant) return;

    // remove all products and stalls from that merchant
    marketStore.products = marketStore.products.filter(
      (p) => p.pubkey !== merchantPubkey
    );
    marketStore.stalls = marketStore.stalls.filter(
      (s) => s.pubkey !== merchantPubkey
    );

    _removeSubscriptionsForMerchant(merchantPubkey);
  };
  const _removeSubscriptionsForMerchant = (merchantPubkey) => {
    Object.keys(marketStore.relaysData).forEach(async (relayKey) => {
      const relayData = marketStore.relaysData[relayKey];
      if (!relayData.merchants.includes(merchantPubkey)) return;
      relayData.merchants = relayData.merchants.filter(
        (m) => m !== merchantPubkey
      );

      await relayService.requeryRelay(relayKey);
    });
  };
  const _handleRemovedRelay = async (relayUrl) => {
    // todo: later
    // leave products and stalls alone
    const marketWitRelay = marketStore.markets.find((m) =>
      m.relays.find((r) => r === relayUrl)
    );
    if (!marketWitRelay) {
      // relay no longer exists
      const relayKey = await relayService.toRelayKey(relayUrl);
      delete marketStore.relaysData[relayKey];
      relayService.persistRelaysData();
    }
  };

  return {
    createMarket,
    navigateTo,
    addMarket,
    updateMarket,
    deleteMarket,
    toggleMarket,
    toggleAllMarkets,
    showMarketConfig,
    publishNaddr,
    _handleNewMerchant,
    _handleNewRelay,
    _handleRemoveMerchant,
    _removeSubscriptionsForMerchant,
    _handleRemovedRelay,
  };
}
