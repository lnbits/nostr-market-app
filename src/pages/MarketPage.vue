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
    handleFilterData(filterData) {
      console.log("### handleFilterData", filterData);
      this.filterData = filterData;
      this.setActivePage("market");
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
import { useStorage } from "../composables/useStorage.js";
import { useMarketStore } from "../stores/marketStore";
import { useAccount } from "../composables/useAccount.js";
import { useRelay } from "../composables/useRelay.js";
import { useShoppingCart } from "../composables/useShoppingCart.js";
import { useOrders } from "../composables/useOrders.js";
import { useEvents } from "../composables/useEvents.js";
import { useMarket } from "../composables/useMarket.js";
import { useDirectMessage } from "../composables/useDirectMessage.js";

const $q = useQuasar();
window.$q = $q; // if necessary

const { store } = useMarketStore();

const {
  restoreFromStorage,
  persistStallsAndProducts,
  persistRelaysData,
  persistDMEvent,
} = useStorage();

const {
  createMarket,
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
} = useMarket();

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

const { placeOrder } = useOrders();

const { processEvents } = useEvents();

const { handleDmChatSelected, sendDirectMessage } = useDirectMessage();

const init = async () => {
  try {
    restoreFromStorage();

    const params = new URLSearchParams(window.location.search);
    await addMarket(params.get("naddr"));

    await loadRelaysData();
    startRelaysHealtCheck();
  } catch (error) {
    console.error("Failed to initialize:", error);
  }
};

init();
</script>
