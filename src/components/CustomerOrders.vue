<template>
  <div>
    <q-card v-if="!merchantOrders?.length" bordered class="q-mb-md">
      <q-card-section>
        <strong>No Orders</strong>
      </q-card-section>
    </q-card>
    <div v-for="merchant in merchantOrders" :key="merchant.id">
      <q-card bordered class="q-mb-md">
        <q-item>
          <user-profile
            :pubkey="merchant.pubkey"
            :profiles="profiles"
          ></user-profile>
        </q-item>

        <q-separator />

        <q-card-section class="col-12">
          <q-list>
            <div
              v-for="order in merchant.orders"
              :key="order.id"
              class="q-mb-md"
            >
              <q-expansion-item dense expand-separator>
                <template v-slot:header>
                  <q-item-section class="q-mt-sm">
                    <q-item-label
                      ><strong> <span v-text="order.stallName"></span> </strong>
                      <q-badge
                        @click="showInvoice(order)"
                        v-if="order.invoice?.human_readable_part?.amount"
                        color="orange"
                        class="q-ml-lg gt-sm"
                      >
                        <span
                          v-text="
                            formatCurrency(
                              order.invoice?.human_readable_part?.amount / 1000,
                              'sat'
                            )
                          "
                        ></span> </q-badge
                    ></q-item-label>

                    <q-item-label>
                      <div class="text-caption text-grey ellipsis-2-lines">
                        <p v-if="order.createdAt">
                          <span v-text="fromNow(order.createdAt)"></span>
                        </p>
                      </div>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label>
                      <q-badge :color="order.paid ? 'green' : 'grey'"
                        ><span v-text="order.paid ? 'Paid' : 'Not Paid'"></span
                      ></q-badge>
                      <q-badge
                        :color="order.shipped ? 'green' : 'grey'"
                        class="q-ml-md"
                        ><span
                          v-text="order.shipped ? 'Shipped' : 'Not Shipped'"
                        ></span
                      ></q-badge>
                    </q-item-label>
                    <q-item-label>
                      <div class="text-caption text-grey ellipsis-2-lines">
                        <p>
                          <span v-text="order.items?.length"></span>
                          <span
                            v-text="
                              order.items?.length === 1 ? 'product' : 'products'
                            "
                          ></span>
                        </p>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </template>
                <q-separator></q-separator>
                <q-card-section class="col-12">
                  <q-item-section>
                    <q-item-label>
                      <strong>Order ID: </strong>
                      <span
                        class="ellipsis-2-lines text-wrap"
                        v-text="order.id"
                      ></span>
                    </q-item-label>
                  </q-item-section>
                </q-card-section>
                <q-separator></q-separator>
                <q-card-section horizontal>
                  <q-card-section class="col-7">
                    <q-item-section class="q-mt-sm">
                      <q-item-label> <strong>Products</strong></q-item-label>
                    </q-item-section>

                    <q-item v-for="product in order.products" :key="product.id">
                      <q-item-section avatar>
                        <q-avatar>
                          <img
                            v-if="
                              (product.images && product.images[0]) ||
                              product.image
                            "
                            :src="product.images[0] || product.image"
                          />
                          <img
                            v-else
                            :src="
                              $q.config.staticPath + '/images/placeholder.png'
                            "
                          />
                        </q-avatar>
                      </q-item-section>
                      <q-item-section class="q-mt-sm">
                        <q-item-label></q-item-label>
                        <q-item-label>
                          <strong
                            >{{ product.orderedQuantity }} x {{ product.name }}
                          </strong></q-item-label
                        >
                        <q-item-label>
                          <div class="text-caption text-grey ellipsis-2-lines">
                            <p>{{ product.description }}</p>
                          </div>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section>
                    <q-item-section class="q-mt-md q-ml-sm">
                      <q-item-label>
                        <strong>Shipping Zone: </strong>
                        <span v-text="order.shippingZone?.name || ''"></span>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section
                      v-if="order.message"
                      class="q-mt-md q-ml-sm"
                    >
                      <q-item-label>
                        <strong>Message: </strong>
                        <span v-text="order.message"></span>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section class="q-mt-md q-ml-sm">
                      <q-item-label>
                        <strong>Invoice: </strong>
                        <q-badge
                          @click="showInvoice(order)"
                          v-if="order.invoice?.human_readable_part?.amount"
                          color="orange"
                          class="cursor-pointer"
                        >
                          <span
                            v-text="
                              formatCurrency(
                                order.invoice?.human_readable_part?.amount /
                                  1000,
                                'sat'
                              )
                            "
                          ></span>
                        </q-badge>
                        <!-- <q-badge v-if="!order.paid">Request Invoice Again</q-badge> -->
                      </q-item-label>
                    </q-item-section>
                  </q-card-section>
                </q-card-section>

                <q-separator class="q-mb-xl"></q-separator>
              </q-expansion-item>
              <q-separator></q-separator>
            </div>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import moment from "moment";
import UserProfile from "./UserProfile.vue";

export default defineComponent({
  name: "CustomerOrders",
  props: ["orders", "products", "stalls", "profiles"],
  components: { UserProfile },
  data: function () {
    return {};
  },
  computed: {
    merchantOrders: function () {
      return Object.keys(this.orders).map((pubkey) => ({
        pubkey,
        orders: this.orders[pubkey].map(this.enrichOrder),
      }));
    },
  },
  methods: {
    enrichOrder: function (order) {
      const stall = this.stallForOrder(order);
      return {
        ...order,
        stallName: stall?.name || "Stall",
        shippingZone: stall?.shipping?.find(
          (s) => s.id === order.shipping_id
        ) || { id: order.shipping_id, name: order.shipping_id },
        invoice: this.invoiceForOrder(order),
        products: this.getProductsForOrder(order),
      };
    },
    stallForOrder: function (order) {
      try {
        const productId = order.items && order.items[0]?.product_id;
        if (!productId) return;
        const product = this.products.find((p) => p.id === productId);
        if (!product) return;
        const stall = this.stalls.find((s) => s.id === product.stall_id);
        if (!stall) return;
        return stall;
      } catch (error) {
        console.log(error);
      }
    },
    invoiceForOrder: function (order) {
      try {
        const lnPaymentOption = order?.payment_options?.find(
          (p) => p.type === "ln"
        );
        if (!lnPaymentOption?.link) return;
        return decode(lnPaymentOption.link);
      } catch (error) {
        console.warn(error);
      }
    },

    getProductsForOrder: function (order) {
      if (!order?.items?.length) return [];

      return order.items.map((i) => {
        const product = this.products.find((p) => p.id === i.product_id) || {
          id: i.product_id,
          name: i.product_id,
        };
        return {
          ...product,
          orderedQuantity: i.quantity,
        };
      });
    },

    showInvoice: function (order) {
      if (order.paid) return;
      const invoice = order?.payment_options?.find((p) => p.type === "ln").link;
      if (!invoice) return;
      this.$emit("show-invoice", invoice);
    },

    formatCurrency: function (value, unit) {
      return formatCurrency(value, unit);
    },

    fromNow: function (date) {
      if (!date) return "";
      return moment(date * 1000).fromNow();
    },
  },
  created() {},
});
</script>
