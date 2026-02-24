<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Opportunity {
  id: number
  title: string
  category: 'Education' | 'Health' | 'Environment' | 'Community' | 'Events'
  description: string
  date: string
  duration: string
  volunteers: string
  location: string
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'Tutorial Program Volunteer',
    category: 'Education',
    description: 'Help underprivileged children with their homework and provide academic support.',
    date: 'Ongoing',
    duration: '2-3 hours/week',
    volunteers: '10 needed',
    location: 'Partner Elementary Schools'
  },
  {
    id: 2,
    title: 'Medical Mission Assistant',
    category: 'Health',
    description: 'Support healthcare professionals during medical missions in rural communities.',
    date: 'March 15, 2026',
    duration: '1 day',
    volunteers: '15 needed',
    location: 'Barangay Lumbia'
  },
  {
    id: 3,
    title: 'Tree Planting Volunteer',
    category: 'Environment',
    description: 'Join our environmental conservation efforts by planting trees in designated areas.',
    date: 'March 22, 2026',
    duration: 'Half day',
    volunteers: '50 needed',
    location: 'Coastal Areas'
  },
  {
    id: 4,
    title: 'Feeding Program Helper',
    category: 'Community',
    description: 'Assist in meal preparation and distribution for malnourished children.',
    date: 'Every Saturday',
    duration: '3-4 hours',
    volunteers: '8 needed',
    location: 'Various Barangays'
  },
  {
    id: 5,
    title: 'Sports Clinic Coach',
    category: 'Community',
    description: 'Teach basic sports skills and organize games for youth in partner communities.',
    date: 'April 5-7, 2026',
    duration: '3 days',
    volunteers: '12 needed',
    location: 'SFXC Sports Complex'
  },
  {
    id: 6,
    title: 'Event Coordinator Assistant',
    category: 'Events',
    description: 'Help organize and manage community events and outreach activities.',
    date: 'As needed',
    duration: 'Flexible',
    volunteers: '5 needed',
    location: 'Various Locations'
  }
]

const categories = ['All', 'Education', 'Health', 'Environment', 'Community', 'Events']
const selectedCategory = ref('All')
const selectedOpportunity = ref<Opportunity | null>(null)

const filteredOpportunities = ref(
  selectedCategory.value === 'All' 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedCategory.value)
)

const filterByCategory = (category: string) => {
  selectedCategory.value = category
  filteredOpportunities.value = category === 'All' 
    ? opportunities 
    : opportunities.filter(opp => opp.category === category)
}

const openOpportunityDetails = (opportunity: Opportunity) => {
  selectedOpportunity.value = opportunity
}

const closeOpportunityDetails = () => {
  selectedOpportunity.value = null
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Header -->
    <section class="relative">
      <div
        class="h-[50vh] md:h-[60vh] flex flex-col relative bg-[url('https://placehold.co/1920x1080?text=1920x1080')] bg-cover bg-center bg-no-repeat"
      >
        <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-tertiary/40 to-transparent"></div>

        <!-- <div class="relative z-10 mt-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Volunteer Opportunities
          </h1>
          <p class="text-white/90 mt-3 text-lg md:text-xl max-w-2xl">
            Make a difference in the community through volunteer service
          </p>
        </div> -->

        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-8 md:h-16" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="category in categories"
            :key="category"
            :variant="selectedCategory === category ? 'default' : 'outline'"
            size="sm"
            @click="filterByCategory(category)"
          >
            {{ category }}
          </Button>
        </div>
      </div>
    </section>

    <!-- Opportunities Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold">Current Opportunities</h2>
          <p class="text-muted-foreground mt-2">Find the perfect volunteer role for you</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="(opportunity, index) in filteredOpportunities"
            :key="opportunity.id"
            class="group cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="openOpportunityDetails(opportunity)"
          >
            <CardContent class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {{ opportunity.title }}
                  </h3>
                  <span class="inline-block text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {{ opportunity.category }}
                  </span>
                </div>
              </div>

              <p class="text-sm text-muted-foreground mb-4">{{ opportunity.description }}</p>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Date:</span>
                  <span class="font-medium">{{ opportunity.date }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Duration:</span>
                  <span class="font-medium">{{ opportunity.duration }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Volunteers:</span>
                  <span class="font-medium">{{ opportunity.volunteers }}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Empty State -->
        <div v-if="filteredOpportunities.length === 0" class="text-center py-16">
          <p class="text-muted-foreground text-lg">No opportunities available in this category</p>
        </div>
      </div>
    </section>

    <!-- Opportunity Details Modal -->
    <Transition name="fade">
      <div
        v-if="selectedOpportunity"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-4"
        @click="closeOpportunityDetails"
      >
        <div class="min-h-screen flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            class="fixed top-4 right-4 text-white hover:bg-white/20 z-10"
            @click="closeOpportunityDetails"
          >
            ✕
          </Button>

          <div
            class="relative w-full max-w-2xl bg-background rounded-lg animate-scale-in p-6 md:p-8"
            @click.stop
          >
            <div class="mb-6">
              <h2 class="text-3xl font-bold mb-3">{{ selectedOpportunity.title }}</h2>
              <span class="inline-block text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                {{ selectedOpportunity.category }}
              </span>
            </div>

            <div class="space-y-6">
              <div>
                <h3 class="font-semibold mb-2">Description</h3>
                <p class="text-muted-foreground">{{ selectedOpportunity.description }}</p>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold mb-1">Date</h4>
                  <p class="text-muted-foreground">{{ selectedOpportunity.date }}</p>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Duration</h4>
                  <p class="text-muted-foreground">{{ selectedOpportunity.duration }}</p>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Volunteers Needed</h4>
                  <p class="text-muted-foreground">{{ selectedOpportunity.volunteers }}</p>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Location</h4>
                  <p class="text-muted-foreground">{{ selectedOpportunity.location }}</p>
                </div>
              </div>

              <div class="pt-6 border-t">
                <h3 class="font-semibold mb-3">Sign Up Information</h3>
                <p class="text-muted-foreground text-sm mb-4">
                  To register as a volunteer for this opportunity, please contact our Community Outreach Office.
                </p>
                <div class="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Email:</span>
                    <span class="font-medium">volunteers@sfxc.edu.ph</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Phone:</span>
                    <span class="font-medium">(088) 123-4572</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Office Hours:</span>
                    <span class="font-medium">Mon-Fri, 8AM-5PM</span>
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