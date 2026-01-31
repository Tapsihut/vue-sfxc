<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Program {
  id: string
  name: string
  code: string
  department: string
  description: string
  duration: string
  degree: string
  careers: string[]
  icon: string
  heroImage: string
}

const programs: Program[] = [
  // College of Business Education (CBE)
  {
    id: 'it',
    name: 'Bachelor of Science in Information Technology',
    code: 'BSIT',
    department: 'College of Business Education (CBE)',
    description: 'Comprehensive program in software development, networking, and IT systems management.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Software Developer', 'Network Administrator', 'Systems Analyst', 'IT Consultant'],
    icon: 'laptop',
    heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop'
  },
  {
    id: 'bsba',
    name: 'Bachelor of Science in Business Administration',
    code: 'BSBA',
    department: 'College of Business Education (CBE)',
    description: 'Develops comprehensive business management skills and strategic thinking for modern organizations.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Business Manager', 'Operations Manager', 'Entrepreneur', 'Management Consultant'],
    icon: 'briefcase',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop'
  },
  {
    id: 'accountancy',
    name: 'Bachelor of Science in Accountancy',
    code: 'BSA',
    department: 'College of Business Education (CBE)',
    description: 'Comprehensive program designed to produce competent certified public accountants.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Certified Public Accountant', 'Auditor', 'Tax Consultant', 'Financial Analyst'],
    icon: 'calculator',
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop'
  },
  {
    id: 'ais',
    name: 'Bachelor of Science in Accounting Information System',
    code: 'BSAIS',
    department: 'College of Business Education (CBE)',
    description: 'Combines accounting principles with information technology for modern business solutions.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Systems Accountant', 'IT Auditor', 'Business Analyst', 'Data Analyst'],
    icon: 'database',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
  },
  {
    id: 'oa',
    name: 'Bachelor of Science in Office Administration',
    code: 'BSOA',
    department: 'College of Business Education (CBE)',
    description: 'Trains students in office management, administrative functions, and business operations.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Office Manager', 'Administrative Officer', 'Executive Assistant', 'Operations Coordinator'],
    icon: 'briefcase',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop'
  },
  // College of Criminal Justice Education (CCJE)
  {
    id: 'criminology',
    name: 'Bachelor of Science in Criminology',
    code: 'BSCRIM',
    department: 'College of Criminal Justice Education (CCJE)',
    description: 'Prepares students for careers in law enforcement, crime prevention, and criminal justice system.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Police Officer', 'Criminal Investigator', 'Forensic Specialist', 'Security Manager'],
    icon: 'shield',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop'
  },
  // College of Teachers Education (CTE)
  {
    id: 'bsed',
    name: 'Bachelor of Science in Secondary Education',
    code: 'BSED',
    department: 'College of Teachers Education (CTE)',
    description: 'Prepares future educators for teaching various subjects in secondary education.',
    duration: '4 years',
    degree: 'Bachelor of Secondary Education',
    careers: ['High School Teacher', 'Subject Specialist', 'Curriculum Developer', 'Education Coordinator'],
    icon: 'pen',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop'
  },
  {
    id: 'beed',
    name: 'Bachelor of Science in Elementary Education',
    code: 'BEED',
    department: 'College of Teachers Education (CTE)',
    description: 'Prepares future educators for teaching in elementary education.',
    duration: '4 years',
    degree: 'Bachelor of Elementary Education',
    careers: ['Elementary Teacher', 'Education Coordinator', 'Curriculum Developer', 'School Administrator'],
    icon: 'book',
    heroImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop'
  }
]

const tesdaPrograms: Program[] = [
  {
    id: 'driving',
    name: 'Driving NC II',
    code: 'TESDA',
    department: 'TVET/TESDA Programs',
    description: 'Technical vocational course for professional driving certification.',
    duration: 'Short-term',
    degree: 'Certificate',
    careers: ['Professional Driver', 'Delivery Driver', 'Transport Operator'],
    icon: 'car',
    heroImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop'
  },
  {
    id: 'css',
    name: 'Computer Systems Servicing NC II',
    code: 'TESDA',
    department: 'TVET/TESDA Programs',
    description: 'Provides skills in computer hardware maintenance and troubleshooting.',
    duration: 'Short-term',
    degree: 'Certificate',
    careers: ['Computer Technician', 'IT Support', 'Hardware Specialist'],
    icon: 'computer',
    heroImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop'
  },
  {
    id: 'bookkeeping',
    name: 'Bookkeeping NC III',
    code: 'TESDA',
    department: 'TVET/TESDA Programs',
    description: 'Teaches fundamental bookkeeping and accounting procedures.',
    duration: 'Short-term',
    degree: 'Certificate',
    careers: ['Bookkeeper', 'Accounting Clerk', 'Finance Assistant'],
    icon: 'book-open',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop'
  }
]

const selectedDepartment = ref<string>('all')
const departments = [
  'All Departments',
  'College of Business Education (CBE)',
  'College of Criminal Justice Education (CCJE)',
  'College of Teachers Education (CTE)',
  'TVET/TESDA Programs'
]

const filteredPrograms = ref(programs)

const filterByDepartment = (dept: string) => {
  selectedDepartment.value = dept
  if (dept === 'All Departments') {
    filteredPrograms.value = programs
  } else {
    filteredPrograms.value = programs.filter(p => p.department === dept)
  }
}

const getIconPath = (icon: string) => {
  const icons: Record<string, string> = {
    shield: 'M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4z',
    calculator: 'M6 2h12v20H6V2zm2 2v4h8V4H8zm0 6v2h2v-2H8zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H8zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H8zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z',
    database: 'M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4zm0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z',
    chart: 'M3 3v18h18M7 16l4-4 4 4 6-6',
    search: 'M11 2a9 9 0 106.32 15.49l4.58 4.58L23 21l-4.58-4.58A9 9 0 0011 2z',
    money: 'M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6',
    megaphone: 'M3 11l18-5v12l-18-5 6-1v7',
    cog: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
    users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    trending: 'M23 6l-9.5 9.5-5-5L1 18',
    lightbulb: 'M9 21h6M12 3a6 6 0 00-6 6c0 2.5 1.5 4.5 2 6v2a2 2 0 002 2h4a2 2 0 002-2v-2c.5-1.5 2-3.5 2-6a6 6 0 00-6-6z',
    laptop: 'M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.5 2a2 2 0 01-1.5 3H4a2 2 0 01-1.5-3L4 16',
    briefcase: 'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16',
    book: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 016.5 22H20V2H6.5A2.5 2.5 0 004 4.5z',
    pen: 'M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z',
    write: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z',
    car: 'M16 8a1 1 0 011-1h2.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0122 9.414V15a1 1 0 01-1 1h-1M8 8a1 1 0 00-1-1H4.414a1 1 0 00-.707.293L2.293 8.707A1 1 0 002 9.414V15a1 1 0 001 1h1m12 0a2 2 0 11-4 0m4 0H8m0 0a2 2 0 11-4 0M3 5h18v10H3z',
    computer: 'M9 17h6M9 21h6M6 19h12V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14z',
    'book-open': 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zm20 0h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z'
  }
  return icons[icon] || icons['book']
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Department Filter -->
      <!-- <div class="mb-8">
        <h2 class="text-xl font-bold text-foreground mb-4">Filter by Department</h2>
        <div class="flex flex-wrap gap-2">
          <Badge 
            v-for="dept in departments" 
            :key="dept"
            :variant="selectedDepartment === dept || (dept === 'All Departments' && selectedDepartment === 'all') ? 'default' : 'outline'"
            class="cursor-pointer px-4 py-2 text-sm"
            @click="filterByDepartment(dept === 'All Departments' ? 'all' : dept)"
          >
            {{ dept }}
          </Badge>
        </div>
      </div> -->

      <!-- Degree Programs Section -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-primary rounded-full"></div>
          <h2 class="text-2xl md:text-3xl font-bold text-foreground">Degree Programs</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            v-for="program in filteredPrograms" 
            :key="program.id"
            class="relative overflow-hidden h-80 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary"
          >
            <!-- Background Image -->
            <div class="absolute inset-0">
              <img 
                :src="program.heroImage" 
                :alt="program.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <!-- Dark Overlay -->
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20"></div>
            </div>

            <!-- Content -->
            <div class="relative h-full flex flex-col justify-end p-6 text-white">
              
              <h3 class="text-2xl font-bold mb-2 drop-shadow-lg">{{ program.name }}</h3>
              <div class="flex items-center gap-2 text-white/90">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm font-medium">{{ program.duration }}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Separator class="my-12" />

      <!-- TESDA Programs Section -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-primary rounded-full"></div>
          <h2 class="text-2xl md:text-3xl font-bold text-foreground">TVET/TESDA Programs</h2>
        </div>
        <p class="text-muted-foreground mb-6">
          Short-term technical vocational courses that provide industry-recognized certifications.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            v-for="program in tesdaPrograms" 
            :key="program.id"
            class="relative overflow-hidden h-80 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary"
          >
            <!-- Background Image -->
            <div class="absolute inset-0">
              <img 
                :src="program.heroImage" 
                :alt="program.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <!-- Dark Overlay -->
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20"></div>
            </div>

            <!-- Content -->
            <div class="relative h-full flex flex-col justify-end p-6 text-white">
              
              <h3 class="text-2xl font-bold mb-2 drop-shadow-lg">{{ program.name }}</h3>
              <div class="flex items-center gap-2 text-white/90">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm font-medium">{{ program.duration }}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Separator class="my-12" />

      <!-- Admission Information -->
      <Card class="border-2 bg-linear-to-r from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle class="text-2xl">Ready to Start Your Journey?</CardTitle>
          <CardDescription>Learn more about our admission requirements and enrollment process</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col items-start p-4 rounded-lg bg-white border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Admissions Office</p>
              <p class="text-sm text-muted-foreground">Visit our office for enrollment inquiries and application assistance.</p>
            </div>
            
            <div class="flex flex-col items-start p-4 rounded-lg bg-white border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Contact Number</p>
              <p class="text-sm text-muted-foreground mb-1">0909-088-85380</p>
              <p class="text-xs text-muted-foreground">Monday - Friday, 8:00 AM - 5:00 PM</p>
            </div>
            
            <div class="flex flex-col items-start p-4 rounded-lg bg-white border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Email Address</p>
              <p class="text-sm text-muted-foreground mb-1">admissions@sfxc.edu.ph</p>
              <p class="text-xs text-muted-foreground">Get quick responses to your questions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>