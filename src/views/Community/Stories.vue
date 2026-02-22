<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Import images
import sfxcBuilding from '@/assets/images/sfxc-building.jpg'
import sfxcApplication from '@/assets/images/news/sfxc_application.jpg'
import sfxcSacred from '@/assets/images/news/sfxc_sacred.jpg'
import sfxcUpdate from '@/assets/images/news/sfxc_update.jpg'

interface Story {
  id: number
  title: string
  author: string
  role: string
  category: 'Student' | 'Alumni' | 'Faculty' | 'Community'
  excerpt: string
  content: string
  image: string
  date: string
}

const stories: Story[] = [
  {
    id: 1,
    title: 'From Dreams to Reality: My SFXC Journey',
    author: 'Maria Santos',
    role: 'BS Information Technology Graduate',
    category: 'Alumni',
    excerpt: 'How SFXC shaped my career in technology and helped me achieve my dreams.',
    content: 'When I first entered SFXC, I was just a dreamer from a small barangay with big aspirations. The faculty, facilities, and values instilled in me transformed that dream into reality. Today, I work as a software engineer at a leading tech company, and I owe it all to the foundation SFXC gave me.',
    image: sfxcBuilding,
    date: '2026-01-15'
  },
  {
    id: 2,
    title: 'Teaching with Purpose and Passion',
    author: 'Prof. Juan Dela Cruz',
    role: 'College of Business Faculty',
    category: 'Faculty',
    excerpt: 'Why I chose to dedicate my career to shaping future business leaders at SFXC.',
    content: 'After years in the corporate world, I found my true calling in education. At SFXC, I have the privilege of guiding students not just academically, but in developing the values and character needed to succeed. Every graduation day reminds me why this work matters.',
    image: sfxcApplication,
    date: '2026-01-20'
  },
  {
    id: 3,
    title: 'Finding My Voice Through Student Leadership',
    author: 'Anna Reyes',
    role: '4th Year Business Administration',
    category: 'Student',
    excerpt: 'How being part of the student council changed my life and perspective.',
    content: 'I was always shy and reserved until I joined the student council at SFXC. The experience taught me confidence, leadership, and the importance of serving others. These lessons will stay with me forever, long after I leave these halls.',
    image: sfxcSacred,
    date: '2026-01-25'
  },
  {
    id: 4,
    title: 'Community Partnership That Transformed Our Barangay',
    author: 'Brgy. Captain Rodrigo Mendoza',
    role: 'Barangay Lumbia Official',
    category: 'Community',
    excerpt: 'The impact of SFXC\'s outreach programs on our community.',
    content: 'The partnership with SFXC brought hope and opportunities to our barangay. From medical missions to educational support, their commitment to service has made a tangible difference in the lives of our residents. This is education with a heart.',
    image: sfxcUpdate,
    date: '2026-02-01'
  },
  {
    id: 5,
    title: 'Second Chances and New Beginnings',
    author: 'Carlos Mercado',
    role: 'TESDA Program Graduate',
    category: 'Alumni',
    excerpt: 'How SFXC\'s vocational programs gave me a fresh start in life.',
    content: 'After struggling for years, the TESDA programs at SFXC gave me skills and hope. Now I run my own small business and support my family. SFXC believed in me when others didn\'t, and I am forever grateful.',
    image: sfxcBuilding,
    date: '2026-02-05'
  },
  {
    id: 6,
    title: 'Research That Makes a Difference',
    author: 'Dr. Elena Garcia',
    role: 'Research Director',
    category: 'Faculty',
    excerpt: 'Leading community-based research projects that create real-world impact.',
    content: 'At SFXC, research isn\'t just about publications. Our faculty and students work on projects that directly benefit local communities. Seeing our research translate into improved lives is the greatest reward of academic work.',
    image: sfxcApplication,
    date: '2026-02-10'
  }
]

const categories = ['All', 'Student', 'Alumni', 'Faculty', 'Community']
const selectedCategory = ref('All')
const selectedStory = ref<Story | null>(null)

const filteredStories = ref(
  selectedCategory.value === 'All' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory.value)
)

const filterByCategory = (category: string) => {
  selectedCategory.value = category
  filteredStories.value = category === 'All' 
    ? stories 
    : stories.filter(story => story.category === category)
}

const openStory = (story: Story) => {
  selectedStory.value = story
}

const closeStory = () => {
  selectedStory.value = null
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
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
            Community Stories
          </h1>
          <p class="text-white/90 mt-3 text-lg md:text-xl max-w-2xl">
            Real stories from students, alumni, faculty, and community partners
          </p>
        </div>

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

    <!-- Stories Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="(story, index) in filteredStories"
            :key="story.id"
            class="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 animate-fade-in"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="openStory(story)"
          >
            <div class="relative overflow-hidden h-56">
              <img
                :src="story.image"
                :alt="story.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"></div>
              <span class="absolute top-4 right-4 text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full">
                {{ story.category }}
              </span>
            </div>
            <CardContent class="p-6">
              <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {{ story.title }}
              </h3>
              <div class="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span class="font-medium">{{ story.author }}</span>
                <span>•</span>
                <span>{{ story.role }}</span>
              </div>
              <p class="text-sm text-muted-foreground mb-4">{{ story.excerpt }}</p>
              <span class="text-xs text-muted-foreground">{{ formatDate(story.date) }}</span>
            </CardContent>
          </Card>
        </div>

        <!-- Empty State -->
        <div v-if="filteredStories.length === 0" class="text-center py-16">
          <p class="text-muted-foreground text-lg">No stories available in this category</p>
        </div>
      </div>
    </section>

    <!-- Story Details Modal -->
    <Transition name="fade">
      <div
        v-if="selectedStory"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-4"
        @click="closeStory"
      >
        <div class="min-h-screen flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            class="fixed top-4 right-4 text-white hover:bg-white/20 z-10"
            @click="closeStory"
          >
            ✕
          </Button>

          <div
            class="relative w-full max-w-3xl bg-background rounded-lg animate-scale-in overflow-hidden"
            @click.stop
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :src="selectedStory.image"
                :alt="selectedStory.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
              <span class="absolute top-6 right-6 text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-full">
                {{ selectedStory.category }}
              </span>
            </div>

            <div class="p-6 md:p-8">
              <h2 class="text-3xl font-bold mb-3">{{ selectedStory.title }}</h2>
              
              <div class="flex items-center gap-3 text-sm text-muted-foreground mb-6 pb-6 border-b">
                <div>
                  <span class="font-semibold text-foreground">{{ selectedStory.author }}</span>
                  <span class="block text-xs">{{ selectedStory.role }}</span>
                </div>
                <span>•</span>
                <span>{{ formatDate(selectedStory.date) }}</span>
              </div>

              <div class="prose prose-sm max-w-none">
                <p class="text-muted-foreground leading-relaxed">{{ selectedStory.content }}</p>
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
