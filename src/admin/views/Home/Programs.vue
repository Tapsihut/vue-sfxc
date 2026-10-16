<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import api from '@/services/api'

interface College {
  id: number
  name: string
  code: string
}

interface Program {
  id: number
  college_id: number
  name: string
  code: string
  description: string | null
  image_path: string | null
  image_url: string | null
  college: College | null
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

interface ProgramForm {
  college_id: string
  name: string
  code: string
  description: string
  imageFile: File | null
  imagePreview: string
  removeImage: boolean
  display_order: number
  is_active: boolean
}

const colleges = ref<College[]>([])
const programs = ref<Program[]>([])
const loading = ref(false)
const saving = ref(false)
const deletingId = ref<number | null>(null)
const updatingId = ref<number | null>(null)
const errorMessage = ref('')
const successMessage = ref('')
const searchQuery = ref('')
const collegeFilter = ref('all')
const statusFilter = ref('all')
const showModal = ref(false)
const editingProgram = ref<Program | null>(null)
let successTimer: ReturnType<typeof setTimeout> | undefined

const form = ref<ProgramForm>({
  college_id: '',
  name: '',
  code: '',
  description: '',
  imageFile: null,
  imagePreview: '',
  removeImage: false,
  display_order: 1,
  is_active: true,
})

const API_ORIGIN = 'http://localhost:8000'

const filteredPrograms = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return [...programs.value]
    .filter((program) => {
      const collegeName = program.college?.name ?? ''
      const collegeCode = program.college?.code ?? ''

      const matchesSearch =
        !search ||
        program.name.toLowerCase().includes(search) ||
        program.code.toLowerCase().includes(search) ||
        collegeName.toLowerCase().includes(search) ||
        collegeCode.toLowerCase().includes(search)

      const matchesCollege =
        collegeFilter.value === 'all' ||
        String(program.college_id) === collegeFilter.value

      const matchesStatus =
        statusFilter.value === 'all' ||
        (statusFilter.value === 'active' && program.is_active) ||
        (statusFilter.value === 'inactive' && !program.is_active)

      return matchesSearch && matchesCollege && matchesStatus
    })
    .sort((a, b) => a.display_order - b.display_order)
})

const totalPrograms = computed(() => programs.value.length)
const activePrograms = computed(
  () => programs.value.filter((program) => program.is_active).length,
)
const inactivePrograms = computed(
  () => programs.value.filter((program) => !program.is_active).length,
)
const nextOrder = computed(() =>
  programs.value.length
    ? Math.max(...programs.value.map((program) => program.display_order)) + 1
    : 1,
)

function imageUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path

  return new URL(path.startsWith('/') ? path : `/${path}`, API_ORIGIN).toString()
}

function getErrorMessage(error: unknown): string {
  const err = error as {
    response?: {
      data?: {
        errors?: Record<string, unknown[]>
        message?: string
      }
    }
    message?: string
  }

  const errors = err.response?.data?.errors

  if (errors) {
    const first = Object.values(errors).flat()[0]
    if (first) return String(first)
  }

  return err.response?.data?.message ||
    err.message ||
    'Something went wrong. Please try again.'
}

function showSuccess(message: string): void {
  successMessage.value = message
  errorMessage.value = ''

  if (successTimer) clearTimeout(successTimer)

  successTimer = setTimeout(() => {
    if (successMessage.value === message) successMessage.value = ''
  }, 3500)
}

function normalizeProgram(program: Program): Program {
  return {
    ...program,
    image_url: imageUrl(program.image_url || program.image_path),
    display_order: Number(program.display_order) || 1,
    is_active:
      program.is_active === true ||
      (program.is_active as unknown) === 1 ||
      (program.is_active as unknown) === '1',
  }
}

async function loadPageData(): Promise<void> {
  loading.value = true
  errorMessage.value = ''

  try {
    const [collegeResponse, programResponse] = await Promise.all([
      api.get('/api/v1/colleges'),
      api.get('/api/v1/programs'),
    ])

    colleges.value = collegeResponse.data.data ?? []
    programs.value = (programResponse.data.data ?? []).map(
      (program: Program) => normalizeProgram(program),
    )
  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    loading.value = false
  }
}

async function loadPrograms(): Promise<void> {
  try {
    const response = await api.get('/api/v1/programs')
    programs.value = (response.data.data ?? []).map(
      (program: Program) => normalizeProgram(program),
    )
  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error)
  }
}

function clearImagePreview(): void {
  if (form.value.imagePreview.startsWith('blob:')) {
    URL.revokeObjectURL(form.value.imagePreview)
  }
}

function resetForm(): void {
  clearImagePreview()

  form.value = {
    college_id: colleges.value.length ? String(colleges.value[0].id) : '',
    name: '',
    code: '',
    description: '',
    imageFile: null,
    imagePreview: '',
    removeImage: false,
    display_order: nextOrder.value,
    is_active: true,
  }
}

function openCreateModal(): void {
  errorMessage.value = ''
  editingProgram.value = null
  resetForm()
  showModal.value = true
}

function openEditModal(program: Program): void {
  errorMessage.value = ''
  editingProgram.value = program

  form.value = {
    college_id: String(program.college_id),
    name: program.name,
    code: program.code,
    description: program.description ?? '',
    imageFile: null,
    imagePreview: program.image_url ? imageUrl(program.image_url) : '',
    removeImage: false,
    display_order: program.display_order,
    is_active: program.is_active,
  }

  showModal.value = true
}

function closeModal(): void {
  if (saving.value) return

  clearImagePreview()
  showModal.value = false
  editingProgram.value = null
  errorMessage.value = ''
}
function handleImageUpload(event: Event): void {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    errorMessage.value = 'Choose a JPG, PNG, or WebP image.'
    input.value = ''
    return
  }

  if (file.size > 20 * 1024 * 1024) {
    errorMessage.value = 'The image must be 20 MB or smaller.'
    input.value = ''
    return
  }

  clearImagePreview()

  form.value.imageFile = file
  form.value.imagePreview = URL.createObjectURL(file)
  form.value.removeImage = false
  errorMessage.value = ''
}
function removeImage(): void {
  clearImagePreview()
  form.value.imageFile = null
  form.value.imagePreview = ''
  form.value.removeImage = true
}

function buildFormData(
  program: Partial<Program>,
  imageFile: File | null = null,
  removeImage = false,
): FormData {
  const data = new FormData()

  data.append('college_id', String(program.college_id ?? ''))
  data.append('name', String(program.name ?? '').trim())
  data.append('code', String(program.code ?? '').trim().toUpperCase())
  data.append('description', String(program.description ?? ''))
  data.append('display_order', String(program.display_order ?? 1))
  data.append('is_active', program.is_active ? '1' : '0')

  if (imageFile) data.append('image', imageFile)
  if (removeImage) data.append('remove_image', '1')

  return data
}
async function persistProgram(
program: Partial<Program> & { id?: number },
imageFile: File | null = null,
removeImage = false,
): Promise<Program> {
const data = buildFormData(program, imageFile, removeImage)

if (program.id) {
data.append('_method', 'PUT')
}

const url = program.id
? `/api/v1/programs/${program.id}`
: '/api/v1/programs'

const response = await api.post(url, data, {
headers: {
Accept: 'application/json',
'Content-Type': 'multipart/form-data',
},
})

return normalizeProgram(response.data.data as Program)
}


async function saveProgram(): Promise<void> {
  if (saving.value) return

  if (!form.value.name.trim() || !form.value.code.trim() || !form.value.college_id) {
    errorMessage.value = 'Please complete the program name, code, and college.'
    return
  }

  saving.value = true
  errorMessage.value = ''

  try {
    const payload: Partial<Program> = {
      college_id: Number(form.value.college_id),
      name: form.value.name.trim(),
      code: form.value.code.trim().toUpperCase(),
      description: form.value.description.trim(),
      display_order: Number(form.value.display_order) || 1,
      is_active: form.value.is_active,
    }

    if (editingProgram.value) {
      const saved = await persistProgram(
        { ...payload, id: editingProgram.value.id },
        form.value.imageFile,
        form.value.removeImage,
      )

      const index = programs.value.findIndex((p) => p.id === saved.id)
      if (index !== -1) programs.value[index] = saved

      showSuccess('Program updated successfully.')
    } else {
      const saved = await persistProgram(payload, form.value.imageFile)
      programs.value.push(saved)
      showSuccess('Program added successfully.')
    }

    clearImagePreview()
    showModal.value = false
    editingProgram.value = null
  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    saving.value = false
  }
}

async function deleteProgram(program: Program): Promise<void> {
  if (deletingId.value !== null) return

  if (!window.confirm(`Are you sure you want to delete "${program.name}"?`)) {
    return
  }

  deletingId.value = program.id
  errorMessage.value = ''

  try {
    await api.delete(`/api/v1/programs/${program.id}`)
    programs.value = programs.value.filter((item) => item.id !== program.id)
    showSuccess('Program deleted successfully.')
  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    deletingId.value = null
  }
}

async function updateProgramStatus(program: Program, active: boolean): Promise<void> {
  if (updatingId.value !== null) return

  updatingId.value = program.id
  errorMessage.value = ''

  try {
    const saved = await persistProgram({ ...program, is_active: active })
    const index = programs.value.findIndex((p) => p.id === saved.id)

    if (index !== -1) programs.value[index] = saved

    showSuccess(`Program ${active ? 'activated' : 'deactivated'} successfully.`)
  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error)
    await loadPrograms()
  } finally {
    updatingId.value = null
  }
}

async function toggleStatus(program: Program): Promise<void> {
  await updateProgramStatus(program, !program.is_active)
}

async function moveProgram(index: number, direction: -1 | 1): Promise<void> {
  const list = filteredPrograms.value
  const otherIndex = index + direction

  if (otherIndex < 0 || otherIndex >= list.length) return

  const current = list[index]
  const other = list[otherIndex]

  if (!current || !other) return

  const currentOrder = current.display_order
  const otherOrder = other.display_order

  current.display_order = otherOrder
  other.display_order = currentOrder

  try {
    await Promise.all([
      persistProgram({ ...current }),
      persistProgram({ ...other }),
    ])

    programs.value.sort((a, b) => a.display_order - b.display_order)
    showSuccess('Program display order updated.')
  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error)
    await loadPrograms()
  }
}

function moveUp(index: number): Promise<void> {
  return moveProgram(index, -1)
}

function moveDown(index: number): Promise<void> {
  return moveProgram(index, 1)
}

function clearFilters(): void {
  searchQuery.value = ''
  collegeFilter.value = 'all'
  statusFilter.value = 'all'
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape' && showModal.value) closeModal()
}

onMounted(() => {
  void loadPageData()
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  if (successTimer) clearTimeout(successTimer)
  clearImagePreview()
})
</script>

<template>
  <div class="programs-page">
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <span>Home</span>
          <i class="bi bi-chevron-right"></i>
          <strong>Programs</strong>
        </div>
        <h1>Programs</h1>
        <p>Manage academic programs displayed on the website.</p>
      </div>

      <button type="button" class="primary-btn" @click="openCreateModal">
        <i class="bi bi-plus-lg"></i>
        New Program
      </button>
    </div>

    <div v-if="successMessage" class="notice success-notice" role="status">
      <i class="bi bi-check-circle-fill"></i>
      <span>{{ successMessage }}</span>
      <button type="button" aria-label="Dismiss message" @click="successMessage = ''">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div v-if="errorMessage && !showModal" class="notice error-notice" role="alert">
      <i class="bi bi-exclamation-circle-fill"></i>
      <span>{{ errorMessage }}</span>
      <button type="button" aria-label="Dismiss error" @click="errorMessage = ''">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon"><i class="bi bi-mortarboard-fill"></i></div>
        <div>
          <span>Total Programs</span>
          <strong>{{ totalPrograms }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon active"><i class="bi bi-check-circle-fill"></i></div>
        <div>
          <span>Active</span>
          <strong>{{ activePrograms }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon inactive"><i class="bi bi-pause-circle-fill"></i></div>
        <div>
          <span>Inactive</span>
          <strong>{{ inactivePrograms }}</strong>
        </div>
      </div>
    </div>

    <section class="filter-card">
      <div class="filter-title">
        <div>
          <h2>Program List</h2>
          <p>Programs currently configured for the public website.</p>
        </div>

        <button
          v-if="searchQuery || collegeFilter !== 'all' || statusFilter !== 'all'"
          type="button"
          class="clear-btn"
          @click="clearFilters"
        >
          <i class="bi bi-x-circle"></i>
          Clear Filters
        </button>
      </div>

      <div class="filters">
        <div class="filter-group search-filter">
          <label for="program-search">Search Programs</label>
          <div class="search-box">
            <i class="bi bi-search"></i>
            <input
              id="program-search"
              v-model="searchQuery"
              type="search"
              placeholder="Search by name, code, or college..."
            />
          </div>
        </div>

        <div class="filter-group">
          <label for="college-filter">College</label>
          <select id="college-filter" v-model="collegeFilter">
            <option value="all">All Colleges</option>
            <option v-for="college in colleges" :key="college.id" :value="String(college.id)">
              {{ college.code }} — {{ college.name }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="status-filter">Status</label>
          <select id="status-filter" v-model="statusFilter">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </section>

    <section class="programs-section">
      <div class="programs-header">
        <div>
          <h2>Academic Programs</h2>
          <p>{{ filteredPrograms.length }} program{{ filteredPrograms.length !== 1 ? 's' : '' }} found</p>
        </div>

        <button type="button" class="refresh-btn" :disabled="loading" @click="loadPageData">
          <i class="bi bi-arrow-clockwise" :class="{ spinning: loading }"></i>
          Refresh
        </button>
      </div>

      <div v-if="loading && !programs.length" class="loading-state">
        <span class="spinner"></span>
        <span>Loading programs...</span>
      </div>

      <div v-else-if="filteredPrograms.length" class="programs-grid">
        <article
          v-for="(program, index) in filteredPrograms"
          :key="program.id"
          class="program-card"
        >
          <div class="program-image">
            <img
              v-if="program.image_url"
              :src="program.image_url"
              :alt="program.name"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
            <div v-else class="image-placeholder">
              <i class="bi bi-mortarboard"></i>
            </div>

            <span class="status-badge" :class="{ active: program.is_active, inactive: !program.is_active }">
              <i :class="program.is_active ? 'bi bi-check-circle-fill' : 'bi bi-pause-circle-fill'"></i>
              {{ program.is_active ? 'Active' : 'Inactive' }}
            </span>

            <span class="order-badge">#{{ program.display_order }}</span>
          </div>

          <div class="program-content">
            <div class="program-code">{{ program.code }}</div>
            <h3>{{ program.name }}</h3>

            <div class="department">
              <i class="bi bi-building"></i>
              <span>{{ program.college?.code }} — {{ program.college?.name || 'College not assigned' }}</span>
            </div>

            <p>{{ program.description || 'No description provided.' }}</p>

            <div class="program-actions">
              <div class="move-actions">
                <button
                  type="button"
                  title="Move Up"
                  :disabled="index === 0 || updatingId !== null"
                  @click="moveUp(index)"
                >
                  <i class="bi bi-chevron-up"></i>
                </button>
                <button
                  type="button"
                  title="Move Down"
                  :disabled="index === filteredPrograms.length - 1 || updatingId !== null"
                  @click="moveDown(index)"
                >
                  <i class="bi bi-chevron-down"></i>
                </button>
              </div>

              <div class="action-buttons">
                <button
                  type="button"
                  class="icon-btn edit"
                  :title="program.is_active ? 'Deactivate' : 'Activate'"
                  :disabled="updatingId === program.id"
                  @click="toggleStatus(program)"
                >
                  <i :class="program.is_active ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
                <button type="button" class="icon-btn edit" title="Edit" @click="openEditModal(program)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  type="button"
                  class="icon-btn delete"
                  title="Delete"
                  :disabled="deletingId === program.id"
                  @click="deleteProgram(program)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <i class="bi bi-mortarboard"></i>
        <strong>{{ loading ? 'Loading programs...' : 'No programs found' }}</strong>
        <span v-if="!loading">Add a program or change your search and filters.</span>
      </div>
    </section>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="program-modal-title">
        <div class="modal-header">
          <div>
            <h2 id="program-modal-title">{{ editingProgram ? 'Edit Program' : 'New Program' }}</h2>
            <p>{{ editingProgram ? 'Update the program information.' : 'Add a new academic program.' }}</p>
          </div>
          <button
            type="button"
            class="close-btn"
            :disabled="saving"
            aria-label="Close modal"
            @click="closeModal"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <form @submit.prevent="saveProgram">
          <div v-if="errorMessage" class="notice error-notice modal-notice" role="alert">
            <i class="bi bi-exclamation-circle-fill"></i>
            <span>{{ errorMessage }}</span>
          </div>

          <div class="form-grid">
            <div class="form-group full">
              <label for="program-name">Program Name <span>*</span></label>
              <input
                id="program-name"
                v-model="form.name"
                type="text"
                maxlength="255"
                placeholder="e.g. Bachelor of Science in Information Technology"
                required
              />
            </div>

            <div class="form-group">
              <label for="program-code">Program Code <span>*</span></label>
              <input id="program-code" v-model="form.code" type="text" maxlength="30" placeholder="e.g. BSIT" required />
            </div>

            <div class="form-group">
              <label for="program-college">College <span>*</span></label>
              <select id="program-college" v-model="form.college_id" required>
                <option value="" disabled>Select college</option>
                <option v-for="college in colleges" :key="college.id" :value="String(college.id)">
                  {{ college.code }} — {{ college.name }}
                </option>
              </select>
            </div>

            <div class="form-group full">
              <label for="program-description">Description</label>
              <textarea
                id="program-description"
                v-model="form.description"
                rows="3"
                placeholder="Enter a short description..."
              ></textarea>
            </div>

            <div class="form-group">
              <label for="program-order">Display Order</label>
              <input id="program-order" v-model.number="form.display_order" type="number" min="1" required />
            </div>

            <div class="form-group">
              <label>Status</label>
              <label class="switch-row">
                <input v-model="form.is_active" type="checkbox" />
                <span class="switch"></span>
                <span>{{ form.is_active ? 'Active' : 'Inactive' }}</span>
              </label>
            </div>

            <div class="form-group full">
              <label>Program Image</label>
              <div class="upload-area">
                <div v-if="form.imagePreview" class="upload-preview">
                  <img :src="form.imagePreview" alt="Program preview" />
                  <button type="button" class="remove-image" title="Remove image" @click="removeImage">
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>

                <label v-else class="upload-placeholder">
                  <i class="bi bi-cloud-arrow-up"></i>
                  <strong>Upload Image</strong>
                  <span>JPG, PNG or WebP · Maximum 5 MB</span>
                  <input type="file" accept="image/png,image/jpeg,image/webp" @change="handleImageUpload" />
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="secondary-btn" :disabled="saving" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="primary-btn" :disabled="saving">
              <span v-if="saving" class="button-spinner"></span>
              <i v-else :class="editingProgram ? 'bi bi-check-lg' : 'bi bi-plus-lg'"></i>
              {{ saving ? 'Saving...' : editingProgram ? 'Save Changes' : 'Add Program' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.programs-page{width:100%;max-width:1500px;margin:0 auto;padding:20px}
.page-header{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:16px}
.breadcrumb{display:flex;align-items:center;gap:5px;margin-bottom:4px;color:#84918a;font-size:10px}
.breadcrumb i{font-size:8px}.breadcrumb strong{color:#2e6244}
.page-header h1{margin:0;color:#173e29;font-size:24px;line-height:1.15}
.page-header p{margin:4px 0 0;color:#7f8b85;font-size:11px}
.primary-btn,.secondary-btn,.clear-btn,.refresh-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:0;border-radius:6px;cursor:pointer;font-family:inherit;font-size:10px;font-weight:700;transition:.2s}
.primary-btn{min-height:32px;padding:0 11px;color:#fff;background:#0b6335}
.primary-btn:hover:not(:disabled){background:#084d29}
.primary-btn:disabled,.secondary-btn:disabled,.refresh-btn:disabled{opacity:.6;cursor:not-allowed}
.secondary-btn{min-height:32px;padding:0 11px;color:#4e6257;background:#edf3ef}
.secondary-btn:hover:not(:disabled){background:#e2ebe5}
.clear-btn{min-height:28px;padding:0 9px;color:#9b4c4c;background:#fff0f0}
.refresh-btn{min-height:28px;padding:0 9px;color:#286b45;background:#edf6f0}
.notice{display:flex;align-items:center;gap:8px;margin-bottom:12px;padding:10px 12px;border:1px solid;border-radius:7px;font-size:11px}
.notice span{flex:1}.notice button{border:0;background:transparent;cursor:pointer;color:inherit}
.success-notice{border-color:#c9e5d1;color:#23663c;background:#f0faf3}
.error-notice{border-color:#f0cccc;color:#a13e3e;background:#fff4f4}
.summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:14px}
.summary-card{display:flex;align-items:center;gap:10px;min-height:68px;padding:11px 13px;border:1px solid #e2eae5;border-radius:9px;background:#fff;box-shadow:0 2px 8px #19372709}
.summary-icon{display:flex;align-items:center;justify-content:center;width:36px;height:36px;flex:0 0 36px;border-radius:7px;color:#0b6335;background:#edf6f0;font-size:16px}
.summary-icon.active{color:#217044;background:#e9f7ee}.summary-icon.inactive{color:#806a39;background:#faf4e5}
.summary-card span{display:block;margin-bottom:2px;color:#79867f;font-size:10px}
.summary-card strong{display:block;color:#193e2a;font-size:18px;line-height:1.1}
.filter-card{margin-bottom:14px;padding:13px;border:1px solid #e2eae5;border-radius:9px;background:#fff;box-shadow:0 2px 8px #19372709}
.filter-title{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:11px}
.filter-title h2,.programs-header h2{margin:0;color:#173e29;font-size:14px}
.filter-title p,.programs-header p{margin:3px 0 0;color:#87928c;font-size:10px}
.filters{display:grid;grid-template-columns:minmax(0,1fr) minmax(180px,220px) 150px;gap:10px}
.filter-group{min-width:0}.filter-group label,.form-group>label{display:block;margin-bottom:4px;color:#56655d;font-size:9px;font-weight:700}
.search-box{position:relative}.search-box i{position:absolute;top:50%;left:9px;color:#89958f;font-size:10px;transform:translateY(-50%)}
.search-box input,.filter-group select,.form-group input:not([type=checkbox]),.form-group select,.form-group textarea{width:100%;border:1px solid #dce5df;border-radius:6px;outline:none;color:#33483c;background:#fff;font-family:inherit;font-size:10px}
.search-box input,.filter-group select,.form-group select,.form-group input:not([type=checkbox]){height:34px;padding:0 9px}
.search-box input{padding-left:27px}
.search-box input:focus,.filter-group select:focus,.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:#6ba17f;box-shadow:0 0 0 2px #0b63350f}
.programs-section{overflow:hidden;border:1px solid #e2eae5;border-radius:9px;background:#fff;box-shadow:0 2px 8px #19372709}
.programs-header{display:flex;align-items:center;justify-content:space-between;padding:13px 15px;border-bottom:1px solid #e7ede9}
.programs-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:12px;background:#f9fbfa}
.program-card{overflow:hidden;border:1px solid #e3eae5;border-radius:9px;background:#fff;box-shadow:0 1px 5px #19372709;transition:.2s}
.program-card:hover{border-color:#cbdcd1;box-shadow:0 5px 14px #19372712}
.program-image{position:relative;height:150px;overflow:hidden;background:#edf5f0}
.program-image img{display:block;width:100%;height:100%;object-fit:cover}
.image-placeholder{display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#91a89b;background:linear-gradient(135deg,#edf6f0,#e2eee7);font-size:36px}
.status-badge{position:absolute;top:9px;left:9px;display:inline-flex;align-items:center;gap:5px;padding:4px 7px;border-radius:20px;font-size:9px;font-weight:700}
.status-badge.active{color:#217044;background:#e9f7eef5}.status-badge.inactive{color:#806a39;background:#faf4e5f5}
.status-badge i{font-size:8px}
.order-badge{position:absolute;top:9px;right:9px;display:flex;align-items:center;justify-content:center;min-width:27px;height:23px;padding:0 6px;border-radius:5px;color:#fff;background:#123c27e0;font-size:9px;font-weight:700}
.program-content{display:flex;flex-direction:column;min-height:185px;padding:12px 13px 11px}
.program-code{display:inline-flex;align-items:center;align-self:flex-start;min-height:20px;padding:0 7px;border-radius:5px;color:#286b45;background:#edf6f0;font-size:9px;font-weight:800;letter-spacing:.3px}
.program-content h3{display:-webkit-box;overflow:hidden;margin:6px 0 5px;color:#193e2a;font-size:14px;line-height:1.3;-webkit-box-orient:vertical;-webkit-line-clamp:2}
.department{display:flex;align-items:flex-start;gap:5px;min-height:27px;color:#6f7e76;font-size:10px;line-height:1.35}
.department i{flex:0 0 auto;margin-top:2px;color:#4d8963;font-size:10px}
.program-content>p{display:-webkit-box;overflow:hidden;margin:6px 0 9px;color:#79867f;font-size:10px;line-height:1.45;-webkit-box-orient:vertical;-webkit-line-clamp:2}
.program-actions{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:auto;padding-top:9px;border-top:1px solid #edf1ee}
.move-actions,.action-buttons{display:flex;align-items:center;gap:5px}
.move-actions button,.icon-btn{display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:0;border-radius:6px;cursor:pointer;transition:.2s}
.move-actions button{border:1px solid #e0e8e3;color:#587065;background:#fff}
.move-actions button:hover:not(:disabled){border-color:#c4d7ca;color:#286b45;background:#f1f7f3}
.move-actions button:disabled,.icon-btn:disabled{opacity:.4;cursor:not-allowed}
.icon-btn.edit{color:#3f6b50;background:#edf5ef}.icon-btn.edit:hover:not(:disabled){background:#dfeee3}
.icon-btn.delete{color:#b24a4a;background:#fff0f0}.icon-btn.delete:hover:not(:disabled){background:#ffe1e1}
.empty-state,.loading-state{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:170px;gap:7px;color:#8a9890;text-align:center}
.empty-state>i{font-size:25px}.empty-state strong{color:#516158;font-size:12px}.empty-state span{font-size:10px}
.spinner,.button-spinner{width:17px;height:17px;border:2px solid #d8e5dc;border-top-color:#0b6335;border-radius:50%;animation:spin .7s linear infinite}
.button-spinner{width:12px;height:12px;border-color:#ffffff66;border-top-color:#fff}
.spinning{display:inline-block;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.modal-overlay{position:fixed;z-index:1000;inset:0;display:flex;align-items:center;justify-content:center;padding:16px;background:#0c221e80}
.modal{width:min(560px,100%);max-height:calc(100vh - 32px);overflow-y:auto;border-radius:11px;background:#fff;box-shadow:0 18px 60px #0003}
.modal-header{display:flex;align-items:flex-start;justify-content:space-between;gap:15px;padding:16px 18px 13px;border-bottom:1px solid #e7ede9}
.modal-header h2{margin:0;color:#173e29;font-size:16px}.modal-header p{margin:3px 0 0;color:#87928c;font-size:10px}
.close-btn{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:0;border-radius:6px;color:#69766f;background:#f1f4f2;cursor:pointer}
.close-btn:hover{background:#e6ebe8}.modal form{padding:16px 18px}.modal-notice{margin-bottom:12px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.form-group{min-width:0}.form-group.full{grid-column:1/-1}
.form-group>label span{color:#b24a4a}.form-group textarea{min-height:70px;padding:8px 9px;resize:vertical;line-height:1.4}
.switch-row{display:flex!important;align-items:center;gap:7px;height:34px;margin:0!important;color:#56655c!important;font-size:11px!important;font-weight:400!important;cursor:pointer}
.switch-row input{position:absolute;opacity:0;pointer-events:none}
.switch{position:relative;width:34px;height:19px;border-radius:20px;background:#cdd6d0;transition:.2s}
.switch:after{position:absolute;top:3px;left:3px;width:13px;height:13px;border-radius:50%;background:#fff;content:'';transition:.2s}
.switch-row input:checked+.switch{background:#0b6335}.switch-row input:checked+.switch:after{left:18px}
.upload-area{width:100%}.upload-preview{position:relative;width:100%;height:130px;overflow:hidden;border:1px solid #dce5df;border-radius:6px;background:#edf5f0}
.upload-preview img{width:100%;height:100%;object-fit:cover}
.remove-image{position:absolute;top:7px;right:7px;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:0;border-radius:6px;cursor:pointer;color:#fff;background:#b24a4ae6}
.upload-placeholder{display:flex!important;flex-direction:column;align-items:center;justify-content:center;width:100%;min-height:100px;margin:0!important;padding:12px;border:1px dashed #b9cdc0;border-radius:6px;cursor:pointer;color:#87928c!important;background:#f8fbf9;text-align:center}
.upload-placeholder i{margin-bottom:4px;color:#4e9067;font-size:22px}
.upload-placeholder strong{margin-bottom:2px;color:#516158;font-size:10px}
.upload-placeholder span{font-size:9px}.upload-placeholder input{display:none}
.modal-footer{display:flex;justify-content:flex-end;gap:7px;margin-top:18px;padding-top:13px;border-top:1px solid #e7ede9}
@media(max-width:850px){.programs-page{padding:16px}.filters{grid-template-columns:minmax(0,1fr) 180px}.filter-group:last-child{grid-column:1/-1}}
@media(max-width:700px){.page-header{align-items:flex-start;flex-direction:column}.page-header>.primary-btn{width:100%}.summary-grid{grid-template-columns:1fr}.summary-card{min-height:64px}.filters{grid-template-columns:1fr}.filter-group:last-child{grid-column:auto}.programs-grid{grid-template-columns:1fr}.program-image{height:170px}}
@media(max-width:500px){.programs-page{padding:12px}.page-header h1{font-size:22px}.filter-card{padding:11px}.filter-title{align-items:flex-start;flex-direction:column}.programs-header{padding:11px}.programs-grid{padding:9px;gap:9px}.form-grid{grid-template-columns:1fr;gap:10px}.form-group.full{grid-column:auto}.modal-overlay{align-items:flex-end;padding:0}.modal{width:100%;max-height:92vh;border-radius:13px 13px 0 0}.modal-header,.modal form{padding-right:14px;padding-left:14px}.modal-footer{flex-direction:column-reverse}.modal-footer button{width:100%}}
@media(max-width:380px){.program-image{height:145px}.program-content{padding:10px}.program-actions{align-items:flex-start}.action-buttons,.move-actions{gap:4px}}
</style>

