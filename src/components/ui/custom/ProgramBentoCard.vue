
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Program } from '@/data/programs'

interface CardProgram extends Program {
    code?: string
    description?: string
}

const props = defineProps<{
    program: CardProgram
    index: number
}>()

const router = useRouter()

const routeMap: Record<string, string> = {
    BSOA: 'bsoa',
    BSBA: 'bsba',
    BSA: 'bsa',
    BSAIS: 'bsais',
    BSIA: 'bsia',
    BSMA: 'bsma',
    BSE: 'bse',
    BSIT: 'bsit',
    CRIMINOLOGY: 'criminology',
    CRIM: 'criminology',
    BSED: 'bsed',
    BEED: 'beed',
    ABEL: 'abel',
    'UNIT-EARNER': 'unit-earner',
    'UNIT EARNER': 'unit-earner',
    'TECH-VOC': 'tech-voc',
    'TECH VOC': 'tech-voc',
}

const routeName = computed(() => {
    const code = props.program.code?.trim().toUpperCase()
    return code ? routeMap[code] : undefined
})

function openProgram() {
    if (routeName.value) {
        router.push({ name: routeName.value })
    } else {
        router.push({ name: 'programs' })
    }
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openProgram()
    }
}
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 100,
                duration: 500,
                type: 'tween',
                ease: 'easeOut',
            },
        }"
        role="link"
        tabindex="0"
        :aria-label="`View ${program.name} program`"
        class="group relative h-full min-h-[280px] cursor-pointer overflow-hidden rounded-3xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        @click="openProgram"
        @keydown="handleKeydown"
    >
        <!-- Background Image -->
        <div class="absolute inset-0 overflow-hidden">
            <img
                :src="program.image"
                :alt="program.alt || program.name"
                loading="lazy"
                class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            <!-- Gradient Overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            ></div>
        </div>

        <!-- Content -->
        <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div
                class="translate-y-2 transform transition-transform duration-300 group-hover:translate-y-0"
            >
                <p
                    v-if="program.code"
                    class="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70"
                >
                    {{ program.code }}
                </p>

                <h3 class="mb-2 text-2xl font-bold text-white">
                    {{ program.name }}
                </h3>

                <p class="mb-4 line-clamp-3 text-sm text-white/80">
                    {{
                        program.description ||
                        'Explore this academic program and discover the opportunities it offers.'
                    }}
                </p>

                <!-- Arrow Icon -->
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/30"
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
