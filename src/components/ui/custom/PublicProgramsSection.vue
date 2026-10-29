<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
const carousel = ref<HTMLElement | null>(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(true)

const API_ORIGIN = (
    import.meta.env.VITE_API_URL || 'https://api.sfxc.edu.ph'
).replace(/\/api\/?$/, '').replace(/\/+$/, '')

function getImageUrl(path: string | null | undefined): string | null {
    if (!path) return null

    if (/^https?:\/\//i.test(path)) {
        return path.replace(/^http:\/\//i, 'https://')
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
                        'Explore our academic program and prepare for meaningful career opportunities.',
                    image: uploadedImage || placeholder.image || '',
                    alt: program.name,
                    college: program.college,
                } as DisplayProgram
            })
    } catch (error) {
        console.error('Failed to load public programs:', error)
        errorMessage.value =
            'Unable to load programs right now. Please try again.'
    } finally {
        loading.value = false
        requestAnimationFrame(updateScrollButtons)
    }
}

function updateScrollButtons() {
    const element = carousel.value

    if (!element) return

    canScrollPrev.value = element.scrollLeft > 2
    canScrollNext.value =
        element.scrollLeft + element.clientWidth < element.scrollWidth - 2
}

function scrollCarousel(direction: 'prev' | 'next') {
    const element = carousel.value

    if (!element) return

    const card = element.querySelector<HTMLElement>('[data-program-card]')
    const distance = card
        ? card.offsetWidth + 24
        : element.clientWidth * 0.8

    element.scrollBy({
        left: direction === 'next' ? distance : -distance,
        behavior: 'smooth',
    })
}

onMounted(fetchPrograms)
</script>

<template>
    <section
        id="academics"
        class="relative overflow-hidden bg-gray-50/50 py-20 dark:bg-zinc-900/50 md:py-28"
    >
        <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px] opacity-30 dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]"
        ></div>

        <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
                class="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end"
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

                <RouterLink
                    to="/academics/programs"
                    class="inline-flex items-center gap-2 pb-2 font-medium text-primary transition-all hover:gap-4"
                >
                    Explore All Programs
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

            <div
                v-if="loading"
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                <div
                    v-for="item in 4"
                    :key="item"
                    class="h-[350px] animate-pulse rounded-3xl bg-muted"
                ></div>
            </div>

            <div
                v-else-if="errorMessage"
                class="rounded-2xl border border-border bg-card p-8 text-center"
            >
                <p class="text-muted-foreground">{{ errorMessage }}</p>
                <button
                    type="button"
                    class="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    @click="fetchPrograms"
                >
                    Try Again
                </button>
            </div>

            <div v-else-if="programs.length" class="relative">
                <div class="mb-5 flex justify-end gap-3">
                    <button
                        type="button"
                        aria-label="Previous programs"
                        :disabled="!canScrollPrev"
                        class="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                        @click="scrollCarousel('prev')"
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

                    <button
                        type="button"
                        aria-label="Next programs"
                        :disabled="!canScrollNext"
                        class="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                        @click="scrollCarousel('next')"
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

                <div
                    ref="carousel"
                    class="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6"
                    style="scrollbar-width: none"
                    @scroll.passive="updateScrollButtons"
                >
                    <article
                        v-for="(program, index) in programs"
                        :key="program.id"
                        data-program-card
                        class="w-[85%] flex-none snap-start overflow-hidden rounded-3xl sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
                    >
                        <ProgramBentoCard
                            :program="program"
                            :index="index"
                        />
                    </article>

                    <RouterLink
                        to="/academics/programs"
                        class="group flex min-h-[300px] w-[85%] flex-none snap-start flex-col items-center justify-center rounded-3xl bg-primary p-8 text-center transition hover:bg-primary/90 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
                    >
                        <div
                            class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:scale-110"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </div>

                        <h3 class="text-xl font-bold text-white">
                            Discover More
                        </h3>

                        <p class="mt-2 text-sm text-white/80">
                            View all academic offerings
                        </p>

                        <span
                            class="mt-4 flex items-center gap-2 text-sm font-semibold text-white transition-all group-hover:gap-4"
                        >
                            Explore Programs
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
                        </span>
                    </RouterLink>
                </div>

                <p class="mt-1 text-center text-xs text-muted-foreground">
                    Swipe or use the arrows to explore our programs
                </p>
            </div>

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
                </RouterLink>
            </div>
        </div>
    </section>
</template>
