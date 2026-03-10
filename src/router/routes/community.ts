import type { RouteRecordRaw } from 'vue-router'

export const communityRoutes: RouteRecordRaw[] = [
    {
        path: '/news/latest-update',
        name: 'news',
        component: () => import('@/views/Community/NewsAndUpdates.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/news/announcements',
        name: 'announcements',
        component: () => import('@/views/Community/Announcement.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/community/media-gallery',
        name: 'media-gallery',
        component: () => import('@/views/Community/MediaGallery.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/community/alumni',
        name: 'alumni',
        component: () => import('@/views/Community/Alumni.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/community/careers',
        name: 'careers',
        component: () => import('@/views/Community/Careers.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/community/outreach-programs',
        name: 'outreach-programs',
        component: () => import('@/views/Community/OutreachProgram.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/community/barangay-partners',
        name: 'barangay-partners',
        component: () => import('@/views/Community/BarangayPartner.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/community/volunteer-opportunities',
        name: 'volunteer-opportunities',
        component: () => import('@/views/Community/VolunteerOp.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/community/stories',
        name: 'stories',
        component: () => import('@/views/Community/Stories.vue'),
        meta: { layout: 'guest' },
    },
]
