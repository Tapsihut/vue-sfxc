export interface HeroButton {
    text: string
    href: string
    primary?: boolean
}

export interface HeroSlide {
    id: number
    title: string
    description: string
    image: string
    buttons?: HeroButton[]
}

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        title: '',
        description: '',
        image: 'https://placehold.co/1920x1080?text=1920x1080',
    },
    {
        id: 2,
        title: 'Excellence in Education',
        description:
            'Nurturing young minds through innovative teaching methods and state-of-the-art facilities.',
        image: 'https://placehold.co/1920x1080?text=1920x1080',
        buttons: [{ text: 'Enroll Now', href: '#academics', primary: true }],
    },
    {
        id: 3,
        title: 'Building Community',
        description:
            'Fostering a supportive environment where students grow academically, socially, and emotionally.',
        image: 'https://placehold.co/1920x1080?text=1920x1080',
        buttons: [{ text: 'Enroll Now', href: '#events', primary: true }],
    },
    {
        id: 4,
        title: 'Holistic Development',
        description:
            'Balancing academic rigor with arts, sports, and character development for well-rounded growth.',
        image: 'https://placehold.co/1920x1080?text=1920x1080',
        buttons: [{ text: 'Enroll Now', href: '#academics', primary: true }],
    },
]
