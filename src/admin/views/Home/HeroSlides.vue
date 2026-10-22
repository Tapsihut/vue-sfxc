
<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import api from '@/services/api'

interface HeroSlide {
  id: number
  title: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  order: number
  active: boolean
}

interface ApiHeroSlide {
  id: number
  title: string
  description?: string | null
  image_path?: string | null
  image_url?: string | null
  button_text?: string | null
  button_link?: string | null
  display_order?: number
  is_active?: boolean | number | string
}

const slides = ref<HeroSlide[]>([])
const search = ref('')
const showModal = ref(false)
const editingId = ref<number | null>(null)
const imageInput = ref<HTMLInputElement | null>(null)

const loading = ref(false)
const saving = ref(false)
const busyId = ref<number | null>(null)
const pageError = ref('')
const formError = ref('')
const successMessage = ref('')

const selectedImage = ref<File | null>(null)
const originalImageExists = ref(false)
const removeExistingImage = ref(false)
const previewObjectUrl = ref('')

const form = ref({
  title: '',
  description: '',
  image: '',
  buttonText: '',
  buttonLink: '',
  order: 1,
  active: true,
})

const filteredSlides = computed(() => {
  const keyword = search.value.toLowerCase().trim()

  return [...slides.value]
    .filter((slide) => {
      return (
        !keyword ||
        slide.title.toLowerCase().includes(keyword) ||
        slide.description.toLowerCase().includes(keyword)
      )
    })
    .sort((a, b) => a.order - b.order)
})

const activeCount = computed(
  () => slides.value.filter((slide) => slide.active).length,
)

function asActive(value: ApiHeroSlide['is_active']): boolean {
  return value === true || value === 1 || value === '1' || value === 'true'
}

function mapSlide(item: ApiHeroSlide): HeroSlide {
  return {
    id: item.id,
    title: item.title,
    description: item.description ?? '',
    image: item.image_url ?? '',
    buttonText: item.button_text ?? '',
    buttonLink: item.button_link ?? '',
    order: Number(item.display_order ?? 1),
    active: asActive(item.is_active),
  }
}

function getErrorMessage(error: unknown): string {
  const err = error as {
    response?: {
      data?: {
        message?: string
        errors?: Record<string, string[]>
      }
    }
    message?: string
  }

  const errors = err.response?.data?.errors
  if (errors) {
    const firstError = Object.values(errors).flat()[0]
    if (firstError) return firstError
  }

  return (
    err.response?.data?.message ||
    err.message ||
    'Something went wrong. Please try again.'
  )
}

async function loadSlides() {
  loading.value = true
  pageError.value = ''

  try {
    const response = await api.get('/api/v1/hero-slides')
    const items = response.data?.data ?? response.data

    if (!Array.isArray(items)) {
      throw new Error('The server returned an unexpected slides response.')
    }

    slides.value = items.map(mapSlide)
  } catch (error) {
    pageError.value = getErrorMessage(error)
  } finally {
    loading.value = false
  }
}

function clearPreviewObjectUrl() {
  if (previewObjectUrl.value) {
    URL.revokeObjectURL(previewObjectUrl.value)
    previewObjectUrl.value = ''
  }
}

function resetImageState() {
  clearPreviewObjectUrl()
  selectedImage.value = null
  originalImageExists.value = false
  removeExistingImage.value = false

  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

function openCreate() {
  editingId.value = null
  formError.value = ''
  resetImageState()

  form.value = {
    title: '',
    description: '',
    image: '',
    buttonText: 'Learn More',
    buttonLink: '/',
    order: slides.value.length + 1,
    active: true,
  }

  showModal.value = true
}

function openEdit(slide: HeroSlide) {
  editingId.value = slide.id
  formError.value = ''
  resetImageState()

  form.value = {
    title: slide.title,
    description: slide.description,
    image: slide.image,
    buttonText: slide.buttonText,
    buttonLink: slide.buttonLink,
    order: slide.order,
    active: slide.active,
  }

  originalImageExists.value = Boolean(slide.image)
  showModal.value = true
}

function closeModal() {
  if (saving.value) return

  showModal.value = false
  formError.value = ''
  resetImageState()
}

function openImagePicker() {
  imageInput.value?.click()
}

function handleImage(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

  if (!allowedTypes.includes(file.type)) {
    formError.value = 'Choose a JPG, PNG, or WEBP image.'
    target.value = ''
    return
  }

  if (file.size > 20 * 1024 * 1024) {
    formError.value = 'The image must not exceed 20 MB.'
    target.value = ''
    return
  }

  formError.value = ''
  clearPreviewObjectUrl()

  selectedImage.value = file
  previewObjectUrl.value = URL.createObjectURL(file)
  form.value.image = previewObjectUrl.value
  removeExistingImage.value = false
}

function removeImage() {
  clearPreviewObjectUrl()
  selectedImage.value = null
  form.value.image = ''
  removeExistingImage.value = originalImageExists.value

  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

async function saveSlide() {
  formError.value = ''
  successMessage.value = ''

  if (editingId.value === null && !selectedImage.value) {
    formError.value = 'Please upload a hero image for the new slide.'
    return
  }

  const order = Number(form.value.order)

  if (!Number.isInteger(order) || order < 1) {
    formError.value = 'Display order must be a whole number of at least 1.'
    return
  }

  saving.value = true

  try {
    const data = new FormData()

    const existingSlide = editingId.value !== null
      ? slides.value.find((slide) => slide.id === editingId.value)
      : undefined
    const generatedTitle = selectedImage.value
      ? selectedImage.value.name.replace(/\.[^/.]+$/, '').trim()
      : ''
    const title = (
      form.value.title.trim() ||
      generatedTitle ||
      existingSlide?.title ||
      `Hero Slide ${order}`
    ).slice(0, 255)

    data.append('title', title)
    data.append('description', form.value.description.trim())
    data.append('button_text', form.value.buttonText.trim())
    data.append('button_link', form.value.buttonLink.trim())
    data.append('display_order', String(order))
    data.append('is_active', form.value.active ? '1' : '0')

    if (selectedImage.value) {
      data.append('image', selectedImage.value)
    }

    if (editingId.value !== null) {
      if (removeExistingImage.value && !selectedImage.value) {
        data.append('remove_image', '1')
      }

      // Laravel/PHP reliably handles multipart file uploads via POST
      // with method spoofing for a PATCH update.
      data.append('_method', 'PATCH')

      await api.post(
        `/api/v1/hero-slides/${editingId.value}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      )

      successMessage.value = 'Hero slide updated successfully.'
    } else {
      await api.post('/api/v1/hero-slides', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })

      successMessage.value = 'Hero slide created successfully.'
    }

    showModal.value = false
    resetImageState()
    await loadSlides()
  } catch (error) {
    formError.value = getErrorMessage(error)
  } finally {
    saving.value = false
  }
}

async function deleteSlide(slide: HeroSlide) {
  const confirmed = window.confirm(
    `Delete "${slide.title}"? This action cannot be undone.`,
  )

  if (!confirmed) return

  pageError.value = ''
  successMessage.value = ''
  busyId.value = slide.id

  try {
    await api.delete(`/api/v1/hero-slides/${slide.id}`)
    await loadSlides()
    successMessage.value = 'Hero slide deleted successfully.'
  } catch (error) {
    pageError.value = getErrorMessage(error)
  } finally {
    busyId.value = null
  }
}

async function toggleStatus(slide: HeroSlide) {
  pageError.value = ''
  successMessage.value = ''
  busyId.value = slide.id

  try {
    await api.patch(`/api/v1/hero-slides/${slide.id}`, {
      is_active: !slide.active,
    })

    await loadSlides()
    successMessage.value = 'Slide status updated successfully.'
  } catch (error) {
    pageError.value = getErrorMessage(error)
  } finally {
    busyId.value = null
  }
}

async function persistOrder(orderedSlides: HeroSlide[]) {
  pageError.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    // Save the full sequence so the order stays consistent after refresh.
    await Promise.all(
      orderedSlides.map((slide, index) =>
        api.patch(`/api/v1/hero-slides/${slide.id}`, {
          display_order: index + 1,
        }),
      ),
    )

    await loadSlides()
    successMessage.value = 'Display order saved successfully.'
  } catch (error) {
    pageError.value =
      `${getErrorMessage(error)} The display order may not have been fully saved.`
    await loadSlides()
  } finally {
    loading.value = false
  }
}

async function moveSlide(slide: HeroSlide, direction: -1 | 1) {
  if (loading.value || busyId.value !== null) return

  const ordered = [...slides.value].sort((a, b) => a.order - b.order)
  const index = ordered.findIndex((item) => item.id === slide.id)
  const targetIndex = index + direction

  if (index < 0 || targetIndex < 0 || targetIndex >= ordered.length) return


const [moved] = ordered.splice(index, 1)

if (moved !== undefined) {
  ordered.splice(targetIndex, 0, moved)
}

  // Display the intended order immediately; the server remains authoritative.
  ordered.forEach((item, itemIndex) => {
    item.order = itemIndex + 1
  })

  slides.value = ordered
  await persistOrder(ordered)
}

function moveUp(slide: HeroSlide) {
  return moveSlide(slide, -1)
}

function moveDown(slide: HeroSlide) {
  return moveSlide(slide, 1)
}

onMounted(loadSlides)

onBeforeUnmount(() => {
  clearPreviewObjectUrl()
})
</script>

<template>
  <div class="hero-page">
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <span>Home</span>
          <i class="bi bi-chevron-right"></i>
          <strong>Hero Slides</strong>
        </div>
        <h1>Hero Slides</h1>
        <p>Manage the main banners displayed on the homepage.</p>
      </div>

      <button
        type="button"
        class="primary-button"
        :disabled="loading || saving"
        @click="openCreate"
      >
        <i class="bi bi-plus-lg"></i>
        New Slide
      </button>
    </div>

    <div v-if="successMessage" class="notice success-notice" role="status">
      <i class="bi bi-check-circle"></i>
      <span>{{ successMessage }}</span>
      <button type="button" aria-label="Dismiss message" @click="successMessage = ''">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div v-if="pageError" class="notice error-notice" role="alert">
      <i class="bi bi-exclamation-circle"></i>
      <span>{{ pageError }}</span>
      <button type="button" aria-label="Dismiss error" @click="pageError = ''">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon">
          <i class="bi bi-images"></i>
        </div>
        <div>
          <span>Total Slides</span>
          <strong>{{ slides.length }}</strong>
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
        <div class="summary-icon order">
          <i class="bi bi-arrow-down-up"></i>
        </div>
        <div>
          <span>Display Order</span>
          <strong>{{ slides.length }}</strong>
        </div>
      </div>
    </div>

    <div class="toolbar-card">
      <div class="search-box">
        <i class="bi bi-search"></i>
        <input v-model="search" type="text" placeholder="Search hero slides..." />
        <button v-if="search" type="button" aria-label="Clear search" @click="search = ''">
          <i class="bi bi-x"></i>
        </button>
      </div>
      <span class="result-count">{{ filteredSlides.length }} slides</span>
    </div>

    <div v-if="loading && slides.length === 0" class="empty-state">
      <i class="bi bi-arrow-repeat loading-icon"></i>
      <strong>Loading hero slides...</strong>
      <span>Please wait while we load the data.</span>
    </div>

    <div v-else class="slides-list">
      <article v-for="(slide, index) in filteredSlides" :key="slide.id" class="slide-card">
        <div class="slide-preview">
          <img v-if="slide.image" :src="slide.image" :alt="slide.title" />
          <div v-else class="preview-placeholder">
            <i class="bi bi-image"></i>
            <span>Hero Image</span>
          </div>

          <span class="order-badge">#{{ slide.order }}</span>
          <span class="status-badge" :class="{ inactive: !slide.active }">
            <span></span>
            {{ slide.active ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <div class="slide-content">
          <div class="slide-heading">
            <div>
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.description || 'No description provided.' }}</p>
            </div>
          </div>

          <div class="slide-meta">
            <span><i class="bi bi-link-45deg"></i>{{ slide.buttonText || 'No button' }}</span>
            <span><i class="bi bi-arrow-up-right"></i>{{ slide.buttonLink || 'No link' }}</span>
          </div>

          <div class="slide-actions">
            <div class="order-actions">
              <button
                type="button"
                title="Move up"
                aria-label="Move slide up"
                :disabled="index === 0 || loading || busyId !== null"
                @click="moveUp(slide)"
              >
                <i class="bi bi-chevron-up"></i>
              </button>
              <button
                type="button"
                title="Move down"
                aria-label="Move slide down"
                :disabled="index === filteredSlides.length - 1 || loading || busyId !== null"
                @click="moveDown(slide)"
              >
                <i class="bi bi-chevron-down"></i>
              </button>
            </div>

            <button
              type="button"
              class="status-button"
              :disabled="busyId === slide.id || loading"
              @click="toggleStatus(slide)"
            >
              <i :class="slide.active ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              {{ busyId === slide.id ? 'Saving...' : slide.active ? 'Disable' : 'Enable' }}
            </button>

            <button
              type="button"
              class="edit-button"
              :disabled="busyId === slide.id || loading"
              @click="openEdit(slide)"
            >
              <i class="bi bi-pencil"></i>
              Edit
            </button>

            <button
              type="button"
              class="delete-button"
              title="Delete slide"
              aria-label="Delete slide"
              :disabled="busyId === slide.id || loading"
              @click="deleteSlide(slide)"
            >
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </article>

      <div v-if="filteredSlides.length === 0" class="empty-state">
        <i class="bi bi-images"></i>
        <strong>{{ search ? 'No hero slides found' : 'No hero slides yet' }}</strong>
        <span>{{ search ? 'Try changing your search.' : 'Select New Slide to create your first banner.' }}</span>
      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal" role="dialog" aria-modal="true" :aria-label="editingId ? 'Edit hero slide' : 'Create hero slide'">
        <div class="modal-header">
          <div>
            <span class="modal-label">{{ editingId !== null ? 'EDIT SLIDE' : 'NEW SLIDE' }}</span>
            <h2>{{ editingId !== null ? 'Edit Hero Slide' : 'Create Hero Slide' }}</h2>
          </div>
          <button type="button" aria-label="Close modal" :disabled="saving" @click="closeModal">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <form @submit.prevent="saveSlide">
          <div v-if="formError" class="notice error-notice form-error" role="alert">
            <i class="bi bi-exclamation-circle"></i>
            <span>{{ formError }}</span>
          </div>

          <div class="form-group">
            <label>Hero Image <span>*</span></label>
            <input
              ref="imageInput"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              class="hidden-input"
              @change="handleImage"
            />

            <div v-if="form.image" class="modal-image">
              <img :src="form.image" alt="Hero image preview" />
              <div class="image-buttons">
                <button type="button" @click="openImagePicker">
                  <i class="bi bi-arrow-repeat"></i> Change
                </button>
                <button type="button" class="remove" @click="removeImage">
                  <i class="bi bi-trash3"></i> Remove
                </button>
              </div>
            </div>

            <button v-else type="button" class="image-upload" @click="openImagePicker">
              <i class="bi bi-cloud-arrow-up"></i>
              <span>Upload Image</span>
              <small>JPG, PNG or WEBP · Max 5 MB</small>
            </button>
          </div>

          <div class="form-group">
            <label for="slide-title">Title <small>(Optional)</small></label>
            <input
              id="slide-title"
              v-model="form.title"
              type="text"
              maxlength="255"
              placeholder="Enter a title, or leave blank..."
            />
          </div>

          <div class="form-group">
            <label for="slide-description">Description <small>(Optional)</small></label>
            <textarea
              id="slide-description"
              v-model="form.description"
              rows="3"
              placeholder="Enter a description, or leave blank..."
            ></textarea>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="button-text">Button Text</label>
              <input id="button-text" v-model="form.buttonText" type="text" maxlength="100" placeholder="Learn More" />
            </div>
            <div class="form-group">
              <label for="button-link">Button Link</label>
              <input id="button-link" v-model="form.buttonLink" type="text" maxlength="2048" placeholder="/about" />
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="slide-order">Display Order</label>
              <input id="slide-order" v-model.number="form.order" type="number" min="1" step="1" required />
            </div>

            <label class="switch-row">
              <span>
                <strong>Active Slide</strong>
                <small>Display this slide on the homepage.</small>
              </span>
              <input v-model="form.active" type="checkbox" />
              <span class="switch"></span>
            </label>
          </div>

          <div class="modal-actions">
            <button type="button" class="cancel-button" :disabled="saving" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="save-button" :disabled="saving">
              <i :class="saving ? 'bi bi-arrow-repeat loading-icon' : 'bi bi-check-lg'"></i>
              {{ saving ? 'Saving...' : editingId !== null ? 'Save Changes' : 'Create Slide' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-page{width:100%;max-width:1500px;margin:0 auto;padding:18px 20px 30px;color:#17251b}
.page-header{display:flex;align-items:flex-end;justify-content:space-between;gap:15px;margin-bottom:13px}
.breadcrumb{display:flex;align-items:center;gap:6px;margin-bottom:5px;color:#849088;font-size:11px}
.breadcrumb i{font-size:9px}.breadcrumb strong{color:#55705c;font-weight:600}
.page-header h1{margin:0;color:#163c20;font-size:24px;font-weight:750;line-height:1.15}
.page-header p{margin:4px 0 0;color:#7b877f;font-size:12px}
.primary-button{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:34px;padding:0 13px;border:0;border-radius:7px;background:#104717;color:#fff;font-size:12px;font-weight:650;cursor:pointer;transition:.2s}
.primary-button:hover{background:#0b3712;transform:translateY(-1px)}
button:disabled{opacity:.55;cursor:not-allowed;transform:none!important}
.summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}
.summary-card{display:flex;align-items:center;gap:10px;min-height:70px;padding:11px 13px;border:1px solid #e5ebe6;border-radius:9px;background:#fff;box-shadow:0 2px 8px #00000008}
.summary-icon{display:grid;width:36px;height:36px;flex:0 0 36px;place-items:center;border-radius:8px;background:#eaf3eb;color:#104717;font-size:16px}
.summary-icon.active{background:#e8f6ed;color:#218044}.summary-icon.order{background:#f4f0df;color:#8a6d19}
.summary-card span{display:block;color:#89938d;font-size:10px}.summary-card strong{display:block;margin-top:1px;color:#193820;font-size:19px;line-height:1.1}
.toolbar-card{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px;padding:10px 12px;border:1px solid #e5ebe6;border-radius:9px;background:#fff;box-shadow:0 2px 8px #00000008}
.search-box{position:relative;width:min(330px,100%)}.search-box>i{position:absolute;top:50%;left:10px;color:#87928b;font-size:12px;transform:translateY(-50%)}
.search-box input{width:100%;height:31px;padding:0 30px;border:1px solid #dfe6e1;border-radius:6px;outline:0;color:#26372b;font-size:11px}
.search-box input:focus{border-color:#104717;box-shadow:0 0 0 2px #10471712}
.search-box button{position:absolute;top:50%;right:6px;display:grid;width:20px;height:20px;place-items:center;border:0;border-radius:4px;background:transparent;color:#7c8780;cursor:pointer;transform:translateY(-50%)}
.result-count{color:#8a948d;font-size:10px}
.slides-list{display:flex;flex-direction:column;gap:9px}
.slide-card{display:grid;grid-template-columns:280px minmax(0,1fr);min-width:0;overflow:hidden;border:1px solid #e5ebe6;border-radius:9px;background:#fff;box-shadow:0 2px 8px #00000008}
.slide-preview{position:relative;min-height:155px;overflow:hidden;background:#edf2ee}.slide-preview img{display:block;width:100%;height:100%;min-height:155px;object-fit:cover}
.preview-placeholder{display:flex;height:100%;min-height:155px;flex-direction:column;align-items:center;justify-content:center;gap:5px;color:#8a978f}
.preview-placeholder i{font-size:27px}.preview-placeholder span{font-size:9px}
.order-badge{position:absolute;top:8px;left:8px;padding:4px 7px;border-radius:5px;background:#104717e6;color:#fff;font-size:9px;font-weight:700}
.status-badge{position:absolute;right:8px;bottom:8px;display:inline-flex;align-items:center;gap:5px;padding:4px 7px;border-radius:20px;background:#ebf9eff2;color:#267340;font-size:9px;font-weight:650}
.status-badge span{width:5px;height:5px;border-radius:50%;background:currentColor}.status-badge.inactive{background:#f4f5f4f2;color:#7d8781}
.slide-content{display:flex;min-width:0;flex-direction:column;justify-content:space-between;padding:13px 15px}
.slide-heading h2{margin:0;color:#29432f;font-size:15px;font-weight:700}.slide-heading p{max-width:760px;margin:4px 0 0;color:#7b867f;font-size:10px;line-height:1.5;overflow-wrap:anywhere}
.slide-meta{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}.slide-meta span{display:inline-flex;align-items:center;gap:4px;max-width:100%;overflow-wrap:anywhere;padding:4px 7px;border-radius:5px;background:#f3f6f4;color:#66736b;font-size:8px}
.slide-actions{display:flex;align-items:center;justify-content:flex-end;gap:5px;margin-top:10px}
.order-actions{display:flex;gap:3px;margin-right:auto}.order-actions button,.delete-button{display:grid;width:27px;height:27px;place-items:center;border:1px solid #e1e7e2;border-radius:5px;background:#fff;color:#65726a;font-size:10px;cursor:pointer}
.order-actions button:hover{background:#f4f8f5;color:#104717}
.status-button,.edit-button{display:inline-flex;align-items:center;gap:5px;min-height:27px;padding:0 8px;border:1px solid #e1e7e2;border-radius:5px;background:#fff;color:#5e6d64;font-size:9px;cursor:pointer}
.edit-button{color:#104717}.status-button:hover,.edit-button:hover{background:#f5f8f5}
.delete-button:hover{border-color:#f0caca;background:#fff6f6;color:#c53d3d}
.empty-state{display:flex;min-height:180px;flex-direction:column;align-items:center;justify-content:center;gap:5px;border:1px solid #e5ebe6;border-radius:9px;background:#fff;color:#8b968f}
.empty-state i{margin-bottom:3px;font-size:25px}.empty-state strong{color:#506058;font-size:12px}.empty-state span{font-size:10px}
.notice{display:flex;align-items:flex-start;gap:8px;margin:0 0 10px;padding:10px 12px;border:1px solid;border-radius:7px;font-size:11px;line-height:1.5}
.notice>i{margin-top:1px}.notice>span{flex:1;overflow-wrap:anywhere}.notice>button{border:0;background:transparent;color:inherit;cursor:pointer}
.success-notice{border-color:#cce7d2;background:#f0faf2;color:#246c36}.error-notice{border-color:#f0cccc;background:#fff5f5;color:#a32e2e}.form-error{margin-bottom:12px}
.hidden-input{display:none}
.modal-backdrop{position:fixed;z-index:1000;inset:0;display:grid;place-items:center;padding:15px;background:#0a1c0f7a}
.modal{width:min(500px,100%);max-height:92vh;overflow-y:auto;border-radius:10px;background:#fff;box-shadow:0 18px 50px #0000002e}
.modal-header{display:flex;align-items:flex-start;justify-content:space-between;padding:14px 16px 11px;border-bottom:1px solid #edf1ee}
.modal-label{color:#799080;font-size:8px;font-weight:750;letter-spacing:.08em}.modal h2{margin:2px 0 0;color:#183a20;font-size:17px}
.modal-header>button{display:grid;width:27px;height:27px;place-items:center;border:0;border-radius:5px;background:#f3f6f4;color:#68746c;cursor:pointer}
.modal form{padding:13px 16px 16px}.form-group{margin-bottom:10px}.form-group label{display:block;margin-bottom:4px;color:#405148;font-size:10px;font-weight:650}.form-group label span{color:#c34444}.form-group label small{color:#89938d;font-size:9px;font-weight:400}
.form-group input,.form-group textarea{width:100%;border:1px solid #dfe6e1;border-radius:6px;outline:0;background:#fff;color:#29392f;font-family:inherit;font-size:10px}
.form-group input{height:33px;padding:0 9px}.form-group textarea{padding:8px 9px;resize:vertical}
.form-group input:focus,.form-group textarea:focus{border-color:#104717;box-shadow:0 0 0 2px #1047170f}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.image-upload{display:flex;width:100%;min-height:100px;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:1px dashed #bdcdbf;border-radius:7px;background:#fafcfb;color:#718077;cursor:pointer}
.image-upload:hover{border-color:#104717;background:#f5faf6}.image-upload i{color:#104717;font-size:21px}.image-upload span{font-size:10px;font-weight:650}.image-upload small{color:#9ba49e;font-size:8px}
.modal-image{position:relative;overflow:hidden;border-radius:7px;background:#eef2ef}.modal-image img{display:block;width:100%;height:145px;object-fit:cover}
.image-buttons{position:absolute;right:7px;bottom:7px;display:flex;gap:4px}.image-buttons button{display:inline-flex;align-items:center;gap:4px;min-height:26px;padding:0 7px;border:0;border-radius:4px;background:#fffffff2;color:#526057;font-size:8px;font-weight:650;cursor:pointer}
.image-buttons button.remove{color:#bc4040}
.switch-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:3px 0 8px;cursor:pointer}
.switch-row>span:first-child{display:flex;flex-direction:column;gap:2px}.switch-row strong{color:#405148;font-size:10px}.switch-row small{color:#89938d;font-size:8px}
.switch-row input{position:absolute;width:1px;height:1px;opacity:0}.switch{position:relative;width:32px;height:18px;flex:0 0 32px;border-radius:20px;background:#ccd5ce;transition:.2s}
.switch:after{position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:#fff;content:'';transition:.2s}
.switch-row input:checked+.switch{background:#104717}.switch-row input:checked+.switch:after{left:17px}
.modal-actions{display:flex;justify-content:flex-end;gap:6px;margin-top:10px;padding-top:10px;border-top:1px solid #edf1ee}
.cancel-button,.save-button{min-height:32px;padding:0 11px;border-radius:6px;font-size:9px;font-weight:650;cursor:pointer}
.cancel-button{border:1px solid #dfe6e1;background:#fff;color:#65726a}
.save-button{display:inline-flex;align-items:center;gap:5px;border:0;background:#104717;color:#fff}.save-button:hover{background:#0b3712}
.loading-icon{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:850px){.hero-page{padding:14px 14px 25px}.slide-card{grid-template-columns:220px minmax(0,1fr)}.slide-preview,.slide-preview img,.preview-placeholder{min-height:140px}}
@media(max-width:700px){.page-header{align-items:flex-start;flex-direction:column}.primary-button{width:100%}.summary-grid{grid-template-columns:1fr}.slide-card{grid-template-columns:1fr}.slide-preview,.slide-preview img{height:180px;min-height:180px}.preview-placeholder{min-height:180px}.slide-content{padding:11px}.slide-actions{flex-wrap:wrap;justify-content:flex-start}.order-actions{margin-right:auto}}
@media(max-width:500px){.toolbar-card{align-items:stretch;flex-direction:column}.search-box{width:100%}.form-grid{grid-template-columns:1fr;gap:0}.modal{max-height:95vh}}
</style>
