<template>
    <div class="filter">
        <h3>Filters</h3>

        <div class="filter_category">
            <h4>Categories</h4>
            <div v-for="(product, index) in productData.products" :key="index">
                {{(product.category) }}
            </div>
            
        </div>
        
        <div class="filter_price">
            <h4>Filter by Price</h4>
            <div class="range_input">
                <div class="max">
                    <p>Max</p>
                    <input type="text" name="max">
                </div>
                <div class="divider">
                    -
                </div>
                <div class="max">
                    <p>Min</p>
                    <input type="text" name="min">
                </div>
            </div>
            <div class="range_slider">
                <input type="range" name="priceRange" id="">
            </div>
        </div>

        <div class="filter_rating">
            <h4>Filter by Rating</h4>
        </div>
    </div>
</template>

<script setup>
import { productsStore } from "@/stores/storeData.js";

const productData = productsStore();
</script>

<style lang="scss" scoped>

</style>