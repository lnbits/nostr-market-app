<template>
  <q-card class="card--product">
    <q-img
      :src="
        product.images && product.images.length > 0 && product.images[0]
          ? product.images[0]
          : $q.config.staticPath + '/images/placeholder.png'
      "
      alt="Product Image"
      loading="lazy"
      spinner-color="white"
      fit="contain"
      height="300px"
    ></q-img>

    <q-card-section class="q-pb-xs q-pt-md">
      <q-btn
        round
        :disabled="product.quantity < 1"
        color="primary"
        rounded
        icon="shopping_cart"
        size="lg"
        style="
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(-50%, -50%);
        "
        @click="$emit('add-to-cart', product)"
        ><q-tooltip> Add to cart </q-tooltip></q-btn
      >
      <div class="row no-wrap items-center">
        <div class="col text-subtitle2 ellipsis-2-lines">
          {{ product.name }}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-py-sm">
      <div>
        <span v-if="product.currency == 'sat'">
          <span class="text-h6">{{ product.price }} sats</span
          ><q-tooltip> BTC {{ (product.price / 1e8).toFixed(8) }}</q-tooltip>
        </span>
        <span v-else>
          <span class="text-h6">{{ product.formatedPrice }}</span>
        </span>
        <span
          class="q-ml-md text-caption text-green-8 text-weight-bolder q-mt-md"
          >{{ product.quantity }} left</span
        >
      </div>
      <div v-if="product.categories" class="text-subtitle1">
        <q-virtual-scroll
          :items="product.categories || []"
          virtual-scroll-horizontal
        >
          <template v-slot="{ item, index }">
            <q-chip :key="index" dense><span v-text="item"></span></q-chip>
          </template>
        </q-virtual-scroll>
      </div>
      <div v-else class="text-subtitle1">&nbsp;</div>

      <div
        class="text-caption text-grey ellipsis-2-lines"
        style="min-height: 40px"
      >
        <p v-if="product.description">{{ product.description }}</p>
      </div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-actions>
      <div class="text-caption text-weight-bolder">{{ product.stallName }}</div>
    </q-card-actions>

    <q-separator></q-separator>

    <q-card-actions>
      <div class="q-ml-auto">
        <q-btn
          v-if="!isStall"
          flat
          class="text-weight-bold text-capitalize q-ml-auto float-left"
          dense
          color="primary"
          @click="$emit('change-page', 'stall', { stall: product.stall_id })"
        >
          Visit Stall
        </q-btn>
        <q-btn
          flat
          class="text-weight-bold text-capitalize q-ml-auto"
          dense
          color="primary"
          @click="
            $emit('change-page', 'stall', {
              stall: product.stall_id,
              product: product.id,
            })
          "
        >
          View details
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductCard",
  props: ["product", "is-stall"],
  data: function () {
    return {};
  },
  methods: {},
  created() {},
});
</script>
