<script setup lang="ts">
import type { StatItem } from '@/data/homeStats'

defineProps<{
    stat: StatItem
    delay?: number
}>()
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 32 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            transition: { delay: delay ?? 0, duration: 700, type: 'tween', ease: 'easeOut' },
        }"
        class="glass-card bg-background/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
    >
        <h4 class="text-4xl font-extrabold text-foreground mb-1">{{ stat.value }}</h4>
        <p class="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {{ stat.label }}
        </p>
    </div>
</template>
