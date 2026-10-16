
<script setup lang="ts">
import type { Component } from 'vue'
import {
    Users,
    GraduationCap,
    Settings,
    UserRound,
    Lightbulb,
    ClipboardCheck,
    Shield,
    Heart,
    Star,
} from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PageHero from '@/components/ui/custom/PageHero.vue'

interface OrganizationUnit {
    title: string
    description: string
    icon: Component
}

interface CoreValue {
    title: string
    description: string
    icon: Component
}

const departments: OrganizationUnit[] = [
    {
        title: 'Academic Affairs',
        description: 'Oversees academic programs and instruction.',
        icon: GraduationCap,
    },
    {
        title: 'Student Affairs',
        description: 'Supports student life and development.',
        icon: Users,
    },
    {
        title: 'Administration & Finance',
        description: 'Manages operations and resources.',
        icon: Settings,
    },
    {
        title: 'Human Resources',
        description: 'Builds and supports our people.',
        icon: UserRound,
    },
    {
        title: 'Research & Extension',
        description: 'Advances knowledge and community engagement.',
        icon: Lightbulb,
    },
    {
        title: 'Planning & Quality Assurance',
        description: 'Ensures continuous institutional improvement.',
        icon: ClipboardCheck,
    },
]

const coreValues: CoreValue[] = [
    {
        title: 'Good Governance',
        description: 'Transparent, accountable, and ethical leadership.',
        icon: Shield,
    },
    {
        title: 'Quality Education',
        description: 'Relevant and transformative learning.',
        icon: Users,
    },
    {
        title: 'Student-Centered',
        description: 'Recognizing and nurturing every potential.',
        icon: Heart,
    },
    {
        title: 'Community Impact',
        description: 'Service beyond the campus.',
        icon: Star,
    },
]
</script>

<template>
    <main class="min-h-screen bg-background">
        <PageHero subtitle="Explore the college's organizational structure and leadership that work together to fulfill our mission and vision.">
            <template #title>Organizational Structure</template>
        </PageHero>

        <!-- Organizational Chart -->
        <section id="organizational-chart" class="bg-background py-10 md:py-14">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                <div
                    class="mx-auto mb-8 max-w-3xl text-center md:mb-10"
                    v-motion
                    :initial="{ opacity: 0, y: 16 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                >
                    <div class="mb-3 flex items-center justify-center gap-3">
                        <div class="h-0.5 w-6 bg-primary"></div>
                        <span class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Institutional Governance
                        </span>
                        <div class="h-0.5 w-6 bg-primary"></div>
                    </div>

                    <h2 class="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                        Our Organizational Structure
                    </h2>

                    <p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        Our leadership and departments work together to support effective governance,
                        quality education, and holistic student development.
                    </p>
                </div>

                <!-- Leadership -->
                <div class="leadership-level mx-auto flex max-w-xs flex-col items-center sm:max-w-sm">
                    <!-- Board of Trustees -->
                    <article
                        class="w-full rounded-2xl border border-primary/20 bg-primary p-4 text-center text-primary-foreground shadow-sm sm:p-5"
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                    >
                        <div class="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-primary-foreground/60 bg-primary-foreground/15">
                            <img
                                src="https://placehold.co/150x150"
                                alt="Board of Trustees"
                                class="h-full w-full object-cover"
                            />
                        </div>

                        <h3 class="text-base font-bold sm:text-lg">
                            Board of Trustees
                        </h3>
                        <p class="mt-1 text-xs leading-relaxed text-primary-foreground/80">
                            Governance and strategic direction
                        </p>
                    </article>

                    <div class="connector-vertical h-7"></div>

                    <!-- College President -->
                    <article
                        class="w-full rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md sm:p-5"
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{ opacity: 1, y: 0, transition: { delay: 80, duration: 500 } }"
                    >
                        <div class="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30 bg-primary/10">
                            <img
                                src="https://placehold.co/150x150"
                                alt="College President"
                                class="h-full w-full object-cover"
                            />
                        </div>

                        <h3 class="text-base font-bold text-foreground sm:text-lg">
                            College President
                        </h3>
                        <p class="mt-1 text-xs leading-relaxed text-muted-foreground">
                            Institutional leadership and management
                        </p>
                    </article>
                </div>

                <!-- Connection to Departments -->
                <div class="department-connector mx-auto max-w-6xl">
                    <div class="connector-vertical h-7"></div>
                    <div class="connector-horizontal"></div>
                </div>

                <!-- Departments -->
                <div class="department-grid grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <article
                        v-for="(department, index) in departments"
                        :key="department.title"
                        class="department-item flex min-w-0 flex-col items-center"
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 50, duration: 400 },
                        }"
                    >
                        <div class="department-branch"></div>

                        <Card class="department-card w-full rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md">
                            <CardHeader class="items-center p-4 text-center">
                                <div class="mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-primary/30 bg-primary/10">
                                    <img
                                        src="https://placehold.co/150x150"
                                        :alt="department.title"
                                        class="h-full w-full object-cover"
                                    />
                                </div>

                                <CardTitle class="text-sm leading-snug">
                                    {{ department.title }}
                                </CardTitle>

                                <p class="text-xs leading-relaxed text-muted-foreground">
                                    {{ department.description }}
                                </p>
                            </CardHeader>

                            <CardContent class="flex justify-center px-3 pb-3 pt-0">
                                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <component :is="department.icon" class="h-4 w-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </article>
                </div>

                <p class="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
                    Official leadership and department photos can replace the sample images.
                </p>
            </div>
        </section>

        <!-- Leadership with Purpose -->
        <section class="border-y border-border bg-muted/20 py-10 md:py-14">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                <div class="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                    <div
                        class="lg:col-span-5"
                        v-motion
                        :initial="{ opacity: 0, x: -20 }"
                        :visible-once="{ opacity: 1, x: 0, transition: { duration: 500 } }"
                    >
                        <div class="mb-3 flex items-center gap-3">
                            <div class="h-0.5 w-6 bg-primary"></div>
                            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                Working Together
                            </span>
                        </div>

                        <h2 class="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                            Leadership with Purpose
                        </h2>

                        <p class="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                            Our organizational structure encourages collaboration, accountability,
                            and excellence throughout the college. Leaders, faculty, staff, and
                            stakeholders contribute to a supportive learning environment for every
                            Xavier Knight.
                        </p>

                        <div class="mt-4 h-0.5 w-12 bg-secondary"></div>

                        <p class="mt-4 text-base italic text-primary">
                            "Together in Faith, We Build a Brighter Future."
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-7 lg:gap-5 lg:border-l lg:border-border lg:pl-8">
                        <article
                            v-for="(value, index) in coreValues"
                            :key="value.title"
                            class="px-1 text-center"
                            v-motion
                            :initial="{ opacity: 0, y: 12 }"
                            :visible-once="{
                                opacity: 1,
                                y: 0,
                                transition: { delay: index * 70, duration: 400 },
                            }"
                        >
                            <div class="mx-auto mb-2 flex h-9 w-9 items-center justify-center text-secondary">
                                <component :is="value.icon" class="h-6 w-6" :stroke-width="1.8" />
                            </div>

                            <h3 class="text-sm font-bold leading-snug text-foreground">
                                {{ value.title }}
                            </h3>

                            <p class="mt-2 text-xs leading-relaxed text-muted-foreground">
                                {{ value.description }}
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.connector-vertical {
    width: 2px;
    flex-shrink: 0;
    background-color: hsl(var(--primary) / 0.65);
}

.department-connector {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.connector-horizontal {
    width: 83.333%;
    height: 2px;
    border-radius: 2px;
    background-color: hsl(var(--primary) / 0.65);
}

.department-branch {
    display: none;
    width: 2px;
    height: 20px;
    flex-shrink: 0;
    background-color: hsl(var(--primary) / 0.65);
}

@media (min-width: 1024px) {
    .department-connector {
        height: 34px;
    }

    .department-connector .connector-vertical {
        height: 20px;
    }

    .department-grid {
        position: relative;
    }

    .department-grid::before {
        content: '';
        position: absolute;
        top: 0;
        left: 8.333%;
        right: 8.333%;
        height: 2px;
        background-color: hsl(var(--primary) / 0.65);
    }

    .department-branch {
        display: block;
    }
}

@media (max-width: 1023px) {
    .department-connector {
        display: none;
    }

    .department-item {
        position: relative;
    }

    .department-branch {
        display: block;
        height: 16px;
    }
}

@media (max-width: 639px) {
    .leadership-level {
        max-width: 280px;
    }

    .department-grid {
        gap: 12px;
    }

    .department-card {
        max-width: 360px;
        margin-inline: auto;
    }
}

@media (prefers-reduced-motion: reduce) {
    .department-card {
        transition: none;
    }
}
</style>