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
                <div class="price">
                    <p class="price_discount">${{ (selectedProduct.price - (selectedProduct.price *
            selectedProduct.discountPercentage / 100)).toFixed(2) }}</p>
                    <p class="price_DiscountPercent">- {{ selectedProduct.discountPercentage }}%</p>
                    <p class="price_original">${{ selectedProduct.price }}</p>
                </div>
                <div class="cart">
                    <div class="cart_qty">
                        <button @click="increaseQty">
                            +
                        </button>
                        <form>
                            <input type="number" name="Qty" v-model="quantity" min="1">
                        </form>
                        <button @click="decreaseQty">
                            -
                        </button>
                    </div>
                    <button @click="addProductToCart" class="cart_btn">
                        <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                                fill="#fff" fill-rule="nonzero" />
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>

        <div class="loading" v-else>Loading</div>

    </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { productsStore } from "@/stores/storeData.js";

const productData = productsStore();
const route = useRoute();
const selectedProduct = ref(null);
const quantity = ref(1);

const toast = useToast();

const increaseQty = () => {
    quantity.value++
}

const decreaseQty = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

onMounted(async () => {
    if (!productData.products.length) {
        await productData.fetchProductsFromDB();
    }
    selectedProduct.value = productData.products.find(
        (item) => item.id === Number(route.params.id)
    );
})

const addProductToCart = () => {
    productData.addToCart({ ...selectedProduct.value, quantity: quantity.value });

    toast.success(selectedProduct.value.title + " successfully added to cart");
};
</script>

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
        text-transform: capitalize;
    }

    .desc {
        font-weight: v.$fw-500;
    }

    .price {
        margin-block: 20px;
        display: flex;
        gap: 20px;
        align-items: center;

        &_discount {
            font: {
                weight: v.$fw-600;
                size: 24px;
            }
        }

        &_original {
            font: {
                weight: v.$fw-400;
                size: 18px;
            }

            text-decoration: line-through;
        }

        &_DiscountPercent {
            background-color: lighten($color: v.$red, $amount: 0);
            padding: 8px;
            border-radius: 0.25rem;
            color: v.$white;
            font-weight: v.$fw-600;
        }

    }

    .cart {
        margin-block-start: 2.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.875rem;

        @media screen and (min-width: 1050px) {
            flex-direction: row;
        }

        &_qty {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            background-color: v.$lightWhite;
            border-radius: 0.5rem;
            padding-block: 0.5rem;

            button {
                padding-inline: 18px;
                font-size: 38px;
            }

            input {
                width: 70px;
                padding-block: 10px;
                border: none;
                outline: none;
                background-color: #F0F0F0;
                text-align: center;
                font-size: 15px;
                font-weight: v.$fw-600;
            }
        }

        &_btn {
            background-color: v.$red;
            color: v.$white;
            font-weight: v.$fw-600;
            font-size: 0.9375rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1.125rem 2.375rem;
            border-radius: 0.5rem;

            svg {
                fill: white;
            }
        }
    }
}
</style>