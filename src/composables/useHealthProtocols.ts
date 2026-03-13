import { protocols } from '@/data/healthProtocols'

export type { Protocol, ProtocolStep } from '@/data/healthProtocols'

export function useHealthProtocols() {
    return { protocols }
}
