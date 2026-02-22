<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Import images
import sfxcApplication from '@/assets/images/news/sfxc_application.jpg'
import sfxcSacred from '@/assets/images/news/sfxc_sacred.jpg'
import sfxcUpdate from '@/assets/images/news/sfxc_update.jpg'

interface NewsItem {
  id: number
  title: string
  date: string
  excerpt: string
  image: string
  slug: string
}

/**
 * TEMPORARY PLACEHOLDER DATA
 * This will be replaced by admin-uploaded content
 */
const news: NewsItem[] = [
  {
    id: 1,
    title: 'News Title Placeholder',
    date: 'Coming Soon',
    excerpt:
      'This is a placeholder for a future news article. Content will be updated once published by the administrator.',
    image: sfxcApplication,
    slug: 'news-title-placeholder-1',
  },
  {
    id: 2,
    title: 'Upcoming Announcement',
    date: 'Coming Soon',
    excerpt:
      'Details about this announcement will be posted soon. Please check back for updates.',
    image: sfxcSacred,
    slug: 'upcoming-announcement',
  },
  {
    id: 3,
    title: 'Campus Update',
    date: 'Coming Soon',
    excerpt:
      'An official update from Saint Francis Xavier College will be published here by the administrator.',
    image: sfxcUpdate,
    slug: 'campus-update',
  },
]

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
  const date = new Date(selectedYear.value, selectedMonth.value, day)
  return eventDates.some(event => 
    event.date.getDate() === day && 
    event.date.getMonth() === selectedMonth.value && 
    event.date.getFullYear() === selectedYear.value
  )
}

const getEventTitle = (day: number | null) => {
  if (!day) return ''
  const date = new Date(selectedYear.value, selectedMonth.value, day)
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
  <!-- HERO -->
  <section id="hero" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>

      <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
          News and Updates
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-xl">
            Stay updated with the latest events, announcements, and milestones of
          Saint Francis Xavier College.
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  </section>

  <!-- NEWS GRID -->
  <section class="py-24 bg-background">
    <div class="container mx-auto px-6">
      <div class="grid gap-12 lg:grid-cols-4">
        <!-- NEWS ARTICLES -->
        <div class="lg:col-span-3">
          <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="item in news"
              :key="item.id"
              class="group"
            >
              <!-- IMAGE -->
              <div class="overflow-hidden rounded-xl border border-border">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <!-- CONTENT -->
              <div class="mt-6">
                <h3
                  class="text-xl font-bold text-foreground group-hover:text-tertiary transition"
                >
                  {{ item.title }}
                </h3>

                <p class="mt-1 text-sm text-muted-foreground">
                  {{ item.date }}
                </p>

                <p class="mt-4 text-muted-foreground leading-relaxed">
                  {{ item.excerpt }}
                </p>

                <RouterLink
                  :to="`/news/${item.slug}`"
                  class="inline-block mt-4 font-semibold text-tertiary hover:underline"
                >
                  Read More »
                </RouterLink>
              </div>
            </article>
          </div>
        </div>

        <!-- EVENTS CALENDAR SIDEBAR -->
        <div class="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <!-- Calendar Header -->
                <div class="flex items-center justify-between">
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    @click="previousMonth"
                    class="h-7 w-7 p-0"
                  >
                    ‹
                  </Button>
                  <div class="text-sm font-semibold">
                    {{ monthNames[selectedMonth] }} {{ selectedYear }}
                  </div>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    @click="nextMonth"
                    class="h-7 w-7 p-0"
                  >
                    ›
                  </Button>
                </div>

                <!-- Day Names -->
                <div class="grid grid-cols-7 gap-1">
                  <div 
                    v-for="day in dayNames" 
                    :key="day"
                    class="text-center text-[10px] font-medium text-muted-foreground py-1"
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
                      'h-8 w-full flex items-center justify-center text-xs rounded transition-colors relative group/day',
                      !day && 'invisible',
                      day && !isEventDate(day) && 'text-foreground',
                      isEventDate(day) && 'bg-primary text-primary-foreground font-semibold cursor-pointer',
                    ]"
                    :title="getEventTitle(day)"
                  >
                    {{ day }}
                    <!-- Tooltip -->
                    <div 
                      v-if="isEventDate(day)" 
                      class="absolute bottom-full mb-2 hidden group-hover/day:block bg-popover text-popover-foreground text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg border z-10"
                    >
                      {{ getEventTitle(day) }}
                      <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-popover"></div>
                    </div>
                  </div>
                </div>

                <!-- Legend -->
                <div class="pt-3 border-t">
                  <div class="flex items-center gap-2 text-xs">
                    <div class="w-3 h-3 rounded bg-primary"></div>
                    <span class="text-muted-foreground">Event Date</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
