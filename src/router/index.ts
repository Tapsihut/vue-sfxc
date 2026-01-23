import Home from '@/views/Home.vue'
import MissionVision from '@/views/Abouts/VisionMission.vue'
import Enrollment from '@/views/Admission/Enrollment.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SchoolPatron from '@/views/Abouts/SchoolPatron.vue'
import Organizations from '@/views/Abouts/Organizations.vue'

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
        {
            path: '/about/school-patron',
            name: 'school-patron',
            component: SchoolPatron,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/about/organizations',
            name: 'organizations',
            component: Organizations,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/enrollment',
            name: 'enrollment',
            component: Enrollment,
            meta: {
                layout: 'guest',
            },
        },
    ],
})

export default router
