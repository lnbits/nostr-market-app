<template>
  <div>
    <q-card v-if="!carts?.length" bordered class="q-mb-md">
      <q-card-section>
        <strong>No products in cart!</strong>
      </q-card-section>
    </q-card>
    <div v-for="cart in carts" :key="cart.id">
      <q-card bordered class="q-mb-md">
        <q-item>
          <user-profile
            :pubkey="cart.merchant"
            :profiles="profiles"
            :description="cart.products[0]?.stallName"
          ></user-profile>
          <q-item-section side>
            <div>
              <q-btn @click="removeCart(cart.id)" flat color="pink">
                Clear Cart
              </q-btn>
            </div>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section class="col-12">
            <q-list class="q-mt-md">
              <q-item v-for="product in cart.products" :key="product.id">
                <q-item-section avatar>
                  <q-avatar>
                    <img
                      v-if="product.images[0] || product.image"
                      :src="product.images[0] || product.image"
                    />
                    <img
                      v-else
                      :src="$q.config.staticPath + '/images/placeholder.png'"
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section class="q-mt-sm">
                  <q-item-label>{{ product.name }}</q-item-label>
                  <q-item-label class="gt-sm">
                    <div class="text-caption text-grey ellipsis-2-lines">
                      <p>{{ product.description }}</p>
                    </div>
                  </q-item-label>
                </q-item-section>
                <q-item-section class="q-mt-sm gt-sm">
                  <q-item-label
                    ><strong>{{
                      formatCurrency(product.price, product.currency)
                    }}</strong></q-item-label
                  >
                  <q-item-label></q-item-label>
                </q-item-section>

                <q-item-section class="q-ma-sm">
                  <q-input
                    v-model.number="product.orderedQuantity"
                    @change="quantityChanged(product)"
                    type="number"
                    rounded
                    outlined
                    min="1"
                    :max="product.quantity"
                  ></q-input>
                </q-item-section>

                <q-item-section>
                  <q-item-label
                    ><strong
                      >{{
                        formatCurrency(
                          product.price * product.orderedQuantity,
                          product.currency
                        )
                      }}
                    </strong></q-item-label
                  >
                </q-item-section>
                <q-item-section side>
                  <div>
                    <q-btn
                      flat
                      dense
                      round
                      icon="delete"
                      @click="removeProduct(product.stall_id, product.id)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          Total:
          <strong class="q-ma-md"> {{ cartTotalFormatted(cart) }} </strong>
          <q-btn @click="proceedToCheckout(cart)" flat color="primary">
            Proceed to Checkout
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import UserProfile from "./UserProfile.vue";

export default defineComponent({
  name: "ShoppingCartList",
  props: ["carts", "profiles"],
  components: { UserProfile },
  data: function () {
    return {};
  },
  computed: {},
  methods: {
    formatCurrency: function (value, unit) {
      return formatCurrency(value, unit);
    },
    cartTotalFormatted(cart) {
      if (!cart.products?.length) return "";
      const total = cart.products.reduce((t, p) => p.price * p.orderedQuantity + t, 0);
      return formatCurrency(total, cart.products[0].currency);
    },
    removeProduct: function (stallId, productId) {
      this.$emit("remove-from-cart", { stallId, productId });
    },
    removeCart: function (stallId) {
      this.$emit("remove-cart", stallId);
    },
    quantityChanged: function (product) {
      this.$emit("add-to-cart", product);
    },
    proceedToCheckout: function (cart) {
      this.$emit("checkout-cart", cart);
    },
  },
  created() {},
});
</script>
