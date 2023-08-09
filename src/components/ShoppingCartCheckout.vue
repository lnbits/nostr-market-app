<template>
  <div>
    <q-card v-if="cart && stall" bordered class="q-mb-md">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img
              v-if="merchantProfile(cart.merchant)?.picture"
              :src="merchantProfile(cart.merchant)?.picture"
            />
            <img
              v-else
              :src="$q.config.staticPath + '/images/blank-avatar.webp'"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <strong>
              <span v-text="cart.products[0]?.stallName"></span>
            </strong>
          </q-item-label>
          <q-item-label caption>
            By
            <span
              class="ellipsis-2-lines text-wrap"
              v-text="
                merchantProfile(cart.merchant)?.name || cart.merchant?.publicKey
              "
            ></span>
          </q-item-label>
        </q-item-section>
        <q-item-section side> </q-item-section>
      </q-item>

      <q-separator />
      <q-card-section v-if="orderConfirmed">
        <div class="row q-mt-md q-ml-md q-pr-md">
          <div class="col-xs-12 col-sm-12 col-md-2 q-mt-md">
            <strong>Message:</strong>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-10">
            <q-input
              v-model.trim="contactData.message"
              outlined
              type="textarea"
              rows="3"
              label="Message (optional)"
              hint="Message merchant about additional order needs"
            ></q-input>
          </div>
        </div>

        <div class="row q-mt-md q-ml-md q-pr-md">
          <div class="col-xs-12 col-sm-12 col-md-2 q-mt-md">
            <strong>Address:</strong>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-10">
            <q-input
              v-model.trim="contactData.address"
              outlined
              type="textarea"
              rows="3"
              label="Address (optional)"
              hint="Must provide for physical shipping"
            >
            </q-input>
          </div>
        </div>

        <div class="row q-mt-md q-ml-md q-pr-md">
          <div class="col-xs-12 col-sm-12 col-md-2 q-mt-md">
            <strong>Email:</strong>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-10">
            <q-input
              v-model.trim="contactData.email"
              type="email"
              outlined
              label="Email (optional)"
              hint="Merchant may not use email"
            ></q-input>
          </div>
        </div>

        <div class="row q-mt-md q-ml-md q-pr-md">
          <div class="col-xs-12 col-sm-12 col-md-2 q-mt-md">
            <strong>Npub:</strong>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-10">
            <q-input
              v-model.trim="contactData.npub"
              outlined
              label="Alternative Npub (optional)"
              hint="Use a different Npub to communicate with the merchant"
            ></q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-section v-else horizontal>
        <q-card-section class="col-7">
          <div class="row q-mt-md">
            <div class="col-xs-12 col-sm-12 col-md-4">
              <strong>Subtotal:</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <strong>{{ formatCurrency(cartTotal, stall.currency) }}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4"></div>
          </div>
          <div class="row q-mt-md">
            <div class="col-xs-12 col-sm-12 col-md-4">
              <strong>Shipping:</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <strong v-if="shippingZone">{{
                formatCurrency(shippingZone.cost, stall.currency)
              }}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <q-btn-dropdown
                unelevated
                color="secondary"
                rounded
                :label="shippingZoneLabel"
              >
                <q-item
                  v-for="zone of stall.shipping"
                  @click="selectShippingZone(zone)"
                  :key="zone.id"
                  clickable
                  v-close-popup
                >
                  <q-item-section>
                    <q-item-label
                      ><span v-text="zone.name"></span
                    ></q-item-label>
                    <q-item-label caption
                      ><span v-text="zone.countries?.join(', ')"></span
                    ></q-item-label>
                  </q-item-section>
                </q-item>
              </q-btn-dropdown>
            </div>
          </div>
          <q-separator class="q-mt-sm" />
          <div class="row q-mt-md">
            <div class="col-xs-12 col-sm-12 col-md-4">
              <strong>Total:</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <strong>{{
                formatCurrency(cartTotalWithShipping, stall.currency)
              }}</strong>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4"></div>
          </div>
        </q-card-section>

        <q-separator vertical />

        <q-card-section>
          <strong>Payment Method</strong>
          <q-option-group
            v-model="paymentMethod"
            :options="paymentOptions"
            color="green"
            disable
          />
        </q-card-section>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <div v-if="orderConfirmed">
          <q-btn @click="orderConfirmed = false" flat color="grey">
            Back
          </q-btn>
          <q-btn @click="placeOrder()" flat color="primary">
            Place Order
          </q-btn>
        </div>
        <div v-else>
          <q-btn @click="goToShoppingCart" flat color="grey"> Back </q-btn>
          <q-btn @click="confirmOrder" flat color="primary"> Confirm </q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ShoppingCartCheckout",
  props: ["cart", "stall", "customer-pubkey", "profiles"],
  data: function () {
    return {
      orderConfirmed: false,
      paymentMethod: "ln",
      shippingZone: null,
      contactData: {
        email: null,
        npub: null,
        address: null,
        message: null,
      },
      paymentOptions: [
        {
          label: "Lightning Network",
          value: "ln",
        },
        {
          label: "BTC Onchain",
          value: "btc",
        },
        {
          label: "Cashu",
          value: "cashu",
        },
      ],
    };
  },
  computed: {
    cartTotal() {
      if (!this.cart.products?.length) return 0;
      return this.cart.products.reduce((t, p) => p.price + t, 0);
    },
    cartTotalWithShipping() {
      if (!this.shippingZone) return this.cartTotal;
      return this.cartTotal + this.shippingZone.cost;
    },
    shippingZoneLabel() {
      if (!this.shippingZone) {
        return "Shipping Zone";
      }
      const zoneName = this.shippingZone.name.substring(0, 10);
      if (this.shippingZone?.name.length < 10) {
        return zoneName;
      }
      return zoneName + "...";
    },
  },
  methods: {
    formatCurrency: function (value, unit) {
      return formatCurrency(value, unit);
    },
    selectShippingZone: function (zone) {
      this.shippingZone = zone;
    },

    confirmOrder: function () {
      if (!this.shippingZone) {
        this.$q.notify({
          timeout: 5000,
          type: "warning",
          message: "Please select a shipping zone!",
        });
        return;
      }
      this.orderConfirmed = true;
    },
    async placeOrder() {
      if (!this.shippingZone) {
        this.$q.notify({
          timeout: 5000,
          type: "warning",
          message: "Please select a shipping zone!",
        });
        return;
      }
      if (!this.customerPubkey) {
        this.$emit("login-required");
        return;
      }
      const order = {
        address: this.contactData.address,
        message: this.contactData.message,
        contact: {
          nostr: this.contactData.npub,
          email: this.contactData.email,
        },
        items: Array.from(this.cart.products, (p) => {
          return { product_id: p.id, quantity: p.orderedQuantity };
        }),
        shipping_id: this.shippingZone.id,
        type: 0,
      };
      const created_at = Math.floor(Date.now() / 1000);
      order.id = await hash(
        [this.customerPubkey, created_at, JSON.stringify(order)].join(":")
      );

      const event = {
        ...(await NostrTools.getBlankEvent()),
        kind: 4,
        created_at,
        tags: [["p", this.stall.pubkey]],
        pubkey: this.customerPubkey,
      };

      this.$emit("place-order", { event, order, cartId: this.cart.id });
    },
    goToShoppingCart: function () {
      this.$emit("change-page", "shopping-cart-list");
    },
    merchantProfile(pubkey) {
      return this.profiles?.find((p) => p.pubkey === pubkey);
    },
  },
  created() {
    if (this.stall.shipping?.length === 1) {
      this.shippingZone = this.stall.shipping[0];
    }
  },
});
</script>
