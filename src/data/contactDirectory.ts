export interface Contact {
    title: string
    phone: string
    emails: string[]
}

export const directoryContacts: Contact[] = [
    {
        title: 'Accounting Office',
        phone: '0908 8854 520',
        emails: ['accountingoffice@sfxc.edu.ph'],
    },
    {
        title: 'Finance Office',
        phone: '0908 8853 694',
        emails: ['financeoffice@sfxc.edu.ph'],
    },
    {
        title: 'Human Resources Office',
        phone: '0955 6206 455',
        emails: ['humanresources@sfxc.edu.ph'],
    },
    {
        title: 'ICO and Marketing Office',
        phone: '0908 8855 380',
        emails: ['infocomm@sfxc.edu.ph', 'marketing@sfxc.edu.ph'],
    },
    {
        title: 'OSAS and Guidance Office',
        phone: '0908 8856 201',
        emails: ['osas@sfxc.edu.ph', 'guidanceoffice@sfxc.edu.ph'],
    },
    {
        title: 'Registrar Office',
        phone: '09088853687',
        emails: ['Registraroffice@sfxc.edu.ph'],
    },
]
