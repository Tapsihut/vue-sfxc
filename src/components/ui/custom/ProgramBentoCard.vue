<script setup lang="ts">
import { computed } from 'vue'
import type { Program } from '@/data/programs'

const props = defineProps<{
    program: Program
    index: number
}>()

const bentoClass = computed(() =>
    props.index === 0 ? 'md:col-span-2 md:row-span-2' : '',
)
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 32 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 100,
                duration: 700,
                type: 'tween',
                ease: 'easeOut',
            },
        }"
        class="group relative h-full min-h-[250px] cursor-pointer overflow-hidden rounded-3xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/50"
        :class="bentoClass"
    >
        <!-- Background Image -->
        <div class="absolute inset-0 overflow-hidden">
            <img
                :src="program.image"
                :alt="program.alt"
                loading="lazy"
                class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            <!-- Gradient Overlay -->
            <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"
            ></div>
        </div>

        <!-- Content -->
        <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div
                class="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0"
            >
                <h4 class="mb-2 text-2xl font-bold text-white">
                    {{ program.name }}
                </h4>

                <div
                    class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:mb-4 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                >
                    <div class="overflow-hidden">
                        <p class="text-sm text-white/80">
                            {{ program.description || 'Explore comprehensive curriculum focused on practical skills and theoretical excellence.' }}
                        </p>
                    </div>
                </div>

                <!-- Arrow Icon -->
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 delay-100 group-hover:opacity-100"
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
