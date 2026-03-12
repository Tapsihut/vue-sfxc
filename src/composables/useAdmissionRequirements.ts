import { ref, computed } from 'vue'
import {
    programs,
    freshmenRequirements,
    transfereeRequirements,
    crossEnrolleeRequirements,
    internationalRequirements,
} from '@/data/admissionRequirements'

type StudentType = 'freshmen' | 'transferee' | 'cross-enrollee' | 'international'

export const useAdmissionRequirements = () => {
    const selectedStudentType = ref<StudentType>('freshmen')
    const selectedProgram = ref<string>('abel')
    const expandedCourses = ref<Record<string, boolean>>({})

    const toggleCourse = (programId: string, courseIndex: number) => {
        const key = `${programId}-${courseIndex}`
        expandedCourses.value[key] = !expandedCourses.value[key]
    }

    const currentRequirements = computed(() => {
        if (selectedStudentType.value === 'international') return internationalRequirements
        if (selectedStudentType.value === 'cross-enrollee') return crossEnrolleeRequirements
        return selectedStudentType.value === 'freshmen'
            ? freshmenRequirements
            : transfereeRequirements
    })

    const requirementsTitle = computed(() => {
        const map: Record<StudentType, string> = {
            freshmen: 'Freshmen Requirements',
            transferee: 'Transferee Requirements',
            'cross-enrollee': 'Cross-Enrollee Requirements',
            international: 'International Requirements',
        }
        return map[selectedStudentType.value]
    })

    const requirementsSubtitle = computed(() => {
        const map: Record<StudentType, string> = {
            freshmen: 'For new students applying to SFXC',
            transferee: 'For students transferring from other institutions',
            'cross-enrollee': 'For students from other schools who wish to cross-enroll at SFXC',
            international: 'For international students applying to SFXC',
        }
        return map[selectedStudentType.value]
    })

    return {
        programs,
        selectedStudentType,
        selectedProgram,
        expandedCourses,
        toggleCourse,
        currentRequirements,
        requirementsTitle,
        requirementsSubtitle,
    }
}
