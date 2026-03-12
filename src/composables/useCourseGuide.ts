import { ref, computed } from 'vue'
import { interests, courseDatabase } from '@/data/admissionGuide'
import type { CourseRecommendation } from '@/data/admissionGuide'

export const useCourseGuide = () => {
    const selectedInterests = ref<string[]>([])
    const showResults = ref(false)

    const toggleInterest = (interestId: string) => {
        const index = selectedInterests.value.indexOf(interestId)
        if (index > -1) {
            selectedInterests.value.splice(index, 1)
        } else {
            selectedInterests.value.push(interestId)
        }
    }

    const recommendations = computed((): CourseRecommendation[] => {
        if (selectedInterests.value.length === 0) return []

        const courseScores: Record<string, number> = {}
        selectedInterests.value.forEach((interestId) => {
            const interest = interests.find((i) => i.id === interestId)
            if (interest) {
                interest.courses.forEach((courseCode) => {
                    courseScores[courseCode] = (courseScores[courseCode] || 0) + 1
                })
            }
        })

        return Object.entries(courseScores)
            .sort(([, a], [, b]) => b - a)
            .map(([code]) => courseDatabase[code])
            .filter((course): course is CourseRecommendation => course !== undefined)
            .slice(0, 3)
    })

    const handleShowResults = () => {
        if (selectedInterests.value.length > 0) {
            showResults.value = true
        }
    }

    const resetQuiz = () => {
        selectedInterests.value = []
        showResults.value = false
    }

    return {
        interests,
        selectedInterests,
        showResults,
        recommendations,
        toggleInterest,
        handleShowResults,
        resetQuiz,
    }
}
