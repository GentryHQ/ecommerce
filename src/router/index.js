import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from "../views/ShopView.vue";
import ProductDetails from "../views/ProductDetails.vue";
import CartView from "../views/CartView.vue";
import CheckOut from "../views/CheckOut.vue";
import SearchView from "../views/SearchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },

    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: ProductDetails,
      props: true
    },

    {
      path: '/search',
      name: 'SearchResult',
      component: SearchView,
      props: route => ({ searchQuery: route.query.q })
    },

    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },

    {
      path: '/checkout',
      name: 'checkout',
      component: CheckOut,
    },
  ]
})

export default router
