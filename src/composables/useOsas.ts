import { computed } from 'vue'
import {
    services,
    programs,
    organizations,
    supportSections,
    type OsasOrganization,
    type OsasProgramCard,
    type OsasSupportSection,
} from '@/data/osasData'

export type { OsasOrganization, OsasProgramCard, OsasSupportSection }

export function useOsas() {
    const academicYear = computed(() => {
        const year = new Date().getFullYear()
        return `${year - 1}–${String(year).slice(-2)}`
    })

    function scrollTo(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return {
        services,
        programs,
        organizations,
        supportSections,
        academicYear,
        scrollTo,
    }
}
