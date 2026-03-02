import Home from '@/views/Home.vue'
import VisionMission from '@/views/Abouts/VisionMission.vue'
import Enrollment from '@/views/Admission/Enrollment.vue'
import Requirements from '@/views/Admission/Requirements.vue'
import PaymentOption from '@/views/Admission/PaymentOption.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SchoolPatron from '@/views/Abouts/SchoolPatron.vue'
import Organizations from '@/views/Abouts/Organizations.vue'
import Scholarship from '@/views/Admission/Scholarship.vue'
import Programs from '@/views/Academics/Program.vue'
import Tesda from '@/views/Academics/Tesda.vue'
import Contact from '@/views/Contact/Contact.vue'
import NewsAndUpdates from '@/views/Community/NewsAndUpdates.vue'
import Announcement from '@/views/Community/Announcement.vue'
import ScheduleTour from '@/views/Admission/ScheduleTour.vue'
import Guide from '@/views/Admission/Guide.vue'
import MediaGallery from '@/views/Community/MediaGallery.vue'
import Alumni from '@/views/Community/Alumni.vue'
import Careers from '@/views/Community/Careers.vue'
import OutreachProgram from '@/views/Community/OutreachProgram.vue'
import BarangayPartner from '@/views/Community/BarangayPartner.vue'
import VolunteerOp from '@/views/Community/VolunteerOp.vue'
import Stories from '@/views/Community/Stories.vue'
import Facilities from '@/views/Abouts/Facilities.vue'
import OfficeDirectory from '@/views/Abouts/OfficeDirectory.vue'
import Accredation from '@/views/Abouts/Accredation.vue'
import Bsoa from '@/views/Academics/Programs/CBE/Bsoa.vue'
import Bsba from '@/views/Academics/Programs/CBE/Bsba.vue'
import Criminology from '@/views/Academics/Programs/CCJE/Criminology.vue'
import Bsed from '@/views/Academics/Programs/CTE/Bsed.vue'
import Beed from '@/views/Academics/Programs/CTE/Beed.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/about/vision-mission',
            name: 'vision-mission',
            component: VisionMission,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/about/school-patron',
            name: 'school-patron',
            component: SchoolPatron,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/about/organizations',
            name: 'organizations',
            component: Organizations,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/about/facilities',
            name: 'facilities',
            component: Facilities,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/about/office-directory',
            name: 'office-directory',
            component: OfficeDirectory,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/about/accreditation',
            name: 'accreditation',
            component: Accredation,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/enrollment',
            name: 'enrollment',
            component: Enrollment,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/scholarship',
            name: 'scholarship',
            component: Scholarship,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs',
            name: 'programs',
            component: Programs,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/tesda',
            name: 'tesda',
            component: Tesda,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/cbe/bsoa',
            name: 'bsoa',
            component: Bsoa,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/cbe/bsba',
            name: 'bsba',
            component: Bsba,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/ccje/criminology',
            name: 'criminology',
            component: Criminology,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/cte/bsed',
            name: 'bsed',
            component: Bsed,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/cte/beed',
            name: 'beed',
            component: Beed,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/news/latest-update',
            name: 'news',
            component: NewsAndUpdates,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/community/media-gallery',
            name: 'media-gallery',
            component: MediaGallery,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/community/alumni',
            name: 'alumni',
            component: Alumni,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/community/careers',
            name: 'careers',
            component: Careers,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/community/outreach-programs',
            name: 'outreach-programs',
            component: OutreachProgram,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/community/barangay-partners',
            name: 'barangay-partners',
            component: BarangayPartner,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/community/volunteer-opportunities',
            name: 'volunteer-opportunities',
            component: VolunteerOp,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/community/stories',
            name: 'stories',
            component: Stories,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/news/announcements',
            name: 'announcements',
            component: Announcement,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/admission/requirements',
            name: 'requirements',
            component: Requirements,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/admission/payment-options',
            name: 'payment-options',
            component: PaymentOption,
            meta: {
                layout: 'guest',
            },
        },
                {
            path: '/admission/tour',
            name: 'schedule-tour',
            component: ScheduleTour,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/admission/guide',
            name: 'course-guide',
            component: Guide,
            meta: {
                layout: 'guest',
            },
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0 }
    },
})

export default router
