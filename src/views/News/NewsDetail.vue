
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import axios from 'axios'
import sfxcLogo from '@/assets/images/sfxc-logo-only.png'

const route = useRoute()
const newsApi = axios.create({
  baseURL: 'https://api.sfxc.edu.ph/api',
  headers: {
    Accept: 'application/json',
  },
})


const loading = ref(true)
const error = ref('')
const post = ref<any>(null)
const relatedPosts = ref<any[]>([])

const fetchArticle = async () => {
  loading.value = true
  error.value = ''
  post.value = null
  relatedPosts.value = []

  try {
    const response = await newsApi.get('/v1/public/posts')
    const responseData = response.data

    const posts = Array.isArray(responseData)
      ? responseData
      : Array.isArray(responseData.data)
        ? responseData.data
        : Array.isArray(responseData.posts)
          ? responseData.posts
          : []

    const slug = String(route.params.slug ?? '')
    const article = posts.find((item: any) => String(item.slug) === slug)

    if (!article) {
      error.value = 'The news article you are looking for could not be found.'
      return
    }

    post.value = article
    relatedPosts.value = posts
      .filter((item: any) => item.id !== article.id)
      .slice(0, 4)
  } catch (err) {
    console.error('Unable to load news article:', err)
    error.value = 'Unable to connect to the server. Please try again later.'
  } finally {
    loading.value = false
  }
}

const formatDate = (date: string | null | undefined) => {
  if (!date) return ''

  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return ''

  return parsedDate.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}


const getImage = (image: any): string => {
  if (!image) return ''

  const path =
    typeof image === 'string'
      ? image
      : image.image_url ??
        image.path ??
        image.image_path ??
        image.url ??
        ''

  if (typeof path !== 'string' || !path.trim()) return ''

  const value = path.trim()

  if (/^https?:\/\//i.test(value) || value.startsWith('data:')) {
    return value
  }

  const cleanPath = value.replace(/^\/+/, '')

  if (cleanPath.startsWith('storage/')) {
    return `https://api.sfxc.edu.ph/${cleanPath}`
  }

  return `https://api.sfxc.edu.ph/storage/${cleanPath}`
}


const getPostImages = (article: any): any[] => {
  if (!article) return []

  if (Array.isArray(article.images) && article.images.length) {
    return article.images
  }

  if (Array.isArray(article.media) && article.media.length) {
    return article.media
  }

  const singleImage = article.image ?? article.image_path ?? article.featured_image
  return singleImage ? [singleImage] : []
}

watch(() => route.params.slug, fetchArticle)
onMounted(fetchArticle)
</script>

<template>
  <div class="news-page w-full min-w-0 overflow-x-clip bg-[#f4f6f3] text-gray-800">
    <section class="border-b border-gray-200 bg-white">
      <div class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
          <RouterLink to="/" class="transition hover:text-green-800">Home</RouterLink>
          <span>/</span>
          <RouterLink to="/news" class="transition hover:text-green-800">News & Updates</RouterLink>
          <span v-if="post">/</span>
          <span v-if="post" class="truncate text-gray-700">{{ post.title }}</span>
        </div>

        <h2 class="text-2xl font-extrabold tracking-tight text-green-900 sm:text-3xl">
          News & Updates
        </h2>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
          Discover the latest announcements, achievements, and activities of the
          St. Francis Xavier College community.
        </p>
      </div>
    </section>

    <main class="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 items-start gap-6 px-3 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 lg:px-8 lg:py-8">
      <section class="min-w-0">
        <div v-if="loading" class="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-800"></div>
          <p class="mt-4 text-sm font-medium text-gray-600">Loading news article...</p>
        </div>

        <div v-else-if="error" class="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3h.008M10.3 3.86 1.82 18.5A1.9 1.9 0 0 0 3.46 21h17.08a1.9 1.9 0 0 0 1.64-2.5L13.7 3.86a1.96 1.96 0 0 0-3.4 0Z" />
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-bold text-gray-900">Unable to load article</h3>
          <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">{{ error }}</p>
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" class="rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900" @click="fetchArticle">
              Try Again
            </button>
            <RouterLink to="/news" class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
              Back to News
            </RouterLink>
          </div>
        </div>

        <article v-else-if="post" class="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div class="flex items-start gap-3 p-4 sm:p-5">
            <RouterLink to="/" class="shrink-0">
              <img :src="sfxcLogo" alt="St. Francis Xavier College" class="h-11 w-11 rounded-full border border-gray-200 bg-white object-contain p-1" />
            </RouterLink>

            <div class="min-w-0 flex-1">
              <p class="text-sm font-bold text-gray-900">St. Francis Xavier College</p>
              <p class="mt-1 text-xs text-gray-500">
                {{ formatDate(post.created_at ?? post.published_at) || 'Latest update' }}
                <span class="mx-1">·</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-3.5 w-3.5 align-[-2px]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2a6 6 0 0 0-6 6c0 4.1 6 10 6 10s6-5.9 6-10a6 6 0 0 0-6-6Zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clip-rule="evenodd" />
                </svg>
                Public
              </p>
              <span v-if="post.category?.name || post.category_name" class="mt-2 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-800">
                {{ post.category?.name ?? post.category_name }}
              </span>
            </div>
          </div>

          <div class="px-4 pb-4 sm:px-5">
            <h1 class="text-xl font-extrabold leading-snug tracking-tight text-gray-900 sm:text-2xl">
              {{ post.title }}
            </h1>
            <p v-if="post.excerpt || post.summary" class="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600 sm:text-base">
              {{ post.excerpt ?? post.summary }}
            </p>
          </div>

          <div v-if="getPostImages(post).length" class="news-gallery w-full overflow-hidden bg-gray-100" :class="{
            'gallery-single': getPostImages(post).length === 1,
            'gallery-two': getPostImages(post).length === 2,
            'gallery-many': getPostImages(post).length >= 3,
          }">
            <img
              v-for="(image, index) in getPostImages(post)"
              :key="image?.id ?? image?.path ?? image?.image_path ?? index"
              :src="getImage(image)"
              :alt="`${post.title} - image ${index + 1}`"
              class="gallery-image"
              :class="{
                'gallery-image-single': getPostImages(post).length === 1,
                'gallery-image-many': getPostImages(post).length >= 3,
              }"
              loading="lazy"
            />
          </div>

          <div class="p-4 sm:p-5">
            <div
              v-if="post.content"
              class="news-content text-sm leading-7 text-gray-700 sm:text-base"
              v-html="post.content"
            ></div>

            <p v-else-if="!post.excerpt && !post.summary" class="text-sm text-gray-500">
              No description is available for this article.
            </p>

            <div class="mt-5 border-t border-gray-100 pt-4">
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span class="flex h-7 w-7 items-center justify-center rounded-full bg-green-800 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2.5 12.2 7l4.9.7-3.55 3.45.84 4.88L10 13.72l-4.39 2.31.84-4.88L2.9 7.7 7.8 7 10 2.5Z" />
                  </svg>
                </span>
                <span>Shared by <strong class="font-semibold text-gray-700">St. Francis Xavier College</strong></span>
              </div>

              <div class="mt-5">
                <RouterLink to="/news" class="inline-flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 19 3 12l7-7M3 12h18" />
                  </svg>
                  Back to News
                </RouterLink>
              </div>
            </div>
          </div>
        </article>
      </section>

      <aside class="flex min-w-0 flex-col gap-5">
        <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 class="text-base font-bold text-gray-900">About SFXC</h2>
          <div class="mt-4 flex items-start gap-3">
            <img :src="sfxcLogo" alt="SFXC Logo" class="h-12 w-12 shrink-0 object-contain" />
            <div>
              <p class="text-sm font-bold text-green-900">St. Francis Xavier College</p>
              <p class="mt-1 text-xs leading-5 text-gray-600">
                Empowering learners through quality education, character formation, and service to the community.
              </p>
            </div>
          </div>
          <div class="mt-4 border-t border-gray-100 pt-4">
            <RouterLink to="/" class="flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
              Visit Official Website
            </RouterLink>
          </div>
        </section>

        <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-base font-bold text-gray-900">More News</h2>
            <RouterLink to="/news" class="text-xs font-semibold text-green-800 hover:underline">See all</RouterLink>
          </div>

          <div v-if="relatedPosts.length" class="mt-4 divide-y divide-gray-100">
            <RouterLink
              v-for="item in relatedPosts"
              :key="item.id ?? item.slug"
              :to="`/news/${item.slug}`"
              class="flex gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div class="h-[76px] w-[88px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img v-if="getPostImages(item).length" :src="getImage(getPostImages(item)[0])" :alt="item.title" class="h-full w-full object-cover transition duration-300 hover:scale-105" loading="lazy" />
                <div v-else class="flex h-full w-full items-center justify-center bg-green-50 text-green-800">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8l6 6v8a2 2 0 0 1-2 2ZM13 4v6h6M7 15h10M7 18h6" />
                  </svg>
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="line-clamp-3 text-sm font-semibold leading-5 text-gray-800 transition hover:text-green-800">
                  {{ item.title }}
                </h3>
                <p class="mt-1 text-xs text-gray-500">
                  {{ formatDate(item.created_at ?? item.published_at) }}
                </p>
              </div>
            </RouterLink>
          </div>

          <p v-else class="mt-3 text-sm leading-6 text-gray-500">
            No other news articles are available right now.
          </p>
        </section>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.news-page {
  min-height: 50vh;
}

.news-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3px;
}

.gallery-image {
  display: block;
  width: 100%;
  height: 240px;
  min-width: 0;
  object-fit: cover;
  background: #f3f4f6;
}

.gallery-single {
  display: block;
}

.gallery-image-single {
  width: 100%;
  max-height: 620px;
  height: auto;
  min-height: 220px;
  object-fit: contain;
  background: #f3f4f6;
}

.gallery-two .gallery-image {
  height: 280px;
}

.gallery-many .gallery-image {
  height: 230px;
}

/* Main article content */
.news-content {
  display: flow-root;
  width: 100%;
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: normal;
  text-align: justify !important;
  text-justify: inter-word !important;
}

/* Force justification on HTML injected by v-html */
.news-content :deep(p),
.news-content :deep(div),
.news-content :deep(span),
.news-content :deep(section),
.news-content :deep(article),
.news-content :deep(blockquote),
.news-content :deep(td) {
  text-align: justify !important;
  text-justify: inter-word !important;
  overflow-wrap: anywhere;
}

/* Override inline alignment saved by the editor */
.news-content :deep([style*="text-align"]),
.news-content :deep([align]) {
  text-align: justify !important;
  text-justify: inter-word !important;
}

/* Paragraph spacing */
.news-content :deep(p) {
  display: block;
  margin: 0 0 0.75rem !important;
  line-height: 1.75 !important;
}

.news-content :deep(p:last-child) {
  margin-bottom: 0 !important;
}

/* Headings stay left-aligned */
.news-content :deep(h1),
.news-content :deep(h2),
.news-content :deep(h3),
.news-content :deep(h4),
.news-content :deep(h5),
.news-content :deep(h6) {
  margin: 1.1rem 0 0.5rem !important;
  font-weight: 700;
  line-height: 1.35;
  color: #14532d;
  text-align: left !important;
}

/* Bulleted lists */
.news-content :deep(ul) {
  display: block !important;
  margin: 0.5rem 0 0.75rem !important;
  padding-left: 1.5rem !important;
  list-style: disc outside !important;
  text-align: left !important;
}

/* Numbered lists */
.news-content :deep(ol) {
  display: block !important;
  margin: 0.5rem 0 0.75rem !important;
  padding-left: 1.5rem !important;
  list-style: decimal outside !important;
  text-align: left !important;
}

/* List items keep their bullets/numbers and justify their text */
.news-content :deep(li) {
  display: list-item !important;
  margin: 0.2rem 0 !important;
  padding-left: 0.1rem;
  text-align: justify !important;
  text-justify: inter-word !important;
  line-height: 1.7 !important;
}

.news-content :deep(ul ul) {
  list-style-type: circle !important;
}

.news-content :deep(ol ol) {
  list-style-type: lower-alpha !important;
}

.news-content :deep(a) {
  color: #166534;
  text-decoration: underline;
  overflow-wrap: anywhere;
}

.news-content :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 1rem auto;
  border-radius: 0.5rem;
}

.news-content :deep(blockquote) {
  margin: 1rem 0 !important;
  border-left: 4px solid #d4a72c;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  color: #4b5563;
}

.news-content :deep(table) {
  display: block;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
}

.news-content :deep(th),
.news-content :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 0.5rem 0.75rem;
  text-align: left !important;
}

.news-content :deep(pre) {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.news-content :deep(code) {
  overflow-wrap: anywhere;
}

@media (max-width: 640px) {
  .gallery-image,
  .gallery-two .gallery-image,
  .gallery-many .gallery-image {
    height: 180px;
  }

  .gallery-image-single {
    height: auto;
    min-height: 180px;
    max-height: 480px;
  }
}
</style>
