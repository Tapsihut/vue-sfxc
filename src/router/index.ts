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

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...homeRoutes,
        ...aboutRoutes,
        ...admissionRoutes,
        ...academicsRoutes,
        ...communityRoutes,
        ...studentLifeRoutes,
        ...cultureFaithRoutes,
        ...campusSafetyRoutes,
        ...studentResourcesRoutes,
    ],
    scrollBehavior(to) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        return { top: 0 }
    },
})

export default router
