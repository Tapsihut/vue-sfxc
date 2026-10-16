import type { RouteRecordRaw } from 'vue-router'

import AdminLayout from '@/admin/layouts/AdminLayout.vue'

// Dashboard
import Dashboard from '@/admin/views/Dashboard.vue'
 
// Content
import Posts from '@/admin/views/Content/Posts.vue'
import CreatePost from '@/admin/views/Content/CreatePost.vue'
import Categories from '@/admin/views/Content/Categories.vue'
import Sections from '@/admin/views/Content/Sections.vue'

// Home
import HeroSlides from '@/admin/views/Home/HeroSlides.vue'
import Programs from '@/admin/views/Home/Programs.vue'
import Statistics from '@/admin/views/Home/Statistics.vue'

// Media
import MediaLibrary from '@/admin/views/Media/MediaLibrary.vue'

// Settings
import Settings from '@/admin/views/Settings/Settings.vue'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminLayout,

    // Protect every admin page under /admin.
    meta: {
      layout: 'admin',
      requiresAuth: true,
    },

    children: [
      // Dashboard
      {
        path: '',
        redirect: '/admin/dashboard',
      },

      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
        },
      },

      // Content
      {
        path: 'posts',
        name: 'AdminPosts',
        component: Posts,
        meta: {
          title: 'Posts',
        },
      },

      {
        path: 'posts/create',
        name: 'AdminCreatePost',
        component: CreatePost,
        meta: {
          title: 'Create Post',
        },
      },

      {
        path: 'categories',
        name: 'AdminCategories',
        component: Categories,
        meta: {
          title: 'Categories',
        },
      },

      {
        path: 'sections',
        name: 'AdminSections',
        component: Sections,
        meta: {
          title: 'Sections',
        },
      },

      // Home
      {
        path: 'hero-slides',
        name: 'AdminHeroSlides',
        component: HeroSlides,
        meta: {
          title: 'Hero Slides',
        },
      },

      {
        path: 'programs',
        name: 'AdminPrograms',
        component: Programs,
        meta: {
          title: 'Programs',
        },
      },

      {
        path: 'statistics',
        name: 'AdminStatistics',
        component: Statistics,
        meta: {
          title: 'Statistics',
        },
      },

      // Media
      {
        path: 'media',
        name: 'AdminMedia',
        component: MediaLibrary,
        meta: {
          title: 'Media Library',
        },
      },

      // Settings
      {
        path: 'settings',
        name: 'AdminSettings',
        component: Settings,
        meta: {
          title: 'Settings',
        },
      },
    ],
  },
]
