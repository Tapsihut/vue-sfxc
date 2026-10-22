
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import PublicProgramsSection from '@/components/ui/custom/PublicProgramsSection.vue'
import type { StatItem } from '@/data/homeStats'
import { useHeroCarousel } from '@/composables/useHeroCarousel'
import { useMottoAnimation } from '@/composables/useMottoAnimation'
import { useScrollY } from '@/composables/useScrollY'
import StatCard from '@/components/ui/custom/StatCard.vue'
import MiniNewsCard from '@/components/ui/custom/MiniNewsCard.vue'
import api from '@/services/api'

interface NewsPost {
    id: number
    title: string
    slug: string
    excerpt?: string | null
    content?: string | null
    image_path?: string | null
    image_url?: string | null
    is_featured?: boolean
    status: 'draft' | 'published'
    published_at?: string | null
    created_at?: string | null
    category?: {
        id: number
        name: string
    } | null
}

const BACKEND_URL = 'http://127.0.0.1:8000'

const posts = ref<NewsPost[]>([])
const newsLoading = ref(true)
const newsError = ref(false)

const homeStats = ref<StatItem[]>([])

const featuredPost = computed(
    () => posts.value.find(post => post.is_featured) ?? posts.value[0] ?? null,
)

const miniNewsPosts = computed(() => {
    const featuredId = featuredPost.value?.id

    return posts.value
        .filter(post => post.id !== featuredId)
        .slice(0, 4)
})

/**
 * Fetch active statistics managed through the admin dashboard.
 */
async function fetchHomeStats(): Promise<void> {
    try {
        const response = await api.get('/api/v1/public/statistics')
        const data = response.data?.data ?? response.data

        if (!Array.isArray(data)) {
            homeStats.value = []
            return
        }

        homeStats.value = data
            .filter((stat: StatItem) => stat.active)
            .sort((a: StatItem, b: StatItem) => a.order - b.order)
    } catch (error) {
        console.error('Failed to fetch homepage statistics:', error)
        homeStats.value = []
    }
}

/**
 * Returns the uploaded image URL.
 * Returns null when no image has been uploaded.
 */
function getNewsImage(post: NewsPost): string | null {
    const path = post.image_url?.trim() || post.image_path?.trim()

    if (!path) {
        return null
    }

    if (/^https?:\/\//i.test(path)) {
        return path
    }

    const normalizedPath = path.replace(/^\/+/, '')

    if (normalizedPath.startsWith('storage/')) {
        return `${BACKEND_URL}/${normalizedPath}`
    }

    return `${BACKEND_URL}/storage/${normalizedPath}`
}

function formatNewsDate(date?: string | null): string {
    if (!date) return 'Date unavailable'

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return 'Date unavailable'
    }

    return parsedDate.toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

async function fetchNews(): Promise<void> {
    newsLoading.value = true
    newsError.value = false

    try {
        const response = await api.get('/api/v1/public/posts', {
            params: {
                per_page: 10,
            },
        })

        const responseData = response.data?.data

        posts.value = Array.isArray(responseData)
            ? responseData
            : []
    } catch (error) {
        console.error('Failed to fetch public news:', error)
        newsError.value = true
        posts.value = []
    } finally {
        newsLoading.value = false
    }
}

onMounted(() => {
    fetchNews()
    fetchHomeStats()
})

const {
    slides,
    api: carouselApi,
    current,
    autoplay,
    slideCounter,
    loading,
    showFallback,
    showIndicators,
    setApi,
    goToSlide,
} = useHeroCarousel()

const { scrollY } = useScrollY()

// Mobile motto animation refs
const startSRef = ref<HTMLElement | null>(null)
const startFRef = ref<HTMLElement | null>(null)
const startXRef = ref<HTMLElement | null>(null)
const startCRef = ref<HTMLElement | null>(null)
const endSRef = ref<HTMLElement | null>(null)
const endFRef = ref<HTMLElement | null>(null)
const endXRef = ref<HTMLElement | null>(null)
const endCRef = ref<HTMLElement | null>(null)

useMottoAnimation(
    startSRef,
    startFRef,
    startXRef,
    startCRef,
    endSRef,
    endFRef,
    endXRef,
    endCRef,
)

function onHeroEnter(el: Element, done: () => void) {
    const animation = (el as HTMLElement).animate(
        [
            { opacity: '0', transform: 'translateY(24px)' },
            { opacity: '1', transform: 'translateY(0)' },
        ],
        { duration: 700, easing: 'ease', fill: 'forwards' },
    )

    animation.onfinish = done
}

function onHeroLeave(el: Element, done: () => void) {
    ;(el as HTMLElement).style.position = 'absolute'

    const animation = (el as HTMLElement).animate(
        [
            { opacity: '1', transform: 'translateY(0)' },
            { opacity: '0', transform: 'translateY(-12px)' },
        ],
        { duration: 350, easing: 'ease', fill: 'forwards' },
    )

    animation.onfinish = done
}
</script>


<template>
    <!-- Homepage Hero -->
    <section id="home" class="relative w-full">
        <!-- Hero loading state -->
        <div
            v-if="loading"
            class="relative h-[clamp(420px,36.4583vw,700px)] overflow-hidden bg-[#104717]"
        >
            <img
                src="@/assets/images/sfxc-building.jpg"
                alt=""
                class="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div class="absolute inset-0 bg-black/40"></div>

            <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex flex-col items-center gap-4 text-white">
                    <img
                        src="@/assets/images/sfxc-logo-only.png"
                        alt="SFXC logo"
                        class="h-16 w-16 object-contain"
                    />
                    <p class="text-sm uppercase tracking-[0.2em] text-white/80">
                        St. Francis Xavier College
                    </p>
                </div>
            </div>
        </div>

        <!-- Admin-managed hero carousel -->
        <Carousel
            v-else-if="slides.length > 0"
            class="relative h-[clamp(420px,36.4583vw,700px)] w-full overflow-hidden"
            :plugins="slides.length > 1 ? [autoplay] : []"
            @init-api="setApi"
            @mouseenter="autoplay.stop"
            @mouse-leave="[autoplay.reset(), autoplay.play()]"
        >
            <CarouselContent class="ml-0 h-full">
                <CarouselItem
                    v-for="slide in slides"
                    :key="slide.id"
                    class="h-[clamp(420px,36.4583vw,700px)] pl-0"
                >
                    <div class="relative h-full w-full">
                        <!-- Keep uploaded hero images at their original brightness; no dark overlay. -->
                        <img
                            :src="slide.image"
                            :alt="slide.title || 'St. Francis Xavier College'"
                            class="absolute inset-0 h-full w-full object-cover"
                        />

                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>

        <!-- Welcome fallback -->
        <div
            v-else-if="showFallback"
            class="relative flex h-[clamp(420px,36.4583vw,700px)] items-center overflow-hidden bg-[#104717] text-white"
        >
            <img
                src="@/assets/images/Home/Where Faith Meets Excellence.png"
                alt="St. Francis Xavier College campus"
                class="absolute inset-0 h-full w-full object-cover"
            />

            <!-- <div
                class="absolute inset-0 bg-gradient-to-r from-[#082e10]/95 via-[#104717]/75 to-[#104717]/25"
            ></div> -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"
            ></div>

            <div
                class="relative z-[2] mx-auto w-full max-w-7xl px-6 pb-36 pt-20 sm:px-8 sm:pb-32 md:px-12 md:pb-24 lg:px-16"
            >
                <div class="max-w-3xl">
                    <div
                        class="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-sm"
                    >
                        <span class="h-0.5 w-8 bg-primary"></span>
                        St. Francis Xavier College
                    </div>

                    <h1
                        class="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                        style="font-family: 'Times New Roman', Times, serif"
                    >
                        Where Faith
                        <span class="mt-1 block font-light italic text-yellow-300">
                            Meets Excellence
                        </span>
                    </h1>

                    <p class="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                        Shaping minds, forming hearts, and building community
                        — guided by faith and driven by excellence.
                    </p>

                    <div class="mt-8 flex flex-wrap gap-3 sm:mt-10">
                        <RouterLink
                            to="/about/vision-mission"
                            class="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/20 transition-all duration-300 hover:gap-4 hover:bg-primary/90 sm:px-7 sm:py-3.5"
                        >
                            Discover SFXC
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
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

                        <RouterLink
                            to="/admission/requirements"
                            class="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 sm:px-7 sm:py-3.5"
                        >
                            Explore Admissions
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>

        <!-- Carousel controls for admin-managed hero slides -->
        <div
            v-if="!loading && slides.length > 0 && showIndicators"
            class="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-8 sm:px-8 sm:pb-10 md:px-12 md:pb-12 lg:px-16"
        >
                <div class="mx-auto max-w-7xl">
                    <div class="mb-5 hidden h-px w-full bg-white/10 sm:block"></div>

                    <div class="flex items-center gap-4 sm:gap-6">
                        <div class="flex items-center gap-2">
                            <button
                                v-for="(slide, index) in slides"
                                :key="slide.id"
                                :class="[
                                    'pointer-events-auto cursor-pointer rounded-full border-none p-0 transition-all duration-500',
                                    current === index
                                        ? 'h-1.5 w-8 bg-primary'
                                        : 'h-1.5 w-4 bg-white/30 hover:bg-white/50',
                                ]"
                                @click="goToSlide(index)"
                                :aria-label="`Go to slide ${index + 1}`"
                                :aria-current="current === index ? 'true' : undefined"
                            ></button>
                        </div>

                        <span class="hidden font-mono text-xs tabular-nums tracking-widest text-white/50 sm:block">
                            {{ slideCounter }}
                        </span>

                        <div class="flex-1"></div>

                        <div class="flex gap-2">
                            <button
                                @click="carouselApi?.scrollPrev()"
                                class="pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:h-11 sm:w-11"
                                aria-label="Previous slide"
                            >
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
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>

                            <button
                                @click="carouselApi?.scrollNext()"
                                class="pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:h-11 sm:w-11"
                                aria-label="Next slide"
                            >
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
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Mobile animated motto -->
        <div class="pointer-events-none absolute bottom-20 left-0 right-0 z-10 flex items-center justify-center px-4 sm:hidden">
            <div class="relative flex w-full justify-center">
                <h2
                    class="flex flex-col justify-center gap-y-2 text-center text-base font-bold uppercase tracking-widest text-white drop-shadow-lg"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 500, duration: 1500, type: 'tween' } }"
                    >
                        <span ref="startSRef" class="inline-block origin-center">S</span>
                        <span v-motion :initial="{ opacity: 1 }" :enter="{ opacity: 0, transition: { delay: 5500, duration: 500, type: 'tween' } }" class="inline-block">ervice.</span>
                    </span>

                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 1500, duration: 1500, type: 'tween' } }"
                    >
                        <span ref="startFRef" class="inline-block origin-center">F</span>
                        <span v-motion :initial="{ opacity: 1 }" :enter="{ opacity: 0, transition: { delay: 5500, duration: 500, type: 'tween' } }" class="inline-block">ortitude.</span>
                    </span>

                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 2500, duration: 1500, type: 'tween' } }"
                    >
                        <span v-motion :initial="{ opacity: 1 }" :enter="{ opacity: 0, transition: { delay: 5500, duration: 500, type: 'tween' } }" class="inline-block">E</span>
                        <span ref="startXRef" class="inline-block origin-center">x</span>
                        <span v-motion :initial="{ opacity: 1 }" :enter="{ opacity: 0, transition: { delay: 5500, duration: 500, type: 'tween' } }" class="inline-block">cellence.</span>
                    </span>

                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 3500, duration: 1500, type: 'tween' } }"
                    >
                        <span ref="startCRef" class="inline-block origin-center">C</span>
                        <span v-motion :initial="{ opacity: 1 }" :enter="{ opacity: 0, transition: { delay: 5500, duration: 500, type: 'tween' } }" class="inline-block">hrist-centeredness.</span>
                    </span>
                </h2>

                <h2
                    class="absolute top-[75%] -translate-y-1/2 whitespace-nowrap text-center text-lg font-bold uppercase tracking-widest text-white drop-shadow-lg"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    <span ref="endSRef" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 6900, duration: 100, type: 'tween' } }">S</span>
                    <span v-motion :initial="{ opacity: 0, x: -10, filter: 'blur(8px)' }" :enter="{ opacity: 1, x: 0, filter: 'blur(0px)', transition: { delay: 6900, duration: 800, type: 'tween' } }">t. </span>
                    <span ref="endFRef" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 7900, duration: 100, type: 'tween' } }">F</span>
                    <span v-motion :initial="{ opacity: 0, x: -10, filter: 'blur(8px)' }" :enter="{ opacity: 1, x: 0, filter: 'blur(0px)', transition: { delay: 7900, duration: 800, type: 'tween' } }">rancis </span>
                    <span ref="endXRef" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 8900, duration: 100, type: 'tween' } }">X</span>
                    <span v-motion :initial="{ opacity: 0, x: -10, filter: 'blur(8px)' }" :enter="{ opacity: 1, x: 0, filter: 'blur(0px)', transition: { delay: 8900, duration: 800, type: 'tween' } }">avier </span>
                    <span ref="endCRef" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 9900, duration: 100, type: 'tween' } }">C</span>
                    <span v-motion :initial="{ opacity: 0, x: -10, filter: 'blur(8px)' }" :enter="{ opacity: 1, x: 0, filter: 'blur(0px)', transition: { delay: 9900, duration: 800, type: 'tween' } }">ollege</span>
                </h2>
            </div>
        </div>
    </section>

    <!-- Desktop Motto -->
    <section class="hidden overflow-hidden bg-background py-8 sm:block">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-center">
                <h2
                    class="flex justify-center gap-x-3 whitespace-nowrap text-center text-xl font-bold tracking-[0.2em] text-foreground md:gap-x-4 md:text-2xl lg:text-3xl"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    <span v-motion :initial="{ opacity: 0, y: 10, scale: 0.95 }" :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 500, duration: 1500, type: 'tween' } }">Service.</span>
                    <span v-motion :initial="{ opacity: 0, y: 10, scale: 0.95 }" :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 2000, duration: 1500, type: 'tween' } }">Fortitude.</span>
                    <span v-motion :initial="{ opacity: 0, y: 10, scale: 0.95 }" :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 3500, duration: 1500, type: 'tween' } }">eXcellence.</span>
                    <span v-motion :initial="{ opacity: 0, y: 10, scale: 0.95 }" :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 4500, duration: 1500, type: 'tween' } }">Christ-centeredness.</span>
                </h2>
            </div>
        </div>
    </section>

    <!-- School Heritage -->
    <section
        id="schoolHero"
        class="relative scroll-mt-16 overflow-hidden bg-background py-20 sm:py-28 md:py-32"
    >
        <div
            class="pointer-events-none absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl transition-transform duration-1000 ease-out"
            :class="{ 'translate-x-10 translate-y-10': scrollY > 100 }"
        ></div>

        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
                <div class="relative z-10 order-2 lg:col-span-5 lg:order-1">
                    <div
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, type: 'tween', ease: 'easeOut' } }"
                        class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                        <span class="h-2 w-2 rounded-full bg-primary"></span>
                        Our Heritage
                    </div>

                    <h3
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 700, type: 'tween', ease: 'easeOut' } }"
                        class="mb-8 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl"
                    >
                        St. Francis<br />
                        <span class="font-serif font-light italic text-primary">
                            Xavier College
                        </span>
                    </h3>

                    <div
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{ opacity: 1, y: 0, transition: { delay: 200, duration: 700, type: 'tween', ease: 'easeOut' } }"
                        class="relative space-y-6 pl-6 text-base leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:to-transparent md:text-lg"
                    >
                        <p>
                            We pursue
                            <span class="font-medium text-foreground">innovative approaches</span>
                            in education to enhance instruction, research, and community
                            involvement.
                        </p>
                        <p>
                            Pledging to provide learners a curricular framework that instills
                            creative and critical thinking in a rapidly changing world.
                        </p>
                        <p>
                            Cultural Preservation, Environmental Care, and Values Formation are
                            inculcated to guarantee genuine transformation.
                        </p>
                    </div>
                </div>

                <div
                    v-motion
                    :initial="{ opacity: 0, x: 32 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { delay: 300, duration: 1000, type: 'tween', ease: 'easeOut' } }"
                    class="relative order-1 w-full lg:col-span-7 lg:order-2 lg:h-150"
                >
                    <div class="relative grid h-full grid-cols-2 gap-4">
                        <div class="group relative mt-0 h-75 w-full overflow-hidden rounded-2xl shadow-2xl lg:mt-12 lg:h-100">
                            <div class="absolute inset-0 z-10 bg-primary/20 transition-colors duration-500 group-hover:bg-transparent"></div>
                            <img
                                src="@/assets/images/Home/Campus Life.png"
                                alt="St. Francis Xavier College campus"
                                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>

                        <div class="group relative h-62.5 w-full overflow-hidden rounded-2xl shadow-xl lg:absolute lg:right-0 lg:top-[20%] lg:z-20 lg:h-87.5 lg:w-[60%]">
                            <div class="absolute inset-0 z-10 bg-secondary/20 transition-colors duration-500 group-hover:bg-transparent"></div>
                            <img
                                src="@/assets/images/Home/Excellence in Education.png"
                                alt="SFXC campus activity"
                                class="h-full w-full origin-bottom transform object-cover transition-transform duration-1000 group-hover:scale-110"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Programs Offered -->
    <PublicProgramsSection />

<!-- School Image and Statistics -->
<section id="schoolImage" class="relative overflow-hidden py-24 sm:py-32">
    <div class="absolute inset-0">
        <div class="absolute inset-0 z-10 bg-primary/20 mix-blend-multiply"></div>

        <img
            src="@/assets/images/sfxc-building.jpg"
            alt="St. Francis Xavier College campus"
            class="h-full w-full scale-110 transform object-cover transition-transform duration-[20s] ease-linear hover:scale-100"
            loading="lazy"
        />

        <div class="absolute inset-0 z-20 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
    </div>

    <div class="relative z-30 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 sm:px-6 lg:px-8">
        <div class="mt-auto grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <StatCard
                v-for="(stat, i) in homeStats"
                :key="stat.id"
                :stat="stat"
                :delay="i * 100"
            />
        </div>
    </div>
</section>


    <!-- News and Events -->
    <section id="news" class="relative overflow-hidden bg-background py-20 md:py-28">
        <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mb-12 flex flex-col items-start justify-between md:flex-row">
                <div class="max-w-xl">
                    <div
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, type: 'tween', ease: 'easeOut' } }"
                        class="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary-foreground"
                    >
                        <span class="h-2 w-2 rounded-full bg-secondary-foreground"></span>
                        Stay Updated
                    </div>

                    <h2
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 700, type: 'tween', ease: 'easeOut' } }"
                        class="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
                    >
                        News & Events
                    </h2>

                    <p class="text-muted-foreground">
                        Discover the latest announcements, activities, and stories from SFXC.
                    </p>
                </div>

                <RouterLink
                    to="/news"
                    class="hidden items-center gap-2 pb-2 font-medium text-primary transition-all hover:gap-4 md:flex"
                >
                    View Newsroom
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

            <!-- Loading state -->
            <div v-if="newsLoading" class="grid gap-6 lg:grid-cols-12 lg:gap-8">
                <div class="animate-pulse overflow-hidden rounded-3xl bg-muted lg:col-span-7">
                    <div class="aspect-4/3 bg-muted lg:h-125 lg:aspect-auto"></div>
                    <div class="space-y-3 p-6">
                        <div class="h-4 w-24 rounded bg-muted-foreground/20"></div>
                        <div class="h-6 w-3/4 rounded bg-muted-foreground/20"></div>
                        <div class="h-4 w-full rounded bg-muted-foreground/20"></div>
                    </div>
                </div>

                <div class="flex flex-col gap-4 lg:col-span-5">
                    <div
                        v-for="n in 3"
                        :key="n"
                        class="h-38 animate-pulse rounded-2xl bg-muted"
                    ></div>
                </div>
            </div>

            <!-- News loaded successfully -->
            <div v-else-if="posts.length > 0" class="grid h-full gap-6 lg:grid-cols-12 lg:gap-8">
                <!-- Featured post -->
                <RouterLink
                    v-if="featuredPost"
                    :to="`/news/${featuredPost.slug}`"
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { delay: 200, duration: 700, type: 'tween', ease: 'easeOut' } }"
                    class="group relative overflow-hidden rounded-3xl shadow-md transition-shadow hover:shadow-xl lg:col-span-7"
                >
                    <div class="relative aspect-4/3 overflow-hidden bg-muted lg:h-125 lg:aspect-auto">
                        <img
                            v-if="getNewsImage(featuredPost)"
                            :src="getNewsImage(featuredPost)!"
                            :alt="featuredPost.title"
                            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:-rotate-1 group-hover:scale-105"
                            @error="($event.target as HTMLImageElement).style.display = 'none'"
                        />

                        <!-- Shown when no image was uploaded -->
                        <div
                            v-else
                            class="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground"
                            aria-label="No image uploaded"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.25"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="m21 15-5-5L5 21" />
                            </svg>
                        </div>
                    </div>

                    <div class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

                    <div class="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                        <div class="mt-auto">
                            <span class="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                                {{ featuredPost.category?.name ?? 'News' }}
                            </span>

                            <h3 class="mb-3 text-2xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-3xl">
                                {{ featuredPost.title }}
                            </h3>

                            <p
                                v-if="featuredPost.excerpt"
                                class="mb-4 line-clamp-2 max-w-xl text-base text-muted-foreground"
                            >
                                {{ featuredPost.excerpt }}
                            </p>

                            <div class="flex items-center text-sm font-medium text-foreground/70">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    class="mr-2"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {{ formatNewsDate(featuredPost.published_at || featuredPost.created_at) }}
                            </div>
                        </div>
                    </div>
                </RouterLink>

                <!-- Other news posts -->
                <div
                    class="flex flex-col gap-4 lg:col-span-5"
                    :class="{ 'lg:col-span-12': !featuredPost }"
                >
                    <MiniNewsCard
                        v-for="item in miniNewsPosts"
                        :key="item.id"
                        :item="item"
                    />

                    <p
                        v-if="miniNewsPosts.length === 0"
                        class="rounded-2xl border border-border/50 p-6 text-sm text-muted-foreground"
                    >
                        More news and events will be posted here soon.
                    </p>

                    <RouterLink
                        to="/news"
                        class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border p-4 text-primary transition-transform active:scale-95 md:hidden"
                    >
                        View All News
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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

            <!-- No published posts -->
            <div
                v-else-if="!newsError"
                class="rounded-3xl border border-dashed border-border px-6 py-16 text-center"
            >
                <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M8 2h8l4 4v16H4V2z" />
                        <path d="M8 2v6h8V2" />
                        <path d="M8 14h8" />
                        <path d="M8 18h5" />
                    </svg>
                </div>

                <h3 class="mb-2 text-xl font-bold text-foreground">
                    Stay tuned for updates
                </h3>

                <p class="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
                    There are no published news articles yet. Check back soon for announcements,
                    events, and stories from St. Francis Xavier College.
                </p>
            </div>

            <!-- API error -->
            <div v-else class="rounded-2xl border border-border p-8 text-center">
                <p class="mb-4 text-muted-foreground">
                    News is temporarily unavailable. Please try again.
                </p>

                <button
                    type="button"
                    class="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    @click="fetchNews"
                >
                    Try Again
                </button>
            </div>
        </div>
    </section>
</template>
