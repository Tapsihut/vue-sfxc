 <script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
        title: 'WHAT IS BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The Bachelor of Science in Information Technology (BSIT) is an undergraduate program that prepares students to design, develop, implement, and maintain computer-based information systems. It combines computing fundamentals, programming, networking, databases, web technologies, and information security to help students solve real-world problems using technology.',
            },
            {
                type: 'paragraph',
                content:
                    'At St. Francis Xavier College, students can develop the technical knowledge, analytical thinking, creativity, and problem-solving skills needed to adapt to the changing information technology industry.',
            },
        ],
    },
    {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Depending on the approved curriculum, BSIT students may study subjects such as:',
            },
            {
                type: 'list',
                items: [
                    'Introduction to Computing',
                    'Computer Programming',
                    'Object-Oriented Programming',
                    'Data Structures and Algorithms',
                    'Database Management Systems',
                    'Web Development',
                    'Networking and Communications',
                    'Systems Analysis and Design',
                    'Information Assurance and Security',
                    'Mobile Application Development',
                    'Systems Integration and Architecture',
                    'Capstone Project and IT Practicum',
                ],
            },
        ],
    },
    {
        title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The program helps students develop practical and professional skills, including:',
            },
            {
                type: 'list',
                items: [
                    'Programming and Software Development',
                    'Website and Application Development',
                    'Database Design and Management',
                    'Computer Networking and Troubleshooting',
                    'Systems Analysis and Problem-Solving',
                    'Cybersecurity Fundamentals',
                    'Technical Documentation',
                    'Project Management and Team Collaboration',
                    'Critical Thinking and Digital Literacy',
                ],
            },
        ],
    },
    {
        title: 'WHAT ARE THE POSSIBLE CAREERS FOR BSIT GRADUATES?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'Graduates may pursue a variety of technology-related careers, depending on their skills, experience, and specialization.',
            },
            {
                type: 'list',
                items: [
                    'Software Developer',
                    'Web Developer',
                    'Mobile Application Developer',
                    'IT Support Specialist',
                    'Computer Network Administrator',
                    'Database Administrator',
                    'Systems Analyst',
                    'Quality Assurance Tester',
                    'Cybersecurity Associate',
                    'IT Project Assistant',
                    'Technical Support Engineer',
                    'Computer Systems Administrator',
                ],
            },
            {
                type: 'subtitle',
                content: 'WHAT INDUSTRIES HIRE BSIT GRADUATES?',
            },
            {
                type: 'paragraph',
                content:
                    'Information Technology graduates can work in various industries where computer systems and digital solutions are essential, including:',
            },
            {
                type: 'list',
                items: [
                    'Information Technology and Software Companies',
                    'Banking and Financial Services',
                    'Government Offices',
                    'Education and Research Institutions',
                    'Healthcare Organizations',
                    'Telecommunications',
                    'Manufacturing and Retail',
                    'Business Process Outsourcing',
                    'E-commerce and Digital Services',
                    'Freelance and Technology Entrepreneurship',
                ],
            },
        ],
    },
    {
        title: 'WHAT IS THE TYPICAL DURATION OF THE PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The BSIT program generally takes four years to complete, subject to the institution’s approved curriculum, academic requirements, and applicable policies. Students must complete the required academic courses and other program requirements to qualify for graduation.',
            },
        ],
    },
    {
        title: 'ARE INTERNSHIPS AND PRACTICAL PROJECTS PART OF THE PROGRAM?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'IT programs commonly include hands-on laboratory activities, software development exercises, collaborative projects, and a capstone project. An industry practicum or internship may also be required under the approved curriculum, allowing students to apply their knowledge in a professional environment.',
            },
            {
                type: 'paragraph',
                content:
                    'Students should consult the CICT office or the official curriculum for the specific internship, project, and graduation requirements applicable to their batch.',
            },
        ],
    },
    {
        title: 'WHO SHOULD ENROLL IN BSIT?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'The program may be a good fit for students who:',
            },
            {
                type: 'list',
                items: [
                    'Are interested in computers and technology',
                    'Want to learn programming and application development',
                    'Enjoy solving technical problems',
                    'Are curious about networking, databases, and cybersecurity',
                    'Want to create websites, software, or digital solutions',
                    'Are willing to continuously learn new technologies',
                    'Enjoy logical thinking, experimentation, and teamwork',
                ],
            },
        ],
    },
    {
        title: 'WHAT IS THE DIFFERENCE BETWEEN BSIT AND OTHER COMPUTING PROGRAMS?',
        contentBlocks: [
            {
                type: 'paragraph',
                content:
                    'BSIT generally emphasizes applying technology to meet organizational and user needs. Students study software and web development, databases, networks, systems administration, information security, and the implementation of IT solutions.',
            },
            {
                type: 'paragraph',
                content:
                    'Other computing programs may place different emphasis on theoretical computing, algorithms, computer engineering, or specialized areas. Applicants should compare the official curricula and career outcomes of each program before choosing a degree.',
            },
        ],
    },
    {
        title: 'HOW CAN I APPLY FOR THE BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY PROGRAM?',
        contentBlocks: [
            {
                type: 'html',
                content:
                    'To learn about admission requirements, <a href="/admission/requirements#enrollment" class="text-primary hover:underline font-bold">click here</a>.',
            },
            {
                type: 'paragraph',
                content:
                    'Interested applicants are encouraged to contact the Admission and Scholarship Office for guidance on application procedures, required documents, and enrollment schedules. Applicants may also contact the CICT office for information about the program and its curriculum.',
            },
            {
                type: 'paragraph',
                content:
                    'For inquiries, please contact or visit the appropriate college office during its official operating hours.',
            },
            {
                type: 'html',
                content:
                    '<div class="mt-4"><strong class="text-foreground">ADMISSION AND SCHOLARSHIP OFFICE</strong><br>Facebook: SFXC Scholarship Office<br>Email: Admission.scholarship@sfxc.edu.ph<br>Mobile: 0908 885 5380</div>',
            },
            {
                type: 'html',
                content:
                    '<div class="mt-3"><strong class="text-foreground">REGISTRAR’S OFFICE</strong><br>Facebook: SFXC - Registrar’s Office<br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>',
            },
        ],
    },
]

const expanded = ref<Record<string, boolean>>({})

const toggle = (title: string) => {
    expanded.value[title] = !expanded.value[title]
}

const programUpdates = [
    {
        id: 1,
        title: 'Student Software Development Projects',
        date: 'Program Highlights',
        excerpt:
            'Explore how students apply programming, problem-solving, and software development concepts through practical academic projects.',
        image: 'https://placehold.co/800x600/172554/FFFFFF?text=Software+Development',
        author: 'CICT',
        category: 'Student Projects',
    },
    {
        id: 2,
        title: 'Networking and IT Infrastructure',
        date: 'Learning Highlights',
        excerpt:
            'Discover learning activities that introduce students to computer networks, system configuration, troubleshooting, and IT infrastructure.',
        image: 'https://placehold.co/800x600/164e63/FFFFFF?text=Networking',
        author: 'CICT',
        category: 'Technology',
    },
    {
        id: 3,
        title: 'Building Skills for a Digital Future',
        date: 'Career Development',
        excerpt:
            'Learn how programming, web development, databases, and other computing skills can help prepare students for technology-related careers.',
        image: 'https://placehold.co/800x600/312e81/FFFFFF?text=IT+Careers',
        author: 'CICT',
        category: 'Career Development',
    },
]

let observer: IntersectionObserver | null = null

onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') {
        document.querySelectorAll('.reveal-item').forEach((el) => {
            el.classList.add('reveal-visible')
        })
        return
    }

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.reveal-item')

                    items.forEach((el, index) => {
                        window.setTimeout(() => {
                            el.classList.add('reveal-visible')
                        }, index * 100)
                    })

                    observer?.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.1 },
    )

    document.querySelectorAll('.reveal-group').forEach((el) => {
        observer?.observe(el)
    })

    document.querySelectorAll('.reveal-group:not(:has(.reveal-item))').forEach((el) => {
        el.classList.add('reveal-visible')
    })
})

onUnmounted(() => {
    observer?.disconnect()
    observer = null
})
</script>

<template>
    <div class="min-h-screen bg-background pb-24">
        <!-- Hero Section -->
        <section class="relative h-[75dvh] min-h-[480px] overflow-hidden">
            <img
                src="/src/assets/images/sfxc-building.jpg"
                alt="St. Francis Xavier College campus"
                class="absolute inset-0 w-full h-full object-cover"
            />

            <div
                class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10"
            ></div>

            <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
            ></div>

            <div
                class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/25 to-transparent"
            ></div>

            <div class="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
                <div
                    class="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-16 pb-12 md:pb-16 reveal-group"
                >
                    <div class="hidden md:flex items-center gap-4 mb-6 reveal-item">
                        <div class="w-10 h-0.5 bg-primary"></div>
                        <span class="text-white/70 text-xs font-medium uppercase tracking-[0.3em]">
                            College of Information and Communications Technology
                        </span>
                    </div>

                    <Badge class="mb-5 reveal-item" variant="secondary">
                        CICT · Undergraduate Program
                    </Badge>

                    <h1
                        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 reveal-item"
                        style="font-family: 'Times New Roman', Times, serif"
                    >
                        Information Technology
                    </h1>

                    <p class="text-base md:text-lg text-white/75 max-w-2xl leading-relaxed reveal-item">
                        Turn your curiosity into digital solutions. Develop the skills to build,
                        manage, and secure technology that connects people and transforms the world.
                    </p>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-3 gap-10">
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-16">
                    <section class="space-y-6 reveal-group">
                        <div class="border-b border-border pb-3 reveal-item">
                            <p class="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                                About the Program
                            </p>
                            <h2 class="text-2xl md:text-3xl font-bold text-foreground">
                                Build Your Future in Technology
                            </h2>
                        </div>

                        <p class="text-lg text-muted-foreground leading-relaxed reveal-item">
                            The Bachelor of Science in Information Technology (BSIT) program
                            prepares students to apply computing and information technology to
                            real-world challenges. It introduces students to software development,
                            web technologies, databases, networking, information security, and
                            systems analysis.
                        </p>

                        <p class="text-lg text-muted-foreground leading-relaxed reveal-item">
                            Through technical coursework, laboratory exercises, and project-based
                            learning, students can develop the ability to analyze problems, design
                            practical solutions, collaborate with others, and adapt to emerging
                            technologies.
                        </p>

                        <p class="text-lg text-muted-foreground leading-relaxed reveal-item">
                            The program is designed for students who want to explore computing
                            careers and contribute to organizations through reliable, secure, and
                            effective digital solutions. Refer to the official CICT curriculum for
                            the subjects and requirements applicable to your academic year.
                        </p>
                    </section>

                    <!-- Program Details -->
                    <section class="space-y-6 reveal-group">
                        <div class="border-b border-border pb-3 reveal-item">
                            <p class="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                                Explore the Curriculum
                            </p>
                            <h2 class="text-2xl md:text-3xl font-bold text-foreground">
                                Program Details
                            </h2>
                            <p class="text-muted-foreground mt-2">
                                Select a topic below to learn more about the BSIT program.
                            </p>
                        </div>

                        <div class="space-y-3 reveal-item">
                            <Card
                                v-for="section in programDetails"
                                :key="section.title"
                                class="border border-border rounded-md overflow-hidden bg-card"
                            >
                                <Button
                                    @click="toggle(section.title)"
                                    variant="ghost"
                                    :aria-expanded="!!expanded[section.title]"
                                    class="w-full flex justify-start items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 rounded-none transition-colors text-left font-semibold text-card-foreground h-auto min-h-14 whitespace-normal"
                                >
                                    <span
                                        class="font-bold text-lg leading-none w-4 shrink-0 text-center text-primary"
                                    >
                                        {{ expanded[section.title] ? '−' : '+' }}
                                    </span>
                                    <span class="text-left flex-1">
                                        {{ section.title }}
                                    </span>
                                </Button>

                                <div
                                    v-show="expanded[section.title]"
                                    class="p-5 sm:p-6 border-t border-border bg-card"
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
                                            class="font-bold text-foreground text-base mt-6 mb-3"
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
                                            class="text-muted-foreground mb-4 last:mb-0 leading-relaxed"
                                            v-html="block.content"
                                        ></div>
                                    </template>
                                </div>
                            </Card>
                        </div>
                    </section>
                </div>

                <!-- Sidebar -->
                <aside class="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-max reveal-group">
                    <Card class="overflow-hidden shadow-lg bg-card border-border reveal-item">
                        <div class="relative p-6 pb-0">
                            <div
                                class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted flex items-center justify-center"
                            >
                                <img
                                    src="/src/assets/images/colleges/cict/official.png"
                                    alt="College of Information and Communications Technology logo"
                                    class="w-full h-full object-contain p-5"
                                    @error="($event.target as HTMLImageElement).style.display = 'none'"
                                />
                                <div class="text-center p-4">
                                    <span class="text-4xl font-bold text-primary">CICT</span>
                                    <p class="text-xs text-muted-foreground mt-2">
                                        College of Information and Communications Technology
                                    </p>
                                </div>
                            </div>

                            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">
                                BSIT Program
                            </CardTitle>
                            <CardDescription class="text-sm font-medium mt-2">
                                College of Information and Communications Technology
                            </CardDescription>
                        </div>

                        <CardContent class="pt-5">
                            <Separator class="mb-6" />

                            <div class="space-y-4">
                                <h3 class="font-semibold text-lg text-foreground">
                                    Program Overview
                                </h3>

                                <div class="space-y-4 text-sm text-card-foreground">
                                    <div class="flex items-start justify-between gap-3">
                                        <span class="text-muted-foreground">Degree</span>
                                        <span class="font-medium text-right">
                                            Bachelor of Science in Information Technology
                                        </span>
                                    </div>

                                    <Separator />

                                    <div class="flex items-start justify-between gap-3">
                                        <span class="text-muted-foreground">Abbreviation</span>
                                        <span class="font-medium">BSIT</span>
                                    </div>

                                    <Separator />

                                    <div class="flex items-start justify-between gap-3">
                                        <span class="text-muted-foreground">Field</span>
                                        <span class="font-medium text-right">
                                            Computing and Information Technology
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-6 rounded-lg bg-muted/40 p-4">
                                <h4 class="font-semibold text-foreground mb-2">
                                    Need more information?
                                </h4>
                                <p class="text-sm text-muted-foreground leading-relaxed">
                                    Contact the CICT office to ask about the curriculum, program
                                    requirements, and available student opportunities.
                                </p>
                            </div>

                            <Button as-child class="w-full mt-5">
                                <a href="/admission/requirements#enrollment">
                                    Admission Requirements
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>

            <!-- Program Updates -->
            <section class="mt-20 space-y-6 reveal-group">
                <div class="border-b border-border pb-3 reveal-item">
                    <p class="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                        Life in CICT
                    </p>
                    <h2 class="text-2xl md:text-3xl font-bold text-foreground">
                        Program Updates
                    </h2>
                    <p class="text-muted-foreground mt-2">
                        Discover the learning experiences and career possibilities associated with IT.
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        v-for="item in programUpdates"
                        :key="item.id"
                        class="overflow-hidden border-border rounded-xl hover:shadow-lg transition-shadow flex flex-col group bg-card p-0 reveal-item"
                    >
                        <div class="h-56 overflow-hidden bg-muted">
                            <img
                                :src="item.image"
                                :alt="item.title"
                                loading="lazy"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <CardHeader class="pb-2">
                            <div class="mb-2">
                                <Badge variant="secondary" class="font-bold">
                                    {{ item.category }}
                                </Badge>
                            </div>

                            <CardTitle class="text-xl font-bold line-clamp-2 text-foreground">
                                {{ item.title }}
                            </CardTitle>

                            <div
                                class="flex flex-wrap items-center text-xs text-muted-foreground pt-2 gap-x-4 gap-y-1"
                            >
                                <span>{{ item.author }}</span>
                                <span>{{ item.date }}</span>
                            </div>
                        </CardHeader>

                        <CardContent class="flex-1">
                            <CardDescription class="text-sm leading-relaxed">
                                {{ item.excerpt }}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <!-- Closing CTA -->
            <section
                class="mt-20 rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 reveal-group"
            >
                <div class="max-w-3xl reveal-item">
                    <p class="text-sm uppercase tracking-[0.2em] opacity-80 font-semibold mb-3">
                        Your Future Starts Here
                    </p>
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Explore Information Technology?
                    </h2>
                    <p class="text-base md:text-lg opacity-90 leading-relaxed mb-7">
                        Take the next step toward your academic journey. Review the admission
                        requirements and contact St. Francis Xavier College for enrollment guidance.
                    </p>
                    <Button as-child variant="secondary" size="lg">
                        <a href="/admission/requirements#enrollment">
                            Learn About Enrollment
                        </a>
                    </Button>
                </div>
            </section>
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

@media (prefers-reduced-motion: reduce) {
    .reveal-item {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
</style>