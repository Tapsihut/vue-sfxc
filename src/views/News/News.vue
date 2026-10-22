<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Compact Hero -->
    <section class="bg-gradient-to-r from-green-950 to-green-800 px-4 py-5 text-white sm:py-6">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="min-w-0">
          <p class="mb-1 text-[11px] font-bold uppercase tracking-widest text-yellow-400">
            St. Francis Xavier College
          </p>
          <h1 class="text-2xl font-extrabold tracking-tight sm:text-3xl">
            News & Updates
          </h1>
          <p class="mt-1 text-sm text-green-100">
            The latest news, achievements, events, and announcements from SFXC.
          </p>
        </div>
        <div class="w-full md:max-w-sm md:shrink-0">
          <label for="news-search" class="sr-only">Search news</label>
          <div class="flex items-center gap-2 rounded-lg bg-white px-3 py-1 shadow-sm">
            <svg class="h-5 w-5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-4-4"></path>
            </svg>
            <input
              id="news-search"
              v-model="search"
              type="search"
              placeholder="Search news..."
              class="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-0"
            />
            <button
              v-if="search"
              type="button"
              class="text-xs font-semibold text-green-800 hover:text-green-950"
              @click="search = ''"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-7xl px-4 py-5 sm:py-7">
      <!-- Compact Heading and Filters -->
      <div class="mb-5 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-lg font-extrabold text-gray-900">
            Latest Stories
          </h2>
          <p class="mt-0.5 text-xs text-gray-500">
            News and updates from the SFXC community.
          </p>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
            :class="selectedCategory === category
              ? 'border-green-800 bg-green-800 text-white'
              : 'border-gray-200 bg-white text-gray-600 hover:border-green-700 hover:text-green-800'"
            @click="selectCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-5">
        <div class="grid animate-pulse gap-4 overflow-hidden rounded-xl border border-gray-100 bg-white p-3 shadow-sm md:grid-cols-2">
          <div class="min-h-48 rounded-lg bg-gray-200 md:min-h-64"></div>
          <div class="space-y-3 py-2">
            <div class="h-4 w-24 rounded bg-gray-200"></div>
            <div class="h-7 w-4/5 rounded bg-gray-200"></div>
            <div class="h-4 w-full rounded bg-gray-200"></div>
            <div class="h-4 w-5/6 rounded bg-gray-200"></div>
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="item in 3" :key="item" class="animate-pulse overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div class="h-40 bg-gray-200"></div>
            <div class="space-y-3 p-4">
              <div class="h-3 w-24 rounded bg-gray-200"></div>
              <div class="h-5 w-4/5 rounded bg-gray-200"></div>
              <div class="h-4 w-full rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="rounded-xl border border-red-100 bg-white px-5 py-9 text-center shadow-sm">
        <div class="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 7v5"></path>
            <path d="M12 16h.01"></path>
          </svg>
        </div>
        <h3 class="mt-3 text-base font-bold text-gray-900">
          News is temporarily unavailable
        </h3>
        <p class="mx-auto mt-2 max-w-lg text-sm text-gray-500">
          {{ error }}
        </p>
        <button
          type="button"
          class="mt-4 rounded-lg bg-green-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-900"
          @click="fetchNews"
        >
          Try Again
        </button>
      </div>

      <!-- News Content -->
      <template v-else-if="filteredPosts.length">
        <!-- Featured Story -->
        <RouterLink
          v-if="featuredPost"
          :to="{ name: 'news-detail', params: { slug: featuredPost.slug } }"
          class="group mb-7 grid overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md md:grid-cols-2"
        >
          <div class="relative h-52 overflow-hidden bg-gray-100 sm:h-64 md:h-full md:min-h-64">
            <img
              :src="getImage(featuredPost)"
              :alt="featuredPost.title || 'SFXC news'"
              class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              @error="handleImageError"
            />
            <span class="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-green-950">
              Featured Story
            </span>
          </div>
          <div class="flex flex-col justify-center p-4 sm:p-6">
            <div class="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500">
              <span class="rounded-full bg-green-50 px-2.5 py-1 text-green-800">
                {{ getCategory(featuredPost) }}
              </span>
              <span>{{ formatDate(featuredPost) }}</span>
            </div>
            <h3 class="mt-3 text-xl font-extrabold leading-tight text-gray-900 transition group-hover:text-green-800 sm:text-2xl">
              {{ featuredPost.title }}
            </h3>
            <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
              {{ getExcerpt(featuredPost) }}
            </p>
            <div class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-800">
              Read Full Story
              <svg class="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </RouterLink>

        <!-- More News Heading -->
        <div v-if="otherPosts.length" class="mb-3 flex items-center justify-between gap-3">
          <h2 class="text-base font-extrabold text-gray-900">
            More News
          </h2>
          <p class="text-xs text-gray-500">
            {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'story' : 'stories' }}
          </p>
        </div>

        <!-- News Cards -->
        <div v-if="otherPosts.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="post in otherPosts"
            :key="post.id ?? post.slug"
            :to="{ name: 'news-detail', params: { slug: post.slug } }"
            class="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="relative h-40 overflow-hidden bg-gray-100">
              <img
                :src="getImage(post)"
                :alt="post.title || 'SFXC news'"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                @error="handleImageError"
              />
              <span class="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-green-800 shadow-sm">
                {{ getCategory(post) }}
              </span>
            </div>
            <div class="flex flex-1 flex-col p-4">
              <p class="text-[11px] font-medium text-gray-500">
                {{ formatDate(post) }}
              </p>
              <h3 class="mt-2 line-clamp-2 text-base font-extrabold leading-snug text-gray-900 transition group-hover:text-green-800">
                {{ post.title }}
              </h3>
              <p class="mt-2 line-clamp-3 flex-1 text-sm leading-5 text-gray-600">
                {{ getExcerpt(post) }}
              </p>
              <div class="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-green-800">
                Read More
                <svg class="h-3.5 w-3.5 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- Pagination -->
        <div v-if="!search && selectedCategory === 'All' && lastPage > 1" class="mt-7 flex flex-wrap items-center justify-center gap-1.5">
          <button
            type="button"
            class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-green-700 disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="currentPage <= 1"
            @click="changePage(currentPage - 1)"
          >
            Previous
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            type="button"
            class="h-9 min-w-9 rounded-lg border px-2.5 text-xs font-bold transition"
            :class="page === currentPage
              ? 'border-green-800 bg-green-800 text-white'
              : 'border-gray-200 bg-white text-gray-700 hover:border-green-700 hover:text-green-800'"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button
            type="button"
            class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-green-700 disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="currentPage >= lastPage"
            @click="changePage(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="rounded-xl border border-gray-100 bg-white px-5 py-10 text-center shadow-sm">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"></path>
            <path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20"></path>
            <path d="M8 7h8"></path>
            <path d="M8 10h6"></path>
          </svg>
        </div>
        <h3 class="mt-3 text-lg font-extrabold text-gray-900">
          No news found
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Try a different search term or select another category.
        </p>
        <button
          type="button"
          class="mt-4 rounded-lg border border-green-800 px-4 py-2 text-xs font-bold text-green-800 transition hover:bg-green-50"
          @click="clearFilters"
        >
          Clear Filters
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

interface NewsPost {
  id?: number | string
  title?: string
  slug?: string
  content?: string | null
  excerpt?: string | null
  summary?: string | null
  description?: string | null
  category?: string | { name?: string } | null
  category_name?: string | null
  image?: string | null
  image_path?: string | null
  featured_image?: string | null
  published_at?: string | null
  created_at?: string | null
  date?: string | null
  status?: string | null
  [key: string]: unknown
}

interface PaginationData {
  current_page?: number
  last_page?: number
  data?: NewsPost[]
}

const newsApi = axios.create({
  baseURL: 'https://api.sfxc.edu.ph/api',
  headers: {
    Accept: 'application/json',
  },
})
const posts = ref<NewsPost[]>([])
const loading = ref(false)
const error = ref('')
const search = ref('')
const selectedCategory = ref('All')
const currentPage = ref(1)
const lastPage = ref(1)

const placeholder = '/images/news-placeholder.jpg'

const categories = computed(() => {
  const names = posts.value
    .map((post) => getCategory(post))
    .filter((name) => name && name !== 'Uncategorized')

  return ['All', ...Array.from(new Set(names)).sort((a, b) => a.localeCompare(b))]
})

const filteredPosts = computed(() => {
  const term = search.value.trim().toLowerCase()

  return posts.value.filter((post) => {
    const matchesCategory =
      selectedCategory.value === 'All' ||
      getCategory(post) === selectedCategory.value

    const searchableText = [
      post.title,
      post.content,
      post.excerpt,
      post.summary,
      post.description,
      getCategory(post),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return matchesCategory && (!term || searchableText.includes(term))
  })
})

const featuredPost = computed(() => filteredPosts.value[0] ?? null)
const otherPosts = computed(() => filteredPosts.value.slice(1))

const visiblePages = computed(() => {
  const pages: number[] = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(lastPage.value, currentPage.value + 2)

  for (let page = start; page <= end; page++) {
    pages.push(page)
  }

  return pages
})

function getCategory(post: NewsPost): string {
  if (typeof post.category === 'string' && post.category.trim()) {
    return post.category.trim()
  }

  if (
    post.category &&
    typeof post.category === 'object' &&
    'name' in post.category &&
    typeof post.category.name === 'string'
  ) {
    return post.category.name
  }

  if (post.category_name?.trim()) {
    return post.category_name.trim()
  }

  return 'Uncategorized'
}

function getExcerpt(post: NewsPost): string {
  const content = post.excerpt || post.summary || post.description || post.content

  if (!content || typeof content !== 'string') {
    return 'Read the latest updates and stories from the SFXC community.'
  }

  const plainText = content
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

  if (!plainText) {
    return 'Read the latest updates and stories from the SFXC community.'
  }

  return plainText.length > 220
    ? `${plainText.slice(0, 220).trim()}...`
    : plainText
}

function getImage(post: NewsPost): string {
  const imageUrl = post['image_url']

  if (typeof imageUrl === 'string' && imageUrl.trim()) {
    return imageUrl
  }

  const possibleImage =
    post.featured_image ||
    post.image ||
    post.image_path ||
    post['thumbnail']

  if (typeof possibleImage !== 'string' || !possibleImage.trim()) {
    return placeholder
  }

  const value = possibleImage.trim()

  if (/^https?:\/\//i.test(value) || value.startsWith('data:')) {
    return value
  }

  const normalized = value.replace(/^\/+/, '')

  return `https://api.sfxc.edu.ph/${normalized.startsWith('storage/') ? normalized : `storage/${normalized}`}`
}

function handleImageError(event: Event): void {
  const image = event.target as HTMLImageElement

  if (image.src !== new URL(placeholder, window.location.origin).href) {
    image.src = placeholder
  }
}

function formatDate(post: NewsPost): string {
  const value = post.published_at || post.created_at || post.date

  if (!value) return 'Latest Update'

  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) return 'Latest Update'

  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(parsed)
}

function unwrapPosts(payload: unknown): {
  data: NewsPost[]
  currentPage: number
  lastPage: number
} {
  if (Array.isArray(payload)) {
    return { data: payload as NewsPost[], currentPage: 1, lastPage: 1 }
  }

  const root = payload as Record<string, unknown> | null

  if (!root || typeof root !== 'object') {
    return { data: [], currentPage: 1, lastPage: 1 }
  }

  if (Array.isArray(root.data)) {
    return {
      data: root.data as NewsPost[],
      currentPage: Number(root.current_page) || 1,
      lastPage: Number(root.last_page) || 1,
    }
  }

  const nested = root.data as PaginationData | undefined

  if (nested && typeof nested === 'object' && Array.isArray(nested.data)) {
    return {
      data: nested.data,
      currentPage: Number(nested.current_page) || 1,
      lastPage: Number(nested.last_page) || 1,
    }
  }

  if (Array.isArray(root.posts)) {
    return {
      data: root.posts as NewsPost[],
      currentPage: 1,
      lastPage: 1,
    }
  }

  return { data: [], currentPage: 1, lastPage: 1 }
}

async function fetchNews(): Promise<void> {
  loading.value = true
  error.value = ''

  try {
    const response = await newsApi.get('/v1/public/posts', {
      params: {
        per_page: 12,
        page: currentPage.value,
      },
    })

    const result = unwrapPosts(response.data)

    posts.value = result.data
    currentPage.value = result.currentPage
    lastPage.value = result.lastPage
  } catch (err: unknown) {
    console.error('Failed to load SFXC news:', err)

    if (axios.isAxiosError(err)) {
      if (err.response) {
        error.value = `The server returned an error (${err.response.status}). Please try again.`
      } else if (err.request) {
        error.value =
          'Unable to connect to the server. Check that Laravel is running and the API proxy is configured.'
      } else {
        error.value = err.message || 'An unexpected error occurred.'
      }
    } else {
      error.value = 'An unexpected error occurred while loading news.'
    }
  } finally {
    loading.value = false
  }
}

function selectCategory(category: string): void {
  selectedCategory.value = category
}

function clearFilters(): void {
  search.value = ''
  selectedCategory.value = 'All'
}

async function changePage(page: number): Promise<void> {
  if (page < 1 || page > lastPage.value || page === currentPage.value) return

  currentPage.value = page
  await fetchNews()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  void fetchNews()
})
</script>

