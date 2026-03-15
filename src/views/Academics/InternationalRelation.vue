<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import PageHero from '@/components/ui/custom/PageHero.vue'
import IroContentSection from '@/components/ui/custom/IroContentSection.vue'
import NewsUpdateCard from '@/components/ui/custom/NewsUpdateCard.vue'
import { programDetails, programUpdates } from '@/data/iroData'
</script>

<template>
    <div class="min-h-screen bg-background pb-24">
        <PageHero
            subtitle="Developing global citizens through cultural exchange, intercultural competency, and international partnerships."
            subtitleMax="max-w-2xl"
        >
            <template #title>International Relations</template>
        </PageHero>

        <!-- Content -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <div class="grid lg:grid-cols-3 gap-10">
                <!-- Main Content (Left) -->
                <div
                    class="lg:col-span-2 space-y-16"
                    v-motion
                    :initial="{ opacity: 0, x: -24 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 600, ease: 'easeOut' },
                    }"
                >
                    <div class="space-y-12">
                        <IroContentSection
                            v-for="section in programDetails"
                            :key="section.title"
                            :section="section"
                        />
                    </div>
                </div>

                <!-- Sidebar (Right) -->
                <div
                    class="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-max"
                    v-motion
                    :initial="{ opacity: 0, x: 24 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: {
                            type: 'spring',
                            stiffness: 80,
                            damping: 16,
                            delay: 150,
                        },
                    }"
                >
                    <Card class="overflow-hidden shadow-lg bg-card border-border">
                        <CardHeader class="pb-4">
                            <div
                                class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted"
                            >
                                <img
                                    src="https://placehold.co/600x600/000000/FFFFFF?text=600x600"
                                    alt="IRO Head"
                                    class="w-full h-full object-cover"
                                />
                            </div>

                            <CardTitle
                                class="text-xl font-bold uppercase tracking-wide text-primary"
                                >IRO Coordinator</CardTitle
                            >
                            <CardDescription class="text-sm font-medium"
                                >International Relations Office</CardDescription
                            >
                        </CardHeader>
                        <CardContent>
                            <Separator class="mb-6" />

                            <div class="space-y-4">
                                <h4 class="font-semibold text-lg text-foreground">
                                    Contact Information
                                </h4>

                                <div class="space-y-3 text-sm text-card-foreground">
                                    <div class="flex items-start gap-3">
                                        <span class="mt-0.5 font-medium text-muted-foreground"
                                            >Email:</span
                                        >
                                        <span>externalaffairs@sfxc.edu.ph</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <!-- Office Updates Section -->
            <div class="space-y-6 mt-16">
                <div
                    class="border-b border-border pb-2"
                    v-motion
                    :initial="{ opacity: 0, y: 16 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 500, ease: 'easeOut' },
                    }"
                >
                    <h3 class="text-2xl font-bold text-primary">Office Updates</h3>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NewsUpdateCard
                        v-for="(item, index) in programUpdates"
                        :key="item.id"
                        :item="item"
                        :index="index"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
