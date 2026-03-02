<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

interface ProgramSection {
  title: string
  contentBlocks: {
    type: 'paragraph' | 'list' | 'subtitle' | 'html'
    content?: string
    items?: string[]
  }[]
}

const programDetails: ProgramSection[] = [
  {
    title: 'WHAT ARE THE MAJOR ACHIEVEMENTS OF THE PROGRAM?',
    contentBlocks: [
      { type: 'html', content: '<strong>March 2025 LET:</strong> TOP 6 Best Performing School Nationwide Category A (100+ Examinees)' },
      { type: 'html', content: '<strong>March 2024 LET:</strong> TOP 7 - JULCRIS MARK JABONERO' },
      { type: 'html', content: '<strong>October 2022 LET:</strong> TOP 2 - ROLJANE MANILAG' }
    ]
  },
  {
    title: 'WHAT IS BACHELOR IN ELEMENTARY EDUCATION?',
    contentBlocks: [
      { type: 'paragraph', content: 'The Bachelor in Elementary Education (BEEd) is an undergraduate program designed to train students to become elementary school teachers. It focuses on child development, teaching methods, curriculum design, and classroom management. Graduates are equipped to teach a wide range of subjects to young learners, from kindergarten to grade school.' }
    ]
  },
  {
    title: 'WHAT SUBJECTS ARE COVERED IN BEEd?',
    contentBlocks: [
      { type: 'paragraph', content: 'Core subjects typically include:' },
      { type: 'list', items: [
        'Child Development',
        'Foundations of Education',
        'Educational Psychology',
        'Curriculum and Instruction',
        'Classroom Management',
        'Language and Literacy',
        'Mathematics for Elementary Teachers',
        'Science for Elementary Teachers',
        'Social Studies for Elementary Teachers',
        'Assessment and Evaluation',
        'Arts and PE (Physical Education) for Children'
      ]}
    ]
  },
  {
    title: 'WHAT ARE THE OPPORTUNITIES AFTER COMPLETING BEEd?',
    contentBlocks: [
      { type: 'paragraph', content: 'BEEd opens up roles and occupation opportunities, including:' },
      { type: 'list', items: [
        'Elementary School Teacher',
        'Special Education Teacher',
        'Early Childhood Educator',
        'Curriculum Developer',
        'Education Coordinator',
        'Educational Consultant',
        'School Administrator',
        'Academic Advisor',
        'Private Tutor',
        'Education Researcher'
      ]}
    ]
  },
  {
    title: 'WHAT SKILLS WILL I DEVELOP AS A BEEd STUDENT?',
    contentBlocks: [
      { type: 'paragraph', content: 'Key skills developed during the course include:' },
      { type: 'list', items: [
        'Effective teaching and communication',
        'Classroom management',
        'Child development understanding',
        'Curriculum planning and design',
        'Assessment and evaluation',
        'Creativity in lesson planning',
        'Adaptability to diverse learning styles',
        'Critical thinking and problem-solving',
        'Collaboration and teamwork'
      ]}
    ]
  },
  {
    title: 'CAN I PURSUE HIGHER STUDIES AFTER BEEd?',
    contentBlocks: [
      { type: 'paragraph', content: 'Yes, there are several options for further studies after completing a BEEd, such as:' },
      { type: 'list', items: [
        'Master’s in Elementary Education',
        'Master’s in Special Education',
        'Master’s in Early Childhood Education',
        'Master’s in Education (M.Ed.)',
        'Master’s in Curriculum and Instruction',
        'Master’s in Educational Leadership',
        'Doctorate in Education (Ed.D.)',
        'Postgraduate certifications in various educational specialties'
      ]}
    ]
  },
  {
    title: 'CAN I PURSUE THE BEEd ONLINE AT ST. FRANCIS XAVIER COLLEGE?',
    contentBlocks: [
      { type: 'paragraph', content: 'SFXC’s BEEd is offered as a blended program, combining both face-to-face, in-person classes and online learning. This flexible approach ensures that students benefit from hands-on experiences, direct interaction with faculty, and collaborative activities with peers, all of which are essential for developing strong communication, critical thinking, and language skills.' }
    ]
  },
  {
    title: 'WHAT IS THE TYPICAL DURATION OF THE PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'The program usually takes about four years to complete if attending full-time. Part-time students may take longer, depending on their course load. Graduates can review and take the board exam (LEPT—Licensure Examination for Professional Teachers) after finishing the program at SFXC.' }
    ]
  },
  {
    title: 'WHAT ARE THE PRE-REQUISITES FOR ADMISSION?',
    contentBlocks: [
      { type: 'paragraph', content: 'To be eligible for admission to the BEEd program, applicants must meet the following requirements:' },
      { type: 'list', items: [
        'High School Diploma or its equivalent',
        'Completed Application Form',
        'Submission of required documents such as Birth Certificate, and Transcript of Records (for transferees).'
      ]}
    ]
  },
  {
    title: 'HOW CAN I ENHANCE MY EMPLOYABILITY AFTER GRADUATION?',
    contentBlocks: [
      { type: 'paragraph', content: 'Graduates can enhance their employability by:' },
      { type: 'list', items: [
        'Gaining Practical Experience',
        'Earning Certifications',
        'Developing a Portfolio',
        'Staying Updated',
        'Improving Digital Literacy',
        'Seeking Mentorship'
      ]}
    ]
  },
  {
    title: 'HOW CAN I APPLY FOR THE BEEd PROGRAM?',
    contentBlocks: [
      { type: 'html', content: 'To enroll, <router-link to="/admission/enrollment" class="text-primary hover:underline font-bold">click here</router-link> to learn more.' },
      { type: 'paragraph', content: 'Interested applicants are encouraged to submit their applications through the Admission and Scholarship Office. They can provide further information and assistance with the application process. Please ensure that all required documents are submitted before the deadline to be considered for admission.' },
      { type: 'paragraph', content: 'For further inquiries, kindly visit or contact offices any time between 8:00 AM to 5:00 PM, Monday to Friday.' },
      { type: 'html', content: '<div class="mt-4"><strong class="text-foreground">𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: <a href="https://facebook.com/sfxc" target="_blank" class="text-primary hover:underline">SFXC Scholarship Office</a><br>Email: Admission.scholarship@sfxc.edu.ph</div>' },
      { type: 'html', content: '<div class="mt-2"><strong class="text-foreground">𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑\'𝐒 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: <a href="https://facebook.com/sfxcregistrar" target="_blank" class="text-primary hover:underline">SFXC - Registrar\'s Office</a><br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>' }
    ]
  }
]

const expanded = ref<Record<string, boolean>>({})

const toggle = (title: string) => {
  expanded.value[title] = !expanded.value[title]
}

// Dummy data for Program Updates
const programUpdates = [
  {
    id: 1,
    title: 'Pre-Service Teachers Pinning Ceremony 2026',
    date: 'March 15, 2026',
    excerpt: 'Join us as we celebrate the deployment of our 4th-year BEEd students to their respective cooperating schools for practice teaching.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'CTE Department',
    category: 'Event'
  },
  {
    id: 2,
    title: 'New Early Childhood Care Laboratory',
    date: 'February 28, 2026',
    excerpt: 'The CTE is proud to announce the opening of a new laboratory facility dedicated to early childhood education and manipulative play learning.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'Academic Affairs',
    category: 'Facility'
  },
  {
    id: 3,
    title: 'Alumni Spotlight: Excellence in Elementary Education',
    date: 'January 20, 2026',
    excerpt: 'Read about how our recent batch of BEEd alumni are changing lives in various public and private elementary institutions.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'Alumni Network',
    category: 'Feature'
  }
]
</script>

<template>
  <section id="home" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('https://placehold.co/1920x1080/000000/FFFFFF?text=1920x1080')] bg-cover bg-center bg-no-repeat"
    >
      <div
        class="absolute inset-0 bg-linear-to-t from-primary/90 via-background/20 to-transparent"
      ></div>



      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="currentColor"
            fill-opacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  </section>

  <div class="space-y-16 pb-12 px-4 pt-12 md:px-8 max-w-7xl mx-auto">
    
    <div class="grid lg:grid-cols-3 gap-10">
      
      <!-- Main Content (Left) -->
      <div class="lg:col-span-2 space-y-16">

        <!-- Dropdowns Section -->
        <div class="space-y-6">
          <div class="border-b border-border pb-2">
            <h3 class="text-2xl font-bold text-primary">Program Details</h3>
          </div>
          
          <div class="space-y-3">
            <Card v-for="section in programDetails" :key="section.title" class="border border-border rounded-md overflow-hidden bg-card">
              <Button @click="toggle(section.title)" variant="ghost" class="w-full flex justify-start items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 rounded-none transition-colors text-left font-semibold text-card-foreground h-auto relative whitespace-normal">
                <span class="font-bold text-lg leading-none w-4 shrink-0 text-center text-primary">{{ expanded[section.title] ? '-' : '+' }}</span>
                <span class="text-left w-full">{{ section.title }}</span>
              </Button>
              
              <div v-show="expanded[section.title]" class="p-6 border-t border-border bg-card">
                <template v-for="(block, idx) in section.contentBlocks" :key="idx">
                  
                  <p v-if="block.type === 'paragraph'" class="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                    {{ block.content }}
                  </p>
                  
                  <h4 v-else-if="block.type === 'subtitle'" class="font-bold text-foreground text-md mt-6 mb-3">
                    {{ block.content }}
                  </h4>
                  
                  <ul v-else-if="block.type === 'list'" class="list-disc list-inside space-y-2 text-muted-foreground ml-2 mb-4 last:mb-0">
                    <li v-for="(item, i) in block.items" :key="i" class="leading-relaxed">{{ item }}</li>
                  </ul>
                  
                  <div v-else-if="block.type === 'html'" class="text-muted-foreground mb-4 last:mb-0" v-html="block.content"></div>
                  
                </template>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <!-- Sidebar (Right) -->
      <div class="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-max">
        <Card class="overflow-hidden shadow-lg bg-card border-border">
          <CardHeader class="pb-4">
            <div class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted">
              <img src="https://placehold.co/600x600/000000/FFFFFF?text=600x600" alt="Program Head" class="w-full h-full object-cover" />
            </div>
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">[Program Head Name]</CardTitle>
            <CardDescription class="text-sm font-medium">Program Head, BEEd</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator class="mb-6"/>

            <div class="space-y-4">
              <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
              
              <div class="space-y-3 text-sm text-card-foreground">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Email:</span>
                  <span>cte@sfxc.edu.ph</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Phone:</span>
                  <span>(085) 123-4567 loc 301</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Location:</span>
                  <span>CTE Building, 2nd Floor<br/>Saint Francis Xavier College</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Program Governor Card -->
        <Card class="overflow-hidden shadow-lg bg-card border-border">
          <CardHeader class="pb-4">
            <div class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted">
              <img src="https://placehold.co/600x600/000000/FFFFFF?text=600x600" alt="Program Governor" class="w-full h-full object-cover" />
            </div>
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">[Governor Name]</CardTitle>
            <CardDescription class="text-sm font-medium">Governor, BEEd</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator class="mb-6"/>

            <div class="space-y-4">
              <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
              
              <div class="space-y-3 text-sm text-card-foreground">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Email:</span>
                  <span>governor.cte@sfxc.edu.ph</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
    </div>

    <!-- Program Updates Section -->
    <div class="space-y-6">
      <div class="border-b border-border pb-2">
        <h3 class="text-2xl font-bold text-primary">Program Updates</h3>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          v-for="item in programUpdates" 
          :key="item.id" 
          class="overflow-hidden border-border rounded-xl hover:shadow-lg transition-shadow flex flex-col group bg-card p-0"
        >
          <div class="h-56 overflow-hidden">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <CardHeader class="pb-2">
            <div class="mb-2">
              <Badge variant="secondary" class="font-bold">
                {{ item.category }}
              </Badge>
            </div>
            <CardTitle class="text-xl font-bold line-clamp-2 transition-colors text-foreground">
              {{ item.title }}
            </CardTitle>
            <div class="flex items-center text-xs text-muted-foreground pt-1 space-x-4">
              <div class="flex items-center">
                <span>by: {{ item.author }}</span>
              </div>
              <div class="flex items-center">
                <span>{{ item.date }}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent class="flex-1">
            <CardDescription class="text-sm line-clamp-3">
              {{ item.excerpt }}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>