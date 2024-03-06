import { defineStore } from 'pinia'

let dbUrl = 'https://dummyjson.com/products';

export const productsStore = defineStore( 'products', {
  state: () => ({
    products: [],
    cart: []
  }),

  actions: {
    // fetchProductsFromDB() {
    //   fetch(dbUrl)
    //   .then(res => res.json())
    //   .then(json => {
    //     this.products = json.products;
    //   })
    // }

    async fetchProductsFromDB() {
      try {
        const response = await fetch(dbUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data.products; 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    addToCart() {
      console.log('cart-ing');
    }
  },
})