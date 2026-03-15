<script setup lang="ts">
import { type Component } from 'vue'

defineProps<{
    title: string
    description: string
    icon: Component
    iconBgClass: string
    iconColorClass: string
    delay?: number
}>()
</script>

<template>
    <div
        class="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow duration-150 cursor-default"
        v-motion
        :initial="{ opacity: 0, scale: 0.93 }"
        :visible-once="{
            opacity: 1,
            scale: 1,
            transition: {
                delay: delay ?? 0,
                duration: 500,
                type: 'spring',
                stiffness: 120,
                damping: 20,
            },
        }"
    >
        <div
            class="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
            :class="iconBgClass"
        >
            <component :is="icon" class="w-6 h-6" :class="iconColorClass" />
        </div>
        <h4 class="font-bold text-foreground mb-2">{{ title }}</h4>
        <p class="text-sm text-muted-foreground">{{ description }}</p>
    </div>
</template>
