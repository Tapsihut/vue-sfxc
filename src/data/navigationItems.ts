import {
    Building2,
    Users,
    GraduationCap,
    FileText,
    Heart,
    Sparkles,
    LayoutDashboard,
} from 'lucide-vue-next'
import type { NavigationItem } from '@/types/navigation'

export const navigationItems: NavigationItem[] = [
    {
        name: 'Home',
        type: 'link',
        to: { name: 'home' },
    },
    {
        name: 'About Us',
        type: 'dropdown',
        to: { name: 'vision-mission' },
        groups: [
            {
                label: 'Overview',
                icon: Building2,
                links: [
                    {
                        name: 'Mission, Vision, and History',
                        to: { name: 'vision-mission' },
                        description: 'Our foundation and values',
                    },
                    {
                        name: 'Contact Us',
                        to: { name: 'contact' },
                        description: 'Get in touch with us',
                    },
                ],
            },
            {
                label: 'Governance & Quality',
                icon: LayoutDashboard,
                links: [
                    {
                        name: 'Office Directory',
                        to: { name: 'office-directory' },
                        description: 'Find the right office',
                    },
                    {
                        name: 'Accreditations & Achievements',
                        to: { name: 'accreditation' },
                        description: 'Our quality standards',
                    },
                ],
            },
            {
                label: 'Campus',
                icon: Sparkles,
                links: [
                    {
                        name: 'Campus Facilities and Virtual Tour',
                        to: { name: 'facilities' },
                        description: 'Explore our campus',
                    },
                ],
            },
        ],
    },
    {
        name: 'Admissions',
        type: 'dropdown',
        to: { name: 'requirements' },
        groups: [
            {
                label: 'Apply',
                icon: FileText,
                links: [
                    {
                        name: 'How to Apply',
                        to: { name: 'requirements', hash: '#enrollment' },
                        description: 'Local & International students',
                    },
                    {
                        name: 'Visit/Schedule Tour',
                        to: { name: 'schedule-tour' },
                        description: 'See our campus in person',
                    },
                ],
            },
            {
                label: 'Costs & Aid',
                icon: Heart,
                links: [
                    {
                        name: 'Financial Aid',
                        to: { name: 'financial-aid' },
                        description: 'Investment in your future',
                    },
                ],
            },
            {
                label: 'Guidance',
                icon: Sparkles,
                links: [
                    {
                        name: 'What Course Should I Choose?',
                        to: { name: 'course-guide' },
                        description: 'Find your path',
                    },
                ],
            },
        ],
    },
    {
        name: 'Academics',
        type: 'dropdown',
        groups: [
            {
                label: 'Programs',
                icon: GraduationCap,
                links: [
                    {
                        name: 'Baccalaureate Programs',
                        to: { name: 'programs' },
                        description: 'Undergraduate degrees',
                    },
                    {
                        name: 'Unit Earner Program',
                        to: { name: 'unit-earner' },
                        description: 'Professional development',
                    },
                    {
                        name: 'Technical Vocational Programs',
                        to: { name: 'tech-voc' },
                        description: 'Skills-based training',
                    },
                ],
            },
            {
                label: 'Offices',
                icon: Building2,
                links: [
                    {
                        name: 'Research Development Office',
                        to: '#',
                        description: 'Advancing knowledge',
                    },
                    {
                        name: 'International Relations Office',
                        to: { name: 'international-relations' },
                        description: 'Global partnerships',
                    },
                ],
            },
        ],
    },
    {
        name: 'Xavier Knight Life',
        type: 'dropdown',
        groups: [
            {
                label: 'Student Life',
                icon: Users,
                links: [
                    {
                        name: 'Office of Student Affairs',
                        to: { name: 'osas' },
                        description: 'Student support services',
                    },
                    {
                        name: 'Campus Housing and Dining',
                        to: { name: 'campus-housing' },
                        description: 'Living on campus',
                    },
                    {
                        name: 'Student Organizations',
                        to: { name: 'organizations' },
                        description: 'Clubs and activities',
                    },
                    {
                        name: 'Athletics and Fitness',
                        to: { name: 'athletics-fitness' },
                        description: 'Sports and wellness',
                    },
                    {
                        name: 'Health and Wellness',
                        to: { name: 'health-wellness' },
                        description: 'Your wellbeing matters',
                    },
                    {
                        name: 'Career Services',
                        to: { name: 'career-services' },
                        description: 'Plan your future',
                    },
                ],
            },
            {
                label: 'Culture & Faith',
                icon: Heart,
                links: [
                    {
                        name: 'Culture and Arts Office',
                        to: { name: 'culture-arts' },
                        description: 'Creative expression',
                    },
                    {
                        name: 'Campus Culture and Traditions',
                        to: { name: 'campus-culture' },
                        description: 'Our unique identity',
                    },
                    {
                        name: 'Recollection',
                        to: { name: 'recollection' },
                        description: 'Spiritual growth',
                    },
                    {
                        name: 'Faith (Patron)',
                        to: { name: 'school-patron' },
                        description: 'St. Francis Xavier',
                    },
                    {
                        name: 'Impact Stories',
                        to: { name: 'impact-stories' },
                        description: 'Student experiences',
                    },
                ],
            },
        ],
    },
    {
        name: 'More',
        type: 'dropdown',
        groups: [
            {
                label: 'Student Resources',
                icon: LayoutDashboard,
                links: [
                    {
                        name: 'Academic Calendar',
                        to: { name: 'academic-calendar' },
                        description: 'Important dates',
                    },
                    {
                        name: 'Student Guide',
                        to: 'https://drive.google.com/file/d/12zIRcTRmMy131AZS3mtVXF_8u1kPNLph/view?usp=drive_link',
                        description: 'Rules and guidelines',
                        external: true,
                    },
                    {
                        name: 'XIMS',
                        to: 'https://xims.sfxc.edu.ph',
                        description: 'Student portal',
                        external: true,
                    },
                    {
                        name: 'Search and Site Map',
                        to: { name: 'site-map' },
                        description: 'Find what you need',
                    },
                ],
            },
            {
                label: 'Campus Safety',
                icon: Sparkles,
                links: [
                    {
                        name: 'Emergency and Disaster Preparedness Plan',
                        to: '/campus-safety/emergency-preparedness',
                        description: 'Be prepared for emergencies',
                    },
                    {
                        name: 'Health Protocols',
                        to: '/campus-safety/health-protocols',
                        description: 'Health and safety',
                    },
                ],
            },
        ],
    },
]
