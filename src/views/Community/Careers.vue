<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface JobOpening {
  id: number
  title: string
  department: string
  type: 'full-time' | 'part-time' | 'contract'
  location: string
  description: string
  requirements: string[]
  posted: string
}

const jobOpenings: JobOpening[] = [
  {
    id: 1,
    title: 'Faculty - Information Technology',
    department: 'College of Computer Studies',
    type: 'full-time',
    location: 'Main Campus',
    description: 'Seeking passionate educators to teach programming, database management, and software development courses.',
    requirements: [
      "Master's degree in Computer Science or related field",
      'Minimum 2 years teaching experience',
      'Proficiency in programming languages',
      'Excellent communication skills'
    ],
    posted: '2026-02-10'
  },
  {
    id: 2,
    title: 'Faculty - Business Administration',
    department: 'College of Business',
    type: 'full-time',
    location: 'Main Campus',
    description: 'Looking for dynamic faculty members to teach business management, entrepreneurship, and accounting courses.',
    requirements: [
      "Master's degree in Business Administration or related field",
      'Industry experience preferred',
      'Strong analytical skills',
      'Commitment to academic excellence'
    ],
    posted: '2026-02-12'
  },
  {
    id: 3,
    title: 'Library Assistant',
    department: 'Library Services',
    type: 'part-time',
    location: 'Main Campus',
    description: 'Assist with library operations, student support, and resource management.',
    requirements: [
      "Bachelor's degree in Library Science or related field",
      'Customer service experience',
      'Organized and detail-oriented',
      'Computer literacy'
    ],
    posted: '2026-02-08'
  },
  {
    id: 4,
    title: 'Guidance Counselor',
    department: 'Student Affairs',
    type: 'full-time',
    location: 'Main Campus',
    description: 'Provide counseling services, career guidance, and student support programs.',
    requirements: [
      "Master's degree in Guidance and Counseling",
      'Licensed Professional Counselor',
      'Experience with student counseling',
      'Empathetic and approachable'
    ],
    posted: '2026-02-15'
  },
]

const selectedJob = ref<JobOpening | null>(null)
const showContactInfo = ref(false)
const selectedFilter = ref('all')

const filteredJobs = computed(() => {
  if (selectedFilter.value === 'all') return jobOpenings
  return jobOpenings.filter(job => job.type === selectedFilter.value)
})

const openJobDetails = (job: JobOpening) => {
  selectedJob.value = job
  showContactInfo.value = false
}

const closeJobDetails = () => {
  selectedJob.value = null
  showContactInfo.value = false
}

const showContact = (job: JobOpening) => {
  selectedJob.value = job
  showContactInfo.value = true
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
        class="h-[50vh] md:h-[60vh] flex flex-col relative bg-[url('https://placehold.co/1920x1080?text=1920x1080')] bg-cover bg-center bg-no-repeat"
      >
        <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-tertiary/40 to-transparent"></div>

        <div class="relative z-10 mt-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Career Opportunities
          </h1>
          <p class="text-white/90 mt-3 text-lg md:text-xl max-w-2xl">
            Join our team of dedicated educators and staff at SFXC
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
        <div class="flex gap-2">
          <Button
            :variant="selectedFilter === 'all' ? 'default' : 'outline'"
            size="sm"
            @click="selectedFilter = 'all'"
          >
            All Positions
          </Button>
          <Button
            :variant="selectedFilter === 'full-time' ? 'default' : 'outline'"
            size="sm"
            @click="selectedFilter = 'full-time'"
          >
            Full-Time
          </Button>
          <Button
            :variant="selectedFilter === 'part-time' ? 'default' : 'outline'"
            size="sm"
            @click="selectedFilter = 'part-time'"
          >
            Part-Time
          </Button>
          <Button
            :variant="selectedFilter === 'contract' ? 'default' : 'outline'"
            size="sm"
            @click="selectedFilter = 'contract'"
          >
            Contract
          </Button>
        </div>
      </div>
    </section>

    <!-- Job Listings -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-6">
          <Card
            v-for="(job, index) in filteredJobs"
            :key="job.id"
            class="group cursor-pointer hover:shadow-lg transition-all duration-300 animate-fade-in"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="openJobDetails(job)"
          >
            <CardContent class="p-6">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {{ job.title }}
                  </h3>
                  <div class="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                    <span>{{ job.department }}</span>
                    <span>•</span>
                    <span>{{ job.location }}</span>
                    <span>•</span>
                    <span>{{ job.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }}</span>
                  </div>
                  <p class="text-sm text-muted-foreground line-clamp-2">
                    {{ job.description }}
                  </p>
                </div>
                <div class="flex flex-col items-end gap-2">
                  <span class="text-xs text-muted-foreground">
                    Posted {{ formatDate(job.posted) }}
                  </span>
                  <Button size="sm" @click.stop="showContact(job)">
                    Contact Us
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Empty State -->
        <div v-if="filteredJobs.length === 0" class="text-center py-16">
          <p class="text-muted-foreground text-lg">No positions available at the moment</p>
        </div>
      </div>
    </section>

    <!-- Job Details Modal -->
    <Transition name="fade">
      <div
        v-if="selectedJob"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-4"
        @click="closeJobDetails"
      >
        <div class="min-h-screen flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            class="fixed top-4 right-4 text-white hover:bg-white/20 z-10"
            @click="closeJobDetails"
          >
            ✕
          </Button>

          <div
            class="relative w-full max-w-3xl bg-background rounded-lg animate-scale-in max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <!-- Contact Information -->
            <div v-if="showContactInfo" class="p-6 md:p-8">
              <h2 class="text-2xl font-bold mb-2">Contact Human Resources</h2>
              <p class="text-muted-foreground mb-6">Get in touch with our HR department for more information about this position.</p>
              
              <div class="space-y-6">
                <div class="bg-muted/50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 class="font-semibold mb-1">Position of Interest</h3>
                    <p class="text-muted-foreground">{{ selectedJob.title }}</p>
                  </div>

                  <div class="border-t pt-4 space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">Office Address</h4>
                      <p class="text-muted-foreground">
                        Saint Francis Xavier College<br>
                        Human Resources Department<br>
                        Main Campus, Cagayan de Oro City<br>
                        Misamis Oriental, Philippines
                      </p>
                    </div>

                    <div>
                      <h4 class="font-semibold mb-2">Email</h4>
                      <p class="text-muted-foreground">hr@sfxc.edu.ph</p>
                      <p class="text-muted-foreground">careers@sfxc.edu.ph</p>
                    </div>

                    <div>
                      <h4 class="font-semibold mb-2">Phone</h4>
                      <p class="text-muted-foreground">(088) 123-4567</p>
                      <p class="text-muted-foreground">(088) 123-4568</p>
                    </div>

                    <div>
                      <h4 class="font-semibold mb-2">Office Hours</h4>
                      <p class="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
                      <p class="text-muted-foreground text-sm">Closed on weekends and holidays</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" @click="showContactInfo = false" class="w-full">
                  Back to Job Details
                </Button>
              </div>
            </div>

            <!-- Job Details -->
            <div v-else class="p-6 md:p-8">
              <div class="mb-6">
                <h2 class="text-3xl font-bold mb-2">{{ selectedJob.title }}</h2>
                <div class="flex flex-wrap gap-2 text-sm text-muted-foreground mb-1">
                  <span>{{ selectedJob.department }}</span>
                  <span>•</span>
                  <span>{{ selectedJob.location }}</span>
                </div>
                <span class="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {{ selectedJob.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }}
                </span>
              </div>

              <div class="space-y-6">
                <div>
                  <h3 class="font-semibold mb-2">Description</h3>
                  <p class="text-muted-foreground">{{ selectedJob.description }}</p>
                </div>

                <div>
                  <h3 class="font-semibold mb-2">Requirements</h3>
                  <ul class="space-y-2">
                    <li 
                      v-for="(req, index) in selectedJob.requirements" 
                      :key="index"
                      class="flex items-start gap-2 text-muted-foreground"
                    >
                      <span class="text-primary font-bold shrink-0">•</span>
                      {{ req }}
                    </li>
                  </ul>
                </div>

                <div class="pt-4 border-t">
                  <Button @click="showContact(selectedJob)" class="w-full" size="lg">
                    Contact HR Department
                  </Button>
                </div>
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>