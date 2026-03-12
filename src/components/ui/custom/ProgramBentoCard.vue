<script setup lang="ts">
import { computed } from 'vue'
import type { Program } from '@/data/programs'

const props = defineProps<{
    program: Program
    index: number
}>()

const bentoClass = computed(() => (props.index === 0 ? 'md:col-span-2 md:row-span-2' : ''))
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 32 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            transition: { delay: index * 100, duration: 700, type: 'tween', ease: 'easeOut' },
        }"
        class="group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all cursor-pointer"
        :class="bentoClass"
    >
        <!-- Background image with overlay -->
        <div class="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <img :src="program.image" :alt="program.alt" class="w-full h-full object-cover" />
            <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"
            ></div>
        </div>

        <!-- Content -->
        <div class="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
            <div
                class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
                <h4 class="text-white text-2xl font-bold mb-2">{{ program.name }}</h4>
                <div
                    class="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mb-4 transition-all duration-300 overflow-hidden"
                >
                    <p class="text-white/80 text-sm">
                        Explore comprehensive curriculum focused on practical skills and theoretical
                        excellence.
                    </p>
                </div>
                <div
                    class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
