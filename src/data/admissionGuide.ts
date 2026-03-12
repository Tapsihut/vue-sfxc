export interface Interest {
    id: string
    title: string
    description: string
    courses: string[]
}

export interface CourseRecommendation {
    name: string
    code: string
    matchReason: string
    careers: string[]
    skills: string[]
}

export const interests: Interest[] = [
    {
        id: 'technology',
        title: 'Technology & Innovation',
        description: 'I enjoy working with computers, coding, and emerging technologies',
        courses: ['BSIT', 'BSAIS'],
    },
    {
        id: 'business',
        title: 'Business & Entrepreneurship',
        description: 'I am interested in starting businesses and managing organizations',
        courses: ['BSBA', 'BSOA'],
    },
    {
        id: 'numbers',
        title: 'Numbers & Analytics',
        description: 'I like working with data, calculations, and financial analysis',
        courses: ['BSA', 'BSAIS'],
    },
    {
        id: 'helping',
        title: 'Helping & Teaching',
        description: 'I want to make a difference by educating and guiding others',
        courses: ['BEED', 'BSED'],
    },
    {
        id: 'service',
        title: 'Public Service & Safety',
        description: 'I am passionate about law enforcement and community protection',
        courses: ['BSCRIM'],
    },
    {
        id: 'hospitality',
        title: 'Hospitality & Tourism',
        description: 'I enjoy customer service, travel, and hotel management',
        courses: ['BSHM'],
    },
    {
        id: 'creative',
        title: 'Creative & Design',
        description: 'I like expressing ideas through art, design, and creativity',
        courses: ['BSIT', 'BSHM'],
    },
    {
        id: 'leadership',
        title: 'Leadership & Management',
        description: 'I am good at leading teams and organizing projects',
        courses: ['BSBA', 'BSOA', 'BSCRIM'],
    },
]

export const courseDatabase: Record<string, CourseRecommendation> = {
    BSIT: {
        name: 'Bachelor of Science in Information Technology',
        code: 'BSIT',
        matchReason: 'Perfect for tech enthusiasts who want to build software and manage IT systems',
        careers: ['Software Developer', 'Network Administrator', 'Systems Analyst', 'IT Consultant'],
        skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Technical Analysis'],
    },
    BSBA: {
        name: 'Bachelor of Science in Business Administration',
        code: 'BSBA',
        matchReason: 'Ideal for those who want to lead organizations and develop business strategies',
        careers: ['Business Manager', 'Operations Manager', 'Entrepreneur', 'Management Consultant'],
        skills: ['Leadership', 'Strategic Planning', 'Communication', 'Decision Making'],
    },
    BSA: {
        name: 'Bachelor of Science in Accountancy',
        code: 'BSA',
        matchReason: 'Best choice for those who excel in mathematics and financial analysis',
        careers: ['Certified Public Accountant', 'Auditor', 'Tax Consultant', 'Financial Analyst'],
        skills: ['Attention to Detail', 'Analytical Thinking', 'Ethics', 'Financial Management'],
    },
    BSAIS: {
        name: 'Bachelor of Science in Accounting Information System',
        code: 'BSAIS',
        matchReason: 'Combines technology and accounting for modern business solutions',
        careers: ['Systems Accountant', 'IT Auditor', 'Business Analyst', 'Data Analyst'],
        skills: ['Technical Skills', 'Accounting Knowledge', 'Data Analysis', 'System Design'],
    },
    BSOA: {
        name: 'Bachelor of Science in Office Administration',
        code: 'BSOA',
        matchReason: 'Great for organized individuals who excel in administrative and management tasks',
        careers: ['Office Manager', 'Administrative Officer', 'Executive Assistant', 'Operations Coordinator'],
        skills: ['Organization', 'Communication', 'Time Management', 'Coordination'],
    },
    BSCRIM: {
        name: 'Bachelor of Science in Criminology',
        code: 'BSCRIM',
        matchReason: 'Perfect for those dedicated to public safety and law enforcement',
        careers: ['Police Officer', 'Criminal Investigator', 'Forensic Specialist', 'Security Manager'],
        skills: ['Physical Fitness', 'Critical Thinking', 'Ethics', 'Investigation'],
    },
    BEED: {
        name: 'Bachelor of Elementary Education',
        code: 'BEED',
        matchReason: 'Ideal for patient and caring individuals who love teaching children',
        careers: ['Elementary Teacher', 'Curriculum Developer', 'Educational Coordinator', 'Child Development Specialist'],
        skills: ['Patience', 'Communication', 'Creativity', 'Child Psychology'],
    },
    BSED: {
        name: 'Bachelor of Secondary Education',
        code: 'BSED',
        matchReason: 'Great for subject specialists who want to teach high school students',
        careers: ['High School Teacher', 'Subject Specialist', 'Curriculum Developer', 'Education Coordinator'],
        skills: ['Subject Expertise', 'Communication', 'Classroom Management', 'Mentoring'],
    },
    BSHM: {
        name: 'Bachelor of Science in Hospitality Management',
        code: 'BSHM',
        matchReason: 'Perfect for people-oriented individuals who love customer service',
        careers: ['Hotel Manager', 'Event Coordinator', 'Restaurant Manager', 'Tourism Officer'],
        skills: ['Customer Service', 'Communication', 'Problem Solving', 'Cultural Awareness'],
    },
}
