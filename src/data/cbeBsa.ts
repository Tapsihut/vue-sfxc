import type { ProgramSection } from '@/data/iroData'
import type { IroUpdate } from '@/data/iroData'
import type { ProgramCoordinator } from '@/data/programTypes'

export const programDetails: ProgramSection[] = [
    {
        title: 'WHAT SUBJECTS WILL I STUDY IN BSA?',
        contentBlocks: [
            { type: 'paragraph', content: 'Major subjects include:' },
            {
                type: 'list',
                items: [
                    'Financial Accounting and Reporting',
                    'Cost Accounting',
                    'Auditing',
                    'Taxation',
                    'Business Law',
                    'Management Advisory Services',
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
                    'Financial Analysis and Reporting',
                    'Budgeting and Financial Planning',
                    'Tax Preparation and Compliance',
                    'Auditing and Internal Control',
                    'Critical Thinking and Problem-Solving',
                    'Attention to Detail',
                    'Proficiency in Accounting Software',
                ],
            },
        ],
    },
    {
        title: 'WHAT CAREER OPPORTUNITIES AWAIT BSA GRADUATES?',
        contentBlocks: [
            { type: 'paragraph', content: 'Our graduates are empowered to become:' },
            {
                type: 'list',
                items: [
                    'Certified Public Accountant (after passing the CPA Licensure Exam)',
                    'Auditor',
                    'Tax Consultant',
                    'Financial Analyst',
                    'Accountant in private or government sectors',
                    'Accounting Officer',
                    'Budget Analyst',
                ],
            },
        ],
    },
    {
        title: 'IS BSA A CHALLENGING PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Yes. BSA is academically rigorous and requires discipline, strong analytical ability, and commitment. Retention policies may apply to ensure academic standards and readiness for the board examination.',
            },
        ],
    },
    {
        title: 'WHAT CAREER OPPORTUNITIES ARE AVAILABLE AFTER GRADUATION?',
        contentBlocks: [
            { type: 'paragraph', content: 'BSA graduates may pursue careers as:' },
            {
                type: 'list',
                items: [
                    'Certified Public Accountant (CPA)',
                    'External Auditor',
                    'Internal Auditor',
                    'Tax Consultant',
                    'Financial Analyst',
                    'Accountant in private or government institutions',
                    'Accounting Officer',
                ],
            },
            {
                type: 'paragraph',
                content:
                    'Graduates may also pursue careers in banking, corporate finance, entrepreneurship, or law.',
            },
        ],
    },
    {
        title: 'WHAT MAKES BSA A STRONG CAREER CHOICE?',
        contentBlocks: [
            { type: 'paragraph', content: 'The BSA program offers:' },
            {
                type: 'list',
                items: [
                    'High employability',
                    'Competitive salary opportunities',
                    'Strong foundation in business and finance',
                    'Clear pathway to professional licensure',
                    'Long-term career growth',
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
                    'The program typically takes five years to complete for full-time students, while part-time students may need more time based on their course load.',
            },
        ],
    },
    {
        title: 'CAN BSA GRADUATES TAKE THE CPA LICENSURE EXAMINATION?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Yes! After completing the BSA degree, graduates are qualified to take the CPA Licensure Examination administered by the Professional Regulation Commission.',
            },
        ],
    },
    {
        title: 'IS THERE ON-THE-JOB TRAINING (OJT)?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Yes. Students undergo internship or practicum training in accounting firms, private companies, or government offices to gain real-world experience.',
            },
        ],
    },
    {
        title: 'WHO SHOULD ENROLL IN BSA?',
        contentBlocks: [
            { type: 'paragraph', content: 'The program is suitable for students who:' },
            {
                type: 'list',
                items: [
                    'Are detail-oriented and organized',
                    'Have strong analytical and logical skills',
                    'Are committed to professional integrity',
                    'Are interested in finance, auditing, and business operations',
                ],
            },
        ],
    },
    {
        title: 'HOW CAN I APPLY FOR THE BACHELOR OF SCIENCE IN ACCOUNTANCY PROGRAM?',
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
        title: 'CPA Licensure Examination Topnotchers',
        date: 'March 15, 2026',
        excerpt:
            'Congratulations to our latest batch of Certified Public Accountants who successfully passed the board examination.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'CBE Department',
        category: 'Achievement',
    },
    {
        id: 2,
        title: 'Annual Accounting Quiz Bowl',
        date: 'February 28, 2026',
        excerpt:
            "Test your knowledge in financial accounting, auditing, and taxation at this year's collegiate accounting quiz bowl.",
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'JPIA Society',
        category: 'Event',
    },
    {
        id: 3,
        title: 'Audit Firm Partnership Announced',
        date: 'January 20, 2026',
        excerpt:
            'The BSA program is proud to partner with a top 4 audit firm to provide internship opportunities for our senior students.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Academic Affairs',
        category: 'Partnership',
    },
]

export const coordinator: ProgramCoordinator = {
    name: 'FERRIZA BIANCA ABAN',
    role: 'Program Coordinator, BSA',
    image: 'https://placehold.co/600x600/000000/FFFFFF?text=600x600',
    contacts: [
        { label: 'Email', value: 'Faban@sfxc.edu.ph' },
        { label: 'Mobile', value: '09484015619' },
    ],
}
