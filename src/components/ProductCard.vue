<template>

    <div class="product_card">
        <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
            <div class="product_card-img">
                <img :src="product.thumbnail">
            </div>

            <div class="product_card-details">
                <p class="category">{{ product.category }}</p>
                <h3>{{ product.title }}</h3>
                <div class="price">
                    <p>${{ product.price }}</p>
                </div>
            </div>
        </router-link>
        <button @click.stop="addProductToCart">Add to Cart</button>
    </div>

</template>

<script>
import { productsStore } from "@/stores/storeData.js";
import { useToast } from "vue-toastification";


export default {
    props: {
        product: Object,
    },

    setup(props) {
        const productData = productsStore();
        const toast = useToast();

        const addProductToCart = () => {
            const quantity = 1;
            productData.addToCart({ ...props.product, quantity });
            toast.success(props.product.title + " successfully add to cart")
        };

        return {
            addProductToCart,
        };
    }
};
</script>


<style lang="scss" scoped>
@use '../assets/css/variables' as v;
$border: 8px;

.product_card {
    cursor: pointer;
    // border: 2px solid lighten($color: v.$red, $amount: 20%);
    border-radius: $border;
    overflow: hidden;
    // padding: 1.25rem;

    a:visited, a:active, a {
        color: #000;
    }

    &-img {
        padding-block-end: 1.25rem;

        img {
            aspect-ratio: 1/1;
            object-fit: cover;
            border-radius: $border;
        }
    }

    &-details {
        padding-block-start: 0.5rem;

        .category {
            font-weight: v.$fw-300;
            font-size: 0.875rem;
            color: v.$blue;
            margin-block-end: 0.5rem;
            text-transform: uppercase;
        }

        h3 {
            font: {
                size: 20px;
                weight: v.$fw-500;
            }

            ;
            text-transform: capitalize;
            margin-block-end: 0.5rem;
        }

        .price p {
            font-weight: v.$fw-700;
            font-size: 16px;
            margin-block-end: 0.5rem;
        }
    }

    button {
        background-color: v.$red;
        color: v.$white;
        width: 100%;
        padding-block: 1rem;
        border-radius: 0.25rem;
        font-size: 1rem;

        &:hover {
            background-color: v.$blue;
        }
    }
}
</style>