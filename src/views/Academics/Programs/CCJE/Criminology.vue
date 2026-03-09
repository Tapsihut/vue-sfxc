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
        title: 'PROGRAM OVERVIEW',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The field of criminology involves the study of crime and the various components of the justice system, focusing on how these agencies operate and respond to crimes, criminals, and victims. The mission of the Criminology program is to produce professionally competent and morally upright graduates capable of delivering efficient and effective services in areas such as crime prevention, crime detection and investigation, law enforcement, public safety, offender custody and rehabilitation, criminological research, and more.',
            },
            {
                type: 'paragraph',
                content:
                    'Higher Education Institutions offering the Criminology program are envisioned as vital educational entities dedicated to producing graduates equipped with the knowledge, skills, attitudes, and values needed to address the problem of criminality in the country. These institutions aim to develop individuals with the character and competence to meet the demands of globalization and the evolving challenges in the field of criminology.',
            },
            {
                type: 'paragraph',
                content:
                    'Simply put, the Bachelor of Science in Criminology is an undergraduate program that focuses on the study of crime, criminal behavior, law enforcement, and the justice system. It explores the causes of crime, the role of law enforcement, offender rehabilitation, and legal frameworks. If this interests you, Criminology is the course for you.',
            },
        ],
    },
    {
        title: 'MAJOR ACHIEVEMENTS OF THE COLLEGE OF CRIMINAL JUSTICE EDUCATION',
        contentBlocks: [
            {
                type: 'html',
                content:
                    '<strong>September 2025:</strong> Top 10 Best Performing School in the Philippines – Category C, with 51-100 examinees and with at least 80% passing rate during August 2025 Criminologist Licensure Examination.',
            },
            {
                type: 'html',
                content:
                    '<strong>February 2025:</strong> Daryanzen S. Carbon (BSCrim 2023 Graduate), scored 88.75% in the February 2025 Criminology Licensure Exam.<br/>He was recognized as Top 3 in the Region by the Professional Criminologists Association of the Philippines (PCAP), Inc. – Caraga Region.',
            },
            {
                type: 'html',
                content:
                    '<strong>February 2024:</strong> SFXC was recognized as the Top 1 Performing School in CARAGA Region for the February 2024 Criminology Licensure Examination.<br/><br/><strong>Passing Rates:</strong><br/>SFXCs First Timer Passing Rate: 87.88%<br/>National Average Passing Rate: 48.27%',
            },
        ],
    },
    {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
            { type: 'paragraph', content: 'Core subjects typically include:' },
            {
                type: 'list',
                items: [
                    'Criminal Law',
                    'Criminological Theories',
                    'Forensic Science',
                    'Law Enforcement',
                    'Criminal Investigation',
                    'Ethics',
                ],
            },
        ],
    },
    {
        title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
        contentBlocks: [
            { type: 'paragraph', content: 'Key skills developed during the course include:' },
            {
                type: 'list',
                items: [
                    'Problem-Solving and Decision-Making',
                    'Process Optimization',
                    'Project Management',
                    'Leadership and Teamwork',
                    'Communication and Presentation',
                    'Data Analysis and Forecasting',
                ],
            },
        ],
    },
    {
        title: 'WHAT ARE POSSIBLE JOB OPPORTUNITIES FOR SOMEONE WITH THIS DEGREE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content: 'BS Criminology opens up roles and occupation opportunities, including:',
            },
            {
                type: 'list',
                items: [
                    'Criminology Educator – Teaches criminology and related subjects in government-recognized schools.',
                    'Law Enforcement Professional – Administrator, executive, adviser, consultant, or agent in public or private agencies.',
                    'Forensic Specialist – Technician in crime detection fields (e.g., ballistics, dactyloscopy, forensics).',
                    'Correctional Professional – Officer, supervisor, or administrator in penal and correctional institutions.',
                    'Research & Advisory Expert – Counselor or researcher in crime studies, police operations, and public welfare.',
                ],
            },
        ],
    },
    {
        title: 'WHAT INDUSTRIES WILL MOST LIKELY HIRE BACHELOR OF SCIENCE IN CRIMINOLOGY GRADUATES?',
        contentBlocks: [
            {
                type: 'paragraph',
                content: 'BS Criminology graduates are needed in various industries, including:',
            },
            {
                type: 'list',
                items: [
                    'Law Enforcement Agencies',
                    'Government',
                    'Private Security Firms',
                    'Forensic Labs',
                    'Legal Services',
                ],
            },
        ],
    },
    {
        title: 'ARE INTERNSHIPS PART OF THE PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Absolutely! The Bachelor of Science in Criminology program includes an internship component where students gain hands-on experience in real-world settings. Internships typically take place in the final year of the program and provide students with valuable exposure to the industry, helping them apply theoretical knowledge to practical challenges.',
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
                    'Acquire hands-on experience through internships or part-time work.',
                    'Earn certifications relevant to your field.',
                    'Expand your professional network.',
                    'Cultivate high-demand skills.',
                    'Explore opportunities for international exposure.',
                    'Strengthen your resume and online profile.',
                    'Consider advanced education or specialized training.',
                    'Keep up with the latest industry developments.',
                ],
            },
        ],
    },
    {
        title: 'WHAT FURTHER EDUCATION OPTIONS ARE AVAILABLE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    "To further a career in BS Criminology, graduates may pursue a Master's in Criminology, criminal justice, or law degrees:",
            },
            {
                type: 'list',
                items: [
                    'Master of Science in Criminal Justice (MSCJ)',
                    'Master of Science in Criminology (MSC)',
                    "Master's in Forensic Sciences (MFS)",
                    'Master’s in Public Administration (MPA)',
                    'Juris Doctor (Law Degree)',
                    'PhD in Criminology or Criminal Justice',
                ],
            },
        ],
    },
    {
        title: 'CAN I PURSUE THIS ONLINE AT ST. FRANCIS XAVIER COLLEGE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'At St. Francis Xavier College, the Bachelor of Science in Criminology is offered as a blended program, combining both face-to-face, in-person classes and online learning. This flexible approach ensures that students benefit from hands-on experiences, direct interaction with faculty, and collaborative activities with peers while also accommodating the convenience of online education for certain aspects of the curriculum.',
            },
        ],
    },
    {
        title: 'WHAT IS THE TYPICAL DURATION OF THE PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The program typically takes four years to complete for full-time students, while part-time students may need more time based on their course load. Graduates can review and take the board exam (CLE—Criminologist Licensure Exam) after finishing the program at SFXC.',
            },
        ],
    },
    {
        title: 'WHAT ARE THE PRE-REQUISITES FOR ADMISSION?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'To be eligible for admission to the Bachelor of Science in Criminology program, applicants must meet the following requirements:',
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
        title: 'HOW CAN I APPLY FOR THE BACHELOR OF SCIENCE IN CRIMINOLOGY PROGRAM?',
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
                    '<div class="mt-4"><strong class="text-foreground">𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC Scholarship Office<br>Email: Admission.scholarship@sfxc.edu.ph</div>',
            },
            {
                type: 'html',
                content:
                    '<div class="mt-2"><strong class="text-foreground">𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑\'𝐒 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC - Registrar\'s Office<br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>',
            },
        ],
    },
    {
        title: 'HOW CAN I CONTACT THE COLLEGE OF CRIMINAL JUSTICE AND THEIR BS CRIMINOLOGY PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'For inquiries regarding the Bachelor of Science in Criminology program, please contact us at ccje@sfxc.edu.ph.',
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
        title: 'Criminology Days 2026',
        date: 'March 15, 2026',
        excerpt:
            'Join us as we celebrate Criminology Days with tactical seminars, skills competitions, and a keynote speech from PNP officials.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'CCJE Department',
        category: 'Event',
    },
    {
        id: 2,
        title: 'New Forensic Science Laboratory Integration',
        date: 'February 28, 2026',
        excerpt:
            'The BS Criminology program is proud to announce a new partnership that integrates specialized forensic science certification within our curriculum.',
        image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
        author: 'Academic Affairs',
        category: 'Curriculum',
    },
    {
        id: 3,
        title: 'Alumni Spotlight: Leading Regional Law Enforcement',
        date: 'January 20, 2026',
        excerpt:
            'Read about how our BS Criminology alumni are leading operational and administrative functions across regional law enforcement agencies.',
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
                alt="Criminology"
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
                            >College of Criminal Justice Education</span
                        >
                    </div>
                    <h1
                        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 reveal-item"
                        style="font-family: 'Times New Roman', Times, serif"
                    >
                        Criminology
                    </h1>
                    <p
                        class="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed reveal-item"
                    >
                        Preparing professionals committed to upholding justice, law, and public
                        safety.
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
                                >[Program Head Name]</CardTitle
                            >
                            <CardDescription class="text-sm font-medium"
                                >Program Head, BS Criminology</CardDescription
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
                                        <span>ccje@sfxc.edu.ph</span>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="mt-0.5 font-medium text-muted-foreground"
                                            >Phone:</span
                                        >
                                        <span>(085) 123-4567 loc 201</span>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="mt-0.5 font-medium text-muted-foreground"
                                            >Location:</span
                                        >
                                        <span
                                            >CCJE Building, 1st Floor<br />Saint Francis Xavier
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
                                >[Governor Name]</CardTitle
                            >
                            <CardDescription class="text-sm font-medium"
                                >Governor, BS Criminology</CardDescription
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
                                        <span>governor.ccje@sfxc.edu.ph</span>
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
