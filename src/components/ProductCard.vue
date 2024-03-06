<template>
    <div class="product_card" @click="goToProductDetails(product.id)">
        <div class="product_card-img">
            <img :src="product.thumbnail" >
        </div>
        <hr>
        <div class="product_card-details">
            <p class="category">{{ product.category }}</p>
            <h3>{{ product.title }}</h3>
            <div class="price">
                <p>$ {{ product.price }}</p>
            </div>
        </div>
        <button @click.stop="addProductToCart">Add to Cart</button>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { productsStore } from "@/stores/storeData.js";


export default {
    props: {
        product: Object,
    },

    setup() {
        const router = useRouter();
        const productData = productsStore();


        const goToProductDetails = (productId) => {
            router.push({name: 'ProductDetails', params: {id: productId} })
        };

        

        const addProductToCart = () => {
            productData.addToCart()
        };

        return {
            goToProductDetails,
            addProductToCart
        };
    }
};
</script>


<style lang="scss" scoped>
@use '../assets/css/variables' as v;

.product_card {
    cursor: pointer;
    border: 2px solid lighten($color: v.$red, $amount: 20%);
    border-radius: 1rem;
    overflow: hidden;
    padding: 1.25rem;

    &-img {
        padding-block-end: 1.25rem;

        img {
            // aspect-ratio: 1/1;
            // object-fit: cover;
            border-radius: 1rem;
        }
    }

    &-details {
        padding-block-start: 1.25rem;

        .category {
            font-weight: v.$fw-300;
            font-size: 0.875rem;
            background-color: v.$blue;
            display: inline-block;
            color: v.$white;
            padding: 0.5rem;
            border-radius: 0.25rem;
            margin-block-end: 1.25rem;
        }

        h3 {
            font: {
                size: 24px;
                weight: v.$fw-500;
            };
            margin-block-end: 0.5rem;
        }

        .price p{
            font-weight: v.$fw-700;
            font-size: 18px;
            margin-block-end: 0.5rem;
        }
    }

    button {
        background-color: v.$red;
        color: v.$white;
        width: 100%;
        padding-block: 20px;
        border-radius: 0.25rem;
        font-size: 1rem;

        &:hover {
            background-color: v.$blue;
        }
    }
}
</style>