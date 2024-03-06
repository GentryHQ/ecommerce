import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from "../views/ShopView.vue";
import ProductDetails from "../views/ProductDetails.vue";

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
  ]
})

export default router
