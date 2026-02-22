<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Office {
  id: string
  name: string
  department: string
  head: string
  role: string
  email: string
  phone: string
  location: string
  hours: string
}

const offices: Office[] = [
  {
    id: 'pres',
    name: 'Office of the President',
    department: 'Administration',
    head: 'Rev. Fr. Juan dela Cruz',
    role: 'School President',
    email: 'president@sfxc.edu.ph',
    phone: '(062) 991-0001',
    location: 'Main Building, 2nd Floor',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM'
  },
  {
    id: 'reg',
    name: 'Registrar\'s Office',
    department: 'Academic Affairs',
    head: 'Ms. Maria Santos',
    role: 'University Registrar',
    email: 'registrar@sfxc.edu.ph',
    phone: '(062) 991-0002',
    location: 'Main Building, 1st Floor',
    hours: 'Mon–Fri, 7:30 AM – 4:30 PM'
  },
  {
    id: 'adm',
    name: 'Admissions Office',
    department: 'Academic Affairs',
    head: 'Mr. Jose Reyes',
    role: 'Admissions Director',
    email: 'admissions@sfxc.edu.ph',
    phone: '(062) 991-0003',
    location: 'Main Building, 1st Floor',
    hours: 'Mon–Sat, 8:00 AM – 5:00 PM'
  },
  {
    id: 'fin',
    name: 'Finance & Accounting',
    department: 'Finance',
    head: 'Ms. Ana Lim',
    role: 'Finance Officer',
    email: 'finance@sfxc.edu.ph',
    phone: '(062) 991-0004',
    location: 'Finance Building, Ground Floor',
    hours: 'Mon–Fri, 8:00 AM – 4:00 PM'
  },
  {
    id: 'sao',
    name: 'Student Affairs Office',
    department: 'Student Services',
    head: 'Mr. Carlos Mendoza',
    role: 'Dean of Student Affairs',
    email: 'studentaffairs@sfxc.edu.ph',
    phone: '(062) 991-0005',
    location: 'Student Center, 1st Floor',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM'
  },
  {
    id: 'guid',
    name: 'Guidance & Counseling',
    department: 'Student Services',
    head: 'Ms. Rosa Garcia',
    role: 'Guidance Counselor',
    email: 'guidance@sfxc.edu.ph',
    phone: '(062) 991-0006',
    location: 'Student Center, 2nd Floor',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM'
  },
  {
    id: 'hr',
    name: 'Human Resources',
    department: 'Administration',
    head: 'Ms. Elena Torres',
    role: 'HR Director',
    email: 'hr@sfxc.edu.ph',
    phone: '(062) 991-0007',
    location: 'Admin Building, 2nd Floor',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM'
  },
  {
    id: 'lib',
    name: 'Library Services',
    department: 'Academic Affairs',
    head: 'Mr. Ramon Villanueva',
    role: 'Head Librarian',
    email: 'library@sfxc.edu.ph',
    phone: '(062) 991-0008',
    location: 'Library Building',
    hours: 'Mon–Sat, 7:00 AM – 6:00 PM'
  }
]

const departments = ['All', ...new Set(offices.map(o => o.department))]
const searchQuery = ref('')
const activeDept = ref('All')

const filteredOffices = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return offices.filter(office => {
    const matchesDept = activeDept.value === 'All' || office.department === activeDept.value
    const matchesSearch = !query || 
      office.name.toLowerCase().includes(query) || 
      office.head.toLowerCase().includes(query) ||
      office.role.toLowerCase().includes(query)
    
    return matchesDept && matchesSearch
  })
})
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <!-- ─── Hero Section ─────────────────────────────────────── -->
    <section
      class="relative h-[58vh] flex items-end overflow-hidden bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-linear-to-t from-background via-black/60 to-transparent" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-14 animate-fade-in-up">
        <Badge variant="outline" class="mb-6 px-4 py-1.5 text-xs tracking-[0.2em] uppercase rounded-none border-white/20 text-white bg-transparent backdrop-blur-sm">
          Directory
        </Badge>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Connect with<br class="hidden sm:block" /> our offices.
        </h1>
        <p class="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
          Find the right department, contact key personnel, and access essential campus services instantly.
        </p>
      </div>
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
            placeholder="Search offices or personnel..." 
            class="pl-9 bg-muted/40 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-ring transition-all"
          />
        </div>

        <!-- Department Filters -->
        <div class="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <button
            v-for="dept in departments"
            :key="dept"
            @click="activeDept = dept"
            class="px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200"
            :class="activeDept === dept 
              ? 'bg-foreground text-background shadow-sm' 
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
          >
            {{ dept }}
          </button>
        </div>
      </div>
    </section>

    <!-- Directory Grid -->
    <section class="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
      
      <!-- Empty State -->
      <Transition name="fade">
        <div v-if="filteredOffices.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
          <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-1">No offices found</h3>
          <p class="text-muted-foreground mb-6">We couldn't find anything matching your search criteria.</p>
          <button 
            @click="searchQuery = ''; activeDept = 'All'" 
            class="text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            Clear all filters
          </button>
        </div>
      </Transition>

      <!-- Grid -->
      <TransitionGroup 
        name="list" 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Card 
          v-for="(office, index) in filteredOffices" 
          :key="office.id"
          class="group relative overflow-hidden border-border/40 bg-card/40 hover:bg-card hover:border-border/80 hover:shadow-md transition-all duration-300 animate-fade-in-up"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <CardContent class="p-6 flex flex-col h-full">
            
            <!-- Header -->
            <div class="mb-6">
              <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {{ office.department }}
              </p>
              <h3 class="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {{ office.name }}
              </h3>
            </div>

            <!-- Personnel -->
            <div class="mb-6">
              <p class="text-base font-medium text-foreground">{{ office.head }}</p>
              <p class="text-sm text-muted-foreground">{{ office.role }}</p>
            </div>

            <div class="mt-auto">
              <Separator class="mb-5 opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <!-- Details -->
              <div class="space-y-4 text-sm">
                <div class="flex items-start gap-3">
                  <span class="text-muted-foreground font-medium w-16 shrink-0">Contact</span>
                  <div class="flex flex-col gap-1">
                    <a :href="`mailto:${office.email}`" class="text-foreground hover:text-primary transition-colors">{{ office.email }}</a>
                    <span class="text-foreground">{{ office.phone }}</span>
                  </div>
                </div>
                
                <div class="flex items-start gap-3">
                  <span class="text-muted-foreground font-medium w-16 shrink-0">Location</span>
                  <span class="text-foreground">{{ office.location }}</span>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-muted-foreground font-medium w-16 shrink-0">Hours</span>
                  <span class="text-foreground">{{ office.hours }}</span>
                </div>
              </div>
            </div>

          </CardContent>
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