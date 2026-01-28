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

    <!-- Driving NC II Hero Section -->
    <section class="relative h-[70vh] min-h-500px max-h-700px overflow-hidden">
      <!-- Hero Image -->
      <div class="absolute inset-0">
        <img 
          src="@/assets/images/sfxc-building.jpg"
          alt="Professional Driving Training"
          class="w-full h-full object-cover"
        />
        <!-- Overlay -->
        <div class="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <!-- Content -->
      <div class="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div class="max-w-xl">
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Driving NC II
          </h1>
          
          <p class="text-lg text-white/80 mb-8 leading-relaxed">
            Professional driving training program for operating light vehicles safely and efficiently.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4">
            <Button size="lg" class="bg-white text-black hover:bg-white/90">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Details Section -->
    <section class="py-16 sm:py-20 bg-background">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
          <!-- Key Competencies -->
          <Card class="border-0 shadow-sm">
            <CardHeader>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen class="h-5 w-5 text-primary" />
                </div>
                <CardTitle class="text-xl">Key Competencies</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-4">
                <li 
                  v-for="skill in tesdaCourses[0]?.skills" 
                  :key="skill"
                  class="flex items-center gap-3"
                >
                  <CheckCircle2 class="h-5 w-5 text-primary shrink-0" />
                  <span class="text-muted-foreground">{{ skill }}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <!-- Requirements -->
          <Card class="border-0 shadow-sm">
            <CardHeader>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText class="h-5 w-5 text-primary" />
                </div>
                <CardTitle class="text-xl">Admission Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-4">
                <li 
                  v-for="(requirement, index) in requirements" 
                  :key="index"
                  class="flex items-center gap-3"
                >
                  <CheckCircle2 class="h-5 w-5 text-primary shrink-0" />
                  <span class="text-muted-foreground">{{ requirement }}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <Separator />
  </div>
</template>