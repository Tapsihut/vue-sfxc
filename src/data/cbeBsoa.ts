import type { ProgramSection, IroUpdate } from '@/data/iroData'
import type { ProgramCoordinator } from '@/data/programTypes'

export const programDetails: ProgramSection[] = [
    {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
            { type: 'paragraph', content: 'Core subjects typically include:' },
            {
                type: 'list',
                items: [
                    'Office Management',
                    'Business Communication',
                    'Office Technology and Software',
                    'Human Resource Management',
                    'Organizational Behavior',
                    'Records and Information Management',
                    'Accounting for Office Administration',
                    'Business Law and Ethics',
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
                    'Organization',
                    'Communication',
                    'Problem-Solving',
                    'Leadership',
                    'Tech Proficiency',
                    'Data Management',
                    'Customer Service',
                ],
            },
        ],
    },
    {
        title: 'WHAT ARE THE POSSIBLE OCCUPATIONS AND INDUSTRIES FOR SOMEONE WITH THIS PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content: 'BS in Office Administration opens up roles and occupation:',
            },
            {
                type: 'list',
                items: [
                    'Administrative Assistant',
                    'Office Manager',
                    'Executive Assistant',
                    'HR Coordinator',
                    'Customer Service Manager',
                    'Records Manager',
                    'Project Coordinator',
                ],
            },
            {
                type: 'subtitle',
                content:
                    'WHAT INDUSTRIES WILL MOST LIKELY HIRE BS IN OFFICE ADMINISTRATION GRADUATES?',
            },
            {
                type: 'paragraph',
                content:
                    'BS in Office Administration graduates are needed in various industries, including:',
            },
            {
                type: 'list',
                items: [
                    'Corporate/Business',
                    'Healthcare',
                    'Government',
                    'Education',
                    'Finance and Banking',
                    'Hospitality and Tourism',
                    'Non-profit Organizations',
                    'Legal Services',
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
                    'Absolutely! The Bachelor of Science in Office Administration includes an internship component where students gain hands-on experience in real-world settings. Internships typically take place in the final year of the program and provide students with valuable exposure to the industry, helping them apply theoretical knowledge to practical challenges.',
            },
        ],
    },
    {
        title: 'HOW CAN I ENHANCE MY EMPLOYABILITY AFTER GRADUATION?',
        contentBlocks: [
            { type: 'paragraph', content: 'Graduates can enhance their employability by:' },
            {
                type: 'list',
                items: [
                    'Acquire hands-on experience through internships or part-time work.',
                    'Earn certifications relevant to your field.',
                    'Expand your professional network.',
                    'Cultivate high-demand skills.',
                    'Explore opportunities for international exposure.',
                    'Strengthen your resume and online profile.',
                    'Consider advanced education or specialized training.',
                    'Keep up with the latest industry developments.',
                ],
            },
        ],
    },
    {
        title: 'WHAT FURTHER EDUCATION OPTIONS ARE AVAILABLE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'To further a career in BS in Office Administration, graduates may pursue:',
            },
            {
                type: 'list',
                items: [
                    "Master's in Business Administration (MBA)",
                    "Master's in Human Resource Management",
                    "Master's in Office Management or Administration",
                    'Specialized Certifications (e.g., Project Management, HR, or IT)',
                    'Professional Development Courses in Business, Leadership, or Technology',
                ],
            },
        ],
    },
    {
        title: 'CAN I PURSUE THIS ONLINE AT ST. FRANCIS XAVIER COLLEGE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'At St. Francis Xavier College, the BS in Office Administration is offered as a blended program, combining both face-to-face, in-person classes and online learning. This flexible approach ensures that students benefit from hands-on experiences, direct interaction with faculty, and collaborative activities with peers while also accommodating the convenience of online education for certain aspects of the curriculum.',
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
        title: 'WHAT ARE THE PRE-REQUISITES FOR ADMISSION?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'To be eligible for admission in the BS in Office Administration program, applicants must meet the following requirements:',
            },
            {
                type: 'list',
                items: [
                    'High School Diploma or its equivalent',
                    'Completed Application Form',
                    'Submission of required documents such as Birth Certificate, and Transcript of Records (for transferees).',
                ],
            },
        ],
    },
    {
        title: 'HOW CAN I APPLY FOR THE BACHELOR OF SCIENCE IN OFFICE ADMINISTRATION?',
        contentBlocks: [
            {
                type: 'html',
                content:
                    'To enroll, <a href="/admission/requirements#enrollment" class="text-primary hover:underline font-bold">click here</a> to learn more.',
            },
            {
                type: 'paragraph',
                content:
                    'Interested applicants are encouraged to submit their applications through the Admission and Scholarship Office. They can provide further information and assistance with the application process. Please ensure that all required documents are submitted before the deadline to be considered for admission.',
            },
            {
                type: 'paragraph',
                content:
                    'For further inquiries, kindly visit or contact offices any time between 8:00 AM to 5:00 PM, Monday to Friday.',
            },
            {
                type: 'html',
                content:
                    '<div class="mt-4"><strong class="text-foreground">𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC Scholarship Office<br>Email: Admission.scholarship@sfxc.edu.ph</div>',
            },
            {
                type: 'html',
                content:
                    '<div class="mt-2"><strong class="text-foreground">𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑\'𝐒 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC - Registrar\'s Office<br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>',
            },
        ],
    },
    {
        title: 'HOW CAN I CONTACT THE BACHELOR OF SCIENCE IN OFFICE ADMINISTRATION PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'For inquiries regarding the Bachelor of Science in Office Administration program, please contact us at bsoa@sfxc.edu.ph.',
            },
        ],
    },
]

export const programUpdates: IroUpdate[] = [
    {
        id: 1,
        title: 'Office Administration Week 2026',
        date: 'March 15, 2026',
        excerpt:
            'Join us as we celebrate the Office Administration Week with seminars, skills competitions, and a keynote speech from industry experts.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'CBE Department',
        category: 'Event',
    },
    {
        id: 2,
        title: 'New Virtual Assistant Certification Integration',
        date: 'February 28, 2026',
        excerpt:
            'The BSOA program is proud to announce a new partnership that integrates specialized Virtual Assistant certification within our curriculum.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Academic Affairs',
        category: 'Curriculum',
    },
    {
        id: 3,
        title: 'Alumni Spotlight: Managing Multinational Operations',
        date: 'January 20, 2026',
        excerpt:
            'Read about how our BSOA alumni are leading operational and administrative functions across global corporate offices.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Alumni Network',
        category: 'Feature',
    },
]

export const programHead: ProgramCoordinator = {
    name: 'Robert Ian P. Rivera',
    role: 'Program Head, BSOA',
    image: 'https://placehold.co/600x600/000000/FFFFFF?text=600x600',
    contacts: [
        { label: 'Email', value: 'bsoa@sfxc.edu.ph' },
        { label: 'Phone', value: '(085) 123-4567 loc 101' },
        { label: 'Location', value: 'CBE Building, 2nd Floor\nSaint Francis Xavier College' },
    ],
}

export const governor: ProgramCoordinator = {
    name: 'Novie Marie Cabigquiz',
    role: 'Governor, BSOA',
    image: 'https://placehold.co/600x600/000000/FFFFFF?text=600x600',
    contacts: [{ label: 'Email', value: 'cabigquiz.noviemarie@sfxc.edu.ph' }],
}
