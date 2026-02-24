<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Calendar as CalendarIcon } from 'lucide-vue-next'

// Import images
const sfxcApplication = 'https://placehold.co/800x600?text=800x600'
const sfxcSacred = 'https://placehold.co/800x600?text=800x600'
const sfxcUpdate = 'https://placehold.co/800x600?text=800x600'
const sfxcBuilding = 'https://placehold.co/1280x720?text=1280x720'

interface NewsItem {
  id: number
  title: string
  date: string
  excerpt: string
  image: string
  slug: string
  author: string
  category: string
}

/**
 * TEMPORARY PLACEHOLDER DATA
 * This will be replaced by admin-uploaded content
 */
const news: NewsItem[] = [
  {
    id: 1,
    title: 'SFXC Seals Rank in 2026 QS World University Ranking Debut',
    date: 'February 24, 2026',
    excerpt: 'Saint Francis Xavier College has officially made its debut in the QS World University Rankings, marking a significant milestone in its commitment to global educational standards.',
    image: sfxcBuilding,
    slug: 'sfxc-qs-ranking-2026',
    author: 'SFXC Admin',
    category: 'Feature'
  },
  {
    id: 2,
    title: 'Upcoming Announcement for Intramurals 2026',
    date: 'February 20, 2026',
    excerpt: 'Details about the upcoming Intramurals 2026 will be posted soon. Get ready for a week of sports, camaraderie, and school spirit.',
    image: sfxcSacred,
    slug: 'upcoming-announcement',
    author: 'Student Council',
    category: 'Announcement'
  },
  {
    id: 3,
    title: 'Campus Infrastructure Update',
    date: 'February 15, 2026',
    excerpt: 'An official update on the ongoing construction of the new laboratory building and library renovations.',
    image: sfxcUpdate,
    slug: 'campus-update',
    author: 'Facilities Dept',
    category: 'Updates'
  },
  {
    id: 4,
    title: 'Application for Academic Year 2026-2027 Now Open',
    date: 'February 10, 2026',
    excerpt: 'We are now accepting applications for incoming freshmen and transferees for the upcoming academic year.',
    image: sfxcApplication,
    slug: 'application-2026-2027',
    author: 'Admissions',
    category: 'News'
  }
]

const featuredNews = computed(() => news.length > 0 ? news[0] : undefined)
const latestNews = computed(() => news.slice(1))

// Event dates for calendar
const eventDates = [
  { date: new Date(2026, 1, 20), title: 'Intramurals Week' },
  { date: new Date(2026, 1, 25), title: 'EDSA Revolution Day' },
  { date: new Date(2026, 2, 5), title: 'Career Day' },
  { date: new Date(2026, 2, 15), title: 'Science Fair' },
  { date: new Date(2026, 2, 28), title: 'Graduation Rehearsal' },
  { date: new Date(2026, 3, 9), title: 'Araw ng Kagitingan' },
  { date: new Date(2026, 3, 17), title: 'Maundy Thursday' },
  { date: new Date(2026, 3, 18), title: 'Good Friday' },
  { date: new Date(2026, 3, 25), title: 'Alumni Homecoming' },
  { date: new Date(2026, 4, 1), title: 'Labor Day' },
  { date: new Date(2026, 4, 10), title: 'Recognition Day' },
]

// Calendar state
const currentDate = new Date()
const selectedMonth = ref(currentDate.getMonth())
const selectedYear = ref(currentDate.getFullYear())

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const daysInMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value, 1).getDay()
})

const calendarDays = computed(() => {
  const days = []
  const totalDays = daysInMonth.value
  const firstDay = firstDayOfMonth.value
  
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  for (let day = 1; day <= totalDays; day++) {
    days.push(day)
  }
  
  return days
})

const isEventDate = (day: number | null) => {
  if (!day) return false
  return eventDates.some(event => 
    event.date.getDate() === day && 
    event.date.getMonth() === selectedMonth.value && 
    event.date.getFullYear() === selectedYear.value
  )
}

const getEventTitle = (day: number | null) => {
  if (!day) return ''
  const event = eventDates.find(event => 
    event.date.getDate() === day && 
    event.date.getMonth() === selectedMonth.value && 
    event.date.getFullYear() === selectedYear.value
  )
  return event ? event.title : ''
}

const previousMonth = () => {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11
    selectedYear.value--
  } else {
    selectedMonth.value--
  }
}

const nextMonth = () => {
  if (selectedMonth.value === 11) {
    selectedMonth.value = 0
    selectedYear.value++
  } else {
    selectedMonth.value++
  }
}
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <!-- HERO -->
    <section id="hero" class="relative">
      <div
        class="h-120 md:h-[60dvh] flex flex-col relative bg-[url('https://placehold.co/1920x1080?text=1920x1080')] bg-cover bg-center bg-no-repeat"
      >
        <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>

        <!-- <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
          <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
            News and Updates
          </h1>
          <p class="text-white/80 mt-4 text-lg md:text-xl max-w-xl">
              Stay updated with the latest events, announcements, and milestones of
            Saint Francis Xavier College.
          </p>
        </div> -->

        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">
      
      <!-- Featured & Calendar Section -->
      <section>
        <h2 class="text-3xl font-bold text-green-950 mb-6">Featured News</h2>
        <div class="grid lg:grid-cols-3 gap-6">
          <!-- Main Featured Card -->
          <Card v-if="featuredNews" class="lg:col-span-2 overflow-hidden border-green-200 rounded-xl relative group cursor-pointer" @click="$router.push(`/news/${featuredNews.slug}`)">
            <div class="absolute inset-0">
              <img :src="featuredNews.image" :alt="featuredNews.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-linear-to-t from-green-950/90 via-green-950/40 to-transparent"></div>
            </div>
            <CardContent class="relative h-full min-h-100 flex flex-col justify-end p-8 text-white">
              <div class="mb-4">
                <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-bold bg-green-50 text-green-900 border-l-4 border-yellow-400">
                  {{ featuredNews.category }}
                </span>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                {{ featuredNews.title }}
              </h3>
              <p class="text-white/90 line-clamp-3">
                {{ featuredNews.excerpt }}
              </p>
            </CardContent>
          </Card>

          <!-- Events Calendar Sidebar -->
          <Card class="overflow-hidden border-green-200 rounded-xl flex flex-col">
            <CardHeader class="bg-green-950 text-white py-4">
              <CardTitle class="text-lg font-serif italic">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent class="p-6 flex-1 bg-white">
              <div class="space-y-4">
                <!-- Calendar Header -->
                <div class="flex items-center justify-between text-green-950">
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    @click="previousMonth"
                    class="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-900"
                  >
                    ‹
                  </Button>
                  <div class="text-sm font-bold uppercase tracking-wider">
                    {{ monthNames[selectedMonth] }} {{ selectedYear }}
                  </div>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    @click="nextMonth"
                    class="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-900"
                  >
                    ›
                  </Button>
                </div>

                <!-- Day Names -->
                <div class="grid grid-cols-7 gap-1">
                  <div 
                    v-for="day in dayNames" 
                    :key="day"
                    class="text-center text-[10px] font-bold text-green-800/70 py-1 uppercase"
                  >
                    {{ day }}
                  </div>
                </div>

                <!-- Calendar Days -->
                <div class="grid grid-cols-7 gap-1">
                  <div
                    v-for="(day, index) in calendarDays"
                    :key="index"
                    :class="[
                      'h-8 w-full flex items-center justify-center text-xs rounded-md transition-colors relative group/day',
                      !day && 'invisible',
                      day && !isEventDate(day) && 'text-gray-700 hover:bg-gray-100',
                      isEventDate(day) && 'bg-green-700 text-white font-bold cursor-pointer shadow-sm hover:bg-green-800',
                    ]"
                    :title="getEventTitle(day)"
                  >
                    {{ day }}
                    <!-- Tooltip -->
                    <div 
                      v-if="isEventDate(day)" 
                      class="absolute bottom-full mb-2 hidden group-hover/day:block bg-green-950 text-white text-xs rounded px-2 py-1.5 whitespace-nowrap shadow-lg z-20"
                    >
                      {{ getEventTitle(day) }}
                      <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-green-950"></div>
                    </div>
                  </div>
                </div>

                <!-- Legend -->
                <div class="pt-4 mt-2 border-t border-green-100">
                  <div class="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <div class="w-3 h-3 rounded-sm bg-green-700 shadow-sm"></div>
                    <span>Event Date</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Latest News Section -->
      <section>
        <h2 class="text-3xl font-bold text-green-950 mb-6">Latest News</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            v-for="item in latestNews" 
            :key="item.id" 
            class="overflow-hidden border-green-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer flex flex-col group"
            @click="$router.push(`/news/${item.slug}`)"
          >
            <div class="h-56 overflow-hidden">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <CardContent class="p-6 flex-1 flex flex-col bg-white">
              <div class="mb-4">
                <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-bold bg-green-50 text-green-900 border-l-4 border-yellow-400">
                  {{ item.category }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4 line-clamp-3 group-hover:text-green-700 transition-colors">
                {{ item.title }}
              </h3>
              <div class="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                <div class="flex items-center">
                  <User class="w-3.5 h-3.5 mr-1" />
                  <span>by: {{ item.author }}</span>
                </div>
                <div class="flex items-center">
                  <CalendarIcon class="w-3.5 h-3.5 mr-1" />
                  <span>{{ item.date }}</span>
                </div>
              </div>
              <p class="text-gray-600 text-sm line-clamp-3 mt-auto">
                {{ item.excerpt }}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped></style>
