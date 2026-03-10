<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { RouterLink } from 'vue-router'

interface Facility {
    id: number
    name: string
    description: string
    image: string
    tag: string
    features: string[]
}

const facilities: Facility[] = [
    {
        id: 1,
        name: 'Library',
        description:
            'An expansive learning hub with over 10,000 volumes, private study rooms, and full digital access.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Academic',
        features: ['10,000+ Books', 'Digital Resources', 'Study Rooms', 'Computer Lab'],
    },
    {
        id: 2,
        name: 'Science Laboratory',
        description:
            'Purpose-built labs for Physics, Chemistry, and Biology — equipped to the highest safety standards.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Academic',
        features: [
            'Modern Equipment',
            'Safety-Certified',
            'Expert Supervision',
            'Hands-on Learning',
        ],
    },
    {
        id: 3,
        name: 'Computer Laboratory',
        description:
            'High-performance workstations with enterprise-grade internet and a full professional software suite.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Technology',
        features: ['Latest Hardware', 'Fiber Internet', 'Software Suite', 'Tech Support'],
    },
    {
        id: 4,
        name: 'Classroom',
        description:
            'A modern learning space equipped with the latest technology for an engaging educational experience.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Academic',
        features: [
            'Smart Board',
            'High-Speed Internet',
            'Comfortable Seating',
            'Interactive Learning',
        ],
    },
    {
        id: 5,
        name: 'Audio Visual Room',
        description:
            'A versatile space for multimedia presentations, film screenings, and creative projects with state-of-the-art AV equipment.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Technology',
        features: ['Projector', 'Sound System', 'Recording Equipment', 'Flexible Seating'],
    },
    {
        id: 6,
        name: 'Comfort Room',
        description:
            'Clean and well-maintained facilities with accessibility features to ensure comfort for all students and visitors.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Facilities',
        features: ['Accessible Stalls', 'Hygienic', 'Regularly Maintained', 'Family-Friendly'],
    },
    {
        id: 7,
        name: 'Elevator',
        description:
            'A modern elevator system providing easy access to all floors, designed with safety and efficiency in mind.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Facilities',
        features: ['Spacious', 'Safety Features', 'Energy Efficient', 'Regular Maintenance'],
    },
    {
        id: 8,
        name: 'Clinic',
        description:
            'On-site health services staffed by qualified medical professionals, offering first aid and wellness support to our school community.',
        image: 'https://placehold.co/800x600?text=800x600',
        tag: 'Health',
        features: [
            'First Aid',
            'Health Consultations',
            'Wellness Programs',
            'Confidential Support',
        ],
    },
]

const activeFacility = ref<Facility>(facilities[0]!)

const targetSection = ref<HTMLElement | null>(null)

const setActive = (facility: Facility) => {
    activeFacility.value = facility
}

const scrollToSection = (facility: any) => {
    setActive(facility)
    targetSection.value?.scrollIntoView({ behavior: 'smooth' })
}

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

    document.querySelectorAll('.reveal-group').forEach((group) => {
        observer.observe(group)
    })
})
</script>

<template>
    <div class="min-h-screen bg-background">
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

            <!-- Content overlay -->
            <div class="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
                <div class="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-16 pb-12 md:pb-16">
                    <div class="hidden md:flex items-center gap-4 mb-6">
                        <div class="w-10 h-0.5 bg-primary"></div>
                        <span class="text-white/50 text-xs font-medium uppercase tracking-[0.3em]"
                            >St. Francis Xavier College</span
                        >
                    </div>
                    <h1
                        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4"
                        style="font-family: 'Times New Roman', Times, serif"
                    >
                        Campus Facilities and Virtual Tour
                    </h1>
                    <p class="text-base md:text-lg text-white/60 max-w-md leading-relaxed">
                        Explore our modern infrastructure designed to support a holistic and
                        interactive learning experience.
                    </p>
                </div>
            </div>
        </section>
        <!-- ─── Interactive Facility Explorer ─────────────────────── -->
        <section class="py-20 px-6 lg:px-10 bg-background reveal-group">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col lg:flex-row gap-10">
                    <!-- Left — Selector List -->
                    <nav class="lg:w-72 shrink-0 space-y-1 reveal-item">
                        <p
                            class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-3"
                        >
                            Select a Facility
                        </p>
                        <button
                            v-for="facility in facilities"
                            :key="facility.id"
                            class="w-full text-left px-4 py-3 rounded-lg flex items-center justify-between gap-3 transition-all duration-200 group"
                            :class="
                                activeFacility.id === facility.id
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'hover:bg-muted text-foreground'
                            "
                            @click="setActive(facility)"
                        >
                            <span class="font-medium text-sm">{{ facility.name }}</span>
                            <Badge
                                variant="secondary"
                                class="text-[10px] shrink-0 transition-colors duration-200"
                                :class="
                                    activeFacility.id === facility.id
                                        ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30'
                                        : ''
                                "
                            >
                                {{ facility.tag }}
                            </Badge>
                        </button>
                    </nav>

                    <Separator
                        orientation="vertical"
                        class="hidden lg:block self-stretch reveal-item"
                    />

                    <!-- Right — Detail View -->
                    <Transition name="panel" mode="out-in">
                        <div
                            :key="activeFacility.id"
                            class="flex-1 flex flex-col md:flex-row gap-8 reveal-item"
                        >
                            <!-- Image -->
                            <div
                                class="md:w-1/2 aspect-4/3 overflow-hidden rounded-xl bg-muted shrink-0"
                            >
                                <img
                                    :src="activeFacility.image"
                                    :alt="activeFacility.name"
                                    class="w-full h-full object-cover"
                                />
                            </div>

                            <!-- Info -->
                            <div class="flex flex-col justify-between gap-6 flex-1">
                                <div>
                                    <h2 class="text-3xl font-bold tracking-tight mb-3">
                                        {{ activeFacility.name }}
                                    </h2>
                                    <p class="text-muted-foreground leading-relaxed">
                                        {{ activeFacility.description }}
                                    </p>
                                </div>

                                <Separator />

                                <div class="grid grid-cols-2 gap-3">
                                    <div v-for="feature in activeFacility.features" :key="feature">
                                        <Card
                                            class="py-3 px-4 bg-muted/40 border-0 shadow-none h-full"
                                        >
                                            <p class="text-sm font-medium text-foreground">
                                                {{ feature }}
                                            </p>
                                        </Card>
                                    </div>
                                </div>

                                <RouterLink :to="{ name: 'contact' }">
                                    <Button variant="outline" class="w-fit"
                                        >Schedule a Visit</Button
                                    >
                                </RouterLink>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </section>

        <!-- ─── Campus Snapshot Strip ─────────────────────────────── -->
        <section class="py-16 bg-muted/30 border-t border-border overflow-hidden reveal-group">
            <div class="max-w-7xl mx-auto px-6 lg:px-10 mb-8 reveal-item">
                <h2 class="text-2xl font-bold tracking-tight">Around Campus</h2>
                <!-- <p class="text-muted-foreground text-sm mt-1">A glimpse of life at our school</p> -->
            </div>

            <div class="flex gap-4 overflow-x-auto no-scrollbar px-6 lg:px-10 pb-2">
                <Card
                    v-for="(facility, i) in facilities"
                    :key="facility.id"
                    class="shrink-0 w-64 overflow-hidden border-0 shadow-md cursor-pointer group hover:shadow-lg transition-all duration-150 reveal-item"
                    @click="scrollToSection(facility)"
                >
                    <div class="relative h-40 overflow-hidden bg-muted">
                        <img
                            :src="facility.image"
                            :alt="facility.name"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div class="absolute bottom-3 left-3 right-3">
                            <CardTitle class="text-white text-sm font-semibold">{{
                                facility.name
                            }}</CardTitle>
                        </div>
                    </div>
                    <CardContent class="p-3">
                        <CardDescription class="text-xs line-clamp-2">{{
                            facility.description
                        }}</CardDescription>
                    </CardContent>
                </Card>
            </div>
        </section>
    </div>
</template>

<style scoped>
.reveal-item {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-visible {
    opacity: 1;
    transform: translateY(0);
}

@keyframes rise {
    from {
        opacity: 0;
        transform: translateY(28px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(16px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-rise {
    animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.animate-slide-up {
    animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
    opacity: 0;
}

/* ── Panel switch transition ─────────────── */
.panel-enter-active {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}
.panel-leave-active {
    transition:
        opacity 0.15s ease,
        transform 0.15s ease;
}
.panel-enter-from {
    opacity: 0;
    transform: translateX(12px);
}
.panel-leave-to {
    opacity: 0;
    transform: translateX(-8px);
}

/* ── Hide scrollbar on strip ─────────────── */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
