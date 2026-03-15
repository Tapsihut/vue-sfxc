export interface Program {
    id: string
    name: string
    code: string
    department: string
    description: string
    duration: string
    degree: string
    careers: string[]
    icon: string
    heroImage: string
    color: string
    routeName?: string
}

export interface College {
    id: string
    name: string
    code: string
    description: string
    heroImage: string
    color: string
    icon: string
}

export interface OtherProgram {
    name: string
    description: string
    link: string
}

const bsitPicture = 'https://placehold.co/800x800?text=800x800'

export const programs: Program[] = [
    {
        id: 'it',
        name: 'Bachelor of Science in Information Technology',
        code: 'BSIT',
        department: 'CBE',
        description:
            'Comprehensive program in software development, networking, and IT systems management.',
        duration: '4 years',
        degree: 'Bachelor of Science',
        careers: [
            'Software Developer',
            'Network Administrator',
            'Systems Analyst',
            'IT Consultant',
        ],
        icon: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
        heroImage: bsitPicture,
        color: 'bg-[#22C55E]',
    },
    {
        id: 'bsba',
        routeName: 'bsba',
        name: 'Bachelor of Science in Business Administration',
        code: 'BSBA',
        department: 'CBE',
        description:
            'Develops comprehensive business management skills and strategic thinking for modern organizations.',
        duration: '4 years',
        degree: 'Bachelor of Science',
        careers: [
            'Business Manager',
            'Operations Manager',
            'Entrepreneur',
            'Management Consultant',
        ],
        icon: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#FBBF24]',
    },
    {
        id: 'accountancy',
        name: 'Bachelor of Science in Accountancy',
        code: 'BSA',
        department: 'CBE',
        description:
            'Comprehensive program designed to produce competent certified public accountants.',
        duration: '4 years',
        degree: 'Bachelor of Science',
        careers: ['Certified Public Accountant', 'Auditor', 'Tax Consultant', 'Financial Analyst'],
        icon: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#3B82F6]',
        routeName: 'bsa',
    },
    {
        id: 'ais',
        name: 'Bachelor of Science in Accounting Information System',
        code: 'BSAIS',
        department: 'CBE',
        description:
            'Combines accounting principles with information technology for modern business solutions.',
        duration: '4 years',
        degree: 'Bachelor of Science',
        careers: ['Systems Accountant', 'IT Auditor', 'Business Analyst', 'Data Analyst'],
        icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#3B82F6]',
        routeName: 'bsais',
    },
    {
        id: 'oa',
        name: 'Bachelor of Science in Office Administration',
        code: 'BSOA',
        department: 'CBE',
        description:
            'Trains students in office management, administrative functions, and business operations.',
        duration: '4 years',
        degree: 'Bachelor of Science',
        careers: [
            'Office Manager',
            'Administrative Officer',
            'Executive Assistant',
            'Operations Coordinator',
        ],
        icon: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#A855F7]',
        routeName: 'bsoa',
    },
    {
        id: 'ia',
        name: 'Bachelor of Science in Internal Auditing',
        code: 'BSIA',
        department: 'CBE',
        description:
            'Prepares students for a career in internal auditing, risk management, and corporate governance.',
        duration: '4 years',
        degree: 'Bachelor of Science',
        careers: ['Internal Auditor', 'Risk Analyst', 'Compliance Officer', 'Fraud Investigator'],
        icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="m11 8 3 3-3 3"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#14B8A6]',
        routeName: 'bsia',
    },
    {
        id: 'ma',
        name: 'Bachelor of Science in Management Accounting',
        code: 'BSMA',
        department: 'CBE',
        description:
            'Focuses on financial planning, performance management, and strategic decision-making.',
        duration: '4 years',
        degree: 'Bachelor of Science',
        careers: [
            'Management Accountant',
            'Financial Controller',
            'Cost Consultant',
            'Business Analyst',
        ],
        icon: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#EC4899]',
        routeName: 'bsma',
    },
    {
        id: 'entrepreneurship',
        name: 'Bachelor of Science in Entrepreneurship',
        code: 'BSE',
        department: 'CBE',
        description:
            'Equips students with the mindset and skills to start, manage, and grow their own business ventures.',
        duration: '4 years',
        degree: 'Bachelor of Science',
        careers: ['Business Owner', 'Startup Founder', 'Business Consultant', 'Innovator'],
        icon: '<path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#F97316]',
        routeName: 'bse',
    },
    {
        id: 'criminology',
        name: 'Bachelor of Science in Criminology',
        code: 'BSCRIM',
        department: 'CCJE',
        description:
            'Prepares students for careers in law enforcement, crime prevention, and criminal justice system.',
        duration: '4 years',
        degree: 'Bachelor of Science',
        careers: [
            'Police Officer',
            'Criminal Investigator',
            'Forensic Specialist',
            'Security Manager',
        ],
        icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#DC2626]',
        routeName: 'criminology',
    },
    {
        id: 'bsed',
        name: 'Bachelor of Science in Secondary Education',
        code: 'BSED',
        department: 'CTE',
        description:
            'Prepares future educators for teaching various subjects in secondary education.',
        duration: '4 years',
        degree: 'Bachelor of Secondary Education',
        careers: [
            'High School Teacher',
            'Subject Specialist',
            'Curriculum Developer',
            'Education Coordinator',
        ],
        icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#1E40AF]',
        routeName: 'bsed',
    },
    {
        id: 'beed',
        name: 'Bachelor of Science in Elementary Education',
        code: 'BEED',
        department: 'CTE',
        description: 'Prepares future educators for teaching in elementary education.',
        duration: '4 years',
        degree: 'Bachelor of Elementary Education',
        careers: [
            'Elementary Teacher',
            'Education Coordinator',
            'Curriculum Developer',
            'School Administrator',
        ],
        icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#2563EB]',
        routeName: 'beed',
    },
    {
        id: 'abel',
        name: 'Bachelor of Arts in English Language',
        code: 'ABEL',
        department: 'CTE',
        description:
            'Develops comprehensive knowledge and skills in the English language, linguistic structures, and literature.',
        duration: '4 years',
        degree: 'Bachelor of Arts',
        careers: ['English Instructor', 'Writer/Editor', 'Linguist', 'Communication Specialist'],
        icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#2563EB]',
        routeName: 'abel',
    },
]

export const colleges: College[] = [
    {
        id: 'cbe',
        name: 'College of Business Education',
        code: 'CBE',
        description:
            'Empowering future business leaders and entrepreneurs with innovative management and technology skills.',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#DDA63A]',
        icon: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    },
    {
        id: 'cte',
        name: 'College of Teachers Education',
        code: 'CTE',
        description:
            'Shaping passionate educators who inspire and transform lives through quality teaching.',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#1E40AF]',
        icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    },
    {
        id: 'ccje',
        name: 'College of Criminal Justice Education',
        code: 'CCJE',
        description:
            'Training dedicated professionals committed to upholding justice, law, and public safety.',
        heroImage: 'https://placehold.co/800x800?text=800x800',
        color: 'bg-[#DC2626]',
        icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
    },
]

export const otherPrograms: OtherProgram[] = [
    {
        name: 'Unit Earner Program',
        description:
            'This program is designed for professionals who wish to earn education units to qualify for the Licensure Examination for Teachers (LET). It provides the necessary pedagogical knowledge and skills for effective teaching.',
        link: '/academics/programs/unit-earner',
    },
    {
        name: 'Technical Vocational Programs',
        description:
            'Our TechVoc programs offer practical, skills-based training aligned with industry standards. These short-course programs prepare students for immediate employment and TESDA certification.',
        link: '/academics/programs/tech-voc',
    },
    {
        name: 'Research Development Office',
        description:
            "The Research Development Office (RDO) spearheads the institution's research initiatives, fostering a culture of innovation and scholarly inquiry among faculty and students for the advancement of knowledge and community development.",
        link: '#',
    },
    {
        name: 'International Relations Office',
        description:
            'The International Relations Office (IRO) establishes global partnerships and programs, providing students and faculty with international exposure, exchange opportunities, and collaborative linkages across borders.',
        link: '/academics/international-relations',
    },
]
