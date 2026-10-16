
<script setup lang="ts">

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

interface Category {
  id: number
  name: string
  slug?: string
}

interface WebsiteSection {
  id: number
  name: string
  slug?: string
  is_active?: boolean
}

interface PostResponse {
  id: number
  category_id: number
  category?: { id?: number; name?: string } | string | null
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  image_path: string | null
  image_url?: string | null
  is_featured: boolean | number | string
  status: 'draft' | 'published'
  published_at: string | null
  sections?: WebsiteSection[]
}

const router = useRouter()
const TIME_ZONE = 'Asia/Shanghai'
const UTC_OFFSET = '+08:00'

const title = ref('')
const description = ref('')
const content = ref('')
const category = ref<number | ''>('')
const selectedSections = ref<number[]>([])
const imagePreview = ref('')
const featured = ref(false)
const published = ref(true)
const imageInput = ref<HTMLInputElement | null>(null)
const contentEditor = ref<HTMLDivElement | null>(null)
const selectedImage = ref<File | null>(null)
const categories = ref<Category[]>([])
const sections = ref<WebsiteSection[]>([])
const loading = ref(false)
const saving = ref(false)
const pageError = ref('')
const successMessage = ref('')
const originalImagePath = ref<string | null>(null)
const removeExistingImage = ref(false)

function getBeijingDateTime(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)

  const values = Object.fromEntries(
    parts.map(part => [part.type, part.value]),
  )

  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`
}

function getMinimumPublishDateTime(): string {
  const now = Date.now()
  const nextMinute = new Date(Math.ceil(now / 60000) * 60000)
  return getBeijingDateTime(nextMinute)
}

/**
 * Interpret datetime-local input as Beijing time (UTC+08:00),
 * not the computer's configured local time.
 */
function beijingDateTimeToISO(value: string): string {
  if (!value) return ''

  const match = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/,
  )

  if (!match) return ''

  const [, year, month, day, hour, minute] = match

  return new Date(
    `${year}-${month}-${day}T${hour}:${minute}:00${UTC_OFFSET}`,
  ).toISOString()
}

/**
 * Display an API timestamp as Beijing date/time in the input.
 */
function isoToBeijingDateTime(value: string | null | undefined): string {
  if (!value) return getMinimumPublishDateTime()

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return getMinimumPublishDateTime()
  }

  return getBeijingDateTime(date)
}

const publishDateTime = ref(getMinimumPublishDateTime())
const minPublishDateTime = ref(getMinimumPublishDateTime())

let redirectTimer: ReturnType<typeof setTimeout> | null = null
let clockTimer: ReturnType<typeof setInterval> | null = null

const editId = computed<number | null>(() => {
  const value = router.currentRoute.value.query.edit
  if (typeof value !== 'string' || !/^\d+$/.test(value)) return null
  const id = Number(value)
  return id > 0 ? id : null
})

const isEditMode = computed(() => editId.value !== null)
const pageTitle = computed(() => isEditMode.value ? 'Edit Post' : 'Create Post')
const pageDescription = computed(() =>
  isEditMode.value
    ? 'Update the selected website post.'
    : 'Create a new post for the SFXC website.',
)

onMounted(() => {
  clockTimer = setInterval(() => {
    minPublishDateTime.value = getMinimumPublishDateTime()
  }, 15000)

  void loadFormData()
})

watch(loading, async (isLoading) => {
  if (isLoading) return
  await nextTick()

  if (contentEditor.value) {
    contentEditor.value.innerHTML = content.value
  }
})

onBeforeUnmount(() => {
  releaseImagePreview()

  if (redirectTimer) clearTimeout(redirectTimer)
  if (clockTimer) clearInterval(clockTimer)
})

function showAlert(message: string) {
  window.alert(message)
}

function releaseImagePreview() {
  if (imagePreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value)
  }
}

function extractArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'data' in data) {
    const nested = (data as { data: unknown }).data
    if (Array.isArray(nested)) return nested as T[]
  }
  return []
}

function getImageUrl(path?: string | null): string {
  if (!path) return ''

  if (/^https?:\/\//i.test(path) || path.startsWith('blob:') || path.startsWith('data:')) {
    return path
  }

  const baseURL = api.defaults.baseURL || window.location.origin
  const origin = new URL(baseURL, window.location.origin).origin
  const cleanPath = path.replace(/^\/+/, '')

  if (cleanPath.startsWith('storage/')) {
    return `${origin}/${cleanPath}`
  }

  return `${origin}/storage/${cleanPath}`
}

async function loadFormData() {
  loading.value = true
  pageError.value = ''

  try {
    const [categoryResponse, sectionResponse] = await Promise.all([
      api.get('/api/v1/categories'),
      api.get('/api/v1/sections'),
    ])

    categories.value = extractArray<Category>(categoryResponse.data)

    sections.value = extractArray<WebsiteSection>(sectionResponse.data)
      .filter(section => section.is_active !== false)

    if (isEditMode.value && editId.value !== null) {
      await loadPost(editId.value)
    } else if (router.currentRoute.value.query.edit !== undefined) {
      pageError.value = 'The post ID is missing or invalid. Return to Posts and select Edit again.'
    }
  } catch (error: unknown) {
    pageError.value = getErrorMessage(
      error,
      'Unable to load categories and website sections.',
    )
  } finally {
    loading.value = false
  }
}

async function loadPost(id: number) {
  try {
    const response = await api.get(`/api/v1/posts/${id}`)
    const responseData = response.data
    const post = responseData?.data ?? responseData

    title.value = post?.title ?? ''
    description.value = post?.excerpt ?? ''
    content.value = typeof post?.content === 'string' ? post.content : ''

    const postCategoryId = post?.category_id ??
      (typeof post?.category === 'object' && post.category !== null
        ? post.category.id
        : undefined)

    category.value = postCategoryId ? Number(postCategoryId) : ''

    featured.value =
      post?.is_featured === true ||
      post?.is_featured === 1 ||
      post?.is_featured === '1'

    published.value = post?.status === 'published'

    publishDateTime.value = isoToBeijingDateTime(post?.published_at)

    selectedSections.value = Array.isArray(post?.sections)
      ? post.sections
          .map((section: WebsiteSection) => Number(section.id))
          .filter((sectionId: number) => Number.isFinite(sectionId))
      : []

    originalImagePath.value = post?.image_path ?? null
    removeExistingImage.value = false
    selectedImage.value = null

    releaseImagePreview()
    imagePreview.value = getImageUrl(post?.image_url || post?.image_path)

    if (!content.value.trim()) {
      console.warn('The post response does not contain content.')
    }
  } catch (error: unknown) {
    console.error('Failed to load post:', error)
    pageError.value = getErrorMessage(
      error,
      'Failed to load the selected post. Please try again.',
    )
  }
}

function handleContentInput() {
  content.value = contentEditor.value?.innerHTML ?? ''
}

function formatContent(command: string, value?: string) {
  const editor = contentEditor.value
  if (!editor) return

  editor.focus()
  document.execCommand(command, false, value)
  handleContentInput()
}

function insertLink() {
  const url = window.prompt('Enter the link URL:')
  if (!url) return

  const trimmedUrl = url.trim()

  if (!/^(https?:\/\/|mailto:|\/)/i.test(trimmedUrl)) {
    showAlert('Enter a valid URL beginning with https://, http://, mailto:, or /.')
    return
  }

  formatContent('createLink', trimmedUrl)
}

function insertContentImage() {
  const url = window.prompt('Enter the image URL:')
  if (!url) return

  const trimmedUrl = url.trim()

  if (!/^https?:\/\//i.test(trimmedUrl)) {
    showAlert('Please enter an image URL beginning with https:// or http://.')
    return
  }

  formatContent('insertImage', trimmedUrl)
}

function toggleSection(sectionId: number) {
  selectedSections.value = selectedSections.value.includes(sectionId)
    ? selectedSections.value.filter(id => id !== sectionId)
    : [...selectedSections.value, sectionId]
}

function selectAllSections() {
  selectedSections.value = sections.value.map(section => section.id)
}

function clearSections() {
  selectedSections.value = []
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
    showAlert('Choose a JPG, PNG, or WEBP image.')
    target.value = ''
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    showAlert('The image must not exceed 5 MB.')
    target.value = ''
    return
  }

  releaseImagePreview()
  selectedImage.value = file
  imagePreview.value = URL.createObjectURL(file)
  removeExistingImage.value = false
}

function removeImage() {
  releaseImagePreview()
  imagePreview.value = ''
  selectedImage.value = null

  if (originalImagePath.value) {
    removeExistingImage.value = true
  }

  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

function saveDraft() {
  published.value = false
  void submitPost()
}

function publishPost() {
  published.value = true
  void submitPost()
}

function showSuccessAndReturn(message: string) {
  successMessage.value = message

  if (redirectTimer) clearTimeout(redirectTimer)

  redirectTimer = setTimeout(() => {
    void router.push({
      path: '/admin/posts',
      query: {
        refresh: String(Date.now()),
        message,
      },
    })
  }, 1000)
}

async function submitPost() {
  if (saving.value) return

  pageError.value = ''
  successMessage.value = ''

  if (redirectTimer) {
    clearTimeout(redirectTimer)
    redirectTimer = null
  }

  if (!title.value.trim()) {
    showAlert('Please enter a post title.')
    return
  }

  if (!category.value) {
    showAlert('Please select a category.')
    return
  }

  if (selectedSections.value.length === 0) {
    showAlert('Please select at least one website section.')
    return
  }

  let publishedAtISO = ''

  if (published.value) {
    if (!publishDateTime.value) {
      showAlert('Please select a publication date and time.')
      return
    }

    publishedAtISO = beijingDateTimeToISO(publishDateTime.value)

    if (!publishedAtISO || new Date(publishedAtISO).getTime() < Date.now()) {
      minPublishDateTime.value = getMinimumPublishDateTime()
      showAlert('The publication date and time cannot be in the past. Please select the current or a future time.')
      return
    }
  }

  handleContentInput()

  const formData = new FormData()
  formData.append('category_id', String(category.value))
  formData.append('title', title.value.trim())
  formData.append('excerpt', description.value.trim())
  formData.append('content', content.value)
  formData.append('is_featured', featured.value ? '1' : '0')
  formData.append('status', published.value ? 'published' : 'draft')

  if (published.value) {
    formData.append('published_at', publishedAtISO)
  }

  selectedSections.value.forEach((sectionId, index) => {
    formData.append(`section_ids[${index}]`, String(sectionId))
  })

  if (selectedImage.value) {
    formData.append('image', selectedImage.value)
  }

  if (isEditMode.value && removeExistingImage.value) {
    formData.append('remove_image', '1')
  }

  saving.value = true

  try {
    if (isEditMode.value && editId.value !== null) {
      formData.append('_method', 'PUT')

      await api.post(`/api/v1/posts/${editId.value}`, formData, {
        headers: { Accept: 'application/json' },
      })

      showSuccessAndReturn(
        published.value
          ? 'Post updated and published successfully.'
          : 'Post updated and saved as a draft.',
      )
    } else {
      await api.post('/api/v1/posts', formData, {
        headers: { Accept: 'application/json' },
      })

      showSuccessAndReturn(
        published.value
          ? 'Post published successfully.'
          : 'Post saved as a draft.',
      )
    }
  } catch (error: unknown) {
    pageError.value = getErrorMessage(
      error,
      'Unable to save the post. Please try again.',
    )
  } finally {
    saving.value = false
  }
}

function getErrorMessage(error: unknown, fallback: string): string {
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
    return 'You do not have permission to manage posts.'
  }

  if (status === 419) {
    return 'Your session or CSRF token has expired. Refresh the page and log in again.'
  }

  if (status === 422) {
    const errors = data?.errors

    if (errors && typeof errors === 'object') {
      const firstError = Object.values(errors).flat()[0]
      if (typeof firstError === 'string') return firstError
    }

    return data?.message || 'Please check the information you entered.'
  }

  if (status === 500) {
    return data?.message
      ? `Server error: ${data.message}`
      : 'A Laravel server error occurred. Check the Laravel log for details.'
  }

  return data?.message || err.message || fallback
}

function dismissSuccess() {
  successMessage.value = ''

  if (redirectTimer) {
    clearTimeout(redirectTimer)
    redirectTimer = null
  }
}

function dismissError() {
  pageError.value = ''
}

function cancel() {
  if (redirectTimer) {
    clearTimeout(redirectTimer)
    redirectTimer = null
  }

  void router.push('/admin/posts')
}

</script>

<template>
  <div class="create-post-page">
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <button type="button" @click="cancel">Posts</button>
          <i class="bi bi-chevron-right"></i>
          <strong>{{ pageTitle }}</strong>
        </div>
        <h1>{{ pageTitle }}</h1>
        <p>{{ pageDescription }}</p>
      </div>

      <button type="button" class="back-button" @click="cancel">
        <i class="bi bi-arrow-left"></i>
        Back to Posts
      </button>
    </div>

    <div v-if="successMessage" class="notice success-notice" role="status">
      <i class="bi bi-check-circle"></i>
      <span>{{ successMessage }}</span>
      <button type="button" aria-label="Dismiss success message" @click="dismissSuccess">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div v-if="pageError" class="notice error-notice" role="alert">
      <i class="bi bi-exclamation-circle"></i>
      <span>{{ pageError }}</span>
      <button type="button" aria-label="Dismiss error" @click="dismissError">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <i class="bi bi-arrow-repeat spin"></i>
      Loading post information...
    </div>

    <div v-else class="editor-layout">
      <main class="editor-main">
        <section class="editor-card">
          <div class="card-heading">
            <div class="heading-icon"><i class="bi bi-file-earmark-text"></i></div>
            <div>
              <h2>Post Information</h2>
              <p>Enter the main details of your post.</p>
            </div>
          </div>

          <div class="form-group">
            <label for="title">Post Title <span>*</span></label>
            <input
              id="title"
              v-model="title"
              type="text"
              maxlength="255"
              placeholder="Enter your post title..."
            />
          </div>

          <div class="form-group">
            <label for="description">Short Description</label>
            <textarea
              id="description"
              v-model="description"
              rows="3"
              maxlength="500"
              placeholder="Write a short summary that will appear in post listings..."
            ></textarea>
            <small>Keep this short and informative. Maximum 500 characters.</small>
          </div>

          <div class="form-group content-group">
            <label for="content">Content</label>

            <div class="editor-toolbar">
              <button type="button" title="Bold" aria-label="Bold" @mousedown.prevent @click="formatContent('bold')">
                <i class="bi bi-type-bold"></i>
              </button>
              <button type="button" title="Italic" aria-label="Italic" @mousedown.prevent @click="formatContent('italic')">
                <i class="bi bi-type-italic"></i>
              </button>
              <button type="button" title="Underline" aria-label="Underline" @mousedown.prevent @click="formatContent('underline')">
                <i class="bi bi-type-underline"></i>
              </button>
              <button type="button" title="Strikethrough" aria-label="Strikethrough" @mousedown.prevent @click="formatContent('strikeThrough')">
                <i class="bi bi-type-strikethrough"></i>
              </button>

              <span class="toolbar-divider"></span>

              <select aria-label="Text format" title="Text format" @mousedown.prevent @change="formatContent('formatBlock', ($event.target as HTMLSelectElement).value)">
                <option value="p">Paragraph</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="blockquote">Quote</option>
              </select>

              <span class="toolbar-divider"></span>

              <button type="button" title="Align left" aria-label="Align left" @mousedown.prevent @click="formatContent('justifyLeft')">
                <i class="bi bi-text-left"></i>
              </button>
              <button type="button" title="Center" aria-label="Center" @mousedown.prevent @click="formatContent('justifyCenter')">
                <i class="bi bi-text-center"></i>
              </button>
              <button type="button" title="Align right" aria-label="Align right" @mousedown.prevent @click="formatContent('justifyRight')">
                <i class="bi bi-text-right"></i>
              </button>

              <span class="toolbar-divider"></span>

              <button type="button" title="Bulleted list" aria-label="Bulleted list" @mousedown.prevent @click="formatContent('insertUnorderedList')">
                <i class="bi bi-list-ul"></i>
              </button>
              <button type="button" title="Numbered list" aria-label="Numbered list" @mousedown.prevent @click="formatContent('insertOrderedList')">
                <i class="bi bi-list-ol"></i>
              </button>

              <span class="toolbar-divider"></span>

              <button type="button" title="Insert link" aria-label="Insert link" @mousedown.prevent @click="insertLink">
                <i class="bi bi-link-45deg"></i>
              </button>
              <button type="button" title="Insert image from URL" aria-label="Insert image" @mousedown.prevent @click="insertContentImage">
                <i class="bi bi-image"></i>
              </button>
              <button type="button" title="Remove formatting" aria-label="Remove formatting" @mousedown.prevent @click="formatContent('removeFormat')">
                <i class="bi bi-eraser"></i>
              </button>
            </div>

            <div
              id="content"
              ref="contentEditor"
              class="content-input"
              contenteditable="true"
              role="textbox"
              aria-label="Post content editor"
              aria-multiline="true"
              data-placeholder="Write the full post content here..."
              @input="handleContentInput"
            ></div>

            <small>
              Format your content using the toolbar. You can add headings, bold or italic text,
              lists, links, and images from a URL.
            </small>
          </div>
        </section>

        <section class="editor-card image-card">
          <div class="card-heading">
            <div class="heading-icon"><i class="bi bi-image"></i></div>
            <div>
              <h2>Featured Image</h2>
              <p>Choose the main image for this post.</p>
            </div>
          </div>

          <input
            ref="imageInput"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            class="hidden-input"
            @change="handleImage"
          />

          <div
            v-if="!imagePreview"
            class="upload-box"
            role="button"
            tabindex="0"
            @click="openImagePicker"
            @keydown.enter.prevent="openImagePicker"
            @keydown.space.prevent="openImagePicker"
          >
            <div class="upload-icon"><i class="bi bi-cloud-arrow-up"></i></div>
            <strong>{{ isEditMode ? 'Upload or Replace Featured Image' : 'Upload Featured Image' }}</strong>
            <span>Click to browse from your computer</span>
            <small>JPG, PNG, WEBP · Maximum 5 MB</small>
          </div>

          <div v-else class="image-preview">
            <img
              :src="imagePreview"
              alt="Featured image preview"
              @error="(event) => (event.target as HTMLImageElement).classList.add('image-load-error')"
            />
            <div class="image-overlay">
              <button type="button" @click="openImagePicker">
                <i class="bi bi-arrow-repeat"></i> Change
              </button>
              <button type="button" class="remove" @click="removeImage">
                <i class="bi bi-trash3"></i> Remove
              </button>
            </div>
            <div class="image-error-message">
              <i class="bi bi-exclamation-triangle"></i>
              Image preview could not load. Check the image URL or choose another image.
            </div>
          </div>
        </section>
      </main>

      <aside class="editor-sidebar">
        <section class="editor-card">
          <div class="side-heading"><h2>Publishing</h2></div>
          <div class="form-group compact">
            <label for="publish-date">Publish Date &amp; Time</label>
            <div class="input-icon">
              <i class="bi bi-calendar3"></i>
              <input
                id="publish-date"
                v-model="publishDateTime"
                type="datetime-local"
                :min="minPublishDateTime"
                step="60"
                :disabled="!published"
                required
              />
            </div>
            <small>
              Beijing time (UTC+08:00). Past dates and times are not allowed.
            </small>
          </div>
          <label class="switch-row">
            <span>
              <strong>Published</strong>
              <small>Show this post on the website.</small>
            </span>
            <input v-model="published" type="checkbox" />
            <span class="switch"></span>
          </label>

          <label class="switch-row">
            <span>
              <strong>Featured</strong>
              <small>Highlight this post in featured areas.</small>
            </span>
            <input v-model="featured" type="checkbox" />
            <span class="switch"></span>
          </label>
        </section>

        <section class="editor-card">
          <div class="side-heading">
            <h2>Category</h2>
            <span>*</span>
          </div>

          <div class="select-wrapper">
            <select v-model="category">
              <option value="" disabled>Select category</option>
              <option v-for="item in categories" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
            <i class="bi bi-chevron-down"></i>
          </div>

          <small v-if="categories.length === 0" class="empty-hint">
            No categories found. Add a category before creating a post.
          </small>
        </section>

        <section class="editor-card">
          <div class="side-heading">
            <div>
              <h2>Website Sections</h2>
              <p>Select where this post should appear.</p>
            </div>
            <span>*</span>
          </div>

          <div class="section-actions">
            <button type="button" @click="selectAllSections">Select all</button>
            <button type="button" @click="clearSections">Clear</button>
          </div>

          <div class="section-list">
            <label
              v-for="section in sections"
              :key="section.id"
              class="section-option"
              :class="{ selected: selectedSections.includes(section.id) }"
            >
              <input
                type="checkbox"
                :checked="selectedSections.includes(section.id)"
                @change="toggleSection(section.id)"
              />
              <span class="check-box"><i class="bi bi-check"></i></span>
              <span class="section-option-text">{{ section.name }}</span>
            </label>

            <p v-if="sections.length === 0" class="empty-hint">
              No active website sections found.
            </p>
          </div>

          <div class="selected-count">
            <i class="bi bi-info-circle"></i>
            {{ selectedSections.length }} section{{ selectedSections.length === 1 ? '' : 's' }} selected
          </div>
        </section>

        <div class="form-actions">
          <button type="button" class="cancel-button" :disabled="saving" @click="cancel">
            Cancel
          </button>
          <button type="button" class="draft-button" :disabled="saving" @click="saveDraft">
            <i class="bi bi-file-earmark"></i>
            {{ saving && !published ? 'Saving...' : 'Save Draft' }}
          </button>
          <button type="button" class="publish-button" :disabled="saving" @click="publishPost">
            <i v-if="saving && published" class="bi bi-arrow-repeat spin"></i>
            <i v-else class="bi bi-send"></i>
            {{ saving && published ? 'Publishing...' : 'Publish' }}
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.create-post-page{width:100%;max-width:1450px;margin:0 auto;padding:18px 20px 30px;color:#17251b;box-sizing:border-box}
.page-header{display:flex;align-items:flex-end;justify-content:space-between;gap:15px;margin-bottom:13px}
.breadcrumb{display:flex;align-items:center;gap:6px;margin-bottom:5px;color:#849088;font-size:11px}
.breadcrumb button{padding:0;border:0;background:transparent;color:#65766b;font-size:11px;cursor:pointer}
.breadcrumb i{font-size:9px}.breadcrumb strong{color:#55705c;font-weight:600}
.page-header h1{margin:0;color:#163c20;font-size:24px;font-weight:750;line-height:1.15}
.page-header p{margin:4px 0 0;color:#7b877f;font-size:12px}
.back-button{display:inline-flex;align-items:center;gap:6px;min-height:32px;padding:0 11px;border:1px solid #dfe7e1;border-radius:6px;background:#fff;color:#56665c;font-size:10px;font-weight:600;cursor:pointer}
.back-button:hover{border-color:#b7c8ba;color:#104717}
.notice{display:flex;align-items:flex-start;gap:8px;margin:0 0 10px;padding:10px 12px;border:1px solid;border-radius:7px;font-size:11px;line-height:1.5}
.notice>i{margin-top:1px}.notice>span{flex:1;overflow-wrap:anywhere}.notice>button{border:0;background:transparent;color:inherit;cursor:pointer}
.success-notice{border-color:#cce7d2;background:#f0faf2;color:#246c36}
.error-notice{border-color:#f0cccc;background:#fff5f5;color:#a32e2e}
.editor-layout{display:grid;grid-template-columns:minmax(0,1fr) 330px;align-items:start;gap:12px;width:100%;min-width:0}
.editor-main,.editor-sidebar{display:flex;min-width:0;flex-direction:column;gap:10px}
.editor-card{min-width:0;border:1px solid #e4ebe6;border-radius:9px;background:#fff;box-shadow:0 2px 8px rgb(0 0 0 / 3%);box-sizing:border-box}
.editor-main .editor-card{padding:13px 15px}
.card-heading{display:flex;align-items:center;gap:9px;margin-bottom:13px;padding-bottom:9px;border-bottom:1px solid #edf1ee}
.heading-icon{display:grid;width:31px;height:31px;flex:0 0 31px;place-items:center;border-radius:7px;background:#edf5ee;color:#104717;font-size:13px}
.card-heading h2,.side-heading h2{margin:0;color:#24402b;font-size:13px;font-weight:700}
.card-heading p{margin:2px 0 0;color:#8a948d;font-size:9px}
.form-group{min-width:0;margin-bottom:12px}.form-group:last-child{margin-bottom:0}
.form-group label{display:block;margin-bottom:5px;color:#405148;font-size:10px;font-weight:650}
.form-group label span,.side-heading>span{color:#c34444}
.form-group input,.form-group textarea{display:block;width:100%;max-width:100%;border:1px solid #dfe6e1;border-radius:6px;outline:0;background:#fff;color:#29392f;font-family:inherit;font-size:11px;box-sizing:border-box}
.form-group input{height:34px;padding:0 10px}
.form-group textarea{padding:8px 10px;resize:vertical;line-height:1.5}
.form-group input:focus,.form-group textarea:focus,.content-input:focus{border-color:#104717;box-shadow:0 0 0 2px rgb(16 71 23 / 6%)}
.form-group small{display:block;margin-top:5px;color:#929b95;font-size:9px;line-height:1.5}
.content-group{min-width:0;width:100%}
.editor-toolbar{display:flex;align-items:center;gap:3px;min-height:38px;padding:5px;border:1px solid #dfe6e1;border-bottom:0;border-radius:6px 6px 0 0;background:#f8faf9;flex-wrap:wrap;box-sizing:border-box}
.editor-toolbar button{display:grid;width:30px;height:29px;flex:0 0 30px;place-items:center;border:0;border-radius:4px;background:transparent;color:#52645a;font-size:14px;cursor:pointer}
.editor-toolbar button:hover,.editor-toolbar button:focus-visible{background:#e3eee5;color:#104717;outline:0}
.editor-toolbar button:active{background:#d7e7da}
.editor-toolbar .toolbar-divider{width:1px;height:19px;flex:0 0 1px;margin:0 3px;background:#dfe5e1}
.editor-toolbar select{max-width:115px;height:29px;padding:0 6px;border:1px solid #dfe6e1;border-radius:4px;background:#fff;color:#526158;font-family:inherit;font-size:10px}
.content-input{display:block;width:100%;min-width:0;min-height:280px;max-width:100%;padding:12px;border:1px solid #dfe6e1;border-radius:0 0 6px 6px;outline:0;background:#fff;color:#29392f;font-family:inherit;font-size:12px;line-height:1.7;overflow-wrap:anywhere;box-sizing:border-box;white-space:normal;overflow-y:auto}
.content-input:empty::before{content:attr(data-placeholder);color:#9aa49d;pointer-events:none}
.content-input:focus{border-color:#104717}
.content-input p{margin:0 0 10px}
.content-input h2{margin:18px 0 9px;font-size:1.5em;font-weight:700}
.content-input h3{margin:16px 0 8px;font-size:1.25em;font-weight:700}
.content-input h4{margin:14px 0 7px;font-size:1.1em;font-weight:700}
.content-input ul,.content-input ol{padding-left:25px}
.content-input blockquote{margin:10px 0;padding:8px 12px;border-left:3px solid #104717;background:#f5f8f5;color:#5d6c62}
.content-input a{color:#176bca;text-decoration:underline}
.content-input img{display:inline-block;max-width:100%;height:auto}
.hidden-input{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;clip-path:inset(50%)}
.upload-box{display:flex;min-height:210px;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:20px;border:1px dashed #bfcfc2;border-radius:7px;background:#fafcfb;text-align:center;cursor:pointer;transition:.2s;box-sizing:border-box}
.upload-box:hover,.upload-box:focus-visible{border-color:#104717;background:#f5faf6;outline:2px solid #10471722}
.upload-icon{display:grid;width:42px;height:42px;margin-bottom:3px;place-items:center;border-radius:50%;background:#eaf3eb;color:#104717;font-size:19px}
.upload-box strong{color:#405348;font-size:11px}.upload-box span{color:#7e8982;font-size:10px}.upload-box small{color:#8b968f;font-size:9px}
.image-preview{position:relative;min-width:0;overflow:hidden;min-height:210px;border-radius:7px;background:#eef2ef}
.image-preview img{display:block;width:100%;height:280px;object-fit:contain;background:#eef2ef}
.image-preview img.image-load-error{display:none}
.image-overlay{position:absolute;right:10px;bottom:10px;display:flex;gap:5px;flex-wrap:wrap}
.image-overlay button{display:inline-flex;align-items:center;gap:5px;min-height:32px;padding:0 10px;border:0;border-radius:5px;background:rgb(255 255 255 / 96%);color:#46564c;font-size:10px;font-weight:650;cursor:pointer;box-shadow:0 1px 5px #00000018}
.image-overlay button:hover{background:#fff;color:#104717}
.image-overlay button.remove{color:#b53d3d}
.image-error-message{display:none;padding:25px 12px;color:#9a4b35;text-align:center;font-size:11px}
.image-preview img.image-load-error~.image-error-message{display:block}
.editor-sidebar>.editor-card{padding:12px}
.side-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:10px}
.side-heading p{margin:3px 0 0;color:#89948d;font-size:9px;line-height:1.5}
.form-group.compact{margin-bottom:9px}
.input-icon{position:relative}.input-icon i{position:absolute;top:50%;left:9px;color:#849089;font-size:11px;transform:translateY(-50%);pointer-events:none}
.input-icon input{width:100%;height:34px;padding:0 9px 0 28px;border:1px solid #dfe6e1;border-radius:6px;outline:0;color:#33443a;font-family:inherit;font-size:10px;box-sizing:border-box}
.input-icon input:focus{border-color:#104717}
.switch-row{position:relative;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 0;border-top:1px solid #f0f3f1;cursor:pointer}
.switch-row>span:first-child{display:flex;flex-direction:column;gap:3px}
.switch-row strong{color:#405148;font-size:10px}.switch-row small{color:#8c968f;font-size:8px;line-height:1.4}
.switch-row input{position:absolute;width:1px;height:1px;opacity:0}
.switch{position:relative;width:31px;height:17px;flex:0 0 31px;border-radius:20px;background:#cbd4cd;transition:.2s}
.switch::after{position:absolute;top:2.5px;left:3px;width:12px;height:12px;border-radius:50%;background:#fff;content:'';transition:.2s}
.switch-row input:checked+.switch{background:#104717}.switch-row input:checked+.switch::after{left:16px}
.switch-row input:focus-visible+.switch{outline:2px solid #104717;outline-offset:2px}
.select-wrapper{position:relative}
.select-wrapper select{width:100%;height:34px;appearance:none;padding:0 30px 0 9px;border:1px solid #dfe6e1;border-radius:6px;outline:0;background:#fff;color:#44534b;font-family:inherit;font-size:10px;cursor:pointer;box-sizing:border-box}
.select-wrapper select:focus{border-color:#104717}
.select-wrapper i{position:absolute;top:50%;right:10px;color:#7d8981;font-size:9px;pointer-events:none;transform:translateY(-50%)}
.section-actions{display:flex;justify-content:space-between;margin-bottom:6px}
.section-actions button{padding:0;border:0;background:transparent;color:#3e7148;font-size:9px;cursor:pointer}
.section-actions button:hover{color:#104717;text-decoration:underline}
.section-list{display:flex;flex-direction:column;gap:3px;max-height:240px;overflow-y:auto;padding-right:3px}
.section-option{display:flex;align-items:center;gap:7px;min-height:30px;padding:4px 6px;border:1px solid transparent;border-radius:5px;cursor:pointer;transition:.15s}
.section-option:hover{background:#f5f8f5}
.section-option.selected{border-color:#d9e7db;background:#f2f8f3}
.section-option input{position:absolute;width:1px;height:1px;opacity:0}
.check-box{display:grid;width:15px;height:15px;flex:0 0 15px;place-items:center;border:1px solid #ccd6cf;border-radius:4px;color:#fff;font-size:9px}
.section-option input:checked+.check-box{border-color:#104717;background:#104717}
.section-option input:focus-visible+.check-box{outline:2px solid #104717;outline-offset:2px}
.section-option-text{color:#526158;font-size:9px;overflow-wrap:anywhere}
.selected-count{display:flex;align-items:center;gap:5px;margin-top:8px;padding-top:8px;border-top:1px solid #edf1ee;color:#859089;font-size:9px}
.selected-count i{color:#6c8b73}
.form-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.form-actions button{display:flex;align-items:center;justify-content:center;gap:5px;min-width:0;min-height:34px;padding:5px;border-radius:6px;font-size:9px;font-weight:650;cursor:pointer}
.form-actions button:disabled{opacity:.6;cursor:not-allowed}
.cancel-button{grid-column:span 2;border:1px solid #dfe6e1;background:#fff;color:#68756d}
.cancel-button:hover:not(:disabled){background:#f7f9f7}
.draft-button{border:1px solid #d8e2da;background:#f4f7f4;color:#4e6055}
.draft-button:hover:not(:disabled){background:#eaf1eb}
.publish-button{border:1px solid #104717;background:#104717;color:#fff}
.publish-button:hover:not(:disabled){background:#0b3712}
.loading-state{display:flex;align-items:center;justify-content:center;gap:8px;min-height:180px;color:#607065;font-size:12px}
.empty-hint{display:block;margin-top:6px;color:#a05b30;font-size:9px;line-height:1.5}
.spin{display:inline-block;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:1050px){.editor-layout{grid-template-columns:minmax(0,1fr) 290px}}
@media(max-width:850px){.create-post-page{padding:14px 14px 25px}.editor-layout{grid-template-columns:minmax(0,1fr)}.editor-sidebar{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.editor-sidebar>.editor-card{min-width:0}.form-actions{grid-column:1/-1}}
@media(max-width:600px){.create-post-page{padding:12px 10px 22px}.page-header{align-items:flex-start;flex-direction:column}.back-button{width:100%;justify-content:center}.editor-sidebar{display:flex}.editor-main .editor-card{padding:11px}.card-heading{margin-bottom:10px}.content-input{min-height:220px}.upload-box{min-height:180px}.image-preview{min-height:180px}.image-preview img{height:220px}.editor-toolbar{gap:2px;padding:4px}.editor-toolbar button{width:28px;height:28px;flex-basis:28px}.editor-toolbar select{max-width:100px}}
@media(max-width:400px){.create-post-page{padding:10px 8px 18px}.page-header h1{font-size:21px}.form-actions{grid-template-columns:1fr}.cancel-button{grid-column:auto}.editor-toolbar .toolbar-divider{margin:0 1px}}
</style>
