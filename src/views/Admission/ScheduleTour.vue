<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  tourDate: string
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
  tourDate: '',
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

const handleSubmit = async () => {
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
    tourDate: '',
    tourTime: '',
    visitors: '1',
    program: '',
    message: ''
  }
  isSubmitted.value = false
}
</script>

<template>
  <section id="hero" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>

      <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
          Schedule a Campus Tour
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-2xl">
          Experience SFXC firsthand. Book your personalized campus visit today.
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  </section>

  <div class="min-h-screen bg-background py-16 md:py-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid md:grid-cols-2 gap-12 mb-16">
        <!-- Tour Information -->
        <div>
          <h2 class="text-3xl font-bold mb-6">Why Visit SFXC?</h2>
          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle class="text-lg">Explore Our Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-muted-foreground">
                  Tour our state-of-the-art classrooms, laboratories, library, and recreational facilities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-lg">Meet Faculty & Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-muted-foreground">
                  Interact with our dedicated faculty members and current students to learn about campus life.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-lg">Get Your Questions Answered</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-muted-foreground">
                  Our admissions staff will be available to answer any questions about programs and enrollment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-lg">Tour Duration & Details</CardTitle>
              </CardHeader>
              <CardContent>
                <ul class="space-y-2 text-muted-foreground">
                  <li class="flex items-start">
                    <span class="font-semibold mr-2 text-foreground">Duration:</span>
                    Approximately 60-90 minutes
                  </li>
                  <li class="flex items-start">
                    <span class="font-semibold mr-2 text-foreground">Days:</span>
                    Monday to Friday
                  </li>
                  <li class="flex items-start">
                    <span class="font-semibold mr-2 text-foreground">Times:</span>
                    9:00 AM to 4:00 PM
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Booking Form -->
        <div>
          <Card v-if="!isSubmitted">
            <CardHeader>
              <CardTitle>Book Your Campus Tour</CardTitle>
              <CardDescription>Fill out the form below to schedule your visit</CardDescription>
            </CardHeader>
            <CardContent>
              <form @submit.prevent="handleSubmit" class="space-y-6">
                
                <!-- Name Fields -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <Label for="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      v-model="form.firstName" 
                      placeholder="Juan" 
                      required 
                    />
                  </div>
                  <div class="space-y-2">
                    <Label for="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      v-model="form.lastName" 
                      placeholder="Dela Cruz" 
                      required 
                    />
                  </div>
                </div>

                <!-- Email -->
                <div class="space-y-2">
                  <Label for="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    v-model="form.email" 
                    placeholder="juan.delacruz@example.com" 
                    required 
                  />
                </div>

                <!-- Phone -->
                <div class="space-y-2">
                  <Label for="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    v-model="form.phone" 
                    placeholder="+63 912 345 6789" 
                    required 
                  />
                </div>

                <!-- Date and Time -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <Label for="tourDate">Preferred Date</Label>
                    <Input 
                      id="tourDate" 
                      type="date" 
                      v-model="form.tourDate" 
                      required 
                    />
                  </div>
                  <div class="space-y-2">
                    <Label for="tourTime">Preferred Time</Label>
                    <Select v-model="form.tourTime" required>
                      <option value="" disabled>Select time</option>
                      <option 
                        v-for="time in tourTimes" 
                        :key="time" 
                        :value="time"
                      >
                        {{ time }}
                      </option>
                    </Select>
                  </div>
                </div>

                <!-- Number of Visitors -->
                <div class="space-y-2">
                  <Label for="visitors">Number of Visitors</Label>
                  <Select v-model="form.visitors">
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5+ people</option>
                  </Select>
                </div>

                <!-- Program Interest -->
                <div class="space-y-2">
                  <Label for="program">Program of Interest</Label>
                  <Select v-model="form.program">
                    <option value="" disabled>Select a program</option>
                    <option 
                      v-for="program in programs" 
                      :key="program" 
                      :value="program"
                    >
                      {{ program }}
                    </option>
                  </Select>
                </div>

                <!-- Additional Message -->
                <div class="space-y-2">
                  <Label for="message">Additional Notes (Optional)</Label>
                  <Textarea 
                    id="message" 
                    v-model="form.message" 
                    placeholder="Any specific areas you'd like to see or questions you have..."
                    rows="4"
                  />
                </div>

                <Button 
                  type="submit" 
                  class="w-full" 
                  size="lg"
                  :disabled="isLoading"
                >
                  {{ isLoading ? 'Submitting...' : 'Schedule Tour' }}
                </Button>
              </form>
            </CardContent>
          </Card>

          <!-- Success Message -->
          <Card v-else class="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle class="text-green-900">Tour Scheduled Successfully</CardTitle>
              <CardDescription class="text-green-700">
                We've received your campus tour request
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="p-4 bg-white rounded-lg border">
                <p class="text-sm text-muted-foreground mb-3">Tour Details:</p>
                <div class="space-y-2 text-sm">
                  <p><span class="font-semibold">Name:</span> {{ form.firstName }} {{ form.lastName }}</p>
                  <p><span class="font-semibold">Date:</span> {{ form.tourDate }}</p>
                  <p><span class="font-semibold">Time:</span> {{ form.tourTime }}</p>
                  <p><span class="font-semibold">Visitors:</span> {{ form.visitors }}</p>
                </div>
              </div>
              
              <p class="text-sm text-muted-foreground">
                A confirmation email will be sent to <span class="font-semibold">{{ form.email }}</span> with your tour details and campus map.
              </p>

              <div class="pt-4 space-y-2">
                <p class="text-sm font-semibold">What to bring:</p>
                <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Valid ID for registration</li>
                  <li>Comfortable walking shoes</li>
                  <li>Questions for our staff</li>
                </ul>
              </div>

              <Button @click="resetForm" variant="outline" class="w-full">
                Schedule Another Tour
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  </div>
</template>