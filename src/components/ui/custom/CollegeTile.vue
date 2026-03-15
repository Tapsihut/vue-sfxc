<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { College } from '@/data/academicPrograms'

const props = defineProps<{
    college: College
    isSelected: boolean
    index: number
}>()

const emit = defineEmits<{
    select: [code: string]
}>()
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, scale: 0.92 }"
        :visible-once="{
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 18,
                delay: props.index * 80,
            },
        }"
        @click="emit('select', props.college.code)"
        class="group relative aspect-square overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
        :class="props.isSelected ? 'ring-4 ring-primary' : ''"
    >
        <!-- Background Image -->
        <img
            :src="props.college.heroImage"
            class="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
        />

        <!-- Color Overlay -->
        <div
            class="absolute inset-0 mix-blend-multiply opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            :class="props.college.color"
        ></div>

        <!-- Content -->
        <div class="absolute inset-0 p-6 flex flex-col text-white z-10">
            <!-- Header -->
            <div>
                <h3
                    class="text-2xl sm:text-3xl font-bold uppercase leading-tight tracking-wide mb-2"
                >
                    {{ props.college.code }}
                </h3>
                <p class="text-sm sm:text-base font-medium opacity-90">
                    {{ props.college.name }}
                </p>
            </div>

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
                    class="w-20 h-20 sm:w-24 sm:h-24 text-white opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                    v-html="props.college.icon"
                ></svg>
            </div>

            <!-- Hover Overlay -->
            <div
                class="absolute inset-0 bg-black/80 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            >
                <p class="text-sm font-bold text-white mb-2 uppercase tracking-wider">
                    {{ props.college.code }}
                </p>
                <p class="text-base text-white leading-relaxed">
                    {{ props.college.description }}
                </p>
                <Button
                    variant="outline"
                    class="mt-6 border-white text-white hover:bg-white hover:text-black transition-all"
                >
                    {{ props.isSelected ? 'Hide Programs' : 'View Programs' }}
                </Button>
            </div>
        </div>
    </div>
</template>
