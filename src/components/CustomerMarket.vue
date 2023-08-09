<template>
  <div>
    <q-infinite-scroll v-if="showProducts" @load="onLoad" :offset="250">
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(item, idx) in partialProducts" :key="idx">
          <product-card :product="item" @change-page="changePageM" @add-to-cart="addToCart"></product-card>
        </div>
      </div>
      <template v-if="lastProductIndex < filteredProducts.length" v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ProductCard from './ProductCard.vue'

export default defineComponent({
  name: 'CustomerMarket',
  components: { ProductCard },
  props: ['filtered-products', 'search-text', 'filter-categories'],
  data: function () {
    return {
      search: null,
      partialProducts: [],
      productsPerPage: 12,
      startIndex: 0,
      lastProductIndex: 0,
      showProducts: true,
    }
  },
  watch: {
    searchText: function () {
      this.refreshProducts()
    },
    filteredProducts: function () {
      this.refreshProducts()
    },
    filterCategories: function () {
      this.refreshProducts()
    }
  },
  methods: {
    refreshProducts: function () {
      this.showProducts = false
      this.partialProducts = []

      this.startIndex = 0
      this.lastProductIndex = Math.min(this.filteredProducts.length, this.productsPerPage)
      this.partialProducts.push(...this.filteredProducts.slice(0, this.lastProductIndex))

      setTimeout(() => { this.showProducts = true }, 0)
    },

    addToCart(item) {
      this.$emit('add-to-cart', item)
    },
    changePageM(page, opts) {
      this.$emit('change-page', page, opts)
    },

    onLoad(_, done) {
      setTimeout(() => {
        if (this.startIndex >= this.filteredProducts.length) {
          done()
          return
        }
        this.startIndex = this.lastProductIndex
        this.lastProductIndex = Math.min(this.filteredProducts.length, this.lastProductIndex + this.productsPerPage)
        this.partialProducts.push(...this.filteredProducts.slice(this.startIndex, this.lastProductIndex))
        done()
      }, 100)
    }
  },
  created() {
    this.lastProductIndex = Math.min(this.filteredProducts.length, 24)
    this.partialProducts.push(...this.filteredProducts.slice(0, this.lastProductIndex))
  }

})
</script>
