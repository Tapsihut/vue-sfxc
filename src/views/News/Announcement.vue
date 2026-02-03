<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  priority: 'high' | 'medium' | 'low'
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
    priority: 'high'
  },
  {
    id: 2,
    title: 'New Library Operating Hours',
    date: '2024-01-28',
    category: 'Facilities',
    excerpt: 'Extended library hours to support student learning and research activities.',
    content: 'Starting February 1, the library will be open from 7:00 AM to 10:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends.',
    author: 'Library Services',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Scholarship Application Period Now Open',
    date: '2024-01-25',
    category: 'Financial Aid',
    excerpt: 'Applications for merit-based and need-based scholarships are now being accepted.',
    content: 'The scholarship application portal is now open. Deadline for submission is March 15, 2024. Please ensure all required documents are uploaded.',
    author: 'Financial Aid Office',
    priority: 'high'
  },
  {
    id: 4,
    title: 'Campus Maintenance Schedule',
    date: '2024-01-20',
    category: 'Facilities',
    excerpt: 'Scheduled maintenance work across campus facilities.',
    content: 'Routine maintenance will be conducted in various buildings from February 5-10. Some areas may have limited access during this period.',
    author: 'Facilities Management',
    priority: 'low'
  },
  {
    id: 5,
    title: 'Student Organization Registration Deadline',
    date: '2024-01-18',
    category: 'Student Life',
    excerpt: 'All student organizations must complete registration by the specified deadline.',
    content: 'Student organizations are reminded to complete their registration and submit required documentation by February 20, 2024 to maintain active status.',
    author: 'Student Affairs',
    priority: 'medium'
  },
  {
    id: 6,
    title: 'Career Fair 2024 - Save the Date',
    date: '2024-01-15',
    category: 'Career Services',
    excerpt: 'Annual career fair connecting students with leading employers.',
    content: 'Mark your calendars for the Annual Career Fair on March 25, 2024. Over 100 companies will be participating. Registration opens February 1.',
    author: 'Career Development Center',
    priority: 'high'
  }
])

const searchQuery = ref('')
const selectedCategory = ref<string>('all')
const selectedPriority = ref<string>('all')

const categories = computed(() => {
  const cats = new Set(announcements.value.map(a => a.category))
  return ['all', ...Array.from(cats)]
})

const filteredAnnouncements = computed(() => {
  return announcements.value.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         announcement.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || announcement.category === selectedCategory.value
    const matchesPriority = selectedPriority.value === 'all' || announcement.priority === selectedPriority.value
    
    return matchesSearch && matchesCategory && matchesPriority
  })
})

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'destructive'
    case 'medium':
      return 'default'
    case 'low':
      return 'secondary'
    default:
      return 'outline'
  }
}

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
        <div class="space-y-2">
          <h1 class="text-4xl font-bold tracking-tight text-foreground">
            Announcements
          </h1>
          <p class="text-lg text-muted-foreground">
            Stay informed with the latest updates and important notices from St. Francis Xavier College
          </p>
        </div>
      </div>

      <Separator class="mb-8" />

      <!-- Filters Section -->
      <Card class="mb-8">
        <CardHeader>
          <CardTitle class="text-xl">Filter Announcements</CardTitle>
          <CardDescription>Search and filter announcements by category and priority</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-3">
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none">Search</label>
              <Input
                v-model="searchQuery"
                placeholder="Search announcements..."
                class="w-full"
              />
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none">Category</label>
              <Select v-model="selectedCategory" class="w-full">
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category === 'all' ? 'All Categories' : category }}
                </option>
              </Select>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium leading-none">Priority</label>
              <Select v-model="selectedPriority" class="w-full">
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Announcements List -->
      <div class="space-y-6">
        <div v-if="filteredAnnouncements.length === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">No announcements found matching your criteria.</p>
        </div>

        <Card
          v-for="announcement in filteredAnnouncements"
          :key="announcement.id"
          class="hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader>
            <div class="flex flex-col gap-4">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1 space-y-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <Badge :variant="getPriorityVariant(announcement.priority)" class="capitalize">
                      {{ announcement.priority }}
                    </Badge>
                    <Badge variant="outline">{{ announcement.category }}</Badge>
                  </div>
                  <CardTitle class="text-2xl leading-tight">
                    {{ announcement.title }}
                  </CardTitle>
                </div>
              </div>
              
              <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <div class="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <span>{{ formatDate(announcement.date) }}</span>
                </div>
                
                <Separator orientation="vertical" class="h-4" />
                
                <div class="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{{ announcement.author }}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div class="space-y-4">
              <p class="text-muted-foreground leading-relaxed">
                {{ announcement.excerpt }}
              </p>
              
              <Separator />
              
              <p class="text-foreground leading-relaxed">
                {{ announcement.content }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Results Summary -->
      <div v-if="filteredAnnouncements.length > 0" class="mt-8 text-center">
        <p class="text-sm text-muted-foreground">
          Showing {{ filteredAnnouncements.length }} of {{ announcements.length }} announcements
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>