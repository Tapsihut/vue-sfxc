export type ContentBlockType = 'paragraph' | 'list' | 'subtitle' | 'html'

export interface ContentBlock {
    type: ContentBlockType
    content?: string
    items?: string[]
}

export interface ProgramSection {
    title: string
    contentBlocks: ContentBlock[]
}

export interface IroUpdate {
    id: number
    title: string
    date: string
    excerpt: string
    image: string
    author: string
    category: string
}

export const programDetails: ProgramSection[] = [
    {
        title: 'INTERNATIONAL RELATIONS OFFICE',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Driven by its institutional vision, mission, and core values, the SFXC International Relations Office (IRO) seeks to develop more opportunities for the development of its community. To do so, its activities lie in the areas of cultural exchange; international competency matching; research and community development; global mobility of its students, faculty, and staff; and sustainable funding and resource development. These IRO activities will develop the SFXC community into being internationally competitive and global citizens. This will then contribute to the St. Francis Xavier College vision of developing excellence-driven and value laden leaders.',
            },
        ],
    },
    {
        title: 'INTERNATIONAL RELATIONS OFFICE VISION',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'A center for intercultural opportunities and global citizenship among the Xavier Knight leaders',
            },
        ],
    },
    {
        title: 'INTERNATIONAL RELATIONS OFFICE GOALS',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The IRO has five major goals as an office in the areas of cultural exchange, curriculum and competencies internationalization, research and community development, the global mobility of SFXC, and sustainable funding and resource development. The office, while it is new, is ambitious and ready to maximize its current resources to improve.',
            },
            {
                type: 'list',
                items: [
                    'Cultural Exchange: Proactively establish and nurture diverse international partnerships to promote cultural exchange and mutual understanding.',
                    'Internationalization of Curriculum and Competencies: Integrate global and intercultural perspectives into curricula, expand language learning, and support faculty development to enhance students\u2019 global competencies.',
                    'Research and Community Development: Strengthen research and community development by collaborating with local and international institutions, applying evidence-based findings, and scaling community initiatives.',
                    'Mobility, Exchange, and Opportunities: Facilitate affordable mobility and exchange opportunities for students, faculty, and staff with comprehensive support to ensure equitable participation.',
                    'Sustainable Funding and Resource Development: Secure sustainable funding through diverse fundraising strategies and partnerships with international foundations, charities, and corporate sponsors while maintaining transparent financial management.',
                ],
            },
        ],
    },
]

export const programUpdates: IroUpdate[] = [
    {
        id: 1,
        title: 'International Student Exchange Orientation',
        date: 'March 10, 2026',
        excerpt:
            'Join us for an orientation session mapping out study abroad opportunities and intercultural programs for the upcoming academic year.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'IRO Coordinator',
        category: 'Event',
    },
    {
        id: 2,
        title: 'New Global Partnerships',
        date: 'February 15, 2026',
        excerpt:
            'The SFXC International Relations Office has officially partnered with leading universities in Asia to expand cultural exchange pathways.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'External Affairs',
        category: 'Partnership',
    },
]
