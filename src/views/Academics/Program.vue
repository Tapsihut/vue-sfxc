<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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

// Separate programs by department
const cbePrograms = computed(() =>
  programs.filter(p => p.department.includes('College of Business Education'))
)
const ccjePrograms = computed(() =>
  programs.filter(p => p.department.includes('College of Criminal Justice Education'))
)
const ctePrograms = computed(() =>
  programs.filter(p => p.department.includes('College of Teachers Education'))
)
</script>

<template>
    <!-- HERO -->
  <section id="hero" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>

      <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
          Colleges / Programs
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-xl">
          Explore the degree and graduate programs offered at St. Francis Xavier College.
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  </section>
  <div class="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- CBE Section -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-primary rounded-full"></div>
          <h2 class="text-2xl md:text-3xl font-bold">College of Business Education (CBE)</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card v-for="program in cbePrograms" :key="program.id"
            class="relative overflow-hidden h-80 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary">
            <div class="absolute inset-0">
              <img :src="program.heroImage" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/60"></div>
            </div>
            <div class="relative h-full flex flex-col justify-end p-6 text-white">
              <h3 class="text-2xl font-bold mb-2">{{ program.name }}</h3>
              <span class="text-sm">{{ program.duration }}</span>
            </div>
          </Card>
        </div>
      </div>

      <!-- CCJE Section -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-primary rounded-full"></div>
          <h2 class="text-2xl md:text-3xl font-bold">College of Criminal Justice Education (CCJE)</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card v-for="program in ccjePrograms" :key="program.id"
            class="relative overflow-hidden h-80 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary">
            <div class="absolute inset-0">
              <img :src="program.heroImage" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/60"></div>
            </div>
            <div class="relative h-full flex flex-col justify-end p-6 text-white">
              <h3 class="text-2xl font-bold mb-2">{{ program.name }}</h3>
              <span class="text-sm">{{ program.duration }}</span>
            </div>
          </Card>
        </div>
      </div>

      <!-- CTE Section -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-primary rounded-full"></div>
          <h2 class="text-2xl md:text-3xl font-bold">College of Teachers Education (CTE)</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card v-for="program in ctePrograms" :key="program.id"
            class="relative overflow-hidden h-80 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary">
            <div class="absolute inset-0">
              <img :src="program.heroImage" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/60"></div>
            </div>
            <div class="relative h-full flex flex-col justify-end p-6 text-white">
              <h3 class="text-2xl font-bold mb-2">{{ program.name }}</h3>
              <span class="text-sm">{{ program.duration }}</span>
            </div>
          </Card>
        </div>
      </div>

      <Separator class="my-12" />

      <!-- TESDA Section -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-primary rounded-full"></div>
          <h2 class="text-2xl md:text-3xl font-bold">TVET/TESDA Programs</h2>
        </div>
        <p class="text-muted-foreground mb-6">
          Short-term technical vocational courses that provide industry-recognized certifications.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card v-for="program in tesdaPrograms" :key="program.id"
            class="relative overflow-hidden h-80 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary">
            <div class="absolute inset-0">
              <img :src="program.heroImage" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/60"></div>
            </div>
            <div class="relative h-full flex flex-col justify-end p-6 text-white">
              <h3 class="text-2xl font-bold mb-2">{{ program.name }}</h3>
              <span class="text-sm">{{ program.duration }}</span>
            </div>
          </Card>
        </div>
      </div>

      <Separator class="my-12" />

      <!-- Admission Info -->
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Admissions Office</p>
              <p class="text-sm text-muted-foreground">Visit our office for enrollment inquiries and application assistance.</p>
            </div>

            <div class="flex flex-col items-start p-4 rounded-lg bg-white border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Contact Number</p>
              <p class="text-sm text-muted-foreground mb-1">0909-088-85380</p>
              <p class="text-xs text-muted-foreground">Monday - Friday, 8:00 AM - 5:00 PM</p>
            </div>

            <div class="flex flex-col items-start p-4 rounded-lg bg-white border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
