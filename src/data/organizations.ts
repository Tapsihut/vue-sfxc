import { type Component } from 'vue'
import { CheckCircle, Users, Lightbulb, Heart } from 'lucide-vue-next'

export interface Officer {
    name: string
    position: string
    avatar?: string
}

export interface OfficerWithSubs extends Officer {
    subordinates?: OfficerWithSubs[]
}

export interface CollegeOfficer extends Officer {
    hasSubordinates: boolean
    governors?: Officer[]
}

export interface GoalCardData {
    title: string
    description: string
    icon: Component
    iconBgClass: string
    iconColorClass: string
}

export interface ClubPolicy {
    number: number
    title: string
    description: string
    variant: 'default' | 'destructive'
}

export const sclOfficers: OfficerWithSubs[] = [
    {
        name: 'Juan Dela Cruz',
        position: 'President',
        subordinates: [
            {
                name: 'Maria Santos',
                position: 'Vice President - Internal',
                subordinates: [
                    { name: 'Pedro Reyes', position: 'Finance' },
                    { name: 'Ana Garcia', position: 'Assistant Finance' },
                ],
            },
            {
                name: 'Jose Rizal',
                position: 'Vice President - External',
                subordinates: [
                    { name: 'Carlos Lopez', position: 'Logistic' },
                    { name: 'Rosa Mendoza', position: 'Assistant Logistic' },
                ],
            },
            {
                name: 'Elena Cruz',
                position: 'General Secretary',
                subordinates: [{ name: 'Marco Tan', position: 'Assistant Secretary' }],
            },
            {
                name: 'Sofia Ramos',
                position: 'PIO',
            },
        ],
    },
]

export const collegeOfficers: { topLevel: CollegeOfficer[] } = {
    topLevel: [
        {
            name: 'Roberto Villa',
            position: 'CBE President',
            hasSubordinates: true,
            governors: [
                { name: 'Liza Fernandez', position: 'BSA Governor' },
                { name: 'Miguel Torres', position: 'BSBA Governor' },
                { name: 'Carmen Diaz', position: 'BSOA Governor' },
                { name: 'Antonio Cruz', position: 'BSIT Governor' },
            ],
        },
        { name: 'Patricia Gomez', position: 'BSCRIM Governor', hasSubordinates: false },
        { name: 'Ricardo Santos', position: 'BEEd Governor', hasSubordinates: false },
        { name: 'Isabella Reyes', position: 'BSEd Governor', hasSubordinates: false },
    ],
}

export const goalCards: GoalCardData[] = [
    {
        title: 'Child Protection',
        description: 'Protecting children against criminality and deterring crimes',
        icon: CheckCircle,
        iconBgClass: 'bg-primary/20',
        iconColorClass: 'text-primary',
    },
    {
        title: 'Peer Guidance',
        description: 'Working with peers who share similar interests and aspirations',
        icon: Users,
        iconBgClass: 'bg-secondary/30',
        iconColorClass: 'text-secondary',
    },
    {
        title: 'Livelihood Ideas',
        description: 'Igniting sustainable livelihood and economic development',
        icon: Lightbulb,
        iconBgClass: 'bg-tertiary/30',
        iconColorClass: 'text-tertiary',
    },
    {
        title: 'Digital Literacy',
        description: 'Eradicating computer illiteracy and combating digital divide',
        icon: Heart,
        iconBgClass: 'bg-primary/20',
        iconColorClass: 'text-primary',
    },
]

export const clubPolicies: ClubPolicy[] = [
    {
        number: 1,
        title: 'Application Submission',
        description:
            "All program-based organizations and interest clubs must submit their application documents to the Office of Student Affairs and Services (OSAS) at the beginning of the academic year. This ensures that all groups are officially recognized and can operate within the school's framework.",
        variant: 'default',
    },
    {
        number: 2,
        title: 'Fund Collection Approval',
        description:
            'Any fund collections by student organizations must be accompanied by a resolution for approval. This process ensures transparency and proper management of funds, allowing for organized and sanctioned fundraising activities.',
        variant: 'default',
    },
    {
        number: 3,
        title: 'Anti-Hazing Policy',
        description:
            "Hazing is strictly prohibited for both recognized and non-recognized student organizations. This policy is crucial in maintaining a safe and respectful environment for all students, protecting their well-being and fostering a culture of respect and dignity within the school's community.",
        variant: 'destructive',
    },
]
