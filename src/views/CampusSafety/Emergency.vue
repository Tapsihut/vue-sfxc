<script setup lang="ts">
import { onMounted } from 'vue'
import { Separator } from '@/components/ui/separator'
import {
    Flame,
    HeartPulse,
    AlertTriangle,
    ShieldAlert,
    CloudLightning,
    Waves,
    Phone,
    Users,
    Building2,
} from 'lucide-vue-next'

interface Contact {
    name: string
    number: string
}

interface ContactGroup {
    group: string
    contacts: Contact[]
}

interface Step {
    text: string
    sub?: string[]
}

interface Procedure {
    id: string
    title: string
    instruction?: string
    icon: object
    steps: Step[]
}

const sfxcTeam: Contact[] = [
    { name: 'Julieto Jr. R. Flores', number: '0946-060-5654' },
    { name: 'Regie F. Asis', number: '0910-049-7301' },
    { name: 'Christine Eve F. Arroza', number: '0955-620-6455' },
    { name: 'Regine F. Flores', number: '0916-129-8107' },
    { name: 'Ruel Jeffrey Cuartero', number: '0947-605-3421' },
]

const externalOffices: Contact[] = [
    { name: 'MDRRMO / SARAS', number: '0920-516-9888' },
    { name: 'San Francisco Police Station', number: '0998-978-3071' },
    { name: 'Bureau of Fire Protection', number: '0931-721-8893' },
]

const contactGroups: ContactGroup[] = [
    {
        group: 'SFXC Emergency Response Team',
        contacts: [
            { name: 'Julieto Jr. R. Flores', number: '0946-060-5654' },
            { name: 'Regie F. Asis', number: '0910-049-7301' },
            { name: 'Christine Eve F. Arroza', number: '0955-620-6455' },
            { name: 'Regine F. Flores', number: '0916-129-8107' },
            { name: 'Ruel Jeffrey Cuartero', number: '0947-605-3421' },
        ],
    },
    {
        group: 'San Francisco Agusan del Sur Disaster & Emergency Response Offices',
        contacts: [
            { name: 'MDRRMO / SARAS', number: '0920-516-9888' },
            { name: 'San Francisco Police Station', number: '0998-978-3071' },
            { name: 'Bureau of Fire Protection', number: '0931-721-8893' },
        ],
    },
]

const procedures: Procedure[] = [
    {
        id: 'fire',
        title: 'Fire',
        icon: Flame,
        steps: [
            { text: 'Pull the nearest fire alarm and notify building occupants.' },
            { text: 'Call Bureau of Fire Protection | San Francisco: 0931-721-8893.' },
            { text: 'Assist injured or disabled personnel.' },
            { text: 'Evacuate the building. Activate emergency shutoffs.' },
            { text: 'Attempt to use a fire extinguisher only if you have been trained.' },
            { text: 'Proceed to the nearest evacuation area at the SFXC Open Ground.' },
        ],
    },
    {
        id: 'medical',
        title: 'Medical Emergency',
        icon: HeartPulse,
        steps: [
            { text: 'Identify the medical emergency.' },
            {
                text: 'If life threatening, call SAFER or SARAS | San Francisco MDRRMO: 0920-516-9888.',
            },
            { text: 'Administer first aid if properly trained.' },
            { text: 'Refer accordingly.' },
        ],
    },
    {
        id: 'urgent',
        title: 'Urgent Situation',
        instruction: 'Suspicious person, package, activity, or bomb threat',
        icon: AlertTriangle,
        steps: [
            {
                text: 'Call the authorities.',
                sub: [
                    'San Francisco BFP: 0931-721-8893',
                    'San Francisco Police Station: 0998-978-3071',
                ],
            },
            { text: 'State who, what, where, when, why, and how situation occurred.' },
            { text: 'If there is a bomb threat, turn off all electronics.' },
        ],
    },
    {
        id: 'violent',
        title: 'Violent Incident',
        icon: ShieldAlert,
        steps: [
            { text: 'Avoid — evacuate when you can.' },
            { text: 'Deny — lock/block doors, turn off lights, silence phones.' },
            { text: 'Defend — distract, attack, subdue.' },
            {
                text: 'Call the authorities.',
                sub: [
                    'San Francisco BFP: 0931-721-8893',
                    'San Francisco Police Station: 0998-978-3071',
                ],
            },
        ],
    },
    {
        id: 'severe-weather',
        title: 'Severe Weather',
        icon: CloudLightning,
        steps: [
            {
                text: 'If you hear outdoor sirens or receive a severe weather warning, wait for the alarm and move to the severe weather shelter.',
            },
            { text: 'Stay away from exterior doors and windows.' },
            { text: 'Stay in shelter until danger has passed.' },
        ],
    },
    {
        id: 'earthquake',
        title: 'Earthquake',
        icon: Waves,
        steps: [
            {
                text: 'When shaking starts, DUCK to the ground; take COVER by getting under a sturdy table or other piece of furniture; and HOLD ON until the shaking stops. Stay away from exterior doors and windows.',
            },
            {
                text: 'Stay away from glass, windows, outside doors and walls, and anything that could fall, such as lighting fixtures or furniture.',
            },
            {
                text: 'Stay inside until the shaking stops and it is safe to go outside. Do not exit a building during the shaking.',
            },
            {
                text: 'As soon as the shaking stops, immediately evacuate the venue and proceed to identified evacuation areas using the pre-determined routes guided by the teacher.',
            },
        ],
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
                    Emergency &amp; Disaster<br />Preparedness Plan
                </h1>
                <p class="text-base md:text-lg text-white/60 max-w-xl leading-relaxed reveal-item">
                    Procedures to follow in the event of an emergency on campus.
                </p>
            </div>
        </div>
    </section>

    <div class="min-h-screen bg-background pb-24">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <!-- Key Contacts Section -->
            <div class="mb-20 reveal-group">
                <div class="flex items-center gap-4 mb-4 reveal-item">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Campus Safety</span
                    >
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4 reveal-item">
                    Key Contact Details
                </h2>
                <p class="text-lg text-muted-foreground mb-12 reveal-item">
                    Save these numbers. In any emergency, knowing who to call can save lives.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-item">
                    <!-- SFXC Emergency Response Team -->
                    <div class="border border-border rounded-2xl overflow-hidden">
                        <div
                            class="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30"
                        >
                            <Users class="w-5 h-5 text-primary shrink-0" />
                            <span
                                class="font-semibold text-sm text-foreground uppercase tracking-wide"
                            >
                                SFXC Emergency Response Team
                            </span>
                        </div>
                        <div class="divide-y divide-border">
                            <div
                                v-for="contact in sfxcTeam"
                                :key="contact.name"
                                class="flex items-center justify-between px-6 py-4"
                            >
                                <span class="text-sm text-foreground">{{ contact.name }}</span>
                                <a
                                    :href="`tel:${contact.number.replace(/-/g, '')}`"
                                    class="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer"
                                >
                                    <Phone class="w-3.5 h-3.5" />
                                    {{ contact.number }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- External Response Offices -->
                    <div class="border border-border rounded-2xl overflow-hidden">
                        <div
                            class="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30"
                        >
                            <Building2 class="w-5 h-5 text-primary shrink-0" />
                            <span
                                class="font-semibold text-sm text-foreground uppercase tracking-wide"
                            >
                                Disaster &amp; Emergency Response Offices
                            </span>
                        </div>
                        <div class="divide-y divide-border">
                            <div
                                v-for="contact in externalOffices"
                                :key="contact.name"
                                class="flex items-center justify-between px-6 py-4"
                            >
                                <span class="text-sm text-foreground">{{ contact.name }}</span>
                                <a
                                    :href="`tel:${contact.number.replace(/-/g, '')}`"
                                    class="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer"
                                >
                                    <Phone class="w-3.5 h-3.5" />
                                    {{ contact.number }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Separator class="my-16" />

            <!-- Procedures Section -->
            <div class="mb-4 reveal-group">
                <div class="flex items-center gap-4 mb-4 reveal-item">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Procedures</span
                    >
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4 reveal-item">
                    Emergency Procedures
                </h2>
                <p class="text-lg text-muted-foreground mb-12 reveal-item">
                    The following procedures should be followed in the event of an emergency.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    v-for="procedure in procedures"
                    :key="procedure.id"
                    class="border border-border rounded-2xl overflow-hidden reveal-group"
                >
                    <!-- Card Header -->
                    <div
                        class="flex items-start gap-4 px-6 py-5 border-b border-border bg-muted/20"
                    >
                        <div
                            class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0 mt-0.5"
                        >
                            <component :is="procedure.icon" class="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 class="font-bold text-foreground text-lg leading-tight reveal-item">
                                {{ procedure.title }}
                            </h3>
                            <p
                                v-if="procedure.instruction"
                                class="text-xs text-muted-foreground mt-0.5 reveal-item"
                            >
                                {{ procedure.instruction }}
                            </p>
                        </div>
                    </div>

                    <!-- Steps -->
                    <ol class="px-6 py-5 space-y-3">
                        <li
                            v-for="(step, i) in procedure.steps"
                            :key="i"
                            class="flex gap-3 reveal-item"
                        >
                            <span
                                class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5"
                            >
                                {{ i + 1 }}
                            </span>
                            <div class="flex-1">
                                <p class="text-sm text-foreground leading-relaxed">
                                    {{ step.text }}
                                </p>
                                <ul v-if="step.sub" class="mt-2 space-y-1">
                                    <li
                                        v-for="sub in step.sub"
                                        :key="sub"
                                        class="flex items-center gap-2 text-xs text-muted-foreground"
                                    >
                                        <div
                                            class="w-1 h-1 rounded-full bg-primary/60 shrink-0"
                                        ></div>
                                        {{ sub }}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ol>
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
