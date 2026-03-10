import Home from '@/views/Home.vue'
import VisionMission from '@/views/Abouts/VisionMission.vue'
import Enrollment from '@/views/Admission/Enrollment.vue'
import Requirements from '@/views/Admission/Requirements.vue'
import FinancialAid from '@/views/Admission/FinancialAid.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SchoolPatron from '@/views/CultureFaith/SchoolPatron.vue'
import Organizations from '@/views/Abouts/Organizations.vue'
import Programs from '@/views/Academics/Program.vue'
import Tesda from '@/views/Academics/Tesda.vue'
import InternationalRelation from '@/views/Academics/InternationalRelation.vue'
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
//CBE
import Bsoa from '@/views/Academics/Programs/CBE/BSOA.vue'
import Bsba from '@/views/Academics/Programs/CBE/BSBA.vue'
import Bsa from '@/views/Academics/Programs/CBE/BSA.vue'
import Bsais from '@/views/Academics/Programs/CBE/BSAIS.vue'
import Bsia from '@/views/Academics/Programs/CBE/BSIA.vue'
import Bsma from '@/views/Academics/Programs/CBE/BSMA.vue'
import Bse from '@/views/Academics/Programs/CBE/BSE.vue'
//CCJE
import Criminology from '@/views/Academics/Programs/CCJE/Criminology.vue'
//CTE
import Bsed from '@/views/Academics/Programs/CTE/Bsed.vue'
import Beed from '@/views/Academics/Programs/CTE/Beed.vue'
import Abel from '@/views/Academics/Programs/CTE/Abel.vue'

//Other
import UnitEarner from '@/views/Academics/Programs/UnitEarner.vue'
import TechVoc from '@/views/Academics/Programs/TechVoc.vue'
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
            path: '/culture-faith/school-patron',
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
            path: '/academics/international-relations',
            name: 'international-relations',
            component: InternationalRelation,
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
            path: '/academics/programs/cbe/bsa',
            name: 'bsa',
            component: Bsa,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/cbe/bsais',
            name: 'bsais',
            component: Bsais,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/cbe/bsia',
            name: 'bsia',
            component: Bsia,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/cbe/bsma',
            name: 'bsma',
            component: Bsma,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/cbe/bse',
            name: 'bse',
            component: Bse,
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
            path: '/academics/programs/cte/abel',
            name: 'abel',
            component: Abel,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/unit-earner',
            name: 'unit-earner',
            component: UnitEarner,
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/academics/programs/tech-voc',
            name: 'tech-voc',
            component: TechVoc,
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
            path: '/admission/financial-aid',
            name: 'financial-aid',
            component: FinancialAid,
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
        },
        {
            path: '/campus-safety/emergency-preparedness',
            name: 'emergency-preparedness',
            component: () => import('@/views/CampusSafety/Emergency.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/campus-safety/health-protocols',
            name: 'health-protocols',
            component: () => import('@/views/CampusSafety/HealthProtocols.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/student-resources/student-guide',
            name: 'student-guide',
            component: () => import('@/views/StudentResource/StudentGuide.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/student-resources/academic-calendar',
            name: 'academic-calendar',
            component: () => import('@/views/StudentResource/AcademicCalendar.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/student-resources/site-map',
            name: 'site-map',
            component: () => import('@/views/StudentResource/SiteMap.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/student-life/osas',
            name: 'osas',
            component: () => import('@/views/StudentLife/OSAS.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/student-life/campus-housing',
            name: 'campus-housing',
            component: () => import('@/views/StudentLife/Housing.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/student-life/athletics-fitness',
            name: 'athletics-fitness',
            component: () => import('@/views/StudentLife/AthleticsFitness.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/culture-faith/campus-culture',
            name: 'campus-culture',
            component: () => import('@/views/CultureFaith/CampusCultureTraditions.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/student-life/career-services',
            name: 'career-services',
            component: () => import('@/views/StudentLife/CareerServices.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/culture-faith/culture-arts',
            name: 'culture-arts',
            component: () => import('@/views/CultureFaith/CultureArtsOffice.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/student-life/health-wellness',
            name: 'health-wellness',
            component: () => import('@/views/StudentLife/HealthWellness.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/culture-faith/impact-stories',
            name: 'impact-stories',
            component: () => import('@/views/CultureFaith/ImpactStories.vue'),
            meta: {
                layout: 'guest',
            },
        },
        {
            path: '/culture-faith/recollection',
            name: 'recollection',
            component: () => import('@/views/CultureFaith/Recollection.vue'),
            meta: {
                layout: 'guest',
            },
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }
        // if (savedPosition) {
        //     return savedPosition
        // }
        return { top: 0 }
    },
})

export default router
