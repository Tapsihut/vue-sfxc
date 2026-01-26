<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GraduationCap, Clock, BookOpen, Award, Users, CheckCircle2, FileText, Calendar } from 'lucide-vue-next'

interface Course {
  id: number
  title: string
  duration: string
  level: string
  description: string
  skills: string[]
}

const tesdaCourses = ref<Course[]>([
  {
    id: 1,
    title: 'Driving NC II',
    duration: '3 months',
    level: 'NC II',
    description: 'Develop professional driving skills and competencies for operating light vehicles safely and efficiently in accordance with traffic rules and regulations.',
    skills: ['Defensive Driving', 'Vehicle Maintenance', 'Traffic Rules', 'Road Safety']
  }
])

const requirements = [
  'Birth Certificate (NSO Copy)',
  'Form 138 (Report Card)',
  '2x2 ID Pictures (4 copies)',
  'Certificate of Good Moral Character',
  'Medical Certificate',
  'Barangay Clearance'
]

const benefits = [
  {
    icon: Award,
    title: 'National Certification',
    description: 'Receive TESDA National Certificate upon completion'
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry-experienced and certified trainers'
  },
  {
    icon: BookOpen,
    title: 'Quality Training',
    description: 'Access to modern facilities and equipment'
  },
  {
    icon: GraduationCap,
    title: 'Job Ready',
    description: 'Gain practical skills for immediate employment'
  }
]
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- About TESDA Section -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <!-- <Badge variant="outline" class="mb-4">About Our Program</Badge> -->
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
              Excellence in Technical Education
            </h2>
            <div class="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p>
                St. Francis Xavier College TESDA programs are designed to provide 
                competency-based training that meets industry standards and prepares 
                students for successful careers in their chosen fields.
              </p>
              <p>
                Our training center is equipped with modern facilities and managed by 
                certified instructors who bring real-world experience to the classroom.
              </p>
              <p>
                We are committed to delivering quality technical vocational education 
                that transforms lives and contributes to national development.
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Card v-for="benefit in benefits" :key="benefit.title" class="text-center hover:shadow-lg transition-shadow">
              <CardHeader class="pb-3">
                <div class="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <component :is="benefit.icon" class="h-6 w-6 text-primary" />
                </div>
                <CardTitle class="text-base">{{ benefit.title }}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription class="text-xs sm:text-sm">{{ benefit.description }}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <Separator />

    <!-- Courses Section -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-12 md:mb-16">
          <!-- <Badge variant="outline" class="mb-4">Available Programs</Badge> -->
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            TESDA Courses Offered
          </h2>
          <p class="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Choose from our wide range of industry-aligned technical vocational courses
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            v-for="course in tesdaCourses" 
            :key="course.id" 
            class="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <CardHeader>
              <div class="flex items-start justify-between gap-2 mb-2">
                <Badge variant="secondary">{{ course.level }}</Badge>
                <div class="flex items-center text-muted-foreground text-xs sm:text-sm">
                  <Clock class="h-4 w-4 mr-1" />
                  {{ course.duration }}
                </div>
              </div>
              <CardTitle class="text-lg sm:text-xl leading-tight">{{ course.title }}</CardTitle>
              <CardDescription class="text-sm leading-relaxed">
                {{ course.description }}
              </CardDescription>
            </CardHeader>
            <CardContent class="flex-1 flex flex-col">
              <div class="mb-4 flex-1">
                <p class="text-sm font-semibold text-foreground mb-2">Key Competencies:</p>
                <div class="flex flex-wrap gap-1.5">
                  <Badge 
                    v-for="skill in course.skills" 
                    :key="skill" 
                    variant="outline"
                    class="text-xs"
                  >
                    {{ skill }}
                  </Badge>
                </div>
              </div>
              <Button class="w-full" variant="outline">
                <BookOpen class="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <Separator />

    <!-- Requirements Section -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            Admission Requirements
          </h2>
          <p class="text-muted-foreground text-sm sm:text-base">
            Please prepare the following documents for enrollment
          </p>
        </div>

        <Card class="shadow-lg">
          <CardContent class="pt-6">
            <ul class="space-y-3">
              <li 
                v-for="(requirement, index) in requirements" 
                :key="index"
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <CheckCircle2 class="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span class="text-sm sm:text-base text-foreground">{{ requirement }}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>