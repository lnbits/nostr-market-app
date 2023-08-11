<template>
  <q-page>
    <div class="row q-mb-md">
      <div class="col-lg-1 col-md-1 gt-sm">
        <q-avatar rounded size="64px" class="q-ma-none q-pa-none gt-sm">
          <img v-if="logoImage" :src="logoImage" />
        </q-avatar>
      </div>
      <div class="col-lg-7 col-md-5 col-12 auto-width">
        <div id="search-text"></div>
        <q-input
          class="rounded-pill"
          style="width: 100%"
          rounded
          outlined
          clearable
          v-model.trim="searchText"
          label="Filter products, load market profile..."
        >
          <template v-if="showFilterDetails" v-slot:label>
            Filter or paste a
            <q-badge class="q-px-sm text-subtitle1" color="secondary"
              >naddr</q-badge
            >
            here
          </template>
          <template v-slot:append>
            <q-icon v-if="!searchText" name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-lg-4 col-md-6 col-12">
        <div class="float-right">
          <q-btn
            color="gray"
            icon="travel_explore"
            flat
            size="lg"
            @click="navigateTo('product-filter')"
            ><q-tooltip>Search for products on Nostr</q-tooltip>
            <q-badge v-if="filterCount" color="secondary" floating>
              <span v-text="filterCount"></span>
            </q-badge>
          </q-btn>

          <q-btn
            @click="navigateTo('user-config')"
            color="gray"
            :icon="account ? 'perm_identity' : 'person_add'"
            flat
            size="lg"
            ><q-tooltip>User User Config</q-tooltip></q-btn
          >

          <q-btn
            @click="navigateTo('user-chat')"
            color="gray"
            icon="chat"
            flat
            size="lg"
            ><q-tooltip>Chat</q-tooltip></q-btn
          >
          <q-btn
            @click="navigateTo('customer-orders')"
            color="gray"
            icon="receipt_long"
            flat
            size="lg"
            ><q-tooltip>Orders</q-tooltip></q-btn
          >
          <q-btn
            color="gray"
            icon="shopping_cart"
            dense
            round
            flat
            size="lg"
            @click="navigateTo('shopping-cart-list')"
          >
            <q-tooltip>Shopping Cart</q-tooltip>

            <q-badge v-if="allCartsItemCount" color="secondary" floating>
              <span v-text="allCartsItemCount"></span>
            </q-badge>
          </q-btn>
        </div>
      </div>
    </div>

    <div v-if="products?.length" class="gt-sm">
      <q-virtual-scroll :items="allCategories" virtual-scroll-horizontal>
        <template v-slot="{ item, index }">
          <q-chip
            :key="index"
            :color="item.selected ? 'grey' : ''"
            class="cursor-pointer q-mb-md"
          >
            <span
              v-text="item.category"
              @click="toggleCategoryFilter(item.category)"
            ></span>
            <q-badge
              @click="toggleCategoryFilter(item.category)"
              rounded
              class="q-ml-sm"
              color="secondary"
            >
              <span v-text="item.count"></span
            ></q-badge>
          </q-chip>
        </template>
      </q-virtual-scroll>
    </div>

    <div v-if="isLoading" class="row q-mb-sm">
      <div class="col-12 text-center">
        <q-spinner-dots color="primary" size="xl" />
      </div>
    </div>

    <q-banner class="row q-pa-none q-mb-lg gt-sm shadow-2">
      <q-img
        v-if="bannerImage"
        :src="bannerImage"
        class="rounded-borders"
        style="width: 100%; height: 250px"
        cover
      >
        <div
          v-if="config?.opts?.about"
          class="absolute-bottom text-subtitle1 text-center"
        >
          <span v-text="config.opts.about"></span>
        </div>
      </q-img>
    </q-banner>

    <div class="row q-mb-sm">
      <div class="col-md-10 col-sm-7 auto-width">
        <q-breadcrumbs class="cursor q-mt-sm q-mr-sm">
          <q-breadcrumbs-el>
            <q-btn
              @click="navigateTo('market')"
              icon="home"
              flat
              class="q-pa-none"
            >
              <span v-text="marketsName" class="q-ml-sm"></span>
            </q-btn>
            <q-btn-dropdown flat class="q-pl-xs">
              <q-list>
                <q-item v-ripple>
                  <q-item-section side top>
                    <q-checkbox
                      v-model="allMarketsSelected"
                      @click="toggleAllMarkets"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label> <strong>All markets</strong></q-item-label>
                    <q-item-label caption
                      >Aggregate all markets into one view</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side top>
                    <q-btn
                      @click="createMarket(true)"
                      color="green"
                      outline
                      v-close-popup
                      >New</q-btn
                    >
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item v-for="(market, index) of markets" :key="index">
                  <q-item-section side top>
                    <q-checkbox
                      v-model="market.selected"
                      @click="toggleMarket()"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <span v-text="market.opts?.name || 'Market'"></span>
                    </q-item-label>
                    <q-item-label caption>
                      <span
                        v-text="market.opts?.about"
                        class="ellipsis-2-lines text-wrap"
                      ></span>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-btn
                      color="secondary"
                      flat
                      v-close-popup
                      icon="settings"
                      @click="showMarketConfig(index)"
                    />
                  </q-item-section>
                </q-item> </q-list
            ></q-btn-dropdown>
          </q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="activePage === 'customer-stall'"
            :label="stallName"
            @click="navigateTo('stall', { stall: activeStall })"
            icon="storefront"
            class="cursor-pointer"
          ></q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="activePage === 'customer-stall' && activeProduct"
            :label="productName"
            class="cursor-pointer"
            icon="widgets"
          ></q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="activePage === 'shopping-cart-list'"
            label="Shoping Cart"
            icon="shopping_cart"
          ></q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="activePage === 'customer-orders'"
            label="Orders"
            icon="receipt_long"
          ></q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="activePage === 'market-config'"
            label="Settings"
            icon="settings"
          ></q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="activePage === 'product-filter'"
            label="Filter"
            icon="travel_explore"
          ></q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="activePage === 'user-config'"
            label="User Config"
            icon="perm_identity"
          ></q-breadcrumbs-el>
          <q-breadcrumbs-el
            v-if="activePage === 'user-chat'"
            label="User Chat"
            icon="chat"
          ></q-breadcrumbs-el>
        </q-breadcrumbs>
      </div>
      <div class="col-md-2 col-sm-5">
        <q-btn
          v-if="activePage === 'customer-stall'"
          flat
          color="grey"
          icon="content_copy"
          @click="copyUrl()"
          class="float-right"
        ></q-btn>
        <q-checkbox
          v-model="groupByStall"
          v-else-if="activePage === 'market' && stalls?.length"
          class="q-pl-md q-mt-sm float-right"
          size="xs"
          val="xs"
          label="Group by stalls"
        ></q-checkbox>
      </div>
    </div>

    <q-separator class="q-mt-sm q-mb-md"></q-separator>

    <div v-if="activePage === 'loading'" class="row q-mb-sm">
      <div class="col-12 text-center">
        <q-spinner-dots color="primary" size="xl" />
      </div>
    </div>
    <product-filter
      v-if="activePage === 'product-filter'"
      :filter="filterData"
      :categories="allCategories"
      :currencies="allCurrencies"
      :merchants="allMerchants"
      :stalls="stalls"
      :profiles="profiles"
      @filter-update="handleFilterData"
      class="q-mb-md"
    ></product-filter>
    <market-config
      v-else-if="activeMarket && activePage === 'market-config'"
      :market="activeMarket"
      :profiles="profiles"
      :relays-data="activeMarketRelaysData"
      :read-notes="readNotes"
      @apply-ui="updateUiConfig"
      @market-update="updateMarket"
      @delete-market="deleteMarket"
      @publish-naddr="publishNaddr"
      @note-read="markNoteAsRead"
    ></market-config>

    <user-config
      v-else-if="activePage === 'user-config'"
      :account="account"
      @login="accountDialog.show = true"
      @logout="logout"
      @clear-all-data="clearAllData"
      @copy-text="copyText"
    ></user-config>

    <user-chat
      v-else-if="activePage === 'user-chat'"
      :account-pubkey="account?.pubkey"
      :peer-pubkeys="dmPeers"
      :profiles="profiles"

    ></user-chat>
    <!-- :events="dmEvents" -->

    <shopping-cart-list
      v-else-if="activePage === 'shopping-cart-list'"
      :carts="shoppingCarts"
      :profiles="profiles"
      @add-to-cart="addProductToCart"
      @remove-from-cart="removeProductFromCart"
      @remove-cart="removeCart"
      @checkout-cart="checkoutStallCart"
    ></shopping-cart-list>

    <shopping-cart-checkout
      v-else-if="activePage === 'shopping-cart-checkout'"
      :cart="checkoutCart"
      :stall="checkoutStall"
      :customer-pubkey="account?.pubkey"
      :profiles="profiles"
      @login-required="openAccountDialog"
      @place-order="placeOrder"
      @change-page="navigateTo"
    ></shopping-cart-checkout>

    <customer-orders
      v-else-if="activePage === 'customer-orders'"
      :orders="orders"
      :products="products"
      :stalls="stalls"
      :profiles="profiles"
      @show-invoice="showInvoiceQr"
    ></customer-orders>
    <!-- todo: :merchants="merchants" -->

    <customer-stall
      v-else-if="activePage === 'customer-stall'"
      :stall="stalls.find((stall) => stall.id == activeStall)"
      :products="filteredProducts"
      :product-detail="activeProduct"
      @change-page="navigateTo"
      @add-to-cart="addProductToCart"
    ></customer-stall>

    <div v-else-if="!markets?.length">
      <q-list class="q-mt-md" bordered>
        <q-item>
          <q-item-section class="q-mt-sm q-ml-lg">
            <q-item-label
              ><strong class="text-h4"
                >Welcome to the Nostr Market!</strong
              ></q-item-label
            >
            <q-separator class="q-mb-xl q-mt-md" />
            <q-item-label
              ><strong class="text-h5 q-mt-lg"
                >In order to start you can:</strong
              ></q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="q-mt-sm q-ml-lg">
            <q-item-label>
              <ul>
                <li>
                  <span class="text-h6">
                    <q-btn
                      @click="addMarket(defaultMarketNaddr)"
                      size="xl"
                      flat
                      color="secondary"
                      class="q-mb-xs"
                      >Import</q-btn
                    >
                    a list of popular merchants, or
                  </span>
                </li>
                <li>
                  <span class="text-h6">
                    <q-btn
                      @click="createMarket(true)"
                      flat
                      size="xl"
                      color="secondary"
                      class="q-mb-xs"
                      >Add a merchant</q-btn
                    >
                    using its public key, or
                  </span>
                </li>
                <li>
                  <span class="text-h6">
                    <q-btn
                      @click="focusOnElement('search-text')"
                      flat
                      size="xl"
                      color="secondary"
                      class="q-mb-xs"
                      >Add a market profile</q-btn
                    >
                    using a shareable <code>naddr</code> identifier
                  </span>
                  <q-input
                    class="rounded-pill"
                    style="width: 100%"
                    rounded
                    outlined
                    clearable
                    v-model.trim="searchText"
                    label="Load market profile (naddr)..."
                  >
                  </q-input>
                </li>
              </ul>
            </q-item-label>
          </q-item-section>
          <q-item-section side> </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div v-else>
      <customer-stall-list
        v-if="groupByStall"
        :stalls="filterStalls"
        @change-page="navigateTo"
      ></customer-stall-list>

      <customer-market
        v-else
        :filtered-products="filteredProducts"
        :search-text="searchText"
        :filter-categories="filterData.categories"
        @change-page="navigateTo"
        @add-to-cart="addProductToCart"
      ></customer-market>
    </div>
  </q-page>

  <!-- ACCOUNT DIALOG -->
  <q-dialog v-model="accountDialog.show" position="top">
    <q-card>
      <q-card-section class="row">
        <div class="text-h6">Account Setup</div>
        <q-space></q-space>
      </q-card-section>
      <q-card-section>
        <p>Enter your Nostr private key or generate a new one.</p>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          label="Nsec/Hex"
          v-model="accountDialog.data.key"
          autofocus
          @keyup.enter="createAccount"
          :error="accountDialog.data.key && !isValidAccountKey"
          hint="Enter you private key"
        ></q-input>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          v-if="isValidAccountKey"
          label="Login"
          color="primary"
          @click="() => createAccount()"
        ></q-btn>
        <q-btn v-else flat label="Generate" @click="generateKeyPair"></q-btn>
        <q-btn v-close-popup flat color="grey" class="q-ml-auto">Close</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- INVOICE DIALOG -->
  <q-dialog v-model="qrCodeDialog.show" position="top">
    <q-card class="q-pa-md q-pt-xl">
      <div class="text-center q-mb-lg">
        <div v-if="qrCodeDialog.data.message" class="q-my-lg">
          <strong><span v-text="qrCodeDialog.data.message"></span> </strong>
        </div>
        <a v-else :href="'lightning:' + qrCodeDialog.data?.payment_request">
          <div v-if="qrCodeDialog.data.payment_request" :ratio="1">
            <vue-qrcode
              :value="qrCodeDialog.data.payment_request"
              :options="{ width: 340 }"
              class="rounded-borders"
            ></vue-qrcode>
          </div>
          <div v-else>
            <q-spinner color="primary" size="2.55em"></q-spinner>
          </div>
        </a>
      </div>
      <div class="row q-mt-lg">
        <q-btn
          v-if="qrCodeDialog.data.payment_request"
          outline
          color="grey"
          @click="copyText(qrCodeDialog.data.payment_request)"
          >Copy invoice</q-btn
        >
        <q-btn flat v-close-popup color="grey" class="q-ml-auto">Close</q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
window.$q = useQuasar();
</script>

<script>
import { defineComponent } from "vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { copyToClipboard } from "quasar";

import MarketConfig from "components/MarketConfig.vue";
import UserConfig from "components/UserConfig.vue";
import UserChat from "components/UserChat.vue";
import ShoppingCartList from "components/ShoppingCartList.vue";
import ShoppingCartCheckout from "components/ShoppingCartCheckout.vue";
import CustomerMarket from "components/CustomerMarket.vue";
import CustomerOrders from "components/CustomerOrders.vue";
import CustomerStall from "components/CustomerStall.vue";
import CustomerStallList from "components/CustomerStallList.vue";
import ProductFilter from "components/ProductFilter.vue";

export default defineComponent({
  name: "MarketPage",
  components: { MarketConfig },
  data: function () {
    return {
      account: null,
      accountMetadata: null,
      accountDialog: {
        show: false,
        data: {
          watchOnly: false,
          key: null,
        },
      },

      relaysData: {},
      markets: [],

      shoppingCarts: [],
      checkoutCart: null,
      checkoutStall: null,

      activePage: "market",
      activeOrderId: null,
      dmSubscriptions: {},
      allMarketsSelected: false,

      qrCodeDialog: {
        data: {
          payment_request: null,
          message: null,
        },
        dismissMsg: null,
        show: false,
      },

      groupByStall: false,

      relays: new Set(),

      stalls: [],
      products: [],
      orders: {},
      profiles: [],

      bannerImage: null,
      logoImage: null,
      isLoading: false,

      showFilterDetails: false,
      searchText: null,
      filterData: {
        categories: [],
      },

      activeMarket: null,
      activeStall: null,
      activeProduct: null,

      pool: null,
      config: {
        opts: null,
      },

      defaultBanner: this.$q.config.staticPath + "/images/nostr-cover.png",
      defaultLogo: this.$q.config.staticPath + "/images/nostr-avatar.png",
      defaultMarketNaddr:
        "naddr1qqjrqd3jv9skvwfc956rserz956xyeps94snwd3h95cn2ctr8ymrqdpe89jxzqg5waehxw309aex2mrp0yhxgctdw4eju6t0qyv8wumn8ghj7un9d3shjtnndehhyapwwdhkx6tpdsq36amnwvaz7tmwdaehgu3dwp6kytnhv4kxcmmjv3jhytnwv46qzxthwden5te0dehhxarj9eax2cn9v3jk2tnrd3hh2eqpramhxue69uhkummnw3ezuampd3kx2ar0veekzar0wd5xjtnrdaksyg96ypff6u56q9tk99qnp2kghg5ynuse3v7wdu0xxkurdlggj82gmspsgqqqw4psj5pe0p",
      readNotes: {
        merchants: false,
        marketUi: false,
      },
    };
  },
  watch: {
    config(n, _) {
      if (!n?.opts?.ui?.banner) {
        this.bannerImage = this.defaultBanner;
      } else {
        this.bannerImage = null;
        setTimeout(() => {
          (this.bannerImage = this.sanitizeImageSrc(
            n?.opts?.ui?.banner,
            this.defaultBanner
          )),
            1;
        });
      }
      if (!n?.opts?.ui?.picture) {
        this.logoImage = this.defaultLogo;
      } else {
        this.logoImage = null;
        setTimeout(() => {
          (this.logoImage = this.sanitizeImageSrc(
            n?.opts?.ui?.picture,
            this.defaultLogo
          )),
            1;
        });
      }
    },
    searchText(n, o) {
      if (!n) return;
      if (n.toLowerCase().startsWith("naddr")) {
        try {
          const { type, data } = NostrTools.nip19.decode(n);
          if (type !== "naddr" || data.kind !== 30019) return;
          this.$q
            .dialog(confirm("Do you want to import this market profile?"))
            .onOk(async () => {
              this.searchText = "";
              await this.addMarket(n);
            });
        } catch {}
      }
    },
  },
  computed: {
    selectedMarketsMerchants() {
      return [
        ...new Set(
          this.markets
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
      const isInActiceStall = (stallId) =>
        !this.activeStall || stallId == this.activeStall;

      let products = this.products.filter(
        (p) =>
          this.hasCategory(p.categories) &&
          isInActiceStall(p.stall_id) &&
          isByMerchat(p.pubkey) &&
          isInMarket(p.pubkey) &&
          isInStall(p.stall_id) &&
          hasCurrency(p.currency) &&
          hasPriceFrom(p.price) &&
          hasPriceTo(p.price)
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
    marketsName() {
      if (this.activeMarket) return this.activeMarket.opts?.name || "Market";
      const selectedMarkets = this.markets.filter((m) => m.selected);
      if (selectedMarkets.length === 0) return "No Market";
      if (selectedMarkets.length === 1)
        return selectedMarkets[0].opts?.name || "Market";
      return selectedMarkets.length + " Markets";
    },
    stallName() {
      return this.stalls.find((s) => s.id == this.activeStall)?.name || "Stall";
    },
    productName() {
      return (
        this.products.find((p) => p.id == this.activeProduct)?.name || "Product"
      );
    },
    isValidAccountKey() {
      return isValidKey(this.accountDialog.data.key);
    },

    allCartsItemCount() {
      return this.shoppingCarts
        .map((s) => s.products)
        .flat()
        .reduce((t, p) => t + p.orderedQuantity, 0);
    },

    allCategories() {
      const categories = this.products
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
          selected: this.filterData.categories.indexOf(category) !== -1,
        }))
        .sort((a, b) => b.count - a.count);
    },
    allCurrencies() {
      const currencies = this.products.map((p) => p.currency.toUpperCase());
      return [...new Set(currencies)];
    },
    allMerchants() {
      return [...new Set(this.markets.map((m) => m.opts.merchants).flat())];
    },
    allRelays() {
      return [...new Set(this.markets.map((m) => m.relays).flat())];
    },
    processedEventIds() {
      const stallsEventIds = this.stalls.map((s) => s.eventId);
      const productsEventIds = this.products.map((p) => p.eventId);
      // todo: DMs

      return stallsEventIds.concat(productsEventIds);
    },
    activeMarketRelaysData() {
      if (!this.activeMarket) return [];
      return Object.values(this.relaysData).filter(
        (r) => r && this.activeMarket.relays.includes(r.relayUrl)
      );
    },
    dmPeers() {
      // todo: does not refresh
      const prefix = "nostrmarket.dm.";
      const dmKeys = this.$q.localStorage
        .getAllKeys()
        .filter((k) => k.startsWith(prefix));

      return dmKeys.map((k) => k.substring(prefix.length));
    },
  },

  async created() {
    this.bannerImage = this.defaultBanner;
    this.logoImage = this.defaultLogo;

    this._restoreFromStorage();

    const params = new URLSearchParams(window.location.search);

    await this.addMarket(params.get("naddr"));
    await this._handleQueryParams(params);

    this.isLoading = false;
    this._loadRelaysData();
  },
  methods: {
    async _handleQueryParams(params) {
      const merchantPubkey = params.get("merchant");
      const stallId = params.get("stall");
      const productId = params.get("product");

      // What component to render on start
      if (stallId) {
        this.setActivePage("customer-stall");
        if (productId) {
          this.activeProduct = productId;
        }
        this.activeStall = stallId;
      }
      // todo: support URL
      // if (
      //   merchantPubkey &&
      //   !this.xmerchants.find((m) => m.publicKey === merchantPubkey)
      // ) {
      //   this.$q
      //     .dialog(
      //       confirm(
      //         "We found a merchant pubkey in your request. Do you want to add it to the merchants list?"
      //       )
      //     )
      //     .onOk(async () => {
      //       this.xxmerchants.push({ publicKey: merchantPubkey, profile: null });
      //     });
      // }
    },
    _applyUiConfigs(opts = {}) {
      const { name, about, ui } = opts;
      this.$q.localStorage.set("nostrmarket.marketplaceConfig", {
        name,
        about,
        ui,
      });
      if (ui?.theme) {
        document.body.setAttribute("data-theme", ui.theme);
      }
      this.$q.dark.set(!!ui?.darkMode);
    },
    handleFilterData(filterData) {
      console.log("### handleFilterData", filterData);
      this.filterData = filterData;
      this.setActivePage("market");
    },

    async updateUiConfig(data = { opts: {} }) {
      const { name, about, ui } = data.opts;
      this.config = {
        ...this.config,
        opts: { ...this.config.opts, name, about, ui },
      };
      this._applyUiConfigs(this.config?.opts);
    },

    /////////////////////////////////////////////////////////// ACCOUNT ///////////////////////////////////////////////////////////

    generateKeyPair() {
      this.accountDialog.data.key = NostrTools.generatePrivateKey();
      this.accountDialog.data.watchOnly = false;
    },
    openAccountDialog() {
      this.accountDialog.show = true;
    },
    async createAccount() {
      if (isValidKey(this.accountDialog.data.key, "nsec")) {
        let { key, watchOnly } = this.accountDialog.data;
        if (key.startsWith("n")) {
          let { type, data } = NostrTools.nip19.decode(key);
          key = data;
        }
        const privkey = watchOnly ? null : key;
        const pubkey = watchOnly ? key : NostrTools.getPublicKey(key);
        this.$q.localStorage.set("nostrmarket.account", {
          privkey,
          pubkey,
          nsec: NostrTools.nip19.nsecEncode(key),
          npub: NostrTools.nip19.npubEncode(pubkey),

          useExtension: false,
        });
        this.accountDialog.data = {
          watchOnly: false,
          key: null,
        };
        this.accountDialog.show = false;
        this.account = this.$q.localStorage.getItem("nostrmarket.account");
      }
      this.accountDialog.show = false;
    },
    logout() {
      window.localStorage.removeItem("nostrmarket.account");
      window.location.href = window.location.origin + window.location.pathname;
      this.account = null;
      this.accountMetadata = null;
    },
    clearAllData() {
      this.$q
        .dialog(
          confirm(
            "This will remove all information about merchants, products, relays and others. " +
              "You will NOT be logged out. Do you want to proceed?"
          )
        )
        .onOk(async () => {
          this.$q.localStorage
            .getAllKeys()
            .filter((key) => key !== "nostrmarket.account")
            .forEach((key) => window.localStorage.removeItem(key));

          this.orders = [];
          this.config = { opts: null };
          this.shoppingCarts = [];
          this.checkoutCart = null;
          window.location.href =
            window.location.origin + window.location.pathname;
        });
    },

    /////////////////////////////////////////////////////////// RELAYS ///////////////////////////////////////////////////////////

    async _toRelayKey(relayUrl) {
      return "relay_" + (await hash(relayUrl));
    },

    async _loadRelaysData() {
      for (const market of this.markets) {
        for (const relayUrl of market.relays) {
          await this._loadRelayData(relayUrl, market.opts.merchants);
        }
      }

      Object.keys(this.relaysData).forEach(this._connectToRelay);
    },

    async _loadRelayData(relayUrl, merchants) {
      const relayKey = await this._toRelayKey(relayUrl);
      this.relaysData[relayKey] = this.relaysData[relayKey] || {
        relayUrl,
        connected: false,
        error: null,
        merchants: [],
        lastEventAt: this.getLastEventDateForRelay(relayUrl),
      };
      const relayData = this.relaysData[relayKey];
      relayData.merchants = [...new Set(relayData.merchants.concat(merchants))];
    },

    getLastEventDateForRelay(relayUrl) {
      const relay = (
        this.$q.localStorage.getItem("nostrmarket.relays") || []
      ).find((r) => r.relayUrl === relayUrl);
      console.log("### getLastEventForRelay", relayUrl, relay);
      return relay?.lastEventAt || 0;
    },

    async _connectToRelay(relayKey) {
      const relayData = this.relaysData[relayKey];
      try {
        relayData.relay = NostrTools.relayInit(relayData.relayUrl);
        relayData.relay.on("connect", () => {
          relayData.connected = true;
          relayData.error = null;
          this._queryRelay(relayKey);
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
    },

    async _requeryRelay(relayKey) {
      const relayData = this.relaysData[relayKey];
      if (relayData.connected) {
        relayData.sub?.unsub();
        this._queryRelay(relayKey);
      }
    },

    _buildRelayFilters(relayData) {
      const authors = relayData.merchants;
      const filters = [
        {
          kinds: [0, 5, 30017, 30018],
          authors,
          since: relayData.lastEventAt + 1,
        },
      ];
      if (this.account?.pubkey) {
        filters.push(
          {
            kinds: [4],
            "#p": [this.account.pubkey],
            since: relayData.lastEventAt + 1,
          },
          {
            kinds: [4],
            authors: [this.account.pubkey],
            since: relayData.lastEventAt + 1,
          }
        );
      }
      return filters;
    },

    async _queryRelay(relayKey) {
      const relayData = this.relaysData[relayKey];
      const filters = this._buildRelayFilters(relayData);

      const events = await relayData.relay.list(filters);
      console.log("### _queryRelay.events", relayData.relayUrl, events);

      if (events?.length) {
        await this._processEvents(events, relayData);
      }

      relayData.sub = relayData.relay.sub(filters);
      relayData.sub.on(
        "event",
        (event) => {
          this._processEvents([event], relayData);
        },
        { id: "masterSub" } //pass ID to cancel previous sub
      );
    },

    async _publishEventToRelays(event, relayUrls) {
      let count = 0;
      for (const relayUrl of relayUrls) {
        if (await this._publishEventToRelay(event, relayUrl)) {
          count++;
        }
      }
      return count;
    },

    async _publishEventToRelay(event, relayUrl) {
      try {
        const relayKey = await this._toRelayKey(relayUrl);
        const relayData = this.relaysData[relayKey];
        if (relayData?.connected) {
          await relayData.relay.publish(event);
        }
        return true;
      } catch (error) {
        console.warn(error);
        return false;
      }
    },

    _findRelaysForMerchant(pubkey) {
      const relaysForMerchant = this.markets
        .filter((m) => m.opts.merchants.includes(pubkey))
        .map((m) => m.relays)
        .flat();

      return [...new Set(relaysForMerchant)];
    },
    /////////////////////////////////////////////////////////// PROCESS EVENTS ///////////////////////////////////////////////////////////

    _processEvents(events, relayData) {
      if (!events?.length) return;
      console.log("### _processEvents", relayData.relayUrl, events);
      const lastEventAt = events.sort((a, b) => b.created_at - a.created_at)[0]
        .created_at;
      relayData.lastEventAt = Math.max(lastEventAt, relayData.lastEventAt);

      events = events
        .filter((e) => !this.processedEventIds.includes(e.id))
        .map((e) => ({ ...e, relayUrl: relayData.relayUrl }))
        .map(eventToObj);

      events.filter((e) => e.kind === 0).forEach(this._processProfileEvents);
      events.filter((e) => e.kind === 4).forEach(this._processDmEvents);
      events.filter((e) => e.kind === 5).forEach(this._processDeleteEvents);
      events.filter((e) => e.kind === 30017).forEach(this._processStallEvents);
      events
        .filter((e) => e.kind === 30018)
        .forEach(this._processProductEvents);

      this._persistStallsAndProducts();
      this._persistRelaysData();
    },

    _processProfileEvents(e) {
      try {
        this.profiles = this.profiles.filter((p) => p.pubkey !== e.pubkey);
        this.profiles.push({ pubkey: e.pubkey, ...e.content });
        this.$q.localStorage.set("nostrmarket.profiles", this.profiles);
      } catch (error) {
        console.warn(error);
      }
    },

    _processStallEvents(e) {
      this._processStall({
        ...e.content,
        id: e.d,
        pubkey: e.pubkey,
        createdAt: e.created_at,
        eventId: e.id,
        relayUrls: [e.relayUrl],
      });
    },

    _processStall(stall) {
      const stallIndex = this.stalls.findIndex(
        (s) => s.id === stall.id && s.pubkey === stall.pubkey
      );
      if (stallIndex === -1) {
        this.stalls.push(stall);
        return;
      }

      const existingStall = this.stalls[stallIndex];

      if (existingStall.createdAt < stall.createdAt) {
        this.stalls.splice(stallIndex, 1, stall);
        this.products
          .filter((p) => p.pubkey === stall.pubkey && p.stall_id === stall.id)
          .forEach((p) => (p.stallName = stall.name));
      }
    },

    _processProductEvents(e) {
      const p = { ...e.content };
      const stall = this.stalls.find((s) => s.id == p.stall_id);

      if (!stall) return;
      if (p.currency != "sat") {
        p.formatedPrice = this.getAmountFormated(p.price, p.currency);
      }

      this._processProduct({
        ...p,
        stallName: stall.name,
        images: p.images || [p.image],
        pubkey: e.pubkey,
        id: e.d,
        categories: e.t,
        eventId: e.id,
        createdAt: e.created_at,
        relayUrls: [e.relayUrl],
      });
    },

    _processProduct(product) {
      const productIndex = this.products.findIndex(
        (p) => p.id === product.id && p.pubkey === product.pubkey
      );
      if (productIndex === -1) {
        this.products.push(product);
        return;
      }
      const existingProduct = this.products[productIndex];
      existingProduct.relayUrls = [
        ...new Set(product.relayUrls.concat(existingProduct.relayUrls)),
      ];
      if (existingProduct.createdAt < product.createdAt) {
        this.products.splice(productIndex, 1, product);
      }
    },

    async _processDmEvents(e) {
      if (!this.account?.pubkey) return;
      const receiverPubkey = e.tags.find(
        ([k, v]) => k === "p" && v && v !== ""
      )[1];
      const isSentByMe = e.pubkey === this.account.pubkey;
      if (receiverPubkey !== this.account.pubkey && !isSentByMe) {
        console.warn("Unexpected DM. Dropped!");
        return;
      }

      const peerPubkey = isSentByMe ? receiverPubkey : e.pubkey;
      e.content = await NostrTools.nip04.decrypt(
        this.account.privkey,
        peerPubkey,
        e.content
      );

      this._persistDMEvent(e, peerPubkey);

      if (isJson(e.content)) {
        await this._handleStructuredDm(e, peerPubkey);
      }
    },

    async _processDeleteEvents(e) {
      const deletedEventIds = (e.tags || [])
        .filter((t) => t[0] === "e")
        .map((t) => t[1]);

      const deletedStallsIds = this.stalls
        .filter(
          (s) => s.pubkey === e.pubkey && deletedEventIds.includes(s.eventId)
        )
        .map((s) => s.id);

      const isDeletedProduct = (p) =>
        p.pubkey === e.pubkey &&
        (deletedEventIds.includes(p.eventId) ||
          deletedStallsIds.includes(p.stall_id));
      this.products = this.products.filter((p) => !isDeletedProduct(p));

      const isDeletedStall = (s) =>
        s.pubkey === e.pubkey && deletedEventIds.includes(s.eventId);
      this.stalls = this.stalls.filter((s) => !isDeletedStall(s));
    },

    /////////////////////////////////////////////////////////// MARKET ///////////////////////////////////////////////////////////

    async createMarket(navigateToConfig) {
      try {
        this.setActivePage("loading");
        const market = {
          d: crypto.randomUUID(),
          pubkey: this.account?.pubkey || "",
          relays: [...defaultRelays],
          selected: true,
          opts: {
            name: "New Market",
            merchants: [],
          },
        };
        this.markets.unshift(market);
        this.$q.localStorage.set("nostrmarket.markets", this.markets);

        for (const relayUrl of market.relays) {
          await this._handleNewRelay(relayUrl, market);
        }
        if (navigateToConfig === true) {
          this.showMarketConfig(0);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.setActivePage("market-config");
      }
    },
    async addMarket(naddr) {
      if (!naddr) return;

      try {
        this.setActivePage("loading");
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
          this.$q
            .dialog(
              confirm(
                `Do you want to use the look and feel of the '${market.opts.name}' market?`
              )
            )
            .onOk(async () => {
              this.config = { ...this.config, opts: market.opts };
              this._applyUiConfigs(market?.opts);
            });
        }

        this.markets = this.markets.filter(
          (m) => m.d !== market.d || m.pubkey !== market.pubkey
        );
        this.markets.unshift(market);
        this.$q.localStorage.set("nostrmarket.markets", this.markets);

        for (const relayUrl of market.relays) {
          await this._handleNewRelay(relayUrl, market);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.setActivePage("market");
      }
    },
    updateMarket(market) {
      try {
        this.isLoading = true;

        const { d, pubkey } = market;

        const existingMarket =
          this.markets.find((m) => m.d === d && m.pubkey === pubkey) || {};

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

        this.markets = this.markets.filter(
          (m) => m.d !== d || m.pubkey !== pubkey
        );
        this.markets.unshift(market);
        this.$q.localStorage.set("nostrmarket.markets", this.markets);

        removedMerchants?.forEach(this._handleRemoveMerchant);
        newMerchants?.forEach((m) => this._handleNewMerchant(market, m));

        console.log("### newRelays", newRelays);
        console.log("### removedRelays", removedRelays);

        newRelays?.forEach((r) => this._handleNewRelay(r, market));
        removedRelays?.forEach(this._handleRemovedRelay);

        // stalls and products can be removed when a market is updated
        this._persistStallsAndProducts();
        this._persistRelaysData();
      } catch (error) {
        console.warn(error);
      } finally {
        this.isLoading = false;
      }
    },
    deleteMarket(market) {
      try {
        this.isLoading = true;

        const { d, pubkey } = market;
        this.markets = this.markets.filter(
          (m) => m.d !== d || m.pubkey !== pubkey
        );
        this.$q.localStorage.set("nostrmarket.markets", this.markets);
        if (
          this.activeMarket &&
          this.activeMarket.d === d &&
          this.activeMarket.pubkey === pubkey
        ) {
          this.activeMarket = null;
          this.navigateTo("market");
          this.updateUiConfig(this.markets[0]);
        }
        market.opts.merchants.forEach(this._handleRemoveMerchant);
        market.relays.forEach(this._handleRemovedRelay);

        this._persistStallsAndProducts();
        this._persistRelaysData();
      } catch (error) {
        console.warn(error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleMarket() {
      this.allMarketsSelected = !this.markets.find((m) => !m.selected);
      this.$q.localStorage.set("nostrmarket.markets", this.markets);
    },
    toggleAllMarkets() {
      this.markets.forEach((m) => (m.selected = this.allMarketsSelected));
      this.$q.localStorage.set("nostrmarket.markets", this.markets);
    },
    showMarketConfig(index) {
      this.activeMarket = this.markets[index];
      this.transitToPage("market-config");
    },
    async publishNaddr() {
      if (!this.account?.privkey) {
        this.openAccountDialog();
        this.$q.notify({
          message: "Login Required!",
          icon: "warning",
        });
        return;
      }

      const merchants = []; // todo: get from market
      const { name, about, ui } = this.config?.opts || {};
      const content = { merchants, name, about, ui };
      const identifier = this.config.identifier ?? crypto.randomUUID();
      const event = {
        ...(await NostrTools.getBlankEvent()),
        kind: 30019,
        content: JSON.stringify(content),
        created_at: Math.floor(Date.now() / 1000),
        tags: [["d", identifier]],
        pubkey: this.account.pubkey,
      };
      event.id = NostrTools.getEventHash(event);
      try {
        event.sig = await NostrTools.signEvent(event, this.account.privkey);

        // todo: replace with market relays
        const pub = this.pool.publish(Array.from([]), event);
        pub.on("ok", () => {
          console.debug(`Config event was sent`);
        });
        pub.on("failed", (error) => {
          console.error(error);
        });
      } catch (err) {
        console.error(err);
        this.$q.notify({
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
        relays: [], //todo: replace with market relays
      });
      this.copyText(naddr);
    },

    _handleNewMerchant(market, merchantPubkey) {
      Object.keys(this.relaysData).forEach(async (relayKey) => {
        const relayData = this.relaysData[relayKey];
        if (!market.relays.includes(relayData.relayUrl)) return;
        if (relayData.merchants.includes(merchantPubkey)) return;

        const events = await relayData.relay.list([
          { kinds: [0, 30017, 30018], authors: [merchantPubkey] },
        ]);
        await this._processEvents(events, relayData);

        relayData.merchants.push(merchantPubkey);
        this._requeryRelay(relayKey);
      });
    },

    async _handleNewRelay(relayUrl, market) {
      const relayKey = await this._toRelayKey(relayUrl);
      if (this.relaysData[relayKey]) {
        const relayData = this.relaysData[relayKey];
        const events = await relayData.relay.list([
          { kinds: [0, 30017, 30018], authors: market.opts.merchants },
        ]);

        await this._processEvents(events, relayData);
        relayData.merchants = [
          ...new Set(relayData.merchants.concat(market.opts.merchants)),
        ];
        this._requeryRelay(relayKey);
      } else {
        await this._loadRelayData(relayUrl, market.opts.merchants);
        await this._connectToRelay(relayKey);
      }
    },
    _handleRemoveMerchant(merchantPubkey) {
      const marketWithMerchant = this.markets.find((m) =>
        m.opts.merchants.find((mr) => mr === merchantPubkey)
      );
      // other markets still have this merchant
      if (marketWithMerchant) return;

      // remove all products and stalls from that merchant
      this.products = this.products.filter((p) => p.pubkey !== merchantPubkey);
      this.stalls = this.stalls.filter((s) => s.pubkey !== merchantPubkey);

      this._removeSubscriptionsForMerchant(merchantPubkey);
    },
    _removeSubscriptionsForMerchant(merchantPubkey) {
      Object.keys(this.relaysData).forEach((relayKey) => {
        const relayData = this.relaysData[relayKey];
        if (!relayData.merchants.includes(merchantPubkey)) return;
        relayData.merchants = relayData.merchants.filter(
          (m) => m !== merchantPubkey
        );

        this._requeryRelay(relayKey);
      });
    },
    async _handleRemovedRelay(relayUrl) {
      // todo: later
      // leave products and stalls alone
      const marketWitRelay = this.markets.find((m) =>
        m.relays.find((r) => r === relayUrl)
      );
      if (!marketWitRelay) {
        // relay no longer exists
        const relayKey = await this._toRelayKey(relayUrl);
        delete this.relaysData[relayKey];
        this._persistRelaysData();
      }
    },
    /////////////////////////////////////////////////////////// SHOPPING CART ///////////////////////////////////////////////////////////

    addProductToCart(item) {
      let stallCart = this.shoppingCarts.find((s) => s.id === item.stall_id);
      if (!stallCart) {
        stallCart = {
          id: item.stall_id,
          products: [],
        };
        this.shoppingCarts.push(stallCart);
      }
      stallCart.merchant = item.pubkey;

      let product = stallCart.products.find((p) => p.id === item.id);
      if (!product) {
        product = { ...item, orderedQuantity: 0 };
        stallCart.products.push(product);
      }
      product.orderedQuantity = Math.min(
        product.quantity,
        item.orderedQuantity || product.orderedQuantity + 1
      );

      this.$q.localStorage.set("nostrmarket.shoppingCarts", this.shoppingCarts);

      this.$q.notify({
        type: "positive",
        message: "Product added to cart!",
      });
    },

    removeProductFromCart(item) {
      const stallCart = this.shoppingCarts.find((c) => c.id === item.stallId);
      if (stallCart) {
        stallCart.products = stallCart.products.filter(
          (p) => p.id !== item.productId
        );
        if (!stallCart.products.length) {
          this.shoppingCarts = this.shoppingCarts.filter(
            (s) => s.id !== item.stallId
          );
        }
        this.$q.localStorage.set(
          "nostrmarket.shoppingCarts",
          this.shoppingCarts
        );
      }
    },
    removeCart(cartId) {
      this.shoppingCarts = this.shoppingCarts.filter((s) => s.id !== cartId);
      this.$q.localStorage.set("nostrmarket.shoppingCarts", this.shoppingCarts);
    },

    checkoutStallCart(cart) {
      this.checkoutCart = cart;
      this.checkoutStall = this.stalls.find((s) => s.id === cart.id);
      this.setActivePage("shopping-cart-checkout");
    },

    /////////////////////////////////////////////////////////// ORDERS ///////////////////////////////////////////////////////////

    async placeOrder({ event, order, cartId }) {
      if (!this.account?.privkey) {
        this.openAccountDialog();
        return;
      }
      try {
        this.activeOrderId = order.id;
        event.content = await NostrTools.nip04.encrypt(
          this.account.privkey,
          this.checkoutStall.pubkey,
          JSON.stringify(order)
        );

        event.id = NostrTools.getEventHash(event);
        event.sig = await NostrTools.signEvent(event, this.account.privkey);

        this._sendOrderEvent(event);
        this._persistOrderUpdate(
          this.checkoutStall.pubkey,
          event.created_at,
          order
        );
        this.removeCart(cartId);
        this.setActivePage("shopping-cart-list");
      } catch (error) {
        console.warn(error);
        this.$q.notify({
          type: "warning",
          message: "Failed to place order!",
        });
      }
    },

    async _sendOrderEvent(event) {
      const merchantPubkey = event.tags
        .filter((t) => t[0] === "p")
        .map((t) => t[1]);

      const merchantRelays = this._findRelaysForMerchant(merchantPubkey[0]);
      const relayCount = await this._publishEventToRelays(
        event,
        merchantRelays
      );
      this.$q.notify({
        type: relayCount ? "positive" : "warning",
        message: relayCount
          ? `The order has been placed (${relayCount} relays)!`
          : "Order could not be placed",
      });
      this.qrCodeDialog = {
        data: {
          payment_request: null,
          message: null,
        },
        dismissMsg: null,
        show: !!relayCount,
      };
    },

    _handlePaymentRequest(json) {
      if (json.id && json.id !== this.activeOrderId) {
        // not for active order, store somewehre else
        return;
      }
      if (!json.payment_options?.length) {
        this.qrCodeDialog.data.message = json.message || "Unexpected error";
        return;
      }

      const paymentRequest = json.payment_options.find(
        (o) => o.type == "ln"
      ).link;
      if (!paymentRequest) return;
      this.qrCodeDialog.data.payment_request = paymentRequest;
      this.qrCodeDialog.dismissMsg = this.$q.notify({
        timeout: 10000,
        message: "Waiting for payment...",
      });
    },

    _handleOrderStatusUpdate(jsonData) {
      if (jsonData.id && jsonData.id !== this.activeOrderId) {
        // not for active order, store somewehre else
        return;
      }
      if (this.qrCodeDialog.dismissMsg) {
        this.qrCodeDialog.dismissMsg();
      }
      this.qrCodeDialog.show = false;
      const message = jsonData.shipped
        ? "Order shipped"
        : jsonData.paid
        ? "Order paid"
        : "Order notification";
      this.$q.notify({
        type: "positive",
        message: message,
        caption: jsonData.message || "",
      });
    },

    async _handleStructuredDm(event, peerPubkey) {
      try {
        const jsonData = JSON.parse(event.content);
        if ([0, 1, 2].indexOf(jsonData.type) !== -1) {
          this._persistOrderUpdate(peerPubkey, event.created_at, jsonData);
        }
        if (jsonData.type === 1) {
          this._handlePaymentRequest(jsonData);
        } else if (jsonData.type === 2) {
          this._handleOrderStatusUpdate(jsonData);
        }
      } catch (e) {
        console.warn("Unable to handle incomming DM", e);
      }
    },

    /////////////////////////////////////////////////////////// PERSIST ///////////////////////////////////////////////////////////

    _restoreFromStorage() {
      this.markets = this.$q.localStorage.getItem("nostrmarket.markets") || [];
      this.allMarketsSelected = !this.markets.find((m) => !m.selected);

      this.shoppingCarts =
        this.$q.localStorage.getItem("nostrmarket.shoppingCarts") || [];

      this.profiles =
        this.$q.localStorage.getItem("nostrmarket.profiles") || [];

      this.account =
        this.$q.localStorage.getItem("nostrmarket.account") || null;

      this.stalls = this.$q.localStorage.getItem("nostrmarket.stalls") || [];
      this.products =
        this.$q.localStorage.getItem("nostrmarket.products") || [];

      const uiConfig = this.$q.localStorage.getItem(
        "nostrmarket.marketplaceConfig"
      ) || {
        ui: { darkMode: false },
      };

      // trigger the `watch` logic
      this.config = {
        ...this.config,
        opts: { ...this.config.opts, ...uiConfig },
      };

      this._applyUiConfigs(this.config.opts);

      const prefix = "nostrmarket.orders.";
      const orderKeys = this.$q.localStorage
        .getAllKeys()
        .filter((k) => k.startsWith(prefix));
      orderKeys.forEach((k) => {
        const pubkey = k.substring(prefix.length);
        this.orders[pubkey] = this.$q.localStorage.getItem(k);
      });

      const readNotes =
        this.$q.localStorage.getItem("nostrmarket.readNotes") || {};
      this.readNotes = { ...this.readNotes, ...readNotes };
    },
    _persistStallsAndProducts() {
      this.$q.localStorage.set("nostrmarket.stalls", this.stalls);
      this.$q.localStorage.set("nostrmarket.products", this.products);
    },

    _persistRelaysData() {
      this.$q.localStorage.set(
        "nostrmarket.relays",
        Object.values(this.relaysData)
          .filter((r) => !!r)
          .map((relayData) => ({
            lastEventAt: relayData.lastEventAt,
            relayUrl: relayData.relayUrl,
          }))
      );
    },

    _persistDMEvent(event, peerPubkey) {
      const dms = this.$q.localStorage.getItem(
        `nostrmarket.dm.${peerPubkey}`
      ) || {
        events: [],
        lastCreatedAt: 0,
      };
      const existingEvent = dms.events.find((e) => e.id === event.id);
      if (existingEvent) return;

      dms.events.push(event);
      dms.events.sort((a, b) => a - b);
      dms.lastCreatedAt = dms.events[dms.events.length - 1].created_at;
      this.$q.localStorage.set(`nostrmarket.dm.${peerPubkey}`, dms);
    },

    _persistOrderUpdate(pubkey, eventCreatedAt, orderUpdate) {
      let orders =
        this.$q.localStorage.getItem(`nostrmarket.orders.${pubkey}`) || [];
      const orderIndex = orders.findIndex((o) => o.id === orderUpdate.id);

      if (orderIndex === -1) {
        orders.unshift({
          ...orderUpdate,
          eventCreatedAt,
          createdAt: eventCreatedAt,
        });
        this.orders[pubkey] = orders;
        this.orders = { ...this.orders };
        this.$q.localStorage.set(`nostrmarket.orders.${pubkey}`, orders);
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
      this.orders[pubkey] = orders;
      this.orders = { ...this.orders };
      this.$q.localStorage.set(`nostrmarket.orders.${pubkey}`, orders);
    },

    /////////////////////////////////////////////////////////// MISC ///////////////////////////////////////////////////////////

    navigateTo(page, opts = { stall: null, product: null, pubkey: null }) {
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
    },
    copyUrl: function () {
      this.copyText(window.location);
    },
    copyText: function (text) {
      var notify = this.$q.notify;
      copyToClipboard(text).then(function () {
        notify({
          message: "Copied to clipboard!",
          position: "bottom",
        });
      });
    },
    getAmountFormated(amount, unit = "USD") {
      return formatCurrency(amount, unit);
    },

    setActivePage(page = "market") {
      this.activePage = page;
    },
    transitToPage(pageName) {
      this.activePage = "loading";
      setTimeout(() => this.setActivePage(pageName), 100);
    },

    showInvoiceQr(invoice) {
      if (!invoice) return;
      this.qrCodeDialog = {
        data: {
          payment_request: invoice,
        },
        dismissMsg: null,
        show: true,
      };
    },

    toggleCategoryFilter(category) {
      const index = this.filterData.categories.indexOf(category);
      if (index === -1) {
        this.filterData.categories.push(category);
      } else {
        this.filterData.categories.splice(index, 1);
      }
    },

    hasCategory(categories = []) {
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

    sanitizeImageSrc(src, defaultValue) {
      try {
        if (src) {
          new URL(src);
          return src;
        }
      } catch {}
      return defaultValue;
    },

    markNoteAsRead(noteId) {
      this.readNotes[noteId] = true;
      this.$q.localStorage.set("nostrmarket.readNotes", this.readNotes);
    },
    focusOnElement(elementId) {
      document.getElementById(elementId)?.scrollIntoView();
      this.showFilterDetails = true;
    },
  },
});
</script>
