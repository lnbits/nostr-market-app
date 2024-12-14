import { defineStore } from "pinia";

export const useMarketStore = defineStore("marketStore", {
  state: () => ({
    account: null,
    accountDialog: {
      show: false,
      data: {
        watchOnly: false,
        key: null,
      },
      market: null,
      accountMetadata: null,
      checkoutCart: null,
      checkoutStall: null,
      activePage: "market",
      activeOrderId: null,
      allMarketsSelected: true,
      groupByStall: false,
      bannerImage: null,
      logoImage: null,
      isLoading: false,
      showFilterDetails: false,
      searchText: null,
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
    },
  }),

  actions: {
    openAccountDialog() {
      this.accountDialog.show = true
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

    // Update the UI configuration and apply it
    async updateUiConfig(data = { opts: {} }) {
      const { name, about, ui } = data.opts;
      this.marketState.config = {
        ...this.marketState.config,
        opts: { ...this.marketState.config.opts, name, about, ui },
      };
      this.applyUiConfigs(this.marketState.config?.opts);
    },
  },
});
