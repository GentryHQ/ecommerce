<template>
    <div class="container">
        <h1>Shop Page</h1>

        <SearchComp/>


        <div class="loading" v-if="isLoading">Loading...</div>

        <div class="shop_container" v-else>
            <div class="filter">
                <FilterComp/>
            </div>

            <div class="products">
                <ProductCard v-for="product in productData.products" :key="product.title" :product="product" />
            </div>
        </div>

    </div>
</template>


<script setup>
import ProductCard from "@/components/ProductCard.vue";
import FilterComp from "@/components/FilterComp.vue";
import SearchComp from "@/components/SearchComp.vue";
import { onMounted, ref } from "vue";
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

.shop_container {
    margin-block: 80px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.products {
    flex-basis: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
}
</style>