<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

interface Category {
  id: number
  name: string
  slug?: string
  posts_count?: number
}

interface WebsiteSection {
  id: number
  name: string
  slug?: string
  is_active?: boolean
}

interface ApiPost {
  id: number
  category_id?: number | null
  category?: Category | string | null
  sections?: WebsiteSection[]
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  image_path?: string | null
  image_url?: string | null
  is_featured: boolean | number | string
  status: string
  published_at?: string | null
  created_at?: string | null
  updated_at?: string | null
}

interface Post {
  id: number
  title: string
  slug: string
  category: string
  categoryId: number | null
  sections: WebsiteSection[]
  date: string
  featured: boolean
  published: boolean
  status: string
  raw: ApiPost
}

const router = useRouter()

const posts = ref<Post[]>([])
const categories = ref<Category[]>([])
const sections = ref<WebsiteSection[]>([])

const loading = ref(true)
const updatingId = ref<number | null>(null)
const errorMessage = ref('')
const successMessage = ref('')

const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedStatus = ref('All')
const selectedSection = ref('All')

const categoryOptions = computed(() => [
  'All',
  ...categories.value.map((item) => item.name),
])

const sectionOptions = computed(() => [
  'All',
  ...sections.value.map((item) => item.name),
])

const totalPosts = computed(() => posts.value.length)

const publishedPosts = computed(
  () => posts.value.filter((post) => post.published).length,
)

const draftPosts = computed(
  () => posts.value.filter((post) => !post.published).length,
)

const featuredPosts = computed(
  () => posts.value.filter((post) => post.featured).length,
)

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return posts.value.filter((post) => {
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.slug.toLowerCase().includes(query) ||
      post.sections.some((section) =>
        section.name.toLowerCase().includes(query),
      )

    const matchesCategory =
      selectedCategory.value === 'All' ||
      post.category === selectedCategory.value

    const matchesStatus =
      selectedStatus.value === 'All' ||
      (selectedStatus.value === 'Published' && post.published) ||
      (selectedStatus.value === 'Draft' && !post.published)

    const matchesSection =
      selectedSection.value === 'All' ||
      post.sections.some(
        (section) => section.name === selectedSection.value,
      )

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesSection
    )
  })
})

function categoryName(category: ApiPost['category']): string {
  if (typeof category === 'string') return category
  return category?.name || 'Uncategorized'
}

function categoryId(post: ApiPost): number | null {
  if (post.category_id != null) return Number(post.category_id)

  if (post.category && typeof post.category === 'object') {
    const match = categories.value.find(
      (item) => item.name === post.category?.name,
    )
    return match?.id ?? null
  }

  return null
}

function normalizePost(post: ApiPost): Post {
  const rawSections = Array.isArray(post.sections)
    ? post.sections
    : []

  const normalizedSections = rawSections
    .map((section) => {
      if (typeof section === 'string') {
        return sections.value.find((item) => item.name === section)
      }

      return section
    })
    .filter((section): section is WebsiteSection => Boolean(section))

  return {
    id: post.id,
    title: post.title ?? '',
    slug: post.slug ?? '',
    category: categoryName(post.category),
    categoryId: categoryId(post),
    sections: normalizedSections,
    date: formatDate(post.published_at || post.created_at),
    featured:
      post.is_featured === true ||
      post.is_featured === 1 ||
      post.is_featured === '1',
    published: post.status === 'published',
    status: post.status,
    raw: post,
  }
}

function formatDate(dateValue?: string | null): string {
  if (!dateValue) return 'Not published'

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) return 'Unknown date'

  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function extractArray<T>(responseData: unknown): T[] {
  if (Array.isArray(responseData)) {
    return responseData as T[]
  }

  if (
    responseData &&
    typeof responseData === 'object' &&
    'data' in responseData
  ) {
    const nested = (responseData as { data: unknown }).data

    if (Array.isArray(nested)) {
      return nested as T[]
    }
  }

  return []
}

function getErrorMessage(error: unknown): string {
  const err = error as {
    response?: {
      status?: number
      data?: {
        message?: string
        errors?: Record<string, string[]>
      }
    }
    message?: string
  }

  const status = err.response?.status
  const data = err.response?.data

  if (status === 401) {
    return 'Your session has expired or you are not logged in. Please log in again.'
  }

  if (status === 403) {
    return 'You do not have permission to manage website posts.'
  }

  if (status === 419) {
    return 'Your session or CSRF token has expired. Refresh the page and log in again.'
  }

  if (data?.errors) {
    const firstError = Object.values(data.errors).flat()[0]
    if (firstError) return firstError
  }

  return (
    data?.message ||
    err.message ||
    'Something went wrong. Please try again.'
  )
}

async function loadPosts(): Promise<void> {
  const allRecords: ApiPost[] = []
  let page = 1
  let lastPage = 1

  do {
    const response = await api.get('/api/v1/posts', {
      params: {
        per_page: 50,
        page,
      },
    })

    const data = response.data

    allRecords.push(...extractArray<ApiPost>(data))

    if (
      data &&
      typeof data === 'object' &&
      'last_page' in data
    ) {
      lastPage = Math.max(
        1,
        Number((data as { last_page: number }).last_page) || 1,
      )
    } else {
      lastPage = 1
    }

    page++
  } while (page <= lastPage)

  posts.value = allRecords.map(normalizePost)
}

async function loadCategories(): Promise<void> {
  const response = await api.get('/api/v1/categories')
  categories.value = extractArray<Category>(response.data)
}

async function loadSections(): Promise<void> {
  const response = await api.get('/api/v1/sections')

  sections.value = extractArray<WebsiteSection>(response.data)
    .filter((section) => section.is_active !== false)
}

async function loadPage(): Promise<void> {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await Promise.all([
      loadCategories(),
      loadSections(),
    ])

    await loadPosts()
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    loading.value = false
  }
}

function createPost(): void {
  router.push('/admin/posts/create')
}

function editPost(id: number): void {
  // Matches CreatePost.vue, which reads the ?edit=ID query.
  router.push({
    path: '/admin/posts/create',
    query: { edit: String(id) },
  })
}

function viewPost(post: Post): void {
  window.alert(
    `Post preview is not connected yet.\n\nTitle: ${post.title}\nCategory: ${post.category}\nStatus: ${post.status}`,
  )
}

function buildUpdateForm(
  post: Post,
  overrides: {
    status?: string
    published_at?: string | null
    is_featured?: boolean
  } = {},
): FormData {
  const formData = new FormData()

  formData.append('_method', 'PUT')
  formData.append('title', post.raw.title)
  formData.append('category_id', String(post.categoryId ?? ''))
  formData.append('slug', post.raw.slug ?? '')
  formData.append('excerpt', post.raw.excerpt ?? '')
  formData.append('content', post.raw.content ?? '')

  const nextStatus = overrides.status ?? post.status

  formData.append('status', nextStatus)

  const nextPublishedAt =
    overrides.published_at !== undefined
      ? overrides.published_at
      : post.raw.published_at

  if (nextStatus === 'published') {
    formData.append(
      'published_at',
      nextPublishedAt || new Date().toISOString(),
    )
  } else {
    formData.append('published_at', '')
  }

  const nextFeatured =
    overrides.is_featured !== undefined
      ? overrides.is_featured
      : post.featured

  formData.append('is_featured', nextFeatured ? '1' : '0')

  post.sections.forEach((section, index) => {
    formData.append(
      `section_ids[${index}]`,
      String(section.id),
    )
  })

  return formData
}

async function updatePost(
  post: Post,
  overrides: {
    status?: string
    published_at?: string | null
    is_featured?: boolean
  },
): Promise<void> {
  if (post.categoryId === null) {
    throw new Error(
      'This post has no valid category. Edit the post and select a category first.',
    )
  }

  if (post.sections.length === 0) {
    throw new Error(
      'This post has no assigned website sections. Edit the post and select at least one section first.',
    )
  }

  const formData = buildUpdateForm(post, overrides)

  await api.post(`/api/v1/posts/${post.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

async function togglePublished(post: Post): Promise<void> {
  if (updatingId.value !== null) return

  const nextStatus = post.published ? 'draft' : 'published'

  const confirmed = window.confirm(
    nextStatus === 'published'
      ? `Publish "${post.title}"?`
      : `Move "${post.title}" back to drafts?`,
  )

  if (!confirmed) return

  updatingId.value = post.id
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await updatePost(post, {
      status: nextStatus,
      published_at:
        nextStatus === 'published'
          ? post.raw.published_at || new Date().toISOString()
          : null,
    })

    await loadPosts()

    successMessage.value =
      nextStatus === 'published'
        ? 'Post published successfully.'
        : 'Post moved to drafts.'
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    updatingId.value = null
  }
}

async function toggleFeatured(post: Post): Promise<void> {
  if (updatingId.value !== null) return

  updatingId.value = post.id
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await updatePost(post, {
      is_featured: !post.featured,
    })

    await loadPosts()

    successMessage.value = post.featured
      ? 'Post removed from featured posts.'
      : 'Post marked as featured.'
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    updatingId.value = null
  }
}

async function deletePost(post: Post): Promise<void> {
  if (updatingId.value !== null) return

  const confirmed = window.confirm(
    `Are you sure you want to delete "${post.title}"?`,
  )

  if (!confirmed) return

  updatingId.value = post.id
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await api.delete(`/api/v1/posts/${post.id}`)

    posts.value = posts.value.filter(
      (item) => item.id !== post.id,
    )

    successMessage.value = 'Post deleted successfully.'
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    updatingId.value = null
  }
}

function clearFilters(): void {
  searchQuery.value = ''
  selectedCategory.value = 'All'
  selectedStatus.value = 'All'
  selectedSection.value = 'All'
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    News: 'bi bi-newspaper',
    Announcements: 'bi bi-megaphone-fill',
    Announcement: 'bi bi-megaphone-fill',
    Event: 'bi bi-calendar-event-fill',
    Events: 'bi bi-calendar-event-fill',
    Achievement: 'bi bi-trophy-fill',
    Academic: 'bi bi-mortarboard-fill',
    Community: 'bi bi-people-fill',
    Story: 'bi bi-book-fill',
  }

  return icons[category] || 'bi bi-file-earmark-text-fill'
}

function getCategoryClass(category: string): string {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

onMounted(loadPage)
</script>

<template>
  <div class="posts-page">
    <section class="page-header">
      <div class="page-header-content">
        <div class="page-title-area">
          <div class="title-icon">
            <i class="bi bi-file-earmark-richtext-fill"></i>
          </div>

          <div>
            <span class="eyebrow">CONTENT MANAGEMENT</span>
            <h2>Posts</h2>
            <p>Manage website news, announcements, events, and stories.</p>
          </div>
        </div>

        <button type="button" class="create-button" @click="createPost">
          <i class="bi bi-plus-lg"></i>
          <span>New Post</span>
        </button>
      </div>
    </section>

    <div v-if="errorMessage" class="alert error-alert" role="alert">
      <i class="bi bi-exclamation-circle-fill"></i>
      <span>{{ errorMessage }}</span>
      <button type="button" aria-label="Dismiss error" @click="errorMessage = ''">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div v-if="successMessage" class="alert success-alert" role="status">
      <i class="bi bi-check-circle-fill"></i>
      <span>{{ successMessage }}</span>
      <button type="button" aria-label="Dismiss message" @click="successMessage = ''">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <section class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon green"><i class="bi bi-file-earmark-text-fill"></i></div>
        <div class="summary-content">
          <span>Total Posts</span>
          <strong>{{ loading ? '—' : totalPosts }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon published"><i class="bi bi-check-circle-fill"></i></div>
        <div class="summary-content">
          <span>Published</span>
          <strong>{{ loading ? '—' : publishedPosts }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon draft"><i class="bi bi-file-earmark"></i></div>
        <div class="summary-content">
          <span>Drafts</span>
          <strong>{{ loading ? '—' : draftPosts }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon featured"><i class="bi bi-star-fill"></i></div>
        <div class="summary-content">
          <span>Featured</span>
          <strong>{{ loading ? '—' : featuredPosts }}</strong>
        </div>
      </div>
    </section>

    <section class="content-card">
      <div class="filter-header">
        <div>
          <h3>All Posts</h3>
          <span>
            {{ loading ? 'Loading posts…' : `${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} found` }}
          </span>
        </div>

        <div class="header-actions">
          <button
            v-if="searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All' || selectedSection !== 'All'"
            type="button"
            class="clear-button"
            @click="clearFilters"
          >
            <i class="bi bi-x-circle"></i>
            Clear Filters
          </button>

          <button type="button" class="refresh-button" :disabled="loading" @click="loadPage">
            <i class="bi bi-arrow-clockwise" :class="{ spinning: loading }"></i>
            Refresh
          </button>
        </div>
      </div>

      <div class="filters">
        <div class="filter-control search-control">
          <label for="post-search">Search Posts</label>
          <div class="search-box">
            <i class="bi bi-search"></i>
            <input id="post-search" v-model="searchQuery" type="text" placeholder="Search posts..." />
            <button v-if="searchQuery" type="button" aria-label="Clear search" @click="searchQuery = ''">
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>

        <div class="filter-control">
          <label for="category-filter">Category</label>
          <select id="category-filter" v-model="selectedCategory">
            <option v-for="item in categoryOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>

        <div class="filter-control">
          <label for="section-filter">Section</label>
          <select id="section-filter" v-model="selectedSection">
            <option v-for="item in sectionOptions" :key="item" :value="item">
              {{ item === 'All' ? 'All sections' : item }}
            </option>
          </select>
        </div>

        <div class="filter-control">
          <label for="status-filter">Status</label>
          <select id="status-filter" v-model="selectedStatus">
            <option value="All">All</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <span class="spinner"></span>
        <strong>Loading posts</strong>
        <span>Connecting to the SFXC website API…</span>
      </div>

      <div v-else class="posts-table-wrapper">
        <table class="posts-table">
          <thead>
            <tr>
              <th class="post-column">POST</th>
              <th>CATEGORY</th>
              <th>DISPLAY IN</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th class="actions-column">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="post in filteredPosts" :key="post.id">
              <td>
                <div class="post-info">
                  <div class="post-thumbnail">
                    <img
                      v-if="post.raw.image_url"
                      :src="post.raw.image_url"
                      :alt="post.title"
                    />
                    <i v-else :class="getCategoryIcon(post.category)"></i>
                  </div>

                  <div class="post-details">
                    <strong>{{ post.title }}</strong>
                    <span>/{{ post.slug }}</span>
                    <div v-if="post.featured" class="featured-label">
                      <i class="bi bi-star-fill"></i> Featured
                    </div>
                  </div>
                </div>
              </td>

              <td>
                <span class="category-badge" :class="getCategoryClass(post.category)">
                  <i :class="getCategoryIcon(post.category)"></i>
                  {{ post.category }}
                </span>
              </td>

              <td>
                <div v-if="post.sections.length" class="section-list">
                  <span
                    v-for="section in post.sections"
                    :key="section.id"
                    class="section-badge"
                  >
                    {{ section.name }}
                  </span>
                </div>
                <span v-else class="section-badge">Not assigned</span>
              </td>

              <td>
                <div class="date-info">
                  <i class="bi bi-calendar3"></i>
                  <span>{{ post.date }}</span>
                </div>
              </td>

              <td>
                <button
                  type="button"
                  class="status-badge"
                  :class="post.published ? 'published-status' : 'draft-status'"
                  :disabled="updatingId !== null"
                  @click="togglePublished(post)"
                >
                  <span class="status-dot"></span>
                  {{ post.published ? 'Published' : 'Draft' }}
                </button>
              </td>

              <td>
                <div class="row-actions">
                  <button type="button" class="row-action view" title="Preview post" @click="viewPost(post)">
                    <i class="bi bi-eye-fill"></i>
                  </button>

                  <button type="button" class="row-action edit" title="Edit post" @click="editPost(post.id)">
                    <i class="bi bi-pencil-fill"></i>
                  </button>

                  <button
                    type="button"
                    class="row-action feature"
                    :class="{ active: post.featured }"
                    :disabled="updatingId !== null"
                    :title="post.featured ? 'Remove featured status' : 'Mark as featured'"
                    @click="toggleFeatured(post)"
                  >
                    <i class="bi bi-star-fill"></i>
                  </button>

                  <button
                    type="button"
                    class="row-action delete"
                    title="Delete post"
                    :disabled="updatingId !== null"
                    @click="deletePost(post)"
                  >
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredPosts.length === 0">
              <td colspan="6" class="empty-state">
                <div class="empty-icon"><i class="bi bi-file-earmark-x"></i></div>
                <strong>No posts found</strong>
                <span>
                  {{ errorMessage ? 'Check the API error above and try again.' : 'Try changing your filters or create your first post.' }}
                </span>
                <button type="button" @click="clearFilters">Clear Filters</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!loading && filteredPosts.length > 0" class="mobile-posts">
        <article v-for="post in filteredPosts" :key="post.id" class="mobile-post-card">
          <div class="mobile-post-top">
            <div class="post-thumbnail">
              <img v-if="post.raw.image_url" :src="post.raw.image_url" :alt="post.title" />
              <i v-else :class="getCategoryIcon(post.category)"></i>
            </div>

            <div class="mobile-post-main">
              <h4>{{ post.title }}</h4>
              <span class="mobile-date"><i class="bi bi-calendar3"></i> {{ post.date }}</span>
            </div>

            <button type="button" class="mobile-menu-button" title="Edit post" @click="editPost(post.id)">
              <i class="bi bi-pencil-fill"></i>
            </button>
          </div>

          <div class="mobile-post-meta">
            <span class="category-badge" :class="getCategoryClass(post.category)">
              <i :class="getCategoryIcon(post.category)"></i>
              {{ post.category }}
            </span>

            <button
              type="button"
              class="status-badge"
              :class="post.published ? 'published-status' : 'draft-status'"
              :disabled="updatingId !== null"
              @click="togglePublished(post)"
            >
              <span class="status-dot"></span>
              {{ post.published ? 'Published' : 'Draft' }}
            </button>

            <span v-if="post.featured" class="featured-label">
              <i class="bi bi-star-fill"></i> Featured
            </span>
          </div>

          <div class="mobile-sections">
            <span v-for="section in post.sections" :key="section.id" class="section-badge">
              {{ section.name }}
            </span>
            <span v-if="!post.sections.length" class="section-badge">Not assigned</span>
          </div>

          <div class="mobile-post-actions">
            <button type="button" @click="viewPost(post)">
              <i class="bi bi-eye-fill"></i> View
            </button>
            <button type="button" @click="editPost(post.id)">
              <i class="bi bi-pencil-fill"></i> Edit
            </button>
            <button type="button" :disabled="updatingId !== null" @click="toggleFeatured(post)">
              <i class="bi bi-star-fill"></i>
              {{ post.featured ? 'Unfeature' : 'Feature' }}
            </button>
            <button type="button" class="mobile-delete" :disabled="updatingId !== null" @click="deletePost(post)">
              <i class="bi bi-trash3-fill"></i>
            </button>
          </div>
        </article>
      </div>

      <div v-if="!loading && filteredPosts.length === 0 && errorMessage" class="mobile-empty">
        <i class="bi bi-exclamation-circle"></i>
        <span>Posts could not be loaded. Check the error message above.</span>
      </div>

      <div v-if="!loading && filteredPosts.length > 0" class="table-footer">
        Showing <strong>{{ filteredPosts.length }}</strong> of <strong>{{ totalPosts }}</strong> posts
      </div>
    </section>
  </div>
</template>

<style scoped>
.posts-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 17px 20px 25px;
  background: #f3f8f5;
  color: #26392d;
}

.page-header { margin-bottom: 14px; }
.page-header-content { display: flex; align-items: center; justify-content: space-between; gap: 15px; }
.page-title-area { display: flex; align-items: center; gap: 10px; min-width: 0; }
.title-icon {
  width: 42px; height: 42px; flex: 0 0 42px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 10px; background: #e4f4e9; color: #104717; font-size: 17px;
}
.eyebrow { display: block; margin-bottom: 2px; color: #809088; font-size: 8px; font-weight: 750; letter-spacing: .09em; }
.page-title-area h2 { margin: 0; color: #17351f; font-size: 19px; line-height: 1.15; font-weight: 750; }
.page-title-area p { margin: 3px 0 0; color: #849089; font-size: 9px; }

.create-button {
  height: 35px; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  padding: 0 13px; border: 0; border-radius: 7px; background: #104717; color: #fff;
  font-size: 10px; font-weight: 650; cursor: pointer; box-shadow: 0 4px 10px #10471724;
  transition: .2s ease; white-space: nowrap;
}
.create-button:hover { background: #0b5a20; transform: translateY(-1px); }

.alert {
  display: flex; align-items: center; gap: 8px; margin-bottom: 10px; padding: 9px 11px;
  border: 1px solid; border-radius: 7px; font-size: 10px;
}
.alert span { flex: 1; }
.alert button { border: 0; background: transparent; color: inherit; cursor: pointer; }
.error-alert { border-color: #f1cccc; background: #fff3f3; color: #9e3030; }
.success-alert { border-color: #cfe8d5; background: #effaf1; color: #216b38; }

.summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px; margin-bottom: 12px; }
.summary-card {
  min-height: 65px; display: flex; align-items: center; gap: 9px; padding: 10px 11px;
  border: 1px solid #e2ebe5; border-radius: 8px; background: #fff; box-shadow: 0 2px 8px #1c3d2809;
}
.summary-icon { width: 34px; height: 34px; flex: 0 0 34px; display: flex; align-items: center; justify-content: center; border-radius: 7px; font-size: 13px; }
.summary-icon.green { background: #e7f4eb; color: #104717; }
.summary-icon.published { background: #e8f7ef; color: #0b7a3d; }
.summary-icon.draft { background: #f2f3f3; color: #68736d; }
.summary-icon.featured { background: #fff6dc; color: #b47b00; }
.summary-content { display: flex; flex-direction: column; min-width: 0; }
.summary-content span { color: #8a958e; font-size: 8px; }
.summary-content strong { margin-top: 2px; color: #26392d; font-size: 17px; line-height: 1; }

.content-card { overflow: hidden; border: 1px solid #e2ebe5; border-radius: 9px; background: #fff; box-shadow: 0 2px 9px #1c3d2809; }
.filter-header { min-height: 52px; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 13px; border-bottom: 1px solid #edf1ee; }
.filter-header h3 { margin: 0; color: #293a30; font-size: 12px; font-weight: 700; }
.filter-header > div:first-child > span { display: block; margin-top: 2px; color: #929b96; font-size: 8px; }
.header-actions { display: flex; align-items: center; gap: 10px; }
.clear-button, .refresh-button { display: inline-flex; align-items: center; gap: 5px; border: 0; background: transparent; color: #68756d; font-size: 8px; cursor: pointer; white-space: nowrap; }
.clear-button:hover, .refresh-button:hover { color: #104717; }
.refresh-button:disabled { opacity: .5; cursor: wait; }
.spinning { display: inline-block; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.filters {
  display: grid; grid-template-columns: minmax(200px, 1.7fr) repeat(3, minmax(115px, 1fr));
  align-items: end; gap: 9px; padding: 10px 13px; border-bottom: 1px solid #edf1ee; background: #fbfcfb;
}
.filter-control { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.filter-control label { height: 11px; display: flex; align-items: center; color: #7e8982; font-size: 7px; font-weight: 700; line-height: 1; text-transform: uppercase; letter-spacing: .06em; }
.search-box {
  width: 100%; height: 30px; box-sizing: border-box; display: flex; align-items: center; padding: 0 8px;
  border: 1px solid #dfe8e2; border-radius: 6px; background: #fff; transition: .2s ease;
}
.search-box > i { flex: 0 0 auto; color: #8b968f; font-size: 10px; }
.search-box input { width: 100%; min-width: 0; height: 100%; flex: 1; padding: 0 7px; border: 0; outline: 0; background: transparent; color: #26362c; font-size: 9px; }
.search-box input::placeholder { color: #a0a8a3; }
.search-box button { width: 20px; height: 20px; flex: 0 0 20px; display: flex; align-items: center; justify-content: center; padding: 0; border: 0; background: transparent; color: #9ba39e; cursor: pointer; }
.filter-control select { width: 100%; height: 30px; box-sizing: border-box; padding: 0 8px; border: 1px solid #dfe8e2; border-radius: 6px; outline: none; background: #fff; color: #435149; font-size: 9px; cursor: pointer; }
.filter-control select:focus, .search-box:focus-within { border-color: #1047174d; box-shadow: 0 0 0 2px #1047170d; }

.posts-table-wrapper { width: 100%; overflow-x: auto; }
.posts-table { width: 100%; min-width: 920px; border-collapse: collapse; }
.posts-table th { height: 35px; padding: 0 11px; border-bottom: 1px solid #e9efeb; background: #fafcfa; color: #89948d; font-size: 7px; font-weight: 750; text-align: left; letter-spacing: .06em; white-space: nowrap; }
.posts-table td { padding: 9px 11px; border-bottom: 1px solid #eef2ef; vertical-align: middle; }
.posts-table tbody tr:hover { background: #fbfdfb; }
.post-column { width: 30%; }
.actions-column { width: 120px; }

.post-info { display: flex; align-items: center; gap: 8px; }
.post-thumbnail { width: 38px; height: 38px; flex: 0 0 38px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 7px; background: linear-gradient(135deg, #e9f5ec, #dff0e4); color: #104717; font-size: 13px; }
.post-thumbnail img { width: 100%; height: 100%; object-fit: cover; }
.post-details { min-width: 0; display: flex; flex-direction: column; }
.post-details strong { max-width: 310px; overflow: hidden; color: #35443a; font-size: 9px; font-weight: 650; line-height: 1.3; text-overflow: ellipsis; white-space: nowrap; }
.post-details > span { max-width: 280px; overflow: hidden; margin-top: 2px; color: #a0a8a3; font-size: 7px; text-overflow: ellipsis; white-space: nowrap; }
.featured-label { display: inline-flex; align-items: center; gap: 3px; margin-top: 3px; color: #a87900; font-size: 7px; }

.category-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 6px; border-radius: 5px; font-size: 7px; font-weight: 650; white-space: nowrap; }
.category-news { background: #e9f3ff; color: #27639b; }
.category-announcement, .category-announcements { background: #fff1e5; color: #a15d1c; }
.category-event, .category-events { background: #f0ebff; color: #6645a5; }
.category-achievement { background: #fff6db; color: #9a7000; }
.category-academic { background: #e7f4eb; color: #216b38; }
.category-community { background: #e9f7f5; color: #28786e; }
.category-story { background: #f7ebf5; color: #8a4c7d; }
.section-list, .mobile-sections { display: flex; flex-wrap: wrap; gap: 3px; }
.section-badge { display: inline-flex; align-items: center; padding: 3px 5px; border: 1px solid #e2e9e4; border-radius: 4px; background: #f7faf8; color: #657169; font-size: 7px; }
.date-info { display: flex; align-items: center; gap: 5px; color: #69756e; font-size: 7px; white-space: nowrap; }
.date-info i { color: #91a099; font-size: 9px; }
.status-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 6px; border: 0; border-radius: 5px; font-size: 7px; font-weight: 650; }
button.status-badge { cursor: pointer; }
.status-badge:disabled { opacity: .55; cursor: wait; }
.published-status { background: #e8f6ed; color: #28733d; }
.draft-status { background: #f0f2f1; color: #69746e; }
.status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.row-actions { display: flex; align-items: center; gap: 3px; }
.row-action { width: 27px; height: 27px; display: flex; align-items: center; justify-content: center; border: 1px solid transparent; border-radius: 5px; background: transparent; font-size: 9px; cursor: pointer; }
.row-action:disabled { opacity: .4; cursor: wait; }
.row-action.view { color: #65736b; }
.row-action.view:hover { background: #eef4f0; color: #104717; }
.row-action.edit { color: #557b9a; }
.row-action.edit:hover { background: #edf5fb; color: #2e6289; }
.row-action.feature { color: #b6a46b; }
.row-action.feature:hover, .row-action.feature.active { background: #fff6dc; color: #aa7900; }
.row-action.delete { color: #b17979; }
.row-action.delete:hover { background: #fff0f0; color: #b03d3d; }

.empty-state { padding: 45px 20px !important; text-align: center; }
.empty-icon { width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; margin: 0 auto 9px; border-radius: 50%; background: #f1f5f2; color: #8b9890; font-size: 17px; }
.empty-state strong, .empty-state > span { display: block; }
.empty-state strong { color: #536158; font-size: 10px; }
.empty-state > span { margin-top: 3px; color: #99a29d; font-size: 8px; }
.empty-state button { margin-top: 9px; border: 0; background: transparent; color: #104717; font-size: 8px; font-weight: 650; cursor: pointer; }
.loading-state { min-height: 210px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; color: #7c8981; font-size: 9px; }
.loading-state strong { color: #435149; font-size: 11px; }
.spinner { width: 24px; height: 24px; border: 3px solid #e1ece4; border-top-color: #104717; border-radius: 50%; animation: spin .8s linear infinite; }
.mobile-posts, .mobile-empty { display: none; }
.table-footer { min-height: 36px; display: flex; align-items: center; gap: 4px; padding: 0 13px; color: #9aa39e; font-size: 8px; }
.table-footer strong { color: #68746d; }

@media (max-width: 1100px) {
  .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .filters { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 800px) {
  .posts-page { padding: 14px 13px 22px; }
  .posts-table-wrapper { display: none; }
  .mobile-posts { display: block; padding: 8px; }
  .mobile-post-card { margin-bottom: 7px; padding: 10px; border: 1px solid #e5ebe7; border-radius: 8px; background: #fff; }
  .mobile-post-top { display: flex; align-items: flex-start; gap: 8px; }
  .mobile-post-main { min-width: 0; flex: 1; }
  .mobile-post-main h4 { margin: 1px 0 3px; color: #344239; font-size: 10px; line-height: 1.35; }
  .mobile-date { display: flex; align-items: center; gap: 4px; color: #929c96; font-size: 7px; }
  .mobile-menu-button { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border: 0; border-radius: 5px; background: #f4f7f5; color: #738078; cursor: pointer; }
  .mobile-post-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; margin-top: 9px; }
  .mobile-sections { margin-top: 6px; }
  .mobile-post-actions { display: flex; align-items: center; gap: 4px; margin-top: 9px; padding-top: 7px; border-top: 1px solid #edf1ee; }
  .mobile-post-actions button { height: 26px; display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 0 7px; border: 0; border-radius: 5px; background: #f5f8f6; color: #647168; font-size: 7px; cursor: pointer; }
  .mobile-post-actions button:disabled { opacity: .5; cursor: wait; }
  .mobile-post-actions .mobile-delete { width: 26px; margin-left: auto; color: #ad7777; }
  .table-footer { display: none; }
}

@media (max-width: 600px) {
  .page-header-content { align-items: flex-start; }
  .title-icon { width: 37px; height: 37px; flex-basis: 37px; font-size: 15px; }
  .page-title-area h2 { font-size: 17px; }
  .page-title-area p { max-width: 250px; font-size: 8px; line-height: 1.5; }
  .create-button { width: 35px; padding: 0; }
  .create-button span { display: none; }
  .summary-card { min-height: 58px; padding: 8px; }
  .summary-icon { width: 30px; height: 30px; flex-basis: 30px; }
  .summary-content strong { font-size: 15px; }
  .filters { gap: 8px; padding: 9px; }
  .filter-control label { height: 10px; }
  .filter-control select, .search-box { height: 30px; }
  .filter-header { padding: 8px 10px; }
}

@media (max-width: 420px) {
  .posts-page { padding: 11px 8px 18px; }
  .summary-grid { gap: 6px; }
  .summary-card { gap: 6px; padding: 7px; }
  .summary-icon { width: 27px; height: 27px; flex-basis: 27px; font-size: 10px; }
  .summary-content span { font-size: 7px; }
  .summary-content strong { font-size: 14px; }
  .filters { gap: 6px; }
  .mobile-post-card { padding: 8px; }
  .post-thumbnail { width: 34px; height: 34px; flex-basis: 34px; }
  .mobile-post-main h4 { font-size: 9px; }
  .header-actions { gap: 6px; }
}
</style>
