<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

interface Announcement {
  id: number
  title: string
  date: string
  category: string
  excerpt: string
  content: string
  author: string
  heroImage: string
}

const announcements = ref<Announcement[]>([
  {
    id: 1,
    title: 'Academic Calendar Update for Spring Semester 2024',
    date: '2024-02-01',
    category: 'Academic',
    excerpt: 'Important updates regarding the spring semester schedule and key dates.',
    content: 'The spring semester will commence on February 15, 2024. All students are required to check their course schedules and confirm enrollment by February 10.',
    author: 'Registrar Office',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'New Library Operating Hours',
    date: '2024-01-28',
    category: 'Facilities',
    excerpt: 'Extended library hours to support student learning and research activities.',
    content: 'Starting February 1, the library will be open from 7:00 AM to 10:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends.',
    author: 'Library Services',
    heroImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Scholarship Application Period Now Open',
    date: '2024-01-25',
    category: 'Financial Aid',
    excerpt: 'Applications for merit-based and need-based scholarships are now being accepted.',
    content: 'The scholarship application portal is now open. Deadline for submission is March 15, 2024. Please ensure all required documents are uploaded.',
    author: 'Financial Aid Office',
    heroImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Campus Maintenance Schedule',
    date: '2023-12-20',
    category: 'Facilities',
    excerpt: 'Scheduled maintenance work across campus facilities.',
    content: 'Routine maintenance will be conducted in various buildings from February 5-10. Some areas may have limited access during this period.',
    author: 'Facilities Management',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Student Organization Registration Deadline',
    date: '2023-11-18',
    category: 'Student Life',
    excerpt: 'All student organizations must complete registration by the specified deadline.',
    content: 'Student organizations are reminded to complete their registration and submit required documentation by February 20, 2024 to maintain active status.',
    author: 'Student Affairs',
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Career Fair 2024 - Save the Date',
    date: '2023-10-15',
    category: 'Career Services',
    excerpt: 'Annual career fair connecting students with leading employers.',
    content: 'Mark your calendars for the Annual Career Fair on March 25, 2024. Over 100 companies will be participating. Registration opens February 1.',
    author: 'Career Development Center',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop'
  }
])

const searchQuery = ref('')
const selectedMonth = ref<string>('all')

const months = computed(() => {
  const monthSet = new Set<string>()
  announcements.value.forEach(announcement => {
    const date = new Date(announcement.date)
    const monthYear = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    monthSet.add(monthYear)
  })
  return ['all', ...Array.from(monthSet).sort((a, b) => {
    if (a === 'all') return -1
    if (b === 'all') return 1
    return new Date(b).getTime() - new Date(a).getTime()
  })]
})

const filteredAnnouncements = computed(() => {
  return announcements.value.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         announcement.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    let matchesMonth = true
    if (selectedMonth.value !== 'all') {
      const announcementDate = new Date(announcement.date)
      const announcementMonthYear = announcementDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
      matchesMonth = announcementMonthYear === selectedMonth.value
    }
    
    return matchesSearch && matchesMonth
  })
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-12 max-w-7xl">
      <!-- Header Section -->
      <div class="mb-12">
        <h1 class="text-4xl font-bold tracking-tight mb-2">Announcements</h1>
        <p class="text-muted-foreground">Stay informed with the latest updates from St. Francis Xavier College</p>
      </div>

      <!-- Filters -->
      <div class="mb-8 flex flex-col md:flex-row gap-4">
        <Input
          v-model="searchQuery"
          placeholder="Search announcements..."
          class="md:max-w-sm"
        />
        <Select v-model="selectedMonth" class="md:max-w-xs">
          <option v-for="month in months" :key="month" :value="month">
            {{ month === 'all' ? 'All Months' : month }}
          </option>
        </Select>
      </div>

      <!-- Announcements Grid -->
      <div v-if="filteredAnnouncements.length === 0" class="text-center py-16">
        <p class="text-muted-foreground">No announcements found.</p>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card 
          v-for="announcement in filteredAnnouncements" 
          :key="announcement.id"
          class="overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div class="aspect-video relative overflow-hidden bg-muted">
            <img 
              :src="announcement.heroImage" 
              :alt="announcement.title"
              class="w-full h-full object-cover"
            />
          </div>
          
          <CardHeader>
            <div class="text-sm text-muted-foreground mb-2">
              {{ announcement.category }} • {{ formatDate(announcement.date) }}
            </div>
            <CardTitle class="text-xl line-clamp-2">{{ announcement.title }}</CardTitle>
          </CardHeader>

          <CardContent>
            <p class="text-muted-foreground text-sm line-clamp-3 mb-4">
              {{ announcement.excerpt }}
            </p>
            <div class="text-xs text-muted-foreground">
              By {{ announcement.author }}
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Results Count -->
      <div v-if="filteredAnnouncements.length > 0" class="mt-8 text-center text-sm text-muted-foreground">
        Showing {{ filteredAnnouncements.length }} of {{ announcements.length }} announcements
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>