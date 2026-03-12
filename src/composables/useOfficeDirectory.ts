import { ref, computed } from 'vue'
import { offices } from '@/data/officeDirectory'

export function useOfficeDirectory() {
    const departments = ['All', ...new Set(offices.map((o) => o.department))]
    const searchQuery = ref('')
    const activeDept = ref('All')

    const filteredOffices = computed(() => {
        const query = searchQuery.value.toLowerCase().trim()
        return offices.filter((office) => {
            const matchesDept = activeDept.value === 'All' || office.department === activeDept.value
            const matchesSearch =
                !query ||
                office.name.toLowerCase().includes(query) ||
                office.email.toLowerCase().includes(query) ||
                (office.email2 && office.email2.toLowerCase().includes(query))
            return matchesDept && matchesSearch
        })
    })

    return { offices, departments, searchQuery, activeDept, filteredOffices }
}
