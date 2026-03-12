export interface Office {
    id: string
    name: string
    department: string
    email: string
    email2?: string
    phone: string
}

export const offices: Office[] = [
    // A. Colleges
    {
        id: 'ccje',
        name: 'CCJE',
        department: 'A. Colleges',
        email: 'ccje@sfxc.edu.ph',
        phone: '0908 885 5383',
    },
    {
        id: 'cte',
        name: 'CTE',
        department: 'A. Colleges',
        email: 'cte@sfxc.edu.ph',
        phone: '0908 885 6149',
    },
    {
        id: 'cbe-bsa',
        name: 'CBE (BSA/AT)',
        department: 'A. Colleges',
        email: 'bsa@sfxc.edu.ph',
        phone: '0908 885 5381',
    },
    {
        id: 'bsba',
        name: 'BSBA',
        department: 'A. Colleges',
        email: 'bsba@sfxc.edu.ph',
        phone: '0908 885 5334',
    },
    {
        id: 'bsit',
        name: 'BSIT',
        department: 'A. Colleges',
        email: 'bsit@sfxc.edu.ph',
        phone: '0908 885 5376',
    },
    {
        id: 'bsoa',
        name: 'BSOA',
        department: 'A. Colleges',
        email: '',
        phone: '0908 885 5359',
    },
    // B. Accounting & Finance
    {
        id: 'accounting',
        name: 'Accounting Office',
        department: 'B. Accounting & Finance',
        email: 'accountingoffice@sfxc.edu.ph',
        phone: '0908 885 3694',
    },
    {
        id: 'finance',
        name: 'Finance Office',
        department: 'B. Accounting & Finance',
        email: 'financeoffice@sfxc.edu.ph',
        phone: '0908 885 4520',
    },
    {
        id: 'property',
        name: 'Property & Merchandising Office',
        department: 'B. Accounting & Finance',
        email: 'merchandising@sfxc.edu.ph',
        phone: '0908 885 4521',
    },
    {
        id: 'student-accounts',
        name: 'Student Accounts',
        department: 'B. Accounting & Finance',
        email: 'studentaccounts@sfxc.edu.ph',
        phone: '0966 720 9527',
    },
    {
        id: 'helpdesk',
        name: 'Account Help Desk',
        department: 'B. Accounting & Finance',
        email: 'accounthelpdesk@sfxc.edu.ph',
        phone: '',
    },
    // C. Academics Support
    {
        id: 'osas',
        name: 'OSAS',
        department: 'C. Academics Support',
        email: 'osas@sfxc.edu.ph',
        phone: '0908 885 6201',
    },
    {
        id: 'guidance',
        name: 'Guidance Counseling',
        department: 'C. Academics Support',
        email: 'guidanceoffice@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'gender',
        name: 'Gender Development',
        department: 'C. Academics Support',
        email: 'genderdevelopment@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'registrar',
        name: 'Registrar Office',
        department: 'C. Academics Support',
        email: 'registraroffice@sfxc.edu.ph',
        phone: '0908 885 3687',
    },
    {
        id: 'admission',
        name: 'Admission Scholarship',
        department: 'C. Academics Support',
        email: 'admission.scholarship@sfxc.edu.ph',
        email2: 'scholarships@sfxc.edu.ph',
        phone: '0908 885 4527',
    },
    // D. Department/Offices
    {
        id: 'hr',
        name: 'Human Resources Department',
        department: 'D. Department/Offices',
        email: 'humanresources@sfxc.edu.ph',
        email2: 'recruitment@sfxc.edu.ph',
        phone: '0939 936 5618',
    },
    {
        id: 'communications',
        name: 'Information and Communications',
        department: 'D. Department/Offices',
        email: 'communications@sfxc.edu.ph',
        email2: 'gclassroom_ico@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'marketing',
        name: 'Marketing Office',
        department: 'D. Department/Offices',
        email: 'marketing@sfxc.edu.ph',
        phone: '0908 885 5380',
    },
    {
        id: 'community',
        name: 'Community Development Services',
        department: 'D. Department/Offices',
        email: 'communityextension@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'evp',
        name: 'EVP Operations',
        department: 'D. Department/Offices',
        email: 'evp.operations@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'library',
        name: 'Library',
        department: 'D. Department/Offices',
        email: 'library@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'research',
        name: 'Research Office',
        department: 'D. Department/Offices',
        email: 'researchdev@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'clinic',
        name: 'School Clinic',
        department: 'D. Department/Offices',
        email: 'clinic@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'compliance',
        name: 'SFXC Compliance',
        department: 'D. Department/Offices',
        email: 'compliance@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'student-accounts-dept',
        name: 'Student Accounts',
        department: 'D. Department/Offices',
        email: 'studentaccounts@sfxc.edu.ph',
        phone: '',
    },
    {
        id: 'techvoc',
        name: 'TechVoc',
        department: 'D. Department/Offices',
        email: 'techvoc@sfxc.edu.ph',
        phone: '',
    },
]
