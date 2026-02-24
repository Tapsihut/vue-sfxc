<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { User, Calendar } from 'lucide-vue-next'

// Import images
const sfxcBuilding = 'https://placehold.co/1280x720?text=1280x720'
const sfxcApplication = 'https://placehold.co/800x600?text=800x600'
const sfxcSacred = 'https://placehold.co/800x600?text=800x600'
const sfxcUpdate = 'https://placehold.co/800x600?text=800x600'

interface Program {
  id: number
  title: string
  description: string
  image: string
  date: string
  author: string
  category: string
}

const latestPrograms: Program[] = [
  {
    id: 1,
    title: '#ShapedbySFXC: The third choice that led an alumna to become psych\'s first international scholar',
    description: 'Narratives of redirection amidst uncertainties have long been familiar in the landscape of feature stories....',
    image: sfxcApplication,
    date: 'February 19, 2026',
    author: 'SFXC',
    category: 'Feature'
  },
  {
    id: 2,
    title: 'Golden Paddlers elevate SDG involvement in TINGUHA 2026',
    description: 'Golden Paddlers, through the University Student Government (USG) continues to advance its commitment to sustainable...',
    image: sfxcSacred,
    date: 'February 16, 2026',
    author: 'SFXC',
    category: 'Updates'
  },
  {
    id: 3,
    title: 'SFXC co-hosts international colloquium on SDGs',
    description: 'San Francisco, Agusan del Sur — St Francis Xavier College (SFXC) joined leading Higher Education Institutions in co-hosting the...',
    image: sfxcUpdate,
    date: 'February 16, 2026',
    author: 'SFXC',
    category: 'Updates'
  },
  {
    id: 4,
    title: 'Medical Mission',
    description: 'Free medical checkups, consultations, and medicine distribution to underserved communities.',
    image: sfxcBuilding,
    date: 'March 15, 2026',
    author: 'SFXC',
    category: 'Feature'
  },
  {
    id: 5,
    title: 'Educational Support Program',
    description: 'Providing school supplies, books, and tutoring sessions for underprivileged children.',
    image: sfxcApplication,
    date: 'April 5, 2026',
    author: 'SFXC',
    category: 'Updates'
  },
  {
    id: 6,
    title: 'Feeding Program',
    description: 'Nutritious meals and nutrition education for malnourished children and families.',
    image: sfxcSacred,
    date: 'Monthly',
    author: 'SFXC',
    category: 'Updates'
  }
]

const featuredProgram: Program = {
  id: 7,
  title: '#ShapedbySFXC: The third choice that led an alumna to become psych\'s first international scholar',
  description: 'Narratives of redirection amidst uncertainties have long been familiar in the landscape of feature stories. It has always been the path chosen beyond desire, and setting it as the foreground for inspiration. Yet, a psychology alumna from St Francis Xavier College...',
  image: sfxcBuilding,
  date: 'February 19, 2026',
  author: 'SFXC',
  category: 'Feature'
}
</script>

<template>
  <div class="min-h-screen bg-background py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      <section>
        <h2 class="text-3xl font-bold text-green-950 mb-6">Featured Release</h2>
        <div class="grid lg:grid-cols-3 gap-6">
          <!-- Main Featured Card -->
          <Card class="lg:col-span-2 overflow-hidden border-green-200 rounded-xl relative group cursor-pointer">
            <div class="absolute inset-0">
              <img :src="featuredProgram.image" :alt="featuredProgram.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-linear-to-t from-green-950/90 via-green-950/40 to-transparent"></div>
            </div>
            <CardContent class="relative h-full min-h-100 flex flex-col justify-end p-8 text-white">
              <div class="mb-4">
                <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-bold bg-green-50 text-green-900 border-l-4 border-yellow-400">
                  {{ featuredProgram.category }}
                </span>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                {{ featuredProgram.title }}
              </h3>
              <p class="text-white/90 line-clamp-3">
                {{ featuredProgram.description }}
              </p>
            </CardContent>
          </Card>

          <!-- Side Card -->
          <!-- <Card class="overflow-hidden border-green-200 rounded-xl flex flex-col">
            <div class="bg-green-950 p-8 flex-1 flex flex-col items-center justify-center text-center relative">
              <h3 class="text-white font-serif italic text-3xl mb-6 z-10">Congratulations!</h3>
              <div class="w-32 h-32 bg-green-800 rounded-full flex items-center justify-center mb-6 z-10">
                <span class="text-white font-bold">LOGO</span>
              </div>
              <div class="bg-white px-4 py-1 rounded text-xs font-bold text-orange-500 z-10">
                WORLD UNIVERSITY RANKINGS
              </div>
            </div>
            <div class="bg-white p-6 border-t border-green-200">
              <p class="text-gray-800 font-medium mb-2">SFXC Seals Rank in 2026 QS World University Ranking Debut.</p>
              <a href="#" class="text-green-700 hover:text-green-800 font-medium text-sm">Learn more</a>
            </div>
          </Card> -->
        </div>
      </section>
      
      <!-- Latest Releases Section -->
      <section>
        <h2 class="text-3xl font-bold text-green-950 mb-6">Latest Releases</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card v-for="program in latestPrograms" :key="program.id" class="overflow-hidden border-green-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
            <div class="h-56 overflow-hidden">
              <img :src="program.image" :alt="program.title" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <CardContent class="p-6 flex-1 flex flex-col">
              <div class="mb-4">
                <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-bold bg-green-50 text-green-900 border-l-4 border-yellow-400">
                  {{ program.category }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4 line-clamp-3">
                {{ program.title }}
              </h3>
              <div class="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                <div class="flex items-center">
                  <User class="w-3.5 h-3.5 mr-1" />
                  <span>by: {{ program.author }}</span>
                </div>
                <div class="flex items-center">
                  <Calendar class="w-3.5 h-3.5 mr-1" />
                  <span>{{ program.date }}</span>
                </div>
              </div>
              <p class="text-gray-600 text-sm line-clamp-3 mt-auto">
                {{ program.description }}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
</style>