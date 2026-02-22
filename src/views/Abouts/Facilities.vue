<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Facility {
  id: number
  name: string
  description: string
  image: string
  tag: string
  features: string[]
}

// Merged: facilities that also serve as tour stops — no redundant data
const facilities: Facility[] = [
  {
    id: 1,
    name: 'Library',
    description: 'An expansive learning hub with over 10,000 volumes, private study rooms, and full digital access.',
    image: '/src/assets/images/sfxc-building.jpg',
    tag: 'Academic',
    features: ['10,000+ Books', 'Digital Resources', 'Study Rooms', 'Computer Lab']
  },
  {
    id: 2,
    name: 'Science Laboratory',
    description: 'Purpose-built labs for Physics, Chemistry, and Biology — equipped to the highest safety standards.',
    image: '/src/assets/images/news/sfxc_application.jpg',
    tag: 'Academic',
    features: ['Modern Equipment', 'Safety-Certified', 'Expert Supervision', 'Hands-on Learning']
  },
  {
    id: 3,
    name: 'Computer Laboratory',
    description: 'High-performance workstations with enterprise-grade internet and a full professional software suite.',
    image: '/src/assets/images/news/sfxc_sacred.jpg',
    tag: 'Technology',
    features: ['Latest Hardware', 'Fiber Internet', 'Software Suite', 'Tech Support']
  },
  {
    id: 4,
    name: 'Sports Complex',
    description: 'A multi-court complex for basketball, volleyball, athletics, and fitness training.',
    image: '/src/assets/images/news/sfxc_update.jpg',
    tag: 'Athletics',
    features: ['Basketball Court', 'Volleyball Court', 'Fitness Equipment', 'Outdoor Track']
  },
  {
    id: 5,
    name: 'Chapel',
    description: 'A serene sacred space for daily Mass, quiet prayer, and spiritual formation.',
    image: '/src/assets/images/sfxc-building.jpg',
    tag: 'Spiritual',
    features: ['Daily Mass', 'Quiet Reflection', 'Religious Events', 'Spiritual Direction']
  },
  {
    id: 6,
    name: 'Cafeteria',
    description: 'A bright, spacious dining hall offering nutritious, affordable meals in a clean environment.',
    image: '/src/assets/images/news/sfxc_application.jpg',
    tag: 'Dining',
    features: ['Balanced Meals', 'Ample Seating', 'Affordable Pricing', 'Sanitary Standards']
  }
]

const activeFacility = ref<Facility>(facilities[0]!)

const setActive = (facility: Facility) => {
  activeFacility.value = facility
}
</script>

<template>
  <div class="min-h-screen bg-background">

    <!-- ─── Hero ─────────────────────────────────────────────── -->
    <section
      class="relative h-[58vh] flex items-end overflow-hidden bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-14 animate-rise">
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Built for<br class="hidden sm:block" /> Every Learner
        </h1>
      </div>
    </section>

    <!-- ─── Interactive Facility Explorer ─────────────────────── -->
    <section class="py-20 px-6 lg:px-10 bg-background">
      <div class="max-w-7xl mx-auto">

        <div class="flex flex-col lg:flex-row gap-10">

          <!-- Left — Selector List -->
          <nav class="lg:w-72 shrink-0 space-y-1">
            <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-3">
              Select a Facility
            </p>
            <button
              v-for="facility in facilities"
              :key="facility.id"
              class="w-full text-left px-4 py-3 rounded-lg flex items-center justify-between gap-3 transition-all duration-200 group"
              :class="activeFacility.id === facility.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'hover:bg-muted text-foreground'"
              @click="setActive(facility)"
            >
              <span class="font-medium text-sm">{{ facility.name }}</span>
              <Badge
                variant="secondary"
                class="text-[10px] shrink-0 transition-colors duration-200"
                :class="activeFacility.id === facility.id
                  ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30'
                  : ''"
              >
                {{ facility.tag }}
              </Badge>
            </button>
          </nav>

          <Separator orientation="vertical" class="hidden lg:block self-stretch" />

          <!-- Right — Detail View -->
          <Transition name="panel" mode="out-in">
            <div :key="activeFacility.id" class="flex-1 flex flex-col md:flex-row gap-8">

              <!-- Image -->
              <div class="md:w-1/2 aspect-[4/3] overflow-hidden rounded-xl bg-muted shrink-0">
                <img
                  :src="activeFacility.image"
                  :alt="activeFacility.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Info -->
              <div class="flex flex-col justify-between gap-6 flex-1">
                <div>
                  <h2 class="text-3xl font-bold tracking-tight mb-3">{{ activeFacility.name }}</h2>
                  <p class="text-muted-foreground leading-relaxed">{{ activeFacility.description }}</p>
                </div>

                <Separator />

                <div class="grid grid-cols-2 gap-3">
                  <div
                    v-for="feature in activeFacility.features"
                    :key="feature"
                  >
                    <Card class="py-3 px-4 bg-muted/40 border-0 shadow-none h-full">
                      <p class="text-sm font-medium text-foreground">{{ feature }}</p>
                    </Card>
                  </div>
                </div>

                <Button variant="outline" class="w-fit">Schedule a Visit</Button>
              </div>

            </div>
          </Transition>

        </div>
      </div>
    </section>

    <!-- ─── Campus Snapshot Strip ─────────────────────────────── -->
    <section class="py-16 bg-muted/30 border-t border-border overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 mb-8">
        <h2 class="text-2xl font-bold tracking-tight">Around Campus</h2>
        <p class="text-muted-foreground text-sm mt-1">A glimpse of life at our school</p>
      </div>

      <div class="flex gap-4 overflow-x-auto no-scrollbar px-6 lg:px-10 pb-2">
        <Card
          v-for="(facility, i) in facilities"
          :key="facility.id"
          class="shrink-0 w-64 overflow-hidden border-0 shadow-md cursor-pointer group animate-slide-up"
          :style="{ animationDelay: `${i * 80}ms` }"
          @click="setActive(facility); $el.closest('body').querySelector('section')?.scrollIntoView({ behavior: 'smooth' })"
        >
          <div class="relative h-40 overflow-hidden bg-muted">
            <img
              :src="facility.image"
              :alt="facility.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div class="absolute bottom-3 left-3 right-3">
              <CardTitle class="text-white text-sm font-semibold">{{ facility.name }}</CardTitle>
            </div>
          </div>
          <CardContent class="p-3">
            <CardDescription class="text-xs line-clamp-2">{{ facility.description }}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ── Entry animations ─────────────────────── */
@keyframes rise {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-rise {
  animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  opacity: 0;
}

/* ── Panel switch transition ─────────────── */
.panel-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.panel-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.panel-enter-from   { opacity: 0; transform: translateX(12px); }
.panel-leave-to     { opacity: 0; transform: translateX(-8px); }

/* ── Hide scrollbar on strip ─────────────── */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
