import {
    Flame,
    HeartPulse,
    AlertTriangle,
    ShieldAlert,
    CloudLightning,
    Waves,
} from 'lucide-vue-next'
import type { Component } from 'vue'

export interface ProcedureStep {
    text: string
    sub?: string[]
}

export interface Procedure {
    id: string
    title: string
    instruction?: string
    icon: Component
    steps: ProcedureStep[]
}

export const procedures: Procedure[] = [
    {
        id: 'fire',
        title: 'Fire',
        icon: Flame,
        steps: [
            { text: 'Pull the nearest fire alarm and notify building occupants.' },
            { text: 'Call Bureau of Fire Protection | San Francisco: 0931-721-8893.' },
            { text: 'Assist injured or disabled personnel.' },
            { text: 'Evacuate the building. Activate emergency shutoffs.' },
            { text: 'Attempt to use a fire extinguisher only if you have been trained.' },
            { text: 'Proceed to the nearest evacuation area at the SFXC Open Ground.' },
        ],
    },
    {
        id: 'medical',
        title: 'Medical Emergency',
        icon: HeartPulse,
        steps: [
            { text: 'Identify the medical emergency.' },
            {
                text: 'If life threatening, call SAFER or SARAS | San Francisco MDRRMO: 0920-516-9888.',
            },
            { text: 'Administer first aid if properly trained.' },
            { text: 'Refer accordingly.' },
        ],
    },
    {
        id: 'urgent',
        title: 'Urgent Situation',
        instruction: 'Suspicious person, package, activity, or bomb threat',
        icon: AlertTriangle,
        steps: [
            {
                text: 'Call the authorities.',
                sub: [
                    'San Francisco BFP: 0931-721-8893',
                    'San Francisco Police Station: 0998-978-3071',
                ],
            },
            { text: 'State who, what, where, when, why, and how situation occurred.' },
            { text: 'If there is a bomb threat, turn off all electronics.' },
        ],
    },
    {
        id: 'violent',
        title: 'Violent Incident',
        icon: ShieldAlert,
        steps: [
            { text: 'Avoid — evacuate when you can.' },
            { text: 'Deny — lock/block doors, turn off lights, silence phones.' },
            { text: 'Defend — distract, attack, subdue.' },
            {
                text: 'Call the authorities.',
                sub: [
                    'San Francisco BFP: 0931-721-8893',
                    'San Francisco Police Station: 0998-978-3071',
                ],
            },
        ],
    },
    {
        id: 'severe-weather',
        title: 'Severe Weather',
        icon: CloudLightning,
        steps: [
            {
                text: 'If you hear outdoor sirens or receive a severe weather warning, wait for the alarm and move to the severe weather shelter.',
            },
            { text: 'Stay away from exterior doors and windows.' },
            { text: 'Stay in shelter until danger has passed.' },
        ],
    },
    {
        id: 'earthquake',
        title: 'Earthquake',
        icon: Waves,
        steps: [
            {
                text: 'When shaking starts, DUCK to the ground; take COVER by getting under a sturdy table or other piece of furniture; and HOLD ON until the shaking stops. Stay away from exterior doors and windows.',
            },
            {
                text: 'Stay away from glass, windows, outside doors and walls, and anything that could fall, such as lighting fixtures or furniture.',
            },
            {
                text: 'Stay inside until the shaking stops and it is safe to go outside. Do not exit a building during the shaking.',
            },
            {
                text: 'As soon as the shaking stops, immediately evacuate the venue and proceed to identified evacuation areas using the pre-determined routes guided by the teacher.',
            },
        ],
    },
]
