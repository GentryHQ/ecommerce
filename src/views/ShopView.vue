<template>
    <div class="container">
        <h1>Shop Page</h1>

        <SearchComp />


        <div class="loading" v-if="isLoading">Loading...</div>

        <div class="shop_container" v-else>
            <div class="filter">
                <FilterComp />
            </div>

            <div class="products_container">

                <div class="products">
                    <ProductCard v-for="product in productData.products" :key="product.title" :product="product" />
                </div>


                <div aria-label="page navigation" class="pagination">
                    <ul class="pagination_num">
                        <li v-for="(pageNumber, index) in pageNumbers" :key="index" class="pagination_item">
                            <router-link class="page_link" :class="{ 'active_page': pageNumber === currentPage }"
                                :to="{ name: 'shop', query: { page: pageNumber } }">
                                {{ pageNumber }}
                            </router-link>
                        </li>
                    </ul>

                    <div class="pagination_control">
                        <button @click="productData.nextPage"></button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script setup>
import ProductCard from "@/components/ProductCard.vue";
import FilterComp from "@/components/FilterComp.vue";
import SearchComp from "@/components/SearchComp.vue";
import { onMounted, ref, computed, watch } from "vue";
import { productsStore } from "@/stores/storeData.js";
import { useRoute } from "vue-router";

const productData = productsStore();
const isLoading = ref(true);
const route = useRoute();

// const currentPage = computed(() => productData.skip / productData.limit + 1);

const currentPage = computed(() => Number(route.query.page) || 1);

console.log(currentPage);

const pageNumbers = computed(() => {
    let pages = [];

    for (let i = 1; i <= productData.totalPages; i++) {
        pages.push(i);
    }
    return pages;
});

watch(() => route.query.page, (newPage) => {
    productData.fetchProductsFromDB(Number(newPage) || 1);
}, { immediate: true });

onMounted(async () => {
    const page = Number(route.query.page) || 1;
    await productData.fetchProductsFromDB(page);
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

.products_container {
    flex-basis: 80%;

}

.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
    justify-items: center;
}

.pagination {
    margin-block-start: 40px;

    &_num {
        display: flex;
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
    }

    &_item {
        // padding: 14px;
        color: black;

        a {
            display: block;
            color: black;
            padding: 16px 20px;
            border: 1px solid black;
            border-radius: 8px;

            &:hover {
                color: v.$white;
                background-color: v.$blue;
            }
        }
    }

    .page_link.active_page {
        color: #fff;
        background-color: v.$red;
        border: 1px solid black;
    }
}
</style>