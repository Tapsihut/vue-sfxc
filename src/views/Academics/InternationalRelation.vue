<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

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
    title: 'INTERNATIONAL RELATIONS OFFICE',
    contentBlocks: [
      { type: 'paragraph', content: 'Driven by its institutional vision, mission, and core values, the SFXC International Relations Office (IRO) seeks to develop more opportunities for the development of its community. To do so, its activities lie in the areas of cultural exchange; international competency matching; research and community development; global mobility of its students, faculty, and staff; and sustainable funding and resource development. These IRO activities will develop the SFXC community into being internationally competitive and global citizens. This will then contribute to the St. Francis Xavier College vision of developing excellence-driven and value laden leaders.' }
    ]
  },
  {
    title: 'INTERNATIONAL RELATIONS OFFICE VISION',
    contentBlocks: [
      { type: 'paragraph', content: 'A center for intercultural opportunities and global citizenship among the Xavier Knight leaders' }
    ]
  },
  {
    title: 'INTERNATIONAL RELATIONS OFFICE GOALS',
    contentBlocks: [
      { type: 'paragraph', content: 'The IRO has five major goals as an office in the areas of cultural exchange, curriculum and competencies internationalization, research and community development, the global mobility of SFXC, and sustainable funding and resource development. The office, while it is new, is ambitious and ready to maximize its current resources to improve.' },
      { type: 'list', items: [
        'Cultural Exchange: Proactively establish and nurture diverse international partnerships to promote cultural exchange and mutual understanding.',
        'Internationalization of Curriculum and Competencies: Integrate global and intercultural perspectives into curricula, expand language learning, and support faculty development to enhance students’ global competencies.',
        'Research and Community Development: Strengthen research and community development by collaborating with local and international institutions, applying evidence-based findings, and scaling community initiatives.',
        'Mobility, Exchange, and Opportunities: Facilitate affordable mobility and exchange opportunities for students, faculty, and staff with comprehensive support to ensure equitable participation.',
        'Sustainable Funding and Resource Development: Secure sustainable funding through diverse fundraising strategies and partnerships with international foundations, charities, and corporate sponsors while maintaining transparent financial management.'
      ]}
    ]
  }
]

const programUpdates = [
  {
    id: 1,
    title: 'International Student Exchange Orientation',
    date: 'March 10, 2026',
    excerpt: 'Join us for an orientation session mapping out study abroad opportunities and intercultural programs for the upcoming academic year.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'IRO Coordinator',
    category: 'Event'
  },
  {
    id: 2,
    title: 'New Global Partnerships',
    date: 'February 15, 2026',
    excerpt: 'The SFXC International Relations Office has officially partnered with leading universities in Asia to expand cultural exchange pathways.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'External Affairs',
    category: 'Partnership'
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

        <!-- Article Content Section -->
        <div class="space-y-12">
          <div v-for="section in programDetails" :key="section.title" class="space-y-5">
            <div class="border-b border-border pb-2">
              <h3 class="text-2xl font-bold text-primary">{{ section.title }}</h3>
            </div>
            
            <div class="text-muted-foreground space-y-4">
              <template v-for="(block, idx) in section.contentBlocks" :key="idx">
                
                <p v-if="block.type === 'paragraph'" class="leading-relaxed text-lg">
                  {{ block.content }}
                </p>
                
                <h4 v-else-if="block.type === 'subtitle'" class="font-bold text-foreground text-xl mt-8">
                  {{ block.content }}
                </h4>
                
                <ul v-else-if="block.type === 'list'" class="list-disc list-outside space-y-3 ml-6 text-lg">
                  <li v-for="(item, i) in block.items" :key="i" class="leading-relaxed pl-1">{{ item }}</li>
                </ul>
                
                <div v-else-if="block.type === 'html'" class="text-lg" v-html="block.content"></div>
                
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar (Right) -->
      <div class="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-max">
        <Card class="overflow-hidden shadow-lg bg-card border-border">
          <CardHeader class="pb-4">
            <div class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted">
              <img src="https://placehold.co/600x600/000000/FFFFFF?text=600x600" alt="IRO Head" class="w-full h-full object-cover" />
            </div>
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">IRO Coordinator</CardTitle>
            <CardDescription class="text-sm font-medium">International Relations Office</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator class="mb-6"/>

            <div class="space-y-4">
              <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
              
              <div class="space-y-3 text-sm text-card-foreground">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Email:</span>
                  <span>externalaffairs@sfxc.edu.ph</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
    </div>

    <!-- Office Updates Section (Design referenced from NewsAndUpdates) -->
    <div class="space-y-6">
      <div class="border-b border-border pb-2">
        <h3 class="text-2xl font-bold text-primary">Office Updates</h3>
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