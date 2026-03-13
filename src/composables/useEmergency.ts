import { contactGroups } from '@/data/emergencyContacts'
import { procedures } from '@/data/emergencyProcedures'

export type { ContactGroup, Contact } from '@/data/emergencyContacts'
export type { Procedure, ProcedureStep } from '@/data/emergencyProcedures'

export function useEmergency() {
    return { contactGroups, procedures }
}
