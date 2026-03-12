<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { RouterLink } from 'vue-router'
import PageHero from '@/components/ui/custom/PageHero.vue'
import { useFacilities } from '@/composables/useFacilities'

const { facilities, activeFacility, targetSection, setActive, scrollToSection } = useFacilities()
</script>

<template>
    <div class="min-h-screen bg-background">
        <PageHero subtitle="Explore our modern infrastructure designed to support a holistic and interactive learning experience.">
            <template #title>Campus Facilities and Virtual Tour</template>
        </PageHero>

        <!-- Interactive Facility Explorer -->
        <section ref="targetSection" class="py-20 px-6 lg:px-10 bg-background">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col lg:flex-row gap-10">
                    <!-- Left — Selector List -->
                    <nav
                        class="lg:w-72 shrink-0 space-y-1"
                        v-motion
                        :initial="{ opacity: 0, x: -24 }"
                        :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
                    >
                        <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-3">
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

                    <Separator orientation="vertical" class="hidden lg:block self-stretch" />

                    <!-- Right — Detail View -->
                    <Transition name="panel" mode="out-in">
                        <div
                            :key="activeFacility.id"
                            class="flex-1 flex flex-col md:flex-row gap-8"
                            v-motion
                            :initial="{ opacity: 0, x: 12 }"
                            :visible-once="{ opacity: 1, x: 0, transition: { duration: 500 } }"
                        >
                            <div class="md:w-1/2 aspect-4/3 overflow-hidden rounded-xl bg-muted shrink-0">
                                <img
                                    :src="activeFacility.image"
                                    :alt="activeFacility.name"
                                    class="w-full h-full object-cover"
                                />
                            </div>
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
                                        <Card class="py-3 px-4 bg-muted/40 border-0 shadow-none h-full">
                                            <p class="text-sm font-medium text-foreground">{{ feature }}</p>
                                        </Card>
                                    </div>
                                </div>
                                <RouterLink :to="{ name: 'contact' }">
                                    <Button variant="outline" class="w-fit">Schedule a Visit</Button>
                                </RouterLink>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </section>

        <!-- Campus Snapshot Strip -->
        <section class="py-16 bg-muted/30 border-t border-border overflow-hidden">
            <div
                class="max-w-7xl mx-auto px-6 lg:px-10 mb-8"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            >
                <h2 class="text-2xl font-bold tracking-tight">Around Campus</h2>
            </div>

            <div class="flex gap-4 overflow-x-auto no-scrollbar px-6 lg:px-10 pb-2">
                <Card
                    v-for="(facility, i) in facilities"
                    :key="facility.id"
                    class="shrink-0 w-64 overflow-hidden border-0 shadow-md cursor-pointer group hover:shadow-lg transition-all duration-150"
                    v-motion
                    :initial="{ opacity: 0, y: 20 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: i * 60, duration: 500, type: 'tween', ease: 'easeOut' },
                    }"
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
                            <CardTitle class="text-white text-sm font-semibold">{{ facility.name }}</CardTitle>
                        </div>
                    </div>
                    <CardContent class="p-3">
                        <CardDescription class="text-xs line-clamp-2">{{ facility.description }}</CardDescription>
                    </CardContent>
                </Card>
            </div>
        </section>
    </div>
</template>

<style scoped>
.panel-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.panel-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.panel-enter-from { opacity: 0; transform: translateX(12px); }
.panel-leave-to { opacity: 0; transform: translateX(-8px); }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
