import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { programs, colleges } from '@/data/academicPrograms'
import type { Program } from '@/data/academicPrograms'

export function usePrograms() {
    const router = useRouter()

    const selectedCollege = ref<string | null>(null)
    const programsSection = ref<HTMLElement | null>(null)

    const filteredPrograms = computed<Program[]>(() => {
        if (!selectedCollege.value) return []
        return programs.filter((p) => p.department === selectedCollege.value)
    })

    const selectedCollegeName = computed<string | undefined>(() => {
        return colleges.find((c) => c.code === selectedCollege.value)?.name
    })

    function selectCollege(collegeCode: string) {
        const wasSame = selectedCollege.value === collegeCode
        selectedCollege.value = wasSame ? null : collegeCode

        if (!wasSame && window.innerWidth < 768) {
            setTimeout(() => {
                programsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }

    function navigateToProgram(program: Program) {
        if (program.routeName) {
            router.push({ name: program.routeName })
        }
    }

    return {
        selectedCollege,
        programsSection,
        filteredPrograms,
        selectedCollegeName,
        selectCollege,
        navigateToProgram,
    }
}
