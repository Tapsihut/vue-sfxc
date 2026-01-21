<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { CarouselApi } from '@/components/ui/carousel'
import sfxcCauldron from '@/assets/images/cauldron.jpg'

type HeroButton = {
  text: string
  href: string
  primary?: boolean
}

type HeroSlide = {
  id: number
  title: string
  description: string
  image: string
  buttons?: HeroButton[]
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: '',
    description: '',
    image: sfxcCauldron,
  },
  {
    id: 2,
    title: 'Excellence in Education',
    description: 'Nurturing young minds through innovative teaching methods and state-of-the-art facilities.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1080&fit=crop',
    buttons: [
      { text: 'Enroll Now', href: '#academics', primary: true },
    ]
  },
  {
    id: 3,
    title: 'Building Community',
    description: 'Fostering a supportive environment where students grow academically, socially, and emotionally.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1080&fit=crop',
    buttons: [
      { text: 'Enroll Now', href: '#events', primary: true },
    ]
  },
  {
    id: 4,
    title: 'Holistic Development',
    description: 'Balancing academic rigor with arts, sports, and character development for well-rounded growth.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop',
    buttons: [
      { text: 'Enroll Now', href: '#academics', primary: true },
    ]
  }
]

const carouselApi = ref<CarouselApi>()
const current = ref(0)
const count = ref(0)
let autoPlayInterval: ReturnType<typeof setInterval> | null = null

const programsCarouselApi = ref<CarouselApi>()
const programsCurrent = ref(0)
const programsCount = ref(0)

const programs = [
  { id: 1, image: sfxcCauldron, alt: 'Course 1', name: 'Program 1' },
  { id: 2, image: sfxcCauldron, alt: 'Course 2', name: 'Program 2' },
  { id: 3, image: sfxcCauldron, alt: 'Course 3', name: 'Program 3' },
  { id: 4, image: sfxcCauldron, alt: 'Course 4', name: 'Program 4' },
  { id: 5, image: sfxcCauldron, alt: 'Course 5', name: 'Program 5' },
  { id: 6, image: sfxcCauldron, alt: 'Course 6', name: 'Program 6' },
]

function setApi(api: CarouselApi) {
  carouselApi.value = api
  if (!api) return

  count.value = api.scrollSnapList().length
  current.value = api.selectedScrollSnap()

  api.on('select', () => {
    current.value = api.selectedScrollSnap()
  })
}

function setProgramsApi(api: CarouselApi) {
  programsCarouselApi.value = api
  if (!api) return

  programsCount.value = api.scrollSnapList().length
  programsCurrent.value = api.selectedScrollSnap()

  api.on('select', () => {
    programsCurrent.value = api.selectedScrollSnap()
  })
}

function goToProgramSlide(index: number) {
  programsCarouselApi.value?.scrollTo(index)
}

function goToSlide(index: number) {
  carouselApi.value?.scrollTo(index)
  resetAutoPlay()
}

function startAutoPlay() {
  stopAutoPlay()
  autoPlayInterval = setInterval(() => {
    if (carouselApi.value) {
      const nextIndex = (current.value + 1) % count.value
      carouselApi.value.scrollTo(nextIndex)
    }
  }, 5000)
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

function resetAutoPlay() {
  stopAutoPlay()
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section id="home" class="relative w-full">
    <Carousel 
      class="relative overflow-hidden h-150 md:h-125 sm:h-100 max-sm:h-87.5 w-full mask-image:[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_92%,rgba(0,0,0,0)_100%)]"
      @init-api="setApi"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <CarouselContent class="ml-0">
        <CarouselItem v-for="slide in heroSlides" :key="slide.id" class="pl-0">
          <div class="relative w-full h-150 md:h-125 sm:h-100 max-sm:h-87.5">
            <img 
              :src="slide.image" 
              :alt="slide.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-linear-to-t from-primary/90 via-background/20 to-transparent"></div>
            <div class="absolute inset-0 bg-linear-to-r from-black/70 to-black/30 z-1"></div>
            <div class="relative z-2 h-full flex flex-col justify-center items-center text-center text-white px-8">
              <h2 class="text-4xl sm:text-5xl md:text-6xl max-sm:text-2xl font-bold mb-6 max-sm:mb-4">
                {{ slide.title }}
              </h2>
              <p class="text-xl md:text-2xl sm:text-lg max-sm:text-sm mb-8 max-sm:mb-6 opacity-90 max-w-3xl mx-auto">
                {{ slide.description }}
              </p>
              <div v-if="slide.buttons && slide.buttons.length" class="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  v-for="(button, idx) in slide.buttons" 
                  :key="idx"
                  :href="button.href" 
                  :class="[
                    'px-8 py-3 rounded-md font-semibold transition-all duration-300 no-underline',
                    button.primary 
                      ? 'bg-white text-gray-900 hover:bg-gray-100' 
                      : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
                  ]"
                >
                  {{ button.text }}
                </a>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      
      <CarouselPrevious 
        class="absolute top-1/2 -translate-y-1/2 left-8 md:left-4 max-sm:left-2 bg-white/20 hover:bg-white/30 text-white border-none w-12.5 h-12.5 md:w-10 md:h-10 max-sm:w-9 max-sm:h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-3" 
      />
      <CarouselNext 
        class="absolute top-1/2 -translate-y-1/2 right-8 md:right-4 max-sm:right-2 bg-white/20 hover:bg-white/30 text-white border-none w-12.5 h-12.5 md:w-10 md:h-10 max-sm:w-9 max-sm:h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-3" 
      />
      
      <div class="absolute bottom-8 max-sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-3">
        <button 
          v-for="(slide, index) in heroSlides" 
          :key="slide.id"
          :class="[
            'w-3 h-3 rounded-full cursor-pointer transition-all duration-300 border-none p-0',
            current === index 
              ? 'bg-white scale-110' 
              : 'bg-white/50'
          ]"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </Carousel>
    
    <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
      <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="currentColor"
          fill-opacity="1"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  </section>

      <section id="schoolHero" class="py-24 bg-background scroll-mt-16">
        <div class="w-300 p-8 mx-auto">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
                <div class="order-2 md:order-1 px-4 md:px-0">
                    <h3 class="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                        St. Francis Xavier College
                    </h3>
                    <div class="space-y-4 text-muted-foreground text-lg leading-relaxed">
                        <p>
                            The institution pursues innovative approaches in education to enhance
                            instruction, research and community involvement.
                        </p>
                        <p>
                            It pledges to provide the learners a curricular framework to instill
                            creative and critical thinking in a changing world.
                        </p>
                        <p>
                            Cultural Preservation, Environmental Care and Values Formation are
                            inculcated to guarantee genuine transformation.
                        </p>
                    </div>
                </div>
                <div class="order-1 md:order-2 relative group">
                    <div
                        class="absolute -inset-4 bg-primary/10 rounded-2xl -z-10 group-hover:bg-primary/20 transition-colors duration-500"
                    ></div>
                    <img
                        src="@/assets/images/enrollment-marketing.jpg"
                        alt="SFXC Mission"
                        class="rounded-xl w-full object-cover aspect-4/3"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- Programs Offered Section -->
    <section id="academics" class="py-12 md:py-16 lg:py-20 bg-gray-50 relative">
      <div class="absolute inset-0 bg-cover bg-center bg-fixed" style="background-image: url('/6.jpg');"></div>
      <div class="absolute inset-0 bg-white bg-opacity-90"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12 md:mb-16">
          <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-primary">Program Offered</h3>
          <p class="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
            Undergraduate Program offers.
          </p>
        </div>

        <div class="relative">
          <Carousel
            class="relative w-full"
            :opts="{
              align: 'start',
              loop: true,
            }"
            @init-api="setProgramsApi"
          >
            <CarouselContent class="-ml-4">
              <CarouselItem 
                v-for="program in programs" 
                :key="program.id" 
                class="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div class="p-1">
                  <div class="aspect-square overflow-hidden rounded-lg">
                    <img 
                      :src="program.image" 
                      :alt="program.alt" 
                      class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            <CarouselPrevious 
              class="absolute top-1/2 -translate-y-1/2 -left-12 max-lg:hidden"
            />
            <CarouselNext 
              class="absolute top-1/2 -translate-y-1/2 -right-12 max-lg:hidden"
            />
          </Carousel>

          <div class="flex justify-center gap-2 mt-8">
            <button 
              v-for="(program, index) in programs" 
              :key="program.id"
              :class="[
                'w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 border-none p-0',
                programsCurrent === index 
                  ? 'bg-primary scale-110' 
                  : 'bg-gray-400'
              ]"
              @click="goToProgramSlide(index)"
              :aria-label="`Go to program ${index + 1}`"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-10 lg:py-14 bg-background">
      <div class="max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
        <!-- Grid -->
        <div class="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div class="lg:col-span-7">
            <!-- Grid -->
            <div class="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
              <div class="col-span-3">
                <img class="rounded-xl" :src="sfxcCauldron" alt="Features Image">
              </div>

              <div class="col-span-4">
                <img class="rounded-xl" :src="sfxcCauldron" alt="Features Image">
              </div>

              <div class="col-span-5">
                <img class="rounded-xl" :src="sfxcCauldron" alt="Features Image">
              </div>
            </div>
            <!-- End Grid -->
          </div>
          <!-- End Col -->

          <div class="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
            <div class="space-y-6 sm:space-y-8">
              <!-- Title -->
              <div class="space-y-2 md:space-y-4">
                <h2 class="font-bold text-3xl lg:text-4xl text-gray-800">
                  Excellence in Education
                </h2>
                <p class="text-gray-500">
                  Empowering students with quality education and innovative learning experiences to achieve their full potential.
                </p>
              </div>
              <!-- End Title -->

              <!-- List -->
              <ul class="space-y-2 sm:space-y-4">
                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-primary/10 text-primary">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500">
                      <span class="font-bold">Innovative</span> – teaching methodologies
                    </span>
                  </div>
                </li>

                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-primary/10 text-primary">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500">
                      Holistic student development
                    </span>
                  </div>
                </li>

                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-primary/10 text-primary">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500">
                      State-of-the-art <span class="font-bold">facilities</span>
                    </span>
                  </div>
                </li>
              </ul>
              <!-- End List -->
            </div>
          </div>
          <!-- End Col -->
        </div>
        <!-- End Grid -->
      </div>
    </section>
    <!-- End Features -->


</template>
