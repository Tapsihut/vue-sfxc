import type { RouteRecordRaw } from 'vue-router'

export const aboutRoutes: RouteRecordRaw[] = [
    {
        path: '/about/vision-mission',
        name: 'vision-mission',
        component: () => import('@/views/Abouts/VisionMission.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/about/facilities',
        name: 'facilities',
        component: () => import('@/views/Abouts/Facilities.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/about/office-directory',
        name: 'office-directory',
        component: () => import('@/views/Abouts/OfficeDirectory.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/about/accreditation',
        name: 'accreditation',
        component: () => import('@/views/Abouts/Accredation.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/about/contact-us',
        name: 'contact',
        component: () => import('@/views/Abouts/Contact.vue'),
        meta: { layout: 'guest' },
    },
]
