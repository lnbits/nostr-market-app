<template>
  <div :class="[{ 'mobile-fixed-bottom': isMobile, 'q-gutter-xs': isMobile, 'bg-dark' : isMobile && $q.dark.isActive }]">
    <div v-if="isMobile" class="row justify-around">
      <q-btn
        v-for="(button, index) in buttons"
        :key="index"
        :color="button.color"
        :icon="button.icon"
        flat
        size="lg"
        @click="navigateTo(button.route)"
      >
        <q-tooltip>{{ button.tooltip }}</q-tooltip>
        <q-badge v-if="button.badgeCount" color="secondary" floating>
          <span v-text="button.badgeCount"></span>
        </q-badge>
      </q-btn>
    </div>
    <div v-else>
      <q-btn
        v-for="(button, index) in buttons"
        :key="index"
        :color="button.color"
        :icon="button.icon"
        flat
        size="lg"
        @click="navigateTo(button.route)"
      >
        <q-tooltip>{{ button.tooltip }}</q-tooltip>
        <q-badge v-if="button.badgeCount" color="secondary" floating>
          <span v-text="button.badgeCount"></span>
        </q-badge>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useMarket } from "../composables/useMarket.js";

const props = defineProps({
  filterCount: Number,
  allCartsItemCount: Number,
  account: Object,
});

const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.md);

const { navigateTo } = useMarket()

const buttons = [
  {
    color: 'gray',
    icon: 'travel_explore',
    route: 'product-filter',
    tooltip: 'Search for products on Nostr',
    badgeCount: props.filterCount,
  },
  {
    color: 'gray',
    icon: props.account ? 'perm_identity' : 'person_add',
    route: 'user-config',
    tooltip: 'User Config',
  },
  {
    color: 'gray',
    icon: 'chat',
    route: 'user-chat',
    tooltip: 'Chat',
  },
  {
    color: 'gray',
    icon: 'receipt_long',
    route: 'customer-orders',
    tooltip: 'Orders',
  },
  {
    color: 'gray',
    icon: 'shopping_cart',
    route: 'shopping-cart-list',
    tooltip: 'Shopping Cart',
    badgeCount: props.allCartsItemCount,
  },
];
</script>

<style scoped>
</style>
