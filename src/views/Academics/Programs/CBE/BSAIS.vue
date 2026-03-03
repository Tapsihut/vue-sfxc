<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
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
    title: 'WHAT IS BACHELOR OF SCIENCE IN ACCOUNTING INFORMATION SYSTEM?',
    contentBlocks: [
      { type: 'paragraph', content: 'BSAIS is a program that blends accounting and IT, teaching students to manage and analyze financial data using technology. Graduates can become system analysts, IT auditors, or financial consultants.' }
    ]
  },
  {
    title: 'HOW IS BSAIS DIFFERENT FROM BSA?',
    contentBlocks: [
      { type: 'paragraph', content: 'While BSA focuses on financial reporting, auditing, and preparing for the CPA Licensure Exam, BSAIS emphasizes accounting systems, data analytics, internal controls, and business technology solutions.' },
      { type: 'paragraph', content: 'BSA graduates can take the CPA board exam, while BSAIS graduates focus more on systems and IT-related accounting roles.' }
    ]
  },
  {
    title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'Core subjects in the BSAIS typically include:' },
      { type: 'list', items: [
        'Financial Accounting',
        'Managerial Accounting',
        'Accounting Information Systems',
        'Database Management',
        'Auditing and Control',
        'Business Law and Ethics',
        'Information Technology for Accounting'
      ]}
    ]
  },
  {
    title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
    contentBlocks: [
      { type: 'paragraph', content: 'Students will develop skills such as:' },
      { type: 'list', items: [
        'Financial Analysis and Reporting',
        'Accounting System Design and Management',
        'Database Management and Data Analysis',
        'IT Troubleshooting and Support',
        'Auditing and Internal Controls'
      ]}
    ]
  },
  {
    title: 'WHAT ARE THE POSSIBLE OCCUPATIONS AND INDUSTRIES FOR SOMEONE WITH THIS DEGREE?',
    contentBlocks: [
      { type: 'paragraph', content: 'BS Accounting Information System opens up roles and occupation opportunities, including:' },
      { type: 'list', items: [
        'Accounting Information System Analyst',
        'Financial Consultant',
        'Systems Analyst',
        'Business Intelligence Analyst',
        'ERP Specialist',
        'Internal Auditor'
      ]},
      { type: 'subtitle', content: 'WHAT INDUSTRIES WILL MOST LIKELY HIRE BS ACCOUNTING INFORMATION SYSTEM GRADUATES?' },
      { type: 'paragraph', content: 'BS Accounting Information System graduates are needed in various industries, including:' },
      { type: 'list', items: [
        'Accounting and Finance',
        'Information Technology',
        'Banking and Insurance',
        'Government',
        'Healthcare',
        'Manufacturing'
      ]}
    ]
  },
  {
    title: 'WHAT IS THE TYPICAL DURATION OF THE PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'The program typically takes four years to complete for full-time students, while part-time students may need more time based on their course load.' }
    ]
  },
  {
    title: 'ARE INTERNSHIPS PART OF THE PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'Absolutely! The Bachelor of Science in Accounting Information System program includes a final-year internship, giving students real-world experience and a chance to apply their knowledge in industry settings.' }
    ]
  },
  {
    title: 'WHO SHOULD ENROLL IN BSAIS?',
    contentBlocks: [
      { type: 'paragraph', content: 'The program is ideal for students who:' },
      { type: 'list', items: [
        'Are interested in both accounting and technology',
        'Possess analytical and logical thinking skills',
        'Are detail-oriented',
        'Want to work in data-driven and technology-based environments'
      ]}
    ]
  },
  {
    title: 'HOW CAN I APPLY FOR THE BACHELOR OF SCIENCE IN ACCOUNTING INFORMATION SYSTEM PROGRAM?',
    contentBlocks: [
      { type: 'html', content: 'To enroll, <a href="/admission/requirements#enrollment" class="text-primary hover:underline font-bold">click here</a> to learn more.' },
      { type: 'paragraph', content: 'Interested applicants are encouraged to submit their applications using the contact details provided below or visit the Admission and Scholarship Office for further information and assistance with the application process. Please ensure that all required documents are submitted before the deadline to be considered for admission.' },
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

// Dummy data for Program Updates
const programUpdates = [
  {
    id: 1,
    title: 'New ERP Software Integration Workshop',
    date: 'March 20, 2026',
    excerpt: 'BSAIS students participated in a comprehensive hands-on workshop focused on implementing and managing modern cloud-based ERP systems.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'CBE Department',
    category: 'Event'
  },
  {
    id: 2,
    title: 'Alumni Tech Spotlight: Financial Systems Architect',
    date: 'February 15, 2026',
    excerpt: 'Discover how our BSAIS alumni are leading digital transformation initiatives as Financial Systems Architects in top tech firms.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'Alumni Network',
    category: 'Feature'
  },
  {
    id: 3,
    title: 'Data Analytics Certification Program Launch',
    date: 'January 10, 2026',
    excerpt: 'The college successfully launched a new specialized module offering professional certifications in accounting data analytics for senior students.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'Academic Affairs',
    category: 'Curriculum'
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
          Bachelor of Science in Accounting Information System
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-2xl">
          A program blending accounting expertise with IT skills to prepare students for careers in digital finance, system analysis, and technology-driven business solutions.
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

        <div class="space-y-6">
          <p class="text-lg text-muted-foreground leading-relaxed">
            The Bachelor of Science in Accounting Information Systems (BSAIS) program combines accounting expertise with information technology skills to prepare students for careers in the evolving field of digital finance and business systems. The curriculum covers accounting, auditing, taxation, database management, systems analysis, and information systems security.
          </p>
          <p class="text-lg text-muted-foreground leading-relaxed">
            Students develop technical proficiency, analytical skills, and ethical judgment to design, implement, and manage accounting information systems that support decision-making and organizational efficiency. The program emphasizes the integration of accounting principles with modern technology, preparing graduates to address the challenges of automation, data analytics, and digital transformation in accounting and finance.
          </p>
          <p class="text-lg text-muted-foreground leading-relaxed">
            Graduates are equipped for careers in accounting information systems, financial systems management, auditing, and technology-driven business solutions, and are well-prepared to pursue professional certifications in accounting and IT-related fields.
          </p>
        </div>

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
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">FERRIZA BIANCA ABAN</CardTitle>
            <CardDescription class="text-sm font-medium">Program Coordinator, BSAIS</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator class="mb-6"/>

            <div class="space-y-4">
              <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
              
              <div class="space-y-3 text-sm text-card-foreground">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Email:</span>
                  <span>Faban@sfxc.edu.ph</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Mobile:</span>
                  <span>09484015619</span>
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
