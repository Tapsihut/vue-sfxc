<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import type { Program } from '@/data/academicPrograms'

const props = defineProps<{
    program: Program
    index: number
}>()

const emit = defineEmits<{
    navigate: [program: Program]
}>()
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 400, delay: props.index * 50, ease: 'easeOut' },
        }"
        @click="emit('navigate', props.program)"
        class="group relative aspect-square overflow-hidden cursor-pointer"
    >
        <!-- Background Image -->
        <img
            :src="props.program.heroImage"
            class="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
        />

        <!-- Color Overlay -->
        <div
            class="absolute inset-0 mix-blend-multiply opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            :class="props.program.color"
        ></div>

        <!-- Content -->
        <div class="absolute inset-0 p-4 sm:p-6 flex flex-col text-white z-10">
            <!-- Header: Code -->
            <div class="flex items-start">
                <h3 class="text-2xl sm:text-3xl font-bold uppercase leading-tight tracking-wide">
                    {{ props.program.code }}
                </h3>
            </div>

            <!-- Program Name -->
            <p class="text-sm sm:text-base font-medium opacity-90 mt-2">
                {{ props.program.name }}
            </p>

            <!-- Icon -->
            <div class="mt-auto flex justify-center pb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-16 h-16 sm:w-20 sm:h-20 text-white opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                    v-html="props.program.icon"
                ></svg>
            </div>

            <!-- Hover Content Overlay -->
            <div
                class="absolute inset-0 bg-black/80 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            >
                <p class="text-sm font-bold text-white mb-2 uppercase tracking-wider">
                    {{ props.program.code }}
                </p>
                <p class="text-xs text-white/80 mb-3">{{ props.program.name }}</p>
                <p class="text-xs text-white/90 leading-relaxed mb-4">
                    {{ props.program.description }}
                </p>
                <div class="flex flex-wrap gap-1">
                    <Badge
                        v-for="career in props.program.careers.slice(0, 2)"
                        :key="career"
                        variant="outline"
                        class="text-[10px] border-white/30 text-white bg-white/10"
                    >
                        {{ career }}
                    </Badge>
                </div>
            </div>
        </div>
    </div>
</template>
