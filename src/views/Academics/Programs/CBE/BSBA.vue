<script setup lang="ts">
import { useProgramAccordion } from '@/composables/useProgramAccordion'
import {
    programDescription,
    programDetails,
    majors,
    programUpdates,
    programHead,
    governor,
} from '@/data/cbeBsba'
import ProgramAccordionItem from '@/components/ui/custom/ProgramAccordionItem.vue'
import ProgramCoordinatorCard from '@/components/ui/custom/ProgramCoordinatorCard.vue'
import NewsUpdateCard from '@/components/ui/custom/NewsUpdateCard.vue'
import MajorSection from '@/components/ui/custom/MajorSection.vue'
import PageHero from '@/components/ui/custom/PageHero.vue'

const { expanded, toggle, expandedMajors, toggleMajor, scrollToMajor } = useProgramAccordion()
</script>

<template>
    <div class="min-h-screen bg-background pb-24">
        <!-- Hero Section -->
        <PageHero
            title="College of Business Education"
            subtitle="Integrating management, marketing, finance, and entrepreneurship for future business leaders."
            subtitleMax="max-w-2xl"
        >
            <template #title>Business Administration</template>
        </PageHero>

        <!-- Content -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <div class="grid lg:grid-cols-3 gap-10">
                <!-- Main Content (Left) -->
                <div class="lg:col-span-2 space-y-16">
                    <!-- Intro Description -->
                    <div
                        class="space-y-4"
                        v-motion
                        :initial="{ opacity: 0, x: -24 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { type: 'spring', stiffness: 100, damping: 18 },
                        }"
                    >
                        <h2 class="text-3xl font-bold text-foreground">
                            Bachelor of Science in Business Administration
                        </h2>
                        <p class="text-muted-foreground leading-relaxed text-lg">
                            {{ programDescription }}
                        </p>

                        <div class="mt-8 space-y-4 bg-muted/30 p-6 rounded-lg border border-border">
                            <h3 class="font-bold text-foreground text-lg uppercase">
                                St. Francis Xavier College offers five majors under the BS Business
                                Administration program:
                            </h3>
                            <ul class="flex flex-col space-y-2">
                                <li v-for="major in majors" :key="major.name">
                                    <button
                                        @click="scrollToMajor(major.name)"
                                        class="text-primary hover:underline flex items-center gap-2 font-medium text-left transition-colors"
                                    >
                                        <span
                                            class="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                                        ></span>
                                        {{ major.name }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Program Details Section -->
                    <div class="space-y-6">
                        <div
                            class="border-b border-border pb-2"
                            v-motion
                            :initial="{ opacity: 0, x: -24 }"
                            :visible-once="{
                                opacity: 1,
                                x: 0,
                                transition: { type: 'spring', stiffness: 100, damping: 18 },
                            }"
                        >
                            <h3 class="text-2xl font-bold text-primary">Program Details</h3>
                        </div>

                        <div class="space-y-3">
                            <ProgramAccordionItem
                                v-for="(section, idx) in programDetails"
                                :key="section.title"
                                :section="section"
                                :is-expanded="!!expanded[section.title]"
                                :index="idx"
                                @toggle="toggle(section.title)"
                            />
                        </div>
                    </div>

                    <!-- Majors Sections -->
                    <MajorSection
                        v-for="major in majors"
                        :key="major.name"
                        :id="major.name.toLowerCase().replace(/\s+/g, '-')"
                        :major="major"
                        :expanded-items="expandedMajors[major.name] ?? {}"
                        @toggle="toggleMajor(major.name, $event)"
                    />
                </div>

                <!-- Sidebar (Right) -->
                <div class="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-max">
                    <ProgramCoordinatorCard :coordinator="programHead" />
                    <ProgramCoordinatorCard :coordinator="governor" :delay="120" />
                </div>
            </div>

            <!-- Program Updates Section -->
            <div class="space-y-6 mt-16">
                <div
                    class="border-b border-border pb-2"
                    v-motion
                    :initial="{ opacity: 0, x: -24 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { type: 'spring', stiffness: 100, damping: 18 },
                    }"
                >
                    <h3 class="text-2xl font-bold text-primary">Program Updates</h3>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NewsUpdateCard
                        v-for="(item, i) in programUpdates"
                        :key="item.id"
                        :item="item"
                        :index="i"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
