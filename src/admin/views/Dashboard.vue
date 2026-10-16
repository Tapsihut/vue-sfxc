
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/services/api'

interface Category {
  id?: number
  name?: string
  slug?: string
}

interface ApiPost {
  id: number
  title: string
  slug?: string
  category_id?: number
  category?: Category | string | null
  excerpt?: string | null
  status: 'published' | 'draft' | string
  is_featured?: boolean | number
  published_at?: string | null
  created_at?: string | null
}

interface PaginatedPosts {
  data: ApiPost[]
  current_page?: number
  last_page?: number
  total?: number
}

interface RecentPost {
  id: number
  title: string
  category: string
  date: string
  status: 'Published' | 'Draft'
}

const posts = ref<ApiPost[]>([])
const categoryCount = ref<number | null>(null)
const loading = ref(true)
const errorMessage = ref('')

const totalPosts = computed(() => posts.value.length)

const publishedCount = computed(
  () => posts.value.filter(post => post.status === 'published').length,
)

const draftCount = computed(
  () => posts.value.filter(post => post.status === 'draft').length,
)

const featuredCount = computed(
  () => posts.value.filter(post => Boolean(post.is_featured)).length,
)

const recentPosts = computed<RecentPost[]>(() => {
  return [...posts.value]
    .sort((a, b) => {
      const dateA = new Date(a.created_at || a.published_at || 0).getTime()
      const dateB = new Date(b.created_at || b.published_at || 0).getTime()
      return dateB - dateA
    })
    .slice(0, 5)
    .map(post => {
      const category =
        typeof post.category === 'string'
          ? post.category
          : post.category?.name || 'Uncategorized'

      const rawDate = post.published_at || post.created_at
      const parsedDate = rawDate ? new Date(rawDate) : null

      const date =
        parsedDate && !Number.isNaN(parsedDate.getTime())
          ? parsedDate.toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })
          : 'No date'

      return {
        id: post.id,
        title: post.title,
        category,
        date,
        status: post.status === 'published' ? 'Published' : 'Draft',
      }
    })
})

const stats = computed(() => [
  {
    label: 'Total Posts',
    value: totalPosts.value,
    icon: 'bi bi-file-earmark-text',
    description: 'All website posts',
  },
  {
    label: 'Published',
    value: publishedCount.value,
    icon: 'bi bi-check-circle',
    description: 'Published on website',
  },
  {
    label: 'Drafts',
    value: draftCount.value,
    icon: 'bi bi-file-earmark',
    description: 'Not yet published',
  },
  {
    label: 'Featured',
    value: featuredCount.value,
    icon: 'bi bi-star',
    description: 'Featured content',
  },
])

const quickActions = [
  {
    title: 'Create Post',
    description: 'Add a new website post',
    icon: 'bi bi-plus-circle',
    route: '/admin/posts/create',
  },
  {
    title: 'Manage Categories',
    description: 'Manage post categories',
    icon: 'bi bi-tags',
    route: '/admin/categories',
  },
  {
    title: 'Manage Sections',
    description: 'Control website sections',
    icon: 'bi bi-layout-text-window',
    route: '/admin/sections',
  },
]

const contentOverview = [
  {
    title: 'Posts',
    description: 'News, announcements, events and stories',
    icon: 'bi bi-file-earmark-richtext',
    route: '/admin/posts',
  },
  {
    title: 'Categories',
    description: 'Define what each post is about',
    icon: 'bi bi-tags',
    route: '/admin/categories',
  },
  {
    title: 'Sections',
    description: 'Control where posts appear',
    icon: 'bi bi-grid',
    route: '/admin/sections',
  },
  {
    title: 'Media Library',
    description: 'Manage website images and media',
    icon: 'bi bi-images',
    route: '/admin/media',
  },
]

function extractPosts(responseData: unknown): {
  records: ApiPost[]
  lastPage: number
} {
  if (Array.isArray(responseData)) {
    return {
      records: responseData as ApiPost[],
      lastPage: 1,
    }
  }

  if (responseData && typeof responseData === 'object') {
    const payload = responseData as PaginatedPosts

    if (Array.isArray(payload.data)) {
      return {
        records: payload.data,
        lastPage: Math.max(1, Number(payload.last_page) || 1),
      }
    }
  }

  return {
    records: [],
    lastPage: 1,
  }
}


async function loadDashboard() {
  loading.value = true
  errorMessage.value = ''

  try {
    const firstResponse = await api.get('/api/v1/posts', {
      params: { per_page: 50, page: 1 },
    })

    const firstPage = extractPosts(firstResponse.data)
    const allPosts = [...firstPage.records]

    for (let page = 2; page <= firstPage.lastPage; page++) {
      const response = await api.get('/api/v1/posts', {
        params: { per_page: 50, page },
      })

      const result = extractPosts(response.data)
      allPosts.push(...result.records)
    }

    posts.value = allPosts

    try {
      const response = await api.get('/api/v1/categories')
      const data = response.data

      if (Array.isArray(data)) {
        categoryCount.value = data.length
      } else if (Array.isArray(data?.data)) {
        categoryCount.value = data.data.length
      } else {
        categoryCount.value = null
      }
    } catch (error) {
      console.error('Failed to load categories:', error)
      categoryCount.value = null
    }
  } catch (error: unknown) {
    console.error('Failed to load dashboard:', error)

    errorMessage.value =
      'Unable to load dashboard data. Please check your connection and try again.'
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<template>
  <div class="dashboard-page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p>Manage and monitor your SFXC public website.</p>
      </div>

      <RouterLink to="/admin/posts/create" class="primary-button">
        <i class="bi bi-plus-lg"></i>
        <span>New Post</span>
      </RouterLink>
    </div>

    <!-- Loading and Error States -->
    <div v-if="errorMessage" class="error-banner" role="alert">
      <i class="bi bi-exclamation-circle"></i>
      <span>{{ errorMessage }}</span>

      <button type="button" @click="loadDashboard">
        Retry
      </button>
    </div>

    <!-- Statistics -->
    <section class="stats-grid">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-card"
      >
        <div class="stat-icon">
          <i :class="stat.icon"></i>
        </div>

        <div class="stat-content">
          <span class="stat-label">{{ stat.label }}</span>

          <strong v-if="!loading" class="stat-value">
            {{ stat.value }}
          </strong>

          <span v-else class="stat-skeleton" aria-label="Loading"></span>

          <span class="stat-description">{{ stat.description }}</span>
        </div>
      </div>
    </section>

    <!-- Main Grid -->
    <div class="dashboard-grid">
      <!-- Recent Posts -->
      <section class="dashboard-card recent-card">
        <div class="card-header">
          <div>
            <h2>Recent Posts</h2>
            <p>Latest content added to the website.</p>
          </div>

          <RouterLink to="/admin/posts" class="view-link">
            View All
            <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>

        <div v-if="loading" class="loading-state">
          <i class="bi bi-arrow-repeat spin"></i>
          Loading posts...
        </div>

        <div v-else-if="!errorMessage && recentPosts.length === 0" class="empty-state">
          <i class="bi bi-file-earmark-text"></i>
          <strong>No posts yet</strong>
          <span>Create your first website post to get started.</span>

          <RouterLink to="/admin/posts/create" class="empty-action">
            <i class="bi bi-plus-lg"></i>
            Create Post
          </RouterLink>
        </div>

        <div v-else-if="!errorMessage" class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Post</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="post in recentPosts"
                :key="post.id"
              >
                <td>
                  <div class="post-title">
                    <span class="post-icon">
                      <i class="bi bi-file-text"></i>
                    </span>

                    <span>{{ post.title }}</span>
                  </div>
                </td>

                <td>
                  <span class="category-badge">
                    {{ post.category }}
                  </span>
                </td>

                <td class="date-cell">
                  {{ post.date }}
                </td>

                <td>
                  <span
                    class="status-badge"
                    :class="{
                      published: post.status === 'Published',
                      draft: post.status === 'Draft',
                    }"
                  >
                    <span class="status-dot"></span>
                    {{ post.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="dashboard-card actions-card">
        <div class="card-header">
          <div>
            <h2>Quick Actions</h2>
            <p>Common website management tasks.</p>
          </div>
        </div>

        <div class="actions-list">
          <RouterLink
            v-for="action in quickActions"
            :key="action.title"
            :to="action.route"
            class="action-item"
          >
            <div class="action-icon">
              <i :class="action.icon"></i>
            </div>

            <div class="action-content">
              <strong>{{ action.title }}</strong>
              <span>{{ action.description }}</span>
            </div>

            <i class="bi bi-chevron-right action-arrow"></i>
          </RouterLink>
        </div>
      </section>
    </div>

    <!-- Website Overview -->
    <section class="dashboard-card overview-card">
      <div class="card-header">
        <div>
          <h2>Website Content</h2>
          <p>Overview of the sections currently managed by the administrator.</p>
        </div>
      </div>

      <div class="overview-grid">
        <RouterLink
          v-for="item in contentOverview"
          :key="item.title"
          :to="item.route"
          class="overview-item"
        >
          <div class="overview-icon">
            <i :class="item.icon"></i>
          </div>

          <div class="overview-copy">
            <strong>{{ item.title }}</strong>
            <span>{{ item.description }}</span>
          </div>

          <i class="bi bi-arrow-up-right"></i>
        </RouterLink>
      </div>
    </section>

    <!-- Category Summary -->
    <section class="category-summary">
      <div class="category-summary-icon">
        <i class="bi bi-tags"></i>
      </div>

      <div class="category-summary-copy">
        <strong>Post Categories</strong>
        <span>Organize your website news and announcements.</span>
      </div>

      <strong v-if="categoryCount !== null && !loading" class="category-summary-count">
        {{ categoryCount }}
      </strong>
      <span v-else-if="loading" class="small-loading"></span>
      <span v-else class="category-count-unavailable">Unavailable</span>

      <RouterLink to="/admin/categories" class="category-manage-link">
        Manage
        <i class="bi bi-arrow-right"></i>
      </RouterLink>
    </section>

    <div class="dashboard-footer">
      <span>
        <i class="bi bi-shield-check"></i>
        SFXC Website Administration
      </span>

      <button type="button" :disabled="loading" @click="loadDashboard">
        <i class="bi bi-arrow-clockwise"></i>
        Refresh Data
      </button>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 18px 20px 25px;
  color: #17251d;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.page-header h1 {
  margin: 0;
  color: #104717;
  font-size: 24px;
  font-weight: 750;
  line-height: 1.2;
}

.page-header p {
  margin: 4px 0 0;
  color: #718078;
  font-size: 12px;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 35px;
  padding: 0 13px;
  border: 1px solid #104717;
  border-radius: 7px;
  background: #104717;
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 650;
  transition: background 0.2s ease;
}

.primary-button:hover {
  background: #0b3712;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 12px;
  padding: 10px 12px;
  border: 1px solid #f0d0d0;
  border-radius: 7px;
  background: #fff7f7;
  color: #a73737;
  font-size: 11px;
}

.error-banner span {
  flex: 1;
}

.error-banner button {
  padding: 5px 9px;
  border: 1px solid #e8bcbc;
  border-radius: 5px;
  background: #fff;
  color: #a73737;
  font-size: 10px;
  font-weight: 650;
  cursor: pointer;
}

/* Statistics */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
  padding: 12px;
  border: 1px solid #e2ebe5;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 2px 7px rgb(20 55 35 / 3%);
}

.stat-icon {
  display: flex;
  width: 37px;
  height: 37px;
  flex: 0 0 37px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eaf4ec;
  color: #104717;
  font-size: 16px;
}

.stat-content {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.stat-label {
  color: #75827a;
  font-size: 10px;
  font-weight: 650;
}

.stat-value {
  margin-top: 2px;
  color: #104717;
  font-size: 21px;
  line-height: 1.15;
}

.stat-description {
  margin-top: 3px;
  color: #8b958f;
  font-size: 9px;
}

.stat-skeleton,
.small-loading {
  display: inline-block;
  width: 35px;
  height: 18px;
  margin-top: 4px;
  border-radius: 4px;
  background: #edf1ee;
  animation: pulse 1.2s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { opacity: 0.55; }
  to { opacity: 1; }
}

/* Main cards */

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(255px, 0.8fr);
  gap: 12px;
  margin-bottom: 12px;
}

.dashboard-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e2ebe5;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 2px 7px rgb(20 55 35 / 3%);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid #edf2ee;
}

.card-header h2 {
  margin: 0;
  color: #24402b;
  font-size: 13px;
  font-weight: 750;
}

.card-header p {
  margin: 3px 0 0;
  color: #7b8780;
  font-size: 10px;
  line-height: 1.4;
}

.view-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #104717;
  text-decoration: none;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 700;
}

.view-link:hover {
  color: #0b3712;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 530px;
  border-collapse: collapse;
}

th {
  padding: 9px 12px;
  background: #fafcfb;
  color: #76827b;
  text-align: left;
  font-size: 9px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

td {
  padding: 10px 12px;
  border-top: 1px solid #edf2ee;
  color: #526058;
  font-size: 10px;
  vertical-align: middle;
}

.post-title {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #29372f;
  font-weight: 650;
}

.post-title > span:last-child {
  min-width: 0;
  overflow-wrap: anywhere;
}

.post-icon {
  display: flex;
  width: 27px;
  height: 27px;
  flex: 0 0 27px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #f0f7f2;
  color: #104717;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  min-height: 21px;
  padding: 0 7px;
  border-radius: 5px;
  background: #f1f6f3;
  color: #466052;
  font-size: 9px;
  font-weight: 650;
}

.date-cell {
  white-space: nowrap;
  color: #7a857e;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 21px;
  padding: 0 7px;
  border-radius: 5px;
  font-size: 9px;
  font-weight: 650;
  white-space: nowrap;
}

.status-badge.published {
  background: #eaf7ef;
  color: #14713f;
}

.status-badge.draft {
  background: #f5f3e9;
  color: #837225;
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.loading-state,
.empty-state {
  display: flex;
  min-height: 160px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 20px;
  color: #859189;
  text-align: center;
  font-size: 10px;
}

.loading-state i {
  font-size: 20px;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state > i {
  color: #8b9c8f;
  font-size: 24px;
}

.empty-state strong {
  color: #405348;
  font-size: 12px;
}

.empty-state span {
  font-size: 10px;
}

.empty-action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  padding: 7px 10px;
  border-radius: 5px;
  background: #104717;
  color: #fff;
  text-decoration: none;
  font-size: 10px;
  font-weight: 650;
}

/* Quick Actions */

.actions-list {
  padding: 5px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 8px;
  border-radius: 7px;
  color: inherit;
  text-decoration: none;
  transition: background 0.2s ease;
}

.action-item:hover {
  background: #f4f8f5;
}

.action-icon {
  display: flex;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #eaf4ec;
  color: #104717;
  font-size: 14px;
}

.action-content {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 2px;
}

.action-content strong {
  color: #29372f;
  font-size: 11px;
  font-weight: 700;
}

.action-content span {
  color: #87918b;
  font-size: 9px;
}

.action-arrow {
  color: #9aa59e;
  font-size: 10px;
}

/* Website Overview */

.overview-card {
  margin-bottom: 12px;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  background: #edf2ee;
}

.overview-item {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 12px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  transition: background 0.2s ease;
}

.overview-item:hover {
  background: #f7faf8;
}

.overview-icon {
  display: flex;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #eaf4ec;
  color: #104717;
  font-size: 14px;
}

.overview-copy {
  min-width: 0;
  flex: 1;
}

.overview-copy strong {
  display: block;
  color: #29372f;
  font-size: 10px;
  font-weight: 750;
}

.overview-copy span {
  display: block;
  margin-top: 3px;
  color: #89938d;
  font-size: 9px;
  line-height: 1.4;
}

.overview-item > i:last-child {
  flex: 0 0 auto;
  color: #9ba59f;
  font-size: 10px;
}

/* Category summary and footer */

.category-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 13px;
  border: 1px solid #e2ebe5;
  border-radius: 8px;
  background: #fff;
}

.category-summary-icon {
  display: flex;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #f4f0df;
  color: #8a6d19;
  font-size: 15px;
}

.category-summary-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 3px;
}

.category-summary-copy strong {
  color: #33463a;
  font-size: 11px;
}

.category-summary-copy span {
  color: #87918b;
  font-size: 9px;
}

.category-summary-count {
  color: #104717;
  font-size: 19px;
}

.category-count-unavailable {
  color: #8b958f;
  font-size: 9px;
}

.category-manage-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #104717;
  text-decoration: none;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

.dashboard-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 13px 2px 0;
  color: #89938d;
  font-size: 9px;
}

.dashboard-footer > span,
.dashboard-footer button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.dashboard-footer button {
  padding: 4px 0;
  border: 0;
  background: transparent;
  color: #54715b;
  font: inherit;
  cursor: pointer;
}

.dashboard-footer button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Tablet */

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .overview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Mobile */

@media (max-width: 700px) {
  .dashboard-page {
    padding: 14px 12px 22px;
  }

  .page-header {
    margin-bottom: 12px;
  }

  .page-header h1 {
    font-size: 21px;
  }

  .page-header p {
    font-size: 11px;
  }

  .primary-button {
    min-height: 33px;
    padding: 0 10px;
    font-size: 11px;
  }

  .stats-grid {
    gap: 8px;
    margin-bottom: 10px;
  }

  .stat-card {
    gap: 8px;
    padding: 10px;
  }

  .stat-icon {
    width: 32px;
    height: 32px;
    flex-basis: 32px;
    font-size: 14px;
  }

  .stat-value {
    font-size: 19px;
  }

  .dashboard-grid {
    gap: 10px;
    margin-bottom: 10px;
  }

  .card-header {
    padding: 11px 12px;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .overview-item {
    padding: 10px 12px;
  }

  .category-summary {
    flex-wrap: wrap;
  }
}

/* Small Mobile */

@media (max-width: 480px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 9px;
  }

  .primary-button {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .stat-card {
    align-items: flex-start;
    flex-direction: column;
    gap: 7px;
  }

  .stat-content {
    width: 100%;
  }

  .stat-description {
    font-size: 8px;
  }

  .error-banner {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .error-banner span {
    flex-basis: calc(100% - 30px);
  }

  .error-banner button {
    margin-left: 25px;
  }

  .category-summary-copy {
    flex-basis: calc(100% - 55px);
  }

  .dashboard-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 360px) {
  .dashboard-page {
    padding-right: 9px;
    padding-left: 9px;
  }

  .stats-grid {
    gap: 7px;
  }

  .stat-card {
    padding: 9px;
  }

  .stat-icon {
    width: 30px;
    height: 30px;
    flex-basis: 30px;
    font-size: 13px;
  }
}
</style>
