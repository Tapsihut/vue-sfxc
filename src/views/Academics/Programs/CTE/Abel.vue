<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
        title: 'WHAT SUBJECTS ARE COVERED IN BA IN ENGLISH LANGUAGE?',
        contentBlocks: [
            { type: 'paragraph', content: 'The subjects typically include:' },
            {
                type: 'list',
                items: [
                    'English Language Teaching Approaches and Methods',
                    'Semantics of English',
                    'English Phonology and Morphology',
                    'English Syntax',
                    '2 foreign languages - Japanese (Nihongo) and Spanish',
                    'Language of Literary Texts',
                ],
            },
        ],
    },
    {
        title: 'WHAT ARE THE OPPORTUNITIES AFTER COMPLETING BA IN ENGLISH LANGUAGE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content: 'It opens up roles and occupation opportunities, such as:',
            },
            {
                type: 'list',
                items: [
                    'Teaching',
                    'Content Writing/Editing',
                    'Publishing',
                    'Media & Journalism',
                    'Public Relations',
                    'Translation',
                    'Corporate Communication',
                    'Speech Therapy',
                    'Preparatory Degree for Pursuing a Career in Law',
                ],
            },
        ],
    },
    {
        title: 'WHAT SKILLS CAN I EXPECT TO DEVELOP DURING BA IN ENGLISH LANGUAGE?',
        contentBlocks: [
            { type: 'paragraph', content: 'Key skills developed during the course include:' },
            {
                type: 'list',
                items: [
                    'Communication Skills',
                    'Critical Thinking',
                    'Research Skills',
                    'Language Proficiency',
                    'Problem-Solving',
                    'Cultural Awareness',
                ],
            },
        ],
    },
    {
        title: 'CAN I PURSUE HIGHER STUDIES AFTER BA IN ENGLISH LANGUAGE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Yes, there are several options for further studies after completing BA in English Language, such as:',
            },
            {
                type: 'list',
                items: [
                    'MA in English Literature or Linguistics',
                    'Master of Fine Arts (MFA)',
                    "Master's in Journalism or Media Studies",
                    'Teaching English as a Foreign Language/Teaching English to Speakers of Other Languages',
                    'Master of Education (M.Ed.)',
                ],
            },
        ],
    },
    {
        title: 'IS BA IN ENGLISH LANGUAGE SUITABLE FOR NON-NATIVE ENGLISH SPEAKERS?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    "Absolutely! The BA in English Language is beneficial for non-native speakers, as it enhances both language skills and understanding of English's structure, history, and nuances, helping students improve proficiency in all contexts.",
            },
        ],
    },
    {
        title: 'WHAT IS THE DIFFERENCE BETWEEN BACHELOR OF ARTS IN ENGLISH LANGUAGE AND BACHELOR OF SECONDARY EDUCATION MAJOR IN ENGLISH?',
        contentBlocks: [
            { type: 'paragraph', content: 'The main difference lies in the focus of study:' },
            {
                type: 'paragraph',
                content:
                    'Bachelor of Arts in English Language focuses on the study of English linguistics, grammar, and language use. It is designed for students interested in understanding and mastering the language in various contexts, such as communication, writing, and analysis.',
            },
            {
                type: 'paragraph',
                content:
                    'Bachelor of Secondary Education Major in English is designed for students aiming to become secondary school teachers, with a curriculum that combines English language studies and pedagogy, preparing them to teach English at the secondary school level.',
            },
        ],
    },
    {
        title: 'CAN I PURSUE A CAREER IN WRITING AFTER COMPLETING BA IN ENGLISH LANGUAGE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Definitely, the BA in English Language provides a strong foundation for a career in writing, whether as a content writer, editor, technical writer, or freelance writer. The program equips you with the necessary writing, communication, and critical thinking skills to succeed in various writing-related careers.',
            },
        ],
    },
    {
        title: 'DO I NEED A STRONG BACKGROUND IN ENGLISH TO PURSUE THIS PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    "A strong background in English is helpful, but not required. Most BA English Language programs cater to students with varying proficiency levels. What matters most is a genuine interest in the language and a desire to improve your skills in different contexts. If you're motivated to learn, this program is a great fit.",
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
                    'Gaining practical experience through internships or part-time jobs',
                    'Obtaining relevant certifications',
                    'Networking with professionals in the industry',
                ],
            },
        ],
    },
    {
        title: 'CAN I PURSUE THE BA IN ENGLISH LANGUAGE ONLINE AT ST. FRANCIS XAVIER COLLEGE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'SFXC’s BA in English Language is offered through a blended learning approach that combines face-to-face classes with online instruction. This setup allows students to gain hands-on experience, engage directly with faculty, and collaborate with peers while developing strong communication, critical thinking, and language skills.',
            },
        ],
    },
    {
        title: 'WHAT IS THE TYPICAL DURATION OF THE PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The program usually takes about four years to complete if attending full-time. Part-time students may take longer, depending on their course load. Graduates can review and take the board exam (LEPT—Licensure Examination for Professional Teachers) after finishing the program at SFXC.',
            },
        ],
    },
    {
        title: 'WHAT ARE THE PRE-REQUISITES FOR ADMISSION?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'To be eligible for admission to the ABEL program, applicants must meet the following requirements:',
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
        title: 'HOW CAN I APPLY FOR THE ABEL PROGRAM?',
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
        title: 'HOW CAN I CONTACT THE ABEL PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'For inquiries regarding the Bachelor of Arts in English Language program, please contact us at abel@sfxc.edu.ph.',
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
        title: 'English Language Week 2026',
        date: 'March 15, 2026',
        excerpt:
            'Join us as we celebrate the English Language Week with poetry readings, public speaking competitions, and a keynote speech from renowned authors.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'CTE Department',
        category: 'Event',
    },
    {
        id: 2,
        title: 'New Creative Writing Workshop Series',
        date: 'February 28, 2026',
        excerpt:
            'The ABEL program is proud to announce a new partnership that integrates specialized creative writing workshops within our curriculum.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Academic Affairs',
        category: 'Curriculum',
    },
    {
        id: 3,
        title: 'Alumni Spotlight: Excellence in Journalism',
        date: 'January 20, 2026',
        excerpt:
            'Read about how our ABEL alumni are making their mark in the publishing and media industries across the nation.',
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
                alt="English Language"
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
                            >College of Teachers Education</span
                        >
                    </div>
                    <h1
                        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 reveal-item"
                        style="font-family: 'Times New Roman', Times, serif"
                    >
                        English Language
                    </h1>
                    <p
                        class="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed reveal-item"
                    >
                        Developing comprehensive knowledge in the English language, linguistics, and
                        literature.
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
                                    alt="Program Head"
                                    class="w-full h-full object-cover"
                                />
                            </div>

                            <CardTitle
                                class="text-xl font-bold uppercase tracking-wide text-primary"
                                >Program Head Name</CardTitle
                            >
                            <CardDescription class="text-sm font-medium"
                                >Program Head, ABEL</CardDescription
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
                                        <span>abel@sfxc.edu.ph</span>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="mt-0.5 font-medium text-muted-foreground"
                                            >Phone:</span
                                        >
                                        <span>(085) 123-4567 loc 105</span>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="mt-0.5 font-medium text-muted-foreground"
                                            >Location:</span
                                        >
                                        <span
                                            >CTE Building, 2nd Floor<br />Saint Francis Xavier
                                            College</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Program Governor Card -->
                    <Card class="overflow-hidden shadow-lg bg-card border-border">
                        <CardHeader class="pb-4">
                            <div
                                class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted"
                            >
                                <img
                                    src="https://placehold.co/600x600/000000/FFFFFF?text=600x600"
                                    alt="Program Governor"
                                    class="w-full h-full object-cover"
                                />
                            </div>

                            <CardTitle
                                class="text-xl font-bold uppercase tracking-wide text-primary"
                                >Governor Name</CardTitle
                            >
                            <CardDescription class="text-sm font-medium"
                                >Governor, ABEL</CardDescription
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
                                        <span>governor.abel@sfxc.edu.ph</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <!-- Program Updates Section (Design referenced from NewsAndUpdates) -->
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
