<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

interface ProgramSection {
    title: string
    contentBlocks: {
        type: 'paragraph' | 'list' | 'subtitle' | 'html'
        content?: string
        items?: string[]
    }[]
}

const programDetails: ProgramSection[] = [
    {
        title: 'WHAT IS BACHELOR OF SCIENCE IN ENTREPRENEURSHIP?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The Bachelor of Science in Entrepreneurship is an undergraduate program that teaches students how to start, manage, and grow businesses. It covers areas like business planning, marketing, finance, and innovation, preparing graduates to launch their own ventures or work in startups.',
            },
        ],
    },
    {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content: 'Core subjects in the BS Entrepreneurship typically include:',
            },
            {
                type: 'list',
                items: [
                    'Business Planning',
                    'Marketing for Entrepreneurs',
                    'Financial Management',
                    'Innovation and Creativity',
                    'Operations Management',
                    'Small Business Management',
                    'Entrepreneurial Finance',
                    'Business Law',
                    'Economics',
                    'Strategic Management',
                ],
            },
        ],
    },
    {
        title: 'WHY CHOOSE BACHELOR OF SCIENCE IN ENTREPRENEURSHIP AT ST. FRANCIS XAVIER COLLEGE?',
        contentBlocks: [
            {
                type: 'subtitle',
                content: 'Because we don’t just teach business — we build business leaders!',
            },
            { type: 'paragraph', content: 'Our College of Business Education is committed to:' },
            {
                type: 'list',
                items: [
                    'Practical, real-world learning',
                    'Experienced and inspiring faculty',
                    'Business simulations and case studies',
                    'Industry exposure and networking opportunities',
                    'A culture that nurtures creativity and innovation',
                ],
            },
            {
                type: 'paragraph',
                content: 'We proudly shape future CEOs, founders, and changemakers!',
            },
        ],
    },
    {
        title: 'WHAT CAREER OPPORTUNITIES AWAIT BS ENTREPRENEURSHIP GRADUATES?',
        contentBlocks: [
            { type: 'paragraph', content: 'Our graduates are empowered to become:' },
            {
                type: 'list',
                items: [
                    'Business Owners & Startup Founders',
                    'Business Consultants',
                    'Marketing Managers',
                    'Innovation Officers',
                    'Project Managers',
                    'Family Business Successors',
                    'Social Entrepreneurs',
                ],
            },
            {
                type: 'paragraph',
                content:
                    'Or even pursue advanced studies like MBA and other business-related master’s degrees.',
            },
        ],
    },
    {
        title: 'DO I NEED TO ALREADY HAVE A BUSINESS IDEA TO ENROLL?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Not at all! You don’t need a business idea — just passion, creativity, and determination. We’ll help you discover opportunities, develop innovative ideas, and turn them into viable ventures.',
            },
        ],
    },
    {
        title: 'WHAT SKILLS WILL I DEVELOP IN THIS PROGRAM?',
        contentBlocks: [
            { type: 'paragraph', content: 'You’ll master skills such as:' },
            {
                type: 'list',
                items: [
                    'Leadership & Decision-Making',
                    'Financial Management',
                    'Marketing & Branding',
                    'Business Planning',
                    'Risk Assessment',
                    'Problem-Solving & Critical Thinking',
                    'Communication & Negotiation',
                ],
            },
            {
                type: 'paragraph',
                content: 'These are powerful skills that are valuable in any industry!',
            },
        ],
    },
    {
        title: 'IS BS ENTREPRENEURSHIP ONLY FOR THOSE WHO WANT TO START A BUSINESS?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Absolutely not! Entrepreneurial skills are highly valued in corporations, government, NGOs, and multinational companies. Employers seek graduates who are proactive, innovative, and solution-oriented — exactly what our program produces.',
            },
        ],
    },
    {
        title: 'HOW CAN I ENROLL?',
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
    {
        title: 'HOW DO I CONTACT THE BACHELOR OF SCIENCE IN ENTREPRENEURSHIP PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'For inquiries regarding the Bachelor of Science in Entrepreneurship program, you may contact:',
            },
            {
                type: 'html',
                content:
                    '<div class="mt-2 text-foreground font-medium">JAYSON ACUÑA<br>Email: jgacuna@sfxc.edu.ph<br>Mobile: 09951552108</div>',
            },
        ],
    },
]

const expanded = ref<Record<string, boolean>>({})

const toggle = (title: string) => {
    expanded.value[title] = !expanded.value[title]
}

// Dummy data for Program Updates styled like NewsAndUpdates
const programUpdates = [
    {
        id: 1,
        title: 'Entrepreneurship Week 2026 Pitch Competition',
        date: 'March 15, 2026',
        excerpt:
            'Join us as we host the annual startup pitch event, showcasing innovative business ideas from our BSE students.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'CBE Department',
        category: 'Event',
    },
    {
        id: 2,
        title: 'Industry Leaders Integration',
        date: 'February 28, 2026',
        excerpt:
            'The BSE program is proud to announce a new partnership connecting students with successful local entrepreneurs.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Academic Affairs',
        category: 'Network',
    },
    {
        id: 3,
        title: 'Alumni Spotlight: Building Sustainable Businesses',
        date: 'January 20, 2026',
        excerpt:
            'Read about how our BSE alumni are launching sustainable companies and expanding globally.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Alumni Network',
        category: 'Feature',
    },
]

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
                        setTimeout(() => el.classList.add('reveal-visible'), i * 100)
                    })
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.1 },
    )
    document.querySelectorAll('.reveal-group').forEach((el) => observer.observe(el))
})
</script>

<template>
    <div class="min-h-screen bg-background pb-24">
        <!-- Hero Section -->
        <section class="relative h-[75dvh] overflow-hidden">
            <img
                src="/src/assets/images/sfxc-building.jpg"
                alt="Entrepreneurship"
                class="absolute inset-0 w-full h-full object-cover"
            />
            <div
                class="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10 z-1"
            ></div>
            <div
                class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent z-1"
            ></div>
            <div
                class="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-primary/25 to-transparent z-1"
            ></div>
            <div class="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
                <div
                    class="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-16 pb-12 md:pb-16 reveal-group"
                >
                    <div class="hidden md:flex items-center gap-4 mb-6 reveal-item">
                        <div class="w-10 h-0.5 bg-primary"></div>
                        <span class="text-white/50 text-xs font-medium uppercase tracking-[0.3em]"
                            >College of Business Education</span
                        >
                    </div>
                    <h1
                        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 reveal-item"
                        style="font-family: 'Times New Roman', Times, serif"
                    >
                        Entrepreneurship
                    </h1>
                    <p
                        class="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed reveal-item"
                    >
                        Equipping students with the mindset and skills to start, manage, and grow
                        their own ventures.
                    </p>
                </div>
            </div>
        </section>

        <!-- Content -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <div class="grid lg:grid-cols-3 gap-10 reveal-group">
                <!-- Main Content (Left) -->
                <div class="lg:col-span-2 space-y-16 reveal-item">
                    <!-- Dropdowns Section -->
                    <div class="space-y-6">
                        <div class="border-b border-border pb-2">
                            <h3 class="text-2xl font-bold text-primary">Program Details</h3>
                        </div>

                        <div class="space-y-3">
                            <Card
                                v-for="section in programDetails"
                                :key="section.title"
                                class="border border-border rounded-md overflow-hidden bg-card"
                            >
                                <Button
                                    @click="toggle(section.title)"
                                    variant="ghost"
                                    class="w-full flex justify-start items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 rounded-none transition-colors text-left font-semibold text-card-foreground h-auto relative whitespace-normal"
                                >
                                    <span
                                        class="font-bold text-lg leading-none w-4 shrink-0 text-center text-primary"
                                        >{{ expanded[section.title] ? '-' : '+' }}</span
                                    >
                                    <span class="text-left w-full">{{ section.title }}</span>
                                </Button>

                                <div
                                    v-show="expanded[section.title]"
                                    class="p-6 border-t border-border bg-card"
                                >
                                    <template
                                        v-for="(block, idx) in section.contentBlocks"
                                        :key="idx"
                                    >
                                        <p
                                            v-if="block.type === 'paragraph'"
                                            class="text-muted-foreground leading-relaxed mb-4 last:mb-0"
                                        >
                                            {{ block.content }}
                                        </p>

                                        <h4
                                            v-else-if="block.type === 'subtitle'"
                                            class="font-bold text-foreground text-md mt-6 mb-3"
                                        >
                                            {{ block.content }}
                                        </h4>

                                        <ul
                                            v-else-if="block.type === 'list'"
                                            class="list-disc list-inside space-y-2 text-muted-foreground ml-2 mb-4 last:mb-0"
                                        >
                                            <li
                                                v-for="(item, i) in block.items"
                                                :key="i"
                                                class="leading-relaxed"
                                            >
                                                {{ item }}
                                            </li>
                                        </ul>

                                        <div
                                            v-else-if="block.type === 'html'"
                                            class="text-muted-foreground mb-4 last:mb-0"
                                            v-html="block.content"
                                        ></div>
                                    </template>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <!-- Sidebar (Right) -->
                <div class="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-max reveal-item">
                    <Card class="overflow-hidden shadow-lg bg-card border-border">
                        <CardHeader class="pb-4">
                            <div
                                class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted"
                            >
                                <img
                                    src="https://placehold.co/600x600/000000/FFFFFF?text=600x600"
                                    alt="Program Coordinator"
                                    class="w-full h-full object-cover"
                                />
                            </div>

                            <CardTitle
                                class="text-xl font-bold uppercase tracking-wide text-primary"
                                >Jayson Acuña</CardTitle
                            >
                            <CardDescription class="text-sm font-medium"
                                >Program Coordinator, BSE</CardDescription
                            >
                        </CardHeader>
                        <CardContent>
                            <Separator class="mb-6" />

                            <div class="space-y-4">
                                <h4 class="font-semibold text-lg text-foreground">
                                    Contact Information
                                </h4>

                                <div class="space-y-3 text-sm text-card-foreground">
                                    <div class="flex items-start gap-3">
                                        <span class="mt-0.5 font-medium text-muted-foreground"
                                            >Email:</span
                                        >
                                        <span>jgacuna@sfxc.edu.ph</span>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="mt-0.5 font-medium text-muted-foreground"
                                            >Phone:</span
                                        >
                                        <span>09951552108</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <!-- Program Updates Section -->
            <div class="space-y-6 reveal-group">
                <div class="border-b border-border pb-2 reveal-item">
                    <h3 class="text-2xl font-bold text-primary">Program Updates</h3>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-item">
                    <Card
                        v-for="item in programUpdates"
                        :key="item.id"
                        class="overflow-hidden border-border rounded-xl hover:shadow-lg transition-shadow flex flex-col group bg-card p-0"
                    >
                        <div class="h-56 overflow-hidden">
                            <img
                                :src="item.image"
                                :alt="item.title"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <CardHeader class="pb-2">
                            <div class="mb-2">
                                <Badge variant="secondary" class="font-bold">
                                    {{ item.category }}
                                </Badge>
                            </div>
                            <CardTitle
                                class="text-xl font-bold line-clamp-2 transition-colors text-foreground"
                            >
                                {{ item.title }}
                            </CardTitle>
                            <div
                                class="flex items-center text-xs text-muted-foreground pt-1 space-x-4"
                            >
                                <div class="flex items-center">
                                    <span>by: {{ item.author }}</span>
                                </div>
                                <div class="flex items-center">
                                    <span>{{ item.date }}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent class="flex-1">
                            <CardDescription class="text-sm line-clamp-3">
                                {{ item.excerpt }}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.reveal-item {
    opacity: 0;
    transform: translateY(2rem);
    transition:
        opacity 0.6s ease,
        transform 0.6s ease;
}

.reveal-item.reveal-visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
