import { ref, computed } from 'vue'
import Autoplay from 'embla-carousel-autoplay'
import type { CarouselApi } from '@/components/ui/carousel'
import { heroSlides } from '@/data/heroSlides'

export function useHeroCarousel() {
    const api = ref<CarouselApi>()
    const current = ref(0)

    const autoplay = Autoplay({
        delay: 3000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
    })

    const currentSlide = computed(() => heroSlides[current.value])
    const isDefaultSlide = computed(() => !currentSlide.value?.title)
    const slideCounter = computed(
        () =>
            `${String(current.value + 1).padStart(2, '0')} / ${String(heroSlides.length).padStart(2, '0')}`,
    )

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

    return { api, current, autoplay, currentSlide, isDefaultSlide, slideCounter, setApi, goToSlide }
}
