<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Import images
import sfxcBuilding from '@/assets/images/sfxc-building.jpg'
import sfxcApplication from '@/assets/images/news/sfxc_application.jpg'
import sfxcSacred from '@/assets/images/news/sfxc_sacred.jpg'
import sfxcUpdate from '@/assets/images/news/sfxc_update.jpg'

interface Program {
  id: number
  title: string
  description: string
  image: string
  date: string
  location: string
  beneficiaries: string
}

const programs: Program[] = [
  {
    id: 1,
    title: 'Medical Mission',
    description: 'Free medical checkups, consultations, and medicine distribution to underserved communities.',
    image: sfxcBuilding,
    date: 'March 15, 2026',
    location: 'Barangay Lumbia',
    beneficiaries: '500+ residents'
  },
  {
    id: 2,
    title: 'Educational Support Program',
    description: 'Providing school supplies, books, and tutoring sessions for underprivileged children.',
    image: sfxcApplication,
    date: 'April 5, 2026',
    location: 'Rural Elementary Schools',
    beneficiaries: '300+ students'
  },
  {
    id: 3,
    title: 'Feeding Program',
    description: 'Nutritious meals and nutrition education for malnourished children and families.',
    image: sfxcSacred,
    date: 'Monthly',
    location: 'Various Barangays',
    beneficiaries: '200+ children'
  },
  {
    id: 4,
    title: 'Skills Training Workshop',
    description: 'Free vocational training in livelihood skills like sewing, cooking, and crafts.',
    image: sfxcUpdate,
    date: 'May 10-12, 2026',
    location: 'SFXC Campus',
    beneficiaries: '150+ participants'
  },
  {
    id: 5,
    title: 'Environmental Cleanup Drive',
    description: 'Tree planting and coastal cleanup activities to promote environmental awareness.',
    image: sfxcBuilding,
    date: 'June 8, 2026',
    location: 'Coastal Areas',
    beneficiaries: 'Community-wide'
  },
  {
    id: 6,
    title: 'Youth Leadership Camp',
    description: 'Character building and leadership training for youth from partner communities.',
    image: sfxcApplication,
    date: 'July 20-22, 2026',
    location: 'SFXC Campus',
    beneficiaries: '100+ youth'
  }
]

const selectedProgram = ref<Program | null>(null)

const openProgramDetails = (program: Program) => {
  selectedProgram.value = program
}

const closeProgramDetails = () => {
  selectedProgram.value = null
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Header -->
    <section class="relative">
      <div
        class="h-[50vh] md:h-[60vh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-tertiary/40 to-transparent"></div>

        <div class="relative z-10 mt-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Community Outreach Programs
          </h1>
          <p class="text-white/90 mt-3 text-lg md:text-xl max-w-2xl">
            Serving communities through education, healthcare, and sustainable development
          </p>
        </div>

        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-8 md:h-16" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Programs Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold">Our Programs</h2>
          <p class="text-muted-foreground mt-2">Making a difference in the community</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="(program, index) in programs"
            :key="program.id"
            class="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in"
            :style="{ animationDelay: `${index * 75}ms` }"
            @click="openProgramDetails(program)"
          >
            <div class="relative overflow-hidden h-56">
              <img
                :src="program.image"
                :alt="program.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold">{{ program.title }}</h3>
              </div>
            </div>
            <CardContent class="p-6">
              <p class="text-sm text-muted-foreground mb-4">{{ program.description }}</p>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Date:</span>
                  <span class="font-medium">{{ program.date }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Location:</span>
                  <span class="font-medium">{{ program.location }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Beneficiaries:</span>
                  <span class="font-medium">{{ program.beneficiaries }}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Program Details Modal -->
    <Transition name="fade">
      <div
        v-if="selectedProgram"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-4"
        @click="closeProgramDetails"
      >
        <div class="min-h-screen flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            class="fixed top-4 right-4 text-white hover:bg-white/20 z-10"
            @click="closeProgramDetails"
          >
            ✕
          </Button>

          <div
            class="relative w-full max-w-3xl bg-background rounded-lg animate-scale-in overflow-hidden"
            @click.stop
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :src="selectedProgram.image"
                :alt="selectedProgram.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 class="text-3xl font-bold">{{ selectedProgram.title }}</h2>
              </div>
            </div>

            <div class="p-6 md:p-8">
              <p class="text-muted-foreground mb-6">{{ selectedProgram.description }}</p>

              <div class="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 class="font-semibold mb-1">Date</h4>
                  <p class="text-muted-foreground">{{ selectedProgram.date }}</p>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Location</h4>
                  <p class="text-muted-foreground">{{ selectedProgram.location }}</p>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Beneficiaries</h4>
                  <p class="text-muted-foreground">{{ selectedProgram.beneficiaries }}</p>
                </div>
              </div>

              <div class="pt-6 border-t">
                <h4 class="font-semibold mb-3">Get Involved</h4>
                <p class="text-muted-foreground text-sm mb-4">
                  Interested in volunteering or supporting this program? Contact our Community Outreach Office for more information.
                </p>
                <div class="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Email:</span>
                    <span class="font-medium">outreach@sfxc.edu.ph</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Phone:</span>
                    <span class="font-medium">(088) 123-4570</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
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
