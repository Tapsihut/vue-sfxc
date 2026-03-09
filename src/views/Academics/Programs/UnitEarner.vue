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
        title: 'PROGRAM OVERVIEW',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The Teacher Certificate Program (TCP), also known as the Unit Earner Program, of St. Francis Xavier College (SFXC) is a specialized academic track designed for graduates of non-education degree programs who aspire to become Licensed Professional Teachers. It is under SFXC’s College of Teacher Education.',
            },
            {
                type: 'paragraph',
                content:
                    'This program under the College of Teach provides the required eighteen (18) units of Professional Education (Prof-Ed) mandated for eligibility to take the Licensure Examination for Professional Teachers (LEPT) administered by the Professional Regulation Commission (PRC).',
            },
            {
                type: 'paragraph',
                content:
                    'Through this program, SFXC affirms its commitment to academic excellence and professional formation by equipping aspiring educators with foundational pedagogical knowledge, instructional competencies, and ethical grounding necessary for meaningful participation in the teaching profession.',
            },
        ],
    },
    {
        title: 'LEGAL BASIS',
        contentBlocks: [
            {
                type: 'list',
                items: [
                    'The program is anchored on Republic Act No. 7836, otherwise known as the Philippine Teachers Professionalization Act of 1994, and its subsequent amendments.',
                    'The Teacher Certificate Program is CHED-accredited and duly recognized by the Professional Regulation Commission (PRC) as a valid qualification for LEPT application.',
                    'Upon completion of the required Professional Education units, graduates shall be issued a Certificate of Completion in Professional Education, one of the documentary requirements for LEPT registration.',
                ],
            },
        ],
    },
    {
        title: 'WHO MAY ENROLL?',
        contentBlocks: [
            {
                type: 'list',
                items: [
                    'Graduates of any non-education bachelor’s degree program',
                    'Professionals intending to transition into the teaching profession',
                    'Private school teachers without education degrees and without LEPT eligibility',
                    'Working professionals seeking flexible and accessible learning arrangements',
                    'Individuals pursuing career advancement, promotion, or professional growth in the education sector',
                ],
            },
        ],
    },
    {
        title: 'DURATION',
        contentBlocks: [
            {
                type: 'list',
                items: [
                    'Students typically enroll in nine (9) units per semester (equivalent to three courses).',
                    'The full eighteen (18) units may generally be completed within one (1) academic year, or two semesters.',
                ],
            },
        ],
    },
    {
        title: 'MODE OF INSTRUCTION',
        contentBlocks: [
            {
                type: 'list',
                items: [
                    'Classes are delivered through an online mode of instruction.',
                    'Schedule: Every Saturday (Weekend Classes).',
                ],
            },
        ],
    },
    {
        title: 'ADMISSION REQUIREMENTS',
        contentBlocks: [
            {
                type: 'list',
                items: [
                    'Original and photocopy of Transcript of Records (TOR)',
                    'For graduates of private institutions, TOR must bear a Special Order (S.O.)',
                    'PSA-issued Birth Certificate',
                    'Two (2) pieces 2x2 ID photos',
                    'One (1) valid government-issued ID',
                    'Honorable Dismissal (if applicable)',
                    'Marriage Certificate (if applicable)',
                ],
            },
        ],
    },
    {
        title: 'TUITION ASSISTANCE',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'SFXC offers tuition discounts for early enrollees, subject to existing institutional policies and guidelines.',
            },
        ],
    },
    {
        title: 'AFTER PROGRAM COMPLETION',
        contentBlocks: [
            {
                type: 'paragraph',
                content: 'Upon successful completion of the program, graduates shall:',
            },
            {
                type: 'list',
                items: [
                    'Receive their Certificate of Completion in Professional Education',
                    'Become eligible to apply for the Licensure Examination for Professional Teachers (LEPT)',
                    'Qualify for teaching positions in public and private secondary and senior high school institutions',
                ],
            },
        ],
    },
    {
        title: 'PROGRAM ACHIEVEMENT',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Albie Catoto, product of SFXC’s Unit Earner Program in 2022, secured the Top 8 rank in the October 2022 Licensure Examination for Professional Teachers (LEPT), earning an outstanding rating of 92.80%.',
            },
        ],
    },
    {
        title: 'HOW CAN I APPLY FOR THE UNIT EARNER PROGRAM?',
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
]

const expanded = ref<Record<string, boolean>>({})

const toggle = (title: string) => {
    expanded.value[title] = !expanded.value[title]
}

// Dummy data for Program Updates styled like NewsAndUpdates
const programUpdates = [
    {
        id: 1,
        title: 'LEPT Review Session Registration',
        date: 'March 15, 2026',
        excerpt:
            'Registration is now open for the upcoming Licensure Examination for Professional Teachers (LEPT) comprehensive review series.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'TCP Coordinator',
        category: 'Announcement',
    },
    {
        id: 2,
        title: 'Topnotcher Recognition Ceremony',
        date: 'February 28, 2026',
        excerpt:
            'Join us as we celebrate our recent LEPT passers and honor our top-performing graduates from the Unit Earner Program.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Academic Affairs',
        category: 'Event',
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
                alt="Unit Earner Program"
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
                            >St. Francis Xavier College</span
                        >
                    </div>
                    <h1
                        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 reveal-item"
                        style="font-family: 'Times New Roman', Times, serif"
                    >
                        Unit Earner Program
                    </h1>
                    <p
                        class="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed reveal-item"
                    >
                        Earning education units to qualify for the Licensure Examination for
                        Teachers.
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
                                >TCP Coordinator</CardTitle
                            >
                            <CardDescription class="text-sm font-medium"
                                >College of Teacher Education</CardDescription
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
                                            >Mobile:</span
                                        >
                                        <span>0981 235 2249</span>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="mt-0.5 font-medium text-muted-foreground"
                                            >Facebook:</span
                                        >
                                        <span>SFXC - College of Teacher Education</span>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="mt-0.5 font-medium text-muted-foreground"
                                            >Location:</span
                                        >
                                        <span>CTE Building<br />Saint Francis Xavier College</span>
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
