import { createApp } from 'vue'
import './styles/_index.scss'
import App from './App.vue'
import router from './router/routes.js'
import { createPinia } from 'pinia'

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')