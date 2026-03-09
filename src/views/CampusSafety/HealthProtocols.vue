<script setup lang="ts">
import { onMounted } from 'vue'
import { Separator } from '@/components/ui/separator'
import { ClipboardList, HeartPulse, Pill, Briefcase, Shirt, Smile } from 'lucide-vue-next'

interface Step {
    text: string
}

interface Protocol {
    id: string
    title: string
    icon: object
    steps: Step[]
}

const protocols: Protocol[] = [
    {
        id: 'health-examination',
        title: 'Student Health Examination and Screening Protocols',
        icon: ClipboardList,
        steps: [
            {
                text: 'The student shall secure a routing form from the Admissions Office prior to reporting to the School Clinic.',
            },
            {
                text: 'The student shall present the routing form to the Safety and Health Office for verification.',
            },
            {
                text: 'Basic health screening shall be conducted, including vital signs assessment (blood pressure, height, and weight).',
            },
            {
                text: 'A brief health history shall be obtained through interview and/or a health declaration form.',
            },
            {
                text: 'Physical observation and health assessment shall be performed to identify any apparent medical concerns.',
            },
            {
                text: "Findings shall be documented in the student's health record and treated with strict confidentiality.",
            },
            {
                text: 'Students with abnormal findings shall be advised for further medical evaluation or referred to an appropriate healthcare facility when necessary.',
            },
            {
                text: 'The routing form shall be signed and returned to the student upon completion of the health examination.',
            },
        ],
    },
    {
        id: 'first-aid',
        title: 'First Aid Management',
        icon: HeartPulse,
        steps: [
            {
                text: 'The Safety and Health Office shall respond promptly to reported incidents requiring first aid.',
            },
            {
                text: "Initial assessment of the patient's condition shall be conducted to determine the level of care needed.",
            },
            {
                text: 'Basic first aid shall be administered using standard first aid protocols and available supplies.',
            },
            {
                text: 'For serious cases, the patient shall be immediately transported to the nearest medical facility for further treatment.',
            },
            {
                text: 'Incident details shall be documented in the First Aid Logbook, including the nature of injury, treatment given, and outcome.',
            },
            { text: 'Follow-up monitoring shall be conducted when necessary.' },
        ],
    },
    {
        id: 'medication',
        title: 'Medication Dispensation',
        icon: Pill,
        steps: [
            {
                text: 'Only over-the-counter (OTC) medications approved by the Safety and Health Office shall be dispensed.',
            },
            {
                text: "Medications shall be given only after proper assessment of the individual's condition.",
            },
            { text: 'Dosage and usage instructions shall be clearly explained to the recipient.' },
            {
                text: 'All dispensed medications shall be recorded in the Medication Logbook, including name, date, and medication given.',
            },
        ],
    },
    {
        id: 'ojt',
        title: 'Medical Assessment for On-the-Job Training (OJT)',
        icon: Briefcase,
        steps: [
            { text: 'Students shall undergo health assessment as scheduled.' },
            {
                text: 'Vital signs and general physical condition shall be evaluated by the Safety and Health Office.',
            },
            {
                text: 'Health history relevant to OJT requirements shall be reviewed.',
            },
            {
                text: 'The Safety and Health Office shall issue medical clearance or recommendations based on assessment results.',
            },
            {
                text: 'Students with health concerns shall be advised to seek further medical evaluation.',
            },
            {
                text: 'All records shall be kept confidential and used solely for OJT purposes.',
            },
        ],
    },
    {
        id: 'uniform-exemption',
        title: 'Uniform Exemption Recommendation',
        icon: Shirt,
        steps: [
            {
                text: 'The student shall be advised by the OSAS to report to the School Clinic for medical assessment if uniform exemption is needed.',
            },
            {
                text: 'A medical evaluation shall be conducted to determine the health condition affecting uniform compliance.',
            },
            {
                text: 'Supporting medical information or documents shall be reviewed, if applicable.',
            },
            {
                text: 'The Safety and Health Office shall issue a written medical recommendation if uniform exemption is medically justified.',
            },
            {
                text: 'The recommendation shall specify the nature, duration, and conditions of the exemption.',
            },
            {
                text: 'The approved recommendation shall be endorsed to OSAS for proper implementation.',
            },
            {
                text: 'All assessments and recommendations shall be properly documented and kept confidential.',
            },
        ],
    },
    {
        id: 'dental',
        title: 'Dental Services',
        icon: Smile,
        steps: [
            {
                text: 'The student shall visit the School Clinic to request and schedule a dental consultation.',
            },
            {
                text: 'The student shall wait for a notification or call from the School Clinic regarding the confirmed consultation schedule.',
            },
            {
                text: 'On the scheduled date, the student shall report to the School Clinic to accomplish the required dental form to be presented to the dentist.',
            },
            {
                text: 'The designated Dental Office shall provide the necessary dental services to the student.',
            },
            {
                text: 'After the dental consultation, the accomplished dental form shall be returned by the student to the School Clinic for documentation and record purposes.',
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
                    Safety and Health<br />Office Protocols
                </h1>
                <p class="text-base md:text-lg text-white/60 max-w-xl leading-relaxed reveal-item">
                    Health protocols and procedures governing student wellness services at SFXC.
                </p>
            </div>
        </div>
    </section>

    <div class="min-h-screen bg-background pb-24">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <!-- Intro -->
            <div class="mb-16 reveal-group">
                <div class="flex items-center gap-4 mb-4 reveal-item">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Campus Safety</span
                    >
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4 reveal-item">
                    Health Protocols
                </h2>
                <p class="text-lg text-muted-foreground reveal-item">
                    The Safety and Health Office ensures student well-being through structured
                    protocols covering health screening, first aid, medication, OJT clearance,
                    uniform exemptions, and dental services.
                </p>
            </div>

            <Separator class="my-16" />

            <!-- Protocols Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    v-for="protocol in protocols"
                    :key="protocol.id"
                    class="border border-border rounded-2xl overflow-hidden reveal-group"
                >
                    <!-- Card Header -->
                    <div
                        class="flex items-start gap-4 px-6 py-5 border-b border-border bg-muted/20"
                    >
                        <div
                            class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0 mt-0.5"
                        >
                            <component :is="protocol.icon" class="w-5 h-5 text-primary" />
                        </div>
                        <h3 class="font-bold text-foreground text-base leading-snug reveal-item">
                            {{ protocol.title }}
                        </h3>
                    </div>

                    <!-- Steps -->
                    <ol class="px-6 py-5 space-y-3">
                        <li
                            v-for="(step, i) in protocol.steps"
                            :key="i"
                            class="flex gap-3 reveal-item"
                        >
                            <span
                                class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5"
                            >
                                {{ i + 1 }}
                            </span>
                            <p class="flex-1 text-sm text-foreground leading-relaxed">
                                {{ step.text }}
                            </p>
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
