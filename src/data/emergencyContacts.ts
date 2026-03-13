import { Users, Building2 } from 'lucide-vue-next'
import type { Component } from 'vue'

export interface Contact {
    name: string
    number: string
}

export interface ContactGroup {
    id: string
    group: string
    icon: Component
    contacts: Contact[]
}

export const contactGroups: ContactGroup[] = [
    {
        id: 'sfxc-team',
        group: 'SFXC Emergency Response Team',
        icon: Users,
        contacts: [
            { name: 'Julieto Jr. R. Flores', number: '0946-060-5654' },
            { name: 'Regie F. Asis', number: '0910-049-7301' },
            { name: 'Christine Eve F. Arroza', number: '0955-620-6455' },
            { name: 'Regine F. Flores', number: '0916-129-8107' },
            { name: 'Ruel Jeffrey Cuartero', number: '0947-605-3421' },
        ],
    },
    {
        id: 'external-offices',
        group: 'San Francisco Agusan del Sur Disaster & Emergency Response Offices',
        icon: Building2,
        contacts: [
            { name: 'MDRRMO / SARAS', number: '0920-516-9888' },
            { name: 'San Francisco Police Station', number: '0998-978-3071' },
            { name: 'Bureau of Fire Protection', number: '0931-721-8893' },
        ],
    },
]
