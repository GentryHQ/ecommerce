<template>
    <div class="container">
        <h1>Product Details</h1>


        <div class="product_details" v-if="selectedProduct">
            <div class="product_images">
                <div class="main_image">
                    <img class="main_img" :src="selectedProduct.thumbnail">

                    <div class="sliderBtn">
                        <button><img src="../assets/images/icon-previous.svg"></button>
                        <button><img src="../assets/images/icon-next.svg"></button>
                    </div>
                </div>


                <div class="thumbnails">
                    <div class="thumbnail" v-for="(image, index) in selectedProduct.images" :key="index">
                        <img :src="image" :alt="selectedProduct.title" @click="setCurrentImage(image)">
                    </div>
                </div>
            </div>

            <div class="product_text">
                <p class="category">{{ selectedProduct.category }}</p>
                <h3>{{ selectedProduct.title }}</h3>
                <p class="desc">{{ selectedProduct.description }}</p>
                <div class="prices">
                    <p class="price_original">$ {{ selectedProduct.price }}</p>
                    <p class="price_discount">{{ selectedProduct.discountPercentage }}%</p>
                </div>
            </div>
        </div>

        <div class="loading" v-else>Loading</div>

    </div>
</template>

<style lang="scss" scoped>
@use '../assets/css/variables' as v;
.product_details {
    margin-block: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;

    @media screen and (min-width: 768px) {
        flex-direction: row;
    }
    
}

.main_image {
    position: relative;

    .main_img {
        border-radius: 0.5rem;
        border: 1px solid whitesmoke;
        padding: 4px;
    }

    .sliderBtn {
        position: absolute;
        display: flex;
        width: 100%;
        justify-content: space-between;
        top: 50%;
        translate: 0% -50%;

        button {
            background-color: v.$white;
            padding: 14px 16px;
            margin-inline: 10px;
            border-radius: 1500vw;
        }
    }
}

.product_images {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 1rem;

    .thumbnails {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
        // grid-template-columns: repeat(4, 1fr);
        gap: 8px;
       

        .thumbnail {
            border: 1px solid whitesmoke;
            border-radius: 0.25rem;
            overflow: hidden;
            padding: 0.25rem;
            // width: 68px;
            // height: 68px;

            img {
                aspect-ratio: 1/1;
                object-fit: cover;
                border-radius: inherit;
            }
        }
    }

    @media screen and (min-width: 550px) {
        flex-direction: row-reverse;

        .thumbnails {
            grid-template-columns: repeat(1, 1fr);

            .thumbnail {
                width: 80px;
                height: 80px;
            }
        }
    }
}

.product_text {
    flex-basis: 50%;

    .category {
        text-transform: uppercase;
        color: v.$blue;
        font-weight: v.$fw-400;
    }

    h3 {
        font-size: 2.1875rem;
        font-weight: v.$fw-600;
        margin-block: 0.625rem;
    }

    .desc {
        font-weight: v.$fw-500;
    }

    .prices {
        display: flex;
    }
}
</style>

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