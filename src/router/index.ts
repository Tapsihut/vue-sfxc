import Home from '@/views/Home.vue'
import VisionMission from '@/views/Abouts/VisionMission.vue'
import Enrollment from '@/views/Admission/Enrollment.vue'
import Requirements from '@/views/Admission/Requirements.vue'
import PaymentOption from '@/views/Admission/PaymentOption.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SchoolPatron from '@/views/Abouts/SchoolPatron.vue'
import Organizations from '@/views/Abouts/Organizations.vue'
import Scholarship from '@/views/Academics/Scholarship.vue'
import Programs from '@/views/Academics/Program.vue'
import Tesda from '@/views/Academics/Tesda.vue'
import Contact from '@/views/Contact/Contact.vue'
import NewsAndUpdates from '@/views/News/NewsAndUpdates.vue'
import Announcement from '@/views/News/Announcement.vue'

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
            component: VisionMission,
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
            path: '/academics/programs',
            name: 'programs',
            component: Programs,
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
            path: '/news/announcements',
            name: 'announcements',
            component: Announcement,
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
        {
            path: '/admission/requirements',
            name: 'requirements',
            component: Requirements,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/admission/payment-options',
            name: 'payment-options',
            component: PaymentOption,
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
