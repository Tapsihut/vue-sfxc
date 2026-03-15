import type { ProgramSection } from '@/data/iroData'

export type { ProgramSection }

export interface ProgramCoordinator {
    name: string
    role: string
    image: string
    contacts: { label: string; value: string }[]
}

export interface Major {
    name: string
    description: string
    details: ProgramSection[]
}
