<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
import { PageFlip } from 'page-flip'
import { ChevronLeft, ChevronRight, Download, Loader2, Maximize, Minimize } from 'lucide-vue-next'
import studentGuidePdf from '@/assets/pdf/StudentGuideAY2526.pdf'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).href

const bookEl = ref<HTMLDivElement | null>(null)
const wrapperEl = ref<HTMLDivElement | null>(null)
const fullscreenEl = ref<HTMLDivElement | null>(null)
const isLoading = ref(true)
const loadingProgress = ref(0)
const currentPage = ref(1)
const totalPages = ref(0)
const renderedImages = ref<string[]>([])
const isFullscreen = ref(false)

let flipBook: PageFlip | null = null

async function renderPdf() {
    const loadingTask = pdfjsLib.getDocument(studentGuidePdf)
    const pdf = await loadingTask.promise

    const images: string[] = []
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        // Rotate 270° (counter-clockwise) to fix the clockwise-rotated PDF
        const viewport = page.getViewport({ scale: 3.0, rotation: 270 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        await page.render({ canvas, viewport }).promise

        // Split the rotated page into left and right halves (2-column → 2 book pages)
        const halfW = Math.floor(canvas.width / 2)
        const h = canvas.height

        const leftCanvas = document.createElement('canvas')
        leftCanvas.width = halfW
        leftCanvas.height = h
        leftCanvas.getContext('2d')!.drawImage(canvas, 0, 0, halfW, h, 0, 0, halfW, h)
        images.push(leftCanvas.toDataURL('image/webp', 0.98))

        const rightCanvas = document.createElement('canvas')
        rightCanvas.width = halfW
        rightCanvas.height = h
        rightCanvas.getContext('2d')!.drawImage(canvas, halfW, 0, halfW, h, 0, 0, halfW, h)
        images.push(rightCanvas.toDataURL('image/webp', 0.98))

        loadingProgress.value = Math.round((i / pdf.numPages) * 100)
    }

    // Skip the first two pages (blank white from the first PDF page)
    const trimmed = images.slice(1)
    totalPages.value = trimmed.length
    renderedImages.value = trimmed
    isLoading.value = false
    await nextTick()
    initPageFlip(trimmed)
}

function getPageDimensions() {
    const container = isFullscreen.value ? fullscreenEl.value : wrapperEl.value
    const containerWidth = container?.clientWidth ?? window.innerWidth
    const containerHeight = isFullscreen.value
        ? (fullscreenEl.value?.clientHeight ?? window.innerHeight) - 100
        : 0
    const isMobile = containerWidth < 640
    const availWidth = containerWidth - (isMobile ? 16 : 80)
    let pageW = Math.floor(isMobile ? availWidth : availWidth / 2)
    let pageH = Math.round(pageW * 1.414)

    if (isFullscreen.value && containerHeight > 0 && pageH > containerHeight) {
        pageH = containerHeight
        pageW = Math.round(pageH / 1.414)
    }

    return { pageW, pageH, isMobile }
}

function initPageFlip(images: string[]) {
    if (!bookEl.value) return
    const { pageW, pageH, isMobile } = getPageDimensions()

    if (pageW <= 0 || pageH <= 0) return

    if (flipBook) {
        flipBook.destroy()
        flipBook = null
    }

    // Clear any leftover DOM from the previous instance
    bookEl.value.innerHTML = ''

    flipBook = new PageFlip(bookEl.value, {
        width: pageW,
        height: pageH,
        size: 'fixed',
        maxShadowOpacity: 0.35,
        showCover: true,
        mobileScrollSupport: false,
        useMouseEvents: true,
        swipeDistance: 30,
        flippingTime: 650,
        usePortrait: isMobile,
        startZIndex: 0,
        drawShadow: true,
        autoSize: false,
        clickEventForward: true,
    } as ConstructorParameters<typeof PageFlip>[1])

    flipBook.loadFromImages(images)

    flipBook.on('flip', (e: any) => {
        currentPage.value = (e.data as number) + 1
    })
}

function prevPage() {
    flipBook?.flipPrev('top' as any)
}
function nextPage() {
    flipBook?.flipNext('top' as any)
}

function downloadPdf() {
    const a = document.createElement('a')
    a.href = studentGuidePdf
    a.download = 'SFXC-Student-Guide-AY2526.pdf'
    a.click()
}

async function toggleFullscreen() {
    if (!fullscreenEl.value) return

    if (!document.fullscreenElement) {
        await fullscreenEl.value.requestFullscreen()
    } else {
        await document.exitFullscreen()
    }
}

function onFullscreenChange() {
    isFullscreen.value = !!document.fullscreenElement
    setTimeout(() => {
        if (renderedImages.value.length > 0) {
            // initPageFlip(renderedImages.value)
        }
    }, 350)
}

let resizeTimer: ReturnType<typeof setTimeout>
function handleResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
        if (renderedImages.value.length > 0) {
            // initPageFlip(renderedImages.value)
        }
    }, 300)
}

onMounted(() => {
    renderPdf()
    window.addEventListener('resize', handleResize)
    document.addEventListener('fullscreenchange', onFullscreenChange)
})

onBeforeUnmount(() => {
    flipBook?.destroy()
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    clearTimeout(resizeTimer)
})
</script>

<template>
    <!-- Hero -->
    <section class="relative h-[75dvh] overflow-hidden">
        <img
            src="/src/assets/images/sfxc-building.jpg"
            alt="SFXC Building"
            class="absolute inset-0 w-full h-full object-cover"
        />
        <div
            class="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10 z-1"
        ></div>
        <div
            class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent z-1"
        ></div>
        <div
            class="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-primary/25 to-transparent z-1"
        ></div>
        <div class="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
            <div class="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-16 pb-12 md:pb-16">
                <div class="hidden md:flex items-center gap-4 mb-6">
                    <div class="w-10 h-0.5 bg-primary"></div>
                    <span class="text-white/50 text-xs font-medium uppercase tracking-[0.3em]"
                        >St. Francis Xavier College</span
                    >
                </div>
                <h1
                    class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    Student Guide
                </h1>
                <p class="text-base md:text-lg text-white/60 max-w-xl leading-relaxed">
                    Your complete academic and campus life handbook for AY 2025–2026.
                </p>
            </div>
        </div>
    </section>

    <!-- Book Viewer -->
    <div class="min-h-screen bg-background pb-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <!-- Section label + download -->
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                <div>
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                            >Student Resources</span
                        >
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-foreground">Student Handbook</h2>
                    <p class="text-muted-foreground mt-2">
                        Read online or download a copy for offline reference.
                    </p>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button
                        @click="downloadPdf"
                        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-accent text-sm font-medium text-foreground transition-colors duration-200 cursor-pointer"
                    >
                        <Download class="w-4 h-4" />
                        Download PDF
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex flex-col items-center justify-center py-32 gap-6">
                <Loader2 class="w-10 h-10 text-primary animate-spin" />
                <div class="text-center">
                    <p class="text-foreground font-medium mb-3">Loading Student Guide…</p>
                    <div class="w-64 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                            class="h-full bg-primary rounded-full transition-all duration-300"
                            :style="{ width: `${loadingProgress}%` }"
                        ></div>
                    </div>
                    <p class="text-xs text-muted-foreground mt-2">{{ loadingProgress }}%</p>
                </div>
            </div>

            <!-- Fullscreen Wrapper -->
            <div
                v-else
                ref="fullscreenEl"
                class="flex flex-col items-center"
                :class="isFullscreen ? 'justify-center bg-background h-screen w-screen p-4' : ''"
            >
                <!-- Fullscreen toolbar -->
                <div
                    v-if="isFullscreen"
                    class="absolute top-4 right-4 z-50 flex items-center gap-2"
                >
                    <button
                        @click="downloadPdf"
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background/90 backdrop-blur-sm hover:bg-accent text-sm font-medium text-foreground transition-colors duration-200 cursor-pointer shadow-sm"
                    >
                        <Download class="w-4 h-4" />
                        Download
                    </button>
                    <button
                        @click="toggleFullscreen"
                        class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background/90 backdrop-blur-sm hover:bg-accent text-foreground transition-colors duration-200 cursor-pointer shadow-sm"
                        aria-label="Exit fullscreen"
                    >
                        <Minimize class="w-4 h-4" />
                    </button>
                </div>

                <!-- Book + Controls -->
                <div ref="wrapperEl" class="flex flex-col items-center gap-6 w-full">
                    <!-- Book Container -->
                    <div class="relative flex items-center justify-center w-full">
                        <!-- Prev Button -->
                        <button
                            @click="prevPage"
                            :disabled="currentPage <= 1"
                            class="hidden sm:flex absolute left-0 z-10 items-center justify-center w-10 h-10 rounded-full border border-border bg-background hover:bg-accent text-foreground transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                            aria-label="Previous page"
                        >
                            <ChevronLeft class="w-5 h-5" />
                        </button>

                        <!-- Book -->
                        <div
                            class="relative overflow-visible py-4"
                            :style="{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))' }"
                        >
                            <div ref="bookEl"></div>
                        </div>

                        <!-- Next Button -->
                        <button
                            @click="nextPage"
                            :disabled="currentPage >= totalPages"
                            class="hidden sm:flex absolute right-0 z-10 items-center justify-center w-10 h-10 rounded-full border border-border bg-background hover:bg-accent text-foreground transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                            aria-label="Next page"
                        >
                            <ChevronRight class="w-5 h-5" />
                        </button>
                    </div>

                    <!-- Bottom controls bar -->
                    <div class="flex items-center gap-4">
                        <button
                            @click="prevPage"
                            :disabled="currentPage <= 1"
                            class="sm:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background hover:bg-accent text-foreground transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Previous page"
                        >
                            <ChevronLeft class="w-5 h-5" />
                        </button>

                        <p class="text-sm text-muted-foreground tabular-nums">
                            Page
                            <span class="font-semibold text-foreground"
                                >{{ currentPage }} - {{ currentPage + 1 }}</span
                            >
                            of
                            <span class="font-semibold text-foreground">{{ totalPages }}</span>
                        </p>

                        <button
                            @click="nextPage"
                            :disabled="currentPage >= totalPages"
                            class="sm:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background hover:bg-accent text-foreground transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Next page"
                        >
                            <ChevronRight class="w-5 h-5" />
                        </button>

                        <button
                            v-if="!isFullscreen"
                            @click="toggleFullscreen"
                            class="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
                            aria-label="Enter fullscreen"
                        >
                            <Maximize class="w-3.5 h-3.5" />
                            <span class="hidden sm:inline text-xs">Fullscreen</span>
                        </button>
                    </div>

                    <!-- Usage hint -->
                    <p class="text-xs text-muted-foreground text-center">
                        Click the page edges or use the arrows to flip pages. Drag to turn.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Ensure page-flip canvas/img elements don't bleed outside */
:deep(.stf__parent) {
    overflow: visible !important;
}
:deep(.stf__block) {
    border-radius: 2px;
}
</style>
