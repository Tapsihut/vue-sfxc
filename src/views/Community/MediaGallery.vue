<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-vue-next'

// Import images
const sfxcBuilding = 'https://placehold.co/800x800?text=800x800'
const sfxcApplication = 'https://placehold.co/800x800?text=800x800'
const sfxcSacred = 'https://placehold.co/800x800?text=800x800'
const sfxcUpdate = 'https://placehold.co/800x800?text=800x800'

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
  {
    id: 7,
    title: 'Community Outreach',
    image: sfxcSacred,
    category: 'activities',
    date: '2026-02-20'
  },
  {
    id: 8,
    title: 'New Laboratory Equipment',
    image: sfxcUpdate,
    category: 'campus',
    date: '2026-02-22'
  }
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

const getGridClass = (index: number) => {
  const pattern = index % 7
  switch (pattern) {
    case 0: return 'md:col-span-2 md:row-span-2'
    case 1: return 'md:col-span-1 md:row-span-1'
    case 2: return 'md:col-span-1 md:row-span-2'
    case 3: return 'md:col-span-2 md:row-span-1'
    case 4: return 'md:col-span-1 md:row-span-1'
    case 5: return 'md:col-span-1 md:row-span-2'
    case 6: return 'md:col-span-2 md:row-span-2'
    default: return 'md:col-span-1 md:row-span-1'
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Header -->
    <section class="relative overflow-hidden bg-green-950 pt-24 pb-32">
      <!-- Abstract Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div class="absolute -top-[20%] -right-[10%] w-[50%] h-[70%] rounded-full bg-green-800/40 blur-[100px]"></div>
        <div class="absolute bottom-[10%] -left-[10%] w-[40%] h-[60%] rounded-full bg-yellow-500/20 blur-[100px]"></div>
        <div class="absolute top-[40%] left-[20%] w-[20%] h-[30%] rounded-full bg-green-400/20 blur-[80px]"></div>
        <div class="absolute inset-0 bg-[url('https://placehold.co/1920x1080?text=1920x1080')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- <span class="inline-block py-1.5 px-4 rounded-full bg-green-900/50 border border-green-700/50 text-green-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
          Discover SFXC
        </span> -->
        <!-- <h1 class="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          <span class="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-200">St. Francis Xavier College</span>
        </h1> -->
        <!-- <p class="text-green-50/90 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
          Explore the vibrant life, achievements, and unforgettable moments that shape the Saint Francis Xavier College community.
        </p> -->
      </div>

      <!-- Decorative Bottom Divider -->
      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,120 C320,120 420,0 720,0 C1020,0 1120,120 1440,120 Z"></path>
        </svg>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-6 sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border shadow-xs">
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
              :class="[
                'transition-all duration-300 rounded-full px-5 font-semibold',
                selectedCategory === category.value 
                  ? 'bg-green-800 hover:bg-green-900 text-white shadow-md scale-105' 
                  : 'hover:border-green-800 hover:text-green-800 bg-transparent'
              ]"
            >
              {{ category.label }}
            </Button>
          </div>

          <!-- Search -->
          <div class="w-full md:w-72 relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search class="h-4 w-4 text-muted-foreground group-focus-within:text-green-800 transition-colors" />
            </div>
            <Input
              v-model="searchQuery"
              placeholder="Search gallery..."
              class="w-full pl-10 rounded-full border-border focus:border-green-800 focus:ring-green-800 transition-all bg-muted/50 focus:bg-background"
            />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] grid-flow-dense">
          <div
            v-for="(item, index) in filteredMedia"
            :key="item.id"
            :class="[
              'group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 animate-fade-in bg-muted',
              getGridClass(index)
            ]"
            @click="openLightbox(item)"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-linear-to-t from-green-950/90 via-green-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Overlay Info -->
            <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span class="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-wider text-green-900 bg-green-50 rounded-full border-l-4 border-yellow-400 uppercase shadow-sm">
                {{ item.category }}
              </span>
              <h3 class="font-bold text-xl md:text-2xl text-white leading-tight drop-shadow-md">{{ item.title }}</h3>
              <p class="text-sm text-white/90 mt-2 flex items-center gap-2 font-medium">
                <span class="w-4 h-0.5 bg-yellow-400 inline-block rounded-full"></span>
                {{ new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredMedia.length === 0" class="text-center py-24 bg-muted/30 rounded-3xl border border-dashed border-border mt-8 animate-fade-in">
          <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search class="h-8 w-8 text-muted-foreground" />
          </div>
          <p class="text-foreground text-lg font-medium">No media found matching your criteria.</p>
          <p class="text-muted-foreground mt-1 mb-6">Try adjusting your filters or search query.</p>
          <Button variant="outline" class="rounded-full" @click="selectedCategory = 'all'; searchQuery = ''">
            Clear Filters
          </Button>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <Transition name="fade">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-green-950/95 backdrop-blur-sm p-4 md:p-8"
        @click="closeLightbox"
      >
        <Button
          variant="ghost"
          size="icon"
          class="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:bg-white/20 hover:text-white rounded-full h-12 w-12"
          @click="closeLightbox"
        >
          <X class="h-6 w-6" />
        </Button>

        <div
          class="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center animate-scale-in"
          @click.stop
        >
          <div class="relative w-full flex justify-center overflow-hidden rounded-xl shadow-2xl bg-black/50">
            <img
              :src="selectedImage.image"
              :alt="selectedImage.title"
              class="max-w-full max-h-[75vh] object-contain"
            />
          </div>
          <div class="mt-6 text-center w-full max-w-2xl">
            <span class="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-green-900 bg-green-50 rounded-full uppercase">
              {{ selectedImage.category }}
            </span>
            <h3 class="text-2xl md:text-3xl font-bold text-white">{{ selectedImage.title }}</h3>
            <p class="text-green-100/70 mt-2 font-medium">{{ new Date(selectedImage.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
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
