<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

export interface NewsPost {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  image_path?: string | null
  image_url?: string | null
  is_featured?: boolean
  status: 'draft' | 'published'
  published_at?: string | null
  created_at?: string | null
  category?: { id: number; name: string } | null
}

const props = defineProps<{ item: NewsPost }>()
const API_ORIGIN = 'http://127.0.0.1:8000'
const imageFailed = ref(false)

const imageUrl = computed(() => {
  const path = props.item.image_url?.trim() || props.item.image_path?.trim()
  if (!path) return null
  if (/^https?:\/\//i.test(path)) return path

  const normalizedPath = path.replace(/^\/+/, '')
  if (normalizedPath.startsWith('storage/')) {
    return `${API_ORIGIN}/${normalizedPath}`
  }

  return `${API_ORIGIN}/storage/${normalizedPath}`
})

watch(
  () => [props.item.id, props.item.image_path, props.item.image_url],
  () => {
    imageFailed.value = false
  },
)

function handleImageError(event: Event): void {
  imageFailed.value = true
  const img = event.target as HTMLImageElement
  img.onerror = null
}

const displayDate = computed(() => {
  const date = props.item.published_at || props.item.created_at
  if (!date) return 'Date unavailable'

  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return 'Date unavailable'

  return parsedDate.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

const categoryName = computed(() => props.item.category?.name ?? 'News')
</script>

<template>
  <article class="group relative flex gap-4 overflow-hidden rounded-2xl border border-border/40 bg-card p-3 transition-colors duration-300 hover:bg-accent/5 focus-within:ring-2 focus-within:ring-primary">
    <div class="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
      <img
        v-if="imageUrl && !imageFailed"
        :src="imageUrl"
        :alt="item.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        @error="handleImageError"
      />

      <div
        v-else
        class="flex h-full w-full items-center justify-center text-muted-foreground"
        aria-label="No image available"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    </div>

    <div class="flex min-w-0 flex-1 flex-col justify-center">
      <div class="mb-2 flex flex-wrap items-center gap-2">
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {{ categoryName }}
        </span>
        <span class="text-xs text-muted-foreground">
          {{ displayDate }}
        </span>
      </div>

      <h3 class="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
        {{ item.title }}
      </h3>

      <p
        v-if="item.excerpt"
        class="mt-1 line-clamp-2 text-sm text-muted-foreground"
      >
        {{ item.excerpt }}
      </p>

      <RouterLink
        v-if="item.slug"
        :to="{ name: 'news-detail', params: { slug: item.slug } }"
        class="mt-2 inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Read more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </RouterLink>
    </div>
  </article>
</template>

