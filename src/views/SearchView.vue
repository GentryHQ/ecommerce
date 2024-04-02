<template>
    <div class="container">
        <h1>Search Results</h1>

        <!-- Show a loading message or spinner when isLoading is true -->
        <div v-if="isLoading">
            <p>Loading...</p>
        </div>

        <!-- Adjusted to only show results or "no results" when not loading -->
        <div v-else>
            <div v-if="SearchResult.length">
                <p>Displaying results for "{{ searchQuery }}" </p>

                <div class="products">
                    <ProductCard v-for="item in productData.searchResult" :key="item.id" :product="item" />
                </div>
            </div>

            <div v-else>
                <p>No results found for "{{ searchQuery }}"</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import ProductCard from "@/components/ProductCard.vue";
import { productsStore } from '@/stores/storeData';
import { onMounted, ref } from 'vue';

const productData = productsStore();
const SearchResult = ref([]);
const isLoading = ref(false);

const props = defineProps({
    searchQuery: String
});

onMounted(async () => {
    if (props.searchQuery) {
        isLoading.value = true;
        await productData.searchProducts(props.searchQuery);
        SearchResult.value = productData.searchResult;
        isLoading.value = false;
    }
});
</script>

<style lang="scss" scoped>
.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
    margin-block: 80px;
}
</style>