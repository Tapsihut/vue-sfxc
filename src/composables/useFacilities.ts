import { ref } from 'vue'
import { facilities } from '@/data/facilities'
import type { Facility } from '@/data/facilities'

export function useFacilities() {
    const activeFacility = ref<Facility>(facilities[0]!)
    const targetSection = ref<HTMLElement | null>(null)

    const setActive = (facility: Facility) => {
        activeFacility.value = facility
    }

    const scrollToSection = (facility: Facility) => {
        setActive(facility)
        targetSection.value?.scrollIntoView({ behavior: 'smooth' })
    }

    return { facilities, activeFacility, targetSection, setActive, scrollToSection }
}
