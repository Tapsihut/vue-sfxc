import type { RouteRecordRaw } from 'vue-router'

export const studentLifeRoutes: RouteRecordRaw[] = [
    {
        path: '/student-life/osas',
        name: 'osas',
        component: () => import('@/views/StudentLife/OSAS.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/student-life/campus-housing',
        name: 'campus-housing',
        component: () => import('@/views/StudentLife/Housing.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/student-life/athletics-fitness',
        name: 'athletics-fitness',
        component: () => import('@/views/StudentLife/AthleticsFitness.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/student-life/career-services',
        name: 'career-services',
        component: () => import('@/views/StudentLife/CareerServices.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/student-life/health-wellness',
        name: 'health-wellness',
        component: () => import('@/views/StudentLife/HealthWellness.vue'),
        meta: { layout: 'guest' },
    },
]
