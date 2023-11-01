<template>
  <div>
    <div id="product-focus-area"></div>
    <div v-if="productDetail && product" class="row">
      <div class="col-12 auto-width">
        <product-detail
          :product="product"
          @add-to-cart="addToCart"
        ></product-detail>
      </div>

      <div class="col-12 q-my-lg">
        <q-separator></q-separator>
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        v-for="(item, idx) in products"
        :key="idx"
      >
        <product-card
          :product="item"
          @change-page="changePageS"
          @add-to-cart="addToCart"
          :is-stall="true"
        ></product-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ProductCard from "./ProductCard.vue";
import ProductDetail from "./ProductDetail.vue";

export default defineComponent({
  name: "CustomerStall",
  components: { ProductCard, ProductDetail },
  props: ["stall", "products", "product-detail"],
  data: function () {
    return {};
  },
  computed: {
    product() {
      if (this.productDetail) {
        return this.products.find((p) => p.id == this.productDetail);
      }
      return undefined;
    },
  },
  methods: {
    changePageS(page, opts) {
      if (page === "stall" && opts?.product) {
        document.getElementById("product-focus-area")?.scrollIntoView();
      }
      this.$emit("change-page", page, opts);
    },
    addToCart(item) {
      this.$emit("add-to-cart", item);
    },
  },
});
</script>
