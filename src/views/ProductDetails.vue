<template>
    <div class="container">
        <h1>Product Details</h1>


        <div class="product_details" v-if="selectedProduct">
            <div class="product_images">
                <div class="main_image">
                    <img :src="selectedProduct.thumbnail">
                </div>

                <div class="sliderBtn">
                    <button>Next</button>
                    <button>Prev</button>
                </div>

                <div class="thumbnails">
                    <div class="thumbnail"
                    v-for="(image, index) in selectedProduct.images" 
                    :key="index"
                    >
                        <img :src="image" :alt="selectedProduct.title"
                        @click="setCurrentImage(image)"
                        >
                    </div>
                </div>
            </div>

            <div class="product_text">
                <p class="category">{{ selectedProduct.category }}</p>
                <h3>{{ selectedProduct.title }}</h3>
                <p class="desc">{{ selectedProduct.description }}</p>
                <div class="price">
                    <p class="price_original">$ {{ selectedProduct.price }}</p>
                    <p class="price_discount">{{ selectedProduct.discountPercentage }}%</p>
                </div>
            </div>
        </div>

        <div class="loading" v-else>Loading</div>

    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { productsStore } from "@/stores/storeData.js";

const productData = productsStore();
const route = useRoute();
const selectedProduct = ref(null);



onMounted(async () => {
    if (!productData.products.length) {
        await productData.fetchProductsFromDB();
    }
    selectedProduct.value = productData.products.find(
    (item) => item.id === Number(route.params.id)
  );
})
</script>



<style lang="scss" scoped>
.product_details {
    display: flex;
}
</style>