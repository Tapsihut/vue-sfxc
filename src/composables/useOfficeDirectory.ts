import { ref, computed } from 'vue'
import { offices } from '@/data/officeDirectory'

const collegePrograms: Record<string, string[]> = {
    CBE: [
        'BSBA',
        'BSA',
        'BSAIS',
        'BSOA',
        'BSIA',
        'BSMA',
        'BSE',
        'College of Business Education',
    ],
    CICT: [
        'BSIT',
        'College of Information and Communications Technology',
    ],
    CCJE: [
        'BSCRIM',
        'College of Criminal Justice Education',
    ],
    CTE: [
        'BSED',
        'BEED',
        'ABEL',
        'College of Teacher Education',
    ],
}

export function useOfficeDirectory() {
    const departments = [
        'All',
        ...new Set([
            'CBE',
            'CICT',
            'CCJE',
            'CTE',
            ...offices.map((office) => office.department),
        ]),
    ]

    const searchQuery = ref('')
    const activeDept = ref('All')

    const filteredOffices = computed(() => {
        const query = searchQuery.value.toLowerCase().trim()

        return offices.filter((office) => {
            const department = (office.department ?? '').toLowerCase()
            const name = (office.name ?? '').toLowerCase()
            const email = (office.email ?? '').toLowerCase()
            const email2 = (office.email2 ?? '').toLowerCase()

            const programs = collegePrograms[activeDept.value] ?? []

            const matchesDept =
                activeDept.value === 'All' ||
                department === activeDept.value.toLowerCase() ||
                programs.some((program) => {
                    const keyword = program.toLowerCase()

                    return (
                        department.includes(keyword) ||
                        name.includes(keyword)
                    )
                })

            const matchesSearch =
                !query ||
                name.includes(query) ||
                department.includes(query) ||
                email.includes(query) ||
                email2.includes(query)

            return matchesDept && matchesSearch
        })
    })

    return {
        offices,
        departments,
        searchQuery,
        activeDept,
        filteredOffices,
    }
}