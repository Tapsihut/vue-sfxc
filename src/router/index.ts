import Home from '@/views/Home.vue'
import MissionVision from '@/views/Abouts/VisionMission.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/about/vision-mission',
            name: 'vision-mission',
            component: MissionVision,
            meta: {
                layout: 'guest',
            },
        },
    ],
})

export default router
