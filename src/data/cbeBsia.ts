import type { ProgramSection, IroUpdate } from '@/data/iroData'
import type { ProgramCoordinator } from '@/data/programTypes'

export const programDetails: ProgramSection[] = [
    {
        title: 'WHAT IS BACHELOR OF SCIENCE IN INTERNAL AUDITING?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The Bachelor of Science in Internal Auditing is an undergraduate program that teaches students how to assess and improve organizational operations, internal controls, and risk management. It focuses on auditing techniques, financial principles, and business ethics to help identify risks and ensure compliance.',
            },
        ],
    },
    {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content: 'Core subjects in the BS Internal Auditing typically include:',
            },
            {
                type: 'list',
                items: [
                    'Financial Accounting',
                    'Managerial Accounting',
                    'Internal Auditing Principles',
                    'Risk Management',
                    'Internal Control Systems',
                    'Information Systems Auditing',
                    'Taxation and Compliance',
                ],
            },
        ],
    },
    {
        title: 'WHAT DOES AN INTERNAL AUDITOR DO?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    "An Internal Auditor examines and evaluates a company's internal controls, financial records, and operational processes to ensure efficiency, compliance, and risk mitigation. They help organizations prevent fraud, improve performance, and strengthen governance systems.",
            },
        ],
    },
    {
        title: 'WHAT IS THE DIFFERENCE BETWEEN INTERNAL AUDITING AND ACCOUNTANCY?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Internal Auditing focuses on risk assessment, internal control evaluation, and organizational improvement. Accountancy focuses on financial reporting, taxation, and external auditing, and qualifies graduates to take the CPA Licensure Examination under the Professional Regulation Commission.',
            },
        ],
    },
    {
        title: 'WHAT CAREER OPPORTUNITIES ARE AVAILABLE FOR BSIA GRADUATES?',
        contentBlocks: [
            { type: 'paragraph', content: 'Graduates may pursue careers as:' },
            {
                type: 'list',
                items: [
                    'Internal Auditor',
                    'Risk Management Officer',
                    'Compliance Officer',
                    'Fraud Examiner',
                    'Audit Associate',
                    'Control Analyst',
                    'Corporate Governance Officer',
                ],
            },
        ],
    },
    {
        title: 'WHAT INDUSTRIES WILL MOST LIKELY HIRE BS INTERNAL AUDITING GRADUATES?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'BS Internal Auditing graduates are needed in various industries, including:',
            },
            {
                type: 'list',
                items: [
                    'Finance and Banking',
                    'Healthcare',
                    'Government',
                    'Insurance',
                    'Manufacturing',
                    'Consulting',
                    'Telecommunications',
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
        title: 'IS BSIA A GOOD CAREER CHOICE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Yes. With increasing emphasis on corporate governance, transparency, and risk management, internal auditors are in high demand across industries.',
            },
        ],
    },
    {
        title: 'WHO SHOULD TAKE BSIA?',
        contentBlocks: [
            { type: 'paragraph', content: 'BSIA is ideal for students who:' },
            {
                type: 'list',
                items: [
                    'Have strong analytical and critical thinking skills',
                    'Are detail-oriented',
                    'Value integrity and ethical standards',
                    'Are interested in business processes and risk management',
                ],
            },
        ],
    },
    {
        title: 'WHAT FURTHER EDUCATION OPTIONS ARE AVAILABLE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content: 'To further a career in BS Internal Auditing, graduates may pursue:',
            },
            {
                type: 'list',
                items: [
                    'Certified Internal Auditor (CIA) Certification',
                    "Master's in Accounting or Finance",
                    "Master's in Business Administration (MBA)",
                    'Certified Fraud Examiner (CFE)',
                    'Certified Information Systems Auditor (CISA)',
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
                    'Absolutely! The Bachelor of Science in Internal Auditing program includes an internship component where students gain hands-on experience in real-world settings. Internships typically take place in the final year of the program and provide students with valuable exposure to the industry, helping them apply theoretical knowledge to practical challenges.',
            },
        ],
    },
    {
        title: 'HOW CAN I APPLY FOR THE BACHELOR OF SCIENCE IN INTERNAL AUDITING?',
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
        title: 'Future Auditors Conference 2026',
        date: 'April 10, 2026',
        excerpt:
            'Join our annual internal auditing symposium featuring keynote speakers from top auditing agencies and risk management firms.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'CBE Department',
        category: 'Event',
    },
    {
        id: 2,
        title: 'Risk Management Innovation Challenge',
        date: 'March 05, 2026',
        excerpt:
            "Students showcased their skills in proposing comprehensive corporate governance controls in this year's innovation challenge.",
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Academic Affairs',
        category: 'Competition',
    },
    {
        id: 3,
        title: 'Alumni Insight: A Career in Chief Auditing',
        date: 'February 12, 2026',
        excerpt:
            'Catch up with our successful BSIA alumni as they share their journeys to becoming leading Chief Audit Executives.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Alumni Network',
        category: 'Feature',
    },
]

export const coordinator: ProgramCoordinator = {
    name: 'FERRIZA BIANCA ABAN',
    role: 'Program Coordinator, BSIA',
    image: 'https://placehold.co/600x600/000000/FFFFFF?text=600x600',
    contacts: [
        { label: 'Email', value: 'Faban@sfxc.edu.ph' },
        { label: 'Phone', value: '0948 401 5619' },
        { label: 'Location', value: 'CBE Building, 2nd Floor\nSaint Francis Xavier College' },
    ],
}
