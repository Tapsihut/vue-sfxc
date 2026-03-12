export interface Recognition {
    id: string
    category: string
    title: string
    organization: string
    badge: string
    year: string
    description: string
    details: string[]
    image: string
    color: string
    icon: string
}

const sfxcBuilding = 'https://placehold.co/800x800?text=800x800'
const cauldron = 'https://placehold.co/800x800?text=800x800'
const bsit1 = 'https://placehold.co/800x800?text=800x800'
const bsit2 = 'https://placehold.co/800x800?text=800x800'
const bsit3 = 'https://placehold.co/800x800?text=800x800'

export const recognitions: Recognition[] = [
    {
        id: '1',
        category: 'Accreditation',
        title: 'Level III Re-Accredited Status',
        organization: 'Philippine Accrediting Association of Schools, Colleges and Universities',
        badge: 'PAASCU Level III',
        year: 'Valid until 2028',
        description:
            'Awarded for maintaining high standards of instruction, faculty, research, and community service. This status grants full administrative and financial deregulation.',
        details: [
            'Bachelor of Science in Business Administration',
            'Bachelor of Elementary Education',
            'Bachelor of Secondary Education',
            'Liberal Arts Programs',
        ],
        image: sfxcBuilding,
        color: 'bg-[#E5243B]',
        icon: '<path d="M12 15l-4.224 2.224.805-4.704-3.416-3.33 4.723-.687L12 4l2.112 4.503 4.723.687-3.416 3.33.805 4.704z"/>',
    },
    {
        id: '2',
        category: 'Accreditation',
        title: 'Center of Excellence',
        organization: 'Commission on Higher Education',
        badge: 'CHED COE',
        year: 'Valid until 2027',
        description:
            'Recognized as a premier institution demonstrating excellent performance in the areas of instruction, research and publication, extension and linkages, and institutional qualifications.',
        details: ['Teacher Education Programs'],
        image: cauldron,
        color: 'bg-[#DDA63A]',
        icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    },
    {
        id: '3',
        category: 'Ranking',
        title: 'Top Performing Criminology School',
        organization: 'Professional Regulation Commission',
        badge: 'Top 5 Regional',
        year: '2024 - 2025',
        description:
            'Consistently ranked among the top performing schools in the region based on the licensure examination passing rates, reflecting our rigorous academic training.',
        details: [
            '95% Overall Passing Rate',
            'Top 3 Regional Placer (2024)',
            '100% First-time Takers Passing Rate',
        ],
        image: bsit1,
        color: 'bg-[#4C9F38]',
        icon: '<path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>',
    },
    {
        id: '4',
        category: 'Accreditation',
        title: 'ISO 9001:2015 Certification',
        organization: 'International Organization for Standardization',
        badge: 'ISO Certified',
        year: 'Valid until 2026',
        description:
            'Certified for implementing a robust Quality Management System across all academic and administrative processes, ensuring consistent delivery of educational services.',
        details: ['Institution-wide Quality Management System'],
        image: bsit2,
        color: 'bg-[#C5192D]',
        icon: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',
    },
    {
        id: '5',
        category: 'Achievement',
        title: 'National Champion in Innovation',
        organization: 'Philippine Startup Challenge',
        badge: 'Grand Champion',
        year: 'Awarded 2023',
        description:
            'Awarded the grand prize for developing an AI-driven agricultural solution that helps local farmers optimize crop yields and manage resources efficiently.',
        details: [
            'Best in Technical Innovation',
            '₱1M Grant Awardee',
            'Featured in National Tech Magazine',
        ],
        image: bsit3,
        color: 'bg-[#FF3A21]',
        icon: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
    },
]
