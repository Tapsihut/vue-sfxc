<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

interface Requirement {
  name: string
  description: string
}

const selectedStudentType = ref<'freshmen' | 'transferee'>('freshmen')

const freshmenRequirements: Requirement[] = [
  { name: 'Form 138 (Report Card)', description: 'Original copy from senior high school' },
  { name: 'PSA Birth Certificate', description: 'Original or certified true copy' },
  { name: '2x2 ID Pictures', description: '2 pieces with white background' },
  { name: 'Good Moral Certificate', description: 'From previous school' },
  { name: 'Senior High School Diploma', description: 'Photocopy' },
  { name: 'Medical Certificate', description: 'From licensed physician' },
  { name: 'Barangay Clearance', description: 'From current residence' },
]

const transfereeRequirements: Requirement[] = [
  { name: 'Honorable Dismissal', description: 'Transfer credentials certificate' },
  { name: 'Transcript of Records', description: 'Original copy from previous institution' },
  { name: 'Good Moral Certificate', description: 'From previous institution' },
  { name: 'PSA Birth Certificate', description: 'Original or certified true copy' },
  { name: '2x2 ID Pictures', description: '2 pieces with white background' },
  { name: 'Medical Certificate', description: 'From licensed physician' },
  { name: 'Barangay Clearance', description: 'From current residence' },
]

const enrollmentSteps = [
  {
    step: 1,
    title: 'Prepare Requirements',
    description: 'Gather all necessary documents based on your student type'
  },
  {
    step: 2,
    title: 'Visit Admissions Office',
    description: 'Submit your complete requirements to the Admissions Office'
  },
  {
    step: 3,
    title: 'Assessment and Interview',
    description: 'Undergo entrance examination and interview if required'
  },
  {
    step: 4,
    title: 'Pay Enrollment Fees',
    description: 'Proceed to Cashier for payment of fees'
  },
  {
    step: 5,
    title: 'Complete Enrollment',
    description: 'Receive class schedule and student ID'
  }
]

const currentRequirements = () => {
  return selectedStudentType.value === 'freshmen' ? freshmenRequirements : transfereeRequirements
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
          Admission Requirements
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-2xl">
          Complete guide to admission requirements and enrollment process
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
      
      <!-- Student Type Selection -->
      <div class="flex justify-center mb-16">
        <div class="inline-flex rounded-lg border p-1 bg-muted/50">
          <Button
            variant="ghost"
            size="lg"
            @click="selectedStudentType = 'freshmen'"
            :class="[
              'px-8',
              selectedStudentType === 'freshmen' 
                ? 'bg-background shadow-sm' 
                : 'hover:bg-transparent'
            ]"
          >
            Freshmen
          </Button>
          <Button
            variant="ghost"
            size="lg"
            @click="selectedStudentType = 'transferee'"
            :class="[
              'px-8',
              selectedStudentType === 'transferee' 
                ? 'bg-background shadow-sm' 
                : 'hover:bg-transparent'
            ]"
          >
            Transferee
          </Button>
        </div>
      </div>

      <!-- Requirements Section -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">Document Requirements</h2>
          <p class="text-muted-foreground">
            {{ selectedStudentType === 'freshmen' ? 'For new students applying to SFXC' : 'For students transferring from other institutions' }}
          </p>
        </div>

        <Card>
          <CardContent class="p-8">
            <div class="space-y-4">
              <div
                v-for="(req, index) in currentRequirements()"
                :key="index"
                class="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors"
              >
                <div class="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm mt-1">
                  {{ index + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold mb-1">{{ req.name }}</h3>
                  <p class="text-sm text-muted-foreground">{{ req.description }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator class="my-20" />

      <!-- Enrollment Guide Section -->
      <div>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">Enrollment Guide</h2>
          <p class="text-muted-foreground">Follow these steps to complete your enrollment</p>
        </div>

        <div class="space-y-8">
          <div
            v-for="(step, index) in enrollmentSteps"
            :key="step.step"
            class="flex gap-6"
          >
            <div class="shrink-0">
              <div class="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                {{ step.step }}
              </div>
              <div
                v-if="index < enrollmentSteps.length - 1"
                class="w-0.5 h-12 bg-border mx-auto mt-2"
              ></div>
            </div>
            <div class="flex-1 pb-8">
              <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
              <p class="text-muted-foreground">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>