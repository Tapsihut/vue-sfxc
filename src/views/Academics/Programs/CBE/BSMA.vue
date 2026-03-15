<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useProgramAccordion } from '@/composables/useProgramAccordion'
import { programDetails, programUpdates, coordinator, quickFacts } from '@/data/cbeBsma'
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
            subtitle="Focusing on financial planning, performance management, and strategic decision-making."
            subtitleMax="max-w-2xl"
        >
            <template #title>Management Accounting</template>
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
                        <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                            Bachelor of Science in Management Accounting
                        </h2>
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            The Bachelor of Science in Management Accounting (BSMA) program is
                            designed to equip students with the knowledge and skills needed to
                            support business decision-making through financial analysis and
                            strategic management. The curriculum covers financial and management
                            accounting, cost accounting, budgeting, taxation, business law, and
                            performance management.
                        </p>
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            The program develops students' analytical, problem-solving, and
                            decision-making skills, enabling them to provide relevant financial
                            information for planning, controlling, and evaluating organizational
                            performance. Emphasis is placed on ethical standards, technological
                            competence, and the application of accounting tools in various business
                            environments.
                        </p>
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            Graduates of the program are prepared for careers in management
                            accounting, financial analysis, corporate planning, and other related
                            fields in both private and public organizations. The program also serves
                            as a strong foundation for pursuing professional certifications and
                            further studies in accountancy and business.
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
                    <!-- Quick Facts Card -->
                    <Card
                        v-motion
                        :initial="{ opacity: 0, x: 24 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { type: 'spring', stiffness: 100, damping: 18 },
                        }"
                        class="overflow-hidden shadow-lg bg-card border-border"
                    >
                        <CardHeader class="pb-4">
                            <CardTitle class="text-xl text-primary">Quick Facts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl class="space-y-4 text-sm">
                                <div
                                    v-for="(fact, idx) in quickFacts"
                                    :key="fact.label"
                                    :class="[
                                        'flex flex-col gap-1',
                                        idx < quickFacts.length - 1
                                            ? 'border-b border-border pb-3'
                                            : '',
                                    ]"
                                >
                                    <dt
                                        class="text-muted-foreground font-medium flex items-center gap-2"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                :d="fact.icon"
                                            />
                                        </svg>
                                        {{ fact.label }}
                                    </dt>
                                    <dd class="font-semibold text-foreground">{{ fact.value }}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>

                    <ProgramCoordinatorCard :coordinator="coordinator" :delay="100" />
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
