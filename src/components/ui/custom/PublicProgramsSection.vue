
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import api from '@/services/api'
import ProgramBentoCard from '@/components/ui/custom/ProgramBentoCard.vue'
import { programs as placeholderPrograms } from '@/data/programs'
import type { Program as LocalProgram } from '@/data/programs'

interface College {
    id: number
    name: string
    code: string
}

interface ApiProgram {
    id: number
    name: string
    code: string
    description: string | null
    image_path: string | null
    image_url?: string | null
    display_order: number
    is_active: boolean
    college: College | null
}

interface DisplayProgram extends LocalProgram {
    id: number
    code: string
    description: string
    college: College | null
}

const programs = ref<DisplayProgram[]>([])
const loading = ref(true)
const errorMessage = ref('')
const currentSlide = ref(0)
const programsPerSlide = 3

let carouselTimer: ReturnType<typeof setInterval> | undefined

const API_ORIGIN = 'http://localhost:8000'

const totalSlides = computed(() =>
    Math.ceil(programs.value.length / programsPerSlide),
)

const visiblePrograms = computed(() => {
    const start = currentSlide.value * programsPerSlide

    return programs.value.slice(start, start + programsPerSlide)
})

function getImageUrl(path: string | null | undefined): string | null {
    if (!path) return null

    if (/^https?:\/\//i.test(path)) {
        return path
    }

    const normalizedPath = path
        .replace(/\\/g, '/')
        .replace(/^\/+/, '')

    const storagePath = normalizedPath.startsWith('storage/')
        ? normalizedPath
        : `storage/${normalizedPath}`

    return `${API_ORIGIN}/${storagePath}`
}

function getPlaceholder(index: number): LocalProgram {
    return (
        placeholderPrograms[index % placeholderPrograms.length] ??
        placeholderPrograms[0]!
    )
}

async function fetchPrograms() {
    loading.value = true
    errorMessage.value = ''

    try {
        const response = await api.get('/api/v1/public/programs')
        const data = response.data?.data

        if (!Array.isArray(data)) {
            programs.value = []
            return
        }

        programs.value = data
            .filter((program: ApiProgram) => program.is_active)
            .sort(
                (a: ApiProgram, b: ApiProgram) =>
                    a.display_order - b.display_order,
            )
            .map((program: ApiProgram, index: number) => {
                const placeholder = getPlaceholder(index)
                const uploadedImage = getImageUrl(
                    program.image_url || program.image_path,
                )

                return {
                    ...placeholder,
                    id: program.id,
                    name: program.name,
                    code: program.code,
                    description:
                        program.description ||
                        'Explore this academic program and discover the opportunities it offers.',
                    image: uploadedImage || placeholder.image || '',
                    alt: program.name,
                    college: program.college,
                } as DisplayProgram
            })

        currentSlide.value = 0
    } catch (error) {
        console.error('Failed to load public programs:', error)
        errorMessage.value =
            'Unable to load programs right now. Please try again.'
    } finally {
        loading.value = false
    }
}

function stopCarousel() {
    if (carouselTimer) {
        clearInterval(carouselTimer)
        carouselTimer = undefined
    }
}

function startCarousel() {
    stopCarousel()

    if (totalSlides.value <= 1 || loading.value || errorMessage.value) {
        return
    }

    carouselTimer = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % totalSlides.value
    }, 5000)
}

function nextSlide() {
    if (totalSlides.value <= 1) return

    currentSlide.value = (currentSlide.value + 1) % totalSlides.value
    startCarousel()
}

function previousSlide() {
    if (totalSlides.value <= 1) return

    currentSlide.value =
        (currentSlide.value - 1 + totalSlides.value) % totalSlides.value

    startCarousel()
}

function goToSlide(index: number) {
    if (index < 0 || index >= totalSlides.value) return

    currentSlide.value = index
    startCarousel()
}

function handleFocusOut(event: FocusEvent) {
    const section = event.currentTarget as HTMLElement
    const nextTarget = event.relatedTarget as Node | null

    if (!nextTarget || !section.contains(nextTarget)) {
        startCarousel()
    }
}

onMounted(async () => {
    await fetchPrograms()
    startCarousel()
})

onUnmounted(() => {
    stopCarousel()
})
</script>

<template>
    <section
        id="academics"
        class="relative overflow-hidden bg-gray-50/50 py-20 dark:bg-zinc-900/50 md:py-28"
    >
        <!-- Dotted Background -->
        <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px] opacity-30 dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]"
        ></div>

        <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Section Heading -->
            <div
                class="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
            >
                <div class="max-w-2xl">
                    <span
                        class="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                        <span class="h-2 w-2 rounded-full bg-primary"></span>
                        Academic Excellence
                    </span>

                    <h2
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 700,
                                type: 'tween',
                                ease: 'easeOut',
                            },
                        }"
                        class="mb-4 text-3xl font-bold text-foreground md:text-5xl"
                    >
                        Programs Offered
                    </h2>

                    <p
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 100,
                                duration: 700,
                                type: 'tween',
                                ease: 'easeOut',
                            },
                        }"
                        class="text-base leading-relaxed text-muted-foreground md:text-lg"
                    >
                        Discover our academic programs designed to prepare
                        students for meaningful careers and lifelong learning.
                    </p>
                </div>

                <!-- View All Programs -->
                <RouterLink
                    v-motion
                    :initial="{ opacity: 0, x: 16 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: {
                            delay: 200,
                            duration: 700,
                            type: 'tween',
                            ease: 'easeOut',
                        },
                    }"
                    to="/academics/programs"
                    class="hidden items-center gap-2 pb-2 font-medium text-primary transition-all hover:gap-4 md:inline-flex"
                >
                    View All Programs

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
                </RouterLink>
            </div>

            <!-- Loading Placeholders -->
            <div
                v-if="loading"
                class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
                <div
                    v-for="item in 3"
                    :key="item"
                    class="relative min-h-[280px] animate-pulse overflow-hidden rounded-3xl bg-muted"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    ></div>

                    <div class="absolute right-6 bottom-6 left-6 space-y-3">
                        <div class="h-5 w-2/3 rounded bg-foreground/10"></div>
                        <div class="h-3 w-1/2 rounded bg-foreground/10"></div>
                    </div>
                </div>
            </div>

            <!-- API Error -->
            <div
                v-else-if="errorMessage"
                class="rounded-2xl border border-border bg-card p-8 text-center"
            >
                <p class="text-muted-foreground">
                    {{ errorMessage }}
                </p>

                <button
                    type="button"
                    class="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    @click="fetchPrograms().then(startCarousel)"
                >
                    Try Again
                </button>
            </div>

            <!-- Programs Carousel -->
            <div
                v-else-if="programs.length"
                class="space-y-8"
                @mouseenter="stopCarousel"
                @mouseleave="startCarousel"
                @focusin="stopCarousel"
                @focusout="handleFocusOut"
            >
                <TransitionGroup
                    name="program-slide"
                    tag="div"
                    class="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                >
                    <ProgramBentoCard
                        v-for="(program, index) in visiblePrograms"
                        :key="program.id"
                        :program="program"
                        :index="index"
                    />
                </TransitionGroup>

                <!-- Carousel Controls -->
                <div
                    v-if="totalSlides > 1"
                    class="flex flex-wrap items-center justify-center gap-4"
                >
                    <button
                        type="button"
                        aria-label="Previous programs"
                        class="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        @click="previousSlide"
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
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    <div class="flex items-center gap-2">
                        <button
                            v-for="slide in totalSlides"
                            :key="slide"
                            type="button"
                            :aria-label="`Go to program slide ${slide}`"
                            :aria-current="
                                currentSlide === slide - 1 ? 'true' : undefined
                            "
                            class="h-2.5 rounded-full transition-all duration-300"
                            :class="
                                currentSlide === slide - 1
                                    ? 'w-8 bg-primary'
                                    : 'w-2.5 bg-border hover:bg-primary/50'
                            "
                            @click="goToSlide(slide - 1)"
                        />
                    </div>

                    <button
                        type="button"
                        aria-label="Next programs"
                        class="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        @click="nextSlide"
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
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>

                <!-- View All Programs -->
                <div class="flex justify-center">
                    <RouterLink
                        to="/academics/programs"
                        class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all hover:gap-4 hover:opacity-90"
                    >
                        View All Programs

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
                    </RouterLink>
                </div>
            </div>

            <!-- No Active Programs -->
            <div
                v-else
                class="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center"
            >
                <h3 class="text-xl font-semibold text-foreground">
                    Programs Coming Soon
                </h3>

                <p class="mt-2 text-sm text-muted-foreground">
                    Active academic programs will appear here once published.
                </p>

                <RouterLink
                    to="/academics/programs"
                    class="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:gap-4"
                >
                    View Academic Offerings

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
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
.program-slide-enter-active,
.program-slide-leave-active {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}

.program-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.program-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

@media (prefers-reduced-motion: reduce) {
    .program-slide-enter-active,
    .program-slide-leave-active {
        transition: none;
    }
}
</style>
