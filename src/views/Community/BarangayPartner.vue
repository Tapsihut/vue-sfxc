<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'

interface Partner {
  id: number
  name: string
  location: string
  partnership: string
  programs: string[]
  established: string
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'Barangay Lumbia',
    location: 'Cagayan de Oro City',
    partnership: 'Education & Health Programs',
    programs: ['Medical Mission', 'Feeding Program', 'Educational Support'],
    established: '2020'
  },
  {
    id: 2,
    name: 'Barangay Carmen',
    location: 'Cagayan de Oro City',
    partnership: 'Skills Development & Livelihood',
    programs: ['Vocational Training', 'Entrepreneurship Workshop', 'Youth Camp'],
    established: '2019'
  },
  {
    id: 3,
    name: 'Barangay Bulua',
    location: 'Cagayan de Oro City',
    partnership: 'Environmental Conservation',
    programs: ['Tree Planting', 'Coastal Cleanup', 'Waste Management'],
    established: '2021'
  },
  {
    id: 4,
    name: 'Barangay Macasandig',
    location: 'Cagayan de Oro City',
    partnership: 'Youth Development',
    programs: ['Leadership Training', 'Sports Clinic', 'Tutorial Program'],
    established: '2020'
  },
  {
    id: 5,
    name: 'Barangay Kauswagan',
    location: 'Cagayan de Oro City',
    partnership: 'Community Health Services',
    programs: ['Health Education', 'Dental Mission', 'Nutrition Program'],
    established: '2018'
  },
  {
    id: 6,
    name: 'Barangay Balulang',
    location: 'Cagayan de Oro City',
    partnership: 'Education & Technology',
    programs: ['Computer Literacy', 'Library Support', 'Scholarship Program'],
    established: '2021'
  },
  {
    id: 7,
    name: 'Barangay Gusa',
    location: 'Cagayan de Oro City',
    partnership: 'Livelihood Support',
    programs: ['Skills Training', 'Microfinance Education', 'Market Linkage'],
    established: '2019'
  },
  {
    id: 8,
    name: 'Barangay Indahag',
    location: 'Cagayan de Oro City',
    partnership: 'Disaster Preparedness',
    programs: ['Emergency Response', 'First Aid Training', 'Relief Operations'],
    established: '2020'
  },
  {
    id: 9,
    name: 'Barangay Lapasan',
    location: 'Cagayan de Oro City',
    partnership: 'Cultural & Arts',
    programs: ['Cultural Exchange', 'Arts Workshop', 'Community Theater'],
    established: '2022'
  }
]

const selectedPartner = ref<Partner | null>(null)

const openPartnerDetails = (partner: Partner) => {
  selectedPartner.value = partner
}

const closePartnerDetails = () => {
  selectedPartner.value = null
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
            Barangay Partners
          </h1>
          <p class="text-white/90 mt-3 text-lg md:text-xl max-w-2xl">
            Building stronger communities through collaborative partnerships
          </p>
        </div>

        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-8 md:h-16" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Partners Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold">Our Partner Communities</h2>
          <p class="text-muted-foreground mt-2">Working together for community development</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="(partner, index) in partners"
            :key="partner.id"
            class="group cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="openPartnerDetails(partner)"
          >
            <CardContent class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {{ partner.name }}
                  </h3>
                  <p class="text-sm text-muted-foreground">{{ partner.location }}</p>
                </div>
                <span class="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                  Since {{ partner.established }}
                </span>
              </div>

              <div class="space-y-3">
                <div>
                  <h4 class="text-sm font-semibold mb-1">Partnership Focus</h4>
                  <p class="text-sm text-muted-foreground">{{ partner.partnership }}</p>
                </div>

                <div>
                  <h4 class="text-sm font-semibold mb-2">Active Programs</h4>
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="program in partner.programs" 
                      :key="program"
                      class="text-xs bg-muted px-2 py-1 rounded"
                    >
                      {{ program }}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Partner Details Modal -->
    <Transition name="fade">
      <div
        v-if="selectedPartner"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-4"
        @click="closePartnerDetails"
      >
        <div class="min-h-screen flex items-center justify-center">
          <div
            class="relative w-full max-w-2xl bg-background rounded-lg animate-scale-in p-6 md:p-8"
            @click.stop
          >
            <button
              @click="closePartnerDetails"
              class="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>

            <div class="mb-6">
              <div class="flex items-start justify-between mb-2">
                <h2 class="text-3xl font-bold">{{ selectedPartner.name }}</h2>
                <span class="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                  Since {{ selectedPartner.established }}
                </span>
              </div>
              <p class="text-muted-foreground">{{ selectedPartner.location }}</p>
            </div>

            <div class="space-y-6">
              <div>
                <h3 class="font-semibold mb-2">Partnership Focus</h3>
                <p class="text-muted-foreground">{{ selectedPartner.partnership }}</p>
              </div>

              <div>
                <h3 class="font-semibold mb-3">Active Programs</h3>
                <div class="grid md:grid-cols-2 gap-2">
                  <div 
                    v-for="program in selectedPartner.programs" 
                    :key="program"
                    class="flex items-center gap-2"
                  >
                    <span class="w-2 h-2 bg-primary rounded-full"></span>
                    <span class="text-sm">{{ program }}</span>
                  </div>
                </div>
              </div>

              <div class="pt-6 border-t">
                <h3 class="font-semibold mb-3">Partnership Information</h3>
                <p class="text-muted-foreground text-sm mb-4">
                  For more information about our partnership programs or collaboration opportunities, please contact our Community Relations Office.
                </p>
                <div class="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Email:</span>
                    <span class="font-medium">partnerships@sfxc.edu.ph</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Phone:</span>
                    <span class="font-medium">(088) 123-4571</span>
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
  animation: fade-in 0.4s ease-out forwards;
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