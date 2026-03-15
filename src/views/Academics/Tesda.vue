<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CheckListCard from '@/components/ui/custom/CheckListCard.vue'
import {
    tesdaCourses,
    requirements,
    benefits,
    competenciesIcon,
    requirementsIcon,
} from '@/data/tesdaData'
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- About TESDA Section -->
        <section class="py-12 sm:py-16 md:py-20 lg:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div
                        v-motion
                        :initial="{ opacity: 0, x: -24 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 600, ease: 'easeOut' },
                        }"
                    >
                        <h2
                            class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground"
                        >
                            Excellence in Technical Education
                        </h2>
                        <div
                            class="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed"
                        >
                            <p>
                                St. Francis Xavier College TESDA programs are designed to provide
                                competency-based training that meets industry standards and prepares
                                students for successful careers in their chosen fields.
                            </p>
                            <p>
                                Our training center is equipped with modern facilities and managed
                                by certified instructors who bring real-world experience to the
                                classroom.
                            </p>
                            <p>
                                We are committed to delivering quality technical vocational
                                education that transforms lives and contributes to national
                                development.
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <Card
                            v-for="(benefit, index) in benefits"
                            :key="benefit.title"
                            class="text-center hover:shadow-lg transition-shadow"
                            v-motion
                            :initial="{ opacity: 0, scale: 0.92 }"
                            :visible-once="{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 18,
                                    delay: index * 80,
                                },
                            }"
                        >
                            <CardHeader class="pb-3">
                                <div
                                    class="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3"
                                >
                                    <component :is="benefit.icon" class="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle class="text-base">{{ benefit.title }}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription class="text-xs sm:text-sm">{{
                                    benefit.description
                                }}</CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        <Separator />

        <!-- Driving NC II Hero Section -->
        <section class="relative h-[70vh] min-h-500px max-h-700px overflow-hidden">
            <!-- Hero Image -->
            <div class="absolute inset-0">
                <img
                    src="@/assets/images/sfxc-building.jpg"
                    alt="Professional Driving Training"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40"
                />
            </div>

            <!-- Content -->
            <div class="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div class="max-w-xl">
                    <h1
                        class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 700 } }"
                    >
                        Driving NC II
                    </h1>

                    <p
                        class="text-lg text-white/80 mb-8 leading-relaxed"
                        v-motion
                        :initial="{ opacity: 0, y: 20 }"
                        :enter="{ opacity: 1, y: 0, transition: { delay: 380, duration: 600 } }"
                    >
                        Professional driving training program for operating light vehicles safely
                        and efficiently.
                    </p>

                    <!-- CTA Buttons -->
                    <div
                        class="flex flex-wrap gap-4"
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :enter="{ opacity: 1, y: 0, transition: { delay: 520, duration: 500 } }"
                    >
                        <Button size="lg" class="bg-white text-black hover:bg-white/90">
                            Apply Now
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Course Details Section -->
        <section class="py-16 sm:py-20 bg-background">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <div
                        v-motion
                        :initial="{ opacity: 0, x: -24 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 600, ease: 'easeOut' },
                        }"
                    >
                        <CheckListCard
                            title="Key Competencies"
                            :icon="competenciesIcon"
                            :items="tesdaCourses[0]?.skills ?? []"
                        />
                    </div>
                    <div
                        v-motion
                        :initial="{ opacity: 0, x: 24 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 600, delay: 80, ease: 'easeOut' },
                        }"
                    >
                        <CheckListCard
                            title="Admission Requirements"
                            :icon="requirementsIcon"
                            :items="requirements"
                        />
                    </div>
                </div>
            </div>
        </section>

        <Separator />
    </div>
</template>
