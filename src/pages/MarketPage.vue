<template>
  <q-page>
    <div class="row q-mb-sm q-mt-md">
      <div class="col-lg-2 col-md-1 col-sm-0"></div>
      <div class="col-lg-8 col-md-10 col-sm-12 auto-width">
        <div class="row q-mb-md q-pa-none">
          <q-toolbar class="col-lg-1 col-md-1 col-sm-0 q-pl-none">
            <q-avatar rounded size="64px" class="q-ma-none q-pa-none gt-sm">
              <img v-if="logoImage" :src="logoImage">
            </q-avatar>
          </q-toolbar>
          <q-toolbar class="col-lg-6 col-md-5 col-sm-12 auto-width">
            <q-input class="rounded-pill" style="width:100%;" rounded outlined clearable v-model.trim="searchText"
              label="Filter products, load market profile...">
              <template v-slot:append>
                <q-icon v-if="!searchText" name="search" />
              </template>
            </q-input>
          </q-toolbar>
          <q-toolbar class="col-lg-5 col-md-6 col-sm-12 q-ma-none">
            <div class="float-right">
              <q-btn color="gray" icon="travel_explore" flat size="lg"
                @click="setActivePage('search-nostr')"><q-tooltip>Search
                  for products on Nostr</q-tooltip></q-btn>
              <q-btn color="gray" icon="settings" flat size="lg" @click="setActivePage('market-config')"><q-tooltip>
                  Settings</q-tooltip></q-btn>
              <q-btn v-if="account" @click="setActivePage('user-config')" color="gray" icon="perm_identity" flat
                size="lg"><q-tooltip>User
                  User Config</q-tooltip></q-btn>
              <q-btn v-else @click="accountDialog.show = true" color="gray" icon="person_add" flat
                size="lg"><q-tooltip>User
                  Login</q-tooltip></q-btn>
              <q-btn @click="setActivePage('user-chat')" color="gray" icon="chat" flat
                size="lg"><q-tooltip>Chat</q-tooltip></q-btn>
              <q-btn @click="setActivePage('customer-orders')" color="gray" icon="receipt_long" flat
                size="lg"><q-tooltip>Orders</q-tooltip></q-btn>
              <q-btn color="gray" icon="shopping_cart" dense round flat size="lg"
                @click="setActivePage('shopping-cart-list')">
                <q-tooltip>Shopping Cart</q-tooltip>

                <q-badge v-if="allCartsItemCount" color="secondary" floating>
                  <span v-text="allCartsItemCount"></span>
                </q-badge>
              </q-btn>
            </div>

          </q-toolbar>
        </div>
      </div>
      <div class="col-lg-2 col-md-1 col-sm-0"></div>
    </div>

    <div class="row q-mb-sm">
      <div class="col-lg-2 col-md-1 col-sm-0"></div>
      <div class="col-lg-8 col-md-10 col-sm-12">

        <div v-if="products?.length" class="gt-sm">
          <q-virtual-scroll :items="allCategories" virtual-scroll-horizontal>
            <template v-slot="{ item, index }">
              <q-chip :key="index" :color="item.selected ? 'grey' : ''" class="cursor-pointer q-mb-md">
                <span v-text="item.category" @click="toggleCategoryFilter(item.category)"></span>
                <q-badge @click="toggleCategoryFilter(item.category)" rounded class="q-ml-sm" color="secondary"> <span
                    v-text="item.count"></span></q-badge>
              </q-chip>
            </template>
          </q-virtual-scroll>
        </div>
      </div>
      <div class="col-lg-2 col-md-1 col-sm-0"></div>
    </div>

    <div v-if="isLoading" class="row q-mb-sm">
      <div class="col-12 text-center"> <q-spinner-dots color="primary" size="xl" /></div>
    </div>

    <div class="row q-mb-sm">
      <div class="col-lg-2 col-md-1 col-sm-0"></div>
      <div class="col-lg-8 col-md-10 col-sm-12 auto-width">
        <q-banner class="row q-pa-none q-mb-lg gt-sm shadow-2">
          <q-img v-if="bannerImage" :src="bannerImage" class="rounded-borders" style="width: 100%; height: 250px" cover>
            <div v-if="config?.opts?.about" class="absolute-bottom text-subtitle1 text-center">
              <span v-text="config.opts.about"></span>
            </div>
          </q-img>
        </q-banner>

      </div>
      <div class="col-lg-2 col-md-1 col-sm-0 auto-width"></div>
    </div>

    <div class="row q-mb-sm">
      <div class="col-lg-2 col-md-1 col-sm-0"></div>
      <div class="col-lg-7 col-md-9 col-sm-12 auto-width">

        <q-breadcrumbs class="cursor q-mt-sm q-mr-sm">
          <q-breadcrumbs-el :label="config?.opts?.name || 'Market'" icon="home" @click="navigateTo('market')"
            class="cursor-pointer auto-width">
            <q-checkbox v-model="groupByStall" v-if="activePage === 'market' && stalls?.length"
              class="q-pl-md float-right" size="xs" val="xs" label="Group by stalls"></q-checkbox>

          </q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="activePage === 'customer-stall'" :label="stallName"
            @click="navigateTo('stall', { stall: activeStall })" icon="storefront"
            class="cursor-pointer"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="activePage === 'customer-stall' && activeProduct" :label="productName"
            class="cursor-pointer" icon="widgets"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="activePage === 'shopping-cart-list'" label="Shoping Cart"
            icon="shopping_cart"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="activePage === 'customer-orders'" label="Orders" icon="receipt_long"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="activePage === 'market-config'" label="Settings" icon="settings"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="activePage === 'user-config'" label="User Config"
            icon="perm_identity"></q-breadcrumbs-el>
          <q-breadcrumbs-el v-if="activePage === 'user-chat'" label="User Chat" icon="chat"></q-breadcrumbs-el>
        </q-breadcrumbs>


      </div>
      <div class="col-lg-1 col-md-1 col-sm-0 auto-width">
        <q-btn v-if="activePage === 'customer-stall'" flat color="grey" icon="content_copy" @click="copyUrl()"
          class="float-right"></q-btn>
      </div>
      <div class="col-lg-2 col-md-1 col-sm-0 auto-width"></div>
    </div>
    <div class="row q-mb-md">
      <div class="col-lg-2 col-md-1 col-sm-0"></div>
      <div class="col-lg-8 col-md-10 col-sm-12 auto-width">
        <q-separator class="q-mt-sm q-mb-md"></q-separator>

        <market-config v-if="activePage === 'market-config'" :merchants="merchants" @add-merchant="addMerchant"
          @remove-merchant="removeMerchant" :relays="relays" :read-notes="readNotes" @add-relay="addRelay"
          @remove-relay="removeRelay" :config-ui="config?.opts" @ui-config-update="updateUiConfig"
          @publish-naddr="publishNaddr" @clear-all-data="clearAllData" @note-read="markNoteAsRead"></market-config>

        <user-config v-else-if="activePage === 'user-config'" :account="account" @logout="logout"
          @copy-text="copyText"></user-config>

        <user-chat v-else-if="activePage === 'user-chat'"></user-chat>

        <shopping-cart-list v-else-if="activePage === 'shopping-cart-list'" :carts="shoppingCarts"
          @add-to-cart="addProductToCart" @remove-from-cart="removeProductFromCart" @remove-cart="removeCart"
          @checkout-cart="checkoutStallCart"></shopping-cart-list>

        <shopping-cart-checkout v-else-if="activePage === 'shopping-cart-checkout'" :cart="checkoutCart"
          :stall="checkoutStall" :customer-pubkey="account?.pubkey" @login-required="openAccountDialog"
          @place-order="placeOrder" @change-page="navigateTo"></shopping-cart-checkout>

        <customer-orders v-else-if="activePage === 'customer-orders'" :orders="orders" :products="products"
          :stalls="stalls" :merchants="merchants" @show-invoice="showInvoiceQr"></customer-orders>

        <customer-stall v-else-if="activePage === 'customer-stall'" :stall="stalls.find(stall => stall.id == activeStall)"
          :products="filterProducts" :product-detail="activeProduct" @change-page="navigateTo"
          @add-to-cart="addProductToCart"></customer-stall>

        <div v-else-if="!merchants?.length">
          <q-list class="q-mt-md" bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon color="primary" name="info" size="xl" />
                </q-avatar>

              </q-item-section>

              <q-item-section class="q-mt-sm q-ml-lg">
                <q-item-label><strong>Note</strong></q-item-label>

                <q-item-label>
                  <div class="text-caption">
                    <span class="text-subtitle1"> You can start by adding a merchant public key </span>
                    <q-btn @click="setActivePage('market-config')" flat color="secondary" class="q-mb-xs">Here</q-btn>
                    <br>
                    <span class="text-subtitle1 q-pt-md">Or enter a nostr market profile ( <code>naddr</code>) in the
                      filter input.
                    </span>
                  </div>
                </q-item-label>
              </q-item-section>
              <q-item-section side>

              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div v-else>
          <customer-stall-list v-if="groupByStall" :stalls="filterStalls" @change-page="navigateTo"></customer-stall-list>

          <customer-market v-else :filtered-products="filterProducts" :search-text="searchText"
            :filter-categories="filterCategories" @change-page="navigateTo" @update-data="updateData"
            @add-to-cart="addProductToCart"></customer-market>
        </div>

      </div>
      <div class="col-lg-2 col-md-1 col-sm-0 auto-width"></div>
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
        <q-input dense label="Nsec/Hex" v-model="accountDialog.data.key" autofocus @keyup.enter="createAccount"
          :error="accountDialog.data.key && !isValidAccountKey" hint="Enter you private key"></q-input>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn v-if="isValidAccountKey" label="Login" color="primary" @click="() => createAccount()"></q-btn>
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
            <vue-qrcode :value="qrCodeDialog.data.payment_request" :options="{ width: 340 }"
              class="rounded-borders"></vue-qrcode>
          </div>
          <div v-else>
            <q-spinner color="primary" size="2.55em"></q-spinner>
          </div>
        </a>

      </div>
      <div class="row q-mt-lg">
        <q-btn v-if="qrCodeDialog.data.payment_request" outline color="grey"
          @click="copyText(qrCodeDialog.data.payment_request)">Copy invoice</q-btn>
        <q-btn flat v-close-popup color="grey" class="q-ml-auto">Close</q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from 'quasar'
window.$q = useQuasar()
</script>

<script>
import { defineComponent } from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode';

import MarketConfig from 'components/MarketConfig.vue'
import UserConfig from 'components/UserConfig.vue'
import UserChat from 'components/UserChat.vue'
import ShoppingCartList from 'components/ShoppingCartList.vue'
import ShoppingCartCheckout from 'components/ShoppingCartCheckout.vue'
import CustomerMarket from 'components/CustomerMarket.vue'
import CustomerOrders from 'components/CustomerOrders.vue'
import CustomerStall from 'components/CustomerStall.vue'
import CustomerStallList from 'components/CustomerStallList.vue'


export default defineComponent({
  name: 'MarketPage',
  components: { MarketConfig },
  data: function () {
    return {
      account: null,
      accountMetadata: null,
      accountDialog: {
        show: false,
        data: {
          watchOnly: false,
          key: null
        }
      },

      merchants: [],
      shoppingCarts: [],
      checkoutCart: null,
      checkoutStall: null,

      activePage: '',
      activeOrderId: null,
      dmSubscriptions: {},

      qrCodeDialog: {
        data: {
          payment_request: null,
          message: null,
        },
        dismissMsg: null,
        show: false
      },


      filterCategories: [],
      groupByStall: false,

      relays: new Set(),
      events: [],
      stalls: [],
      products: [],
      orders: {},

      bannerImage: null,
      logoImage: null,
      isLoading: false,


      profiles: new Map(),
      searchText: null,
      inputPubkey: null,
      inputRelay: null,
      activeStall: null,
      activeProduct: null,
      pool: null,
      config: {
        opts: null
      },


      defaultBanner: '/images/nostr-cover.png',
      defaultLogo: '/images/nostr-avatar.png',
      readNotes: {
        merchants: false,
        marketUi: false
      }
    }
  },
  watch: {
    config(n, o) {
      if (!n?.opts?.ui?.banner) {
        this.bannerImage = this.defaultBanner
      } else {
        this.bannerImage = null
        setTimeout(() => {
          this.bannerImage = this.sanitizeImageSrc(n?.opts?.ui?.banner, this.defaultBanner), 1
        })
      }
      if (!n?.opts?.ui?.picture) {
        this.logoImage = this.defaultLogo
      } else {
        this.logoImage = null
        setTimeout(() => {
          this.logoImage = this.sanitizeImageSrc(n?.opts?.ui?.picture, this.defaultLogo), 1
        })
      }

    },
    searchText(n, o) {
      if (!n) return
      if (n.toLowerCase().startsWith('naddr')) {
        try {
          const { type, data } = NostrTools.nip19.decode(n)
          if (type !== 'naddr' || data.kind !== 30019) return
          this.$q.dialog(confirm('Do you want to import this market profile?'))
            .onOk(async () => {
              await this.checkMarketNaddr(n)
              this.searchText = ''
            })
        } catch { }

      }
    }
  },
  computed: {

    filterProducts() {
      let products = this.products.filter(p => this.hasCategory(p.categories))
      if (this.activeStall) {
        products = products.filter(p => p.stall_id == this.activeStall)
      }
      if (!this.searchText || this.searchText.length < 2) return products
      const searchText = this.searchText.toLowerCase()
      return products.filter(p => (
        p.name.toLowerCase().includes(searchText) ||
        (p.description &&
          p.description.toLowerCase().includes(searchText)) ||
        (p.categories &&
          p.categories.toString().toLowerCase().includes(searchText))
      )
      )
    },
    filterStalls() {
      const stalls = this.stalls
        .map(s => (
          {
            ...s,
            categories: this.allStallCatgories(s.id),
            images: this.allStallImages(s.id).slice(0, 8),
            productCount: this.products.filter(p => p.stall_id === s.id).length
          }))
        .filter(p => this.hasCategory(p.categories))

      if (!this.searchText || this.searchText.length < 2) return stalls

      const searchText = this.searchText.toLowerCase()
      return this.stalls.filter(s => (
        s.name.toLowerCase().includes(searchText) ||
        (s.description &&
          s.description.toLowerCase().includes(searchText)) ||
        (s.categories &&
          s.categories.toString().toLowerCase().includes(searchText))
      ))
    },
    stallName() {
      return this.stalls.find(s => s.id == this.activeStall)?.name || 'Stall'
    },
    productName() {
      return (
        this.products.find(p => p.id == this.activeProduct)?.name || 'Product'
      )
    },
    hasExtension() {
      return window.nostr
    },
    isValidAccountKey() {
      return isValidKey(this.accountDialog.data.key)
    },


    allCartsItemCount() {
      return this.shoppingCarts.map(s => s.products).flat().reduce((t, p) => t + p.orderedQuantity, 0)
    },

    allCategories() {
      const categories = this.products.map(p => p.categories).flat().filter(c => !!c)
      const countedCategories = categories.reduce((all, c) => {
        all[c] = (all[c] || 0) + 1
        return all
      }, {})
      const x = Object.keys(countedCategories)
        .map(category => ({
          category,
          count: countedCategories[category],
          selected: this.filterCategories.indexOf(category) !== -1
        }))
        .sort((a, b) => b.count - a.count)
      return x
    }
  },

  async created() {
    this.bannerImage = this.defaultBanner
    this.logoImage = this.defaultLogo

    this.restoreFromStorage()

    const params = new URLSearchParams(window.location.search)

    await this.checkMarketNaddr(params.get('naddr'))
    await this.handleQueryParams(params)


    // Get notes from Nostr
    await this.initNostr()



    await this.listenForIncommingDms(this.merchants.map(m => ({ publicKey: m.publicKey, since: this.lastDmForPubkey(m.publicKey) })))
    this.isLoading = false
  },
  methods: {
    async handleQueryParams(params) {
      const merchantPubkey = params.get('merchant')
      const stallId = params.get('stall')
      const productId = params.get('product')

      // What component to render on start
      if (stallId) {
        this.setActivePage('customer-stall')
        if (productId) {
          this.activeProduct = productId
        }
        this.activeStall = stallId
      }
      if (merchantPubkey && !(this.merchants.find(m => m.publicKey === merchantPubkey))) {
        this.$q.dialog(confirm('We found a merchant pubkey in your request. Do you want to add it to the merchants list?'))
          .onOk(async () => {
            this.merchants.push({ publicKey: merchantPubkey, profile: null })
          })
      }

    },
    restoreFromStorage() {
      this.merchants = this.$q.localStorage.getItem('nostrmarket.merchants') || []
      this.shoppingCarts = this.$q.localStorage.getItem('nostrmarket.shoppingCarts') || []

      this.account = this.$q.localStorage.getItem('nostrmarket.account') || null

      const uiConfig = this.$q.localStorage.getItem('nostrmarket.marketplaceConfig') || { ui: { darkMode: false } }

      // trigger the `watch` logic
      this.config = { ...this.config, opts: { ...this.config.opts, ...uiConfig } }
      this.applyUiConfigs(this.config)


      const prefix = 'nostrmarket.orders.'
      const orderKeys = this.$q.localStorage.getAllKeys().filter(k => k.startsWith(prefix))
      orderKeys.forEach(k => {
        const pubkey = k.substring(prefix.length)
        this.orders[pubkey] = this.$q.localStorage.getItem(k)
      })

      const relays = this.$q.localStorage.getItem('nostrmarket.relays')
      this.relays = new Set(relays?.length ? relays : defaultRelays)

      const readNotes = this.$q.localStorage.getItem('nostrmarket.readNotes') || {}
      this.readNotes = { ...this.readNotes, ...readNotes }
    },
    applyUiConfigs(config = {}) {
      console.log('### applyUiConfigs', config)
      const { name, about, ui } = config?.opts || {}
      this.$q.localStorage.set('nostrmarket.marketplaceConfig', { name, about, ui })
      if (config.opts?.ui?.theme) {
        document.body.setAttribute('data-theme', this.config.opts.ui.theme)
        this.$q.localStorage.set('lnbits.theme', this.config.opts.ui.theme)
      }
      const newDarkMode = config.opts?.ui?.darkMode
      this.$q.dark.set(!!newDarkMode)
    },

    async createAccount(useExtension = false) {
      let nip07
      if (useExtension) {
        await this.getFromExtension()
        nip07 = true
      }
      if (isValidKey(this.accountDialog.data.key, 'nsec')) {
        let { key, watchOnly } = this.accountDialog.data
        if (key.startsWith('n')) {
          let { type, data } = NostrTools.nip19.decode(key)
          key = data
        }
        const privkey = watchOnly ? null : key
        const pubkey = watchOnly ? key : NostrTools.getPublicKey(key)
        this.$q.localStorage.set('nostrmarket.account', {
          privkey,
          pubkey,
          nsec: NostrTools.nip19.nsecEncode(key),
          npub: NostrTools.nip19.npubEncode(pubkey),

          useExtension: nip07 ?? false
        })
        this.accountDialog.data = {
          watchOnly: false,
          key: null
        }
        this.accountDialog.show = false
        this.account = this.$q.localStorage.getItem('nostrmarket.account')
      }
      this.accountDialog.show = false
    },
    generateKeyPair() {
      this.accountDialog.data.key = NostrTools.generatePrivateKey()
      this.accountDialog.data.watchOnly = false
    },
    async getFromExtension() {
      this.accountDialog.data.key = await window.nostr.getPublicKey()
      this.accountDialog.data.watchOnly = true
      return
    },
    openAccountDialog() {
      this.accountDialog.show = true
    },


    async updateUiConfig(data) {
      const { name, about, ui } = data
      this.config = { ...this.config, opts: { ...this.config.opts, name, about, ui } }
      this.applyUiConfigs(this.config)
    },

    async updateData(events) {
      console.log('### updateData', events)
      if (events.length < 1) {
        this.$q.notify({
          message: 'No matches were found!'
        })
        return
      }
      let products = new Map()
      let stalls = new Map()
      const deleteEventsIds = events
        .filter(e => e.kind === 5)
        .map(e => (e.tags || []).filter(t => t[0] === 'e'))
        .flat()
        .map(t => t[1])
        .filter(t => !!t)


      this.stalls.forEach(s => stalls.set(s.id, s))
      this.products.forEach(p => products.set(p.id, p))

      events.map(eventToObj).map(e => {
        if (e.kind == 0) {
          this.profiles.set(e.pubkey, e.content)
          if (e.pubkey == this.account?.pubkey) {
            this.accountMetadata = this.profiles.get(this.account.pubkey)
          }
          this.merchants.filter(m => m.publicKey === e.pubkey).forEach(m => m.profile = e.content)
          return
        } else if (e.kind == 5) {
          console.log('### delete event', e)
        } else if (e.kind == 30018) {
          //it's a product `d` is the prod. id
          products.set(e.d, { ...e.content, pubkey: e.pubkey, id: e.d, categories: e.t, eventId: e.id })
        } else if (e.kind == 30017) {
          // it's a stall `d` is the stall id
          stalls.set(e.d, { ...e.content, pubkey: e.pubkey, id: e.d, pubkey: e.pubkey })
        }
      })

      this.stalls = await Array.from(stalls.values())

      this.products = Array.from(products.values())
        .map(obj => {
          const stall = this.stalls.find(s => s.id == obj.stall_id)
          if (!stall) return
          obj.stallName = stall.name
          obj.images = obj.images || [obj.image]
          if (obj.currency != 'sat') {
            obj.formatedPrice = this.getAmountFormated(
              obj.price,
              obj.currency
            )
          }
          return obj
        })
        .filter(p => p && (deleteEventsIds.indexOf(p.eventId)) === -1)
      // console.log('### this.products', this.products)
    },

    async initNostr() {
      this.isLoading = true
      this.pool = new NostrTools.SimplePool()

      const relays = Array.from(this.relays)

      const authors = this.merchants.map(m => m.publicKey)
      const events = await this.pool.list(relays, [{ kinds: [0, 30017, 30018], authors }])
      if (!events || events.length == 0) return
      await this.updateData(events)

      const lastEvent = events.sort((a, b) => b.created_at - a.created_at)[0]
      this.poolSubscribe(lastEvent.created_at)
      this.isLoading = false
    },
    async poolSubscribe(since) {
      const authors = this.merchants.map(m => m.publicKey)
      this.pool
        .sub(Array.from(this.relays), [{ kinds: [0, 5, 30017, 30018], authors, since }])
        .on(
          'event',
          event => {
            this.updateData([event])
          },
          { id: 'masterSub' } //pass ID to cancel previous sub
        )
    },

    async checkMarketNaddr(naddr) {
      if (!naddr) return

      try {
        const { type, data } = NostrTools.nip19.decode(naddr)
        if (type !== 'naddr' || data.kind !== 30019) return // just double check
        this.config = {
          d: data.identifier,
          pubkey: data.pubkey,
          relays: data.relays
        }
      } catch (err) {
        console.error(err)
        return
      }


      try {
        // add relays to the set   
        const pool = new NostrTools.SimplePool()
        this.config.relays.forEach(r => this.relays.add(r))
        const event = await pool.get(this.config.relays, {
          kinds: [30019],
          limit: 1,
          authors: [this.config.pubkey],
          '#d': [this.config.d]
        })

        if (!event) return

        this.config = { ... this.config, opts: JSON.parse(event.content) }

        this.addMerchants(this.config.opts?.merchants)
        this.applyUiConfigs(this.config)

      } catch (error) {
        console.warn(error)
      }
    },


    navigateTo(page, opts = { stall: null, product: null, pubkey: null }) {
      console.log("### navigateTo", page, opts)

      const { stall, product, pubkey } = opts
      const url = new URL(window.location)

      const merchantPubkey = pubkey || this.stalls.find(s => s.id == stall)?.pubkey
      url.searchParams.set('merchant', merchantPubkey)

      if (page === 'stall' || page === 'product') {
        if (stall) {
          this.activeStall = stall
          this.setActivePage('customer-stall')
          url.searchParams.set('stall', stall)

          this.activeProduct = product
          if (product) {
            url.searchParams.set('product', product)
          } else {
            url.searchParams.delete('product')
          }
        }
      } else {
        this.activeStall = null
        this.activeProduct = null

        url.searchParams.delete('merchant')
        url.searchParams.delete('stall')
        url.searchParams.delete('product')

        this.setActivePage('market')
      }

      window.history.pushState({}, '', url)
      // this.activePage = page
    },
    copyUrl: function () {
      this.copyText(window.location)
    },
    copyText: function (text) {
      var notify = this.$q.notify
      Quasar.utils.copyToClipboard(text).then(function () {
        notify({
          message: 'Copied to clipboard!',
          position: 'bottom'
        })
      })
    },
    getAmountFormated(amount, unit = 'USD') {
      return formatCurrency(amount, unit)
    },

    setActivePage(page = 'market') {
      this.activePage = page
    },
    async addRelay(relayUrl) {
      let relay = String(relayUrl).trim()

      this.relays.add(relay)
      this.$q.localStorage.set(`nostrmarket.relays`, Array.from(this.relays))
      this.initNostr() // todo: improve
    },
    removeRelay(relayUrl) {
      this.relays.delete(relayUrl)
      this.relays = new Set(Array.from(this.relays))
      this.$q.localStorage.set(`nostrmarket.relays`, Array.from(this.relays))
      this.initNostr()  // todo: improve
    },



    addMerchant(publicKey) {
      this.merchants.unshift({
        publicKey,
        profile: null
      })
      this.$q.localStorage.set('nostrmarket.merchants', this.merchants)
      this.initNostr() // todo: improve
    },
    addMerchants(publicKeys = []) {
      const merchantsPubkeys = this.merchants.map(m => m.publicKey)

      const newMerchants = publicKeys
        .filter(p => merchantsPubkeys.indexOf(p) === -1)
        .map(p => ({ publicKey: p, profile: null }))
      this.merchants.unshift(...newMerchants)
      this.$q.localStorage.set('nostrmarket.merchants', this.merchants)
      this.initNostr() // todo: improve
    },
    removeMerchant(publicKey) {
      this.merchants = this.merchants.filter(m => m.publicKey !== publicKey)
      this.$q.localStorage.set('nostrmarket.merchants', this.merchants)
      this.products = this.products.filter(p => p.pubkey !== publicKey)
      this.stalls = this.stalls.filter(p => p.pubkey !== publicKey)
      this.initNostr() // todo: improve
    },

    addProductToCart(item) {
      let stallCart = this.shoppingCarts.find(s => s.id === item.stall_id)
      if (!stallCart) {
        stallCart = {
          id: item.stall_id,
          products: []
        }
        this.shoppingCarts.push(stallCart)
      }
      stallCart.merchant = this.merchants.find(m => m.publicKey === item.pubkey)

      let product = stallCart.products.find(p => p.id === item.id)
      if (!product) {
        product = { ...item, orderedQuantity: 0 }
        stallCart.products.push(product)

      }
      product.orderedQuantity = Math.min(product.quantity, item.orderedQuantity || (product.orderedQuantity + 1))

      this.$q.localStorage.set('nostrmarket.shoppingCarts', this.shoppingCarts)

      this.$q.notify({
        type: 'positive',
        message: 'Product added to cart!'
      })
    },

    removeProductFromCart(item) {
      const stallCart = this.shoppingCarts.find(c => c.id === item.stallId)
      if (stallCart) {
        stallCart.products = stallCart.products.filter(p => p.id !== item.productId)
        if (!stallCart.products.length) {
          this.shoppingCarts = this.shoppingCarts.filter(s => s.id !== item.stallId)
        }
        this.$q.localStorage.set('nostrmarket.shoppingCarts', this.shoppingCarts)
      }
    },
    removeCart(cartId) {
      this.shoppingCarts = this.shoppingCarts.filter(s => s.id !== cartId)
      this.$q.localStorage.set('nostrmarket.shoppingCarts', this.shoppingCarts)
    },

    checkoutStallCart(cart) {
      this.checkoutCart = cart
      this.checkoutStall = this.stalls.find(s => s.id === cart.id)
      this.setActivePage('shopping-cart-checkout')
    },

    async placeOrder({ event, order, cartId }) {
      if (!this.account?.privkey) {
        this.openAccountDialog()
        return
      }
      try {
        this.activeOrderId = order.id
        event.content = await NostrTools.nip04.encrypt(
          this.account.privkey,
          this.checkoutStall.pubkey,
          JSON.stringify(order)
        )

        event.id = NostrTools.getEventHash(event)
        event.sig = await NostrTools.signEvent(event, this.account.privkey)

        this.sendOrderEvent(event)
        this.persistOrderUpdate(this.checkoutStall.pubkey, event.created_at, order)
        this.removeCart(cartId)
        this.setActivePage('shopping-cart-list')
      } catch (error) {
        console.warn(error)
        this.$q.notify({
          type: 'warning',
          message: 'Failed to place order!'
        })
      }
    },

    sendOrderEvent(event) {
      const pub = this.pool.publish(Array.from(this.relays), event)
      this.$q.notify({
        type: 'positive',
        message: 'The order has been placed!'
      })
      this.qrCodeDialog = {
        data: {
          payment_request: null,
          message: null,
        },
        dismissMsg: null,
        show: true
      }
      pub.on('ok', () => {
        this.qrCodeDialog.show = true
      })
      pub.on('failed', (error) => {
        // do not show to user. It is possible that only one relay has failed
        console.error(error)
      })
    },

    async listenForIncommingDms(from) {
      if (!this.account?.privkey) {
        return
      }

      try {
        const filters = [{
          kinds: [4],
          '#p': [this.account.pubkey],
        }, {
          kinds: [4],
          authors: [this.account.pubkey],
        }]

        const subs = this.pool.sub(Array.from(this.relays), filters)
        subs.on('event', async event => {
          const receiverPubkey = event.tags.find(([k, v]) => k === 'p' && v && v !== '')[1]
          const isSentByMe = event.pubkey === this.account.pubkey
          if (receiverPubkey !== this.account.pubkey && !isSentByMe) {
            console.warn('Unexpected DM. Dropped!')
            return
          }
          this.persistDMEvent(event)
          const peerPubkey = isSentByMe ? receiverPubkey : event.pubkey
          await this.handleIncommingDm(event, peerPubkey)
        })
        return subs
      } catch (err) {
        console.error(`Error: ${err}`)
      }
    },
    async handleIncommingDm(event, peerPubkey) {
      try {

        const plainText = await NostrTools.nip04.decrypt(
          this.account.privkey,
          peerPubkey,
          event.content
        )
        console.log('### plainText', plainText)
        if (!isJson(plainText)) return

        const jsonData = JSON.parse(plainText)
        if ([0, 1, 2].indexOf(jsonData.type) !== -1) {
          this.persistOrderUpdate(peerPubkey, event.created_at, jsonData)
        }
        if (jsonData.type === 1) {
          this.handlePaymentRequest(jsonData)

        } else if (jsonData.type === 2) {
          this.handleOrderStatusUpdate(jsonData)
        }
      } catch (e) {
        console.warn('Unable to handle incomming DM', e)
      }
    },

    handlePaymentRequest(json) {
      if (json.id && (json.id !== this.activeOrderId)) {
        // not for active order, store somewehre else
        return
      }
      if (!json.payment_options?.length) {
        this.qrCodeDialog.data.message = json.message || 'Unexpected error'
        return
      }

      const paymentRequest = json.payment_options.find(o => o.type == 'ln')
        .link
      if (!paymentRequest) return
      this.qrCodeDialog.data.payment_request = paymentRequest
      this.qrCodeDialog.dismissMsg = this.$q.notify({
        timeout: 10000,
        message: 'Waiting for payment...'
      })

    },

    handleOrderStatusUpdate(jsonData) {
      if (jsonData.id && (jsonData.id !== this.activeOrderId)) {
        // not for active order, store somewehre else
        return
      }
      if (this.qrCodeDialog.dismissMsg) {
        this.qrCodeDialog.dismissMsg()
      }
      this.qrCodeDialog.show = false
      const message = jsonData.shipped ? 'Order shipped' : jsonData.paid ? 'Order paid' : 'Order notification'
      this.$q.notify({
        type: 'positive',
        message: message,
        caption: jsonData.message || ''
      })
    },

    persistDMEvent(event) {
      const dms = this.$q.localStorage.getItem(`nostrmarket.dm.${event.pubkey}`) || { events: [], lastCreatedAt: 0 }
      const existingEvent = dms.events.find(e => e.id === event.id)
      if (existingEvent) return

      dms.events.push(event)
      dms.events.sort((a, b) => a - b)
      dms.lastCreatedAt = dms.events[dms.events.length - 1].created_at
      this.$q.localStorage.set(`nostrmarket.dm.${event.pubkey}`, dms)
    },

    lastDmForPubkey(pubkey) {
      const dms = this.$q.localStorage.getItem(`nostrmarket.dm.${pubkey}`)
      if (!dms) return 0
      return dms.lastCreatedAt
    },

    persistOrderUpdate(pubkey, eventCreatedAt, orderUpdate) {
      let orders = this.$q.localStorage.getItem(`nostrmarket.orders.${pubkey}`) || []
      const orderIndex = orders.findIndex(o => o.id === orderUpdate.id)

      if (orderIndex === -1) {
        orders.unshift({
          ...orderUpdate,
          eventCreatedAt,
          createdAt: eventCreatedAt
        })
        this.orders[pubkey] = orders
        this.orders = { ...this.orders }
        this.$q.localStorage.set(`nostrmarket.orders.${pubkey}`, orders)
        return
      }

      let order = orders[orderIndex]

      if (orderUpdate.type === 0) {
        order.createdAt = eventCreatedAt
        order = { ...order, ...orderUpdate, message: order.message || orderUpdate.message }
      } else {
        order = order.eventCreatedAt < eventCreatedAt ? { ...order, ...orderUpdate } : { ...orderUpdate, ...order }
      }

      orders.splice(orderIndex, 1, order)
      this.orders[pubkey] = orders
      this.orders = { ...this.orders }
      this.$q.localStorage.set(`nostrmarket.orders.${pubkey}`, orders)
    },

    showInvoiceQr(invoice) {
      if (!invoice) return
      this.qrCodeDialog = {
        data: {
          payment_request: invoice
        },
        dismissMsg: null,
        show: true
      }
    },

    toggleCategoryFilter(category) {
      const index = this.filterCategories.indexOf(category)
      if (index === -1) {
        this.filterCategories.push(category)
      } else {
        this.filterCategories.splice(index, 1)
      }
    },

    hasCategory(categories = []) {
      if (!this.filterCategories?.length) return true
      for (const cat of categories) {
        if (this.filterCategories.indexOf(cat) !== -1) return true
      }
      return false
    },
    allStallCatgories(stallId) {
      const categories = this.products.filter(p => p.stall_id === stallId).map(p => p.categories).flat().filter(c => !!c)
      return Array.from(new Set(categories))
    },
    allStallImages(stallId) {
      const images = this.products.filter(p => p.stall_id === stallId).map(p => p.images && p.images[0]).filter(i => !!i)
      return Array.from(new Set(images))
    },

    sanitizeImageSrc(src, defaultValue) {
      try {
        if (src) {
          new URL(src)
          return src
        }
      } catch { }
      return defaultValue
    },

    async publishNaddr() {
      if (!this.account?.privkey) {
        this.openAccountDialog()
        this.$q.notify({
          message: 'Login Required!',
          icon: 'warning'
        })
        return
      }


      const merchants = Array.from(this.merchants.map(m => m.publicKey))
      const { name, about, ui } = this.config?.opts || {}
      const content = { merchants, name, about, ui }
      const identifier = this.config.identifier ?? crypto.randomUUID()
      const event = {
        ...(await NostrTools.getBlankEvent()),
        kind: 30019,
        content: JSON.stringify(content),
        created_at: Math.floor(Date.now() / 1000),
        tags: [['d', identifier]],
        pubkey: this.account.pubkey
      }
      event.id = NostrTools.getEventHash(event)
      try {
        event.sig = await NostrTools.signEvent(event, this.account.privkey)

        const pub = this.pool.publish(Array.from(this.relays), event)
        pub.on('ok', () => {
          console.debug(`Config event was sent`)
        })
        pub.on('failed', error => {
          console.error(error)
        })
      } catch (err) {
        console.error(err)
        this.$q.notify({
          message: 'Cannot publish market profile',
          caption: `Error: ${err}`,
          color: 'negative'
        })
        return
      }
      const naddr = NostrTools.nip19.naddrEncode({
        pubkey: event.pubkey,
        kind: 30019,
        identifier: identifier,
        relays: Array.from(this.relays)
      })
      this.copyText(naddr)
    },

    logout() {
      window.localStorage.removeItem('nostrmarket.account')
      window.location.href = window.location.origin + window.location.pathname;
      this.account = null
      this.accountMetadata = null
    },

    clearAllData() {
      this.$q.dialog(confirm(
        'This will remove all information about merchants, products, relays and others. ' +
        'You will NOT be logged out. Do you want to proceed?'
      ))
        .onOk(async () => {
          this.$q.localStorage.getAllKeys()
            .filter(key => key !== 'nostrmarket.account')
            .forEach(key => window.localStorage.removeItem(key))

          this.merchants = []
          this.relays = []
          this.orders = []
          this.config = { opts: null }
          this.shoppingCarts = []
          this.checkoutCart = null
          window.location.href = window.location.origin + window.location.pathname;

        })

    },
    markNoteAsRead(noteId) {
      this.readNotes[noteId] = true
      this.$q.localStorage.set('nostrmarket.readNotes', this.readNotes)
    }

  }
})
</script>
