<script setup lang="ts">
import { onMounted } from 'vue'
import { Separator } from '@/components/ui/separator'
import {
    Users,
    Trophy,
    HeartHandshake,
    Briefcase,
    Phone,
    Mail,
    MapPin,
    Clock,
    ExternalLink,
    GraduationCap,
    ShieldCheck,
} from 'lucide-vue-next'

interface Organization {
    name: string
    adviser: string
    president: string
    specialization: string
    fee: string
}

interface ProgramCard {
    id: string
    title: string
    description: string
    icon: object
}

const services: string[] = [
    'Information & Orientation',
    'Guidance & Counseling',
    'Career & Job Placement',
    'Student Handbook Development',
    'Student Discipline',
    'Student Activities',
    'Student Government & Organization',
    'Health Services',
    'Safety & Security',
    'Multi-faith Services',
    'Services for Students with Special Needs & PWD',
    'Culture & Arts',
    'Sports Development Programs',
]

const programs: ProgramCard[] = [
    {
        id: 'organizations',
        title: 'Student Organizations & Clubs',
        description:
            '17 accredited organizations across student government, academics, sports, arts, and advocacy.',
        icon: Users,
    },
    {
        id: 'sports',
        title: 'Sports Development',
        description:
            'Annual intramural games and invitation sports events promoting teamwork and a healthy lifestyle.',
        icon: Trophy,
    },
    {
        id: 'guidance',
        title: 'Guidance Office',
        description:
            'Personal, academic, and emotional counseling support to help students achieve holistic growth.',
        icon: HeartHandshake,
    },
    {
        id: 'career',
        title: 'Career Services',
        description:
            'Career guidance, job opportunities, and placement support for smooth school-to-work transition.',
        icon: Briefcase,
    },
]

const organizations: Organization[] = [
    {
        name: 'Student Council of Leaders (SCL)',
        adviser: 'Marc Gef E. Andres',
        president: 'Airene G. Flaga',
        specialization: 'Student Government — General',
        fee: '₱600.00',
    },
    {
        name: 'Elementary Education Student Affairs (EEdSa)',
        adviser: 'James A. Permale',
        president: 'Rogene D. Malupa',
        specialization: 'Student Government — Program',
        fee: '₱1,500.00',
    },
    {
        name: "Secondary Education Students' Organization (SESO)",
        adviser: 'Jane Marie C. Lozada',
        president: 'Rubelyn Resos',
        specialization: 'Student Government — Program',
        fee: '₱1,500.00',
    },
    {
        name: 'College of Criminal Justice Education Student Body Organization (CCJE-SBO)',
        adviser: 'Nerrio Christian Art J. Nerio',
        president: 'Jade M. Magadan',
        specialization: 'Student Government — Program',
        fee: '₱2,800.00',
    },
    {
        name: 'Web Knights (BSIT)',
        adviser: 'James Raphael B. Ibay',
        president: 'Sherilyn L. Perez',
        specialization: 'Student Government — Program',
        fee: '₱1,800.00',
    },
    {
        name: 'Philippine Association of Students in Office Administration — SFXC Chapter (PASOA SFXC)',
        adviser: 'Niner L. Casinto',
        president: 'Novie Cabigquiz',
        specialization: 'Student Government — Program',
        fee: '₱1,902.00',
    },
    {
        name: 'Junior Philippine Institute of Accountants — SFXC Chapter (JPIA-SFXC)',
        adviser: 'Ferriza Bianca S. Aban',
        president: 'Kenneth E. Jabutay',
        specialization: 'Student Government — Program',
        fee: '₱1,250.00',
    },
    {
        name: 'Business Administration Student Council (BASC)',
        adviser: 'Jerome C. Seraspe',
        president: 'Elaija Grace V. Galinada',
        specialization: 'Student Government — Program',
        fee: '₱1,529.00',
    },
    {
        name: 'College of Business Education Student Council (CBESC)',
        adviser: 'Jayson Acuna',
        president: 'Denmark B. Rivera',
        specialization: 'Student Government — Program',
        fee: '₱1,300.00',
    },
    {
        name: 'Physical Education and Sports Association',
        adviser: 'Lexter Gucela',
        president: 'April Rose T. Surban',
        specialization: 'Sports Development',
        fee: '—',
    },
    {
        name: 'College Red Cross Youth',
        adviser: 'Julieto Flores Jr.',
        president: 'Mark Paul A. Noja',
        specialization: 'Emergency Response',
        fee: '₱425.00',
    },
    {
        name: 'English Language and Literature Club (ELLiT)',
        adviser: 'Jayson B. Osin',
        president: 'Devine R. Mordeno',
        specialization: 'Academic',
        fee: '₱400.00',
    },
    {
        name: "Xavier's Echo",
        adviser: 'Diana R. Joson',
        president: 'Regine Ambray',
        specialization: 'Academic — Journalism',
        fee: '—',
    },
    {
        name: 'Yakang Masanagun Dance Troupe',
        adviser: 'Gennie A. Padino',
        president: 'Jordan Plaza',
        specialization: 'Performing Arts',
        fee: '—',
    },
    {
        name: 'Junior Financial Executives — SFXC Chapter (JFINEX-SFXC)',
        adviser: 'Myffer A. Lamatao',
        president: 'Grace A. Florida',
        specialization: 'Academic',
        fee: '₱600.00',
    },
    {
        name: 'Philippine Junior Marketing Association (PJMA)',
        adviser: 'Sammy G. Marollano Jr.',
        president: 'Justine Carl Godilos',
        specialization: 'Academic',
        fee: '₱600.00',
    },
    {
        name: 'Mental Health Peer Facilitator',
        adviser: 'Julianne Faith Puzon',
        president: 'Dyrich C. Torralba',
        specialization: 'Psychosocial Support',
        fee: '—',
    },
]

const sports: string[] = [
    'Basketball 5x5 & 3x3',
    'Volleyball',
    'Sepak Takraw',
    'Table Tennis',
    'Badminton',
    'Chess',
    'E-Games',
]

const guidanceServices: string[] = [
    'Individual / Group Counseling',
    'Testing',
    'Psychosocial Support',
    'Career Counseling / Consultation',
    'Referral Services',
]

const careerServices: string[] = [
    'Career Counseling / Consultation',
    'Annual Pre-employment & Job Fair',
]

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
                        setTimeout(() => el.classList.add('reveal-visible'), i * 80)
                    })
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.08 },
    )
    document.querySelectorAll('.reveal-group').forEach((el) => observer.observe(el))
})
</script>

<template>
    <!-- Hero -->
    <section class="relative h-[75dvh] overflow-hidden">
        <img
            src="/src/assets/images/sfxc-building.jpg"
            alt="SFXC Building"
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
            <div class="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-16 pb-12 md:pb-16 reveal-group">
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
                    Office of Student<br />Affairs &amp; Services
                </h1>
                <p class="text-base md:text-lg text-white/60 max-w-xl leading-relaxed reveal-item">
                    Fostering holistic student development, welfare, and a vibrant campus life in
                    accordance with CHED Memorandum Order No. 09, s. 2013.
                </p>
            </div>
        </div>
    </section>

    <div class="min-h-screen bg-background pb-24">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <!-- About OSAS -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 reveal-group">
                <!-- Left: Description + Services -->
                <div class="lg:col-span-2 space-y-10">
                    <div>
                        <div class="flex items-center gap-4 mb-4 reveal-item">
                            <div class="w-8 h-0.5 bg-primary"></div>
                            <span
                                class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                                >About</span
                            >
                        </div>
                        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4 reveal-item">
                            Who We Are
                        </h2>
                        <p class="text-lg text-muted-foreground leading-relaxed reveal-item">
                            The Office of Student Affairs and Services (OSAS) is responsible for
                            implementing student services and programs at SFXC that support
                            students' academic experiences and promote holistic student development.
                        </p>
                    </div>

                    <!-- Services Offered -->
                    <div>
                        <p
                            class="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4 reveal-item"
                        >
                            Services Offered — AY {{ new Date().getFullYear() - 1 }}–{{
                                new Date().getFullYear().toString().slice(-2)
                            }}
                        </p>
                        <div class="flex flex-wrap gap-2 reveal-item">
                            <span
                                v-for="service in services"
                                :key="service"
                                class="inline-flex items-center px-3 py-1.5 rounded-full border border-border bg-muted/40 text-xs text-foreground font-medium"
                            >
                                {{ service }}
                            </span>
                        </div>
                    </div>

                    <!-- Basic Processes -->
                    <div class="reveal-item">
                        <p
                            class="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3"
                        >
                            Basic Processes
                        </p>
                        <p class="text-sm text-muted-foreground leading-relaxed">
                            Student programs &amp; services · Clearance · Complaints · Student
                            concerns · All other engagement involving students.
                        </p>
                    </div>
                </div>

                <!-- Right: Contact Card -->
                <div class="reveal-item">
                    <div class="border border-border rounded-2xl overflow-hidden sticky top-24">
                        <div
                            class="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30"
                        >
                            <GraduationCap class="w-5 h-5 text-primary shrink-0" />
                            <span
                                class="font-semibold text-sm text-foreground uppercase tracking-wide"
                                >OSAS Office</span
                            >
                        </div>
                        <div class="divide-y divide-border">
                            <div class="flex items-start gap-3 px-6 py-4">
                                <MapPin
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Location</p>
                                    <p class="text-sm text-foreground">
                                        2nd Floor, SFXC Administrative Building
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 px-6 py-4">
                                <Clock
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Office Hours</p>
                                    <p class="text-sm text-foreground">
                                        Monday – Friday · 8:00 AM – 5:00 PM
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 px-6 py-4">
                                <Phone
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Phone</p>
                                    <a
                                        href="tel:+639088856201"
                                        class="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                                        >+639 088 856 201</a
                                    >
                                </div>
                            </div>
                            <div class="flex items-start gap-3 px-6 py-4">
                                <Mail
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Email</p>
                                    <a
                                        href="mailto:osas@sfxc.edu.ph"
                                        class="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                                        >osas@sfxc.edu.ph</a
                                    >
                                </div>
                            </div>
                            <div class="flex items-start gap-3 px-6 py-4">
                                <ExternalLink
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Facebook</p>
                                    <a
                                        href="https://www.facebook.com/sfxcosas"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                                        >facebook.com/sfxcosas</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Program Quick-Nav Cards -->
            <div class="mb-20 reveal-group">
                <div class="flex items-center gap-4 mb-4 reveal-item">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Programs &amp; Services</span
                    >
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-10 reveal-item">
                    What We Offer
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-item">
                    <button
                        v-for="prog in programs"
                        :key="prog.id"
                        @click="scrollTo(prog.id)"
                        class="group flex flex-col items-start gap-4 p-6 border border-border rounded-2xl bg-background hover:bg-muted/30 text-left transition-colors duration-200 cursor-pointer"
                    >
                        <div
                            class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10"
                        >
                            <component :is="prog.icon" class="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p class="font-semibold text-foreground text-sm leading-tight mb-1.5">
                                {{ prog.title }}
                            </p>
                            <p class="text-xs text-muted-foreground leading-relaxed">
                                {{ prog.description }}
                            </p>
                        </div>
                    </button>
                </div>
            </div>

            <Separator class="my-16" />

            <!-- Student Organizations & Clubs -->
            <div id="organizations" class="mb-20 reveal-group">
                <div class="flex items-center gap-4 mb-4 reveal-item">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Campus Life</span
                    >
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4 reveal-item">
                    Student Organizations &amp; Clubs
                </h2>
                <p class="text-lg text-muted-foreground mb-10 reveal-item">
                    Accredited, recognized, and authorized student organizations, councils, and
                    governments for AY 2025–26.
                </p>

                <!-- Table -->
                <div class="border border-border rounded-2xl overflow-hidden reveal-item">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-border bg-muted/30">
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap w-8"
                                    >
                                        #
                                    </th>
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground"
                                    >
                                        Organization
                                    </th>
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                                    >
                                        Specialization
                                    </th>
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                                    >
                                        Faculty Adviser
                                    </th>
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                                    >
                                        President / Head
                                    </th>
                                    <th
                                        class="text-right px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                                    >
                                        Fee
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                <tr
                                    v-for="(org, i) in organizations"
                                    :key="org.name"
                                    class="hover:bg-muted/20 transition-colors duration-150"
                                >
                                    <td
                                        class="px-5 py-4 text-xs text-muted-foreground tabular-nums"
                                    >
                                        {{ i + 1 }}
                                    </td>
                                    <td class="px-5 py-4">
                                        <p class="font-medium text-foreground leading-snug">
                                            {{ org.name }}
                                        </p>
                                    </td>
                                    <td class="px-5 py-4 whitespace-nowrap">
                                        <span
                                            class="inline-flex items-center px-2.5 py-1 rounded-lg bg-muted/60 text-muted-foreground text-xs font-medium"
                                        >
                                            {{ org.specialization }}
                                        </span>
                                    </td>
                                    <td
                                        class="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap"
                                    >
                                        {{ org.adviser }}
                                    </td>
                                    <td
                                        class="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap"
                                    >
                                        {{ org.president }}
                                    </td>
                                    <td
                                        class="px-5 py-4 text-sm text-right font-medium text-foreground whitespace-nowrap tabular-nums"
                                    >
                                        {{ org.fee }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Separator class="my-16" />

            <!-- Supporting Services: Sports · Guidance · Career -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Sports Development -->
                <div
                    id="sports"
                    class="border border-border rounded-2xl overflow-hidden reveal-group"
                >
                    <div
                        class="flex items-start gap-4 px-6 py-5 border-b border-border bg-muted/20"
                    >
                        <div
                            class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0 mt-0.5"
                        >
                            <Trophy class="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 class="font-bold text-foreground text-lg leading-tight reveal-item">
                                Sports Development
                            </h3>
                            <p class="text-xs text-muted-foreground mt-0.5 reveal-item">
                                On-campus &amp; off-campus sports programs
                            </p>
                        </div>
                    </div>
                    <div class="px-6 py-5 space-y-4">
                        <p class="text-sm text-muted-foreground leading-relaxed reveal-item">
                            The Sports Development Program offers on-campus and off-campus sports
                            activities, including annual intramural games and occasional invitation
                            games, which help students develop teamwork, discipline, leadership, and
                            a healthy lifestyle.
                        </p>
                        <div>
                            <p
                                class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3 reveal-item"
                            >
                                Common Sports
                            </p>
                            <ul class="space-y-2">
                                <li
                                    v-for="sport in sports"
                                    :key="sport"
                                    class="flex items-center gap-2.5 text-sm text-foreground reveal-item"
                                >
                                    <div
                                        class="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"
                                    ></div>
                                    {{ sport }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Guidance Office -->
                <div
                    id="guidance"
                    class="border border-border rounded-2xl overflow-hidden reveal-group"
                >
                    <div
                        class="flex items-start gap-4 px-6 py-5 border-b border-border bg-muted/20"
                    >
                        <div
                            class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0 mt-0.5"
                        >
                            <HeartHandshake class="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 class="font-bold text-foreground text-lg leading-tight reveal-item">
                                Guidance Office
                            </h3>
                            <p class="text-xs text-muted-foreground mt-0.5 reveal-item">
                                Counseling &amp; psychosocial support
                            </p>
                        </div>
                    </div>
                    <div class="px-6 py-5 space-y-4">
                        <p class="text-sm text-muted-foreground leading-relaxed reveal-item">
                            The Guidance and Counseling Office provides support services to help
                            students cope with personal, academic, and emotional concerns, guiding
                            them toward responsible decisions, improved well-being, and personal
                            growth.
                        </p>
                        <!-- Contact -->
                        <div class="space-y-2 reveal-item">
                            <div class="flex items-center gap-2 text-sm">
                                <MapPin class="w-3.5 h-3.5 text-primary shrink-0" />
                                <span class="text-muted-foreground"
                                    >Inside OSAS, 2nd Floor Admin Bldg.</span
                                >
                            </div>
                            <div class="flex items-center gap-2 text-sm">
                                <Clock class="w-3.5 h-3.5 text-primary shrink-0" />
                                <span class="text-muted-foreground">Mon–Fri, 8:00 AM–5:00 PM</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm">
                                <Mail class="w-3.5 h-3.5 text-primary shrink-0" />
                                <a
                                    href="mailto:guidanceoffice@sfxc.edu.ph"
                                    class="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                                    >guidanceoffice@sfxc.edu.ph</a
                                >
                            </div>
                            <div class="flex items-center gap-2 text-sm">
                                <Phone class="w-3.5 h-3.5 text-primary shrink-0" />
                                <a
                                    href="tel:+639088856201"
                                    class="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                                    >+639 088 856 201</a
                                >
                            </div>
                        </div>
                        <div>
                            <p
                                class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3 reveal-item"
                            >
                                Services
                            </p>
                            <ul class="space-y-2">
                                <li
                                    v-for="svc in guidanceServices"
                                    :key="svc"
                                    class="flex items-center gap-2.5 text-sm text-foreground reveal-item"
                                >
                                    <div
                                        class="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"
                                    ></div>
                                    {{ svc }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Career Services -->
                <div
                    id="career"
                    class="border border-border rounded-2xl overflow-hidden reveal-group"
                >
                    <div
                        class="flex items-start gap-4 px-6 py-5 border-b border-border bg-muted/20"
                    >
                        <div
                            class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0 mt-0.5"
                        >
                            <Briefcase class="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 class="font-bold text-foreground text-lg leading-tight reveal-item">
                                Career Services
                            </h3>
                            <p class="text-xs text-muted-foreground mt-0.5 reveal-item">
                                Job placement &amp; career guidance
                            </p>
                        </div>
                    </div>
                    <div class="px-6 py-5 space-y-4">
                        <p class="text-sm text-muted-foreground leading-relaxed reveal-item">
                            The Career and Job Placement Office assists students in preparing for
                            employment by providing career guidance, job opportunities, and
                            placement support, helping them build confidence and transition smoothly
                            from school to work.
                        </p>
                        <div class="reveal-item">
                            <div class="flex items-center gap-2 text-sm mb-2">
                                <ShieldCheck class="w-3.5 h-3.5 text-primary shrink-0" />
                                <span class="text-muted-foreground text-xs"
                                    >Operated under the Guidance Office</span
                                >
                            </div>
                        </div>
                        <div>
                            <p
                                class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3 reveal-item"
                            >
                                Services
                            </p>
                            <ul class="space-y-2">
                                <li
                                    v-for="svc in careerServices"
                                    :key="svc"
                                    class="flex items-center gap-2.5 text-sm text-foreground reveal-item"
                                >
                                    <div
                                        class="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"
                                    ></div>
                                    {{ svc }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Separator class="mt-20" />
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
