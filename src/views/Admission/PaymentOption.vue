<script setup lang="ts">
import { ref, computed } from 'vue'
import { Separator } from '@/components/ui/separator'
import { Plus, Minus, ChevronRight } from 'lucide-vue-next'

interface FinancialAid {
  name: string
  description: string
  amount: string
  requirements: string[]
  applicationSteps: string[]
}

const financialAids: FinancialAid[] = [
  {
    "name": "Tertiary Education Subsidy (TES)",
    "description": "A financial assistance program under Republic Act No. 10931, also known as the Universal Access to Quality Tertiary Education Act, which aims to ensure that all Filipinos have access to quality tertiary education. The program provides support to eligible students to help cover tuition and other school-related expenses, reducing the financial burden on families and promoting equal opportunities for higher education.",
    "amount": "P13,500 per semester, or P27,000 per school year.",
    "requirements": [
      "A bona fide student officially enrolled at Saint Francis Xavier College (SFXC)."
    ],
    "applicationSteps": [
      "The interested student must complete enrollment at SFXC. As soon as enrollment is complete, ADSO will review the student\u2019s files and check if they qualify for the TES grant.",
      "Should the student qualify for TES, ADSO will automatically apply for the TES grant in the student\u2019s name. The student will receive a notice for this application.",
      "Once the student is verified and successfully granted with TES within the CHED-UniFAST system, the student will receive a notice from SFXC on the TES grant release date."
    ]
  },
  {
    "name": "Tulong Dunong Program (TES-TDP)",
    "description": "A student financial assistance program under Republic Act No. 10931, also known as the Universal Access to Quality Tertiary Education Act, designed to support deserving and financially challenged students in pursuing higher education. The program helps cover part of their educational expenses, enabling them to continue their studies and complete their chosen degree despite financial difficulties.",
    "amount": "P13,500 per semester, or P27,000 per school year.",
    "requirements": [
      "A bona fide student officially enrolled at Saint Francis Xavier College (SFXC)."
    ],
    "applicationSteps": []
  },
  {
    "name": "National Commission on Indigenous Peoples (NCIP) Educational Assistance Program (EAP)",
    "description": "A scholarship and educational support program implemented by the National Commission on Indigenous Peoples to help qualified Indigenous Peoples (IPs) pursue higher education. This program aims to promote equal access to education while preserving cultural identity and empowering IP communities through learning.",
    "amount": "The scholarship amount is subject to the guidelines and provisions set by the partner agency.",
    "requirements": [
      "Must be a bona fide member of an ethno-linguistic group within his/her community that is duly recognized by NCIP.",
      "Combined annual income of parents or guardians must not exceed \u20b1150,000, ensuring that assistance is granted to students from low-income families who need financial support."
    ],
    "applicationSteps": [
      "The student will apply directly to the NCIP office"
    ]
  },
  {
    "name": "Provincial Government of Agusan del Sur (PGAS Scholarship)",
    "description": "A scholarship initiative of the Provincial Government of Agusan del Sur that offers educational assistance to academically capable and deserving students who are residents of Agusan del Sur, helping them pursue and complete tertiary education.",
    "amount": "The scholarship amount is subject to the guidelines and provisions set by the partner agency.",
    "requirements": [
      "Application letter addressed to Hon. Santiago B. Cane, Jr. with signature of applicant",
      "Application form (version 2025) duly filled out with 2x2 ID picture",
      "Barangay certificate of residency indicating the number of years of residency (photocopy)",
      "Certificate of Indigency with proof of income (photocopy)",
      "Proof of income could be:\n\u2022 Annual Income Tax Return (ITR) of one or both parents (if working)\n\u2022 Employment Contract (if OFW)",
      "Photocopy of Grade 12 report card (with complete grades from 1st to 2nd semester) if applicant is currently a senior high school graduate or Photocopy of Certificate of Grades of the previously enrolled semester if the applicant is currently a college student.",
      "The report card or the certificate of grades must indicate the General Weighted Average (GWA) with minimum grade requirement of:\n\u2022 Full Blooded IP - at least 80%\n\u2022 Non-IP & BS Nursing - at least 85%\n\u2022 Persons with disability (PWD) - at least 80%",
      "Note: All subject must not have failing grades, dropped or INC remarks"
    ],
    "applicationSteps": [
      "The student will apply directly to the provincial government."
    ]
  },
  {
    "name": "OFW Dependent Scholarship Program (ODSP) (under OWWA Caraga Scholarship)",
    "description": "A scholarship and financial assistance program administered by the Overseas Workers Welfare Administration through its Caraga Regional Office. This program is intended for qualified dependents of Overseas Filipino Workers (OFWs), providing educational support to help them pursue higher education and lessen the financial burden on OFW families. The program aims to recognize the sacrifices of OFWs by investing in the education and future of their children.",
    "amount": "The scholarship amount is subject to the guidelines and provisions set by the partner agency.",
    "requirements": [
      "1. Proof Identity\n    1.1. OFW - Valid Passport Copy of OFW Passport Bio or Information Page\n    1.2. Dependent- School I.D. or any available valid I.D.\n    1.3. ANY of the following: Birth Certificate or Baptismal",
      "2. Proof of OFW Income\n    2.1. Overseas Employment Contract (OEC)\n    2.2. Pay Slip\n    2.3. Bank Remittance Slip of Employer or other proof as applicable"
    ],
    "applicationSteps": [
      "The student will apply directly to OWWA or Online."
    ]
  },
  {
    "name": "Education for Development Scholarship Program (EDSP) (under OWWA Caraga Scholarship)",
    "description": "A merit-based scholarship program implemented by the Overseas Workers Welfare Administration through its Caraga Regional Office. The program is designed to provide full educational support to outstanding and qualified dependents of Overseas Filipino Workers (OFWs), enabling them to pursue college education in priority courses. It aims to develop globally competitive professionals by investing in the academic excellence and future leadership of OFW dependents.",
    "amount": "The scholarship amount is subject to the guidelines and provisions set by the partner agency.",
    "requirements": [
      "1. Proof of Identity\n      1.1. OFW - Valid Passport Copy of OFW Passport Bio or Information Page\n      1.2 Dependent- School I.D. or any available valid I.D.\n      1.3. ANY of the following: Birth Certificate or Baptismal",
      "2. Proof of grades from the previous School Year\n       2.1. Form 137 or Form 10 [TOR]\n       2.2. Form 138 or Report Card\n       2.3. Certificate of Grades from the School",
      "3. 2x2 I.D. Picture of the OFW's Dependent (Child or Sibling Applicant)\n        - White background\n        - With name tag and the signature of the applicant"
    ],
    "applicationSteps": [
      "The student will apply directly to OWWA or Online."
    ]
  },
  {
    "name": "Congressional Migrant Workers Scholarship Program (CMWSP) (under OWWA Caraga Scholarship)",
    "description": "A scholarship grant administered by the Overseas Workers Welfare Administration through its Caraga Regional Office, intended for qualified dependents of Overseas Filipino Workers (OFWs) who have passed the required screening and assessment. This program aims to provide educational opportunities to children of migrant workers by supporting their college education and helping them achieve their academic and professional goals, in recognition of the contributions and sacrifices of Filipino migrant workers.",
    "amount": "The scholarship amount is subject to the guidelines and provisions set by the partner agency.",
    "requirements": [
      "1. Proof of Identity\n     1.1. OFW \u2013 Valid Passport Copy of OFW Passport Bio or Information Page\n     1.2. Dependent- School I.D. or any available valid I.D.\n     1.3. ANY of the following: Birth Certificate or Baptismal",
      "2. Proof of grades from the previous School Year\n      2.1. Form 137 or Form 10 TOR\n      2.2. Form 138 or Report Card\n      2.3. Certificate of Grades from the School",
      "3. A 2\u00d72 I.D. Picture of the OFW\u2019s Dependent (Child or Sibling Applicant)\n     3.1. White background\n     3.2. With name tag and signature of applicant"
    ],
    "applicationSteps": [
      "The student will apply directly to OWWA or Online."
    ]
  },
  {
    "name": "CHED Merit Scholarship Program (CMSP)",
    "description": "A merit-based scholarship program of the Commission on Higher Education that supports academically outstanding Filipino students who wish to pursue higher education. It is open to Filipino citizens who are Senior High School graduates with at least a 93% GWA (or equivalent) and whose parents\u2019 or guardian\u2019s combined annual income does not exceed \u20b1500,000, ensuring that both academic excellence and financial need are addressed.",
    "amount": "The scholarship amount is subject to the guidelines and provisions set by the partner agency.",
    "requirements": [
      "1. Accomplished Application Form",
      "2. Copy of Birth Certificate issued by the National Statistics Office (NSO) or the Philippine Statistics Authority (PSA)",
      "3. Certified true copy of Form 138 (Learner's Progress Report or SF9), duly signed by the registrar or an authorized representative of the senior high school attended:\n       3.1. Latest Income Tax Return (ITR) of parents or guardians\n       3.2. Certificate of Tax Exemption/Non-Filer issued by the Bureau of Internal Revenue (BIR): Certified true copy of the latest contract or proof of income may be considered for children of Overseas Filipino Workers (OFW) and Seafarers\n       3.3. Social Case Study Report issued by the City/Municipal Social Welfare and Development Office (CSWD/MSWD).",
      "4. Other Requirements, if applicable:\n       4.1. PWD ID issued by CSWD/MSWD or Certification issued by the Persons with Disability Affairs Office (PDAO):\n       4.2. Solo Parent ID issued by CSWD/MSWD:\n       4.3. Senior Citizen ID issued by CSWD/MSWD; \n       4.4. Social Case Study Report issued by CSWD/MSWD covered under Magna Carta of the Poor and/or First-Generation Students\n       4.5. Indigenous Peoples Certification issued the National Commission on Indigenous Peoples (NCIP).",
      "5. Notarized Certificate of Guardianship issued by the legal guardian of the student-applicant, if applicable.",
      "Priority Programs:\n1. Bachelor of Science in Information Technology\n2. Bachelor of Science in Accountancy\n3. Bachelor of Secondary Education major in Mathematics"
    ],
    "applicationSteps": [
      "(Same as TCP)"
    ]
  },
  {
    "name": "Scholarship Program for Coconut Farmers and their Families (COSCHO Programs)",
    "description": "A scholarship program of the Philippine Coconut Authority that provides educational assistance to qualified coconut farmers and their dependents. It is open to Filipino citizens who are graduating or high school graduates with at least 80% GWA (or equivalent), or college students with relevant earned units and 80% GWA in the previous semester, who meet the admission requirements of Colleges (or private HEIs, if applicable), are not recipients of other government-funded scholarships, are duly registered coconut farmers in the NCFRS or their dependents, and whose parents\u2019 combined annual income does not exceed \u20b1300,000.",
    "amount": "The scholarship amount is subject to the guidelines and provisions set by the partner agency.",
    "requirements": [
      "1. Accomplished Application Form",
      "2. Copy of Birth Certificate issued by the National Statistics Office (NSO) or the Philippine Statistics Authority (PSA)",
      "3. Certified true copy of Form 138 (Learner's Progress Report or SF9), duly signed by the registrar or an authorized representative of the senior high school attended:\n       3.1. Latest Income Tax Return (ITR) of parents or guardians\n       3.2. Certificate of Tax Exemption/Non-Filer issued by the Bureau of Internal Revenue (BIR): Certified true copy of the latest contract or proof of income may be considered for children of Overseas Filipino Workers (OFW) and Seafarers\n       3.3. Social Case Study Report issued by the City/Municipal Social Welfare and Development Office (CSWD/MSWD).",
      "4. Other Requirements, if applicable:\n       4.1. PWD ID issued by CSWD/MSWD or Certification issued by the Persons with Disability Affairs Office (PDAO):\n       4.2. Solo Parent ID issued by CSWD/MSWD:\n       4.3. Senior Citizen ID issued by CSWD/MSWD; \n       4.4. Social Case Study Report issued by CSWD/MSWD covered under Magna Carta of the Poor and/or First-Generation Students\n       4.5. Indigenous Peoples Certification issued by the National Commission on Indigenous Peoples (NCIP).",
      "5. Notarized Certificate of Guardianship issued by the legal guardian of the student-applicant, if applicable."
    ],
    "applicationSteps": []
  }
]

const expanded = ref<Record<string, boolean>>({})

const toggle = (name: string) => {
  expanded.value[name] = !expanded.value[name]
}

const chedPrograms = computed(() => financialAids.filter(p => p.name.includes('TES') || p.name.includes('CHED')))
const otherGovPrograms = computed(() => financialAids.filter(p => !p.name.includes('TES') && !p.name.includes('CHED')))
</script>

<template>
  <div class="space-y-16 pb-12 px-4 pt-6 md:px-8 md:pt-10">
    <div>
      <h2 class="text-3xl font-bold tracking-tight mb-4 text-foreground md:max-w-200">Accepted Financial Aid at SFXC</h2>
      <p class="text-lg text-muted-foreground leading-relaxed md:max-w-200">
        Education at SFXC is an investment in our students’ futures. As our institution continues to strive for the socio-economic development of society, we believe our students deserve quality education. With many of our students coming from humble backgrounds, the Admission and Scholarship Office (ADSO) is more than ready to assist with financial aid for our deserving students. <br><br> Below is a list of available and accepted financial aid at SFXC. Should there be other scholarships and grants that are not mentioned, contact ADSO for special arrangements.
      </p>
    </div>

    <!-- CHED Programs -->
    <div class="space-y-6">
      <div class="border-b-2 border-primary/20 pb-2">
        <h3 class="text-2xl font-bold text-foreground">CHED Scholarship Programs</h3>
      </div>
      
      <div class="space-y-3">
        <div v-for="aid in chedPrograms" :key="aid.name" class="border border-border rounded-md overflow-hidden bg-background">
          <button @click="toggle(aid.name)" class="w-full flex items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground">
            <Minus v-if="expanded[aid.name]" class="w-4 h-4 shrink-0 text-foreground" stroke-width="2.5" />
            <Plus v-else class="w-4 h-4 shrink-0 text-foreground text-opacity-80" stroke-width="2.5" />
            {{ aid.name }}
          </button>
          
          <div v-show="expanded[aid.name]" class="p-6 border-t border-border bg-background">
            <div class="mb-6">
              <div v-if="aid.amount" class="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                {{ aid.amount }}
              </div>
              <p class="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-wrap">{{ aid.description }}</p>
            </div>
            
            <div class="gap-8 grid md:grid-cols-2">
              <div v-if="aid.requirements && aid.requirements.length > 0">
                <h4 class="text-sm font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-tertiary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  REQUIREMENTS
                </h4>
                <ul class="list-disc list-outside ml-4 space-y-2 text-muted-foreground text-sm">
                  <li v-for="(req, idx) in aid.requirements" :key="idx" class="leading-relaxed pl-1">{{ req }}</li>
                </ul>
              </div>
              <div v-if="aid.applicationSteps && aid.applicationSteps.length > 0">
                <h4 class="text-sm font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-tertiary"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
                  APPLICATION STEPS
                </h4>
                <ul class="list-decimal list-outside ml-4 space-y-2 text-muted-foreground text-sm">
                  <li v-for="(step, idx) in aid.applicationSteps" :key="idx" class="leading-relaxed pl-1">{{ step }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Other Government Programs -->
    <div class="space-y-6">
      <div class="border-b-2 border-primary/20 pb-2">
        <h3 class="text-xl md:text-2xl font-bold text-foreground">Other Scholarship Programs</h3>
      </div>
      <p class="text-muted-foreground leading-relaxed mb-6">
        The application for the following Government-Funded Scholarship are agency-direct. Scholars need to submit their applications directly to the scholarship giving agency and transact scholarship concerns like requirements and allowances straight from their office. However, announcements and updates regarding various scholarships offers shall be posted by the ADSO once requested.
      </p>
      
      <div class="space-y-3">
        <div v-for="(aid, index) in otherGovPrograms" :key="aid.name" class="border border-border rounded-md overflow-hidden bg-background">
          <button @click="toggle(aid.name)" class="w-full flex items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground">
            <span class="text-muted-foreground font-medium text-sm w-4">{{ index + 1 }}.</span>
            <span class="flex-1">{{ aid.name }}</span>
            <Minus v-if="expanded[aid.name]" class="w-4 h-4 shrink-0 text-foreground ml-auto" stroke-width="2.5" />
            <Plus v-else class="w-4 h-4 shrink-0 text-foreground text-opacity-80 ml-auto" stroke-width="2.5" />
          </button>
          
          <div v-show="expanded[aid.name]" class="p-6 border-t border-border bg-background">
            <div class="mb-6">
              <div v-if="aid.amount" class="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                {{ aid.amount }}
              </div>
              <p class="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-wrap">{{ aid.description }}</p>
            </div>
            
            <div class="gap-8 grid md:grid-cols-2">
              <div v-if="aid.requirements && aid.requirements.length > 0">
                <h4 class="text-sm font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-tertiary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  REQUIREMENTS
                </h4>
                <ul class="list-disc list-outside ml-4 space-y-2 text-muted-foreground text-sm">
                  <li v-for="(req, idx) in aid.requirements" :key="idx" class="leading-relaxed pl-1">{{ req }}</li>
                </ul>
              </div>
              <div v-if="aid.applicationSteps && aid.applicationSteps.length > 0">
                <h4 class="text-sm font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-tertiary"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
                  APPLICATION STEPS
                </h4>
                <ul class="list-decimal list-outside ml-4 space-y-2 text-muted-foreground text-sm">
                  <li v-for="(step, idx) in aid.applicationSteps" :key="idx" class="leading-relaxed pl-1">{{ step }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
