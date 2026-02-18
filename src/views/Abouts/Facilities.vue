<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Facility {
  id: number
  name: string
  description: string
  image: string
  features: string[]
}

interface VirtualTourStop {
  id: number
  title: string
  description: string
  image: string
  location: string
}

const facilities: Facility[] = [
  {
    id: 1,
    name: 'Library',
    description: 'Modern library with extensive collection of books, digital resources, and quiet study areas',
    image: '/src/assets/images/sfxc-building.jpg',
    features: ['10,000+ Books', 'Digital Resources', 'Study Rooms', 'Computer Lab']
  },
  {
    id: 2,
    name: 'Science Laboratory',
    description: 'Fully equipped labs for Physics, Chemistry, and Biology experiments',
    image: '/src/assets/images/news/sfxc_application.jpg',
    features: ['Modern Equipment', 'Safety Standards', 'Expert Supervision', 'Hands-on Learning']
  },
  {
    id: 3,
    name: 'Computer Laboratory',
    description: 'State-of-the-art computer facilities with high-speed internet access',
    image: '/src/assets/images/news/sfxc_sacred.jpg',
    features: ['Latest Hardware', 'Fast Internet', 'Software Suite', 'Tech Support']
  },
  {
    id: 4,
    name: 'Sports Complex',
    description: 'Multi-purpose sports facilities for basketball, volleyball, and various activities',
    image: '/src/assets/images/news/sfxc_update.jpg',
    features: ['Basketball Court', 'Volleyball Court', 'Fitness Equipment', 'Outdoor Track']
  },
  {
    id: 5,
    name: 'Chapel',
    description: 'Sacred space for prayer, reflection, and spiritual growth',
    image: '/src/assets/images/sfxc-building.jpg',
    features: ['Daily Mass', 'Quiet Reflection', 'Religious Events', 'Spiritual Guidance']
  },
  {
    id: 6,
    name: 'Cafeteria',
    description: 'Clean and spacious dining area serving nutritious meals',
    image: '/src/assets/images/news/sfxc_application.jpg',
    features: ['Healthy Meals', 'Spacious Seating', 'Affordable Prices', 'Clean Environment']
  }
]

const virtualTourStops: VirtualTourStop[] = [
  {
    id: 1,
    title: 'Main Building',
    description: 'Explore our iconic main building featuring modern classrooms and administrative offices',
    image: '/src/assets/images/sfxc-building.jpg',
    location: 'Campus Center'
  },
  {
    id: 2,
    title: 'Academic Wing',
    description: 'State-of-the-art classrooms equipped with smart boards and comfortable seating',
    image: '/src/assets/images/news/sfxc_application.jpg',
    location: 'East Wing'
  },
  {
    id: 3,
    title: 'Campus Grounds',
    description: 'Beautiful landscaped gardens and outdoor spaces for relaxation and activities',
    image: '/src/assets/images/news/sfxc_sacred.jpg',
    location: 'Outdoor Area'
  },
  {
    id: 4,
    title: 'Student Hub',
    description: 'Central gathering space for student activities, events, and collaboration',
    image: '/src/assets/images/news/sfxc_update.jpg',
    location: 'West Wing'
  }
]

const selectedTourStop = ref<VirtualTourStop | null>(null)
const currentTourIndex = ref(0)

const openTourStop = (stop: VirtualTourStop) => {
  selectedTourStop.value = stop
  currentTourIndex.value = virtualTourStops.findIndex(s => s.id === stop.id)
}

const closeTourStop = () => {
  selectedTourStop.value = null
}

const nextTourStop = () => {
  currentTourIndex.value = (currentTourIndex.value + 1) % virtualTourStops.length
  selectedTourStop.value = virtualTourStops[currentTourIndex.value] || null
}

const previousTourStop = () => {
  currentTourIndex.value = (currentTourIndex.value - 1 + virtualTourStops.length) % virtualTourStops.length
  selectedTourStop.value = virtualTourStops[currentTourIndex.value] || null
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
            Campus Facilities
          </h1>
          <p class="text-white/90 mt-3 text-lg md:text-xl max-w-2xl">
            Discover our world-class facilities designed for excellence in education
          </p>
        </div>

        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-8 md:h-16" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Facilities Grid -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold">Our Facilities</h2>
          <p class="text-muted-foreground mt-2">Modern amenities for a complete learning experience</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="(facility, index) in facilities"
            :key="facility.id"
            class="group overflow-hidden hover:shadow-xl transition-all duration-500 animate-fade-in"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <!-- Facility Image -->
            <div class="relative overflow-hidden h-56">
              <img
                :src="facility.image"
                :alt="facility.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"></div>

              <!-- Title Overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="text-2xl font-bold text-white">{{ facility.name }}</h3>
              </div>
            </div>

            <CardContent class="p-6">
              <p class="text-muted-foreground mb-4">{{ facility.description }}</p>
              
              <!-- Features List -->
              <div class="space-y-2">
                <p class="text-sm font-semibold text-foreground mb-2">Key Features:</p>
                <div class="grid grid-cols-2 gap-2">
                  <div
                    v-for="(feature, idx) in facility.features"
                    :key="idx"
                    class="flex items-center text-sm text-muted-foreground"
                  >
                    <svg class="w-4 h-4 mr-2 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{{ feature }}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Virtual Tour Section -->
    <section class="py-16 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold">Virtual Campus Tour</h2>
          <p class="text-muted-foreground mt-2">Take a guided tour through our beautiful campus</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <Card
            v-for="(stop, index) in virtualTourStops"
            :key="stop.id"
            class="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 animate-slide-in"
            :style="{ animationDelay: `${index * 150}ms` }"
            @click="openTourStop(stop)"
          >
            <div class="relative overflow-hidden h-64">
              <img
                :src="stop.image"
                :alt="stop.title"
                class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
              />
              
              <!-- Location Badge -->
              <div class="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>{{ stop.location }}</span>
              </div>

              <!-- Play Icon Overlay -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <div class="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <CardContent class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ stop.title }}</h3>
              <p class="text-muted-foreground">{{ stop.description }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Virtual Tour Modal -->
    <Transition name="fade">
      <div
        v-if="selectedTourStop"
        class="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-sm"
        @click="closeTourStop"
      >
        <div class="min-h-screen flex items-center justify-center p-4">
          <!-- Close Button -->
          <Button
            variant="ghost"
            size="icon"
            class="fixed top-4 right-4 text-white hover:bg-white/20 z-20 w-12 h-12"
            @click="closeTourStop"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </Button>

          <!-- Navigation Buttons -->
          <Button
            variant="ghost"
            size="icon"
            class="fixed left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20 w-12 h-12"
            @click.stop="previousTourStop"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            class="fixed right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20 w-12 h-12"
            @click.stop="nextTourStop"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Button>

          <!-- Content -->
          <div
            class="relative w-full max-w-6xl animate-scale-in"
            @click.stop
          >
            <!-- Image -->
            <div class="relative aspect-video overflow-hidden rounded-lg mb-6">
              <img
                :src="selectedTourStop.image"
                :alt="selectedTourStop.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full font-medium flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>{{ selectedTourStop.location }}</span>
              </div>
            </div>

            <!-- Info -->
            <div class="bg-background rounded-lg p-6">
              <div class="mb-4">
                <h2 class="text-3xl font-bold mb-2">{{ selectedTourStop.title }}</h2>
                <p class="text-muted-foreground text-lg">{{ selectedTourStop.description }}</p>
              </div>
              
              <div class="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <span>{{ currentTourIndex + 1 }} / {{ virtualTourStops.length }}</span>
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
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-in {
  animation: slide-in 0.8s ease-out forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scale-in 0.4s ease-out;
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
