<script setup lang="ts">
import { useProgramAccordion } from '@/composables/useProgramAccordion'
import { programDetails, programUpdates, programHead, governor } from '@/data/cbeBsoa'
import ProgramAccordionItem from '@/components/ui/custom/ProgramAccordionItem.vue'
import ProgramCoordinatorCard from '@/components/ui/custom/ProgramCoordinatorCard.vue'
import NewsUpdateCard from '@/components/ui/custom/NewsUpdateCard.vue'
import PageHero from '@/components/ui/custom/PageHero.vue'

const { expanded, toggle } = useProgramAccordion()
</script>

<template>
    <div class="min-h-screen bg-background pb-24">
        <!-- Hero Section -->
        <PageHero
            title="College of Business Education"
            subtitle="Training students in office management, administrative functions, and business operations."
            subtitleMax="max-w-2xl"
        >
            <template #title>Office Administration</template>
        </PageHero>

        <!-- Content -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <div class="grid lg:grid-cols-3 gap-10">
                <!-- Main Content (Left) -->
                <div class="lg:col-span-2 space-y-16">
                    <!-- Program Details Section (no intro description for BSOA) -->
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
