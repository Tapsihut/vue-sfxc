<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// Import image
const sfxcBuilding = 'https://placehold.co/800x800?text=800x800'

interface Partner {
  id: number
  name: string
  location: string
  partnership: string
  programs: string[]
  established: string
  image: string
  population: string
  impact: string
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'Barangay Lumbia',
    location: 'Cagayan de Oro City',
    partnership: 'Education & Health Programs',
    programs: ['Medical Mission', 'Feeding Program', 'Educational Support'],
    established: 'Since 2020',
    image: sfxcBuilding,
    population: '15,000+',
    impact: '500+ families served'
  },
  {
    id: 2,
    name: 'Barangay Carmen',
    location: 'Cagayan de Oro City',
    partnership: 'Skills Development & Livelihood',
    programs: ['Vocational Training', 'Entrepreneurship Workshop', 'Youth Camp'],
    established: 'Since 2019',
    image: sfxcBuilding,
    population: '20,000+',
    impact: '300+ entrepreneurs trained'
  },
  {
    id: 3,
    name: 'Barangay Bulua',
    location: 'Cagayan de Oro City',
    partnership: 'Environmental Conservation',
    programs: ['Tree Planting', 'Coastal Cleanup', 'Waste Management'],
    established: 'Since 2021',
    image: sfxcBuilding,
    population: '18,000+',
    impact: '10,000+ trees planted'
  },
  {
    id: 4,
    name: 'Barangay Macasandig',
    location: 'Cagayan de Oro City',
    partnership: 'Youth Development',
    programs: ['Leadership Training', 'Sports Clinic', 'Tutorial Program'],
    established: 'Since 2020',
    image: sfxcBuilding,
    population: '12,000+',
    impact: '200+ youth leaders'
  },
  {
    id: 5,
    name: 'Barangay Kauswagan',
    location: 'Cagayan de Oro City',
    partnership: 'Community Health Services',
    programs: ['Health Education', 'Dental Mission', 'Nutrition Program'],
    established: 'Since 2018',
    image: sfxcBuilding,
    population: '25,000+',
    impact: '1,000+ consultations'
  },
  {
    id: 6,
    name: 'Barangay Balulang',
    location: 'Cagayan de Oro City',
    partnership: 'Education & Technology',
    programs: ['Computer Literacy', 'Library Support', 'Scholarship Program'],
    established: 'Since 2021',
    image: sfxcBuilding,
    population: '22,000+',
    impact: '150+ scholars supported'
  },
  {
    id: 7,
    name: 'Barangay Gusa',
    location: 'Cagayan de Oro City',
    partnership: 'Livelihood Support',
    programs: ['Skills Training', 'Microfinance Education', 'Market Linkage'],
    established: 'Since 2019',
    image: sfxcBuilding,
    population: '30,000+',
    impact: '400+ livelihood programs'
  },
  {
    id: 8,
    name: 'Barangay Indahag',
    location: 'Cagayan de Oro City',
    partnership: 'Disaster Preparedness',
    programs: ['Emergency Response', 'First Aid Training', 'Relief Operations'],
    established: 'Since 2020',
    image: sfxcBuilding,
    population: '16,000+',
    impact: '500+ trained responders'
  },
  {
    id: 9,
    name: 'Barangay Lapasan',
    location: 'Cagayan de Oro City',
    partnership: 'Cultural & Arts',
    programs: ['Cultural Exchange', 'Arts Workshop', 'Community Theater'],
    established: 'Since 2022',
    image: sfxcBuilding,
    population: '14,000+',
    impact: '100+ cultural events'
  }
]

const searchQuery = ref('')
const activeFilter = ref('All')
const categories = ['All', 'Education', 'Health', 'Livelihood', 'Environmental', 'Cultural']

const filteredPartners = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return partners.filter(partner => {
    // Check if filter matches partnership type
    let matchesFilter = activeFilter.value === 'All'
    if (!matchesFilter) {
      const partnershipLower = partner.partnership.toLowerCase()
      const filterLower = activeFilter.value.toLowerCase()
      
      // Match specific keywords
      if (filterLower === 'education' && (partnershipLower.includes('education') || partnershipLower.includes('technology'))) {
        matchesFilter = true
      } else if (filterLower === 'health' && partnershipLower.includes('health')) {
        matchesFilter = true
      } else if (filterLower === 'livelihood' && (partnershipLower.includes('livelihood') || partnershipLower.includes('skills'))) {
        matchesFilter = true
      } else if (filterLower === 'environmental' && (partnershipLower.includes('environmental') || partnershipLower.includes('conservation'))) {
        matchesFilter = true
      } else if (filterLower === 'cultural' && (partnershipLower.includes('cultural') || partnershipLower.includes('arts'))) {
        matchesFilter = true
      }
    }
    
    const matchesSearch = !query || 
      partner.name.toLowerCase().includes(query) || 
      partner.partnership.toLowerCase().includes(query) ||
      partner.location.toLowerCase().includes(query)
    
    return matchesFilter && matchesSearch
  })
})
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <!-- Hero Section -->
    <section
      class="relative h-[58vh] flex items-end overflow-hidden bg-[url('https://placehold.co/1920x1080?text=1920x1080')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-linear-to-t from-background via-black/60 to-transparent" />

      <!-- <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-14 animate-fade-in-up">
        <Badge variant="outline" class="mb-6 px-4 py-1.5 text-xs tracking-[0.2em] uppercase rounded-none border-white/20 text-white bg-transparent backdrop-blur-sm">
          Community Partnership
        </Badge>
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
            placeholder="Search barangays or programs..." 
            class="pl-9 bg-muted/40 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-ring transition-all"
          />
        </div>

        <!-- Category Filters -->
        <div class="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <Button
            v-for="cat in categories"
            :key="cat"
            @click="activeFilter = cat"
            :variant="activeFilter === cat ? 'default' : 'ghost'"
            size="sm"
            class="whitespace-nowrap"
          >
            {{ cat }}
          </Button>
        </div>
      </div>
    </section>

    <!-- Partners Grid -->
    <section class="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
      
      <!-- Empty State -->
      <Transition name="fade">
        <div v-if="filteredPartners.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
          <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-1">No partners found</h3>
          <p class="text-muted-foreground mb-6">We couldn't find anything matching your search criteria.</p>
          <Button 
            @click="searchQuery = ''; activeFilter = 'All'" 
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
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Card 
          v-for="(partner, index) in filteredPartners" 
          :key="partner.id"
          class="group relative overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex flex-col md:flex-row h-full">
            <!-- Image -->
            <div class="relative md:w-40 h-48 overflow-hidden bg-muted shrink-0">
              <img 
                :src="partner.image" 
                :alt="partner.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                @error="(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/800x800?text=Partner+Image+800x800'"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-3 left-3">
                <p class="text-xs font-medium text-white/90 uppercase tracking-wider px-2 py-1 bg-black/40 backdrop-blur-sm rounded">
                  Community
                </p>
              </div>
            </div>

            <CardContent class="p-6 flex flex-col flex-1">
              
              <!-- Header -->
              <div class="mb-4">
                <h3 class="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {{ partner.name }}
                </h3>
              </div>

              <!-- Organization -->
              <div class="mb-4">
                <p class="text-sm font-medium text-foreground">{{ partner.partnership }}</p>
                <p class="text-xs text-muted-foreground">{{ partner.location }}</p>
              </div>

              <div class="mt-auto">
                <Separator class="mb-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                
                <!-- Details -->
                <div class="space-y-3 text-sm">
                  <div class="flex items-start gap-3">
                    <span class="text-muted-foreground font-medium w-20 shrink-0 text-xs">Established</span>
                    <span class="text-foreground text-xs">{{ partner.established }}</span>
                  </div>
                  
                  <div class="flex items-start gap-3">
                    <span class="text-muted-foreground font-medium w-20 shrink-0 text-xs">Population</span>
                    <span class="text-foreground text-xs">{{ partner.population }}</span>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="text-muted-foreground font-medium w-20 shrink-0 text-xs">Impact</span>
                    <span class="text-foreground text-xs">{{ partner.impact }}</span>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="text-muted-foreground font-medium w-20 shrink-0 text-xs">Programs</span>
                    <ul class="text-foreground space-y-0.5 text-xs">
                      <li v-for="(program, pIndex) in partner.programs.slice(0, 2)" :key="pIndex" class="line-clamp-1">
                        {{ program }}
                      </li>
                      <li v-if="partner.programs.length > 2" class="text-muted-foreground italic">
                        +{{ partner.programs.length - 2 }} more
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </CardContent>
          </div>
        </Card>
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
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
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
