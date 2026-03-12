export interface Officer {
    name: string
    position: string
    avatar?: string
}

export interface OfficerWithSubs extends Officer {
    subordinates?: OfficerWithSubs[]
}

export interface CollegeOfficer extends Officer {
    hasSubordinates: boolean
    governors?: Officer[]
}

export const sclOfficers: OfficerWithSubs[] = [
    {
        name: 'Juan Dela Cruz',
        position: 'President',
        subordinates: [
            {
                name: 'Maria Santos',
                position: 'Vice President - Internal',
                subordinates: [
                    { name: 'Pedro Reyes', position: 'Finance' },
                    { name: 'Ana Garcia', position: 'Assistant Finance' },
                ],
            },
            {
                name: 'Jose Rizal',
                position: 'Vice President - External',
                subordinates: [
                    { name: 'Carlos Lopez', position: 'Logistic' },
                    { name: 'Rosa Mendoza', position: 'Assistant Logistic' },
                ],
            },
            {
                name: 'Elena Cruz',
                position: 'General Secretary',
                subordinates: [{ name: 'Marco Tan', position: 'Assistant Secretary' }],
            },
            {
                name: 'Sofia Ramos',
                position: 'PIO',
            },
        ],
    },
]

export const collegeOfficers: { topLevel: CollegeOfficer[] } = {
    topLevel: [
        {
            name: 'Roberto Villa',
            position: 'CBE President',
            hasSubordinates: true,
            governors: [
                { name: 'Liza Fernandez', position: 'BSA Governor' },
                { name: 'Miguel Torres', position: 'BSBA Governor' },
                { name: 'Carmen Diaz', position: 'BSOA Governor' },
                { name: 'Antonio Cruz', position: 'BSIT Governor' },
            ],
        },
        { name: 'Patricia Gomez', position: 'BSCRIM Governor', hasSubordinates: false },
        { name: 'Ricardo Santos', position: 'BEEd Governor', hasSubordinates: false },
        { name: 'Isabella Reyes', position: 'BSEd Governor', hasSubordinates: false },
    ],
}
