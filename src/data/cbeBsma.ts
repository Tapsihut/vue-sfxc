import type { ProgramSection, IroUpdate } from '@/data/iroData'
import type { ProgramCoordinator } from '@/data/programTypes'

export const programDetails: ProgramSection[] = [
    {
        title: 'WHAT IS BACHELOR OF SCIENCE IN MANAGEMENT ACCOUNTING?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The Bachelor of Science in Management Accounting is an undergraduate program that teaches students how to manage financial information to aid business decision-making. It focuses on budgeting, cost management, financial analysis, and performance evaluation to improve organizational efficiency and profitability.',
            },
        ],
    },
    {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
            { type: 'paragraph', content: 'Core subjects in the BS MA typically include:' },
            {
                type: 'list',
                items: [
                    'Financial Accounting',
                    'Managerial Accounting',
                    'Cost Accounting',
                    'Financial Management',
                    'Budgeting and Forecasting',
                    'Business Law and Ethics',
                    'Management Information Systems',
                    'Strategic Management',
                    'Taxation',
                    'Internal Control Systems',
                ],
            },
        ],
    },
    {
        title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
        contentBlocks: [
            { type: 'paragraph', content: 'Key skills developed during the course include:' },
            {
                type: 'list',
                items: [
                    'Financial analysis and reporting',
                    'Budgeting and cost management',
                    'Problem-solving and decision-making',
                    'Strategic planning',
                    'Attention to detail and accuracy',
                    'Effective communication and reporting',
                    'Knowledge of accounting software and tools',
                ],
            },
        ],
    },
    {
        title: 'HOW IS BSMA DIFFERENT FROM BSA?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'BSMA emphasizes internal business processes, budgeting, and managerial decision-making. In contrast, the Bachelor of Science in Accountancy (BSA) focuses on financial reporting, taxation, and external auditing and qualifies graduates to take the CPA Licensure Examination administered by the Professional Regulation Commission.',
            },
        ],
    },
    {
        title: 'WHAT CAREER OPPORTUNITIES ARE AVAILABLE FOR BSMA GRADUATES?',
        contentBlocks: [
            { type: 'paragraph', content: 'Graduates may pursue careers as:' },
            {
                type: 'list',
                items: [
                    'Management Accountant',
                    'Budget Analyst',
                    'Financial Analyst',
                    'Cost Accountant',
                    'Business Analyst',
                    'Accounting Officer',
                    'Corporate Planning Associate',
                ],
            },
        ],
    },
    {
        title: 'WHAT IS THE TYPICAL DURATION OF THE PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The program typically takes four years to complete for full-time students, while part-time students may need more time based on their course load.',
            },
        ],
    },
    {
        title: 'IS BSMA A GOOD CAREER CHOICE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Yes. Organizations require professionals who can analyze costs, manage budgets, and support strategic decisions. BSMA graduates play a key role in business growth and financial sustainability.',
            },
        ],
    },
    {
        title: 'WHAT FURTHER EDUCATION OPTIONS ARE AVAILABLE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content: 'To further a career in BS Management Accounting, graduates may pursue:',
            },
            {
                type: 'list',
                items: [
                    'Certified Management Accountant (CMA)',
                    "Master's in Accounting or Finance",
                    "Master's in Business Administration (MBA)",
                    'Certified Public Accountant (CPA)',
                    'Chartered Financial Analyst (CFA)',
                    'Postgraduate Diplomas in Taxation or Business Management',
                ],
            },
        ],
    },
    {
        title: 'ARE INTERNSHIPS PART OF THE PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Absolutely! The Bachelor of Science in Management Accounting includes an internship component where students gain hands-on experience in real-world settings. Internships typically take place in the final year of the program and provide students with valuable exposure to the industry, helping them apply theoretical knowledge to practical challenges.',
            },
        ],
    },
    {
        title: 'WHO SHOULD ENROLL IN BSMA?',
        contentBlocks: [
            { type: 'paragraph', content: 'The program is ideal for students who:' },
            {
                type: 'list',
                items: [
                    'Are interested in business strategy and financial planning',
                    'Possess analytical and logical thinking skills',
                    'Want to work in corporate finance or management roles',
                    'Prefer internal business analysis over external auditing',
                ],
            },
        ],
    },
    {
        title: 'HOW CAN I APPLY FOR THE BACHELOR OF SCIENCE IN MANAGEMENT ACCOUNTING?',
        contentBlocks: [
            {
                type: 'html',
                content:
                    'To enroll, <a href="/admission/requirements#enrollment" class="text-primary hover:underline font-bold">click here</a> to learn more.',
            },
            {
                type: 'paragraph',
                content:
                    'Interested applicants are encouraged to submit their applications using the contact details provided below or visit the Admission and Scholarship Office for further information and assistance with the application process. Please ensure that all required documents are submitted before the deadline to be considered for admission.',
            },
            {
                type: 'paragraph',
                content:
                    'For further inquiries, kindly visit or contact offices any time between 8:00 AM to 5:00 PM, Monday to Friday.',
            },
            {
                type: 'html',
                content:
                    '<div class="mt-4"><strong class="text-foreground">𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC Scholarship Office<br>Email: Admission.scholarship@sfxc.edu.ph<br>Mobile: 0908 885 5380</div>',
            },
            {
                type: 'html',
                content:
                    '<div class="mt-2"><strong class="text-foreground">𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑\'𝐒 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC - Registrar\'s Office<br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>',
            },
        ],
    },
]

export const programUpdates: IroUpdate[] = [
    {
        id: 1,
        title: 'Management Accounting Seminar 2026',
        date: 'May 14, 2026',
        excerpt:
            'An event focused on strategic financial modeling, bringing together industry experts and future management accountants.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'CBE Department',
        category: 'Event',
    },
    {
        id: 2,
        title: 'CMA Pathway Partnership Announcement',
        date: 'April 02, 2026',
        excerpt:
            'SFXC officially partners with international CMA review providers to support BSMA students aiming for global certification.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Academic Affairs',
        category: 'Partnership',
    },
    {
        id: 3,
        title: 'Alumni Success in Global Corporations',
        date: 'March 18, 2026',
        excerpt:
            'Discover how our BSMA graduates are steering financial directions for top multinational companies.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Alumni Network',
        category: 'Feature',
    },
]

export interface QuickFact {
    icon: string
    label: string
    value: string
}

export const quickFacts: QuickFact[] = [
    {
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        label: 'Duration',
        value: '4 Years',
    },
    {
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        label: 'Format',
        value: 'Full-time, Blended Learning',
    },
    {
        icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        label: 'Career Path',
        value: 'Financial Analysis, Management Accounting, Corporate Planning',
    },
]

export const coordinator: ProgramCoordinator = {
    name: 'FERRIZA BIANCA ABAN',
    role: 'Program Coordinator, BSMA',
    image: 'https://placehold.co/600x600/000000/FFFFFF?text=600x600',
    contacts: [
        { label: 'Email', value: 'Faban@sfxc.edu.ph' },
        { label: 'Phone', value: '0948 401 5619' },
        { label: 'Location', value: 'CBE Building, 2nd Floor\nSaint Francis Xavier College' },
    ],
}
