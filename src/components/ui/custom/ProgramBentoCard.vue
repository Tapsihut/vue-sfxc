<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Program } from '@/data/programs'

interface CardProgram extends Program {
    code?: string
    description?: string | null
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

const targetRoute = computed(() => {
    const code = props.program.code?.trim().toUpperCase()
    return routeMap[code ?? ''] ?? 'programs'
})

function openProgram() {
    router.push({ name: targetRoute.value })
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openProgram()
    }
}
</script>

<template>
    <article
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            transition: {
                delay: Math.min(index, 4) * 100,
                duration: 500,
                type: 'tween',
                ease: 'easeOut',
            },
        }"
        class="group relative h-[340px] overflow-hidden rounded-3xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-[360px] lg:h-[380px]"
        role="link"
        tabindex="0"
        :aria-label="`View ${program.name} program`"
        @click="openProgram"
        @keydown="handleKeydown"
    >
        <!-- Background Image -->
        <img
            :src="program.image"
            :alt="program.alt || program.name"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        <!-- Gradient Overlay -->
        <div
            class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
        ></div>

        <!-- Program Content -->
        <div
            class="absolute inset-x-0 bottom-0 flex flex-col items-start p-5 sm:p-6"
        >
            <span
                v-if="program.code"
                class="mb-3 inline-flex max-w-full rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm"
            >
                {{ program.code }}
            </span>

            <h3
                class="mb-2 line-clamp-3 text-xl leading-snug font-bold text-white sm:text-2xl"
            >
                {{ program.name }}
            </h3>

            <p
                class="line-clamp-3 text-sm leading-relaxed text-white/85 sm:line-clamp-4"
            >
                {{
                    program.description ||
                    'Explore our academic program and prepare for meaningful career opportunities.'
                }}
            </p>

            <div
                class="mt-4 flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3"
            >
                Explore Program
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
    </article>
</template>
