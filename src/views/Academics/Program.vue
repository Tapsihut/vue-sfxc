<script setup lang="ts">
import { ref, computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import bsitPicture from '@/assets/images/news/sfxc_bsit.jpg'

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
    name: 'Bachelor of Science in Business Administration',
    code: 'BSBA',
    department: 'CBE',
    description: 'Develops comprehensive business management skills and strategic thinking for modern organizations.',
    duration: '4 years',
    degree: 'Bachelor of Science',
    careers: ['Business Manager', 'Operations Manager', 'Entrepreneur', 'Management Consultant'],
    icon: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
    color: 'bg-[#A855F7]'
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
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',
    color: 'bg-[#DC2626]'
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
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop',
    color: 'bg-[#2563EB]'
  }
]

const colleges: College[] = [
  {
    id: 'cbe',
    name: 'College of Business Education',
    code: 'CBE',
    description: 'Empowering future business leaders and entrepreneurs with innovative management and technology skills.',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    color: 'bg-[#DDA63A]',
    icon: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>'
  },
  {
    id: 'cte',
    name: 'College of Teachers Education',
    code: 'CTE',
    description: 'Shaping passionate educators who inspire and transform lives through quality teaching.',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
    color: 'bg-[#1E40AF]',
    icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
  },
  {
    id: 'ccje',
    name: 'College of Criminal Justice Education',
    code: 'CCJE',
    description: 'Training dedicated professionals committed to upholding justice, law, and public safety.',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',
    color: 'bg-[#DC2626]',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>'
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
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <!-- Hero Section -->
    <section
      class="relative h-[58vh] flex items-end overflow-hidden bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-linear-to-t from-background via-black/60 to-transparent" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-14 animate-fade-in-up">
        <Badge variant="outline" class="mb-6 px-4 py-1.5 text-xs tracking-[0.2em] uppercase rounded-none border-white/20 text-white bg-transparent backdrop-blur-sm">
          Academic Programs
        </Badge>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Colleges &<br class="hidden sm:block" /> Programs.
        </h1>
        <p class="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
          Explore the degree and graduate programs offered at St. Francis Xavier College.
        </p>
      </div>
    </section>

    <!-- College Selection Section -->
    <section class="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-3">Choose Your College</h2>
        <p class="text-muted-foreground text-lg">Select a college to view available programs</p>
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
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
          >
            <div 
              v-for="(program, index) in filteredPrograms" 
              :key="program.id"
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
  </div>
</template>

<style scoped>
/* Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
}

/* Transition Group */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
}

.list-leave-active {
  position: absolute;
}

/* Slide Down Transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
