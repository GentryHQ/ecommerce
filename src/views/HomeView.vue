<template>
  <HeroComp />
  <div class="container">

    <div class="fProducts">
      <h2>Check Out Female Clothes</h2>
      <div class="loading" v-if="isLoading">Loading...</div>

      <div v-else class="products">
        <ProductCard v-for="product in productData.products" :key="product.title" :product="product" />
      </div>
    </div>

    <div class="mProducts">
      <h2>Check Out Male Clothes</h2>
      <div class="loading" v-if="isLoading">Loading...</div>

      <div v-else class="products">
        <ProductCard v-for="product in productData.products" :key="product.title" :product="product" />
      </div>
    </div>
  </div>
</template>


<script setup>
import ProductCard from "../components/ProductCard.vue";
import HeroComp from "../components/HeroComp.vue";

import { onMounted, ref } from "vue";
import { productsStore } from "@/stores/storeData.js";

const productData = productsStore();

const isLoading = ref(true);

onMounted(async () => {
  await productData.fetchProductsByCatFromDB('womens-dresses');
  await productData.fetchProductsByCatFromDB('mens-shirts');
  isLoading.value = false;
})
</script>



<style lang="scss" scoped>
@use '../assets/css/variables' as v;

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-block: 80px;
}

.latestProducts {
  margin-block: 80px;

  h2 {
    text-align: center;
    font-weight: v.$fw-600;
    font-size: 40px;
  }
}
</style>
