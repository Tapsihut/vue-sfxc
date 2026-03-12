<script setup lang="ts">
import { useCourseGuide } from '@/composables/useCourseGuide'
import PageHero from '@/components/ui/custom/PageHero.vue'
import InterestCard from '@/components/ui/custom/InterestCard.vue'
import RecommendationCard from '@/components/ui/custom/RecommendationCard.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RouterLink } from 'vue-router'

const {
    interests,
    selectedInterests,
    showResults,
    recommendations,
    toggleInterest,
    handleShowResults,
    resetQuiz,
} = useCourseGuide()
</script>

<template>
    <PageHero subtitle="Not sure which program to choose? Let us help you find your path.">
        <template #title>Course Selection Guide</template>
    </PageHero>

    <div class="bg-background">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <!-- Interest Selection Phase -->
            <template v-if="!showResults">
                <!-- Intro -->
                <div
                    class="mb-12"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                            >Course Selection</span
                        >
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Find Your Perfect Course
                    </h2>
                    <p class="text-lg text-muted-foreground max-w-2xl">
                        Select the areas that interest you most. We'll recommend courses that match
                        your passions and career goals.
                    </p>
                    <p class="text-sm text-muted-foreground mt-2">
                        Select at least one interest to get started
                    </p>
                </div>

                <!-- Interest Grid -->
                <div class="grid md:grid-cols-2 gap-6 mb-12">
                    <InterestCard
                        v-for="(interest, index) in interests"
                        :key="interest.id"
                        :interest="interest"
                        :is-selected="selectedInterests.includes(interest.id)"
                        :enter-delay="index * 80"
                        @toggle="toggleInterest"
                    />
                </div>

                <!-- CTA -->
                <div class="flex flex-col items-center gap-4">
                    <div
                        v-if="selectedInterests.length > 0"
                        class="text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                        <span class="font-semibold text-primary">{{
                            selectedInterests.length
                        }}</span>
                        {{ selectedInterests.length === 1 ? 'interest' : 'interests' }} selected
                    </div>

                    <Button
                        size="lg"
                        @click="handleShowResults"
                        :disabled="selectedInterests.length === 0"
                        class="min-w-60 transition-all duration-300"
                        :class="selectedInterests.length > 0 && 'shadow-lg hover:shadow-xl'"
                    >
                        <span class="flex items-center gap-2">
                            Show My Recommendations
                            <svg
                                class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </span>
                    </Button>
                </div>
            </template>

            <!-- Results Phase -->
            <template v-else>
                <!-- Results Header -->
                <div
                    class="mb-12"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                            >Recommendations</span
                        >
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Your Recommended Courses
                    </h2>
                    <p class="text-lg text-muted-foreground">
                        Based on your interests, here are the programs that best match your profile
                    </p>
                </div>

                <div class="space-y-8 mb-12">
                    <RecommendationCard
                        v-for="(course, index) in recommendations"
                        :key="course.code"
                        :course="course"
                        :index="index"
                    />
                </div>

                <Separator class="my-12" />

                <!-- Additional Resources -->
                <div class="grid md:grid-cols-3 gap-6 mb-12">
                    <Card
                        v-motion
                        :initial="{ opacity: 0, y: 24 }"
                        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                    >
                        <CardHeader>
                            <CardTitle class="text-lg">Learn More</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p class="text-sm text-muted-foreground mb-4">
                                Explore detailed information about each program
                            </p>
                            <Button variant="outline" class="w-full" as-child>
                                <a href="/academics/programs">View All Programs</a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card
                        v-motion
                        :initial="{ opacity: 0, y: 24 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 100, duration: 500 },
                        }"
                    >
                        <CardHeader>
                            <CardTitle class="text-lg">Schedule a Visit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p class="text-sm text-muted-foreground mb-4">
                                Tour our campus and see facilities for your chosen program
                            </p>
                            <Button variant="outline" class="w-full" as-child>
                                <a href="/admission/schedule-tour">Book Campus Tour</a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card
                        v-motion
                        :initial="{ opacity: 0, y: 24 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 200, duration: 500 },
                        }"
                    >
                        <CardHeader>
                            <CardTitle class="text-lg">Talk to Admissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p class="text-sm text-muted-foreground mb-4">
                                Get personalized guidance from our admissions team
                            </p>
                            <Button variant="outline" class="w-full" as-child>
                                <RouterLink :to="{ name: 'contact' }">Contact Us</RouterLink>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div class="flex justify-center">
                    <Button variant="ghost" @click="resetQuiz">Start Over</Button>
                </div>
            </template>
        </div>
    </div>
</template>
