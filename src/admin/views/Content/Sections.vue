
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import api from '@/services/api'

interface ApiSection {
  id: number
  name: string
  slug: string
  description: string | null
  is_active: boolean
  posts_count?: number
  created_at?: string
  updated_at?: string
}

interface Section {
  id: number
  name: string
  slug: string
  description: string
  posts: number
  active: boolean
}

interface SectionForm {
  name: string
  slug: string
  description: string
  active: boolean
}

const API_URL = '/api/v1/sections'

const search = ref('')
const showModal = ref(false)
const editingId = ref<number | null>(null)

const sections = ref<Section[]>([])
const loading = ref(false)
const saving = ref(false)
const deletingId = ref<number | null>(null)
const togglingId = ref<number | null>(null)

const errorMessage = ref('')
const successMessage = ref('')
const validationErrors = ref<Record<string, string[]>>({})

const form = ref<SectionForm>({
  name: '',
  slug: '',
  description: '',
  active: true,
})

const filteredSections = computed(() => {
  const keyword = search.value.toLowerCase().trim()

  if (!keyword) {
    return sections.value
  }

  return sections.value.filter((section) => {
    return (
      section.name.toLowerCase().includes(keyword) ||
      section.slug.toLowerCase().includes(keyword) ||
      section.description.toLowerCase().includes(keyword)
    )
  })
})

const activeCount = computed(() =>
  sections.value.filter((section) => section.active).length,
)

const totalPosts = computed(() =>
  sections.value.reduce((total, section) => total + section.posts, 0),
)

function mapApiSection(item: ApiSection): Section {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description ?? '',
    posts: item.posts_count ?? 0,
    active: Boolean(item.is_active),
  }
}

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getErrorMessage(error: unknown): string {
  const response = (
    error as {
      response?: {
        data?: {
          message?: string
          errors?: Record<string, string[]>
        }
      }
    }
  )?.response

  if (response?.data?.errors) {
    validationErrors.value = response.data.errors

    const firstError = Object.values(response.data.errors)
      .flat()
      .find(Boolean)

    if (firstError) {
      return firstError
    }
  }

  if (response?.data?.message) {
    return response.data.message
  }

  if ((error as { request?: unknown })?.request) {
    return 'Cannot connect to the server. Check that Laravel is running and try again.'
  }

  return 'Something went wrong. Please try again.'
}

function clearMessages() {
  errorMessage.value = ''
  successMessage.value = ''
  validationErrors.value = {}
}

function getFieldError(field: string): string {
  return validationErrors.value[field]?.[0] ?? ''
}

async function loadSections() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get<{ data: ApiSection[] }>(API_URL)

    sections.value = response.data.data.map(mapApiSection)
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    loading.value = false
  }
}

function openCreate() {
  clearMessages()
  editingId.value = null

  form.value = {
    name: '',
    slug: '',
    description: '',
    active: true,
  }

  showModal.value = true
}

function openEdit(section: Section) {
  clearMessages()
  editingId.value = section.id

  form.value = {
    name: section.name,
    slug: section.slug,
    description: section.description,
    active: section.active,
  }

  showModal.value = true
}

function closeModal() {
  if (saving.value) return

  showModal.value = false
  validationErrors.value = {}
}

async function saveSection() {
  clearMessages()

  const name = form.value.name.trim()
  const slug = form.value.slug.trim() || createSlug(name)

  if (!name) {
    validationErrors.value = {
      name: ['Please enter a section name.'],
    }
    return
  }

  if (!slug) {
    validationErrors.value = {
      slug: ['Please enter a valid URL slug.'],
    }
    return
  }

  saving.value = true

  const payload = {
    name,
    slug,
    description: form.value.description.trim() || null,
    is_active: form.value.active,
  }

  try {
    if (editingId.value !== null) {
      const response = await api.put<{ data: ApiSection }>(
        `${API_URL}/${editingId.value}`,
        payload,
      )

      const updatedSection = mapApiSection(response.data.data)
      const index = sections.value.findIndex(
        (section) => section.id === editingId.value,
      )

      if (index !== -1) {
        sections.value[index] = updatedSection
      }

      successMessage.value = 'Section updated successfully.'
    } else {
      const response = await api.post<{ data: ApiSection }>(
        API_URL,
        payload,
      )

      sections.value.unshift(mapApiSection(response.data.data))
      successMessage.value = 'Section created successfully.'
    }

    showModal.value = false
    validationErrors.value = {}
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    saving.value = false
  }
}

async function deleteSection(section: Section) {
  clearMessages()

  if (section.posts > 0) {
    errorMessage.value =
      `"${section.name}" has ${section.posts} post placement(s). ` +
      'Remove its assigned posts before deleting this section.'
    return
  }

  const confirmed = window.confirm(
    `Delete "${section.name}"?\n\nThis action cannot be undone.`,
  )

  if (!confirmed) return

  deletingId.value = section.id

  try {
    await api.delete(`${API_URL}/${section.id}`)

    sections.value = sections.value.filter(
      (item) => item.id !== section.id,
    )

    successMessage.value = `"${section.name}" was deleted successfully.`
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    deletingId.value = null
  }
}

async function toggleStatus(section: Section) {
  clearMessages()
  togglingId.value = section.id

  try {
    const response = await api.put<{ data: ApiSection }>(
      `${API_URL}/${section.id}`,
      {
        name: section.name,
        slug: section.slug,
        description: section.description || null,
        is_active: !section.active,
      },
    )

    const updatedSection = mapApiSection(response.data.data)
    const index = sections.value.findIndex(
      (item) => item.id === section.id,
    )

    if (index !== -1) {
      sections.value[index] = updatedSection
    }

    successMessage.value = updatedSection.active
      ? `"${section.name}" is now active.`
      : `"${section.name}" is now inactive.`
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    togglingId.value = null
  }
}

onMounted(() => {
  void loadSections()
})
</script>

<template>
  <div class="sections-page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <span>Content</span>
          <i class="bi bi-chevron-right"></i>
          <strong>Sections</strong>
        </div>

        <h1>Sections</h1>
        <p>Control where posts can appear on the public website.</p>
      </div>

      <button
        type="button"
        class="primary-button"
        @click="openCreate"
      >
        <i class="bi bi-plus-lg"></i>
        <span>New Section</span>
      </button>
    </div>

    <!-- Feedback Messages -->
    <div
      v-if="errorMessage"
      class="feedback-message error-message"
      role="alert"
    >
      <i class="bi bi-exclamation-circle"></i>
      <span>{{ errorMessage }}</span>

      <button
        type="button"
        aria-label="Dismiss error"
        @click="errorMessage = ''"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div
      v-if="successMessage"
      class="feedback-message success-message"
      role="status"
    >
      <i class="bi bi-check-circle"></i>
      <span>{{ successMessage }}</span>

      <button
        type="button"
        aria-label="Dismiss message"
        @click="successMessage = ''"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <!-- Summary -->
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon">
          <i class="bi bi-layout-text-window"></i>
        </div>

        <div>
          <span>Total Sections</span>
          <strong>{{ loading ? '—' : sections.length }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon active">
          <i class="bi bi-check-circle"></i>
        </div>

        <div>
          <span>Active Sections</span>
          <strong>{{ loading ? '—' : activeCount }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon posts">
          <i class="bi bi-files"></i>
        </div>

        <div>
          <span>Post Placements</span>
          <strong>{{ loading ? '—' : totalPosts }}</strong>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-card">
      <div class="toolbar">
        <div class="search-box">
          <i class="bi bi-search"></i>

          <input
            v-model="search"
            type="text"
            placeholder="Search sections..."
            aria-label="Search sections"
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
            {{ filteredSections.length }}
            {{ filteredSections.length === 1 ? 'section' : 'sections' }}
          </span>

          <button
            type="button"
            class="refresh-button"
            title="Refresh sections"
            :disabled="loading"
            @click="loadSections"
          >
            <i
              class="bi bi-arrow-clockwise"
              :class="{ spinning: loading }"
            ></i>
          </button>
        </div>
      </div>

      <!-- Desktop Table -->
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Section</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Posts</th>
              <th>Status</th>
              <th class="action-column">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="6">
                <div class="empty-state">
                  <i class="bi bi-arrow-repeat spinning"></i>
                  <strong>Loading sections...</strong>
                  <span>Fetching section data from the server.</span>
                </div>
              </td>
            </tr>

            <tr
              v-for="section in filteredSections"
              v-else
              :key="section.id"
            >
              <td>
                <div class="section-name">
                  <span class="section-icon">
                    <i class="bi bi-layout-text-sidebar-reverse"></i>
                  </span>

                  <strong>{{ section.name }}</strong>
                </div>
              </td>

              <td>
                <code>/{{ section.slug }}</code>
              </td>

              <td>
                <span class="description">
                  {{ section.description || 'No description' }}
                </span>
              </td>

              <td>
                <span class="post-count">{{ section.posts }}</span>
              </td>

              <td>
                <button
                  type="button"
                  class="status-badge"
                  :class="{ inactive: !section.active }"
                  :disabled="togglingId === section.id"
                  :title="`Click to ${section.active ? 'deactivate' : 'activate'}`"
                  @click="toggleStatus(section)"
                >
                  <span></span>
                  {{
                    togglingId === section.id
                      ? 'Saving...'
                      : section.active
                        ? 'Active'
                        : 'Inactive'
                  }}
                </button>
              </td>

              <td>
                <div class="actions">
                  <button
                    type="button"
                    title="Edit"
                    aria-label="Edit section"
                    @click="openEdit(section)"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>

                  <button
                    type="button"
                    class="delete"
                    title="Delete"
                    aria-label="Delete section"
                    :disabled="deletingId === section.id"
                    @click="deleteSection(section)"
                  >
                    <i
                      class="bi"
                      :class="deletingId === section.id
                        ? 'bi-arrow-repeat spinning'
                        : 'bi-trash3'"
                    ></i>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredSections.length === 0">
              <td colspan="6">
                <div class="empty-state">
                  <i class="bi bi-inbox"></i>
                  <strong>
                    {{ search ? 'No sections found' : 'No sections yet' }}
                  </strong>
                  <span>
                    {{
                      search
                        ? 'Try changing your search.'
                        : 'Create your first website section to get started.'
                    }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="mobile-list">
        <div
          v-if="loading"
          class="empty-state mobile-empty"
        >
          <i class="bi bi-arrow-repeat spinning"></i>
          <strong>Loading sections...</strong>
          <span>Please wait.</span>
        </div>

        <template v-else>
          <div
            v-for="section in filteredSections"
            :key="section.id"
            class="mobile-card"
          >
            <div class="mobile-card-top">
              <div class="section-name">
                <span class="section-icon">
                  <i class="bi bi-layout-text-sidebar-reverse"></i>
                </span>

                <div>
                  <strong>{{ section.name }}</strong>
                  <small>/{{ section.slug }}</small>
                </div>
              </div>

              <button
                type="button"
                class="status-badge"
                :class="{ inactive: !section.active }"
                :disabled="togglingId === section.id"
                @click="toggleStatus(section)"
              >
                <span></span>
                {{
                  togglingId === section.id
                    ? 'Saving...'
                    : section.active
                      ? 'Active'
                      : 'Inactive'
                }}
              </button>
            </div>

            <p>{{ section.description || 'No description provided.' }}</p>

            <div class="mobile-meta">
              <span>
                <i class="bi bi-files"></i>
                {{ section.posts }} post placements
              </span>
            </div>

            <div class="mobile-actions">
              <button
                type="button"
                @click="openEdit(section)"
              >
                <i class="bi bi-pencil"></i>
                Edit
              </button>

              <button
                type="button"
                class="delete"
                :disabled="deletingId === section.id"
                @click="deleteSection(section)"
              >
                <i class="bi bi-trash3"></i>
                {{ deletingId === section.id ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>

          <div
            v-if="filteredSections.length === 0"
            class="empty-state mobile-empty"
          >
            <i class="bi bi-inbox"></i>
            <strong>
              {{ search ? 'No sections found' : 'No sections yet' }}
            </strong>
            <span>
              {{
                search
                  ? 'Try changing your search.'
                  : 'Create your first website section to get started.'
              }}
            </span>
          </div>
        </template>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="modal-backdrop"
      @click.self="closeModal"
    >
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'section-modal-title'"
      >
        <div class="modal-header">
          <div>
            <span class="modal-label">
              {{ editingId !== null ? 'EDIT SECTION' : 'NEW SECTION' }}
            </span>

            <h2 id="section-modal-title">
              {{ editingId !== null ? 'Edit Section' : 'Create Section' }}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close modal"
            :disabled="saving"
            @click="closeModal"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <form @submit.prevent="saveSection">
          <div class="form-group">
            <label for="section-name">Section Name</label>

            <input
              id="section-name"
              v-model="form.name"
              type="text"
              placeholder="e.g. Academics"
              maxlength="255"
              autocomplete="off"
              required
              @input="validationErrors = {}"
            />

            <small
              v-if="getFieldError('name')"
              class="field-error"
            >
              {{ getFieldError('name') }}
            </small>
          </div>

          <div class="form-group">
            <label for="section-slug">URL Slug</label>

            <div class="slug-input">
              <span>/</span>

              <input
                id="section-slug"
                v-model="form.slug"
                type="text"
                placeholder="academics"
                maxlength="255"
                autocomplete="off"
                @input="validationErrors = {}"
              />
            </div>

            <small class="field-help">
              Leave empty to generate automatically.
            </small>

            <small
              v-if="getFieldError('slug')"
              class="field-error"
            >
              {{ getFieldError('slug') }}
            </small>
          </div>

          <div class="form-group">
            <label for="section-description">Description</label>

            <textarea
              id="section-description"
              v-model="form.description"
              rows="3"
              placeholder="Brief description of this website section..."
            ></textarea>

            <small
              v-if="getFieldError('description')"
              class="field-error"
            >
              {{ getFieldError('description') }}
            </small>
          </div>

          <label class="switch-row">
            <span>
              <strong>Active Section</strong>
              <small>Allow this section to be used for website content.</small>
            </span>

            <input
              v-model="form.active"
              type="checkbox"
            />

            <span class="switch"></span>
          </label>

          <div
            v-if="errorMessage"
            class="modal-error"
            role="alert"
          >
            <i class="bi bi-exclamation-circle"></i>
            {{ errorMessage }}
          </div>

          <div class="modal-actions">
            <button
              type="button"
              class="cancel-button"
              :disabled="saving"
              @click="closeModal"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="save-button"
              :disabled="saving"
            >
              <i
                class="bi"
                :class="saving ? 'bi-arrow-repeat spinning' : 'bi-check-lg'"
              ></i>

              {{
                saving
                  ? 'Saving...'
                  : editingId !== null
                    ? 'Save Changes'
                    : 'Create Section'
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sections-page {
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

.breadcrumb i {
  font-size: 9px;
}

.breadcrumb strong {
  color: #55705c;
  font-weight: 600;
}

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

.feedback-message {
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

.feedback-message > span {
  flex: 1;
}

.feedback-message > button {
  display: grid;
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  place-items: center;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.error-message {
  border-color: #f0d0d0;
  background: #fff6f6;
  color: #a53c3c;
}

.success-message {
  border-color: #cde8d3;
  background: #f1faf3;
  color: #286c3a;
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

.summary-icon.active {
  background: #e8f6ed;
  color: #218044;
}

.summary-icon.posts {
  background: #f4f0df;
  color: #8a6d19;
}

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

.result-count {
  color: #8a948d;
  font-size: 10px;
  white-space: nowrap;
}

.refresh-button {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid #e1e8e2;
  border-radius: 5px;
  background: #fff;
  color: #607067;
  cursor: pointer;
}

.refresh-button:hover {
  background: #f3f8f4;
  color: #104717;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

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

tbody tr:last-child td {
  border-bottom: 0;
}

.section-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
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

.section-name strong {
  color: #29432f;
  font-size: 11px;
  font-weight: 650;
}

.section-name small {
  display: block;
  margin-top: 2px;
  color: #8a948d;
  font-family: monospace;
  font-size: 9px;
}

td code {
  padding: 3px 6px;
  border-radius: 4px;
  background: #f3f6f4;
  color: #617067;
  font-family: monospace;
  font-size: 9px;
}

.description {
  color: #7b867f;
}

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
  white-space: nowrap;
}

.status-badge span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.status-badge.inactive {
  background: #f1f3f2;
  color: #7d8781;
}

.action-column {
  width: 100px;
  text-align: right;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 4px;
}

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

.empty-state {
  display: flex;
  min-height: 180px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #8b968f;
  text-align: center;
}

.empty-state i {
  margin-bottom: 3px;
  font-size: 23px;
}

.empty-state strong {
  color: #506058;
  font-size: 12px;
}

.empty-state span {
  font-size: 10px;
}

.mobile-list {
  display: none;
}

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
  max-height: calc(100vh - 30px);
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

.modal h2 {
  margin: 2px 0 0;
  color: #183a20;
  font-size: 17px;
}

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

.modal form {
  padding: 14px 16px 16px;
}

.form-group {
  margin-bottom: 11px;
}

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

.form-group input {
  height: 33px;
}

.form-group textarea {
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #104717;
  box-shadow: 0 0 0 2px rgb(16 71 23 / 6%);
}

.slug-input {
  display: flex;
  align-items: center;
  height: 33px;
  overflow: hidden;
  border: 1px solid #dfe6e1;
  border-radius: 6px;
}

.slug-input:focus-within {
  border-color: #104717;
  box-shadow: 0 0 0 2px rgb(16 71 23 / 6%);
}

.slug-input > span {
  padding-left: 9px;
  color: #87928b;
  font-size: 11px;
}

.slug-input input {
  height: 100%;
  padding-left: 2px;
  border: 0;
  box-shadow: none !important;
}

.field-help {
  display: block;
  margin-top: 3px;
  color: #929b95;
  font-size: 9px;
}

.field-error {
  display: block;
  margin-top: 4px;
  color: #b73535;
  font-size: 10px;
}

.switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  cursor: pointer;
}

.switch-row > span:first-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.switch-row strong {
  color: #35483c;
  font-size: 10px;
}

.switch-row small {
  color: #89938d;
  font-size: 9px;
}

.switch-row input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
}

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

.switch-row input:checked + .switch {
  background: #104717;
}

.switch-row input:checked + .switch::after {
  left: 17px;
}

.switch-row input:focus-visible + .switch {
  outline: 2px solid #104717;
  outline-offset: 3px;
}

.modal-error {
  display: flex;
  gap: 7px;
  margin-top: 9px;
  padding: 8px 9px;
  border: 1px solid #f0d0d0;
  border-radius: 6px;
  background: #fff6f6;
  color: #a53c3c;
  font-size: 10px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 7px;
  margin-top: 12px;
}

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

.save-button {
  min-height: 33px;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1000px) {
  .table-wrapper {
    overflow-x: auto;
  }

  th,
  td {
    white-space: nowrap;
  }
}

@media (max-width: 800px) {
  .sections-page {
    padding: 14px 14px 25px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .table-wrapper {
    display: none;
  }

  .mobile-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 9px;
  }

  .mobile-card {
    padding: 10px;
    border: 1px solid #e7ece8;
    border-radius: 7px;
  }

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

  .mobile-meta {
    margin-bottom: 7px;
    color: #758179;
    font-size: 9px;
  }

  .mobile-meta i {
    margin-right: 3px;
  }

  .mobile-actions {
    display: flex;
    gap: 5px;
  }

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

  .mobile-actions button.delete {
    color: #bd4545;
  }

  .mobile-empty {
    min-height: 150px;
  }
}

@media (max-width: 520px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .primary-button {
    width: 100%;
  }

  .toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .toolbar-right {
    justify-content: space-between;
  }

  .modal-actions > button {
    flex: 1;
  }
}
</style>
