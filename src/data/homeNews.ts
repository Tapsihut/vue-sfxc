export interface FeaturedNewsItem {
    image: string
    badge: string
    title: string
    description: string
    date: string
}

export interface MiniNewsItem {
    id: number
    image: string
    alt: string
    category: string
    title: string
    date: string
}

export const featuredNews: FeaturedNewsItem = {
    image: 'https://placehold.co/1024x768?text=Featured+News+1024x768',
    badge: 'Featured',
    title: 'SFXC Human Resource Office FB Page',
    description:
        'Scan the QR Code to visit the SFXC Human Resource Office Facebook Page for updates and announcements regarding career opportunities.',
    date: 'January 27, 2026',
}

export const miniNewsItems: MiniNewsItem[] = [
    {
        id: 1,
        image: 'https://placehold.co/600x600?text=News+1',
        alt: 'News 1',
        category: 'Spiritual',
        title: 'Sacred Heart of Jesus Parish Church Mass',
        date: 'Jan 09, 2026',
    },
    {
        id: 2,
        image: 'https://placehold.co/600x600?text=News+2',
        alt: 'News 2',
        category: 'Academics',
        title: 'Application for Non-Academics Awards',
        date: 'Jan 12 - Feb 27',
    },
    {
        id: 3,
        image: 'https://placehold.co/600x600?text=News+3',
        alt: 'News 3',
        category: 'Academics',
        title: 'Midterm Permit Release',
        date: 'Jan 28 - 30',
    },
]
