<script setup lang="ts">
import { Clock } from 'lucide-vue-next'
import PageHero from '@/components/ui/custom/PageHero.vue'

defineProps<{
    subtitle: string
    description: string
}>()
</script>

<template>
    <PageHero :subtitle="subtitle">
        <template #title>
            <slot name="title" />
        </template>
    </PageHero>

    <div class="min-h-screen bg-background pb-24">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <div class="max-w-2xl mx-auto text-center">
                <div
                    class="flex items-center justify-center gap-4 mb-8"
                    v-motion
                    :initial="{ opacity: 0, scale: 0.9 }"
                    :visible-once="{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 500, ease: 'easeOut' },
                    }"
                >
                    <div class="w-12 h-0.5 bg-border"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Coming Soon</span
                    >
                    <div class="w-12 h-0.5 bg-border"></div>
                </div>

                <h2
                    class="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    style="font-family: 'Times New Roman', Times, serif"
                    v-motion
                    :initial="{ opacity: 0, y: 20 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 120, duration: 600, ease: 'easeOut' },
                    }"
                >
                    We're preparing this page
                </h2>

                <p
                    class="text-lg text-muted-foreground leading-relaxed mb-14"
                    v-motion
                    :initial="{ opacity: 0, y: 16 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 240, duration: 600, ease: 'easeOut' },
                    }"
                >
                    {{ description }}
                </p>

                <div
                    class="flex items-center justify-center gap-2.5 mt-10"
                    v-motion
                    :initial="{ opacity: 0 }"
                    :visible-once="{
                        opacity: 1,
                        transition: { delay: 360, duration: 500 },
                    }"
                >
                    <Clock class="w-4 h-4 text-muted-foreground" />
                    <p class="text-sm text-muted-foreground">Page currently under development</p>
                </div>
            </div>
        </div>
    </div>
</template>
