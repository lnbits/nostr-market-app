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
        <div class="column full-width" v-else>
          <h3 class="text-h5 text-primary q-mb-none q-mt-none">
            Order Summary
          </h3>
          <a
            :href="'lightning:' + qrCodeDialog.data?.payment_request"
            class="full-width"
          >
            <div v-if="qrCodeDialog.data.payment_request" :ratio="1">
              <div :class="{ 'dark-mode': $q.dark.isActive }">
                <vue-qrcode
                  :value="qrCodeDialog.data.payment_request"
                  :options="qrCodeOptions"
                  class="qrcode"
                ></vue-qrcode>
              </div>
            </div>
            <div v-else>
              <q-spinner color="primary" size="2.55em"></q-spinner>
            </div>
          </a>
          <div
            v-if="qrCodeDialog.data.payment_request"
            class="text-center q-mt-md cursor-pointer"
            @click="copyText(formattedQRCodeValue)"
          >
            {{ formattedQRCodeValue }}
            <q-icon name="content_copy" class="q-ml-sm" />
          </div>
          <div class="full-width q-mt-md">
            <q-card bordered>
              <q-expansion-item
                switch-toggle-side
                dense
                icon="shopping_cart"
                label="Cart Items"
                caption="Click to view/hide cart items"
                bordered
                default-opened
              >
                <q-list padding>
                  <q-item
                    v-for="(item, index) in checkoutCart.products"
                    :key="index"
                  >
                    <q-item-section>
                      <q-item-label class="text-weight-medium">{{
                        item.name
                      }}</q-item-label>
                      <q-item-label caption>
                        Quantity: {{ item.orderedQuantity }} × {{ item.price }}
                        {{ item.currency }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class="text-weight-bold">
                        {{ item.orderedQuantity * item.price }}
                        {{ item.currency }}
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </q-card>
          </div>
          <q-card bordered>
            <q-list bordered class="q-mt-md">
              <q-item>
                <q-item-section>Subtotal</q-item-section>
                <q-item-section side>
                  {{ activeCartDetails.cartSubtotal }}
                  {{ activeCartDetails.currency }}
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>Shipping</q-item-section>
                <q-item-section side>
                  {{ activeCartDetails.shippingZone.cost }}
                  {{ activeCartDetails.shippingZone.currency }}
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-bold">Total</q-item-label>
                </q-item-section>
                <q-item-section side class="text-weight-bold">
                  {{
                    activeCartDetails.cartSubtotal +
                    activeCartDetails.shippingZone.cost
                  }}
                  {{ activeCartDetails.shippingZone.currency }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
      <div class="row q-mt-lg">
        <q-btn outline v-close-popup color="red" class="q-ml-auto">Close</q-btn>
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
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    handleFilterData(filterData) {
      console.log("### handleFilterData", filterData);
      this.filterData = filterData;
      this.setActivePage("market");
    },
    /////////////////////////////////////////////////////////// MISC ///////////////////////////////////////////////////////////

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
  },
});
</script>

<script setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
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
// window.$q = $q; // if necessary

const marketStore = useMarketStore();

const {
  // State
  defaultBanner,
  defaultLogo,
  defaultMarketNaddr,
  account,
  accountDialog,
  market,
  accountMetadata,
  checkoutCart,
  checkoutStall,
  activePage,
  activeOrderId,
  activeCartDetails,
  allMarketsSelected,
  groupByStall,
  bannerImage,
  logoImage,
  isLoading,
  showFilterDetails,
  searchText,
  dmEvents,
  activeMarket,
  activeStall,
  activeProduct,
  pool,
  relays,
  dmSubscriptions,
  stalls,
  products,
  orders,
  profiles,
  relaysData,
  shoppingCarts,
  markets,
  qrCodeDialog,
  naddrDialog,
  filterData,
  sort,
  config,
  readNotes,
  qInstance,

  // Getters (no-argument getters only)
  formattedQRCodeValue,
  processedEventIds,
  marketsName,
  stallName,
  productName,
  isValidAccountKey,
  allCartsItemCount,
  allCategories,
  allCurrencies,
  allMerchants,
  allRelays,
  activeMarketRelaysData,
  dmPeers,
  selectedMarketsMerchants,
  filteredProducts,
  filterCount,
  filterStalls,
} = storeToRefs(marketStore);

const {
  markNoteAsRead,
  focusOnElement,
  sanitizeImageSrc,
  sortProducts,
  toggleCategoryFilter,
  openAccountDialog,
  setActivePage,
  transitToPage,
  getAmountFormatted,
  // Update the UI configuration and apply it
  updateUiConfig,
  // Ensure these actions are defined somewhere in the store
  hasCategory,
  allStallCatgories,
  allStallImages,
} = useMarketStore();

// Note: The following "getters" are defined as functions with arguments:
//   allStallCatgories(stallId)
//   allStallImages(stallId)
// Because they require arguments, they are not standard computed properties and
// won't appear as refs. To use them, call them directly from the store instance.
// Example:
// const categories = marketStore.allStallCatgories(someStallId)
// const images = marketStore.allStallImages(someStallId)

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
  navigateTo,
  _handleNewMerchant,
  _handleNewRelay,
  _handleRemoveMerchant,
  _removeSubscriptionsForMerchant,
  _handleRemovedRelay,
} = useMarket();

const { generateKeyPair, createAccount, logout, clearAllData } = useAccount();

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

const { handleDmChatSelected, sendDirectMessage } = useDirectMessage();

onMounted(async () => {
  try {
    marketStore.pool = new NostrTools.SimplePool();
    bannerImage.value = defaultBanner;
    logoImage.value = defaultLogo;
    restoreFromStorage();

    const params = new URLSearchParams(window.location.search);
    await addMarket(params.get("naddr"));
    await _handleQueryParams(params);

    isLoading.value = false;
    await loadRelaysData();
    startRelaysHealtCheck();
  } catch (error) {
    console.error("Failed to initialize:", error);
  }
});

watch(
  () => config,
  (n, _) => {
    if (!n?.opts?.ui?.banner) {
      bannerImage.value = defaultBanner.value;
    } else {
      bannerImage.value = null;
      setTimeout(() => {
        bannerImage.value = sanitizeImageSrc(
          n?.opts?.ui?.banner,
          defaultBanner.value
        );
      }, 1);
    }

    if (!n?.opts?.ui?.picture) {
      logoImage.value = defaultLogo.value;
    } else {
      logoImage.value = null;
      setTimeout(() => {
        logoImage.value = sanitizeImageSrc(
          n?.opts?.ui?.picture,
          defaultLogo.value
        );
      }, 1);
    }
  }
);

watch(
  () => searchText.value,
  async (n, o) => {
    if (!n) return;
    if (n.toLowerCase().startsWith('naddr')) {
      try {
        const { type, data } = NostrTools.nip19.decode(n);
        if (type !== 'naddr' || data.kind !== 30019) return;

        $q.dialog({
          title: 'Confirmation',
          message: 'Do you want to import this market profile?',
          ok: 'Yes',
          cancel: 'No',
        }).onOk(async () => {
          searchText.value = '';
          await addMarket(n);
        });
      } catch (error) {
        console.error('Error decoding naddr:', error);
      }
    }
  }
);

const _handleQueryParams = async (params) => {
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
      console.log(`Request (URL) merchant (${merchantPubkey}) already exists!`);
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
};
const handleFilterData = (filterData) => {
  console.log("### handleFilterData", filterData);
  this.filterData = filterData;
  this.setActivePage("market");
};

const qrCodeOptions = {
  width: 200,
  color: {
    dark: $q.dark.isActive ? '#FFBB00' : '#000000', // Foreground color
    light: $q.dark.isActive ? '#000000' : '#ffffff', // Background color
  },
};

</script>
