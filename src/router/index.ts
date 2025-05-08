import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/home/home.vue')
        },
        {
            path: '/communities',
            name: 'communities',
            component: () => import('@/pages/communities/communities.vue')
        }
    ]
})

export default router
