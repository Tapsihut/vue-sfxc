<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const router = useRouter()

const bsitPicture = 'https://placehold.co/800x800?text=800x800'

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
  color: string
  routeName?: string
}

interface College {
  id: string
  name: string
  code: string
  description: string
  heroImage: string
  color: string
  icon: string
}

const programs: Program[] = [
  {
    id: 'it',
    name: 'Bachelor of Science in Information Technology',
    code: 'BSIT',
    department: 'CBE',
    description: 'Comprehensive program in software development, networking, and IT systems management.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Software Developer', 'Network Administrator', 'Systems Analyst', 'IT Consultant'],
    icon: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
    heroImage: bsitPicture,
    color: 'bg-[#22C55E]'
  },
  {
    id: 'bsba',
    routeName: 'bsba',
    name: 'Bachelor of Science in Business Administration',
    code: 'BSBA',
    department: 'CBE',
    description: 'Develops comprehensive business management skills and strategic thinking for modern organizations.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Business Manager', 'Operations Manager', 'Entrepreneur', 'Management Consultant'],
    icon: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#FBBF24]'
  },
  {
    id: 'accountancy',
    name: 'Bachelor of Science in Accountancy',
    code: 'BSA',
    department: 'CBE',
    description: 'Comprehensive program designed to produce competent certified public accountants.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Certified Public Accountant', 'Auditor', 'Tax Consultant', 'Financial Analyst'],
    icon: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#3B82F6]'
  },
  {
    id: 'ais',
    name: 'Bachelor of Science in Accounting Information System',
    code: 'BSAIS',
    department: 'CBE',
    description: 'Combines accounting principles with information technology for modern business solutions.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Systems Accountant', 'IT Auditor', 'Business Analyst', 'Data Analyst'],
    icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#3B82F6]'
  },
  {
    id: 'oa',
    name: 'Bachelor of Science in Office Administration',
    code: 'BSOA',
    department: 'CBE',
    description: 'Trains students in office management, administrative functions, and business operations.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Office Manager', 'Administrative Officer', 'Executive Assistant', 'Operations Coordinator'],
    icon: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#A855F7]',
    routeName: 'bsoa'
  },
  {
    id: 'criminology',
    name: 'Bachelor of Science in Criminology',
    code: 'BSCRIM',
    department: 'CCJE',
    description: 'Prepares students for careers in law enforcement, crime prevention, and criminal justice system.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Police Officer', 'Criminal Investigator', 'Forensic Specialist', 'Security Manager'],
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#DC2626]',
    routeName: 'criminology'
  },
  {
    id: 'bsed',
    name: 'Bachelor of Science in Secondary Education',
    code: 'BSED',
    department: 'CTE',
    description: 'Prepares future educators for teaching various subjects in secondary education.',
    duration: '4 years',
    degree: 'Bachelor of Secondary Education',
    careers: ['High School Teacher', 'Subject Specialist', 'Curriculum Developer', 'Education Coordinator'],
    icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#1E40AF]'
  },
  {
    id: 'beed',
    name: 'Bachelor of Science in Elementary Education',
    code: 'BEED',
    department: 'CTE',
    description: 'Prepares future educators for teaching in elementary education.',
    duration: '4 years',
    degree: 'Bachelor of Elementary Education',
    careers: ['Elementary Teacher', 'Education Coordinator', 'Curriculum Developer', 'School Administrator'],
    icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#2563EB]'
  }
]

const colleges: College[] = [
  {
    id: 'cbe',
    name: 'College of Business Education',
    code: 'CBE',
    description: 'Empowering future business leaders and entrepreneurs with innovative management and technology skills.',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#DDA63A]',
    icon: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>'
  },
  {
    id: 'cte',
    name: 'College of Teachers Education',
    code: 'CTE',
    description: 'Shaping passionate educators who inspire and transform lives through quality teaching.',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#1E40AF]',
    icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
  },
  {
    id: 'ccje',
    name: 'College of Criminal Justice Education',
    code: 'CCJE',
    description: 'Training dedicated professionals committed to upholding justice, law, and public safety.',
    heroImage: 'https://placehold.co/800x800?text=800x800',
    color: 'bg-[#DC2626]',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>'
  }
]

const otherProgramsData = [
  {
    name: 'Unit Earner Program',
    description: 'This program is designed for professionals who wish to earn education units to qualify for the Licensure Examination for Teachers (LET). It provides the necessary pedagogical knowledge and skills for effective teaching.',
    link: '#' // Replace with actual link
  },
  {
    name: 'Technical Vocational Programs',
    description: 'Our TechVoc programs offer practical, skills-based training aligned with industry standards. These short-course programs prepare students for immediate employment and TESDA certification.',
    link: '#' // Replace with actual link
  },
  {
    name: 'Research Development Office',
    description: 'The Research Development Office (RDO) spearheads the institution\'s research initiatives, fostering a culture of innovation and scholarly inquiry among faculty and students for the advancement of knowledge and community development.',
    link: '#' // Replace with actual link
  },
  {
    name: 'International Relations Office',
    description: 'The International Relations Office (IRO) establishes global partnerships and programs, providing students and faculty with international exposure, exchange opportunities, and collaborative linkages across borders.',
    link: '#' // Replace with actual link
  }
]

const selectedCollege = ref<string | null>(null)
const programsSection = ref<HTMLElement | null>(null)

const filteredPrograms = computed(() => {
  if (!selectedCollege.value) return []
  return programs.filter(p => p.department === selectedCollege.value)
})

const selectCollege = (collegeCode: string) => {
  const wasSame = selectedCollege.value === collegeCode
  selectedCollege.value = wasSame ? null : collegeCode
  
  if (!wasSame && window.innerWidth < 768) {
    setTimeout(() => {
      programsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}

const navigateToProgram = (program: Program) => {
  if (program.routeName) {
    router.push({ name: program.routeName })
  }
}
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <!-- Hero Section (Article Style) -->
    <section id="hero" class="relative">
      <div class="h-[40vh] md:h-[50dvh] flex flex-col relative bg-primary/5 bg-no-repeat">
        <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Academics Article Content -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 mt-8">
      <h1 class="text-4xl md:text-5xl font-extrabold text-foreground mb-8">Academics at SFXC</h1>
      
      <div class="space-y-6 text-lg md:text-xl text-muted-foreground mb-16 leading-relaxed">
        <p>
          At St. Francis Xavier College, we form Xavier Knights, committed to service, strengthened by fortitude, driven toward excellence, and grounded in Christ-centeredness.
        </p>
        <p>
          Here, you don’t just learn — you grow in character, conviction, and purpose. Our holistic education shapes not only what you know, but who you become.
        </p>
        
        <div class="border-l-4 border-tertiary pl-6 md:pl-8 py-4 my-10 bg-muted/30 rounded-r-lg">
          <p class="text-2xl md:text-3xl font-bold text-primary mb-2 leading-tight">
            This is where leaders are formed.<br>
            This is where impact begins.
          </p>
        </div>

        <p class="font-bold text-foreground text-xl">
          Choose SFXC. Become a Xavier Knight.
        </p>
      </div>

      <Separator class="my-16" />
    </div>

    <!-- College Selection Section -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
      <div class="mb-12">
        <h2 class="text-3xl md:text-4xl font-black mb-3 text-primary uppercase tracking-wide">Start your Xavier Knight Education today</h2>
        <div class="h-1.5 w-24 bg-tertiary mb-6"></div>
        <p class="text-lg text-muted-foreground">Select a college to explore our various programs and find the path that fits your goals.</p>
      </div>

      <!-- College Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div 
          v-for="college in colleges" 
          :key="college.id"
          @click="selectCollege(college.code)"
          class="group relative aspect-square overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
          :class="selectedCollege === college.code ? 'ring-4 ring-primary' : ''"
        >
          <!-- Background Image -->
          <img :src="college.heroImage" class="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
          
          <!-- Color Overlay -->
          <div class="absolute inset-0 mix-blend-multiply opacity-90 transition-opacity duration-300 group-hover:opacity-100" :class="college.color"></div>

          <!-- Content -->
          <div class="absolute inset-0 p-6 flex flex-col text-white z-10">
            <!-- Header -->
            <div>
              <h3 class="text-2xl sm:text-3xl font-bold uppercase leading-tight tracking-wide mb-2">
                {{ college.code }}
              </h3>
              <p class="text-sm sm:text-base font-medium opacity-90">{{ college.name }}</p>
            </div>
            
            <!-- Icon -->
            <div class="mt-auto flex justify-center pb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="w-20 h-20 sm:w-24 sm:h-24 text-white opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                v-html="college.icon"
              ></svg>
            </div>
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/80 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
              <p class="text-sm font-bold text-white mb-2 uppercase tracking-wider">{{ college.code }}</p>
              <p class="text-base text-white leading-relaxed">{{ college.description }}</p>
              <Button 
                variant="outline" 
                class="mt-6 border-white text-white hover:bg-white hover:text-black transition-all"
              >
                {{ selectedCollege === college.code ? 'Hide Programs' : 'View Programs' }}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Programs Grid (Banner Style) -->
      <Transition name="slide-down">
        <div v-if="selectedCollege && filteredPrograms.length > 0" class="mt-8" ref="programsSection">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1 h-8 bg-primary rounded-full"></div>
            <h2 class="text-2xl md:text-3xl font-bold">
              {{ colleges.find(c => c.code === selectedCollege)?.name }}
            </h2>
          </div>

          <TransitionGroup 
            name="list" 
            tag="div" 
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            <div 
              v-for="(program, index) in filteredPrograms" 
              :key="program.id"
              @click="navigateToProgram(program)"
              class="group relative aspect-square overflow-hidden cursor-pointer animate-fade-in-up"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              <!-- Background Image -->
              <img :src="program.heroImage" class="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
              
              <!-- Color Overlay -->
              <div 
                class="absolute inset-0 mix-blend-multiply opacity-90 transition-opacity duration-300 group-hover:opacity-100" 
                :class="program.color"
              ></div>

              <!-- Content -->
              <div class="absolute inset-0 p-4 sm:p-6 flex flex-col text-white z-10">
                <!-- Header: Code -->
                <div class="flex items-start">
                  <h3 class="text-2xl sm:text-3xl font-bold uppercase leading-tight tracking-wide">
                    {{ program.code }}
                  </h3>
                </div>
                
                <!-- Program Name -->
                <p class="text-sm sm:text-base font-medium opacity-90 mt-2">{{ program.name }}</p>
                
                <!-- Icon -->
                <div class="mt-auto flex justify-center pb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="1.5" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="w-16 h-16 sm:w-20 sm:h-20 text-white opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                    v-html="program.icon"
                  ></svg>
                </div>
                
                <!-- Hover Content Overlay -->
                <div class="absolute inset-0 bg-black/80 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <p class="text-sm font-bold text-white mb-2 uppercase tracking-wider">{{ program.code }}</p>
                  <p class="text-xs text-white/80 mb-3">{{ program.name }}</p>
                  <p class="text-xs text-white/90 leading-relaxed mb-4">{{ program.description }}</p>
                  <div class="flex flex-wrap gap-1">
                    <Badge 
                      v-for="career in program.careers.slice(0, 2)" 
                      :key="career" 
                      variant="outline" 
                      class="text-[10px] border-white/30 text-white bg-white/10"
                    >
                      {{ career }}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </Transition>
    </section>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Separator class="my-16" />
    </div>

      <!-- Other Programs Section -->
      <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-12">
        <div class="mb-12">
          <h2 class="text-3xl md:text-4xl font-black mb-3 text-primary uppercase tracking-wide">Explore Other Programs</h2>
          <div class="h-1.5 w-24 bg-tertiary mb-6"></div>
          <p class="text-lg text-muted-foreground mb-6">Discover other educational opportunities and offices dedicated to your success:</p>
          
          <ul class="list-disc list-inside text-lg text-muted-foreground pl-6 space-y-4">
            <li v-for="(program, index) in otherProgramsData" :key="program.name" class="leading-relaxed">
              <router-link :to="program.link" class="text-tertiary hover:underline font-medium">{{ program.name }}</router-link>
              <template v-if="index === otherProgramsData.length - 2"></template>
              <template v-else-if="index === otherProgramsData.length - 1"></template>
              <template v-else></template>
            </li>
          </ul>
        </div>
      </section>
  </div>
</template>
