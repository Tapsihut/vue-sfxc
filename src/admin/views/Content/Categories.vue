<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import api from '@/services/api'

interface Category {
  id: number
  name: string
  slug: string
  description: string
  posts: number
  active: boolean
}

interface ApiCategory {
  id: number
  name: string
  slug?: string
  description?: string | null
  posts_count?: number | string
  posts?: number | string
  is_active?: boolean | number | string
  active?: boolean | number | string
}

const categories = ref<Category[]>([])
const search = ref('')
const showModal = ref(false)
const editingId = ref<number | null>(null)

const loading = ref(false)
const saving = ref(false)
const actionId = ref<number | null>(null)
const deletingId = ref<number | null>(null)

const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  name: '',
  description: '',
  active: true,
})

const filteredCategories = computed(() => {
  const keyword = search.value.toLowerCase().trim()

  if (!keyword) return categories.value

  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(keyword) ||
    category.description.toLowerCase().includes(keyword) ||
    category.slug.toLowerCase().includes(keyword),
  )
})

const activeCount = computed(
  () => categories.value.filter((category) => category.active).length,
)

const totalPosts = computed(
  () => categories.value.reduce((total, category) => total + category.posts, 0),
)

function toBoolean(value: unknown, defaultValue = false): boolean {
  if (value === undefined || value === null) return defaultValue
  return value === true || value === 1 || value === '1' || value === 'true'
}

function mapCategory(item: ApiCategory): Category {
  return {
    id: Number(item.id),
    name: item.name ?? '',
    slug: item.slug ?? '',
    description: item.description ?? '',
    posts: Number(item.posts_count ?? item.posts ?? 0),
    active: toBoolean(item.is_active ?? item.active, true),
  }
}

function getErrorMessage(error: any, fallback: string): string {
  const data = error?.response?.data

  if (data?.errors) {
    const firstError = Object.values(data.errors).flat()[0]
    if (firstError) return String(firstError)
  }

  return data?.message || error?.message || fallback
}

function clearMessages() {
  errorMessage.value = ''
  successMessage.value = ''
}

async function loadCategories() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get('/api/v1/categories')

    const payload = response.data
    const list = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : []

    categories.value = list.map((item: ApiCategory) => mapCategory(item))
  } catch (error: any) {
    errorMessage.value = getErrorMessage(
      error,
      'Unable to load categories. Please check your connection and try again.',
    )
  } finally {
    loading.value = false
  }
}

function openCreate() {
  clearMessages()
  editingId.value = null

  form.value = {
    name: '',
    description: '',
    active: true,
  }

  showModal.value = true
}

function openEdit(category: Category) {
  clearMessages()
  editingId.value = category.id

  form.value = {
    name: category.name,
    description: category.description,
    active: category.active,
  }

  showModal.value = true
}

function closeModal() {
  if (saving.value) return
  showModal.value = false
  errorMessage.value = ''
}

async function saveCategory() {
  clearMessages()

  const name = form.value.name.trim()
  const description = form.value.description.trim()

  if (!name) {
    errorMessage.value = 'Please enter a category name.'
    return
  }

  saving.value = true

  const payload = {
    name,
    description: description || null,
    is_active: form.value.active,
  }

  try {
    if (editingId.value !== null) {
      await api.patch(`/api/v1/categories/${editingId.value}`, payload)
      successMessage.value = 'Category updated successfully.'
    } else {
      await api.post('/api/v1/categories', payload)
      successMessage.value = 'Category created successfully.'
    }

    showModal.value = false
    await loadCategories()

    if (errorMessage.value) {
      successMessage.value = ''
    }
  } catch (error: any) {
    errorMessage.value = getErrorMessage(
      error,
      'Unable to save the category. Please try again.',
    )
  } finally {
    saving.value = false
  }
}

async function toggleStatus(category: Category) {
  clearMessages()
  actionId.value = category.id

  try {
    await api.patch(`/api/v1/categories/${category.id}`, {
      is_active: !category.active,
    })

    successMessage.value = `"${category.name}" is now ${
      category.active ? 'inactive' : 'active'
    }.`

    await loadCategories()
  } catch (error: any) {
    errorMessage.value = getErrorMessage(
      error,
      'Unable to update the category status.',
    )
  } finally {
    actionId.value = null
  }
}

async function deleteCategory(category: Category) {
  const confirmed = window.confirm(
    `Delete "${category.name}"?\n\nThis action cannot be undone.`,
  )

  if (!confirmed) return

  clearMessages()
  deletingId.value = category.id

  try {
    await api.delete(`/api/v1/categories/${category.id}`)

    categories.value = categories.value.filter(
      (item) => item.id !== category.id,
    )

    successMessage.value = `"${category.name}" was deleted successfully.`
  } catch (error: any) {
    errorMessage.value = getErrorMessage(
      error,
      'Unable to delete this category. It may still have posts assigned to it.',
    )
  } finally {
    deletingId.value = null
  }
}

onMounted(loadCategories)
</script>

<template>
  <div class="categories-page">
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <span>Content</span>
          <i class="bi bi-chevron-right"></i>
          <strong>Categories</strong>
        </div>

        <h1>Categories</h1>
        <p>Manage the categories used for website posts.</p>
      </div>

      <button class="primary-button" type="button" @click="openCreate">
        <i class="bi bi-plus-lg"></i>
        <span>New Category</span>
      </button>
    </div>

    <div v-if="errorMessage && !showModal" class="notice error-notice" role="alert">
      <i class="bi bi-exclamation-circle"></i>
      <span>{{ errorMessage }}</span>
      <button type="button" aria-label="Dismiss error" @click="errorMessage = ''">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div v-if="successMessage && !showModal" class="notice success-notice" role="status">
      <i class="bi bi-check-circle"></i>
      <span>{{ successMessage }}</span>
      <button type="button" aria-label="Dismiss message" @click="successMessage = ''">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon">
          <i class="bi bi-tags"></i>
        </div>
        <div>
          <span>Total Categories</span>
          <strong>{{ categories.length }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon active">
          <i class="bi bi-check-circle"></i>
        </div>
        <div>
          <span>Active</span>
          <strong>{{ activeCount }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon posts">
          <i class="bi bi-file-earmark-text"></i>
        </div>
        <div>
          <span>Posts Assigned</span>
          <strong>{{ totalPosts }}</strong>
        </div>
      </div>
    </div>

    <div class="content-card">
      <div class="toolbar">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input
            v-model="search"
            type="text"
            placeholder="Search categories..."
            aria-label="Search categories"
          />
          <button
            v-if="search"
            type="button"
            class="clear-search"
            aria-label="Clear search"
            @click="search = ''"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>

        <div class="toolbar-right">
          <span class="result-count">
            {{ filteredCategories.length }} categories
          </span>
          <button
            class="refresh-button"
            type="button"
            :disabled="loading"
            title="Refresh categories"
            @click="loadCategories"
          >
            <i class="bi bi-arrow-clockwise" :class="{ spinning: loading }"></i>
          </button>
        </div>
      </div>

      <div v-if="loading && categories.length === 0" class="page-state">
        <span class="loader"></span>
        <strong>Loading categories...</strong>
        <span>Please wait while we retrieve your categories.</span>
      </div>

      <div v-else-if="!loading && errorMessage && categories.length === 0" class="page-state">
        <i class="bi bi-cloud-slash state-icon"></i>
        <strong>Categories could not be loaded</strong>
        <span>Check your connection and Laravel API, then try again.</span>
        <button class="retry-button" type="button" @click="loadCategories">
          <i class="bi bi-arrow-clockwise"></i>
          Try Again
        </button>
      </div>

      <template v-else>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Posts</th>
                <th>Status</th>
                <th class="action-column">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="category in filteredCategories" :key="category.id">
                <td>
                  <div class="category-name">
                    <span class="category-icon"><i class="bi bi-tag"></i></span>
                    <strong>{{ category.name }}</strong>
                  </div>
                </td>

                <td>
                  <span class="description">
                    {{ category.description || 'No description provided.' }}
                  </span>
                </td>

                <td><span class="post-count">{{ category.posts }}</span></td>

                <td>
                  <button
                    type="button"
                    class="status-badge"
                    :class="{ inactive: !category.active }"
                    :disabled="actionId === category.id"
                    @click="toggleStatus(category)"
                  >
                    <span></span>
                    {{ actionId === category.id ? 'Saving...' : category.active ? 'Active' : 'Inactive' }}
                  </button>
                </td>

                <td>
                  <div class="actions">
                    <button
                      type="button"
                      title="Edit category"
                      aria-label="Edit category"
                      @click="openEdit(category)"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>

                    <button
                      type="button"
                      class="delete"
                      title="Delete category"
                      aria-label="Delete category"
                      :disabled="deletingId === category.id"
                      @click="deleteCategory(category)"
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredCategories.length === 0">
                <td colspan="5">
                  <div class="empty-state">
                    <i class="bi bi-search"></i>
                    <strong>No categories found</strong>
                    <span>
                      {{ search ? 'Try changing your search.' : 'Create your first category to get started.' }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mobile-list">
          <div
            v-for="category in filteredCategories"
            :key="category.id"
            class="mobile-card"
          >
            <div class="mobile-card-top">
              <div class="category-name">
                <span class="category-icon"><i class="bi bi-tag"></i></span>
                <div>
                  <strong>{{ category.name }}</strong>
                  <small>{{ category.posts }} posts</small>
                </div>
              </div>

              <button
                type="button"
                class="status-badge"
                :class="{ inactive: !category.active }"
                :disabled="actionId === category.id"
                @click="toggleStatus(category)"
              >
                <span></span>
                {{ actionId === category.id ? 'Saving...' : category.active ? 'Active' : 'Inactive' }}
              </button>
            </div>

            <p>{{ category.description || 'No description provided.' }}</p>

            <div class="mobile-actions">
              <button type="button" @click="openEdit(category)">
                <i class="bi bi-pencil"></i>
                Edit
              </button>

              <button
                type="button"
                class="delete"
                :disabled="deletingId === category.id"
                @click="deleteCategory(category)"
              >
                <i class="bi bi-trash3"></i>
                {{ deletingId === category.id ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>

          <div v-if="filteredCategories.length === 0" class="empty-state mobile-empty">
            <i class="bi bi-search"></i>
            <strong>No categories found</strong>
            <span>
              {{ search ? 'Try changing your search.' : 'Create your first category to get started.' }}
            </span>
          </div>
        </div>
      </template>
    </div>

    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="category-modal-title">
        <div class="modal-header">
          <div>
            <span class="modal-label">
              {{ editingId !== null ? 'EDIT CATEGORY' : 'NEW CATEGORY' }}
            </span>
            <h2 id="category-modal-title">
              {{ editingId !== null ? 'Edit Category' : 'Create Category' }}
            </h2>
          </div>

          <button type="button" aria-label="Close modal" :disabled="saving" @click="closeModal">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <form @submit.prevent="saveCategory">
          <div v-if="errorMessage" class="notice error-notice modal-notice" role="alert">
            <i class="bi bi-exclamation-circle"></i>
            <span>{{ errorMessage }}</span>
          </div>

          <div class="form-group">
            <label for="category-name">Category Name</label>
            <input
              id="category-name"
              v-model="form.name"
              type="text"
              maxlength="255"
              placeholder="e.g. News"
              required
              autofocus
            />
          </div>

          <div class="form-group">
            <label for="category-description">Description</label>
            <textarea
              id="category-description"
              v-model="form.description"
              rows="3"
              placeholder="Brief description of this category..."
            ></textarea>
          </div>

          <label class="switch-row">
            <span>
              <strong>Active Category</strong>
              <small>Allow this category to be used for posts.</small>
            </span>

            <input v-model="form.active" type="checkbox" />
            <span class="switch"></span>
          </label>

          <div class="modal-actions">
            <button
              type="button"
              class="cancel-button"
              :disabled="saving"
              @click="closeModal"
            >
              Cancel
            </button>

            <button type="submit" class="save-button" :disabled="saving">
              <i :class="saving ? 'bi bi-arrow-repeat spinning' : 'bi bi-check-lg'"></i>
              {{
                saving
                  ? 'Saving...'
                  : editingId !== null
                    ? 'Save Changes'
                    : 'Create Category'
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories-page {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 18px 20px 30px;
  color: #17251b;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 5px;
  color: #849088;
  font-size: 11px;
}

.breadcrumb i { font-size: 9px; }
.breadcrumb strong { color: #55705c; font-weight: 600; }

.page-header h1 {
  margin: 0;
  color: #163c20;
  font-size: 24px;
  font-weight: 750;
  line-height: 1.15;
}

.page-header p {
  margin: 4px 0 0;
  color: #7b877f;
  font-size: 12px;
}

.primary-button,
.save-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 34px;
  padding: 0 13px;
  border: 0;
  border-radius: 7px;
  background: #104717;
  color: #fff;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
  transition: 0.2s ease;
}

.primary-button:hover,
.save-button:hover {
  background: #0b3712;
  transform: translateY(-1px);
}

button:disabled {
  cursor: not-allowed !important;
  opacity: 0.6;
  transform: none !important;
}

.notice {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
  padding: 10px 12px;
  border: 1px solid;
  border-radius: 7px;
  font-size: 11px;
  line-height: 1.5;
}

.notice > span { flex: 1; }

.notice > button {
  display: grid;
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  place-items: center;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.error-notice {
  border-color: #f0cece;
  background: #fff5f5;
  color: #a83232;
}

.success-notice {
  border-color: #cce8d3;
  background: #f0faf3;
  color: #246d3a;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 70px;
  padding: 11px 13px;
  border: 1px solid #e5ebe6;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 3%);
}

.summary-icon {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  place-items: center;
  border-radius: 8px;
  background: #eaf3eb;
  color: #104717;
  font-size: 16px;
}

.summary-icon.active { background: #e8f6ed; color: #218044; }
.summary-icon.posts { background: #f4f0df; color: #8a6d19; }

.summary-card span {
  display: block;
  color: #89938d;
  font-size: 10px;
}

.summary-card strong {
  display: block;
  margin-top: 1px;
  color: #193820;
  font-size: 19px;
  line-height: 1.1;
}

.content-card {
  overflow: hidden;
  border: 1px solid #e5ebe6;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 3%);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid #edf1ee;
}

.search-box {
  position: relative;
  width: min(330px, 100%);
}

.search-box > i {
  position: absolute;
  top: 50%;
  left: 10px;
  color: #87928b;
  font-size: 12px;
  transform: translateY(-50%);
}

.search-box input {
  width: 100%;
  height: 31px;
  padding: 0 30px;
  border: 1px solid #dfe6e1;
  border-radius: 6px;
  outline: 0;
  color: #26372b;
  font-size: 11px;
}

.search-box input:focus {
  border-color: #104717;
  box-shadow: 0 0 0 2px rgb(16 71 23 / 7%);
}

.clear-search {
  position: absolute;
  top: 50%;
  right: 6px;
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #7c8780;
  cursor: pointer;
  transform: translateY(-50%);
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-count { color: #8a948d; font-size: 10px; }

.refresh-button {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid #e2e9e3;
  border-radius: 5px;
  background: #fff;
  color: #526b58;
  cursor: pointer;
}

.refresh-button:hover { background: #f1f7f2; }

.table-wrapper { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }

th {
  height: 34px;
  padding: 0 12px;
  border-bottom: 1px solid #edf1ee;
  background: #fafcfb;
  color: #77827b;
  font-size: 9px;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

td {
  height: 52px;
  padding: 7px 12px;
  border-bottom: 1px solid #f0f3f1;
  color: #465249;
  font-size: 11px;
}

tbody tr:last-child td { border-bottom: 0; }

.category-name { display: flex; align-items: center; gap: 8px; }

.category-icon {
  display: grid;
  width: 29px;
  height: 29px;
  flex: 0 0 29px;
  place-items: center;
  border-radius: 6px;
  background: #edf5ee;
  color: #104717;
  font-size: 12px;
}

.category-name strong {
  color: #29432f;
  font-size: 11px;
  font-weight: 650;
}

.description { color: #7b867f; }

.post-count {
  display: inline-flex;
  min-width: 25px;
  justify-content: center;
  padding: 3px 7px;
  border-radius: 5px;
  background: #f2f5f3;
  color: #516058;
  font-size: 10px;
  font-weight: 650;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 7px;
  border: 0;
  border-radius: 20px;
  background: #eaf7ee;
  color: #287744;
  font-size: 9px;
  font-weight: 650;
  cursor: pointer;
}

.status-badge span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.status-badge.inactive { background: #f1f3f2; color: #7d8781; }

.action-column { width: 100px; text-align: right; }
.actions { display: flex; justify-content: flex-end; gap: 4px; }

.actions button {
  display: grid;
  width: 27px;
  height: 27px;
  place-items: center;
  border: 1px solid #e5eae6;
  border-radius: 5px;
  background: #fff;
  color: #607067;
  font-size: 11px;
  cursor: pointer;
}

.actions button:hover {
  border-color: #b9cabb;
  background: #f6faf7;
  color: #104717;
}

.actions button.delete:hover {
  border-color: #f0caca;
  background: #fff6f6;
  color: #c53d3d;
}

.empty-state,
.page-state {
  display: flex;
  min-height: 180px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #8b968f;
  text-align: center;
}

.empty-state i,
.state-icon { margin-bottom: 3px; font-size: 23px; }

.empty-state strong,
.page-state strong { color: #506058; font-size: 12px; }

.empty-state span,
.page-state > span:not(.loader) {
  max-width: 320px;
  font-size: 10px;
  line-height: 1.5;
}

.loader {
  width: 23px;
  height: 23px;
  border: 2px solid #dce8de;
  border-top-color: #104717;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.retry-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
  padding: 7px 10px;
  border: 1px solid #dce6dd;
  border-radius: 6px;
  background: #fff;
  color: #104717;
  font-size: 10px;
  cursor: pointer;
}

.mobile-list { display: none; }

.modal-backdrop {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
  padding: 15px;
  background: rgb(10 28 15 / 48%);
}

.modal {
  width: min(430px, 100%);
  max-height: calc(100dvh - 30px);
  overflow-y: auto;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 18px 50px rgb(0 0 0 / 18%);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px 16px 11px;
  border-bottom: 1px solid #edf1ee;
}

.modal-label {
  color: #799080;
  font-size: 8px;
  font-weight: 750;
  letter-spacing: 0.08em;
}

.modal h2 { margin: 2px 0 0; color: #183a20; font-size: 17px; }

.modal-header button {
  display: grid;
  width: 27px;
  height: 27px;
  place-items: center;
  border: 0;
  border-radius: 5px;
  background: #f3f6f4;
  color: #68746c;
  cursor: pointer;
}

.modal form { padding: 14px 16px 16px; }
.modal-notice { margin-bottom: 12px; }

.form-group { margin-bottom: 11px; }

.form-group label {
  display: block;
  margin-bottom: 4px;
  color: #405148;
  font-size: 10px;
  font-weight: 650;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 9px;
  border: 1px solid #dfe6e1;
  border-radius: 6px;
  outline: 0;
  background: #fff;
  color: #29392f;
  font-family: inherit;
  font-size: 11px;
}

.form-group input { height: 33px; }
.form-group textarea { resize: vertical; }

.form-group input:focus,
.form-group textarea:focus {
  border-color: #104717;
  box-shadow: 0 0 0 2px rgb(16 71 23 / 6%);
}

.switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  cursor: pointer;
}

.switch-row > span:first-child { display: flex; flex-direction: column; gap: 2px; }
.switch-row strong { color: #35483c; font-size: 10px; }
.switch-row small { color: #89938d; font-size: 9px; }
.switch-row input { position: absolute; width: 1px; height: 1px; opacity: 0; }

.switch {
  position: relative;
  width: 32px;
  height: 18px;
  flex: 0 0 32px;
  border-radius: 20px;
  background: #ccd5ce;
  transition: 0.2s ease;
}

.switch::after {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  content: '';
  transition: 0.2s ease;
}

.switch-row input:checked + .switch { background: #104717; }
.switch-row input:checked + .switch::after { left: 17px; }
.switch-row input:focus-visible + .switch { outline: 2px solid #104717; outline-offset: 3px; }

.modal-actions { display: flex; justify-content: flex-end; gap: 7px; margin-top: 12px; }

.cancel-button {
  min-height: 33px;
  padding: 0 12px;
  border: 1px solid #dfe6e1;
  border-radius: 6px;
  background: #fff;
  color: #637068;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
}

.save-button { min-height: 33px; }

.spinning { animation: spin 0.8s linear infinite; }

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 800px) {
  .categories-page { padding: 14px 14px 25px; }
  .summary-grid { grid-template-columns: 1fr; }
  .table-wrapper { display: none; }

  .mobile-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 9px;
  }

  .mobile-card { padding: 10px; border: 1px solid #e7ece8; border-radius: 7px; }

  .mobile-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .mobile-card p {
    margin: 7px 0;
    color: #7d8981;
    font-size: 10px;
    line-height: 1.45;
  }

  .category-name small {
    display: block;
    margin-top: 2px;
    color: #8a948d;
    font-size: 9px;
  }

  .mobile-actions { display: flex; gap: 5px; }

  .mobile-actions button {
    min-height: 27px;
    padding: 0 9px;
    border: 1px solid #e1e7e2;
    border-radius: 5px;
    background: #fff;
    color: #56655c;
    font-size: 9px;
    cursor: pointer;
  }

  .mobile-actions button.delete { color: #bd4545; }
  .mobile-empty { min-height: 150px; }
}

@media (max-width: 520px) {
  .page-header { align-items: flex-start; flex-direction: column; }
  .primary-button { width: 100%; }
  .toolbar { align-items: stretch; flex-direction: column; }
  .search-box { width: 100%; }
  .toolbar-right { justify-content: space-between; }
}
</style>
