<script setup lang="ts">
import { useProgramAccordion } from '@/composables/useProgramAccordion'
import { programDetails, programUpdates, coordinator } from '@/data/cbeBsa'
import ProgramAccordionItem from '@/components/ui/custom/ProgramAccordionItem.vue'
import ProgramCoordinatorCard from '@/components/ui/custom/ProgramCoordinatorCard.vue'
import NewsUpdateCard from '@/components/ui/custom/NewsUpdateCard.vue'
import PageHero from '@/components/ui/custom/PageHero.vue'

const { expanded, toggle } = useProgramAccordion()
</script>

<template>
    <div class="min-h-screen bg-background pb-24">
        <PageHero
            title="College of Business Education"
            subtitle="Building future Certified Public Accountants through rigorous accounting education."
            subtitleMax="max-w-2xl"
        >
            <template #title>Accountancy</template>
        </PageHero>

        <!-- Content -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <div class="grid lg:grid-cols-3 gap-10">
                <!-- Main Content (Left) -->
                <div class="lg:col-span-2 space-y-16">
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
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            The Bachelor of Science in Accountancy (BSA) provides a robust
                            accounting education designed for students aspiring to build
                            professional careers in the field of Accountancy, with a particular
                            focus on Public Accounting. Students learn financial accounting,
                            auditing, taxation, management accounting, and business laws. Throughout
                            the students' college years, it prepares them to become professional
                            accountants and future Certified Public Accountants (CPAs).
                        </p>
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            This program equips students with the technical expertise, ethical
                            grounding, and analytical skills necessary to excel in the dynamic world
                            of financial management and auditing. Furthermore, the BSA program
                            aligns with the latest Competency Framework for Professional Accountants
                            issued by the International Federation of Accountants through their
                            International Education Standards, ensuring graduates meet global
                            standards of excellence and readiness for licensure and professional
                            practice.
                        </p>
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
                </div>

                <!-- Sidebar (Right) -->
                <div class="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-max">
                    <ProgramCoordinatorCard :coordinator="coordinator" />
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
