<template>
  <q-card>
    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        User Chat
      </div>
    </div>

  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserChat',
  props: ['user',],

  data: function () {
    return {
    }
  },
  methods: {

  },
  created: async function () {

  }
})
</script>
