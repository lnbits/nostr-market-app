<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer show-if-above side="left">
      <!-- drawer content -->
    </q-drawer>

    <q-drawer show-if-above side="right">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    return {};
  },
});
</script>
