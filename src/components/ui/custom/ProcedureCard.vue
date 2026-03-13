<script setup lang="ts">
import type { Component } from 'vue'

interface Step {
    text: string
    sub?: string[]
}

interface CardItem {
    id: string
    title: string
    icon: Component
    instruction?: string
    steps: Step[]
}

const props = withDefaults(
    defineProps<{
        item: CardItem
        delay?: number
        titleClass?: string
    }>(),
    {
        delay: 0,
        titleClass: 'text-lg leading-tight',
    },
)
</script>

<template>
    <div
        class="border border-border rounded-2xl overflow-hidden"
        v-motion
        :initial="{ opacity: 0, y: 36, scale: 0.96 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: props.delay,
                duration: 700,
                type: 'spring',
                stiffness: 90,
                damping: 16,
            },
        }"
    >
        <!-- Card Header -->
        <div class="flex items-start gap-4 px-6 py-5 border-b border-border bg-muted/20">
            <div
                class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0 mt-0.5"
            >
                <component :is="item.icon" class="w-5 h-5 text-primary" />
            </div>
            <div>
                <h3 :class="['font-bold text-foreground', titleClass]">
                    {{ item.title }}
                </h3>
                <p v-if="item.instruction" class="text-xs text-muted-foreground mt-0.5">
                    {{ item.instruction }}
                </p>
            </div>
        </div>

        <!-- Steps -->
        <ol class="px-6 py-5 space-y-3">
            <li
                v-for="(step, i) in item.steps"
                :key="i"
                class="flex gap-3"
                v-motion
                :initial="{ opacity: 0, x: 16 }"
                :visible-once="{
                    opacity: 1,
                    x: 0,
                    transition: {
                        delay: props.delay + 100 + i * 60,
                        duration: 500,
                        ease: 'easeOut',
                    },
                }"
            >
                <span
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5"
                >
                    {{ i + 1 }}
                </span>
                <div class="flex-1">
                    <p class="text-sm text-foreground leading-relaxed">{{ step.text }}</p>
                    <ul v-if="step.sub" class="mt-2 space-y-1">
                        <li
                            v-for="sub in step.sub"
                            :key="sub"
                            class="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                            <div class="w-1 h-1 rounded-full bg-primary/60 shrink-0"></div>
                            {{ sub }}
                        </li>
                    </ul>
                </div>
            </li>
        </ol>
    </div>
</template>
