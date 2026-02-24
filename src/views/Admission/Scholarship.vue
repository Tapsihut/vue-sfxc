<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface ScholarshipType {
  id: string
  name: string
  description: string
  coverage: string
  requirements: string[]
  eligibility: string[]
}

const scholarshipTypes: ScholarshipType[] = [
  {
    id: 'tes',
    name: 'Tertiary Education Subsidy (TES)',
    description: 'Government scholarship program providing financial assistance to qualified students',
    coverage: 'Tuition and other school fees subsidy',
    requirements: [
      'TES grantee certificate',
      'Valid student ID',
      'Certificate of registration',
      'Proof of income (for renewal)'
    ],
    eligibility: [
      'Must be a TES grantee from UniFAST',
      'Enrolled in priority degree programs',
      'Must maintain satisfactory academic performance'
    ]
  },
  {
    id: 'tes-tdp',
    name: 'Tulong Dunong Program (TES - TDP)',
    description: 'Enhanced TES scholarship program with additional educational support',
    coverage: 'Full tuition and school fees plus allowance',
    requirements: [
      'TDP approval certificate',
      'Certificate of registration',
      'Student ID',
      'Barangay certificate of residency'
    ],
    eligibility: [
      'Must qualify for TES program',
      'From low-income families',
      'Full-time student status required'
    ]
  },
  {
    id: 'pgas',
    name: 'Provincial Government of Agusan del Sur (PGAS)',
    description: 'Scholarship for residents of Agusan del Sur province',
    coverage: 'Partial to full tuition fee subsidy',
    requirements: [
      'Certificate of residency from Agusan del Sur',
      'Barangay clearance',
      'Valid ID',
      'Certificate of Good Moral Character'
    ],
    eligibility: [
      'Must be a resident of Agusan del Sur',
      'Filipino citizen',
      'Good academic standing required'
    ]
  },
  {
    id: 'ncip',
    name: 'National Commission on Indigenous People (NCIP)',
    description: 'Scholarship program for indigenous peoples',
    coverage: 'Tuition and miscellaneous fees',
    requirements: [
      'Certificate of Tribal Membership',
      'NCIP certification',
      'Valid ID',
      'Certificate of registration'
    ],
    eligibility: [
      'Must be a member of an indigenous cultural community',
      'Filipino citizen',
      'Satisfactory academic performance'
    ]
  },
  {
    id: 'owwa',
    name: 'OWWA Caraga/Agusan del Sur',
    description: 'Scholarship for dependents of active OFW members',
    coverage: 'Educational assistance for tuition and fees',
    requirements: [
      'OWWA membership certificate of parent',
      'Birth certificate',
      'Valid ID',
      'Certificate of registration'
    ],
    eligibility: [
      'Dependent of an active OWWA member',
      'Must maintain good academic standing',
      'OFW parent must be updated with membership'
    ]
  },
  {
    id: 'cmsp',
    name: 'CHED Merit Scholarship Program (CMSP)',
    description: 'Merit-based scholarship for academically excellent students',
    coverage: 'Full tuition and other school fees',
    requirements: [
      'High school diploma with honors',
      'Qualifying exam results',
      'Certificate of Good Moral Character',
      'Certificate of registration'
    ],
    eligibility: [
      'Must pass CMSP qualifying examination',
      'Minimum general average of 90%',
      'Must maintain GWA of 2.5 or better'
    ]
  },
  {
    id: 'coscho',
    name: 'Scholarship Program for Coconut Farmers & their Families (COSCHO PROGRAM)',
    description: 'Educational assistance for coconut farming families',
    coverage: 'Tuition fee subsidy',
    requirements: [
      'Proof of coconut farm ownership or employment',
      'Barangay certification',
      'Valid ID',
      'Certificate of registration'
    ],
    eligibility: [
      'Parent/guardian must be a registered coconut farmer',
      'Must be enrolled in agriculture-related courses or priority programs',
      'Satisfactory academic performance'
    ]
  },
  {
    id: 'sida-sgp',
    name: 'CHED Sugarcane Industry Development Act Scholarship (SIDA-SGP)',
    description: 'Scholarship for dependents of sugarcane workers and farmers',
    coverage: 'Full tuition and school fees',
    requirements: [
      'Proof of parent employment in sugarcane industry',
      'Certificate from sugar mill or plantation',
      'Valid ID',
      'Certificate of registration'
    ],
    eligibility: [
      'Parent/guardian employed in sugarcane industry',
      'Must maintain satisfactory academic performance',
      'Priority to agriculture and related courses'
    ]
  },
  {
    id: 'dost-sei',
    name: 'DOST-SEI Junior Level Science Scholarship',
    description: 'Science and technology scholarship program',
    coverage: 'Full tuition, allowance, books, and thesis allowance',
    requirements: [
      'DOST-SEI scholarship certificate',
      'Certificate of registration',
      'Valid ID',
      'High school diploma'
    ],
    eligibility: [
      'Must pass DOST-SEI qualifying exam',
      'Enrolled in DOST priority courses',
      'Must maintain GWA of 2.5 or better with no grade below 3.0'
    ]
  }
]
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Scholarship Types Grid -->
      <div class="mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-foreground mb-6">Available Scholarships</h2>
        <p class="text-muted-foreground mb-8">
          Browse through the scholarship programs offered to our students.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            v-for="scholarship in scholarshipTypes" 
            :key="scholarship.id"
            class="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle class="text-lg">{{ scholarship.name }}</CardTitle>
              <CardDescription>{{ scholarship.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div>
                  <p class="text-sm font-semibold text-foreground mb-1">Coverage:</p>
                  <p class="text-sm text-primary font-medium">{{ scholarship.coverage }}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p class="text-sm font-semibold text-foreground mb-2">Requirements:</p>
                  <ul class="text-sm text-muted-foreground space-y-1">
                    <li v-for="(req, idx) in scholarship.requirements" :key="idx" class="flex items-start">
                      <span class="mr-2 text-primary">•</span>
                      <span>{{ req }}</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <p class="text-sm font-semibold text-foreground mb-2">Eligibility:</p>
                  <ul class="text-sm text-muted-foreground space-y-1">
                    <li v-for="(criteria, idx) in scholarship.eligibility" :key="idx" class="flex items-start">
                      <span class="mr-2 text-primary">→</span>
                      <span>{{ criteria }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator class="my-12" />

      <!-- Contact Information -->
      <Card class="mt-12 border-2">
        <CardHeader class="bg-linear-to-r from-primary/5 to-transparent">
          <CardTitle class="text-2xl">Need Assistance?</CardTitle>
          <CardDescription>Our Scholarship Office is here to help you</CardDescription>
        </CardHeader>
        <CardContent class="pt-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col items-start p-4 rounded-lg bg-gray-50 border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Office Hours</p>
              <p class="text-sm text-muted-foreground">Monday - Friday</p>
              <p class="text-sm text-muted-foreground">8:00 AM - 5:00 PM</p>
            </div>
            
            <div class="flex flex-col items-start p-4 rounded-lg bg-gray-50 border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Contact Number</p>
              <p class="text-sm text-muted-foreground">0909-088-85380</p>
              <p class="text-xs text-muted-foreground mt-1">Scholarship Office Hotline</p>
            </div>
            
            <div class="flex flex-col items-start p-4 rounded-lg bg-gray-50 border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Email Address</p>
              <p class="text-sm text-muted-foreground">scholarship@sfxc.edu.ph</p>
              <p class="text-xs text-muted-foreground mt-1">Allow 24-48 hours for response</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
