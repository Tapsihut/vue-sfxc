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
    title: 'TECHNICAL-VOCATIONAL AND SKILLS DEVELOPMENT',
    contentBlocks: [
      { type: 'paragraph', content: 'St. Francis Xavier College is committed to continuously enhancing its technical-vocational education programs to ensure that students are equipped with relevant competencies and industry-ready skills. In support of this commitment, the College actively seeks opportunities to expand and strengthen its TESDA-accredited offerings to address emerging work-force demands and promote employability.' },
      { type: 'paragraph', content: 'At present, the institution offers Driving NCII and NC II Automotive Servicing. It is also in the process of applying for additional qualifications, including NC III in Bookkeeping and NC II in Computer Systems Servicing. These initiatives aim to provide students with accessible pathways for skills certification, career advancement, and lifelong learning.' }
    ]
  },
  {
    title: 'DRIVING NC II',
    contentBlocks: [
      { type: 'paragraph', content: 'The Driving NC II program is a specialized training course accredited by TESDA in the Philippines. It equips individuals with the knowledge and practical skills necessary to operate light motor vehicles classified under LTO Restriction Codes 1 and 2. The program prepares learners to transport passengers and cargo safely and efficiently over designated routes while adhering to traffic rules and regulations set by authorized government agencies.' },
      { type: 'paragraph', content: 'Participants are trained in essential competencies, including vehicle maintenance, advanced driving techniques, compliance with local traffic laws, proper fare collection, and basic vehicle troubleshooting and repairs. Additionally, the course emphasizes emergency response procedures to ensure safety and preparedness on the road. Graduates of this program are well-prepared for careers in transportation services and light vehicle operation.' }
    ]
  },
  {
    title: 'NC II AUTOMOTIVE SERVICING',
    contentBlocks: [
      { type: 'paragraph', content: 'The NC II in Automotive Servicing program is designed to develop knowledge, skills, and work values necessary for students to diagnose and repair automotive engine systems. This qualification focuses on competencies in diagnosing and repairing engine cooling and lubrication systems, intake and exhaust systems, as well as diagnosing and overhauling engine mechanical systems through hands-on training and industry-based practices.' },
      { type: 'paragraph', content: 'Upon successful completion and assessment, graduates are qualified for entry-level positions such as Engine Repair Specialist, Engine Repair Technician, and Engine Technician, enabling them to work in automotive service centers and related industries while preparing them for further technical and professional advancement.' }
    ]
  },
  {
    title: 'HOW CAN I APPLY FOR TECHNICAL-VOCATIONAL PROGRAMS?',
    contentBlocks: [
      { type: 'html', content: 'To enroll, <a href="/admission/requirements#enrollment" class="text-primary hover:underline font-bold">click here</a> to learn more.' },
      { type: 'paragraph', content: 'Interested applicants are encouraged to submit their applications through the Admission and Scholarship Office. They can provide further information and assistance with the application process. Please ensure that all required documents are submitted before the deadline to be considered for admission.' },
      { type: 'paragraph', content: 'For further inquiries, kindly visit or contact offices any time between 8:00 AM to 5:00 PM, Monday to Friday.' },
      { type: 'html', content: '<div class="mt-4"><strong class="text-foreground">𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC Scholarship Office<br>Email: Admission.scholarship@sfxc.edu.ph<br>Mobile: 0908 885 5380</div>' },
      { type: 'html', content: '<div class="mt-2"><strong class="text-foreground">𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑\'𝐒 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC - Registrar\'s Office<br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>' }
    ]
  }
]

const expanded = ref<Record<string, boolean>>({})

const toggle = (title: string) => {
  expanded.value[title] = !expanded.value[title]
}

// Dummy data for Program Updates styled like NewsAndUpdates
const programUpdates = [
  {
    id: 1,
    title: 'New Automotive Servicing Equipment',
    date: 'March 15, 2026',
    excerpt: 'The TechVoc department has newly acquired state-of-the-art engine diagnostic tools for the NC II Automotive Servicing program, significantly improving hands-on training.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'TechVoc Coordinator',
    category: 'Facility Update'
  },
  {
    id: 2,
    title: 'LTO Partnership for Driving NC II',
    date: 'February 28, 2026',
    excerpt: 'A seamless fast-track process for driver\'s license application has been established with LTO exclusively for our Driving NC II top graduates.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'Academic Affairs',
    category: 'Announcement'
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

      <!-- <div class="relative z-10 mt-auto w-full md:max-w-5xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1
          class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md"
        >
          Technical-Vocational Programs
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-2xl">
          Practical, skills-based training aligned with industry standards to prepare students for immediate employment and TESDA certification.
        </p>
      </div> -->

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
              <img src="https://placehold.co/600x600/000000/FFFFFF?text=600x600" alt="Program Coordinator" class="w-full h-full object-cover" />
            </div>
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">TVET Coordinator</CardTitle>
            <CardDescription class="text-sm font-medium">Technical-Vocational Programs</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator class="mb-6"/>

            <div class="space-y-4">
              <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
              
              <div class="space-y-3 text-sm text-card-foreground">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Email:</span>
                  <span>techvoc@sfxc.edu.ph</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Phone:</span>
                  <span>(085) 123-4567 loc 205</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Location:</span>
                  <span>TechVoc Training Center<br/>Saint Francis Xavier College</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
    </div>

    <!-- Program Updates Section (Design referenced from NewsAndUpdates) -->
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
