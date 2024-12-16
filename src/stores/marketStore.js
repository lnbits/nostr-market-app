import { defineStore } from "pinia";
import { useQuasar } from "quasar";

export const useMarketStore = defineStore("marketStore", {
  state: () => ({
    defaultBanner: useQuasar().config.staticPath + "images/nostr-cover.png",
    defaultLogo: useQuasar().config.staticPath + "images/nostr-avatar.png",
    defaultMarketNaddr:
      "naddr1qqjrzerxxu6xxdm994nxyc3s956xzdpc95ukyv3n94nxydrzvgunjcn9x56rwqgkwaehxw309ahx7um5wghxzarfw3kxzm3wd9hsz9nhwden5te0wfjkccte9eshg6t5d3skutnfdupzqz2527ue2pt5ttxukc3juz8m6x6kkha3lymcq5c6ugz7f48grs9pqvzqqqr4gvz5v3j7",
    account: null,
    accountDialog: {
      show: false,
      data: {
        watchOnly: false,
        key: null,
      },
    },
    market: null,
    accountMetadata: null,
    checkoutCart: null,
    checkoutStall: null,
    activePage: "market",
    activeOrderId: null,
    allMarketsSelected: true,
    groupByStall: false, // check this
    bannerImage: null,
    logoImage: null,
    isLoading: false,
    showFilterDetails: false,
    searchText: null,
    lastEvent: null,
    dmEvents: null,
    activeMarket: null,
    activeStall: null,
    activeProduct: null,
    pool: null,
    relays: new Set(),
    dmSubscriptions: {},
    stalls: [],
    products: [],
    orders: {},
    profiles: [],
    relaysData: {},
    shoppingCarts: [],
    markets: [],
    qrCodeDialog: {
      data: {
        payment_request: null,
        message: null,
      },
      dismissMsg: null,
      show: false,
    },
    naddrDialog: {
      show: false,
      publishedNaddr: "",
    },
    filterData: {
      categories: [],
      merchants: [],
      stalls: [],
      currency: null,
      priceFrom: null,
      priceTo: null,
    },
    sort: {
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
    },
    config: {
      opts: null,
    },
    readNotes: {
      merchants: false,
      marketUi: false,
    },
    qInstance: useQuasar(),
  }),
  getters: {
    processedEventIds: (state) => {
      const stallsEventIds = state.stalls.map((s) => s.eventId);
      const productsEventIds = state.products.map((p) => p.eventId);
      // todo: DMs

      return stallsEventIds.concat(productsEventIds);
    },
    marketsName: (state) => {
      if (state.activeMarket) return state.activeMarket.opts?.name || "Market";
      const selectedMarkets = state.markets.filter((m) => m.selected);
      if (selectedMarkets.length === 0) return "No Market";
      if (selectedMarkets.length === 1)
        return selectedMarkets[0].opts?.name || "Market";
      return selectedMarkets.length + " Markets";
    },

    stallName: (state) => {
      return (
        state.stalls.find((s) => s.id == state.activeStall)?.name || "Stall"
      );
    },

    productName: (state) => {
      return (
        state.products.find((p) => p.id == state.activeProduct)?.name ||
        "Product"
      );
    },

    isValidAccountKey: (state) => {
      return isValidKey(state.accountDialog.data.key);
    },

    allCartsItemCount: (state) => {
      return state.shoppingCarts
        .map((s) => s.products)
        .flat()
        .reduce((t, p) => t + p.orderedQuantity, 0);
    },

    allCategories: (state) => {
      const categories = state.products
        .map((p) => p.categories)
        .flat()
        .filter((c) => !!c)
        .map((c) => c.toLowerCase());

      const countedCategories = categories.reduce((all, c) => {
        all[c] = (all[c] || 0) + 1;
        return all;
      }, {});

      return Object.keys(countedCategories)
        .map((category) => ({
          category,
          count: countedCategories[category],
          selected: state.filterData.categories.indexOf(category) !== -1,
        }))
        .sort((a, b) => b.count - a.count);
    },

    allCurrencies: (state) => {
      const currencies = state.products.map((p) => p.currency.toUpperCase());
      return [...new Set(currencies)];
    },

    allMerchants: (state) => {
      return [...new Set(state.markets.map((m) => m.opts.merchants).flat())];
    },

    allRelays: (state) => {
      return [...new Set(state.markets.map((m) => m.relays).flat())];
    },

    activeMarketRelaysData: (state) => {
      if (!state.activeMarket) return [];
      return Object.values(state.relaysData).filter(
        (r) => r && state.activeMarket.relays.includes(r.relayUrl)
      );
    },

    dmPeers: (state) => {
      // force refresh by referencing dmEvents
      const temp = state.dmEvents;
      const prefix = "nostrmarket.dm.";
      const dmKeys = state.qInstance.localStorage
        .getAllKeys()
        .filter((k) => k.startsWith(prefix));

      return dmKeys.map((k) => k.substring(prefix.length));
    },
    selectedMarketsMerchants: (state) => {
      return [
        ...new Set(
          state.markets
            .filter((m) => m.selected)
            .map((m) => m.opts.merchants)
            .flat()
        ),
      ];
    },

    filteredProducts() {
      const isByMerchat = (pubkey) =>
        !this.filterData.merchants?.length ||
        this.filterData.merchants.includes(pubkey);

      const isInMarket = (pubkey) =>
        this.selectedMarketsMerchants.includes(pubkey);

      const isInStall = (stallId) =>
        !this.filterData.stalls?.length ||
        this.filterData.stalls.includes(stallId);

      const hasCurrency = (currency) =>
        !this.filterData.currency ||
        this.filterData.currency.toLowerCase() === currency.toLowerCase();

      const hasPriceFrom = (price) =>
        !this.filterData.priceFrom || price >= this.filterData.priceFrom;

      const hasPriceTo = (price) =>
        !this.filterData.priceTo || price <= this.filterData.priceTo;

      const isInActiveStall = (stallId) =>
        !this.activeStall || stallId == this.activeStall;

      let products = this.products.filter(
        (p) =>
          this.hasCategory(p.categories) &&
          isInActiveStall(p.stall_id) &&
          isByMerchat(p.pubkey) &&
          isInMarket(p.pubkey) &&
          isInStall(p.stall_id) &&
          hasCurrency(p.currency) &&
          hasPriceFrom(p.price) &&
          hasPriceTo(p.price)
      );

      products.sort((a, b) =>
        productCompare(a, b, this.sort.by, this.sort.order)
      );

      if (!this.searchText || this.searchText.length < 2) return products;
      const searchText = this.searchText.toLowerCase();
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchText) ||
          (p.description && p.description.toLowerCase().includes(searchText)) ||
          (p.categories &&
            p.categories.toString().toLowerCase().includes(searchText))
      );
    },

    filterCount() {
      let total = 0;
      if (this.filterData.currency) total++;
      if (this.filterData.priceFrom) total++;
      if (this.filterData.priceTo) total++;
      if (this.filterData.categories)
        total += this.filterData.categories.length;
      if (this.filterData.merchants) total += this.filterData.merchants.length;
      if (this.filterData.stalls) total += this.filterData.stalls.length;

      return total;
    },

    filterStalls() {
      const stalls = this.stalls
        .map((s) => ({
          ...s,
          categories: this.allStallCatgories(s.id),
          images: this.allStallImages(s.id).slice(0, 8),
          productCount: this.products.filter((p) => p.stall_id === s.id).length,
        }))
        .filter((p) => this.hasCategory(p.categories));

      if (!this.searchText || this.searchText.length < 2) return stalls;

      const searchText = this.searchText.toLowerCase();
      return this.stalls.filter(
        (s) =>
          s.name.toLowerCase().includes(searchText) ||
          (s.description && s.description.toLowerCase().includes(searchText)) ||
          (s.categories &&
            s.categories.toString().toLowerCase().includes(searchText))
      );
    },
  },

  actions: {
    markNoteAsRead(noteId) {
      this.readNotes[noteId] = true;
      this.qInstance.localStorage.set("nostrmarket.readNotes", this.readNotes);
    },
    focusOnElement(elementId) {
      document.getElementById(elementId)?.scrollIntoView();
      this.showFilterDetails = true;
    },
    sortProducts(by, order = "asc") {
      this.sort.by = by;
      this.sort.order = order;
      this.qInstance.localStorage.set("nostrmarket.sort", { by, order });
    },
    sanitizeImageSrc(src, defaultValue) {
      try {
        if (src) {
          new URL(src);
          return src;
        }
      } catch {}
      return defaultValue;
    },
    toggleCategoryFilter(category) {
      const index = this.filterData.categories.indexOf(category);
      if (index === -1) {
        this.filterData.categories.push(category);
      } else {
        this.filterData.categories.splice(index, 1);
      }
    },
    openAccountDialog() {
      this.accountDialog.show = true;
    },
    setActivePage(page = "market") {
      console.log(page);
      this.activePage = page;
      console.log(this.activePage);
    },

    transitToPage(pageName) {
      this.activePage = "loading";
      setTimeout(() => this.setActivePage(pageName), 100);
    },

    getAmountFormatted(amount, unit = "USD") {
      return formatCurrency(amount, unit);
    },

    applyUiConfigs(opts = {}) {
      const { name, about, ui } = opts;
      this.qInstance.localStorage.set("nostrmarket.marketplaceConfig", {
        name,
        about,
        ui,
      });
      if (ui?.theme) {
        document.body.setAttribute("data-theme", ui.theme);
      }
      this.qInstance.dark.set(!!ui?.darkMode);
    },

    // Update the UI configuration and apply it
    async updateUiConfig(data = { opts: {} }) {
      const { name, about, ui } = data.opts;
      this.config = {
        ...this.config,
        opts: { ...this.config.opts, name, about, ui },
      };
      this.applyUiConfigs(this.config?.opts);
    },
    // Ensure these actions are defined somewhere in the store
    hasCategory(categories = []) {
      // implement logic
      if (!this.filterData.categories?.length) return true;
      for (const cat of categories) {
        if (this.filterData.categories.indexOf(cat.toLowerCase()) !== -1)
          return true;
      }
      return false;
    },

    allStallCatgories(stallId) {
      const categories = this.products
        .filter((p) => p.stall_id === stallId)
        .map((p) => p.categories)
        .flat()
        .filter((c) => !!c);
      return Array.from(new Set(categories));
    },

    allStallImages(stallId) {
      const images = this.products
        .filter((p) => p.stall_id === stallId)
        .map((p) => p.images && p.images[0])
        .filter((i) => !!i);
      return Array.from(new Set(images));
    },
  },
});
