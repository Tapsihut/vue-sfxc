<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// Import images
const sfxcBuilding = 'https://placehold.co/800x800?text=800x800'
const cauldron = 'https://placehold.co/800x800?text=800x800'
const bsit1 = 'https://placehold.co/800x800?text=800x800'
const bsit2 = 'https://placehold.co/800x800?text=800x800'
const bsit3 = 'https://placehold.co/800x800?text=800x800'

interface Recognition {
  id: string
  category: string
  title: string
  organization: string
  badge: string
  year: string
  description: string
  details: string[]
  image: string
  color: string
  icon: string
}

const recognitions: Recognition[] = [
  {
    id: '1',
    category: 'Accreditation',
    title: 'Level III Re-Accredited Status',
    organization: 'Philippine Accrediting Association of Schools, Colleges and Universities',
    badge: 'PAASCU Level III',
    year: 'Valid until 2028',
    description: 'Awarded for maintaining high standards of instruction, faculty, research, and community service. This status grants full administrative and financial deregulation.',
    details: [
      'Bachelor of Science in Business Administration',
      'Bachelor of Elementary Education',
      'Bachelor of Secondary Education',
      'Liberal Arts Programs'
    ],
    image: sfxcBuilding,
    color: 'bg-[#E5243B]',
    icon: '<path d="M12 15l-4.224 2.224.805-4.704-3.416-3.33 4.723-.687L12 4l2.112 4.503 4.723.687-3.416 3.33.805 4.704z"/>'
  },
  {
    id: '2',
    category: 'Accreditation',
    title: 'Center of Excellence',
    organization: 'Commission on Higher Education',
    badge: 'CHED COE',
    year: 'Valid until 2027',
    description: 'Recognized as a premier institution demonstrating excellent performance in the areas of instruction, research and publication, extension and linkages, and institutional qualifications.',
    details: ['Teacher Education Programs'],
    image: cauldron,
    color: 'bg-[#DDA63A]',
    icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
  },
  {
    id: '3',
    category: 'Ranking',
    title: 'Top Performing Criminology School',
    organization: 'Professional Regulation Commission',
    badge: 'Top 5 Regional',
    year: '2024 - 2025',
    description: 'Consistently ranked among the top performing schools in the region based on the licensure examination passing rates, reflecting our rigorous academic training.',
    details: [
      '95% Overall Passing Rate',
      'Top 3 Regional Placer (2024)',
      '100% First-time Takers Passing Rate'
    ],
    image: bsit1,
    color: 'bg-[#4C9F38]',
    icon: '<path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>'
  },
  {
    id: '4',
    category: 'Accreditation',
    title: 'ISO 9001:2015 Certification',
    organization: 'International Organization for Standardization',
    badge: 'ISO Certified',
    year: 'Valid until 2026',
    description: 'Certified for implementing a robust Quality Management System across all academic and administrative processes, ensuring consistent delivery of educational services.',
    details: ['Institution-wide Quality Management System'],
    image: bsit2,
    color: 'bg-[#C5192D]',
    icon: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>'
  },
  {
    id: '5',
    category: 'Achievement',
    title: 'National Champion in Innovation',
    organization: 'Philippine Startup Challenge',
    badge: 'Grand Champion',
    year: 'Awarded 2023',
    description: 'Awarded the grand prize for developing an AI-driven agricultural solution that helps local farmers optimize crop yields and manage resources efficiently.',
    details: [
      'Best in Technical Innovation',
      '₱1M Grant Awardee',
      'Featured in National Tech Magazine'
    ],
    image: bsit3,
    color: 'bg-[#FF3A21]',
    icon: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>'
  }
]

const categories = ['All', ...new Set(recognitions.map(r => r.category))]
const searchQuery = ref('')
const activeCategory = ref('All')

const filteredRecognitions = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return recognitions.filter(recognition => {
    const matchesCategory = activeCategory.value === 'All' || recognition.category === activeCategory.value
    const matchesSearch = !query || 
      recognition.title.toLowerCase().includes(query) || 
      recognition.organization.toLowerCase().includes(query) ||
      recognition.badge.toLowerCase().includes(query)
    
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <!-- Hero Section -->
    <section
      class="relative h-[58vh] flex items-end overflow-hidden bg-[url('https://placehold.co/1920x1080?text=1920x1080')] bg-cover bg-center"
    >
      <!-- <div class="absolute inset-0 bg-linear-to-t from-background via-black/60 to-transparent" /> -->

      <!-- <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-14 animate-fade-in-up">
        <Badge variant="outline" class="mb-6 px-4 py-1.5 text-xs tracking-[0.2em] uppercase rounded-none border-white/20 text-white bg-transparent backdrop-blur-sm">
          Institutional Excellence
        </Badge>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Accreditations &<br class="hidden sm:block" /> Recognitions.
        </h1>
        <p class="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
          A testament to our unwavering commitment to quality education, continuous improvement, and global standards.
        </p>
      </div> -->
    </section>

    <!-- Sticky Toolbar -->
    <section class="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 lg:px-12 py-4 shadow-sm">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        
        <!-- Search Input -->
        <div class="relative w-full md:max-w-md">
          <svg 
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <Input 
            v-model="searchQuery" 
            placeholder="Search accreditations or awards..." 
            class="pl-9 bg-muted/40 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-ring transition-all"
          />
        </div>

        <!-- Category Filters -->
        <div class="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <Button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :variant="activeCategory === cat ? 'default' : 'ghost'"
            size="sm"
            class="whitespace-nowrap"
          >
            {{ cat }}
          </Button>
        </div>
      </div>
    </section>

    <!-- Recognition Grid -->
    <section class="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
      
      <!-- Empty State -->
      <Transition name="fade">
        <div v-if="filteredRecognitions.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
          <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-1">No recognitions found</h3>
          <p class="text-muted-foreground mb-6">We couldn't find anything matching your search criteria.</p>
          <Button 
            @click="searchQuery = ''; activeCategory = 'All'" 
            variant="link"
            size="sm"
          >
            Clear all filters
          </Button>
        </div>
      </Transition>

      <!-- Grid -->
      <TransitionGroup 
        name="list" 
        tag="div" 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        <div 
          v-for="(item, index) in filteredRecognitions" 
          :key="item.id"
          class="group relative aspect-square overflow-hidden cursor-pointer animate-fade-in-up"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <!-- Background Image -->
          <img :src="item.image" class="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
          
          <!-- Color Overlay -->
          <div class="absolute inset-0 mix-blend-multiply opacity-90 transition-opacity duration-300 group-hover:opacity-100" :class="item.color"></div>

          <!-- Content -->
          <div class="absolute inset-0 p-4 sm:p-6 flex flex-col text-white z-10">
            <!-- Header: Number and Title -->
            <div class="flex items-start gap-2 sm:gap-3">
              <span class="text-6xl sm:text-7xl font-black leading-none tracking-tighter">{{ index + 1 }}</span>
              <h3 class="text-lg sm:text-xl font-bold uppercase leading-tight mt-1 sm:mt-2 tracking-wide">
                {{ item.title }}
              </h3>
            </div>
            
            <!-- Icon -->
            <div class="mt-auto flex justify-center sm:justify-start pb-2 sm:pb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="w-20 h-20 sm:w-24 sm:h-24 text-white opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                v-html="item.icon"
              ></svg>
            </div>
            
            <!-- Hover Content Overlay -->
            <div class="absolute inset-0 bg-black/80 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
              <p class="text-sm font-bold text-white mb-2 uppercase tracking-wider">{{ item.badge }}</p>
              <p class="text-xs text-white/80 mb-4">{{ item.organization }}</p>
              <p class="text-sm text-white/90 leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </TransitionGroup>

    </section>
  </div>
</template>

<style scoped>
/* Hide scrollbar for filter container */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
