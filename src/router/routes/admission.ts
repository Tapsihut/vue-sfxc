import type { RouteRecordRaw } from 'vue-router'

export const admissionRoutes: RouteRecordRaw[] = [
    {
        path: '/academics/enrollment',
        name: 'enrollment',
        component: () => import('@/views/Admission/Enrollment.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/admission/requirements',
        name: 'requirements',
        component: () => import('@/views/Admission/Requirements.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/admission/financial-aid',
        name: 'financial-aid',
        component: () => import('@/views/Admission/FinancialAid.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/admission/tour',
        name: 'schedule-tour',
        component: () => import('@/views/Admission/ScheduleTour.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/admission/guide',
        name: 'course-guide',
        component: () => import('@/views/Admission/Guide.vue'),
        meta: { layout: 'guest' },
    },
]
