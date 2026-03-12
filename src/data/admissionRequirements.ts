export interface Requirement {
    name: string
    description: string
}

export interface Course {
    name: string
    description: string
}

export interface Program {
    id: string
    title: string
    question: string
    collegeName: string
    image: string
    courses: Course[]
}

export const programs: Program[] = [
    {
        id: 'abel',
        title: 'ARTS AND SCIENCES',
        question: 'Interested in Language, Communication, and Creative Thinking?',
        collegeName: 'College of Arts and Sciences',
        image: 'https://placehold.co/600x400',
        courses: [
            {
                name: 'Bachelor of Arts in English Language (ABEL)',
                description:
                    'ABEL is ideal for students who love reading, writing, and expressing ideas. This program develops strong communication, critical thinking, and analytical skills. Graduates may pursue careers in education, writing, media, corporate communication, content creation, or further studies in law and graduate school. If you enjoy working with words and ideas, this course can open many doors.',
            },
        ],
    },
    {
        id: 'cte',
        title: 'TEACHER EDUCATION',
        question: 'Are you an Aspiring Teacher or Educator?',
        collegeName: 'College of Teacher Education',
        image: 'https://placehold.co/600x400',
        courses: [
            {
                name: 'Bachelor of Elementary Education (BEEd)',
                description:
                    "BEEd is designed for students who want to teach and inspire young learners. This program focuses on child development, teaching strategies, and classroom management. It is best suited for individuals who are patient, creative, and passionate about shaping children's foundational learning years.",
            },
            {
                name: 'Bachelor of Secondary Education (BSEd) – English',
                description:
                    'This program prepares students to teach English at the secondary level. It is ideal for those who enjoy literature, language, and communication and want to help students develop confidence in speaking, reading, and writing.',
            },
            {
                name: 'Bachelor of Secondary Education (BSEd) – Mathematics',
                description:
                    'BSEd Math is for students who enjoy numbers, logic, and problem-solving. The program trains future math educators to explain complex concepts clearly and effectively, preparing them for teaching careers in secondary schools.',
            },
        ],
    },
    {
        id: 'ccje',
        title: 'CRIMINAL JUSTICE EDUCATION',
        question: 'Do you value Public Service, Law, and Community Safety?',
        collegeName: 'College of Criminal Justice Education',
        image: 'https://placehold.co/600x400',
        courses: [
            {
                name: 'Bachelor of Science in Criminology',
                description:
                    'BS Criminology is suited for students interested in law enforcement, public safety, and the criminal justice system. The program provides foundational knowledge in crime prevention, investigation, and correctional administration. Graduates may pursue careers in law enforcement agencies, forensic services, or public safety institutions.',
            },
        ],
    },
    {
        id: 'ctom',
        title: 'TECHNOLOGY & OFFICE MANAGEMENT',
        question: 'Are you excited by Office Management, Technology, and Systems?',
        collegeName: 'College of Technology & Office Management',
        image: 'https://placehold.co/600x400',
        courses: [
            {
                name: 'Bachelor of Science in Office Administration',
                description:
                    'This program prepares students for professional administrative and office-based roles. It focuses on office procedures, records management, and organizational skills—ideal for students who are detail-oriented, organized, and comfortable working in professional environments.',
            },
            {
                name: 'Bachelor of Science in Information Technology',
                description:
                    'BS Information Technology is for students who are interested in computers, systems, and digital solutions. The program covers programming, networking, and information systems, preparing graduates for careers in the fast-growing tech industry.',
            },
        ],
    },
    {
        id: 'cbe-accounting',
        title: 'BUSINESS EDUCATION',
        question: 'Do Money Matters like Accounting, Finance, and Financial Analysis interest you?',
        collegeName: 'College of Business Education',
        image: 'https://placehold.co/600x400',
        courses: [
            {
                name: 'Bachelor of Science in Accountancy',
                description:
                    'This program is designed for students aiming to become Certified Public Accountants (CPAs). It requires discipline, analytical thinking, and strong numerical skills, and prepares graduates for professional accounting and auditing careers.',
            },
            {
                name: 'Bachelor of Science in Accounting Information System',
                description:
                    'This course combines accounting principles with information technology. It is ideal for students who want to work with computerized accounting systems and financial data management.',
            },
            {
                name: 'Bachelor of Science in Internal Auditing',
                description:
                    'BS Internal Auditing focuses on risk management, compliance, and internal control systems. It is suited for students who are analytical, detail-oriented, and committed to ethical standards.',
            },
            {
                name: 'Bachelor of Science in Management Accounting',
                description:
                    'This program emphasizes financial planning, budgeting, and decision-making. Graduates support management by providing financial insights that guide business strategies.',
            },
        ],
    },
    {
        id: 'cbe-business',
        title: 'BUSINESS EDUCATION',
        question: 'Do you have a penchant for Business, Leadership, and Entrepreneurship?',
        collegeName: 'College of Business Education',
        image: 'https://placehold.co/600x400',
        courses: [
            {
                name: 'Bachelor of Science in Entrepreneurship',
                description:
                    'BS Entrepreneurship is ideal for students who dream of starting and managing their own business. The program develops creativity, innovation, and business planning skills, preparing students for entrepreneurial ventures and enterprise management.',
            },
            {
                name: 'Bachelor of Science in Business Administration',
                description:
                    'This flexible program prepares students for various roles in the business world. Students may choose a specialization that fits their interests and career goals: Financial Management, Marketing Management, Operations Management, Human Resources Management, or Business Economics.',
            },
        ],
    },
]

export const freshmenRequirements: Requirement[] = [
    { name: 'Form 138 (Report Card)', description: 'Original copy from senior high school' },
    { name: 'Certificate of Good Moral Character', description: 'From previous school' },
    { name: 'PSA Birth Certificate', description: 'Photocopy of the Philippine Statistics Authority (PSA) Birth Certificate' },
    { name: '2x2 ID Pictures', description: 'Four (4) pieces of 2x2 colored picture (white background)' },
    { name: 'Brown Envelopes', description: 'Four (4) long brown envelopes' },
    { name: 'Note', description: 'Form 137-A will be officially requested by the Office of the Registrar.' },
]

export const transfereeRequirements: Requirement[] = [
    { name: 'Certificate of Transfer Credential', description: 'Transfer credentials certificate' },
    { name: 'Transcript of Records', description: 'Informative Copy of Transcript of Records for Evaluation' },
    { name: 'Certificate of Good Moral Character', description: 'From previous institution' },
    { name: 'PSA Birth Certificate', description: 'Photocopy of PSA Birth Certificate' },
    { name: '2x2 ID Pictures', description: 'Four (4) pieces of 2x2 colored picture' },
    { name: 'Mailing Envelopes', description: 'Four (4) mailing envelopes (long size)' },
    { name: 'Brown Envelopes', description: 'Four (4) brown envelopes (long size)' },
]

export const crossEnrolleeRequirements: Requirement[] = [
    {
        name: 'Certificate to Cross-Enroll',
        description:
            'Issued by home institution, signed by the Registrar, indicating total units and subjects to be taken.',
    },
]

export const internationalRequirements: Requirement[] = [
    { name: 'Personal Appearance', description: 'Required for all foreign applicants' },
    { name: 'Letter of Intent', description: 'Formal letter expressing intent to study' },
    { name: 'Official Transcript of Records', description: 'Authenticated by the Philippine Embassy in the country of origin' },
    { name: 'Affidavit of Support', description: 'By parent/guardian (authenticated at the Philippine Embassy)' },
    { name: 'Passport', description: 'A photocopy of a passport valid for at least six (6) months' },
    { name: '2x2 ID Pictures', description: 'Two (2) pieces of 2x2 colored photos' },
    { name: 'Application Form', description: 'Duly accomplished Personal History Statement or Application Form' },
    { name: 'Certificate of Good Moral Character', description: 'Authenticated copy' },
    { name: 'Medical Health Certificate', description: 'With chest X-ray, HIV, and Hepatitis-B results' },
    { name: 'Quarantine Medical Examination', description: 'Results from examination' },
    { name: 'English Proficiency Test', description: 'Non-native English speakers must pass or attend a tutorial' },
    { name: 'NICA Clearance', description: 'National Intelligence Coordinating Agency clearance' },
]

export interface EnrollmentStep {
    step: number
    title: string
    description: string
}

export const enrollmentSteps: EnrollmentStep[] = [
    {
        step: 1,
        title: 'Student Information Profile',
        description:
            'Visit the Admission & Scholarship Office for profiling. Submit required documents. Old students must update profiles. Undergo medical history interview at the Clinic. Sign routing form.',
    },
    {
        step: 2,
        title: 'Payment of Registration Fee',
        description:
            'Proceed to Cashier. Option 1: ECPay Partner Outlets (7/11, Gaisano, etc.) - send receipt photo to Accounts and Finance FB. Option 2: Over-the-counter at Cashier. Sign routing form.',
    },
    {
        step: 3,
        title: 'Enlisting of Intended Subjects',
        description:
            'Visit department office. Enlist subjects according to program. Secure evaluation and approval from Dean/Program Head. Sign routing form.',
    },
    {
        step: 4,
        title: 'Validation of Payment and Enrollment',
        description:
            'Proceed to Assessment Office. Office will assess total enrolled units and validate enrollment registration. Sign routing form.',
    },
    {
        step: 5,
        title: 'Release of School ID',
        description:
            'Visit OSAS. Fill out School ID form and submit 2x2 picture with clear background. Receive School ID. Sign routing form.',
    },
]
