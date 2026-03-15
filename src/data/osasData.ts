import { type Component } from 'vue'
import { Users, Trophy, HeartHandshake, Briefcase } from 'lucide-vue-next'

export interface OsasOrganization {
    name: string
    adviser: string
    president: string
    specialization: string
    fee: string
}

export interface OsasProgramCard {
    id: string
    title: string
    description: string
    icon: Component
}

export interface OsasSupportSection {
    id: string
    title: string
    subtitle: string
    icon: Component
    description: string
    listLabel: string
    items: string[]
}

export const services: string[] = [
    'Information & Orientation',
    'Guidance & Counseling',
    'Career & Job Placement',
    'Student Handbook Development',
    'Student Discipline',
    'Student Activities',
    'Student Government & Organization',
    'Health Services',
    'Safety & Security',
    'Multi-faith Services',
    'Services for Students with Special Needs & PWD',
    'Culture & Arts',
    'Sports Development Programs',
]

export const programs: OsasProgramCard[] = [
    {
        id: 'organizations',
        title: 'Student Organizations & Clubs',
        description:
            '17 accredited organizations across student government, academics, sports, arts, and advocacy.',
        icon: Users,
    },
    {
        id: 'sports',
        title: 'Sports Development',
        description:
            'Annual intramural games and invitation sports events promoting teamwork and a healthy lifestyle.',
        icon: Trophy,
    },
    {
        id: 'guidance',
        title: 'Guidance Office',
        description:
            'Personal, academic, and emotional counseling support to help students achieve holistic growth.',
        icon: HeartHandshake,
    },
    {
        id: 'career',
        title: 'Career Services',
        description:
            'Career guidance, job opportunities, and placement support for smooth school-to-work transition.',
        icon: Briefcase,
    },
]

export const organizations: OsasOrganization[] = [
    {
        name: 'Student Council of Leaders (SCL)',
        adviser: 'Marc Gef E. Andres',
        president: 'Airene G. Flaga',
        specialization: 'Student Government — General',
        fee: '₱600.00',
    },
    {
        name: 'Elementary Education Student Affairs (EEdSa)',
        adviser: 'James A. Permale',
        president: 'Rogene D. Malupa',
        specialization: 'Student Government — Program',
        fee: '₱1,500.00',
    },
    {
        name: "Secondary Education Students' Organization (SESO)",
        adviser: 'Jane Marie C. Lozada',
        president: 'Rubelyn Resos',
        specialization: 'Student Government — Program',
        fee: '₱1,500.00',
    },
    {
        name: 'College of Criminal Justice Education Student Body Organization (CCJE-SBO)',
        adviser: 'Nerrio Christian Art J. Nerio',
        president: 'Jade M. Magadan',
        specialization: 'Student Government — Program',
        fee: '₱2,800.00',
    },
    {
        name: 'Web Knights (BSIT)',
        adviser: 'James Raphael B. Ibay',
        president: 'Sherilyn L. Perez',
        specialization: 'Student Government — Program',
        fee: '₱1,800.00',
    },
    {
        name: 'Philippine Association of Students in Office Administration — SFXC Chapter (PASOA SFXC)',
        adviser: 'Niner L. Casinto',
        president: 'Novie Cabigquiz',
        specialization: 'Student Government — Program',
        fee: '₱1,902.00',
    },
    {
        name: 'Junior Philippine Institute of Accountants — SFXC Chapter (JPIA-SFXC)',
        adviser: 'Ferriza Bianca S. Aban',
        president: 'Kenneth E. Jabutay',
        specialization: 'Student Government — Program',
        fee: '₱1,250.00',
    },
    {
        name: 'Business Administration Student Council (BASC)',
        adviser: 'Jerome C. Seraspe',
        president: 'Elaija Grace V. Galinada',
        specialization: 'Student Government — Program',
        fee: '₱1,529.00',
    },
    {
        name: 'College of Business Education Student Council (CBESC)',
        adviser: 'Jayson Acuna',
        president: 'Denmark B. Rivera',
        specialization: 'Student Government — Program',
        fee: '₱1,300.00',
    },
    {
        name: 'Physical Education and Sports Association',
        adviser: 'Lexter Gucela',
        president: 'April Rose T. Surban',
        specialization: 'Sports Development',
        fee: '—',
    },
    {
        name: 'College Red Cross Youth',
        adviser: 'Julieto Flores Jr.',
        president: 'Mark Paul A. Noja',
        specialization: 'Emergency Response',
        fee: '₱425.00',
    },
    {
        name: 'English Language and Literature Club (ELLiT)',
        adviser: 'Jayson B. Osin',
        president: 'Devine R. Mordeno',
        specialization: 'Academic',
        fee: '₱400.00',
    },
    {
        name: "Xavier's Echo",
        adviser: 'Diana R. Joson',
        president: 'Regine Ambray',
        specialization: 'Academic — Journalism',
        fee: '—',
    },
    {
        name: 'Yakang Masanagun Dance Troupe',
        adviser: 'Gennie A. Padino',
        president: 'Jordan Plaza',
        specialization: 'Performing Arts',
        fee: '—',
    },
    {
        name: 'Junior Financial Executives — SFXC Chapter (JFINEX-SFXC)',
        adviser: 'Myffer A. Lamatao',
        president: 'Grace A. Florida',
        specialization: 'Academic',
        fee: '₱600.00',
    },
    {
        name: 'Philippine Junior Marketing Association (PJMA)',
        adviser: 'Sammy G. Marollano Jr.',
        president: 'Justine Carl Godilos',
        specialization: 'Academic',
        fee: '₱600.00',
    },
    {
        name: 'Mental Health Peer Facilitator',
        adviser: 'Julianne Faith Puzon',
        president: 'Dyrich C. Torralba',
        specialization: 'Psychosocial Support',
        fee: '—',
    },
]

export const supportSections: OsasSupportSection[] = [
    {
        id: 'sports',
        title: 'Sports Development',
        subtitle: 'On-campus & off-campus sports programs',
        icon: Trophy,
        description:
            'The Sports Development Program offers on-campus and off-campus sports activities, including annual intramural games and occasional invitation games, which help students develop teamwork, discipline, leadership, and a healthy lifestyle.',
        listLabel: 'Common Sports',
        items: [
            'Basketball 5x5 & 3x3',
            'Volleyball',
            'Sepak Takraw',
            'Table Tennis',
            'Badminton',
            'Chess',
            'E-Games',
        ],
    },
    {
        id: 'guidance',
        title: 'Guidance Office',
        subtitle: 'Counseling & psychosocial support',
        icon: HeartHandshake,
        description:
            'The Guidance and Counseling Office provides support services to help students cope with personal, academic, and emotional concerns, guiding them toward responsible decisions, improved well-being, and personal growth.',
        listLabel: 'Services',
        items: [
            'Individual / Group Counseling',
            'Testing',
            'Psychosocial Support',
            'Career Counseling / Consultation',
            'Referral Services',
        ],
    },
    {
        id: 'career',
        title: 'Career Services',
        subtitle: 'Job placement & career guidance',
        icon: Briefcase,
        description:
            'The Career and Job Placement Office assists students in preparing for employment by providing career guidance, job opportunities, and placement support, helping them build confidence and transition smoothly from school to work.',
        listLabel: 'Services',
        items: ['Career Counseling / Consultation', 'Annual Pre-employment & Job Fair'],
    },
]
