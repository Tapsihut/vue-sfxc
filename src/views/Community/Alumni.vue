<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Search, X, GraduationCap, Briefcase, Award, Users, ArrowRight, Image as ImageIcon } from 'lucide-vue-next'

// Import images
const sfxcBuilding = 'https://placehold.co/800x800?text=800x800'
const sfxcApplication = 'https://placehold.co/800x800?text=800x800'
const sfxcSacred = 'https://placehold.co/800x800?text=800x800'

interface AlumniFeatured {
  id: number
  name: string
  batch: string
  profession: string
  image: string
  quote: string
}

const featuredAlumni: AlumniFeatured[] = [
  {
    id: 1,
    name: 'Maria Santos',
    batch: 'Class of 2020',
    profession: 'Software Engineer at Tech Corp',
    image: sfxcBuilding,
    quote: 'SFXC provided me with the foundation to pursue my dreams in technology.'
  },
  {
    id: 2,
    name: 'John Dela Cruz',
    batch: 'Class of 2018',
    profession: 'Business Owner',
    image: sfxcApplication,
    quote: 'The values and education I received here shaped my entrepreneurial journey.'
  },
  {
    id: 3,
    name: 'Anna Reyes',
    batch: 'Class of 2019',
    profession: 'Teacher at Public School',
    image: sfxcSacred,
    quote: 'Giving back to the community through education, just as SFXC taught me.'
  },
]

const spotlightAlumni: AlumniFeatured = {
  id: 0,
  name: 'Dr. Sarah Alcantara',
  batch: 'Class of 2015',
  profession: 'Chief Medical Officer at General Hospital',
  image: 'https://placehold.co/1280x720?text=1280x720',
  quote: 'The education I received at SFXC was the cornerstone of my medical career. It taught me compassion, excellence, and the true meaning of service to others.'
}

interface BatchAlbum {
  id: number
  year: string
  title: string
  description: string
  images: string[]
  photoCount: number
}

const batchAlbums: BatchAlbum[] = [
  {
    id: 1,
    year: '2025',
    title: 'Class of 2025',
    description: 'Graduation and memorable moments',
    images: [
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800'
    ],
    photoCount: 48
  },
  {
    id: 2,
    year: '2024',
    title: 'Class of 2024',
    description: 'Journey through the years',
    images: [
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800'
    ],
    photoCount: 52
  },
  {
    id: 3,
    year: '2023',
    title: 'Class of 2023',
    description: 'Achievements and celebrations',
    images: [
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800'
    ],
    photoCount: 45
  },
  {
    id: 4,
    year: '2022',
    title: 'Class of 2022',
    description: 'Milestones and memories',
    images: [
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800'
    ],
    photoCount: 39
  },
  {
    id: 5,
    year: '2021',
    title: 'Class of 2021',
    description: 'Resilience and triumph',
    images: [
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800'
    ],
    photoCount: 41
  },
  {
    id: 6,
    year: '2020',
    title: 'Class of 2020',
    description: 'A unique graduation story',
    images: [
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800',
      'https://placehold.co/800x800?text=800x800'
    ],
    photoCount: 36
  },
]

const selectedBatch = ref<BatchAlbum | null>(null)
const searchQuery = ref('')

const filteredBatches = computed(() => {
  if (!searchQuery.value) return batchAlbums
  const query = searchQuery.value.toLowerCase()
  return batchAlbums.filter(batch => 
    batch.title.toLowerCase().includes(query) || 
    batch.year.toLowerCase().includes(query) ||
    batch.description.toLowerCase().includes(query)
  )
})

const openBatchAlbum = (batch: BatchAlbum) => {
  selectedBatch.value = batch
}

const closeBatchAlbum = () => {
  selectedBatch.value = null
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


        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-8 md:h-16" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Featured Alumni -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <section>
          <h2 class="text-3xl font-bold text-green-950 mb-6">Alumni Spotlight</h2>
          <div class="grid lg:grid-cols-3 gap-6">
            <Card class="lg:col-span-2 overflow-hidden border-green-200 rounded-xl relative group cursor-pointer">
              <div class="absolute inset-0">
                <img :src="spotlightAlumni.image" :alt="spotlightAlumni.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div class="absolute inset-0 bg-linear-to-t from-green-950/90 via-green-950/40 to-transparent"></div>
              </div>
              <CardContent class="relative h-full min-h-100 flex flex-col justify-end p-8 text-white">
                <div class="mb-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-bold bg-green-50 text-green-900 border-l-4 border-yellow-400">
                    {{ spotlightAlumni.batch }}
                  </span>
                </div>
                <h3 class="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                  {{ spotlightAlumni.name }}
                </h3>
                <p class="text-white/90 font-medium mb-2">
                  {{ spotlightAlumni.profession }}
                </p>
                <p class="text-white/80 line-clamp-3 italic">
                  "{{ spotlightAlumni.quote }}"
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <!-- Other Featured Alumni (Latest Releases Style) -->
        <section>
          <h2 class="text-3xl font-bold text-green-950 mb-6">Featured Alumni</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              v-for="(alumni, index) in featuredAlumni"
              :key="alumni.id"
              class="overflow-hidden border-green-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="h-56 overflow-hidden">
                <img
                  :src="alumni.image"
                  :alt="alumni.name"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent class="p-6 flex-1 flex flex-col">
                <div class="mb-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-bold bg-green-50 text-green-900 border-l-4 border-yellow-400">
                    {{ alumni.batch }}
                  </span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-3">
                  {{ alumni.name }}
                </h3>
                <p class="font-medium text-green-700 mb-4 text-sm">{{ alumni.profession }}</p>
                <p class="text-gray-600 text-sm line-clamp-3 mt-auto italic">
                  "{{ alumni.quote }}"
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </section>

    <!-- Batch Albums -->
    <section class="py-16 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold">Batch Albums</h2>
          <p class="text-muted-foreground mt-2">Explore memories from each graduating class</p>
        </div>

        <!-- Sticky Filter Section -->
        <div class="sticky top-20 z-30 bg-muted/30 backdrop-blur-md py-4 mb-8 border-b border-border/50">
          <div class="max-w-md mx-auto">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search by year, title, or description..." 
                class="pl-10 bg-background/80 border-primary/20 focus:border-primary w-full"
              />
              <button 
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredBatches.length === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">No batch albums found matching your search.</p>
          <Button variant="outline" class="mt-4" @click="searchQuery = ''">Clear Search</Button>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="(batch, index) in filteredBatches"
            :key="batch.id"
            class="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="openBatchAlbum(batch)"
          >
            <!-- Album Cover Grid -->
            <div class="relative h-64 overflow-hidden bg-muted">
              <div class="grid grid-cols-2 h-full">
                <div  
                  v-for="(image, i) in batch.images.slice(0, 4)" 
                  :key="i"
                  class="relative overflow-hidden"
                >
                  <img
                    :src="image"
                    :alt="`${batch.title} photo ${i + 1}`"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Year Badge -->
              <div class="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                {{ batch.year }}
              </div>

              <!-- Hover Overlay -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="text-center text-white">
                  <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <p class="font-semibold">View Album</p>
                </div>
              </div>
            </div>

            <CardContent class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ batch.title }}</h3>
              <p class="text-sm text-muted-foreground mb-3">{{ batch.description }}</p>
              <div class="flex items-center text-sm text-muted-foreground">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {{ batch.photoCount }} photos
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Batch Album Modal -->
    <Transition name="fade">
      <div
        v-if="selectedBatch"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-4"
        @click="closeBatchAlbum"
      >
        <div class="min-h-screen flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            class="fixed top-4 right-4 text-white hover:bg-white/20 z-10"
            @click="closeBatchAlbum"
          >
            ✕
          </Button>

          <div
            class="relative w-full max-w-6xl bg-background rounded-lg animate-scale-in"
            @click.stop
          >
            <!-- Album Header -->
            <div class="p-6 md:p-8 border-b">
              <div class="flex items-start justify-between">
                <div>
                  <h2 class="text-3xl font-bold">{{ selectedBatch.title }}</h2>
                  <p class="text-muted-foreground mt-1">{{ selectedBatch.description }}</p>
                </div>
                <div class="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                  {{ selectedBatch.year }}
                </div>
              </div>
            </div>

            <!-- Album Grid -->
            <div class="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                  v-for="(image, index) in selectedBatch.images"
                  :key="index"
                  class="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                >
                  <img
                    :src="image"
                    :alt="`${selectedBatch.title} photo ${index + 1}`"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              
              <div class="text-center text-muted-foreground text-sm mt-6">
                Showing {{ selectedBatch.images.length }} of {{ selectedBatch.photoCount }} photos
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
  animation: fade-in 0.6s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.4s ease-out;
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>
