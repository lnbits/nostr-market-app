<template>
  <q-card>
    <q-card-section>
      <div class="row q-mt-md q-ml-md q-pr-md">
        <div class="col-md-3 col-sm-12 col-xs-12 q-pt-sm">
          <q-select
            :options="[...currencies].sort()"
            v-model="filterData.currency"
            filled
            hint="Only this Currency"
            label="Currency"
          ></q-select>
        </div>
        <div class="col-md-3 col-sm-12 col-xs-12 q-pt-sm q-pl-md">
          <q-input
            v-model="filterData.priceFrom"
            type="number"
            label="Price From"
            hint="Price Starting At"
          ></q-input>
        </div>
        <div class="col-md-3 col-sm-12 col-xs-12 q-pt-sm q-pl-lg">
          <q-input
            v-model="filterData.priceTo"
            type="number"
            label="Price To"
            hint="Maximum Price"
          ></q-input>
        </div>
        <div class="col-md-3 col-sm-12 col-xs-12">
          <q-btn
            @click="clearPrice()"
            flat
            color="grey"
            class="float-right q-mt-sm"
          >
            Clear</q-btn
          >
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row q-mt-md q-ml-md q-pr-md">
        <div class="col-9">
          <q-select
            :options="[...categories.map((c) => c.category).sort()]"
            v-model="filterData.categories"
            filled
            multiple
            use-chips
            stack-label
            hint="Any of these Categories"
            label="Categories"
          ></q-select>
        </div>
        <div class="col-3">
          <q-btn
            @click="clearCategories()"
            flat
            color="grey"
            class="float-right q-mt-sm"
          >
            Clear</q-btn
          >
        </div>
      </div>
      <div class="row q-mt-md q-ml-md q-pr-md">
        <div class="col-9">
          <q-select
            :options="merchantProfiles"
            v-model="filterData.merchants"
            filled
            multiple
            use-chips
            stack-label
            hint="Only these Merchant"
            label="Merchants"
          ></q-select>
        </div>
        <div class="col-3">
          <q-btn
            @click="clearMerchants()"
            flat
            color="grey"
            class="float-right q-mt-sm"
          >
            Clear</q-btn
          >
        </div>
      </div>
      <div class="row q-mt-md q-ml-md q-pr-md">
        <div class="col-9">
          <q-select
            :options="stalls.map((s) => ({ label: s.name, value: s.id }))"
            v-model="filterData.stalls"
            filled
            multiple
            use-chips
            stack-label
            hint="Only these Stalls"
            label="Stalls"
          ></q-select>
        </div>
        <div class="col-3">
          <q-btn
            @click="clearStalls()"
            flat
            color="grey"
            class="float-right q-mt-sm"
          >
            Clear</q-btn
          >
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn @click="clear()" flat color="grey"> Clear All Filters</q-btn>
      <q-btn
        @click="search()"
        flat
        icon="search"
        color="primary"
        class="q-mr-md"
      >
        Search
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductFilter",
  props: [
    "filter",
    "currencies",
    "categories",
    "merchants",
    "profiles",
    "stalls",
  ],

  data: function () {
    return {
      merchantProfiles: [],
      filterData: {
        currency: null,
        priceFrom: 0,
        priceTo: null,
        categories: [],
        merchants: [],
        stalls: [],
      },
    };
  },
  watch: {
    categories(n, o) {
      this.filterData.categories = (n || [])
        .filter((c) => c.selected)
        .map((c) => c.category);
    },
  },
  methods: {
    clear: function () {
      this.filterData = {
        currency: null,
        priceFrom: 0,
        priceTo: null,
        categories: [],
        merchants: [],
        stalls: [],
      };
      this.$emit("filter-update", this.filterData);
    },
    clearPrice() {
      this.filterData.currency = null;
      this.filterData.priceFrom = 0;
      this.filterData.priceTo = null;
    },
    clearMerchants() {
      this.filterData.merchants = [];
    },
    clearCategories() {
      this.filterData.categories = [];
    },
    clearStalls() {
      this.filterData.stalls = [];
    },
    search: function () {
      const filterData = {
        ...this.filterData,
        merchants: this.filterData.merchants.map((m) => m.value),
        stalls: this.filterData.stalls.map((s) => s.value),
      };
      this.$emit("filter-update", filterData);
    },
    mapMerchantProfile(m) {
      const merchantProfile = this.profiles.find((p) => p.pubkey === m);
      if (merchantProfile) {
        return {
          label:
            merchantProfile.name +
            ` (${m.substring(0, 10)}...${m.substring(m.length - 10)})`,
          value: m,
        };
      }
      return { label: m, value: m };
    },
  },
  created: async function () {
    this.filterData = {
      ...this.filterData,
      ...JSON.parse(JSON.stringify(this.filter || {})),
    };
    this.filterData.categories = [
      ...new Set(
        (this.filterData.categories || []).concat(
          (this.categories || [])
            .filter((c) => c.selected)
            .map((c) => c.category)
        )
      ),
    ];

    this.filterData.merchants = (this.filterData.merchants || []).map(
      this.mapMerchantProfile
    );
    this.filterData.stalls = (this.filterData.stalls || []).map((stallId) => {
      const s = this.stalls.find((s) => s.id === stallId) || {
        label: stallId,
        value: stallId,
      };
      return { label: s.name, value: s.id };
    });
    this.merchantProfiles = this.merchants.map(this.mapMerchantProfile);
  },
});
</script>
