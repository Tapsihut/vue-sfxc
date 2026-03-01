<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

interface TourForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  tourDate: Date | null
  tourTime: string
  visitors: string
  program: string
  message: string
}

const form = ref<TourForm>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  tourDate: null,
  tourTime: '',
  visitors: '1',
  program: '',
  message: ''
})

const isSubmitted = ref(false)
const isLoading = ref(false)

const tourTimes = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM'
]

const programs = [
  'Bachelor of Science in Information Technology',
  'Bachelor of Science in Business Administration',
  'Bachelor of Science in Hospitality Management',
  'Bachelor of Elementary Education',
  'Bachelor of Secondary Education',
  'TESDA Programs',
  'Senior High School',
  'Not Sure Yet'
]

// Philippine holidays for 2025
const holidays = [
  new Date(2025, 1, 25), // EDSA Revolution
  new Date(2025, 3, 17), // Maundy Thursday
  new Date(2025, 3, 18), // Good Friday
  new Date(2025, 4, 1),  // Labor Day
  new Date(2025, 5, 12), // Independence Day
  new Date(2025, 7, 21), // Ninoy Aquino Day
  new Date(2025, 7, 25), // National Heroes Day
  new Date(2025, 10, 30), // Bonifacio Day
  new Date(2025, 11, 25), // Christmas
  new Date(2025, 11, 30), // Rizal Day
  new Date(2025, 11, 31), // New Year's Eve
]

// Current month and year
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
  
  // Add empty slots for days before the month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Add all days of the month
  for (let day = 1; day <= totalDays; day++) {
    days.push(day)
  }
  
  return days
})

const isWeekend = (day: number | null) => {
  if (!day) return false
  const date = new Date(selectedYear.value, selectedMonth.value, day)
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}

const isHoliday = (day: number | null) => {
  if (!day) return false
  const date = new Date(selectedYear.value, selectedMonth.value, day)
  return holidays.some(holiday => 
    holiday.getDate() === day && 
    holiday.getMonth() === selectedMonth.value && 
    holiday.getFullYear() === selectedYear.value
  )
}

const isPastDate = (day: number | null) => {
  if (!day) return false
  const date = new Date(selectedYear.value, selectedMonth.value, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

const isDisabled = (day: number | null) => {
  return isWeekend(day) || isHoliday(day) || isPastDate(day)
}

const isSelected = (day: number | null) => {
  if (!day || !form.value.tourDate) return false
  const date = new Date(selectedYear.value, selectedMonth.value, day)
  return date.getDate() === form.value.tourDate.getDate() &&
         date.getMonth() === form.value.tourDate.getMonth() &&
         date.getFullYear() === form.value.tourDate.getFullYear()
}

const selectDate = (day: number | null) => {
  if (!day || isDisabled(day)) return
  form.value.tourDate = new Date(selectedYear.value, selectedMonth.value, day)
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

const formatDate = (date: Date | null) => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const handleSubmit = async () => {
  if (!form.value.tourDate) {
    alert('Please select a tour date')
    return
  }
  
  isLoading.value = true
  
  setTimeout(() => {
    isLoading.value = false
    isSubmitted.value = true
  }, 1500)
}

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tourDate: null,
    tourTime: '',
    visitors: '1',
    program: '',
    message: ''
  }
  isSubmitted.value = false
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

        <div class="relative z-10 mt-auto w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Schedule Campus Tour
          </h1>
          <p class="text-white/90 mt-3 text-lg md:text-xl">
            Book your visit to SFXC
          </p>
        </div>

        <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
          <svg class="w-full h-8 md:h-16" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card v-if="!isSubmitted">
        <CardContent class="p-6 md:p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            
            <!-- Personal Information -->
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  v-model="form.firstName" 
                  required 
                />
              </div>
              <div class="space-y-2">
                <Label for="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  v-model="form.lastName" 
                  required 
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  v-model="form.email" 
                  required 
                />
              </div>
              <div class="space-y-2">
                <Label for="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  v-model="form.phone" 
                  required 
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="program">Program of Interest</Label>
              <Select v-model="form.program" required>
                <option value="">Select a program</option>
                <option 
                  v-for="program in programs" 
                  :key="program" 
                  :value="program"
                >
                  {{ program }}
                </option>
              </Select>
            </div>

            <!-- Divider -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold mb-4">Tour Schedule</h3>
            </div>

            <!-- Calendar -->
            <div class="space-y-2">
              <Label>Select Date</Label>
              <div class="border rounded-lg p-3">
                <!-- Calendar Header -->
                <div class="flex items-center justify-between mb-3">
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
                <div class="grid grid-cols-7 gap-1 mb-1">
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
                  <button
                    v-for="(day, index) in calendarDays"
                    :key="index"
                    type="button"
                    @click="selectDate(day)"
                    :disabled="!day || isDisabled(day)"
                    :class="[
                      'h-8 w-8 p-0 text-xs rounded transition-colors',
                      !day && 'invisible',
                      day && !isDisabled(day) && !isSelected(day) && 'hover:bg-accent hover:text-accent-foreground',
                      isWeekend(day) && 'bg-red-50 text-red-400 cursor-not-allowed',
                      isHoliday(day) && 'bg-orange-500 text-white cursor-not-allowed',
                      isPastDate(day) && !isWeekend(day) && !isHoliday(day) && 'text-muted-foreground cursor-not-allowed opacity-50',
                      isSelected(day) && 'bg-primary text-primary-foreground font-semibold',
                    ]"
                  >
                    {{ day }}
                  </button>
                </div>

                <!-- Legend -->
                <div class="mt-3 pt-3 border-t flex flex-wrap gap-3 text-[10px]">
                  <div class="flex items-center gap-1.5">
                    <div class="w-2.5 h-2.5 rounded bg-red-50 border border-red-200"></div>
                    <span class="text-muted-foreground">Weekends</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <div class="w-2.5 h-2.5 rounded bg-orange-500"></div>
                    <span class="text-muted-foreground">Holidays</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <div class="w-2.5 h-2.5 rounded bg-primary"></div>
                    <span class="text-muted-foreground">Selected</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="tourTime">Time</Label>
                <Select v-model="form.tourTime" required>
                  <option value="">Select time</option>
                  <option 
                    v-for="time in tourTimes" 
                    :key="time" 
                    :value="time"
                  >
                    {{ time }}
                  </option>
                </Select>
              </div>
              <div class="space-y-2">
                <Label for="visitors">Number of Visitors</Label>
                <Select v-model="form.visitors" required>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5+ people</option>
                </Select>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="message">Message (Optional)</Label>
              <Textarea 
                id="message" 
                v-model="form.message" 
                rows="3"
              />
            </div>

            <Button 
              type="submit" 
              class="w-full md:w-auto md:px-12" 
              size="lg"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Submitting...' : 'Submit Request' }}
            </Button>
          </form>
        </CardContent>
      </Card>

      <!-- Success Message -->
      <Card v-else>
        <CardContent class="p-6 md:p-8">
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold">Request Submitted</h2>
            <p class="text-muted-foreground">Your campus tour has been scheduled</p>
            
            <div class="bg-muted/50 rounded-lg p-6 text-left max-w-md mx-auto mt-6">
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Name:</span>
                  <span class="font-medium">{{ form.firstName }} {{ form.lastName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Date:</span>
                  <span class="font-medium">{{ formatDate(form.tourDate) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Time:</span>
                  <span class="font-medium">{{ form.tourTime }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Visitors:</span>
                  <span class="font-medium">{{ form.visitors }}</span>
                </div>
              </div>
            </div>

            <p class="text-sm text-muted-foreground">
              Confirmation sent to {{ form.email }}
            </p>

            <Button @click="resetForm" variant="outline" class="mt-6">
              Schedule Another Tour
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>