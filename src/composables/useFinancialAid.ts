import { ref, computed } from 'vue'
import { financialAids } from '@/data/financialAids'
import type { RequirementNode } from '@/data/financialAids'

export { type RequirementNode }

export const parseRequirements = (reqs: string[]): RequirementNode[] => {
    return reqs.map((req) => {
        const lines = req.split('\n').filter((line) => line.trim() !== '')
        if (lines.length > 1) {
            return {
                text: lines[0]?.trim() ?? '',
                subItems: lines.slice(1).map((line) => line.trim()),
            }
        }
        return { text: req.trim() }
    })
}

export const useFinancialAid = () => {
    const chedPrograms = computed(() =>
        financialAids.filter((p) => p.name.includes('TES') || p.name.includes('CHED')),
    )

    const otherGovPrograms = computed(() =>
        financialAids.filter((p) => !p.name.includes('TES') && !p.name.includes('CHED')),
    )

    return { chedPrograms, otherGovPrograms }
}
