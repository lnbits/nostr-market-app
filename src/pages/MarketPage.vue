<template>
  <q-page class="q-pa-sm">
    <div class="row q-mb-md">
      <div class="col-lg-1 col-md-1 gt-sm">
        <q-avatar
          @click="navigateTo('market')"
          rounded
          size="64px"
          class="q-ma-none q-pa-none gt-sm cursor-pointer"
        >
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
            ><q-tooltip>User Config</q-tooltip></q-btn
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
    <q-card v-if="!markets.length" class="q-mb-sm">
      <q-card-section class="bg-secondary text-white">
        <div class="text-h6">
          There are no relays configured at this moment.
        </div>
        <div class="text-subtitle2">
          Start by creating or importing a market.
        </div>
      </q-card-section>
    </q-card>

    <div v-if="isLoading" class="row q-mb-sm">
      <div class="col-12 text-center">
        <q-spinner-dots color="primary" size="xl" />
      </div>
    </div>

    <q-banner class="row q-pa-none q-mb-lg gt-sm shadow-2">
      <q-img
        v-if="bannerImage"
        :src="bannerImage"
        @click="navigateTo('market')"
        class="rounded-borders cursor-pointer"
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
      <div class="col-md-8 col-sm-7 auto-width">
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
      <div class="col-md-4 col-sm-5">
        <div class="float-right">
          <q-checkbox
            v-model="groupByStall"
            v-if="activePage === 'market' && stalls?.length"
            class="q-pl-md q-mt-sm"
            size="xs"
            val="xs"
            label="Group by stalls"
          ></q-checkbox>
          <q-btn
            v-if="activePage === 'customer-stall'"
            flat
            color="grey"
            icon="content_copy"
            @click="copyUrl()"
          ></q-btn>
          <q-btn-dropdown flat color="grey" icon="sort">
            <q-list>
              <q-item
                v-for="sortOption in sort.options"
                :key="sortOption.field"
                :active="sort.by === sortOption.field"
                v-ripple
              >
                <q-item-section side top>
                  <q-btn
                    @click="sortProducts(sortOption.field, 'asc')"
                    :color="
                      sort.by === sortOption.field && sort.order === 'asc'
                        ? 'primary'
                        : ''
                    "
                    flat
                    class="rotate-180"
                    icon="filter_list"
                    v-close-popup
                  ></q-btn>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <strong><span v-text="sortOption.label"></span></strong
                  ></q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-btn
                    @click="sortProducts(sortOption.field, 'desc')"
                    :color="
                      sort.by === sortOption.field && sort.order === 'desc'
                        ? 'primary'
                        : ''
                    "
                    flat
                    icon="filter_list"
                    v-close-popup
                  ></q-btn>
                </q-item-section>
              </q-item> </q-list
          ></q-btn-dropdown>
        </div>
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
      :events="dmEvents"
      @chat-selected="handleDmChatSelected"
      @send-dm="sendDirectMessage"
    ></user-chat>

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
          color="primary"
          @click="copyText(qrCodeDialog.data.payment_request)"
          >Copy invoice</q-btn
        >
        <q-btn flat v-close-popup color="grey" class="q-ml-auto">Close</q-btn>
      </div>
    </q-card>
  </q-dialog>
  <!-- NADDR Dialog -->
  <q-dialog v-model="naddrDialog.show" position="top">
    <q-card class="q-pa-lg q-pt-xl" style="width: 500px">
      <q-input
        filled
        dense
        type="textarea"
        rows="30"
        readonly
        v-model.trim="naddrDialog.publishedNaddr"
        label="Market Naddr"
      ></q-input>
      <div class="row q-mt-lg">
        <q-btn
          outline
          color="primary"
          icon="content_copy"
          @click="copyText(naddrDialog.publishedNaddr)"
          >Copy Naddr</q-btn
        >
        <q-btn v-close-popup flat color="grey" class="q-ml-auto">Close</q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

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
      naddrDialog: {
        show: false,
        publishedNaddr: "",
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
      dmEvents: null,

      activeMarket: null,
      activeStall: null,
      activeProduct: null,

      pool: null,
      config: {
        opts: null,
      },

      defaultBanner: this.$q.config.staticPath + "images/nostr-cover.png",
      defaultLogo: this.$q.config.staticPath + "images/nostr-avatar.png",
      defaultMarketNaddr:
        "naddr1qqjr2e34v3jrzd3e95ensdfn956rywps94snwcmr95crvepexc6kxcfcxqmnvqg5waehxw309aex2mrp0yhxgctdw4eju6t0qyv8wumn8ghj7un9d3shjtnndehhyapwwdhkx6tpdsq36amnwvaz7tmwdaehgu3dwp6kytnhv4kxcmmjv3jhytnwv46qzxthwden5te0dehhxarj9eax2cn9v3jk2tnrd3hh2eqprfmhxue69uhhyetvv9ujummjv9hxwetsd9kxctnyv4mqzrthwden5te0dehhxtnvdakqz9rhwden5te0wfjkccte9ehx7um5wghxyecpzpmhxue69uhkummnw3ezuamfdejsz9thwden5te0v4jx2m3wdehhxarj9ekxzmnyqgstle9w09rt8y7xdlqs33v23vqvdtqx6j6j2wa4984g9n77tppx2tqrqsqqqa2ruusd5z",
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
      // just to force refresh, do not remove
      const temp = this.dmEvents;
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


    const params = new URLSearchParams(window.location.search);

    await this.addMarket(params.get("naddr"));
    await this._handleQueryParams(params);

    this.isLoading = false;
  },
  methods: {
    async _handleQueryParams(params) {
      const merchantPubkey = params.get("merchant");
      console.log("### merchantPubkey", merchantPubkey);
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
      if (merchantPubkey) {
        if (!isValidKey(merchantPubkey)) {
          this.$q.notify({
            message: "Invalid merchant public key!",
            icon: "warning",
          });
        } else if (this.allMerchants.includes(merchantPubkey)) {
          console.log(
            `Request (URL) merchant (${merchantPubkey}) already exists!`
          );
        } else {
          this.$q
            .dialog(
              confirm(
                "We found a merchant pubkey in your request. " +
                  "Do you want to add it to the merchants list?"
              )
            )
            .onOk(async () => {
              this.createMarket(false, [merchantPubkey]);
            });
        }
      }
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

      this.persistStallsAndProducts();
      this.persistRelaysData();
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

      this.persistDMEvent(e, peerPubkey);
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

    async createMarket(navigateToConfig, merchants) {
      try {
        this.setActivePage("loading");
        const market = {
          d: crypto.randomUUID(),
          pubkey: this.account?.pubkey || "",
          relays: [...defaultRelays],
          selected: true,
          opts: {
            name: "New Market",
            merchants: merchants || [],
            ui: {},
          },
        };
        this.markets.unshift(market);
        this.$q.localStorage.set("nostrmarket.markets", this.markets);

        for (const relayUrl of market.relays) {
          // do not wait for relays
          this._handleNewRelay(relayUrl, market);
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
        this.persistStallsAndProducts();
        this.persistRelaysData();
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
        market.opts.merchants?.forEach(this._handleRemoveMerchant);
        market.relays?.forEach(this._handleRemovedRelay);

        this.persistStallsAndProducts();
        this.persistRelaysData();
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
    async publishNaddr(marketData) {
      if (!this.account?.privkey) {
        this.openAccountDialog();
        this.$q.notify({
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
        pubkey: this.account.pubkey,
      };
      event.id = NostrTools.getEventHash(event);
      try {
        event.sig = await NostrTools.signEvent(event, this.account.privkey);

        const relayCount = await this.publishEventToRelays(
          event,
          marketData.relays
        );

        this.$q.notify({
          type: relayCount ? "positive" : "warning",
          message: relayCount
            ? `The market profile has been published tp (${relayCount} relays)!`
            : "The market profile could not be published",
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
        relays: marketData.relays,
      });
      this.naddrDialog.publishedNaddr = naddr;
      this.naddrDialog.show = true;
    },

    _handleNewMerchant(market, merchantPubkey) {
      Object.keys(this.relaysData).forEach(async (relayKey) => {
        const relayData = this.relaysData[relayKey];
        if (!market.relays.includes(relayData.relayUrl)) return;
        if (relayData.merchants.includes(merchantPubkey)) return;

        const events = await relayData.relay.list([
          { kinds: [30017, 30018], authors: [merchantPubkey] },
        ]);
        await this._processEvents(events, relayData);

        relayData.merchants.push(merchantPubkey);
        await this.requeryRelay(relayKey);
      });
    },

    async _handleNewRelay(relayUrl, market) {
      const relayKey = await this.toRelayKey(relayUrl);
      if (this.relaysData[relayKey]) {
        const relayData = this.relaysData[relayKey];
        const events = await relayData.relay.list([
          { kinds: [30017, 30018], authors: market.opts.merchants },
        ]);

        await this._processEvents(events, relayData);
        relayData.merchants = [
          ...new Set(relayData.merchants.concat(market.opts.merchants)),
        ];
        await this.requeryRelay(relayKey);
      } else {
        await this.loadRelayData(relayUrl, market.opts.merchants);
        await this.connectToRelay(relayKey);
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
      Object.keys(this.relaysData).forEach(async (relayKey) => {
        const relayData = this.relaysData[relayKey];
        if (!relayData.merchants.includes(merchantPubkey)) return;
        relayData.merchants = relayData.merchants.filter(
          (m) => m !== merchantPubkey
        );

        await this.requeryRelay(relayKey);
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
        const relayKey = await this.toRelayKey(relayUrl);
        delete this.relaysData[relayKey];
        this.persistRelaysData();
      }
    },

    /////////////////////////////////////////////////////////// DIRRECT MESSAGES ///////////////////////////////////////////////////////////

    handleDmChatSelected(pubkey) {
      this.dmEvents =
        this.$q.localStorage.getItem(`nostrmarket.dm.${pubkey}`) || {};
    },

    async sendDirectMessage(dm) {
      if (!this.account?.pubkey) {
        this.$q.notify({
          type: "warning",
          message: "Cannot send message. No user logged in!",
        });
        return;
      }
      try {
        const event = {
          ...(await NostrTools.getBlankEvent()),
          kind: 4,
          created_at: Math.floor(Date.now() / 1000),
          tags: [["p", dm.to]],
          pubkey: this.account.pubkey,
        };
        event.content = await NostrTools.nip04.encrypt(
          this.account.privkey,
          dm.to,
          dm.message
        );

        event.id = NostrTools.getEventHash(event);
        event.sig = await NostrTools.signEvent(event, this.account.privkey);

        await this._sendDmEvent(event);
        event.content = dm.message;
        this.persistDMEvent(event, dm.to);
      } catch (error) {
        this.$q.notify({
          type: "warning",
          message: "Failed to send message!",
        });
      }
    },

    async _sendDmEvent(event) {
      const toPubkey = event.tags.filter((t) => t[0] === "p").map((t) => t[1]);

      let relays = this.findRelaysForMerchant(toPubkey[0]);
      if (!relays?.length) {
        relays = [...defaultRelays];
      }
      await this.publishEventToRelays(event, relays);
    },

    _noDmEvents() {
      const dms = this.$q.localStorage
        .getAllKeys()
        .filter((key) => key.startsWith("nostrmarket.dm"));

      return dms.length === 0;
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
    sortProducts(by, order = "asc") {
      this.sort.by = by;
      this.sort.order = order;
      this.$q.localStorage.set("nostrmarket.sort", { by, order });
    },
  },
});
</script>

<script setup>
import { useQuasar } from "quasar";
import { useMarketStore } from "../stores/marketStore";
import { useStorage } from "../composables/useStorage.js";
import { useAccount } from "../composables/useAccount.js";
import { useRelay } from "../composables/useRelay.js";
import { useShoppingCart } from "../composables/useShoppingCart.js";
import { useOrders } from "../composables/useOrders.js";

const $q = useQuasar();
window.$q = $q; // if necessary

const { store } = useMarketStore();

const {
  generateKeyPair,
  openAccountDialog,
  createAccount,
  logout,
  clearAllData,
} = useAccount();

const {
  startRelaysHealtCheck,
  toRelayKey,
  loadRelaysData,
  loadRelayData,
  connectToRelay,
  requeryRelay,
  buildRelayFilters,
  queryRelay,
  publishEventToRelays,
  findRelaysForMerchant,
} = useRelay();

const {
  addProductToCart,
  removeProductFromCart,
  removeCart,
  checkoutStallCart,
} = useShoppingCart();

const {
  placeOrder,
} = useOrders();

const {
    restoreFromStorage,
    persistStallsAndProducts,
    persistRelaysData,
    persistDMEvent,
} = useStorage()

restoreFromStorage();

const init = async () => {
  try {
    await loadRelaysData();
    startRelaysHealtCheck();
  } catch (error) {
    console.error("Failed to initialize:", error);
  }
};

init();
</script>
