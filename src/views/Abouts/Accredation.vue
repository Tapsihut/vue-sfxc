<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Recognition {
  id: string
  category: 'Accreditation' | 'Ranking' | 'Major Achievement'
  title: string
  organization: string
  badgeText: string
  date: string
  description: string
  highlights: string[]
  color: string
}

const recognitions: Recognition[] = [
  {
    id: 'paascu-level-3',
    category: 'Accreditation',
    title: 'Level III Re-Accredited Status',
    organization: 'Philippine Accrediting Association of Schools, Colleges and Universities (PAASCU)',
    badgeText: 'Level III',
    date: 'Valid until 2028',
    description: 'Awarded for maintaining high standards of instruction, faculty, research, and community service. This status grants full administrative and financial deregulation.',
    highlights: [
      'Bachelor of Science in Business Administration',
      'Bachelor of Elementary Education',
      'Bachelor of Secondary Education',
      'Liberal Arts Programs'
    ],
    color: 'from-blue-950/95 via-blue-900/80 to-blue-950/30'
  },
  {
    id: 'ched-coe',
    category: 'Accreditation',
    title: 'Center of Excellence',
    organization: 'Commission on Higher Education (CHED)',
    badgeText: 'COE',
    date: 'Valid until 2027',
    description: 'Recognized as a premier institution demonstrating excellent performance in the areas of instruction, research and publication, extension and linkages, and institutional qualifications.',
    highlights: [
      'Teacher Education Programs'
    ],
    color: 'from-emerald-950/95 via-emerald-900/80 to-emerald-950/30'
  },
  {
    id: 'prc-top-crim',
    category: 'Ranking',
    title: 'Top Performing Criminology School',
    organization: 'Professional Regulation Commission (PRC)',
    badgeText: 'Top 5 Regional',
    date: '2024 - 2025',
    description: 'Consistently ranked among the top performing schools in the region based on the licensure examination passing rates, reflecting our rigorous academic training.',
    highlights: [
      '95% Overall Passing Rate',
      'Top 3 Regional Placer (2024)',
      '100% First-time Takers Passing Rate'
    ],
    color: 'from-amber-950/95 via-amber-900/80 to-amber-950/30'
  },
  {
    id: 'iso-9001',
    category: 'Accreditation',
    title: 'ISO 9001:2015 Certification',
    organization: 'International Organization for Standardization',
    badgeText: 'Certified',
    date: 'Valid until 2026',
    description: 'Certified for implementing a robust Quality Management System (QMS) across all academic and administrative processes, ensuring consistent delivery of educational services.',
    highlights: [
      'Institution-wide Quality Management System'
    ],
    color: 'from-slate-950/95 via-slate-900/80 to-slate-950/30'
  },
  {
    id: 'startup-champion',
    category: 'Major Achievement',
    title: 'National Champion in Innovation',
    organization: 'Philippine Startup Challenge',
    badgeText: 'Grand Champion',
    date: 'Awarded 2023',
    description: 'Awarded the grand prize for developing an AI-driven agricultural solution that helps local farmers optimize crop yields and manage resources efficiently.',
    highlights: [
      'Best in Technical Innovation',
      '₱1M Grant Awardee',
      'Featured in National Tech Magazine'
    ],
    color: 'from-rose-950/95 via-rose-900/80 to-rose-950/30'
  }
]
</script>

<template>
  <div class="min-h-screen bg-background">
    
    <!-- ─── Main Page Hero ─────────────────────────────────────── -->
    <!-- <section
      class="relative h-[65vh] flex items-end overflow-hidden bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-background via-black/60 to-transparent" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-20 animate-fade-in-up">
        <Badge variant="outline" class="mb-6 px-4 py-1.5 text-xs tracking-[0.2em] uppercase rounded-none border-white/20 text-white bg-transparent backdrop-blur-sm">
          Institutional Excellence
        </Badge>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Accreditations &<br class="hidden sm:block" /> Recognitions.
        </h1>
        <p class="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
          A testament to our unwavering commitment to quality education, continuous improvement, and global standards.
        </p>
      </div>
    </section> -->

    <!-- ─── Stacked Hero Sections ──────────────── -->
    <div class="flex flex-col w-full">
      
      <section 
        v-for="(item, index) in recognitions" 
        :key="item.id"
        class="relative min-h-[75vh] flex items-center group overflow-hidden"
      >
        <!-- Elegant Top Divider -->
        <div v-if="index > 0" class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent z-30 opacity-50"></div>

        <!-- Background Image (Hero Style with Parallax) -->
        <div class="absolute inset-0 bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-fixed transition-transform duration-2000 ease-out group-hover:scale-105"></div>

        <!-- Dynamic Gradient Overlay (Alternating Direction) -->
        <div :class="[
          'absolute inset-0 opacity-100 transition-opacity duration-700',
          index % 2 === 0 ? 'bg-linear-to-r' : 'bg-linear-to-l',
          item.color
        ]"></div>
        
        <!-- Vignette / Darkening Overlay -->
        <div class="absolute inset-0 bg-black/30 transition-colors duration-700 group-hover:bg-black/10"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

        <!-- Content -->
        <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            <!-- Details -->
            <div :class="['lg:col-span-7 animate-fade-in-up', index % 2 !== 0 ? 'lg:order-2' : '']" :style="{ animationDelay: `${(index + 1) * 150}ms` }">
              <div class="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary" class="bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-full px-6 py-2 text-sm font-bold tracking-wide backdrop-blur-md transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                  {{ item.badgeText }}
                </Badge>
                <span class="text-sm font-semibold text-white/90 uppercase tracking-widest flex items-center gap-3 bg-black/30 px-5 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                  <span class="relative flex h-2.5 w-2.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                  </span>
                  {{ item.date }}
                </span>
              </div>
              
              <p class="text-sm md:text-base font-bold tracking-widest text-primary uppercase mb-3 drop-shadow-md">
                {{ item.category }}
              </p>
              <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 leading-[1.15] text-balance drop-shadow-2xl">
                {{ item.title }}
              </h2>
              
              <div class="flex items-center gap-5 mb-8">
                <div class="w-16 h-1 bg-primary rounded-full shadow-[0_0_12px_rgba(var(--primary),0.6)]"></div>
                <p class="text-lg md:text-xl font-semibold text-white/90 uppercase tracking-widest">
                  {{ item.organization }}
                </p>
              </div>
              
              <p class="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl font-light text-balance">
                {{ item.description }}
              </p>
            </div>

            <!-- Programs / Highlights -->
            <div :class="['lg:col-span-5 animate-fade-in-up', index % 2 !== 0 ? 'lg:order-1' : '']" :style="{ animationDelay: `${(index + 1) * 200}ms` }">
              <div class="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-4xl p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:border-white/20 group-hover:bg-white/10 overflow-hidden">
                <!-- Inner subtle ring -->
                <div class="absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/5 pointer-events-none"></div>
                
                <!-- Decorative glow behind the card -->
                <div class="absolute -inset-0.5 bg-linear-to-br from-white/20 to-transparent rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md -z-10"></div>
                
                <div class="flex items-center gap-4 mb-8">
                  <div class="h-px flex-1 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
                  <h3 class="text-sm font-bold uppercase tracking-widest text-white/80 whitespace-nowrap">
                    {{ item.category === 'Accreditation' ? 'Accredited Programs' : 'Key Highlights' }}
                  </h3>
                  <div class="h-px flex-1 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
                
                <ul class="space-y-2">
                  <li 
                    v-for="(highlight, pIndex) in item.highlights" 
                    :key="pIndex"
                    class="flex items-start gap-4 text-base md:text-lg text-white/80 group/item p-3 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default"
                  >
                    <div class="mt-2 w-2 h-2 rounded-full bg-primary shrink-0 group-hover/item:scale-150 group-hover/item:shadow-[0_0_12px_rgba(var(--primary),0.8)] transition-all duration-300"></div>
                    <span class="leading-snug font-medium">{{ highlight }}</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>

  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}
</style>