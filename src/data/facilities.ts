export interface Facility {
    id: number
    name: string
    description: string
    image: string
    tag: string
    features: string[]
}

export const facilities: Facility[] = [
    {
        id: 1,
        name: 'Library',
        description:
            'An expansive learning hub with over 10,000 volumes, private study rooms, and full digital access.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Academic',
        features: ['10,000+ Books', 'Digital Resources', 'Study Rooms', 'Computer Lab'],
    },
    {
        id: 2,
        name: 'Science Laboratory',
        description:
            'Purpose-built labs for Physics, Chemistry, and Biology — equipped to the highest safety standards.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Academic',
        features: [
            'Modern Equipment',
            'Safety-Certified',
            'Expert Supervision',
            'Hands-on Learning',
        ],
    },
    {
        id: 3,
        name: 'Computer Laboratory',
        description:
            'High-performance workstations with enterprise-grade internet and a full professional software suite.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Technology',
        features: ['Latest Hardware', 'Fiber Internet', 'Software Suite', 'Tech Support'],
    },
    {
        id: 4,
        name: 'Classroom',
        description:
            'A modern learning space equipped with the latest technology for an engaging educational experience.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Academic',
        features: [
            'Smart Board',
            'High-Speed Internet',
            'Comfortable Seating',
            'Interactive Learning',
        ],
    },
    {
        id: 5,
        name: 'Audio Visual Room',
        description:
            'A versatile space for multimedia presentations, film screenings, and creative projects with state-of-the-art AV equipment.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Technology',
        features: ['Projector', 'Sound System', 'Recording Equipment', 'Flexible Seating'],
    },
    {
        id: 6,
        name: 'Comfort Room',
        description:
            'Clean and well-maintained facilities with accessibility features to ensure comfort for all students and visitors.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Facilities',
        features: ['Accessible Stalls', 'Hygienic', 'Regularly Maintained', 'Family-Friendly'],
    },
    {
        id: 7,
        name: 'Elevator',
        description:
            'A modern elevator system providing easy access to all floors, designed with safety and efficiency in mind.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Facilities',
        features: ['Spacious', 'Safety Features', 'Energy Efficient', 'Regular Maintenance'],
    },
    {
        id: 8,
        name: 'Clinic',
        description:
            'On-site health services staffed by qualified medical professionals, offering first aid and wellness support to our school community.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Health',
        features: [
            'First Aid',
            'Health Consultations',
            'Wellness Programs',
            'Confidential Support',
        ],
    },
]
