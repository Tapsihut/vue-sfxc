import type { RouteRecordRaw } from 'vue-router'
import Login from '@/views/Auth/Login.vue'

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            layout: 'auth',
        },
    },
]

