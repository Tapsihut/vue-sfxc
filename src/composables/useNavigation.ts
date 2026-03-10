import { ref, onMounted, onUnmounted } from 'vue'

export function useNavigation() {
    const isScrolled = ref(false)
    const isMobileMenuOpen = ref(false)

    const onScroll = () => {
        isScrolled.value = window.scrollY > 20
    }

    onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
    onUnmounted(() => window.removeEventListener('scroll', onScroll))

    const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    return { isScrolled, isMobileMenuOpen, toggleMobileMenu }
}
