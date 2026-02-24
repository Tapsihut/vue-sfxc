<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

interface Office {
  id: string
  name: string
  department: string
  email: string
  email2?: string
  phone: string
}

const offices: Office[] = [
  // A. Colleges
  {
    id: 'ccje',
    name: 'CCJE',
    department: 'A. Colleges',
    email: 'ccje@sfxc.edu.ph',
    phone: '0908 885 5383'
  },
  {
    id: 'cte',
    name: 'CTE',
    department: 'A. Colleges',
    email: 'cte@sfxc.edu.ph',
    phone: '0908 885 6149'
  },
  {
    id: 'cbe-bsa',
    name: 'CBE (BSA/AT)',
    department: 'A. Colleges',
    email: 'bsa@sfxc.edu.ph',
    phone: '0908 885 5381'
  },
  {
    id: 'bsba',
    name: 'BSBA',
    department: 'A. Colleges',
    email: 'bsba@sfxc.edu.ph',
    phone: '0908 885 5334'
  },
  {
    id: 'bsit',
    name: 'BSIT',
    department: 'A. Colleges',
    email: 'bsit@sfxc.edu.ph',
    phone: '0908 885 5376'
  },
  {
    id: 'bsoa',
    name: 'BSOA',
    department: 'A. Colleges',
    email: '',
    phone: '0908 885 5359'
  },
  // B. Accounting & Finance
  {
    id: 'accounting',
    name: 'Accounting Office',
    department: 'B. Accounting & Finance',
    email: 'accountingoffice@sfxc.edu.ph',
    phone: '0908 885 3694'
  },
  {
    id: 'finance',
    name: 'Finance Office',
    department: 'B. Accounting & Finance',
    email: 'financeoffice@sfxc.edu.ph',
    phone: '0908 885 4520'
  },
  {
    id: 'property',
    name: 'Property & Merchandising Office',
    department: 'B. Accounting & Finance',
    email: 'merchandising@sfxc.edu.ph',
    phone: '0908 885 4521'
  },
  {
    id: 'student-accounts',
    name: 'Student Accounts',
    department: 'B. Accounting & Finance',
    email: 'studentaccounts@sfxc.edu.ph',
    phone: '0966 720 9527'
  },
  {
    id: 'helpdesk',
    name: 'Account Help Desk',
    department: 'B. Accounting & Finance',
    email: 'accounthelpdesk@sfxc.edu.ph',
    phone: ''
  },
  // C. Academics Support
  {
    id: 'osas',
    name: 'OSAS',
    department: 'C. Academics Support',
    email: 'osas@sfxc.edu.ph',
    phone: '0908 885 6201'
  },
  {
    id: 'guidance',
    name: 'Guidance Counseling',
    department: 'C. Academics Support',
    email: 'guidanceoffice@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'gender',
    name: 'Gender Development',
    department: 'C. Academics Support',
    email: 'genderdevelopment@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'registrar',
    name: 'Registrar Office',
    department: 'C. Academics Support',
    email: 'registraroffice@sfxc.edu.ph',
    phone: '0908 885 3687'
  },
  {
    id: 'admission',
    name: 'Admission Scholarship',
    department: 'C. Academics Support',
    email: 'admission.scholarship@sfxc.edu.ph',
    email2: 'scholarships@sfxc.edu.ph',
    phone: '0908 885 4527'
  },
  // D. Department/Offices
  {
    id: 'hr',
    name: 'Human Resources Department',
    department: 'D. Department/Offices',
    email: 'humanresources@sfxc.edu.ph',
    email2: 'recruitment@sfxc.edu.ph',
    phone: '0939 936 5618'
  },
  {
    id: 'communications',
    name: 'Information and Communications',
    department: 'D. Department/Offices',
    email: 'communications@sfxc.edu.ph',
    email2: 'gclassroom_ico@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'marketing',
    name: 'Marketing Office',
    department: 'D. Department/Offices',
    email: 'marketing@sfxc.edu.ph',
    phone: '0908 885 5380'
  },
  {
    id: 'community',
    name: 'Community Development Services',
    department: 'D. Department/Offices',
    email: 'communityextension@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'evp',
    name: 'EVP Operations',
    department: 'D. Department/Offices',
    email: 'evp.operations@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'library',
    name: 'Library',
    department: 'D. Department/Offices',
    email: 'library@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'research',
    name: 'Research Office',
    department: 'D. Department/Offices',
    email: 'researchdev@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'clinic',
    name: 'School Clinic',
    department: 'D. Department/Offices',
    email: 'clinic@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'compliance',
    name: 'SFXC Compliance',
    department: 'D. Department/Offices',
    email: 'compliance@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'student-accounts-dept',
    name: 'Student Accounts',
    department: 'D. Department/Offices',
    email: 'studentaccounts@sfxc.edu.ph',
    phone: ''
  },
  {
    id: 'techvoc',
    name: 'TechVoc',
    department: 'D. Department/Offices',
    email: 'techvoc@sfxc.edu.ph',
    phone: ''
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
      office.email.toLowerCase().includes(query) ||
      (office.email2 && office.email2.toLowerCase().includes(query))
    
    return matchesDept && matchesSearch
  })
})
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <!-- ─── Hero Section ─────────────────────────────────────── -->
    <section
      class="relative h-[58vh] flex items-end overflow-hidden bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center mb-12"
    >
      <div class="absolute inset-0 bg-linear-to-t from-background via-black/60 to-transparent" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-14 animate-fade-in-up">
        <div class="inline-flex items-center rounded-full border border-white/20 bg-transparent backdrop-blur-sm px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-white mb-6">
          Directory
        </div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Connect with<br class="hidden sm:block" /> our offices.
        </h1>
        <p class="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
          Find the right department, contact key personnel, and access essential campus services instantly.
        </p>
      </div>
    </section>

    <!-- Main Content Grid -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start px-6 lg:px-12">
      
      <!-- Left Column: Search & Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Search Card -->
        <Card>
          <CardHeader>
            <CardTitle>Search Directory</CardTitle>
            <CardDescription>Filter by name, email, or department.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-5">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <Input v-model="searchQuery" placeholder="Search offices..." class="pl-9 bg-transparent" />
            </div>
            <div class="flex flex-wrap gap-2">
              <Button 
                v-for="dept in departments" 
                :key="dept"
                :variant="activeDept === dept ? 'default' : 'outline'"
                size="sm"
                class="rounded-full"
                @click="activeDept = dept"
              >
                {{ dept.replace(/^[A-Z]\.\s/, '') }}
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Campus Info Card -->
        <Card>
          <CardHeader>
            <CardTitle>Main Campus</CardTitle>
            <CardDescription>St. Francis Xavier College</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4 text-sm">
            <div class="flex items-start gap-3">
              <svg class="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span class="text-foreground">Barangay 5, San Francisco,<br/>Agusan del Sur, Philippines 8501</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="h-4 w-4 text-muted-foreground shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span class="text-foreground">+63 85 8390321 | +63 85 9855006</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="h-4 w-4 text-muted-foreground shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span class="text-foreground">Mon - Fri, 8:00 AM - 5:00 PM</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Right Column: Directory List -->
      <div class="lg:col-span-3">
        <Card class="h-175 flex flex-col overflow-hidden">
          <CardHeader class="border-b border-border/40 bg-muted/10 pb-4">
            <CardTitle>Departments & Offices</CardTitle>
            <CardDescription>Showing {{ filteredOffices.length }} result(s)</CardDescription>
          </CardHeader>
          <CardContent class="flex-1 overflow-y-auto custom-scrollbar p-0">
            <div class="divide-y divide-border/40">
              <div v-for="office in filteredOffices" :key="office.id" class="p-6 hover:bg-muted/20 transition-colors">
                <h3 class="text-lg font-semibold text-foreground mb-1">{{ office.name }}</h3>
                <p class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  {{ office.department.replace(/^[A-Z]\.\s/, '') }}
                </p>
                <div class="space-y-2 text-sm text-muted-foreground">
                  <div v-if="office.phone" class="flex items-center gap-3">
                    <svg class="h-4 w-4 text-foreground/70 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span class="text-foreground">{{ office.phone }}</span>
                  </div>
                  <div v-if="office.email" class="flex items-start gap-3">
                    <svg class="h-4 w-4 mt-0.5 text-foreground/70 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <div class="flex flex-col gap-1">
                      <a :href="`mailto:${office.email}`" class="text-foreground hover:text-primary hover:underline transition-colors break-all">{{ office.email }}</a>
                      <a v-if="office.email2" :href="`mailto:${office.email2}`" class="text-foreground hover:text-primary hover:underline transition-colors break-all">{{ office.email2 }}</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Empty State -->
              <div v-if="filteredOffices.length === 0" class="p-12 flex flex-col items-center justify-center text-center">
                <div class="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <h3 class="text-lg font-medium text-foreground mb-1">No offices found</h3>
                <p class="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: hsl(var(--border));
  border-radius: 10px;
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--border)) transparent;
}
</style>