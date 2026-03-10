import type { RouteRecordRaw } from 'vue-router'

export const studentResourcesRoutes: RouteRecordRaw[] = [
    {
        path: '/student-resources/academic-calendar',
        name: 'academic-calendar',
        component: () => import('@/views/StudentResource/AcademicCalendar.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/student-resources/student-guide',
        name: 'student-guide',
        component: () => import('@/views/StudentResource/StudentGuide.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/student-resources/site-map',
        name: 'site-map',
        component: () => import('@/views/StudentResource/SiteMap.vue'),
        meta: { layout: 'guest' },
    },
]
