<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Interest {
  id: string
  title: string
  description: string
  courses: string[]
}

interface CourseRecommendation {
  name: string
  code: string
  matchReason: string
  careers: string[]
  skills: string[]
}

const selectedInterests = ref<string[]>([])
const showResults = ref(false)

const interests: Interest[] = [
  {
    id: 'technology',
    title: 'Technology & Innovation',
    description: 'I enjoy working with computers, coding, and emerging technologies',
    courses: ['BSIT', 'BSAIS']
  },
  {
    id: 'business',
    title: 'Business & Entrepreneurship',
    description: 'I am interested in starting businesses and managing organizations',
    courses: ['BSBA', 'BSOA']
  },
  {
    id: 'numbers',
    title: 'Numbers & Analytics',
    description: 'I like working with data, calculations, and financial analysis',
    courses: ['BSA', 'BSAIS']
  },
  {
    id: 'helping',
    title: 'Helping & Teaching',
    description: 'I want to make a difference by educating and guiding others',
    courses: ['BEED', 'BSED']
  },
  {
    id: 'service',
    title: 'Public Service & Safety',
    description: 'I am passionate about law enforcement and community protection',
    courses: ['BSCRIM']
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Tourism',
    description: 'I enjoy customer service, travel, and hotel management',
    courses: ['BSHM']
  },
  {
    id: 'creative',
    title: 'Creative & Design',
    description: 'I like expressing ideas through art, design, and creativity',
    courses: ['BSIT', 'BSHM']
  },
  {
    id: 'leadership',
    title: 'Leadership & Management',
    description: 'I am good at leading teams and organizing projects',
    courses: ['BSBA', 'BSOA', 'BSCRIM']
  }
]

const courseDatabase: Record<string, CourseRecommendation> = {
  'BSIT': {
    name: 'Bachelor of Science in Information Technology',
    code: 'BSIT',
    matchReason: 'Perfect for tech enthusiasts who want to build software and manage IT systems',
    careers: ['Software Developer', 'Network Administrator', 'Systems Analyst', 'IT Consultant'],
    skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Technical Analysis']
  },
  'BSBA': {
    name: 'Bachelor of Science in Business Administration',
    code: 'BSBA',
    matchReason: 'Ideal for those who want to lead organizations and develop business strategies',
    careers: ['Business Manager', 'Operations Manager', 'Entrepreneur', 'Management Consultant'],
    skills: ['Leadership', 'Strategic Planning', 'Communication', 'Decision Making']
  },
  'BSA': {
    name: 'Bachelor of Science in Accountancy',
    code: 'BSA',
    matchReason: 'Best choice for those who excel in mathematics and financial analysis',
    careers: ['Certified Public Accountant', 'Auditor', 'Tax Consultant', 'Financial Analyst'],
    skills: ['Attention to Detail', 'Analytical Thinking', 'Ethics', 'Financial Management']
  },
  'BSAIS': {
    name: 'Bachelor of Science in Accounting Information System',
    code: 'BSAIS',
    matchReason: 'Combines technology and accounting for modern business solutions',
    careers: ['Systems Accountant', 'IT Auditor', 'Business Analyst', 'Data Analyst'],
    skills: ['Technical Skills', 'Accounting Knowledge', 'Data Analysis', 'System Design']
  },
  'BSOA': {
    name: 'Bachelor of Science in Office Administration',
    code: 'BSOA',
    matchReason: 'Great for organized individuals who excel in administrative and management tasks',
    careers: ['Office Manager', 'Administrative Officer', 'Executive Assistant', 'Operations Coordinator'],
    skills: ['Organization', 'Communication', 'Time Management', 'Coordination']
  },
  'BSCRIM': {
    name: 'Bachelor of Science in Criminology',
    code: 'BSCRIM',
    matchReason: 'Perfect for those dedicated to public safety and law enforcement',
    careers: ['Police Officer', 'Criminal Investigator', 'Forensic Specialist', 'Security Manager'],
    skills: ['Physical Fitness', 'Critical Thinking', 'Ethics', 'Investigation']
  },
  'BEED': {
    name: 'Bachelor of Elementary Education',
    code: 'BEED',
    matchReason: 'Ideal for patient and caring individuals who love teaching children',
    careers: ['Elementary Teacher', 'Curriculum Developer', 'Educational Coordinator', 'Child Development Specialist'],
    skills: ['Patience', 'Communication', 'Creativity', 'Child Psychology']
  },
  'BSED': {
    name: 'Bachelor of Secondary Education',
    code: 'BSED',
    matchReason: 'Great for subject specialists who want to teach high school students',
    careers: ['High School Teacher', 'Subject Specialist', 'Curriculum Developer', 'Education Coordinator'],
    skills: ['Subject Expertise', 'Communication', 'Classroom Management', 'Mentoring']
  },
  'BSHM': {
    name: 'Bachelor of Science in Hospitality Management',
    code: 'BSHM',
    matchReason: 'Perfect for people-oriented individuals who love customer service',
    careers: ['Hotel Manager', 'Event Coordinator', 'Restaurant Manager', 'Tourism Officer'],
    skills: ['Customer Service', 'Communication', 'Problem Solving', 'Cultural Awareness']
  }
}

const toggleInterest = (interestId: string) => {
  const index = selectedInterests.value.indexOf(interestId)
  if (index > -1) {
    selectedInterests.value.splice(index, 1)
  } else {
    selectedInterests.value.push(interestId)
  }
}

const getRecommendations = (): CourseRecommendation[] => {
  if (selectedInterests.value.length === 0) return []

  const courseScores: Record<string, number> = {}
  
  selectedInterests.value.forEach(interestId => {
    const interest = interests.find(i => i.id === interestId)
    if (interest) {
      interest.courses.forEach(courseCode => {
        courseScores[courseCode] = (courseScores[courseCode] || 0) + 1
      })
    }
  })

  const sortedCourses = Object.entries(courseScores)
    .sort(([, a], [, b]) => b - a)
    .map(([code]) => courseDatabase[code])
    .filter((course): course is CourseRecommendation => course !== undefined)

  return sortedCourses.slice(0, 3)
}

const handleShowResults = () => {
  if (selectedInterests.value.length > 0) {
    showResults.value = true
  }
}

const resetQuiz = () => {
  selectedInterests.value = []
  showResults.value = false
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
          Course Selection Guide
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-2xl">
          Not sure which program to choose? Let us help you find your path.
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
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Introduction -->
      <div v-if="!showResults" class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Find Your Perfect Course</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Select the areas that interest you most. We'll recommend courses that match your passions and career goals.
        </p>
        <p class="text-sm text-muted-foreground mt-2">
          Select at least one interest to get started
        </p>
      </div>

      <!-- Interest Selection -->
      <div v-if="!showResults">
        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <Card
            v-for="interest in interests"
            :key="interest.id"
            :class="[
              'cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden group',
              selectedInterests.includes(interest.id)
                ? 'border-primary ring-2 ring-primary/20 shadow-lg scale-[1.02]'
                : 'hover:border-primary/50 hover:-translate-y-1'
            ]"
            @click="toggleInterest(interest.id)"
          >
            <!-- Selection Indicator Bar -->
            <div
              :class="[
                'absolute left-0 top-0 h-full w-1.5 transition-all duration-300',
                selectedInterests.includes(interest.id)
                  ? 'bg-primary scale-y-100'
                  : 'bg-transparent scale-y-0'
              ]"
            ></div>

            <!-- Animated Background Gradient -->
            <div
              :class="[
                'absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300',
                selectedInterests.includes(interest.id) && 'opacity-100'
              ]"
            ></div>

            <CardHeader class="relative">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <CardTitle class="text-lg mb-2 transition-colors duration-200">
                    {{ interest.title }}
                  </CardTitle>
                  <CardDescription class="text-sm leading-relaxed">
                    {{ interest.description }}
                  </CardDescription>
                </div>
                
                <!-- Animated Checkbox -->
                <div class="relative shrink-0">
                  <div
                    :class="[
                      'w-6 h-6 rounded-md border-2 transition-all duration-300 flex items-center justify-center',
                      selectedInterests.includes(interest.id)
                        ? 'border-primary bg-primary rotate-360 scale-110'
                        : 'border-muted-foreground/40 bg-background group-hover:border-primary/50 group-hover:scale-105'
                    ]"
                  >
                    <!-- Checkmark -->
                    <svg
                      v-if="selectedInterests.includes(interest.id)"
                      class="w-4 h-4 text-white animate-in fade-in zoom-in duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  
                  <!-- Ripple Effect on Selection -->
                  <div
                    v-if="selectedInterests.includes(interest.id)"
                    class="absolute inset-0 rounded-md border-2 border-primary animate-ping opacity-75"
                  ></div>
                </div>
              </div>
            </CardHeader>

            <!-- Hover Effect Border -->
            <div
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </Card>
        </div>

        <!-- Selected Count Indicator -->
        <div class="flex flex-col items-center gap-4">
          <div
            v-if="selectedInterests.length > 0"
            class="text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <span class="font-semibold text-primary">{{ selectedInterests.length }}</span>
            {{ selectedInterests.length === 1 ? 'interest' : 'interests' }} selected
          </div>
          
          <Button
            size="lg"
            @click="handleShowResults"
            :disabled="selectedInterests.length === 0"
            class="min-w-60 transition-all duration-300"
            :class="selectedInterests.length > 0 && 'shadow-lg hover:shadow-xl'"
          >
            <span class="flex items-center gap-2">
              Show My Recommendations
              <svg
                class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Button>
        </div>
      </div>

      <!-- Results -->
      <div v-else>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Your Recommended Courses</h2>
          <p class="text-muted-foreground">
            Based on your interests, here are the programs that best match your profile
          </p>
        </div>

        <div class="space-y-8 mb-12">
          <Card
            v-for="(course, index) in getRecommendations()"
            :key="course.code"
            class="overflow-hidden"
          >
            <CardHeader class="bg-primary/5">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <Badge variant="default">
                      {{ index === 0 ? 'Best Match' : `Match ${index + 1}` }}
                    </Badge>
                    <Badge variant="outline">{{ course.code }}</Badge>
                  </div>
                  <CardTitle class="text-2xl">{{ course.name }}</CardTitle>
                  <CardDescription class="mt-2 text-base">
                    {{ course.matchReason }}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent class="pt-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold mb-3">Career Opportunities</h4>
                  <ul class="space-y-2">
                    <li
                      v-for="career in course.careers"
                      :key="career"
                      class="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span class="text-primary mt-1">&#8226;</span>
                      <span>{{ career }}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold mb-3">Key Skills You'll Develop</h4>
                  <div class="flex flex-wrap gap-2">
                    <Badge
                      v-for="skill in course.skills"
                      :key="skill"
                      variant="secondary"
                    >
                      {{ skill }}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator class="my-12" />

        <!-- Additional Resources -->
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Learn More</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground mb-4">
                Explore detailed information about each program
              </p>
              <Button variant="outline" class="w-full" as-child>
                <a href="/academics/programs">View All Programs</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Schedule a Visit</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground mb-4">
                Tour our campus and see facilities for your chosen program
              </p>
              <Button variant="outline" class="w-full" as-child>
                <a href="/admission/schedule-tour">Book Campus Tour</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Talk to Admissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground mb-4">
                Get personalized guidance from our admissions team
              </p>
              <Button variant="outline" class="w-full" as-child>
                <a href="/contact">Contact Us</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div class="flex justify-center">
          <Button variant="ghost" @click="resetQuiz">
            Start Over
          </Button>
        </div>
      </div>

    </div>
  </div>
</template>