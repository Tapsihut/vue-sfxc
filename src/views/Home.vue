<script setup lang="ts">
import { ref } from 'vue'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { heroSlides } from '@/data/heroSlides'
import { programs } from '@/data/programs'
import { homeStats } from '@/data/homeStats'
import { featuredNews, miniNewsItems } from '@/data/homeNews'
import { useHeroCarousel } from '@/composables/useHeroCarousel'
import { useMottoAnimation } from '@/composables/useMottoAnimation'
import { useScrollY } from '@/composables/useScrollY'
import ProgramBentoCard from '@/components/ui/custom/ProgramBentoCard.vue'
import StatCard from '@/components/ui/custom/StatCard.vue'
import MiniNewsCard from '@/components/ui/custom/MiniNewsCard.vue'

const {
    api: carouselApi,
    current,
    autoplay,
    currentSlide,
    isDefaultSlide,
    slideCounter,
    setApi,
    goToSlide,
} = useHeroCarousel()

const { scrollY } = useScrollY()

// Template refs for mobile motto letter fly animation
const startSRef = ref<HTMLElement | null>(null)
const startFRef = ref<HTMLElement | null>(null)
const startXRef = ref<HTMLElement | null>(null)
const startCRef = ref<HTMLElement | null>(null)
const endSRef = ref<HTMLElement | null>(null)
const endFRef = ref<HTMLElement | null>(null)
const endXRef = ref<HTMLElement | null>(null)
const endCRef = ref<HTMLElement | null>(null)

useMottoAnimation(startSRef, startFRef, startXRef, startCRef, endSRef, endFRef, endXRef, endCRef)

// Hero text enter/leave animation using the Web Animations API (JS-based, no CSS)
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
    <section id="home" class="relative w-full">
        <Carousel
            class="relative w-full h-[92dvh] overflow-hidden"
            :plugins="[autoplay]"
            @init-api="setApi"
            @mouseenter="autoplay.stop"
            @mouseLeave="[autoplay.reset(), autoplay.play()]"
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

                    <Transition :css="false" @enter="onHeroEnter" @leave="onHeroLeave">
                        <div :key="current" class="max-w-2xl pointer-events-auto">
                            <!-- Slide 1 (no title): institutional branding display -->
                            <template v-if="isDefaultSlide">
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
                                    {{ currentSlide?.title }}
                                </h1>
                                <p
                                    class="text-base md:text-lg text-white/70 mb-8 max-w-md leading-relaxed"
                                >
                                    {{ currentSlide?.description }}
                                </p>
                                <div
                                    v-if="currentSlide?.buttons?.length"
                                    class="flex flex-col sm:flex-row gap-3"
                                >
                                    <a
                                        v-for="btn in currentSlide?.buttons"
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
                            {{ slideCounter }}
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
            <div class="relative w-full flex justify-center">
                <!-- Animated Words -->
                <h2
                    class="text-base font-bold text-white text-center tracking-widest flex flex-col justify-center gap-y-2 uppercase drop-shadow-lg"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { delay: 500, duration: 1500, type: 'tween' },
                        }"
                        ><span ref="startSRef" class="inline-block origin-center">S</span
                        ><span
                            v-motion
                            :initial="{ opacity: 1 }"
                            :enter="{
                                opacity: 0,
                                transition: { delay: 5500, duration: 500, type: 'tween' },
                            }"
                            class="inline-block"
                            >ervice.</span
                        ></span
                    >
                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { delay: 1500, duration: 1500, type: 'tween' },
                        }"
                        ><span ref="startFRef" class="inline-block origin-center">F</span
                        ><span
                            v-motion
                            :initial="{ opacity: 1 }"
                            :enter="{
                                opacity: 0,
                                transition: { delay: 5500, duration: 500, type: 'tween' },
                            }"
                            class="inline-block"
                            >ortitude.</span
                        ></span
                    >
                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { delay: 2500, duration: 1500, type: 'tween' },
                        }"
                        ><span
                            v-motion
                            :initial="{ opacity: 1 }"
                            :enter="{
                                opacity: 0,
                                transition: { delay: 5500, duration: 500, type: 'tween' },
                            }"
                            class="inline-block"
                            >E</span
                        ><span ref="startXRef" class="inline-block origin-center">x</span
                        ><span
                            v-motion
                            :initial="{ opacity: 1 }"
                            :enter="{
                                opacity: 0,
                                transition: { delay: 5500, duration: 500, type: 'tween' },
                            }"
                            class="inline-block"
                            >cellence.</span
                        ></span
                    >
                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { delay: 3500, duration: 1500, type: 'tween' },
                        }"
                        ><span ref="startCRef" class="inline-block origin-center">C</span
                        ><span
                            v-motion
                            :initial="{ opacity: 1 }"
                            :enter="{
                                opacity: 0,
                                transition: { delay: 5500, duration: 500, type: 'tween' },
                            }"
                            class="inline-block"
                            >hrist-centeredness.</span
                        ></span
                    >
                </h2>
                <!-- Final Text -->
                <h2
                    class="absolute top-[75%] -translate-y-1/2 text-lg whitespace-nowrap font-bold text-white text-center tracking-widest uppercase drop-shadow-lg"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    <span
                        ref="endSRef"
                        v-motion
                        :initial="{ opacity: 0 }"
                        :enter="{
                            opacity: 1,
                            transition: { delay: 6900, duration: 100, type: 'tween' },
                        }"
                        >S</span
                    ><span
                        v-motion
                        :initial="{ opacity: 0, x: -10, filter: 'blur(8px)' }"
                        :enter="{
                            opacity: 1,
                            x: 0,
                            filter: 'blur(0px)',
                            transition: { delay: 6900, duration: 800, type: 'tween' },
                        }"
                        >t.
                    </span>
                    <span
                        ref="endFRef"
                        v-motion
                        :initial="{ opacity: 0 }"
                        :enter="{
                            opacity: 1,
                            transition: { delay: 7900, duration: 100, type: 'tween' },
                        }"
                        >F</span
                    ><span
                        v-motion
                        :initial="{ opacity: 0, x: -10, filter: 'blur(8px)' }"
                        :enter="{
                            opacity: 1,
                            x: 0,
                            filter: 'blur(0px)',
                            transition: { delay: 7900, duration: 800, type: 'tween' },
                        }"
                        >rancis
                    </span>
                    <span
                        ref="endXRef"
                        v-motion
                        :initial="{ opacity: 0 }"
                        :enter="{
                            opacity: 1,
                            transition: { delay: 8900, duration: 100, type: 'tween' },
                        }"
                        >X</span
                    ><span
                        v-motion
                        :initial="{ opacity: 0, x: -10, filter: 'blur(8px)' }"
                        :enter="{
                            opacity: 1,
                            x: 0,
                            filter: 'blur(0px)',
                            transition: { delay: 8900, duration: 800, type: 'tween' },
                        }"
                        >avier
                    </span>
                    <span
                        ref="endCRef"
                        v-motion
                        :initial="{ opacity: 0 }"
                        :enter="{
                            opacity: 1,
                            transition: { delay: 9900, duration: 100, type: 'tween' },
                        }"
                        >C</span
                    ><span
                        v-motion
                        :initial="{ opacity: 0, x: -10, filter: 'blur(8px)' }"
                        :enter="{
                            opacity: 1,
                            x: 0,
                            filter: 'blur(0px)',
                            transition: { delay: 9900, duration: 800, type: 'tween' },
                        }"
                        >ollege</span
                    >
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
                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { delay: 500, duration: 1500, type: 'tween' },
                        }"
                        >Service.</span
                    >
                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { delay: 2000, duration: 1500, type: 'tween' },
                        }"
                        >Fortitude.</span
                    >
                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { delay: 3500, duration: 1500, type: 'tween' },
                        }"
                        >eXcellence.</span
                    >
                    <span
                        v-motion
                        :initial="{ opacity: 0, y: 10, scale: 0.95 }"
                        :enter="{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { delay: 4500, duration: 1500, type: 'tween' },
                        }"
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

        <div class="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                <!-- Text Content: Asymmetrical layout spanning 5 columns -->
                <div class="lg:col-span-5 order-2 lg:order-1 relative z-10">
                    <div
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 700, type: 'tween', ease: 'easeOut' },
                        }"
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6"
                    >
                        <span class="w-2 h-2 rounded-full bg-primary"></span>
                        Our Heritage
                    </div>

                    <h3
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
                        class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-foreground leading-[1.1] tracking-tight"
                    >
                        St. Francis<br />
                        <span class="text-primary italic font-serif font-light"
                            >Xavier College</span
                        >
                    </h3>

                    <div
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 200,
                                duration: 700,
                                type: 'tween',
                                ease: 'easeOut',
                            },
                        }"
                        class="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed relative before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary/50 before:to-transparent pl-6"
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
                    v-motion
                    :initial="{ opacity: 0, x: 32 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 300, duration: 1000, type: 'tween', ease: 'easeOut' },
                    }"
                    class="lg:col-span-7 order-1 lg:order-2 relative lg:h-150 w-full"
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
            <div class="flex flex-col md:flex-row justify-between items-end mb-16">
                <div class="max-w-xl">
                    <h3
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 700, type: 'tween', ease: 'easeOut' },
                        }"
                        class="text-3xl md:text-5xl font-bold mb-4 text-foreground"
                    >
                        Areas of Study
                    </h3>
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
                        class="text-muted-foreground text-lg"
                    >
                        Discover your passion across our diverse range of undergraduate programs
                        designed for the future.
                    </p>
                </div>
                <button
                    v-motion
                    :initial="{ opacity: 0, x: 16 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 200, duration: 700, type: 'tween', ease: 'easeOut' },
                    }"
                    class="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-4 pb-2 mt-4"
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
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[250px]"
            >
                <ProgramBentoCard
                    v-for="(program, index) in programs.slice(0, 5)"
                    :key="program.id"
                    :program="program"
                    :index="index"
                />

                <!-- CTA Card -->
                <div
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 500, duration: 700, type: 'tween', ease: 'easeOut' },
                    }"
                    class="group relative overflow-hidden rounded-3xl bg-primary flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-primary/90 transition-all"
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
    <section id="schoolImage" class="relative py-24 sm:py-32 overflow-hidden">
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
                <StatCard
                    v-for="(stat, i) in homeStats"
                    :key="stat.label"
                    :stat="stat"
                    :delay="i * 100"
                />
            </div>
        </div>
    </section>

    <!-- News and Announcements Section -->
    <section id="news" class="py-20 md:py-28 bg-background relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex flex-col md:flex-row justify-between items-start mb-12">
                <div class="max-w-xl">
                    <div
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 700, type: 'tween', ease: 'easeOut' },
                        }"
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-semibold mb-4"
                    >
                        <span class="w-2 h-2 rounded-full bg-secondary-foreground"></span>
                        Stay Updated
                    </div>
                    <h2
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
                        class="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        News & Events
                    </h2>
                </div>
                <button
                    v-motion
                    :initial="{ opacity: 0, x: 16 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 200, duration: 700, type: 'tween', ease: 'easeOut' },
                    }"
                    class="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-4 pb-2"
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
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 200, duration: 700, type: 'tween', ease: 'easeOut' },
                    }"
                    class="lg:col-span-7 group relative overflow-hidden rounded-3xl shadow-md hover:shadow-xl"
                >
                    <div class="aspect-4/3 lg:aspect-auto lg:h-125 overflow-hidden">
                        <img
                            :src="featuredNews.image"
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
                                >{{ featuredNews.badge }}</span
                            >
                            <h3
                                class="text-2xl md:text-3xl font-bold mb-3 text-foreground leading-tight group-hover:text-primary transition-colors duration-300"
                            >
                                {{ featuredNews.title }}
                            </h3>
                            <p class="text-base text-muted-foreground mb-4 line-clamp-2 max-w-xl">
                                {{ featuredNews.description }}
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
                                {{ featuredNews.date }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mini News Stack -->
                <div
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 300, duration: 700, type: 'tween', ease: 'easeOut' },
                    }"
                    class="lg:col-span-5 flex flex-col gap-4"
                >
                    <MiniNewsCard v-for="item in miniNewsItems" :key="item.id" :item="item" />

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
