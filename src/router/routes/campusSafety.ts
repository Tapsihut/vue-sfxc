import type { RouteRecordRaw } from 'vue-router'

export const campusSafetyRoutes: RouteRecordRaw[] = [
    {
        path: '/campus-safety/emergency-preparedness',
        name: 'emergency-preparedness',
        component: () => import('@/views/CampusSafety/Emergency.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/campus-safety/health-protocols',
        name: 'health-protocols',
        component: () => import('@/views/CampusSafety/HealthProtocols.vue'),
        meta: { layout: 'guest' },
    },
]
