import type { ProgramSection, IroUpdate } from '@/data/iroData'
import type { ProgramCoordinator } from '@/data/programTypes'

export const programDetails: ProgramSection[] = [
    {
        title: 'WHAT IS BACHELOR OF SCIENCE IN ACCOUNTING INFORMATION SYSTEM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'BSAIS is a program that blends accounting and IT, teaching students to manage and analyze financial data using technology. Graduates can become system analysts, IT auditors, or financial consultants.',
            },
        ],
    },
    {
        title: 'HOW IS BSAIS DIFFERENT FROM BSA?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'While BSA focuses on financial reporting, auditing, and preparing for the CPA Licensure Exam, BSAIS emphasizes accounting systems, data analytics, internal controls, and business technology solutions.',
            },
            {
                type: 'paragraph',
                content:
                    'BSA graduates can take the CPA board exam, while BSAIS graduates focus more on systems and IT-related accounting roles.',
            },
        ],
    },
    {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
            { type: 'paragraph', content: 'Core subjects in the BSAIS typically include:' },
            {
                type: 'list',
                items: [
                    'Financial Accounting',
                    'Managerial Accounting',
                    'Accounting Information Systems',
                    'Database Management',
                    'Auditing and Control',
                    'Business Law and Ethics',
                    'Information Technology for Accounting',
                ],
            },
        ],
    },
    {
        title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
        contentBlocks: [
            { type: 'paragraph', content: 'Students will develop skills such as:' },
            {
                type: 'list',
                items: [
                    'Financial Analysis and Reporting',
                    'Accounting System Design and Management',
                    'Database Management and Data Analysis',
                    'IT Troubleshooting and Support',
                    'Auditing and Internal Controls',
                ],
            },
        ],
    },
    {
        title: 'WHAT ARE THE POSSIBLE OCCUPATIONS AND INDUSTRIES FOR SOMEONE WITH THIS DEGREE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'BS Accounting Information System opens up roles and occupation opportunities, including:',
            },
            {
                type: 'list',
                items: [
                    'Accounting Information System Analyst',
                    'Financial Consultant',
                    'Systems Analyst',
                    'Business Intelligence Analyst',
                    'ERP Specialist',
                    'Internal Auditor',
                ],
            },
            {
                type: 'subtitle',
                content:
                    'WHAT INDUSTRIES WILL MOST LIKELY HIRE BS ACCOUNTING INFORMATION SYSTEM GRADUATES?',
            },
            {
                type: 'paragraph',
                content:
                    'BS Accounting Information System graduates are needed in various industries, including:',
            },
            {
                type: 'list',
                items: [
                    'Accounting and Finance',
                    'Information Technology',
                    'Banking and Insurance',
                    'Government',
                    'Healthcare',
                    'Manufacturing',
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
        title: 'ARE INTERNSHIPS PART OF THE PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Absolutely! The Bachelor of Science in Accounting Information System program includes a final-year internship, giving students real-world experience and a chance to apply their knowledge in industry settings.',
            },
        ],
    },
    {
        title: 'WHO SHOULD ENROLL IN BSAIS?',
        contentBlocks: [
            { type: 'paragraph', content: 'The program is ideal for students who:' },
            {
                type: 'list',
                items: [
                    'Are interested in both accounting and technology',
                    'Possess analytical and logical thinking skills',
                    'Are detail-oriented',
                    'Want to work in data-driven and technology-based environments',
                ],
            },
        ],
    },
    {
        title: 'HOW CAN I APPLY FOR THE BACHELOR OF SCIENCE IN ACCOUNTING INFORMATION SYSTEM PROGRAM?',
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
        title: 'New ERP Software Integration Workshop',
        date: 'March 20, 2026',
        excerpt:
            'BSAIS students participated in a comprehensive hands-on workshop focused on implementing and managing modern cloud-based ERP systems.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'CBE Department',
        category: 'Event',
    },
    {
        id: 2,
        title: 'Alumni Tech Spotlight: Financial Systems Architect',
        date: 'February 15, 2026',
        excerpt:
            'Discover how our BSAIS alumni are leading digital transformation initiatives as Financial Systems Architects in top tech firms.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Alumni Network',
        category: 'Feature',
    },
    {
        id: 3,
        title: 'Data Analytics Certification Program Launch',
        date: 'January 10, 2026',
        excerpt:
            'The college successfully launched a new specialized module offering professional certifications in accounting data analytics for senior students.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Academic Affairs',
        category: 'Curriculum',
    },
]

export const coordinator: ProgramCoordinator = {
    name: 'FERRIZA BIANCA ABAN',
    role: 'Program Coordinator, BSAIS',
    image: 'https://placehold.co/600x600/000000/FFFFFF?text=600x600',
    contacts: [
        { label: 'Email', value: 'Faban@sfxc.edu.ph' },
        { label: 'Mobile', value: '09484015619' },
    ],
}
