<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

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
    image: '/src/assets/images/sfxc-building.jpg',
    quote: 'SFXC provided me with the foundation to pursue my dreams in technology.'
  },
  {
    id: 2,
    name: 'John Dela Cruz',
    batch: 'Class of 2018',
    profession: 'Business Owner',
    image: '/src/assets/images/news/sfxc_application.jpg',
    quote: 'The values and education I received here shaped my entrepreneurial journey.'
  },
  {
    id: 3,
    name: 'Anna Reyes',
    batch: 'Class of 2019',
    profession: 'Teacher at Public School',
    image: '/src/assets/images/news/sfxc_sacred.jpg',
    quote: 'Giving back to the community through education, just as SFXC taught me.'
  },
]

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
      '/src/assets/images/sfxc-building.jpg',
      '/src/assets/images/news/sfxc_application.jpg',
      '/src/assets/images/news/sfxc_sacred.jpg',
      '/src/assets/images/news/sfxc_update.jpg'
    ],
    photoCount: 48
  },
  {
    id: 2,
    year: '2024',
    title: 'Class of 2024',
    description: 'Journey through the years',
    images: [
      '/src/assets/images/news/sfxc_application.jpg',
      '/src/assets/images/sfxc-building.jpg',
      '/src/assets/images/news/sfxc_update.jpg',
      '/src/assets/images/news/sfxc_sacred.jpg'
    ],
    photoCount: 52
  },
  {
    id: 3,
    year: '2023',
    title: 'Class of 2023',
    description: 'Achievements and celebrations',
    images: [
      '/src/assets/images/news/sfxc_sacred.jpg',
      '/src/assets/images/news/sfxc_update.jpg',
      '/src/assets/images/sfxc-building.jpg',
      '/src/assets/images/news/sfxc_application.jpg'
    ],
    photoCount: 45
  },
  {
    id: 4,
    year: '2022',
    title: 'Class of 2022',
    description: 'Milestones and memories',
    images: [
      '/src/assets/images/news/sfxc_update.jpg',
      '/src/assets/images/news/sfxc_sacred.jpg',
      '/src/assets/images/news/sfxc_application.jpg',
      '/src/assets/images/sfxc-building.jpg'
    ],
    photoCount: 39
  },
  {
    id: 5,
    year: '2021',
    title: 'Class of 2021',
    description: 'Resilience and triumph',
    images: [
      '/src/assets/images/sfxc-building.jpg',
      '/src/assets/images/news/sfxc_sacred.jpg',
      '/src/assets/images/news/sfxc_application.jpg',
      '/src/assets/images/news/sfxc_update.jpg'
    ],
    photoCount: 41
  },
  {
    id: 6,
    year: '2020',
    title: 'Class of 2020',
    description: 'A unique graduation story',
    images: [
      '/src/assets/images/news/sfxc_application.jpg',
      '/src/assets/images/sfxc-building.jpg',
      '/src/assets/images/news/sfxc_update.jpg',
      '/src/assets/images/news/sfxc_sacred.jpg'
    ],
    photoCount: 36
  },
]

const selectedBatch = ref<BatchAlbum | null>(null)

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
        class="h-[50vh] md:h-[60vh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-tertiary/40 to-transparent"></div>

        <div class="relative z-10 mt-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Alumni Network
          </h1>
          <p class="text-white/90 mt-3 text-lg md:text-xl max-w-2xl">
            Connecting Xaverians across generations and celebrating success stories
          </p>
        </div>

        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-8 md:h-16" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Featured Alumni -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold">Featured Alumni</h2>
          <p class="text-muted-foreground mt-2">Success stories from our community</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <Card
            v-for="(alumni, index) in featuredAlumni"
            :key="alumni.id"
            class="group overflow-hidden hover:shadow-xl transition-all duration-300"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="relative overflow-hidden h-64">
              <img
                :src="alumni.image"
                :alt="alumni.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold">{{ alumni.name }}</h3>
                <p class="text-sm text-white/80">{{ alumni.batch }}</p>
              </div>
            </div>
            <CardContent class="p-6">
              <p class="font-medium text-primary mb-3">{{ alumni.profession }}</p>
              <p class="text-sm text-muted-foreground italic">"{{ alumni.quote }}"</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Batch Albums -->
    <section class="py-16 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold">Batch Albums</h2>
          <p class="text-muted-foreground mt-2">Explore memories from each graduating class</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="(batch, index) in batchAlbums"
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