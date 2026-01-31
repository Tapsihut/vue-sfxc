<script setup lang="ts">
interface NewsItem {
  id: number
  title: string
  date: string
  excerpt: string
  image: string
  slug: string
}

/**
 * TEMPORARY PLACEHOLDER DATA
 * This will be replaced by admin-uploaded content
 */
const news: NewsItem[] = [
  {
    id: 1,
    title: 'News Title Placeholder',
    date: 'Coming Soon',
    excerpt:
      'This is a placeholder for a future news article. Content will be updated once published by the administrator.',
    image: '/src/assets/images/news/sfxc_application.jpg',
    slug: 'news-title-placeholder-1',
  },
  {
    id: 2,
    title: 'Upcoming Announcement',
    date: 'Coming Soon',
    excerpt:
      'Details about this announcement will be posted soon. Please check back for updates.',
    image: '/src/assets/images/news/sfxc_sacred.jpg',
    slug: 'upcoming-announcement',
  },
  {
    id: 3,
    title: 'Campus Update',
    date: 'Coming Soon',
    excerpt:
      'An official update from Saint Francis Xavier College will be published here by the administrator.',
    image: '/src/assets/images/news/sfxc_update.jpg',
    slug: 'campus-update',
  },
]
</script>

<template>
  <!-- HERO -->
  <section id="hero" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>

      <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
          News and Updates
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-xl">
            Stay updated with the latest events, announcements, and milestones of
          Saint Francis Xavier College.
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  </section>

  <!-- NEWS GRID -->
  <section class="py-24 bg-background">
    <div class="container mx-auto px-6">
      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="item in news"
          :key="item.id"
          class="group"
        >
          <!-- IMAGE -->
          <div class="overflow-hidden rounded-xl border border-border">
            <img
              :src="item.image"
              :alt="item.title"
              class="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <!-- CONTENT -->
          <div class="mt-6">
            <h3
              class="text-xl font-bold text-foreground group-hover:text-tertiary transition"
            >
              {{ item.title }}
            </h3>

            <p class="mt-1 text-sm text-muted-foreground">
              {{ item.date }}
            </p>

            <p class="mt-4 text-muted-foreground leading-relaxed">
              {{ item.excerpt }}
            </p>

            <RouterLink
              :to="`/news/${item.slug}`"
              class="inline-block mt-4 font-semibold text-tertiary hover:underline"
            >
              Read More »
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
