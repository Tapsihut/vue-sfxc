<script setup lang="ts">
import { type Component } from 'vue'

defineProps<{
    id: string
    title: string
    subtitle: string
    icon: Component
    description: string
    listLabel: string
    items: string[]
}>()
</script>

<template>
    <div
        :id="id"
        class="border border-border rounded-2xl overflow-hidden"
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, type: 'spring', stiffness: 100, damping: 18 },
        }"
    >
        <!-- Header -->
        <div class="flex items-start gap-4 px-6 py-5 border-b border-border bg-muted/20">
            <div
                class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0 mt-0.5"
            >
                <component :is="icon" class="w-5 h-5 text-primary" />
            </div>
            <div>
                <h3
                    class="font-bold text-foreground text-lg leading-tight"
                    v-motion
                    :initial="{ opacity: 0, x: 12 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 100, duration: 500, ease: 'easeOut' },
                    }"
                >
                    {{ title }}
                </h3>
                <p
                    class="text-xs text-muted-foreground mt-0.5"
                    v-motion
                    :initial="{ opacity: 0, x: 12 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 160, duration: 500, ease: 'easeOut' },
                    }"
                >
                    {{ subtitle }}
                </p>
            </div>
        </div>

        <!-- Body -->
        <div class="px-6 py-5 space-y-4">
            <p
                class="text-sm text-muted-foreground leading-relaxed"
                v-motion
                :initial="{ opacity: 0, y: 8 }"
                :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 200, duration: 500, ease: 'easeOut' },
                }"
            >
                {{ description }}
            </p>

            <!-- Optional extra slot (e.g. contact info for Guidance) -->
            <slot />

            <!-- List -->
            <div>
                <p
                    class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3"
                    v-motion
                    :initial="{ opacity: 0 }"
                    :visible-once="{
                        opacity: 1,
                        transition: { delay: 260, duration: 400 },
                    }"
                >
                    {{ listLabel }}
                </p>
                <ul class="space-y-2">
                    <li
                        v-for="(item, i) in items"
                        :key="item"
                        class="flex items-center gap-2.5 text-sm text-foreground"
                        v-motion
                        :initial="{ opacity: 0, x: 16 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { delay: 300 + i * 60, duration: 400, ease: 'easeOut' },
                        }"
                    >
                        <div class="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"></div>
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
