<script setup lang="ts">
import { Card } from '@/components/ui/card'
import type { Interest } from '@/data/admissionGuide'

const props = defineProps<{
    interest: Interest
    isSelected: boolean
    enterDelay?: number
}>()

defineEmits<{ toggle: [id: string] }>()
</script>

<template>
    <Card
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: enterDelay ?? 0, duration: 500 } }"
        @click="$emit('toggle', interest.id)"
        :class="[
            'relative cursor-pointer border-2 transition-all duration-300 overflow-hidden group',
            isSelected
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/40 hover:shadow-sm',
        ]"
    >
        <!-- Selection indicator bar -->
        <div
            :class="[
                'absolute top-0 left-0 w-1 h-full transition-all duration-300',
                isSelected ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/30',
            ]"
        ></div>

        <!-- Hover gradient -->
        <div
            :class="[
                'absolute inset-0 opacity-0 transition-opacity duration-300 bg-linear-to-br from-primary/5 to-transparent pointer-events-none',
                !isSelected ? 'group-hover:opacity-100' : 'opacity-0',
            ]"
        ></div>

        <div class="p-4 flex items-start gap-3 relative">
            <!-- Animated checkbox -->
            <div
                :class="[
                    'relative shrink-0 w-5 h-5 mt-0.5 rounded border-2 transition-all duration-300',
                    isSelected
                        ? 'bg-primary border-primary'
                        : 'bg-background border-border group-hover:border-primary/60',
                ]"
            >
                <!-- Checkmark SVG -->
                <svg
                    v-if="isSelected"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                    fill="none"
                    class="absolute inset-0 m-auto w-3 h-3"
                >
                    <path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>

                <!-- Ping ripple on selection -->
                <span
                    v-if="isSelected"
                    class="absolute -inset-1 rounded bg-primary/20 animate-ping"
                    style="animation-iteration-count: 1"
                ></span>
            </div>

            <div class="flex-1 min-w-0">
                <span
                    :class="[
                        'font-semibold text-sm transition-colors block mb-0.5',
                        isSelected ? 'text-primary' : 'text-foreground',
                    ]"
                >
                    {{ interest.title }}
                </span>
                <p class="text-xs text-muted-foreground leading-relaxed">
                    {{ interest.description }}
                </p>
            </div>
        </div>

        <!-- Bottom border shimmer on selection -->
        <div
            :class="[
                'absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500',
                isSelected ? 'w-full' : 'w-0',
            ]"
        ></div>
    </Card>
</template>
