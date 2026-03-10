import type { RouteRecordRaw } from 'vue-router'

export const academicsRoutes: RouteRecordRaw[] = [
    {
        path: '/academics/programs',
        name: 'programs',
        component: () => import('@/views/Academics/Program.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/tesda',
        name: 'tesda',
        component: () => import('@/views/Academics/Tesda.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/international-relations',
        name: 'international-relations',
        component: () => import('@/views/Academics/InternationalRelation.vue'),
        meta: { layout: 'guest' },
    },

    // CBE Programs
    {
        path: '/academics/programs/cbe/bsoa',
        name: 'bsoa',
        component: () => import('@/views/Academics/Programs/CBE/BSOA.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/programs/cbe/bsba',
        name: 'bsba',
        component: () => import('@/views/Academics/Programs/CBE/BSBA.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/programs/cbe/bsa',
        name: 'bsa',
        component: () => import('@/views/Academics/Programs/CBE/BSA.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/programs/cbe/bsais',
        name: 'bsais',
        component: () => import('@/views/Academics/Programs/CBE/BSAIS.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/programs/cbe/bsia',
        name: 'bsia',
        component: () => import('@/views/Academics/Programs/CBE/BSIA.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/programs/cbe/bsma',
        name: 'bsma',
        component: () => import('@/views/Academics/Programs/CBE/BSMA.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/programs/cbe/bse',
        name: 'bse',
        component: () => import('@/views/Academics/Programs/CBE/BSE.vue'),
        meta: { layout: 'guest' },
    },

    // CCJE Programs
    {
        path: '/academics/programs/ccje/criminology',
        name: 'criminology',
        component: () => import('@/views/Academics/Programs/CCJE/Criminology.vue'),
        meta: { layout: 'guest' },
    },

    // CTE Programs
    {
        path: '/academics/programs/cte/bsed',
        name: 'bsed',
        component: () => import('@/views/Academics/Programs/CTE/Bsed.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/programs/cte/beed',
        name: 'beed',
        component: () => import('@/views/Academics/Programs/CTE/Beed.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/programs/cte/abel',
        name: 'abel',
        component: () => import('@/views/Academics/Programs/CTE/Abel.vue'),
        meta: { layout: 'guest' },
    },

    // Other Programs
    {
        path: '/academics/programs/unit-earner',
        name: 'unit-earner',
        component: () => import('@/views/Academics/Programs/UnitEarner.vue'),
        meta: { layout: 'guest' },
    },
    {
        path: '/academics/programs/tech-voc',
        name: 'tech-voc',
        component: () => import('@/views/Academics/Programs/TechVoc.vue'),
        meta: { layout: 'guest' },
    },
]
