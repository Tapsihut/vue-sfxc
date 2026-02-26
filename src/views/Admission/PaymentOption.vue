<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface FinancialAid {
  name: string
  description: string
  amount: string
  requirements: string[]
  applicationSteps: string[]
}

const financialAids: FinancialAid[] = [
  {
    name: 'Tertiary Education Subsidy (TES)',
    description: 'A financial assistance program under Republic Act No. 10931, also known as the Universal Access to Quality Tertiary Education Act, which aims to ensure that all Filipinos have access to quality tertiary education. The program provides support to eligible students to help cover tuition and other school-related expenses, reducing the financial burden on families and promoting equal opportunities for higher education.',
    amount: 'P13,500 per semester, or P27,000 per school year.',
    requirements: [
      'A bona fide student officially enrolled at Saint Francis Xavier College (SFXC).'
    ],
    applicationSteps: [
      'The interested student must complete enrollment at SFXC. As soon as enrollment is complete, ADSO will review the student’s files and check if they qualify for the TES grant.',
      'Should the student qualify for TES, ADSO will automatically apply for the TES grant in the student’s name. The student will receive a notice for this application.',
      'Once the student is verified and successfully granted with TES within the CHED-UniFAST system, the student will receive a notice from SFXC on the TES grant release date.'
    ]
  },
  {
    name: 'Tulong Dunong Program (TES-TDP)',
    description: 'A student financial assistance program under Republic Act No. 10931, also known as the Universal Access to Quality Tertiary Education Act, designed to support deserving and financially challenged students in pursuing higher education. The program helps cover part of their educational expenses, enabling them to continue their studies and complete their chosen degree despite financial difficulties.',
    amount: 'P13,500 per semester, or P27,000 per school year.',
    requirements: [
      'A bona fide student officially enrolled at Saint Francis Xavier College (SFXC).'
    ],
    applicationSteps: []
  },
  {
    name: 'National Commission on Indigenous Peoples (NCIP) Educational Assistance Program (EAP)',
    description: 'A scholarship and educational support program implemented by the National Commission on Indigenous Peoples to help qualified Indigenous Peoples (IPs) pursue higher education. This program aims to promote equal access to education while preserving cultural identity and empowering IP communities through learning.',
    amount: 'The scholarship amount is subject to the guidelines and provisions set by the partner agency.',
    requirements: [
      'Must be a bona fide member of an ethno-linguistic group within his/her community that is duly recognized by NCIP.',
      'Combined annual income of parents or guardians must not exceed ₱150,000, ensuring that assistance is granted to students from low-income families who need financial support.'
    ],
    applicationSteps: [
      'The student will apply directly to the NCIP office'
    ]
  },
  {
    name: 'Provincial Government of Agusan del Sur (PGAS Scholarship)',
    description: 'A scholarship initiative of the Provincial Government of Agusan del Sur that offers educational assistance to academically capable and deserving students who are residents of Agusan del Sur, helping them pursue and complete tertiary education.',
    amount: 'The scholarship amount is subject to the guidelines and provisions set by the partner agency.',
    requirements: [
      'Application letter addressed to Hon. Santiago B. Cane, Jr. with signature of applicant',
      'Application form (version 2025) duly filled out with 2x2 ID picture',
      'Barangay certificate of residency indicating the number of years of residency (photocopy)',
      'Certificate of Indigency with proof of income (photocopy)',
      'Proof of income could be: Annual Income Tax Return (ITR) of one or both parents (if working) or Employment Contract (if OFW)',
      'Photocopy of Grade 12 report card (with complete grades from 1st to 2nd semester) if applicant is currently a senior high school graduate or Photocopy of Certificate of Grades of the previously enrolled semester if the applicant is currently a college student.',
      'The report card or the certificate of grades must indicate the General Weighted Average (GWA) with minimum grade requirement of: Full Blooded IP - at least 80%, Non-IP & BS Nursing - at least 85%, Persons with disability (PWD) - at least 80%',
      'Note: All subjects must not have failing grades, dropped or INC remarks'
    ],
    applicationSteps: [
      'The student will apply directly to the provincial government.'
    ]
  },
  {
    name: 'OFW Dependent Scholarship Program (ODSP) (under OWWA Caraga Scholarship)',
    description: 'A scholarship and financial assistance program administered by the Overseas Workers Welfare Administration through its Caraga Regional Office. This program is intended for qualified dependents of Overseas Filipino Workers (OFWs), providing educational support to help them pursue higher education and lessen the financial burden on OFW families. The program aims to recognize the sacrifices of OFWs by investing in the education and future of their children.',
    amount: 'The scholarship amount is subject to the guidelines and provisions set by the partner agency.',
    requirements: [
      '1. Proof Identity: OFW - Valid Passport Copy of OFW Passport Bio or Information Page; Dependent - School I.D. or any available valid I.D.; ANY of the following: Birth Certificate or Baptismal',
      '2. Proof of OFW Income: Overseas Employment Contract (OEC); Pay Slip; Bank Remittance Slip of Employer or other proof as applicable'
    ],
    applicationSteps: [
      'The student will apply directly to OWWA or Online.'
    ]
  },
  {
    name: 'Education for Development Scholarship Program (EDSP) (under OWWA Caraga Scholarship)',
    description: 'A merit-based scholarship program implemented by the Overseas Workers Welfare Administration through its Caraga Regional Office. The program is designed to provide full educational support to outstanding and qualified dependents of Overseas Filipino Workers (OFWs), enabling them to pursue college education in priority courses. It aims to develop globally competitive professionals by investing in the academic excellence and future leadership of OFW dependents.',
    amount: 'The scholarship amount is subject to the guidelines and provisions set by the partner agency.',
    requirements: [
      '1. Proof of Identity: OFW - Valid Passport Copy of OFW Passport Bio or Information Page; Dependent - School I.D. or any available valid I.D.; ANY of the following: Birth Certificate or Baptismal',
      '2. Proof of grades from the previous School Year: Form 137 or Form 10 [TOR]; Form 138 or Report Card; Certificate of Grades from the School',
      '3. 2x2 I.D. Picture of the OFW\'s Dependent (Child or Sibling Applicant) - White background, With name tag and the signature of the applicant'
    ],
    applicationSteps: [
      'The student will apply directly to OWWA or Online.'
    ]
  },
  {
    name: 'Congressional Migrant Workers Scholarship Program (CMWSP) (under OWWA Caraga Scholarship)',
    description: 'A scholarship grant administered by the Overseas Workers Welfare Administration through its Caraga Regional Office, intended for qualified dependents of Overseas Filipino Workers (OFWs) who have passed the required screening and assessment. This program aims to provide educational opportunities to children of migrant workers by supporting their college education and helping them achieve their academic and professional goals, in recognition of the contributions and sacrifices of Filipino migrant workers.',
    amount: 'The scholarship amount is subject to the guidelines and provisions set by the partner agency.',
    requirements: [
      '1. Proof of Identity: OFW – Valid Passport Copy of OFW Passport Bio or Information Page; Dependent - School I.D. or any available valid I.D.; ANY of the following: Birth Certificate or Baptismal',
      '2. Proof of grades from the previous School Year: Form 137 or Form 10 TOR; Form 138 or Report Card; Certificate of Grades from the School',
      '3. A 2×2 I.D. Picture of the OFW’s Dependent (Child or Sibling Applicant) - White background, With name tag and signature of applicant'
    ],
    applicationSteps: [
      'The student will apply directly to OWWA or Online.'
    ]
  },
  {
    name: 'CHED Merit Scholarship Program (CMSP)',
    description: 'A merit-based scholarship program of the Commission on Higher Education that supports academically outstanding Filipino students who wish to pursue higher education. It is open to Filipino citizens who are Senior High School graduates with at least a 93% GWA (or equivalent) and whose parents’ or guardian’s combined annual income does not exceed ₱500,000, ensuring that both academic excellence and financial need are addressed.',
    amount: 'The scholarship amount is subject to the guidelines and provisions set by the partner agency.',
    requirements: [
      '1. Accomplished Application Form',
      '2. Copy of Birth Certificate issued by the National Statistics Office (NSO) or the Philippine Statistics Authority (PSA)',
      '3. Certified true copy of Form 138 (Learner\'s Progress Report or SF9), duly signed by the registrar or an authorized representative of the senior high school attended: Latest Income Tax Return (ITR) of parents or guardians; Certificate of Tax Exemption/Non-Filer issued by the Bureau of Internal Revenue (BIR): Certified true copy of the latest contract or proof of income may be considered for children of Overseas Filipino Workers (OFW) and Seafares; Social Case Study Report issued by the City/Municipal Social Welfare and Development Office (CSWD/MSWD).',
      '4. Other Requirements, if applicable: PWD ID issued by CSWD/MSWD or Certification issued by the Persons with Disability Affairs Office (PDAO); Solo Parent ID issued by CSWD/MSWD; Senior Citizen ID issued by CSWD/MSWD; Social Case Study Report issued by CSWD/MSWD covered under Magna Carta of the Poor and/or First-Generation Students; Indigenous Peoples Certification issued the National Commission on Indigenous Peoples (NCIP).',
      '5. Notarized Certificate of Guardianship issued by the legal guardian of the student-applicant, if applicable.',
      'Priority Programs: 1. Bachelor of Science in Information Technology, 2. Bachelor of Science in Accountancy, 3. Bachelor of Secondary Education major in Mathematics'
    ],
    applicationSteps: [
      '(Same as TCP)'
    ]
  },
  {
    name: 'Scholarship Program for Coconut Farmers and their Families (COSCHO Programs)',
    description: 'A scholarship program of the Philippine Coconut Authority that provides educational assistance to qualified coconut farmers and their dependents. It is open to Filipino citizens who are graduating or high school graduates with at least 80% GWA (or equivalent), or college students with relevant earned units and 80% GWA in the previous semester, who meet the admission requirements of Colleges (or private HEIs, if applicable), are not recipients of other government-funded scholarships, are duly registered coconut farmers in the NCFRS or their dependents, and whose parents’ combined annual income does not exceed ₱300,000.',
    amount: 'The scholarship amount is subject to the guidelines and provisions set by the partner agency.',
    requirements: [
      '1. Accomplished Application Form',
      '2. Copy of Birth Certificate issued by the National Statistics Office (NSO) or the Philippine Statistics Authority (PSA)',
      '3. Certified true copy of Form 138 (Learner\'s Progress Report or SF9), duly signed by the registrar or an authorized representative of the senior high school attended: Latest Income Tax Return (ITR) of parents or guardians; Certificate of Tax Exemption/Non-Filer issued by the Bureau of Internal Revenue (BIR): Certified true copy of the latest contract or proof of income may be considered for children of Overseas Filipino Workers (OFW) and Seafares; Social Case Study Report issued by the City/Municipal Social Welfare and Development Office (CSWD/MSWD).',
      '4. Other Requirements, if applicable: PWD ID issued by CSWD/MSWD or Certification issued by the Persons with Disability Affairs Office (PDAO); Solo Parent ID issued by CSWD/MSWD; Senior Citizen ID issued by CSWD/MSWD; Social Case Study Report issued by CSWD/MSWD covered under Magna Carta of the Poor and/or First-Generation Students; Indigenous Peoples Certification issued by the National Commission on Indigenous Peoples (NCIP).',
      '5. Notarized Certificate of Guardianship issued by the legal guardian of the student-applicant, if applicable.'
    ],
    applicationSteps: []
  }
]
</script>

<template>
  <section id="hero" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>

      <!-- <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
          Accepted Financial Aid at SFXC
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-2xl">
          Education at SFXC is an investment in our students’ futures.
        </p>
      </div> -->

      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  </section>

  <div class="min-h-screen bg-background py-16 md:py-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Introduction Section -->
      <div class="mb-16 max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center justify-center p-4 bg-tertiary/10 rounded-full mb-6 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-tertiary"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">Investing in Your Future</h2>
        <p class="text-lg text-muted-foreground mb-6 leading-relaxed">
          Education at SFXC is an investment in our students’ futures. As our institution continues to strive for the socio-economic development of society, we believe our students deserve quality education. With many of our students coming from humble backgrounds, the Admission and Scholarship Office (ADSO) is more than ready to assist with financial aid for our deserving students.
        </p>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Below is a list of available and accepted financial aid at SFXC. Should there be other scholarships and grants that are not mentioned, contact ADSO for special arrangements.
        </p>
      </div>

      <Separator class="my-16" />

      <!-- Financial Aid List -->
      <div class="space-y-8">
        <Card
          v-for="aid in financialAids"
          :key="aid.name"
          class="overflow-hidden border border-border hover:border-tertiary/40 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <div class="flex flex-col lg:flex-row">
            <!-- Left Side: Info -->
            <div class="lg:w-2/5 p-6 md:p-8 bg-muted/10 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary mb-6 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
              </div>
              <h3 class="text-2xl font-bold text-foreground mb-4 leading-tight">{{ aid.name }}</h3>
              <div class="mb-6">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary-foreground text-sm font-semibold border border-secondary/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  {{ aid.amount }}
                </span>
              </div>
              <p class="text-muted-foreground leading-relaxed text-sm md:text-base flex-1">
                {{ aid.description }}
              </p>
            </div>

            <!-- Right Side: Details -->
            <div class="lg:w-3/5 p-6 md:p-8 space-y-8 bg-card">
              <!-- Requirements -->
              <div v-if="aid.requirements.length > 0">
                <h4 class="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-tertiary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Requirements
                </h4>
                <ul class="space-y-3">
                  <li
                    v-for="(req, index) in aid.requirements"
                    :key="index"
                    class="flex items-start gap-3 text-sm md:text-base"
                  >
                    <span class="shrink-0 w-1.5 h-1.5 rounded-full bg-tertiary mt-2"></span>
                    <span class="text-muted-foreground leading-relaxed">{{ req }}</span>
                  </li>
                </ul>
              </div>

              <!-- Application Steps -->
              <div v-if="aid.applicationSteps.length > 0">
                <h4 class="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-tertiary"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
                  Application Steps
                </h4>
                <div class="space-y-4">
                  <div
                    v-for="(step, index) in aid.applicationSteps"
                    :key="index"
                    class="flex items-start gap-4 text-sm md:text-base"
                  >
                    <div class="shrink-0 w-7 h-7 rounded-full bg-background border-2 border-tertiary/30 text-tertiary flex items-center justify-center font-bold text-xs mt-0.5">
                      {{ index + 1 }}
                    </div>
                    <p class="text-muted-foreground leading-relaxed">{{ step }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  </div>
</template>