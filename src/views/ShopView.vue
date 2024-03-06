<template>
    <div class="container">
        <h1>Shop Page</h1>

        <div class="loading" v-if="isLoading">Loading...</div>

        <div v-else class="products">
            <ProductCard
            v-for="product in productData.products"
            :key="product.title"
            :product="product"
            />
        </div>
        
    </div>
</template>


<script setup>
import ProductCard from "@/components/ProductCard.vue";
import { onMounted, ref} from "vue";
import { productsStore } from "@/stores/storeData.js";

const productData = productsStore();

const isLoading = ref(true);

onMounted(async () => {
   await productData.fetchProductsFromDB();
   isLoading.value = false;
})
</script>

<style lang="scss" scoped>
@use '../assets/css/variables' as v;

.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
}
</style>