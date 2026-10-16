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

const API_ORIGIN = 'http://localhost:8000'

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

function getPlaceholder(index: number) {
    return placeholderPrograms[index % placeholderPrograms.length]
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
                        'Explore comprehensive curriculum focused on practical skills and theoretical excellence.',
                    image: uploadedImage || placeholder.image,
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
    }
}

onMounted(fetchPrograms)
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

                <!-- View All Programs Link -->
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
                class="grid grid-cols-1 gap-6 auto-rows-[250px] md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
                <div
                    v-for="item in 6"
                    :key="item"
                    class="relative animate-pulse overflow-hidden rounded-3xl bg-muted"
                    :class="item === 1 ? 'md:col-span-2 md:row-span-2' : ''"
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
                    @click="fetchPrograms"
                >
                    Try Again
                </button>
            </div>

            <!-- Programs Bento Grid -->
            <div
                v-else-if="programs.length"
                class="grid grid-cols-1 gap-6 auto-rows-[250px] md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
                <!-- Display Up to Five Programs -->
                <ProgramBentoCard
                    v-for="(program, index) in programs.slice(0, 5)"
                    :key="program.id"
                    :program="program"
                    :index="index"
                />

                <!-- Discover More CTA Card -->
                <RouterLink
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 500,
                            duration: 700,
                            type: 'tween',
                            ease: 'easeOut',
                        },
                    }"
                    to="/academics/programs"
                    class="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl bg-primary p-8 text-center transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    <!-- Plus Icon -->
                    <div
                        class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
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
                        View All Academic Offerings
                    </p>

                    <!-- Explore Link Label -->
                    <div
                        class="mt-4 flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-4"
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
                    </div>
                </RouterLink>
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
