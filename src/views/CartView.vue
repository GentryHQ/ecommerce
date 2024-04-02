<template>
    <div class="cart">
        <div class="container">
            <h1>Cart Page</h1>

            <div class="empty" v-if="!productData.cart.length">
                <p>Cart is Empty</p>
            </div>

            <div class="cart_container" v-else>
                <div class="cart_content">
                    <div class="cart_header">
                        <h5>Product</h5>
                        <h5>Price</h5>
                        <h5>Quantity</h5>
                        <h5>Subtotal</h5>
                    </div>

                    <div class="cart_product" v-for="(item, index) in productData.cart" :key="index">
                        <img :src="item.thumbnail" :alt="item.title">
                        <h4 class="title">{{ item.title }}</h4>
                        <p class="price" data-title="Price:">${{ item.price }}</p>
                        <div class="forData" data-title="Quantity:">
                            <div class="cart_qty" >
                                <button @click="increaseQty(item)">
                                    +
                                </button>
                                <form>
                                    <input type="number" name="Qty" v-model="item.quantity" min="1">
                                </form>
                                <button @click="decreaseQty(item)">
                                    -
                                </button>
                            </div>
                        </div>

                        <p class="total" data-title="Subtotal:">${{ item.quantity * item.price }}</p>
                        <button class="deleteBtn" @click="removeItem(index)">X</button>
                    </div>

                    <div class="cart_coupon">
                        <form>
                            <input type="text" name="coupon" placeholder="Your Coupon Code">
                            <button @click.prevent="" class="apply">Apply Coupon</button>
                        </form>
                        <router-link :to="{ name: 'shop' }">Continue Shopping</router-link>
                    </div>
                </div>
                <div class="cart_summary">
                    <h3>Cart Summary</h3>

                    <div class="row subtotal">
                        <h6>Subtotal:</h6>
                        <p class="sub_price">${{ productData.total.toFixed(2) }}</p>
                    </div>

                    <div class="row shipping">
                        <h6>Shipping:</h6>
                        <p class="shipping_price">$10</p>
                    </div>

                    <div class="row total">
                        <h5>Total:</h5>
                        <p class="total_amt">${{ (productData.total + 10).toFixed(2) }}</p>
                    </div>
                    <router-link :to="{ name: 'checkout' }">Proceed to checkout</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { productsStore } from "@/stores/storeData.js";
import { useToast } from "vue-toastification";

const productData = productsStore();
const toast = useToast();

const increaseQty = (item) => {
    item.quantity++
};

const decreaseQty = (item) => {
    if (item.quantity > 1) {
        item.quantity--
    }
}

const removeItem = (index, item) => {
    const removeItem = productData.cart[index]; // I'm getting the removed item
    productData.removeFromCart(index);
    toast.error(removeItem.title + ' removed from cart');
}
</script>

<style lang="scss" scoped>
@use '../assets/css/variables' as v;
@use '../assets/css/mixins' as m;

.cart {
    margin-block: 80px;

    &_header {
        display: flex;
        justify-content: space-between;
        background-color: v.$blue;
        color: v.$lightWhite;
        padding: 0.875rem 0.5rem;
        margin-block: 1.25rem;
        border-radius: 0.25rem;

        h5 {
            font: {
                size: 18px;
                weight: v.$fw-500;
            }

            ;

            // &:nth-child(1) {
            //     flex-basis: 40%;
            // }
            &:nth-child(2) {
                flex-basis: 90%;
                text-align: right;
            }

            &:nth-child(3) {
                flex-basis: 30%;
                text-align: right;
            }

            &:nth-child(4) {
                flex-basis: 40%;
                text-align: right;
            }
        }
    }

    &_container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;
    }

    &_content {
        flex-basis: 68%;
    }

    &_product {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-basis: 70%;
        align-items: center;
        border-bottom: solid 1px v.$red;
        padding-block-end: 0.625rem;
        margin-block-end: 1.25rem;

        .title {
            flex-basis: 40%;
            color: v.$blue;
            font-weight: v.$fw-500;
            font-size: 18px;
        }

        img {
            width: 60px;
            aspect-ratio: 1/1;
        }
    }

    &_qty {
        display: flex;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // gap: 8px;
        background-color: v.$lightWhite;
        border-radius: 0.5rem;
        padding-block: 0.5rem;

        button {
            padding-inline: 10px;
            font-size: 24px;
        }


        input {
            width: 40px;
            padding-block: 10px;
            border: none;
            outline: none;
            background-color: #F0F0F0;
            text-align: center;
            font-size: 14px;
            font-weight: v.$fw-600;
        }
    }

    &_coupon {
        margin-block-start: 2.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        form {
            input {
                padding: 15px 10px;
                border-radius: 4px;
                border: #171717 solid 1px;
                margin-inline-end: 1.25rem;
            }

            button {
                @include m.btn;
            }
        }

        a {
            @include m.btn;
        }
    }

    &_summary {
        border: 1px solid v.$blue;
        padding: 20px;
        border-radius: 8px;
        flex-basis: 30%;
        text-align: center;

        h3 {
            font-size: 24px;
            font-weight: v.$fw-600;
        }

        a {
            @include m.btn;
            margin-block-start: 1.25rem;
        }

        .row {
            margin-block-start: 0.875rem;

            h6 {
                font-size: 16px;
                font-weight: v.$fw-600;
            }

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;

            p {
                color: v.$blue;
            }

            .total_amt {
                font-weight: v.$fw-500;
            }
        }

        .total {
            background-color: v.$lightWhite;
            padding: 1.25rem;
            border-radius: 0.5rem;
        }

        h5 {
            font: {
                size: 1.125rem;
                weight: v.$fw-700;
            }
        }
    }


    @media screen and (max-width:799px) {
        &_container {
            flex-direction: column;
            gap: 2.5rem;
        }

        &_content {
            width: 100%;
        }

        &_summary {
            width: 100%;
        }
    }

    // This media Query is for the main cart content
    @media screen and (max-width: 570px) {
        &_header {
            display: none;
        }

        &_product {
            flex-direction: column;

            %basis {
                display: flex;
                gap: 12px;
                align-items: center;
            }

            .price {
                @extend %basis;

                &::before {
                    content: attr(data-title);
                }
            }

            .forData {
                @extend %basis;


                &::before {
                    content: attr(data-title);
                }
            }

            .total {
                @extend %basis;

                &::before {
                    content: attr(data-title);
                }
            }
        }
    }
}
</style>