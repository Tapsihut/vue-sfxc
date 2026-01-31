import Home from '@/views/Home.vue'
import MissionVision from '@/views/Abouts/VisionMission.vue'
import Enrollment from '@/views/Admission/Enrollment.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SchoolPatron from '@/views/Abouts/SchoolPatron.vue'
import Organizations from '@/views/Abouts/Organizations.vue'
import Scholarship from '@/views/Academics/Scholarship.vue'
import Tesda from '@/views/Academics/Tesda.vue'
import Contact from '@/views/Contact/Contact.vue'
import NewsAndUpdates from '@/views/News/NewsAndUpdates.vue'

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
        {
            path: '/academics/scholarship',
            name: 'scholarship',
            component: Scholarship,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/tesda',
            name: 'tesda',
            component: Tesda,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/news/latest-update',
            name: 'news',
            component: NewsAndUpdates,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
            meta: {
                layout: 'guest',
            },
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

export default router
