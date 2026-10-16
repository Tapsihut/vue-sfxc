import { ref, computed, onMounted, nextTick } from 'vue'
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
        delay: 5000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
    })

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
                .filter(
                    (slide) =>
                        slide.is_active === true ||
                        slide.is_active === 1 ||
                        slide.is_active === '1',
                )
                .filter((slide) =>
                    Boolean(slide.image_url || slide.image_path),
                )
                .map((slide) => ({
                    id: slide.id,
                    title: slide.title,
                    description: slide.description ?? '',
                    image:
                        slide.image_url ??
                        `${String(apiClient.defaults.baseURL).replace(/\/$/, '')}/storage/${slide.image_path}`,
                    buttons: slide.button_text
                        ? [
                              {
                                  text: slide.button_text,
                                  href: slide.button_link || '#',
                              },
                          ]
                        : [],
                }))

            await nextTick()
            api.value?.reInit()
            current.value = api.value?.selectedScrollSnap() ?? 0
        } catch (err) {
            console.error('Failed to load homepage hero slides:', err)
            error.value = 'Unable to load the latest hero slides.'
            slides.value = []
        } finally {
            loading.value = false
        }
    }

    function setApi(newApi: CarouselApi) {
        api.value = newApi
        if (!newApi) return

        current.value = newApi.selectedScrollSnap()

        const update = () => {
            current.value = newApi.selectedScrollSnap()
        }

        newApi.on('select', update)
        newApi.on('reInit', update)
    }

    function goToSlide(index: number) {
        api.value?.scrollTo(index)
    }

    onMounted(() => {
        void loadSlides()
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
