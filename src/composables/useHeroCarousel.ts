import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Autoplay from 'embla-carousel-autoplay'
import type { CarouselApi } from '@/components/ui/carousel'
import apiClient from '@/services/api'

interface HeroSlide {
    id: number | string
    title: string
    description: string
    image: string
    buttons: { text: string; href: string }[]
}

interface ApiHeroSlide {
    id: number
    title: string
    description?: string | null
    image_path?: string | null
    image_url?: string | null
    button_text?: string | null
    button_link?: string | null
    is_active?: boolean | number | string
}

export function useHeroCarousel() {
    const api = ref<CarouselApi>()
    const current = ref(0)
    const slides = ref<HeroSlide[]>([])
    const loading = ref(true)
    const error = ref<string | null>(null)

    const autoplay = Autoplay({
        delay: 6000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
    })

    let removeApiListeners: (() => void) | null = null

    const currentSlide = computed(() => slides.value[current.value])

    const showFallback = computed(
        () => !loading.value && slides.value.length === 0,
    )

    const showIndicators = computed(() => slides.value.length > 1)

    const slideCounter = computed(() => {
        const total = slides.value.length

        if (total === 0) return '00 / 00'

        return `${String(current.value + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
    })

    async function loadSlides() {
        loading.value = true
        error.value = null

        try {
            const response = await apiClient.get<
                ApiHeroSlide[] | { data: ApiHeroSlide[] }
            >('/api/v1/public/hero-slides')

            const responseData = response.data
            const apiSlides = Array.isArray(responseData)
                ? responseData
                : responseData.data

            slides.value = apiSlides
                .filter((slide) => {
                    return (
                        slide.is_active === true ||
                        slide.is_active === 1 ||
                        slide.is_active === '1'
                    )
                })
                .filter((slide) => Boolean(slide.image_url || slide.image_path))
                .map((slide) => {
                    const baseUrl = String(
                        apiClient.defaults.baseURL ?? '',
                    ).replace(/\/$/, '')

                    const image =
                        slide.image_url ||
                        (slide.image_path
                            ? `${baseUrl}/storage/${slide.image_path.replace(/^\/+/, '')}`
                            : '')

                    return {
                        id: slide.id,
                        title: slide.title,
                        description: slide.description ?? '',
                        image,
                        buttons: slide.button_text
                            ? [
                                  {
                                      text: slide.button_text,
                                      href: slide.button_link || '#',
                                  },
                              ]
                            : [],
                    }
                })
                .filter((slide) => Boolean(slide.image))

            current.value = 0
        } catch (err) {
            console.error('Failed to load homepage hero slides:', err)
            error.value = 'Unable to load the latest hero slides.'
            slides.value = []
        } finally {
            loading.value = false
        }
    }

    function setApi(newApi: CarouselApi) {
        removeApiListeners?.()
        removeApiListeners = null

        api.value = newApi

        if (!newApi) return

        const update = () => {
            current.value = newApi.selectedScrollSnap()
        }

        update()

        newApi.on('select', update)
        newApi.on('reInit', update)

        removeApiListeners = () => {
            newApi.off('select', update)
            newApi.off('reInit', update)
        }
    }

    function goToSlide(index: number) {
        if (index < 0 || index >= slides.value.length) return
        api.value?.scrollTo(index)
    }

    onMounted(() => {
        void loadSlides()
    })

    onBeforeUnmount(() => {
        removeApiListeners?.()
        removeApiListeners = null
        api.value = undefined
    })

    return {
        api,
        current,
        autoplay,
        currentSlide,
        slideCounter,
        slides,
        loading,
        error,
        showFallback,
        showIndicators,
        setApi,
        goToSlide,
        loadSlides,
    }
}
