<template>
  <div v-if="showStalls" class="row q-col-gutter-md">
    <div
      v-for="stall of stalls"
      :key="stall.id"
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
    >
      <q-card class="card--product">
        <q-card-section class="q-pb-xs q-pt-md">
          <div class="q-pa-md q-gutter-sm" style="height: 80px">
            <q-avatar
              v-for="(image, i) of stall.images"
              :key="i"
              size="40px"
              class="overlapping"
              :style="`left: ${
                i * 25
              }px; border: 2px solid white; position: absolute`"
            >
              <img :src="image" />
            </q-avatar>
          </div>
        </q-card-section>

        <q-card-section class="q-pb-xs q-pt-md">
          <div class="row no-wrap items-center">
            <div class="col text-subtitle2 ellipsis-2-lines">
              {{ stall.name }}
            </div>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-section class="q-pl-sm">
          <div>
            <span class="text-caption text-green-8 text-weight-bolder q-mt-md"
              ><span v-text="stall.productCount"></span> products</span
            >
            <span v-text="stall.currency" class="float-right"></span>
          </div>
        </q-card-section>

        <q-card-section class="q-pl-sm gt-sm">
          <div v-if="stall.categories" class="text-subtitle1">
            <q-virtual-scroll
              :items="stall.categories || []"
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
            <p>{{ stall.description || "" }}</p>
          </div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions>
          <div class="q-ml-auto">
            <q-btn
              flat
              class="text-weight-bold text-capitalize q-ml-auto float-left"
              dense
              color="primary"
              @click="$emit('change-page', 'stall', { stall: stall.id })"
            >
              Visit Stall
            </q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomerStallList",
  props: ["stalls"],
  data: function () {
    return {
      showStalls: true,
    };
  },
  watch: {
    stalls() {
      this.showProducts = false;
      setTimeout(() => {
        this.showProducts = true;
      }, 0);
    },
  },
  computed: {},
  methods: {},
  created() {},
});
</script>
