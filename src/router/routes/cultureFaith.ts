import type { RouteRecordRaw } from 'vue-router'

export const cultureFaithRoutes: RouteRecordRaw[] = [
    {
        path: '/culture-faith/school-patron',
        name: 'school-patron',
        component: () => import('@/views/CultureFaith/SchoolPatron.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/culture-faith/campus-culture',
        name: 'campus-culture',
        component: () => import('@/views/CultureFaith/CampusCultureTraditions.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/culture-faith/culture-arts',
        name: 'culture-arts',
        component: () => import('@/views/CultureFaith/CultureArtsOffice.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/culture-faith/recollection',
        name: 'recollection',
        component: () => import('@/views/CultureFaith/Recollection.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/culture-faith/impact-stories',
        name: 'impact-stories',
        component: () => import('@/views/CultureFaith/ImpactStories.vue'),
        meta: { layout: 'guest' },
    },
]
