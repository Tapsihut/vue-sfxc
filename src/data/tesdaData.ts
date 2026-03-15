import type { Component } from 'vue'
import { Award, Users, BookOpen, GraduationCap, FileText } from 'lucide-vue-next'

export interface TesdaCourse {
    id: number
    title: string
    duration: string
    level: string
    description: string
    skills: string[]
}

export interface TesdaBenefit {
    icon: Component
    title: string
    description: string
}

export const tesdaCourses: TesdaCourse[] = [
    {
        id: 1,
        title: 'Driving NC II',
        duration: '3 months',
        level: 'NC II',
        description:
            'Develop professional driving skills and competencies for operating light vehicles safely and efficiently in accordance with traffic rules and regulations.',
        skills: ['Defensive Driving', 'Vehicle Maintenance', 'Traffic Rules', 'Road Safety'],
    },
]

export const requirements: string[] = [
    'Birth Certificate (NSO Copy)',
    'Form 138 (Report Card)',
    '2x2 ID Pictures (4 copies)',
    'Certificate of Good Moral Character',
    'Medical Certificate',
    'Barangay Clearance',
]

export const benefits: TesdaBenefit[] = [
    {
        icon: Award,
        title: 'National Certification',
        description: 'Receive TESDA National Certificate upon completion',
    },
    {
        icon: Users,
        title: 'Expert Instructors',
        description: 'Learn from industry-experienced and certified trainers',
    },
    {
        icon: BookOpen,
        title: 'Quality Training',
        description: 'Access to modern facilities and equipment',
    },
    {
        icon: GraduationCap,
        title: 'Job Ready',
        description: 'Gain practical skills for immediate employment',
    },
]

export const competenciesIcon: Component = BookOpen
export const requirementsIcon: Component = FileText
