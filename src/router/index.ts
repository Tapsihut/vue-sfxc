import { createRouter, createWebHistory } from 'vue-router'

import { homeRoutes } from './routes/home'
import { aboutRoutes } from './routes/about'
import { admissionRoutes } from './routes/admission'
import { academicsRoutes } from './routes/academics'
import { communityRoutes } from './routes/community'
import { studentLifeRoutes } from './routes/studentLife'
import { cultureFaithRoutes } from './routes/cultureFaith'
import { campusSafetyRoutes } from './routes/campusSafety'
import { studentResourcesRoutes } from './routes/studentResources'
import { authRoutes } from './routes/auth'
import { adminRoutes } from './routes/admin'

import authService from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    ...homeRoutes,
    ...aboutRoutes,

    // President's Message and History page
    {
      path: '/president-message-history',
      name: 'president-message-history',
      component: () => import('@/views/Abouts/PresidentMessageHistoryView.vue'),
      meta: {
        layout: 'default',
      },
    },

    // Organizational Structure page
    {
      path: '/organizational-structure',
      name: 'organizational-structure',
      component: () => import('@/views/Abouts/OrganizationalStructureView.vue'),
      meta: {
        layout: 'default',
      },
    },

    ...admissionRoutes,
    ...academicsRoutes,
    ...communityRoutes,
    ...studentLifeRoutes,
    ...cultureFaithRoutes,
    ...campusSafetyRoutes,
    ...studentResourcesRoutes,
    ...authRoutes,
    ...adminRoutes,

    // Public news listing page
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/News/News.vue'),
      meta: {
        layout: 'default',
      },
    },

    // Individual news article page
    {
      path: '/news/:slug',
      name: 'news-detail',
      component: () => import('@/views/News/NewsDetail.vue'),
      props: true,
      meta: {
        layout: 'default',
      },
    },
  ],

  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return {
      top: 0,
    }
  },
})

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some(
    (record) => record.meta.requiresAuth === true,
  )

  // Public pages do not require authentication.
  if (!requiresAuth) {
    return true
  }

  try {
    const user = await authService.getCurrentUser()

    if (!user?.is_admin) {
      return {
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      }
    }

    return true
  } catch {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    }
  }
})

export default router
