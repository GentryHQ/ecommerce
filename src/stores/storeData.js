import { defineStore } from 'pinia'

let baseUrl = 'https://dummyjson.com/products';

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
    searchResult: [],
    searchMetaData: [],
  }),

  getters: {
    total() {
      return this.cart.reduce((total, item) => total + item.quantity * item.price, 0);
    }
  },

  actions: {
    async fetchProductsFromDB() {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    async fetchProductsByCatFromDB(categoryName) {
      try {
        const response = await fetch(baseUrl + '/category/' + categoryName);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    async searchProducts(searchQuery) {
      try {

        console.log(`Searching for products with query: ${searchQuery}`);
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)

        if (!response.ok) {
          throw new Error('Failed To Search Products');
        }
        const data = await response.json();
        this.searchResult = data.products;
        console.log('Search results updated:', this.searchResult);


        this.searchMetadata = {
          total: data.total,
          skip: data.skip,
          limit: data.limit,
        };
      } catch (error) {
        console.error('Error searching products', error);
      }
    },

    addToCart(product) {
      const existingCartItem = this.cart.find(item => item.id === product.id);
      if (existingCartItem) {
        existingCartItem.quantity += product.quantity;
      } else {
        this.cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    removeFromCart(index) {
      this.cart.splice(index, 1);
    },

    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');

      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },
  },

  //Load cart from LS
  onInit() {
    this.loadCartFromLocalStorage();
  },

  onCartChange(newValue, oldValue) {
    if (newValue != oldValue) {
      localStorage.setItem('cart', JSON.stringify(newValue));
    }
  },
});