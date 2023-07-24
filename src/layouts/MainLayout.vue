<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row q-mb-sm q-mt-md">
      <div class="col-lg-2 col-md-1 col-sm-0"></div>
      <div class="col-lg-8 col-md-10 col-sm-12 auto-width q-ml-md q-mr-md">
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
      <div class="col-lg-2 col-md-1 col-sm-0"></div>
    </div>


  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'MainLayout',



  setup() {

    return {
    }
  }
})
</script>
