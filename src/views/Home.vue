<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import type { CarouselApi } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
type HeroButton = {
    text: string
    href: string
    primary?: boolean
}

type HeroSlide = {
    id: number
    title: string
    description: string
    image: string
    buttons?: HeroButton[]
}

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        title: '',
        description: '',
        image: 'https://placehold.co/1920x1080?text=1920x1080',
    },
    {
        id: 2,
        title: 'Excellence in Education',
        description:
            'Nurturing young minds through innovative teaching methods and state-of-the-art facilities.',
        image: 'https://placehold.co/1920x1080?text=1920x1080',
        buttons: [{ text: 'Enroll Now', href: '#academics', primary: true }],
    },
    {
        id: 3,
        title: 'Building Community',
        description:
            'Fostering a supportive environment where students grow academically, socially, and emotionally.',
        image: 'https://placehold.co/1920x1080?text=1920x1080',
        buttons: [{ text: 'Enroll Now', href: '#events', primary: true }],
    },
    {
        id: 4,
        title: 'Holistic Development',
        description:
            'Balancing academic rigor with arts, sports, and character development for well-rounded growth.',
        image: 'https://placehold.co/1920x1080?text=1920x1080',
        buttons: [{ text: 'Enroll Now', href: '#academics', primary: true }],
    },
]

const carouselApi = ref<CarouselApi>()
const current = ref(0)
const count = ref(0)

const firstCarouselAutoplay = Autoplay({
    delay: 3000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
})
const secondCarouselAutoplay = Autoplay({
    delay: 2500,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
})

const programsCarouselApi = ref<CarouselApi>()
const programsCurrent = ref(0)
const programsCount = ref(0)

const programs = [
    {
        id: 1,
        image: 'https://placehold.co/800x800?text=Program+800x800',
        alt: 'Course 1',
        name: 'Program 1',
    },
    {
        id: 2,
        image: 'https://placehold.co/800x800?text=Program+800x800',
        alt: 'Course 2',
        name: 'Program 2',
    },
    {
        id: 3,
        image: 'https://placehold.co/800x800?text=Program+800x800',
        alt: 'Course 3',
        name: 'Program 3',
    },
    {
        id: 4,
        image: 'https://placehold.co/800x800?text=Program+800x800',
        alt: 'Course 4',
        name: 'Program 4',
    },
    {
        id: 5,
        image: 'https://placehold.co/800x800?text=Program+800x800',
        alt: 'Course 5',
        name: 'Program 5',
    },
    {
        id: 6,
        image: 'https://placehold.co/800x800?text=Program+800x800',
        alt: 'Course 6',
        name: 'Program 6',
    },
]

function setApi(api: CarouselApi) {
    carouselApi.value = api
    if (!api) return

    count.value = api.scrollSnapList().length
    current.value = api.selectedScrollSnap()

    const updateCurrent = () => {
        current.value = api.selectedScrollSnap()
    }

    api.on('select', updateCurrent)
    api.on('reInit', updateCurrent)
}

function setProgramsApi(api: CarouselApi) {
    programsCarouselApi.value = api
    if (!api) return

    programsCount.value = api.scrollSnapList().length
    programsCurrent.value = api.selectedScrollSnap()

    api.on('select', () => {
        programsCurrent.value = api.selectedScrollSnap()
    })
}

function goToProgramSlide(index: number) {
    programsCarouselApi.value?.scrollTo(index)
}

function goToSlide(index: number) {
    carouselApi.value?.scrollTo(index)
}

const sDx = ref(0)
const sDy = ref(0)
const fDx = ref(0)
const fDy = ref(0)
const xDx = ref(0)
const xDy = ref(0)
const cDx = ref(0)
const cDy = ref(0)

const scrollY = ref(0)

const handleScroll = () => {
    scrollY.value = window.scrollY
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed')

                    const items = entry.target.querySelectorAll('.reveal-item')
                    items.forEach((item) => {
                        item.classList.remove(
                            'opacity-0',
                            'translate-y-4',
                            'translate-x-4',
                            'translate-y-8',
                            'translate-x-8',
                        )
                        item.classList.add('opacity-100', 'translate-y-0', 'translate-x-0')
                    })

                    // Optional: stop observing once revealed
                    observer.unobserve(entry.target)
                }
            })
        },
        {
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1,
        },
    )

    document.querySelectorAll('.reveal-group').forEach((el) => {
        observer.observe(el)
    })

    setTimeout(() => {
        const getDiff = (startId: string, endId: string) => {
            const startEl = document.getElementById(startId)
            const endEl = document.getElementById(endId)
            if (startEl && endEl) {
                const startRect = startEl.getBoundingClientRect()
                const endRect = endEl.getBoundingClientRect()
                return {
                    dx: endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2),
                    dy: endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2),
                }
            }
            return { dx: 0, dy: 0 }
        }

        const sDiff = getDiff('start-s', 'end-s')
        sDx.value = sDiff.dx
        sDy.value = sDiff.dy

        const fDiff = getDiff('start-f', 'end-f')
        fDx.value = fDiff.dx
        fDy.value = fDiff.dy

        const xDiff = getDiff('start-x', 'end-x')
        xDx.value = xDiff.dx
        xDy.value = xDiff.dy

        const cDiff = getDiff('start-c', 'end-c')
        cDx.value = cDiff.dx
        cDy.value = cDiff.dy
    }, 500)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <section id="home" class="relative w-full">
        <Carousel
            class="relative w-full h-[92dvh] overflow-hidden"
            :plugins="[firstCarouselAutoplay]"
            @init-api="setApi"
            @mouseenter="firstCarouselAutoplay.stop"
            @mouseLeave="[firstCarouselAutoplay.reset(), firstCarouselAutoplay.play()]"
        >
            <CarouselContent class="ml-0">
                <CarouselItem v-for="slide in heroSlides" :key="slide.id" class="pl-0">
                    <div class="relative w-full h-[92dvh]">
                        <img
                            :src="slide.image"
                            :alt="slide.title"
                            class="absolute inset-0 w-full h-full object-cover"
                        />
                        <!-- Cinematic multi-layer gradient overlays -->
                        <div
                            class="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10 z-1"
                        ></div>
                        <div
                            class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent z-1"
                        ></div>
                        <div
                            class="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-primary/25 to-transparent z-1"
                        ></div>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>

        <!-- Content overlay: sits above carousel, below wave -->
        <div class="absolute inset-0 z-10 flex flex-col pointer-events-none">
            <!-- Main slide content -->
            <div class="flex-1 flex items-end md:items-center">
                <div class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pb-44 sm:pb-40 md:pb-0">
                    <!-- Accent line with label (desktop) -->
                    <div class="hidden md:flex items-center gap-4 mb-8">
                        <div class="w-10 h-0.5 bg-primary"></div>
                        <span class="text-white/50 text-xs font-medium uppercase tracking-[0.3em]"
                            >St. Francis Xavier College</span
                        >
                    </div>

                    <Transition name="hero-text">
                        <div :key="current" class="max-w-2xl pointer-events-auto">
                            <!-- Slide 1 (no title): institutional branding display -->
                            <template v-if="!heroSlides[current]?.title">
                                <h1
                                    class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] mb-6"
                                    style="font-family: 'Times New Roman', Times, serif"
                                >
                                    Where Faith<br />
                                    <span class="text-primary italic font-light tracking-wide"
                                        >Meets Excellence</span
                                    >
                                </h1>
                                <p
                                    class="text-base md:text-lg text-white/70 max-w-md leading-relaxed"
                                >
                                    Shaping minds, forming hearts, and building community — guided
                                    by faith and driven by excellence.
                                </p>
                            </template>
                            <!-- Other slides: full title / description / CTA -->
                            <template v-else>
                                <h1
                                    class="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5"
                                    style="font-family: 'Times New Roman', Times, serif"
                                >
                                    {{ heroSlides[current]?.title }}
                                </h1>
                                <p
                                    class="text-base md:text-lg text-white/70 mb-8 max-w-md leading-relaxed"
                                >
                                    {{ heroSlides[current]?.description }}
                                </p>
                                <div
                                    v-if="heroSlides[current]?.buttons?.length"
                                    class="flex flex-col sm:flex-row gap-3"
                                >
                                    <a
                                        v-for="btn in heroSlides[current]?.buttons"
                                        :key="btn.text"
                                        :href="btn.href"
                                        class="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:gap-4 shadow-lg shadow-primary/30 cursor-pointer"
                                    >
                                        {{ btn.text }}
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
                                    </a>
                                </div>
                            </template>
                        </div>
                    </Transition>
                </div>
            </div>

            <!-- Bottom controls bar -->
            <div class="pointer-events-auto pb-8 sm:pb-10 md:pb-12 px-6 sm:px-8 lg:px-16">
                <div class="max-w-7xl mx-auto">
                    <div class="w-full h-px bg-white/10 mb-5 hidden sm:block"></div>
                    <div class="flex items-center gap-4 sm:gap-6">
                        <!-- Pill-style slide indicators -->
                        <div class="flex gap-2 items-center">
                            <button
                                v-for="(slide, index) in heroSlides"
                                :key="slide.id"
                                :class="[
                                    'transition-all duration-500 rounded-full cursor-pointer border-none p-0',
                                    current === index
                                        ? 'w-8 h-1.5 bg-primary'
                                        : 'w-4 h-1.5 bg-white/30 hover:bg-white/50',
                                ]"
                                @click="goToSlide(index)"
                                :aria-label="`Go to slide ${index + 1}`"
                            />
                        </div>

                        <!-- Slide counter -->
                        <span
                            class="text-white/40 text-xs font-mono tabular-nums tracking-widest hidden sm:block"
                        >
                            {{ String(current + 1).padStart(2, '0') }}&nbsp;/&nbsp;{{
                                String(heroSlides.length).padStart(2, '0')
                            }}
                        </span>

                        <!-- Spacer -->
                        <div class="flex-1"></div>

                        <!-- Prev / Next controls -->
                        <div class="flex gap-2">
                            <button
                                @click="carouselApi?.scrollPrev()"
                                class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
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
                                class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
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
        </div>

        <!-- Mobile animated motto -->
        <div
            class="absolute bottom-20 left-0 right-0 z-10 flex justify-center items-center px-4 pointer-events-none sm:hidden"
        >
            <div
                class="relative w-full flex justify-center"
                :style="{
                    '--dx-s': sDx + 'px',
                    '--dy-s': sDy + 'px',
                    '--dx-f': fDx + 'px',
                    '--dy-f': fDy + 'px',
                    '--dx-x': xDx + 'px',
                    '--dy-x': xDy + 'px',
                    '--dx-c': cDx + 'px',
                    '--dy-c': cDy + 'px',
                }"
            >
                <!-- Animated Words -->
                <h2
                    class="text-base font-bold text-white text-center tracking-widest flex flex-col justify-center gap-y-2 uppercase drop-shadow-lg"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    <span class="animate-popup" style="animation-delay: 0.5s">
                        <span id="start-s" class="inline-block animate-fly-s origin-center">S</span
                        ><span class="inline-block animate-fade-out">ervice.</span>
                    </span>
                    <span class="animate-popup" style="animation-delay: 1.5s">
                        <span id="start-f" class="inline-block animate-fly-f origin-center">F</span
                        ><span class="inline-block animate-fade-out">ortitude.</span>
                    </span>
                    <span class="animate-popup" style="animation-delay: 2.5s">
                        <span class="inline-block animate-fade-out">E</span
                        ><span id="start-x" class="inline-block animate-fly-x origin-center">x</span
                        ><span class="inline-block animate-fade-out">cellence.</span>
                    </span>
                    <span class="animate-popup" style="animation-delay: 3.5s">
                        <span id="start-c" class="inline-block animate-fly-c origin-center">C</span
                        ><span class="inline-block animate-fade-out">hrist-centeredness.</span>
                    </span>
                </h2>
                <!-- Final Text -->
                <h2
                    class="absolute top-[75%] -translate-y-1/2 text-lg whitespace-nowrap font-bold text-white text-center tracking-widest uppercase drop-shadow-lg"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    <span id="end-s" class="opacity-0 animate-show-letter-s">S</span
                    ><span class="opacity-0 animate-reveal-text-s">t. </span>
                    <span id="end-f" class="opacity-0 animate-show-letter-f">F</span
                    ><span class="opacity-0 animate-reveal-text-f">rancis </span>
                    <span id="end-x" class="opacity-0 animate-show-letter-x">X</span
                    ><span class="opacity-0 animate-reveal-text-x">avier </span>
                    <span id="end-c" class="opacity-0 animate-show-letter-c">C</span
                    ><span class="opacity-0 animate-reveal-text-c">ollege</span>
                </h2>
            </div>
        </div>
    </section>

    <section class="hidden sm:block py-8 bg-background overflow-hidden">
        <div class="container mx-auto px-4">
            <div class="flex justify-center items-center">
                <h2
                    class="text-xl md:text-2xl lg:text-3xl font-bold text-foreground text-center tracking-[0.2em] flex justify-center gap-x-3 md:gap-x-4 whitespace-nowrap"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    <span class="animate-popup" style="animation-delay: 0.5s">Service.</span>
                    <span class="animate-popup" style="animation-delay: 2s">Fortitude.</span>
                    <span class="animate-popup" style="animation-delay: 3.5s">eXcellence.</span>
                    <span class="animate-popup" style="animation-delay: 4.5s"
                        >Christ-centeredness.</span
                    >
                </h2>
            </div>
        </div>
    </section>

    <section
        id="schoolHero"
        class="py-20 sm:py-28 md:py-32 bg-background scroll-mt-16 overflow-hidden relative"
    >
        <!-- Abstract minimalist background element -->
        <div
            class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-transform duration-1000 ease-out transform pointer-events-none"
            :class="{ 'translate-y-10 translate-x-10': scrollY > 100 }"
        ></div>

        <div class="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto reveal-group">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                <!-- Text Content: Asymmetrical layout spanning 5 columns -->
                <div class="lg:col-span-5 order-2 lg:order-1 relative z-10">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 reveal-item opacity-0 translate-y-4 transition-all duration-700 ease-out"
                    >
                        <span class="w-2 h-2 rounded-full bg-primary"></span>
                        Our Heritage
                    </div>

                    <h3
                        class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-foreground leading-[1.1] tracking-tight reveal-item opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out"
                    >
                        St. Francis<br />
                        <span class="text-primary italic font-serif font-light"
                            >Xavier College</span
                        >
                    </h3>

                    <div
                        class="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed relative before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary/50 before:to-transparent pl-6 reveal-item opacity-0 translate-y-4 transition-all duration-700 delay-200 ease-out"
                    >
                        <p>
                            We pursue
                            <span class="text-foreground font-medium">innovative approaches</span>
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

                <!-- Image grid layout spanning 7 columns -->
                <div
                    class="lg:col-span-7 order-1 lg:order-2 relative lg:h-150 w-full reveal-item opacity-0 translate-x-8 transition-all duration-1000 delay-300 ease-out"
                >
                    <div class="grid grid-cols-2 gap-4 h-full relative">
                        <div
                            class="relative w-full h-75 lg:h-100 mt-0 lg:mt-12 group rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div
                                class="absolute inset-0 bg-primary/20 z-10 group-hover:bg-transparent transition-colors duration-500"
                            ></div>
                            <img
                                src="https://placehold.co/800x1000?text=Campus+Life"
                                alt="SFXC Campus Life"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div
                            class="relative w-full h-62.5 lg:h-87.5 lg:absolute lg:right-0 lg:top-[20%] lg:w-[60%] group rounded-2xl overflow-hidden shadow-xl z-20"
                        >
                            <div
                                class="absolute inset-0 bg-secondary/20 z-10 group-hover:bg-transparent transition-colors duration-500"
                            ></div>
                            <img
                                src="https://placehold.co/800x600?text=Excellence"
                                alt="SFXC Excellence"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 transform origin-bottom"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Programs Offered Section (Creative Bento Layout) -->
    <section
        id="academics"
        class="py-20 md:py-28 bg-gray-50/50 dark:bg-zinc-900/50 relative overflow-hidden"
    >
        <div
            class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-size-[20px_20px] opacity-30"
        ></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex flex-col md:flex-row justify-between items-end mb-16 reveal-group">
                <div class="max-w-xl">
                    <h3
                        class="text-3xl md:text-5xl font-bold mb-4 text-foreground reveal-item opacity-0 translate-y-4 transition-all duration-700"
                    >
                        Areas of Study
                    </h3>
                    <p
                        class="text-muted-foreground text-lg reveal-item opacity-0 translate-y-4 transition-all duration-700 delay-100"
                    >
                        Discover your passion across our diverse range of undergraduate programs
                        designed for the future.
                    </p>
                </div>
                <button
                    class="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-4 pb-2 mt-4 reveal-item opacity-0 translate-x-4 transition-all duration-700 delay-200"
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
                </button>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[250px] reveal-group"
            >
                <div
                    v-for="(program, index) in programs.slice(0, 5)"
                    :key="program.id"
                    class="group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all cursor-pointer reveal-item opacity-0 translate-y-8"
                    :class="[
                        index === 0 ? 'md:col-span-2 md:row-span-2' : '',
                        index === 1 || index === 2 ? 'md:col-span-1 md:row-span-1' : '',
                        index === 3 || index === 4 ? 'md:col-span-1 md:row-span-1' : '',
                    ]"
                    :style="{ transitionDuration: '700ms', transitionDelay: `${index * 100}ms` }"
                >
                    <!-- Background Image with progressive blur/darkening on hover -->
                    <div
                        class="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    >
                        <img
                            :src="program.image"
                            :alt="program.alt"
                            class="w-full h-full object-cover"
                        />
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
                                    Explore comprehensive curriculum focused on practical skills and
                                    theoretical excellence.
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

                <!-- CTA Card -->
                <div
                    class="group relative overflow-hidden rounded-3xl bg-primary flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-primary/90 transition-all reveal-item opacity-0 translate-y-8"
                    style="transition-duration: 700ms; transition-delay: 500ms"
                >
                    <div
                        class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300"
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
                    <h4 class="text-white text-xl font-bold">Discover More</h4>
                    <p class="text-white/80 text-sm mt-2">View all our academic offerings</p>
                </div>
            </div>
        </div>
    </section>

    <!-- School Image Hero Section -->
    <section id="schoolImage" class="relative py-24 sm:py-32 overflow-hidden reveal-group">
        <!-- Background Image with Parallax Effect -->
        <div class="absolute inset-0">
            <div class="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
            <img
                src="https://placehold.co/1920x1080?text=Campus+Panorama"
                alt="School Campus"
                class="w-full h-full object-cover transform scale-110 transition-transform duration-[20s] ease-linear hover:scale-100"
            />
            <div
                class="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent z-20"
            ></div>
        </div>

        <!-- Minimalist Stats/Callouts layered over image -->
        <div
            class="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end"
        >
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-auto">
                <div
                    class="glass-card bg-background/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 reveal-item opacity-0 translate-y-8 transition-all duration-700 delay-0"
                >
                    <h4 class="text-4xl font-extrabold text-foreground mb-1">50+</h4>
                    <p class="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                        Years of Excellence
                    </p>
                </div>
                <div
                    class="glass-card bg-background/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 reveal-item opacity-0 translate-y-8 transition-all duration-700 delay-100"
                >
                    <h4 class="text-4xl font-extrabold text-foreground mb-1">24</h4>
                    <p class="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                        Academic Programs
                    </p>
                </div>
                <div
                    class="glass-card bg-background/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 reveal-item opacity-0 translate-y-8 transition-all duration-700 delay-200"
                >
                    <h4 class="text-4xl font-extrabold text-foreground mb-1">12k</h4>
                    <p class="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                        Successful Alumni
                    </p>
                </div>
                <div
                    class="glass-card bg-background/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 reveal-item opacity-0 translate-y-8 transition-all duration-700 delay-300"
                >
                    <h4 class="text-4xl font-extrabold text-foreground mb-1">98%</h4>
                    <p class="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                        Employment Rate
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- News and Announcements Section -->
    <section id="news" class="py-20 md:py-28 bg-background relative overflow-hidden reveal-group">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex flex-col md:flex-row justify-between items-start mb-12">
                <div class="max-w-xl">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-semibold mb-4 reveal-item opacity-0 translate-y-4 transition-all duration-700 ease-out"
                    >
                        <span class="w-2 h-2 rounded-full bg-secondary-foreground"></span>
                        Stay Updated
                    </div>
                    <h2
                        class="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 reveal-item opacity-0 translate-y-4 transition-all duration-700 delay-100"
                    >
                        News & Events
                    </h2>
                </div>
                <button
                    class="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-4 pb-2 reveal-item opacity-0 translate-x-4 transition-all duration-700 delay-200"
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
                </button>
            </div>

            <div class="grid h-full lg:grid-cols-12 gap-6 lg:gap-8">
                <!-- Featured News - Large Asymmetric Card -->
                <div
                    class="lg:col-span-7 group relative overflow-hidden rounded-3xl shadow-md hover:shadow-xl reveal-item opacity-0 translate-y-8 transition-all duration-700 delay-200"
                >
                    <div class="aspect-4/3 lg:aspect-auto lg:h-125 overflow-hidden">
                        <img
                            src="https://placehold.co/1024x768?text=Featured+News+1024x768"
                            alt="Featured News"
                            class="w-full h-full object-cover group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-700 ease-out"
                        />
                    </div>
                    <div
                        class="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"
                    ></div>

                    <div
                        class="absolute bottom-0 left-0 right-0 p-8 lg:p-10 flex flex-col justify-end h-full"
                    >
                        <div class="mt-auto">
                            <span
                                class="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold mb-4 shadow-sm"
                                >Featured</span
                            >
                            <h3
                                class="text-2xl md:text-3xl font-bold mb-3 text-foreground leading-tight group-hover:text-primary transition-colors duration-300"
                            >
                                SFXC Human Resource Office FB Page
                            </h3>
                            <p class="text-base text-muted-foreground mb-4 line-clamp-2 max-w-xl">
                                Scan the QR Code to visit the SFXC Human Resource Office Facebook
                                Page for updates and announcements regarding career opportunities.
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
                                January 27, 2026
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mini News Stack -->
                <div
                    class="lg:col-span-5 flex flex-col gap-4 reveal-item opacity-0 translate-y-8 transition-all duration-700 delay-300"
                >
                    <!-- Mini News Item -->
                    <div
                        class="group relative flex gap-4 bg-card hover:bg-accent/5 rounded-2xl overflow-hidden p-3 transition-colors duration-300 border border-border/40 focus-within:ring-2 focus-within:ring-primary cursor-pointer"
                    >
                        <div class="w-32 h-32 shrink-0 overflow-hidden rounded-xl">
                            <img
                                src="https://placehold.co/600x600?text=News+1"
                                alt="News 1"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div class="flex flex-col py-2 pr-2 justify-center">
                            <span
                                class="text-primary text-xs font-bold uppercase tracking-wider mb-2"
                                >Spiritual</span
                            >
                            <h4
                                class="font-bold text-foreground mb-2 line-clamp-2 text-base group-hover:text-primary transition-colors"
                            >
                                Sacred Heart of Jesus Parish Church Mass
                            </h4>
                            <span class="text-xs text-muted-foreground mt-auto flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    class="mr-1.5"
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
                                Jan 09, 2026
                            </span>
                        </div>
                    </div>

                    <!-- Mini News Item -->
                    <div
                        class="group relative flex gap-4 bg-card hover:bg-accent/5 rounded-2xl overflow-hidden p-3 transition-colors duration-300 border border-border/40 focus-within:ring-2 focus-within:ring-primary cursor-pointer"
                    >
                        <div class="w-32 h-32 shrink-0 overflow-hidden rounded-xl">
                            <img
                                src="https://placehold.co/600x600?text=News+2"
                                alt="News 2"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div class="flex flex-col py-2 pr-2 justify-center">
                            <span
                                class="text-primary text-xs font-bold uppercase tracking-wider mb-2"
                                >Academics</span
                            >
                            <h4
                                class="font-bold text-foreground mb-2 line-clamp-2 text-base group-hover:text-primary transition-colors"
                            >
                                Application for Non-Academics Awards
                            </h4>
                            <span class="text-xs text-muted-foreground mt-auto flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    class="mr-1.5"
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
                                Jan 12 - Feb 27
                            </span>
                        </div>
                    </div>

                    <!-- Mini News Item -->
                    <div
                        class="group relative flex gap-4 bg-card hover:bg-accent/5 rounded-2xl overflow-hidden p-3 transition-colors duration-300 border border-border/40 focus-within:ring-2 focus-within:ring-primary cursor-pointer"
                    >
                        <div class="w-32 h-32 shrink-0 overflow-hidden rounded-xl">
                            <img
                                src="https://placehold.co/600x600?text=News+3"
                                alt="News 3"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div class="flex flex-col py-2 pr-2 justify-center">
                            <span
                                class="text-primary text-xs font-bold uppercase tracking-wider mb-2"
                                >Academics</span
                            >
                            <h4
                                class="font-bold text-foreground mb-2 line-clamp-2 text-base group-hover:text-primary transition-colors"
                            >
                                Midterm Permit Release
                            </h4>
                            <span class="text-xs text-muted-foreground mt-auto flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    class="mr-1.5"
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
                                Jan 28 - 30
                            </span>
                        </div>
                    </div>

                    <button
                        class="md:hidden flex items-center justify-center gap-2 text-primary font-medium p-4 border border-border rounded-xl mt-2 w-full active:scale-95 transition-transform"
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
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Hero slide text transition */
.hero-text-enter-active {
    transition:
        opacity 0.7s ease,
        transform 0.7s ease;
}
.hero-text-leave-active {
    transition:
        opacity 0.35s ease,
        transform 0.35s ease;
    position: absolute;
}
.hero-text-enter-from {
    opacity: 0;
    transform: translateY(24px);
}
.hero-text-leave-to {
    opacity: 0;
    transform: translateY(-12px);
}

.animate-fly-s {
    animation: flyS 1.2s cubic-bezier(0.4, 0, 0.2, 1) 6s forwards;
}
.animate-fly-f {
    animation: flyF 1.2s cubic-bezier(0.4, 0, 0.2, 1) 7s forwards;
}
.animate-fly-x {
    animation: flyX 1.2s cubic-bezier(0.4, 0, 0.2, 1) 8s forwards;
}
.animate-fly-c {
    animation: flyC 1.2s cubic-bezier(0.4, 0, 0.2, 1) 9s forwards;
}

@keyframes flyS {
    0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 1;
        filter: blur(0px);
    }
    50% {
        transform: translate(calc(var(--dx-s) * 0.5), calc(var(--dy-s) * 0.5 - 30px)) scale(1.5)
            rotate(-15deg);
        opacity: 1;
        filter: blur(1px);
    }
    99% {
        transform: translate(var(--dx-s), var(--dy-s)) scale(1.125) rotate(0deg);
        opacity: 1;
        filter: blur(0px);
    }
    100% {
        transform: translate(var(--dx-s), var(--dy-s)) scale(1.125) rotate(0deg);
        opacity: 0;
        filter: blur(0px);
    }
}
@keyframes flyF {
    0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 1;
        filter: blur(0px);
    }
    50% {
        transform: translate(calc(var(--dx-f) * 0.5), calc(var(--dy-f) * 0.5 - 30px)) scale(1.5)
            rotate(15deg);
        opacity: 1;
        filter: blur(1px);
    }
    99% {
        transform: translate(var(--dx-f), var(--dy-f)) scale(1.125) rotate(0deg);
        opacity: 1;
        filter: blur(0px);
    }
    100% {
        transform: translate(var(--dx-f), var(--dy-f)) scale(1.125) rotate(0deg);
        opacity: 0;
        filter: blur(0px);
    }
}
@keyframes flyX {
    0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 1;
        filter: blur(0px);
    }
    50% {
        transform: translate(calc(var(--dx-x) * 0.5), calc(var(--dy-x) * 0.5 - 30px)) scale(1.5)
            rotate(-15deg);
        opacity: 1;
        filter: blur(1px);
    }
    99% {
        transform: translate(var(--dx-x), var(--dy-x)) scale(1.125) rotate(0deg);
        opacity: 1;
        filter: blur(0px);
    }
    100% {
        transform: translate(var(--dx-x), var(--dy-x)) scale(1.125) rotate(0deg);
        opacity: 0;
        filter: blur(0px);
    }
}
@keyframes flyC {
    0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 1;
        filter: blur(0px);
    }
    50% {
        transform: translate(calc(var(--dx-c) * 0.5), calc(var(--dy-c) * 0.5 - 30px)) scale(1.5)
            rotate(15deg);
        opacity: 1;
        filter: blur(1px);
    }
    99% {
        transform: translate(var(--dx-c), var(--dy-c)) scale(1.125) rotate(0deg);
        opacity: 1;
        filter: blur(0px);
    }
    100% {
        transform: translate(var(--dx-c), var(--dy-c)) scale(1.125) rotate(0deg);
        opacity: 0;
        filter: blur(0px);
    }
}

.animate-show-letter-s {
    animation: showLetter 0.1s forwards;
    animation-delay: 6.9s;
}
.animate-show-letter-f {
    animation: showLetter 0.1s forwards;
    animation-delay: 7.9s;
}
.animate-show-letter-x {
    animation: showLetter 0.1s forwards;
    animation-delay: 8.9s;
}
.animate-show-letter-c {
    animation: showLetter 0.1s forwards;
    animation-delay: 9.9s;
}

@keyframes showLetter {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.animate-reveal-text-s {
    animation: revealText 0.8s ease-out forwards;
    animation-delay: 6.9s;
}
.animate-reveal-text-f {
    animation: revealText 0.8s ease-out forwards;
    animation-delay: 7.9s;
}
.animate-reveal-text-x {
    animation: revealText 0.8s ease-out forwards;
    animation-delay: 8.9s;
}
.animate-reveal-text-c {
    animation: revealText 0.8s ease-out forwards;
    animation-delay: 9.9s;
}

@keyframes revealText {
    0% {
        opacity: 0;
        filter: blur(8px);
        transform: translateX(-10px);
    }
    100% {
        opacity: 1;
        filter: blur(0);
        transform: translateX(0);
    }
}
</style>
