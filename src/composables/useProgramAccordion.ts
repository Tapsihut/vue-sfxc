import { ref } from 'vue'
import type { Ref } from 'vue'

export function useProgramAccordion() {
    const expanded: Ref<Record<string, boolean>> = ref({})
    const expandedMajors: Ref<Record<string, Record<string, boolean>>> = ref({})

    function toggle(title: string): void {
        expanded.value[title] = !expanded.value[title]
    }

    function toggleMajor(majorName: string, title: string): void {
        if (!expandedMajors.value[majorName]) {
            expandedMajors.value[majorName] = {}
        }
        expandedMajors.value[majorName][title] = !expandedMajors.value[majorName][title]
    }

    function scrollToMajor(name: string): void {
        const id = name.toLowerCase().replace(/\s+/g, '-')
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return { expanded, expandedMajors, toggle, toggleMajor, scrollToMajor }
}
