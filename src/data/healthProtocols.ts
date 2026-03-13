import { ClipboardList, HeartPulse, Pill, Briefcase, Shirt, Smile } from 'lucide-vue-next'
import type { Component } from 'vue'

export interface ProtocolStep {
    text: string
}

export interface Protocol {
    id: string
    title: string
    icon: Component
    steps: ProtocolStep[]
}

export const protocols: Protocol[] = [
    {
        id: 'health-examination',
        title: 'Student Health Examination and Screening Protocols',
        icon: ClipboardList,
        steps: [
            {
                text: 'The student shall secure a routing form from the Admissions Office prior to reporting to the School Clinic.',
            },
            {
                text: 'The student shall present the routing form to the Safety and Health Office for verification.',
            },
            {
                text: 'Basic health screening shall be conducted, including vital signs assessment (blood pressure, height, and weight).',
            },
            {
                text: 'A brief health history shall be obtained through interview and/or a health declaration form.',
            },
            {
                text: 'Physical observation and health assessment shall be performed to identify any apparent medical concerns.',
            },
            {
                text: "Findings shall be documented in the student's health record and treated with strict confidentiality.",
            },
            {
                text: 'Students with abnormal findings shall be advised for further medical evaluation or referred to an appropriate healthcare facility when necessary.',
            },
            {
                text: 'The routing form shall be signed and returned to the student upon completion of the health examination.',
            },
        ],
    },
    {
        id: 'first-aid',
        title: 'First Aid Management',
        icon: HeartPulse,
        steps: [
            {
                text: 'The Safety and Health Office shall respond promptly to reported incidents requiring first aid.',
            },
            {
                text: "Initial assessment of the patient's condition shall be conducted to determine the level of care needed.",
            },
            {
                text: 'Basic first aid shall be administered using standard first aid protocols and available supplies.',
            },
            {
                text: 'For serious cases, the patient shall be immediately transported to the nearest medical facility for further treatment.',
            },
            {
                text: 'Incident details shall be documented in the First Aid Logbook, including the nature of injury, treatment given, and outcome.',
            },
            { text: 'Follow-up monitoring shall be conducted when necessary.' },
        ],
    },
    {
        id: 'medication',
        title: 'Medication Dispensation',
        icon: Pill,
        steps: [
            {
                text: 'Only over-the-counter (OTC) medications approved by the Safety and Health Office shall be dispensed.',
            },
            {
                text: "Medications shall be given only after proper assessment of the individual's condition.",
            },
            { text: 'Dosage and usage instructions shall be clearly explained to the recipient.' },
            {
                text: 'All dispensed medications shall be recorded in the Medication Logbook, including name, date, and medication given.',
            },
        ],
    },
    {
        id: 'ojt',
        title: 'Medical Assessment for On-the-Job Training (OJT)',
        icon: Briefcase,
        steps: [
            { text: 'Students shall undergo health assessment as scheduled.' },
            {
                text: 'Vital signs and general physical condition shall be evaluated by the Safety and Health Office.',
            },
            {
                text: 'Health history relevant to OJT requirements shall be reviewed.',
            },
            {
                text: 'The Safety and Health Office shall issue medical clearance or recommendations based on assessment results.',
            },
            {
                text: 'Students with health concerns shall be advised to seek further medical evaluation.',
            },
            {
                text: 'All records shall be kept confidential and used solely for OJT purposes.',
            },
        ],
    },
    {
        id: 'uniform-exemption',
        title: 'Uniform Exemption Recommendation',
        icon: Shirt,
        steps: [
            {
                text: 'The student shall be advised by the OSAS to report to the School Clinic for medical assessment if uniform exemption is needed.',
            },
            {
                text: 'A medical evaluation shall be conducted to determine the health condition affecting uniform compliance.',
            },
            {
                text: 'Supporting medical information or documents shall be reviewed, if applicable.',
            },
            {
                text: 'The Safety and Health Office shall issue a written medical recommendation if uniform exemption is medically justified.',
            },
            {
                text: 'The recommendation shall specify the nature, duration, and conditions of the exemption.',
            },
            {
                text: 'The approved recommendation shall be endorsed to OSAS for proper implementation.',
            },
            {
                text: 'All assessments and recommendations shall be properly documented and kept confidential.',
            },
        ],
    },
    {
        id: 'dental',
        title: 'Dental Services',
        icon: Smile,
        steps: [
            {
                text: 'The student shall visit the School Clinic to request and schedule a dental consultation.',
            },
            {
                text: 'The student shall wait for a notification or call from the School Clinic regarding the confirmed consultation schedule.',
            },
            {
                text: 'On the scheduled date, the student shall report to the School Clinic to accomplish the required dental form to be presented to the dentist.',
            },
            {
                text: 'The designated Dental Office shall provide the necessary dental services to the student.',
            },
            {
                text: 'After the dental consultation, the accomplished dental form shall be returned by the student to the School Clinic for documentation and record purposes.',
            },
        ],
    },
]
