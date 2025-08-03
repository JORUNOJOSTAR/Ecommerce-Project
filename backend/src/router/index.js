import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import AppLayout from "../components/AppLayout.vue";
import Products from "../views/Products.vue";
import Reports from "../views/Reports.vue";
import Users from "../views/Users.vue";

const routes = [
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
        children:[
            {
                path: 'dashboard',
                name: 'app.dashboard',
                component: Dashboard
            },
            {
                path: 'products',
                name: 'app.products',
                component: Products,
            },
            {
                path: 'reports',
                name: 'app.reports',
                component: Reports,
            },
            {
                path: 'users',
                name: 'app.users',
                component: Users,
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/request-password',
        name: 'requestPassword',
        component: RequestPassword
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: ResetPassword
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
