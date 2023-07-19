<template>
  <q-page class="flex flex-center">
    <MarketConfig :merchants="merchants" :relays="relays" :config-ui="configUi" :read-notes="readNotes">
    </MarketConfig>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import MarketConfig from 'components/MarketConfig.vue'

export default defineComponent({
  name: 'MarketPage',
  components: {
    MarketConfig
  },
  data() {
    return {
      merchants: [], relays: [], configUi: { opts: null }, readNotes: null
    }
  }
})
</script>
