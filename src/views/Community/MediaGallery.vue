<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Import images
import sfxcBuilding from '@/assets/images/sfxc-building.jpg'
import sfxcApplication from '@/assets/images/news/sfxc_application.jpg'
import sfxcSacred from '@/assets/images/news/sfxc_sacred.jpg'
import sfxcUpdate from '@/assets/images/news/sfxc_update.jpg'

interface MediaItem {
  id: number
  title: string
  image: string
  category: 'events' | 'campus' | 'activities' | 'achievements'
  date: string
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: 'Campus Intramurals 2026',
    image: sfxcBuilding,
    category: 'events',
    date: '2026-02-10'
  },
  {
    id: 2,
    title: 'Science Fair Winners',
    image: sfxcApplication,
    category: 'achievements',
    date: '2026-01-25'
  },
  {
    id: 3,
    title: 'Campus Library',
    image: sfxcSacred,
    category: 'campus',
    date: '2026-01-15'
  },
  {
    id: 4,
    title: 'Student Council Activities',
    image: sfxcUpdate,
    category: 'activities',
    date: '2026-02-05'
  },
  {
    id: 5,
    title: 'Graduation Ceremony 2025',
    image: sfxcBuilding,
    category: 'events',
    date: '2025-12-15'
  },
  {
    id: 6,
    title: 'Sports Achievement',
    image: sfxcApplication,
    category: 'achievements',
    date: '2026-02-01'
  },
]

const categories = [
  { value: 'all', label: 'All' },
  { value: 'events', label: 'Events' },
  { value: 'campus', label: 'Campus' },
  { value: 'activities', label: 'Activities' },
  { value: 'achievements', label: 'Achievements' },
]

const selectedCategory = ref('all')
const searchQuery = ref('')
const selectedImage = ref<MediaItem | null>(null)

const filteredMedia = computed(() => {
  let filtered = mediaItems

  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(item => item.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

const openLightbox = (item: MediaItem) => {
  selectedImage.value = item
}

const closeLightbox = () => {
  selectedImage.value = null
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Header -->
    <section class="relative">
      <div
        class="h-[40vh] md:h-[50vh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-tertiary/40 to-transparent"></div>

        <div class="relative z-10 mt-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Media Gallery
          </h1>
          <p class="text-white/90 mt-3 text-lg">
            Capturing moments and memories at SFXC
          </p>
        </div>

        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-8 md:h-16" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-8 border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <!-- Category Filter -->
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="category in categories"
              :key="category.value"
              :variant="selectedCategory === category.value ? 'default' : 'outline'"
              size="sm"
              @click="selectedCategory = category.value"
              class="transition-all"
            >
              {{ category.label }}
            </Button>
          </div>

          <!-- Search -->
          <div class="w-full md:w-64">
            <Input
              v-model="searchQuery"
              placeholder="Search media..."
              class="w-full"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="item in filteredMedia"
            :key="item.id"
            class="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 animate-fade-in"
            @click="openLightbox(item)"
          >
            <div class="relative overflow-hidden aspect-video">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Overlay Info -->
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="font-semibold text-lg">{{ item.title }}</h3>
                <p class="text-sm text-white/80 mt-1">{{ new Date(item.date).toLocaleDateString() }}</p>
              </div>
            </div>
          </Card>
        </div>

        <!-- Empty State -->
        <div v-if="filteredMedia.length === 0" class="text-center py-16">
          <p class="text-muted-foreground text-lg">No media found</p>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <Transition name="fade">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        @click="closeLightbox"
      >
        <Button
          variant="ghost"
          size="icon"
          class="absolute top-4 right-4 text-white hover:bg-white/20"
          @click="closeLightbox"
        >
          ✕
        </Button>

        <div
          class="relative max-w-5xl max-h-[90vh] animate-scale-in"
          @click.stop
        >
          <img
            :src="selectedImage.image"
            :alt="selectedImage.title"
            class="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          <div class="mt-4 text-white text-center">
            <h3 class="text-xl font-semibold">{{ selectedImage.title }}</h3>
            <p class="text-white/70 mt-1">{{ new Date(selectedImage.date).toLocaleDateString() }}</p>
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
    transform: translateY(10px);
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
