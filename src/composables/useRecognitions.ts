import { ref, computed } from 'vue'
import { recognitions } from '@/data/recognitions'

export function useRecognitions() {
    const categories = ['All', ...new Set(recognitions.map((r) => r.category))]
    const searchQuery = ref('')
    const activeCategory = ref('All')

    const filteredRecognitions = computed(() => {
        const query = searchQuery.value.toLowerCase().trim()
        return recognitions.filter((recognition) => {
            const matchesCategory =
                activeCategory.value === 'All' || recognition.category === activeCategory.value
            const matchesSearch =
                !query ||
                recognition.title.toLowerCase().includes(query) ||
                recognition.organization.toLowerCase().includes(query) ||
                recognition.badge.toLowerCase().includes(query)
            return matchesCategory && matchesSearch
        })
    })

    const clear = () => {
        searchQuery.value = ''
        activeCategory.value = 'All'
    }

    return { recognitions, categories, searchQuery, activeCategory, filteredRecognitions, clear }
}
