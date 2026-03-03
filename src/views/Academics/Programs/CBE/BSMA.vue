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
    title: 'WHAT IS BACHELOR OF SCIENCE IN MANAGEMENT ACCOUNTING?',
    contentBlocks: [
      { type: 'paragraph', content: 'The Bachelor of Science in Management Accounting is an undergraduate program that teaches students how to manage financial information to aid business decision-making. It focuses on budgeting, cost management, financial analysis, and performance evaluation to improve organizational efficiency and profitability.' }
    ]
  },
  {
    title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'Core subjects in the BS MA typically include:' },
      { type: 'list', items: [
        'Financial Accounting',
        'Managerial Accounting',
        'Cost Accounting',
        'Financial Management',
        'Budgeting and Forecasting',
        'Business Law and Ethics',
        'Management Information Systems',
        'Strategic Management',
        'Taxation',
        'Internal Control Systems'
      ]}
    ]
  },
  {
    title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
    contentBlocks: [
      { type: 'paragraph', content: 'Key skills developed during the course include:' },
      { type: 'list', items: [
        'Financial analysis and reporting',
        'Budgeting and cost management',
        'Problem-solving and decision-making',
        'Strategic planning',
        'Attention to detail and accuracy',
        'Effective communication and reporting',
        'Knowledge of accounting software and tools'
      ]}
    ]
  },
  {
    title: 'HOW IS BSMA DIFFERENT FROM BSA?',
    contentBlocks: [
      { type: 'paragraph', content: 'BSMA emphasizes internal business processes, budgeting, and managerial decision-making. In contrast, the Bachelor of Science in Accountancy (BSA) focuses on financial reporting, taxation, and external auditing and qualifies graduates to take the CPA Licensure Examination administered by the Professional Regulation Commission.' }
    ]
  },
  {
    title: 'WHAT CAREER OPPORTUNITIES ARE AVAILABLE FOR BSMA GRADUATES?',
    contentBlocks: [
      { type: 'paragraph', content: 'Graduates may pursue careers as:' },
      { type: 'list', items: [
        'Management Accountant',
        'Budget Analyst',
        'Financial Analyst',
        'Cost Accountant',
        'Business Analyst',
        'Accounting Officer',
        'Corporate Planning Associate'
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
    title: 'IS BSMA A GOOD CAREER CHOICE?',
    contentBlocks: [
      { type: 'paragraph', content: 'Yes. Organizations require professionals who can analyze costs, manage budgets, and support strategic decisions. BSMA graduates play a key role in business growth and financial sustainability.' }
    ]
  },
  {
    title: 'WHAT FURTHER EDUCATION OPTIONS ARE AVAILABLE?',
    contentBlocks: [
      { type: 'paragraph', content: 'To further a career in BS Management Accounting, graduates may pursue:' },
      { type: 'list', items: [
        'Certified Management Accountant (CMA)',
        "Master's in Accounting or Finance",
        "Master's in Business Administration (MBA)",
        'Certified Public Accountant (CPA)',
        'Chartered Financial Analyst (CFA)',
        'Postgraduate Diplomas in Taxation or Business Management'
      ]}
    ]
  },
  {
    title: 'ARE INTERNSHIPS PART OF THE PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'Absolutely! The Bachelor of Science in Management Accounting includes an internship component where students gain hands-on experience in real-world settings. Internships typically take place in the final year of the program and provide students with valuable exposure to the industry, helping them apply theoretical knowledge to practical challenges.' }
    ]
  },
  {
    title: 'WHO SHOULD ENROLL IN BSMA?',
    contentBlocks: [
      { type: 'paragraph', content: 'The program is ideal for students who:' },
      { type: 'list', items: [
        'Are interested in business strategy and financial planning',
        'Possess analytical and logical thinking skills',
        'Want to work in corporate finance or management roles',
        'Prefer internal business analysis over external auditing'
      ]}
    ]
  },
  {
    title: 'HOW CAN I APPLY FOR THE BACHELOR OF SCIENCE IN MANAGEMENT ACCOUNTING?',
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
    title: 'Management Accounting Seminar 2026',
    date: 'May 14, 2026',
    excerpt: 'An event focused on strategic financial modeling, bringing together industry experts and future management accountants.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'CBE Department',
    category: 'Event'
  },
  {
    id: 2,
    title: 'CMA Pathway Partnership Announcement',
    date: 'April 02, 2026',
    excerpt: 'SFXC officially partners with international CMA review providers to support BSMA students aiming for global certification.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'Academic Affairs',
    category: 'Partnership'
  },
  {
    id: 3,
    title: 'Alumni Success in Global Corporations',
    date: 'March 18, 2026',
    excerpt: 'Discover how our BSMA graduates are steering financial directions for top multinational companies.',
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

        <div class="space-y-6">
          <div class="space-y-4">
            <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Bachelor of Science in Management Accounting
            </h2>
            <p class="text-lg text-muted-foreground leading-relaxed">
              The Bachelor of Science in Management Accounting (BSMA) program is designed to equip students with the knowledge and skills needed to support business decision-making through financial analysis and strategic management. The curriculum covers financial and management accounting, cost accounting, budgeting, taxation, business law, and performance management.
            </p>
            <p class="text-lg text-muted-foreground leading-relaxed">
              The program develops students’ analytical, problem-solving, and decision-making skills, enabling them to provide relevant financial information for planning, controlling, and evaluating organizational performance. Emphasis is placed on ethical standards, technological competence, and the application of accounting tools in various business environments.
            </p>
            <p class="text-lg text-muted-foreground leading-relaxed">
              Graduates of the program are prepared for careers in management accounting, financial analysis, corporate planning, and other related fields in both private and public organizations. The program also serves as a strong foundation for pursuing professional certifications and further studies in accountancy and business.
            </p>
          </div>
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
            <CardTitle class="text-xl text-primary">Quick Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <dl class="space-y-4 text-sm">
              <div class="flex flex-col gap-1 border-b border-border pb-3">
                <dt class="text-muted-foreground font-medium flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Duration
                </dt>
                <dd class="font-semibold text-foreground">4 Years</dd>
              </div>
              <div class="flex flex-col gap-1 border-b border-border pb-3">
                <dt class="text-muted-foreground font-medium flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  Format
                </dt>
                <dd class="font-semibold text-foreground">Full-time, Blended Learning</dd>
              </div>
              <div class="flex flex-col gap-1">
                <dt class="text-muted-foreground font-medium flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Career Path
                </dt>
                <dd class="font-semibold text-foreground">Financial Analysis, Management Accounting, Corporate Planning</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <!-- Program Contact Card -->
        <Card class="overflow-hidden shadow-lg bg-card border-border">
          <CardHeader class="pb-4">
            <div class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted">
              <img src="https://placehold.co/600x600/000000/FFFFFF?text=600x600" alt="Program Head" class="w-full h-full object-cover" />
            </div>
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">FERRIZA BIANCA ABAN</CardTitle>
            <CardDescription class="text-sm font-medium">Program Coordinator, BSMA</CardDescription>
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
                  <span class="mt-0.5 font-medium text-muted-foreground">Phone:</span>
                  <span>0948 401 5619</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Location:</span>
                  <span>CBE Building, 2nd Floor<br/>Saint Francis Xavier College</span>
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
