<template>
  <div class="row">
    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 q-mt-sm">
      <div class="q-pr-md" v-if="product.images && product.images[0]">
        <q-carousel
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          navigation-icon="radio_button_unchecked"
          control-type="regular"
          control-color="secondary"
          control-text-color="white"
        >
          <q-carousel-slide
            v-for="(img, i) in product.images"
            :name="i + 1"
            :key="i"
            :img-src="img"
          ></q-carousel-slide>
        </q-carousel>
      </div>
      <div v-else class="q-pr-md">
        <q-img
          :src="$q.config.staticPath + '/images/placeholder.png'"
          :ratio="16 / 9"
        ></q-img>
      </div>
    </div>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 q-mt-sm">
      <q-card>
        <q-card-section>
          <div class="row">
            <div
              class="col-12"
              :class="$q.platform.is.desktop ? '' : 'q-px-md'"
            >
              <div class="text-subtitle1 q-mt-sm q-pt-xs">
                {{ product.name }}
              </div>
              <div v-if="product.categories" class="text-subtitle1">
                <q-chip v-for="(cat, i) in product.categories" :key="i" dense>{{
                  cat
                }}</q-chip>
              </div>
              <div class="q-mt-sm text-weight-bold">
                {{ product.description }}
              </div>
              <div>
                <span v-if="product.currency == 'sat'">
                  <span class="text-h6">{{ product.price }} sats</span
                  ><span class="q-ml-sm text-grey-6"
                    >BTC {{ (product.price / 1e8).toFixed(8) }}</span
                  >
                </span>
                <span v-else>
                  <span class="text-h6">{{ product.formatedPrice }}</span>
                </span>
                <span
                  class="q-ml-md text-caption text-green-8 text-weight-bolder q-mt-md"
                  >{{
                    product.quantity > 0
                      ? `In
                  stock. ${product.quantity} left.`
                      : "Out of stock."
                  }}</span
                >
              </div>
              <div class="q-mt-md">
                <q-btn
                  class="q-mt-md"
                  color="primary"
                  rounded
                  icon="shopping_cart"
                  label="Add to cart"
                  @click="$emit('add-to-cart', product)"
                />
                <!-- <q-btn
                class="q-mt-md q-ml-md"
                color="primary"
                icon="share"
                label="Share"
              /> -->
              </div>
            </div>
            <!-- RATING TO BE DONE -->
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductDetail",
  props: ["product", "add-to-cart"],
  data: function () {
    return {
      slide: 1,
    };
  },
  computed: {},
  methods: {},
  created() {},
});
</script>
