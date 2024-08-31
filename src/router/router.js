// router.js
import { createRouter, createWebHistory } from "vue-router";

import AdminPanel from '@/components/AdminPanel.vue';
import UserPanel from '@/components/UserPanel.vue';
import Index from '@/views/index.vue';



const routes = [
    { path: '/', component: Index, name: 'index' },

    { path: '/admin', component: AdminPanel, name: 'admin' },
    { path: '/user', component: UserPanel, name: 'user' },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});
export default router;