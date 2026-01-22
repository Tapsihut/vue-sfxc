<script setup lang="ts">
import { ref } from 'vue'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { CarouselApi } from '@/components/ui/carousel'
import sfxcCauldron from '@/assets/images/cauldron.jpg'
import Autoplay from 'embla-carousel-autoplay'
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

const firstCarouselAutoplay = Autoplay({
  delay: 3000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
})
const secondCarouselAutoplay = Autoplay({
  delay: 2500,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
})

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

  const updateCurrent = () => {
    current.value = api.selectedScrollSnap()
  }

  api.on('select', updateCurrent)
  api.on('reInit', updateCurrent)
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
}
</script>

<template>
  <section id="home" class="relative w-full">
    <Carousel 
      class="relative overflow-hidden h-400px sm:h-500px md:h-600px lg:h-700px xl:h-800px w-full mask-image:[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_92%,rgba(0,0,0,0)_100%)]"
      :plugins="[firstCarouselAutoplay]"
      @init-api="setApi"
      @mouseenter="firstCarouselAutoplay.stop"
      @mouseLeave="[firstCarouselAutoplay.reset(), firstCarouselAutoplay.play()]"
    >
      <CarouselContent class="ml-0">
        <CarouselItem v-for="slide in heroSlides" :key="slide.id" class="pl-0">
          <div class="relative w-full h-400px sm:h-500px md:h-600px lg:h-700px xl:h-800px">
            <img 
              :src="slide.image" 
              :alt="slide.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-linear-to-t from-primary/90 via-background/20 to-transparent"></div>
            <div class="absolute inset-0 bg-linear-to-r from-black/70 to-black/30 z-1"></div>
            <div class="relative z-2 h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 md:px-8">
              <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6">
                {{ slide.title }}
              </h2>
              <p class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-7 md:mb-8 opacity-90 max-w-3xl mx-auto px-4">
                {{ slide.description }}
              </p>
              <div v-if="slide.buttons && slide.buttons.length" class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4">
                <a 
                  v-for="(button, idx) in slide.buttons" 
                  :key="idx"
                  :href="button.href" 
                  :class="[
                    'px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-semibold transition-all duration-300 no-underline text-sm sm:text-base',
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
        class="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-6 lg:left-8 bg-white/20 hover:bg-white/30 text-white border-none w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-3" 
      />
      <CarouselNext 
        class="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-6 lg:right-8 bg-white/20 hover:bg-white/30 text-white border-none w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-3" 
      />
      
      <div class="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-3">
        <button 
          v-for="(slide, index) in heroSlides" 
          :key="slide.id"
          :class="[
            'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full cursor-pointer transition-all duration-300 border-none p-0',
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
      <svg class="w-full h-8 sm:h-12 md:h-16 lg:h-20 xl:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="currentColor"
          fill-opacity="1"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  </section>

      <section id="schoolHero" class="py-12 sm:py-16 md:py-20 lg:py-24 bg-background scroll-mt-16">
        <div class="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div class="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
                <div class="order-2 md:order-1">
                    <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 text-foreground leading-tight">
                        St. Francis Xavier College
                    </h3>
                    <div class="space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
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
                <div class="order-1 md:order-2 relative group max-w-lg mx-auto w-full">
                    <div
                        class="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-primary/10 rounded-xl sm:rounded-2xl -z-10 group-hover:bg-primary/20 transition-colors duration-500"
                    ></div>
                    <img
                        src="@/assets/images/enrollment-marketing.jpg"
                        alt="SFXC Mission"
                        class="rounded-lg sm:rounded-xl w-full object-cover aspect-video"
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
            :plugins="[secondCarouselAutoplay]"
            @mouseenter="secondCarouselAutoplay.stop"
            @mouseLeave="[secondCarouselAutoplay.reset(), secondCarouselAutoplay.play()]"
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

    <!-- School Image Hero Section -->
    <section id="schoolImage" class="relative py-20 sm:py-24 md:py-32 lg:py-40 xl:py-48 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="@/assets/images/sfxc-building.jpg"
          alt="School Campus"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 px-4 sm:px-6 lg:px-8 h-full flex items-end">
        <div class="max-w-7xl mx-auto w-full pb-8 sm:pb-10 md:pb-12 lg:pb-16">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight max-w-2xl">
            Bringing Art to everything
          </h2>
        </div>
      </div>
    </section>

    <!-- News and Announcements Section -->
    <section id="news" class="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">News & Announcements</h2>
          <p class="text-muted-foreground text-sm sm:text-base md:text-lg">Stay updated with the latest happenings at SFXC</p>
        </div>

        <div class="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <!-- Featured News - Large Image -->
          <div class="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div class="aspect-4/3 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop"
                alt="Featured News"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white">
              <span class="inline-block px-2 sm:px-3 py-1 bg-primary rounded-full text-xs font-semibold mb-2 sm:mb-3">Featured</span>
              <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2 line-clamp-2">
                Annual Sports Festival 2026: Celebrating Excellence in Athletics
              </h3>
              <p class="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3 line-clamp-2">
                Join us for three days of exciting sports competitions, team spirit, and memorable moments.
              </p>
              <span class="text-xs text-white/70">January 20, 2026</span>
            </div>
          </div>

          <!-- Mini News - 3 Small Images -->
          <div class="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <!-- Mini News 1 -->
            <div class="group flex gap-3 sm:gap-4 bg-card rounded-lg sm:rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300">
              <div class="w-24 sm:w-32 md:w-40 shrink-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop"
                  alt="News 1"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="flex-1 py-3 sm:py-4 pr-3 sm:pr-4">
                <span class="inline-block px-2 py-0.5 sm:py-1 bg-primary/10 text-primary rounded text-xs font-semibold mb-1.5 sm:mb-2">Academic</span>
                <h4 class="font-bold text-foreground mb-1.5 sm:mb-2 line-clamp-2 text-xs sm:text-sm md:text-base">
                  Scholarship Applications Now Open for Academic Year 2026-2027
                </h4>
                <span class="text-xs text-muted-foreground">January 18, 2026</span>
              </div>
            </div>

            <!-- Mini News 2 -->
            <div class="group flex gap-3 sm:gap-4 bg-card rounded-lg sm:rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300">
              <div class="w-24 sm:w-32 md:w-40 shrink-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop"
                  alt="News 2"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="flex-1 py-3 sm:py-4 pr-3 sm:pr-4">
                <span class="inline-block px-2 py-0.5 sm:py-1 bg-primary/10 text-primary rounded text-xs font-semibold mb-1.5 sm:mb-2">Events</span>
                <h4 class="font-bold text-foreground mb-1.5 sm:mb-2 line-clamp-2 text-xs sm:text-sm md:text-base">
                  Cultural Week 2026: Showcasing Student Talents and Creativity
                </h4>
                <span class="text-xs text-muted-foreground">January 15, 2026</span>
              </div>
            </div>

            <!-- Mini News 3 -->
            <div class="group flex gap-3 sm:gap-4 bg-card rounded-lg sm:rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300">
              <div class="w-24 sm:w-32 md:w-40 shrink-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop"
                  alt="News 3"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="flex-1 py-3 sm:py-4 pr-3 sm:pr-4">
                <span class="inline-block px-2 py-0.5 sm:py-1 bg-primary/10 text-primary rounded text-xs font-semibold mb-1.5 sm:mb-2">Achievement</span>
                <h4 class="font-bold text-foreground mb-1.5 sm:mb-2 line-clamp-2 text-xs sm:text-sm md:text-base">
                  SFXC Students Win National Science Competition
                </h4>
                <span class="text-xs text-muted-foreground">January 12, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


</template>
