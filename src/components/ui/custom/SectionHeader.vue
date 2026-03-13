<script setup lang="ts">
defineProps<{
    label: string
    title: string
    description?: string
}>()
</script>

<template>
    <div>
        <div
            class="flex items-center gap-4 mb-4"
            v-motion
            :initial="{ opacity: 0, x: -24 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, ease: 'easeOut' } }"
        >
            <div class="w-8 h-0.5 bg-primary"></div>
            <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]">
                {{ label }}
            </span>
        </div>

        <h2
            class="text-3xl md:text-4xl font-bold text-foreground mb-4"
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{
                opacity: 1,
                y: 0,
                transition: { delay: 120, duration: 600, ease: 'easeOut' },
            }"
        >
            {{ title }}
        </h2>

        <p
            v-if="description"
            class="text-lg text-muted-foreground"
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
    </div>
</template>
