import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import ClientsView from "@/views/CustomerView.vue";
import InvoicesView from "@/views/InvoicesView.vue";
import LoginView from "@/views/LoginView.vue";
import {useUserStore} from "@/store/user.js";


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    }, {
        path: '/login',
        name: 'login',
        component: LoginView
    }, {
        path: '/products',
        name: 'products',
        component: ProductsView
    }, {
        path: '/clients',
        name: 'clients',
        component: ClientsView,
        meta: { requiresAuth: true }
    }, {
        path: '/invoices',
        name: 'invoices',
        component: InvoicesView,
        meta: { requiresAuth: true }
    }]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
    const store = useUserStore();

    if (to.meta.requiresAuth && !store.isLogged) {
        // Redirect to login if not authenticated
        next('/login');
    } else {
        // Proceed to the requested route
        next();
    }
});
export default router