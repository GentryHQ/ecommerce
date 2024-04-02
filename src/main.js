
import { createApp } from 'vue'
import './assets/css/style.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
