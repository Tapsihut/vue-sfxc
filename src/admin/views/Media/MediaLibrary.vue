
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import api from '@/services/api'

interface MediaFile {
  id: number
  name: string
  url: string
  type: 'image' | 'document' | 'other'
  size: string
  date: string
  mime_type?: string
  path?: string
}

type AlertType = 'success' | 'error' | 'warning' | 'info'

const mediaFiles = ref<MediaFile[]>([])
const searchQuery = ref('')
const typeFilter = ref('all')
const viewMode = ref<'grid' | 'list'>('grid')
const showUploadModal = ref(false)
const showPreviewModal = ref(false)
const selectedFile = ref<MediaFile | null>(null)
const uploadFiles = ref<File[]>([])
const uploadPreviews = ref<string[]>([])
const isLoading = ref(false)
const isUploading = ref(false)
const alertMessage = ref('')
const alertType = ref<AlertType>('success')
const showAlert = ref(false)
let alertTimeout: ReturnType<typeof setTimeout> | undefined

const API_BASE_URL = String(api.defaults.baseURL || '').replace(/\/+$/, '')
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1$/, '').replace(/\/api$/, '').replace(/\/$/, '')
const MEDIA_ENDPOINT = API_BASE_URL.endsWith('/api/v1')
  ? '/admin/media'
  : API_BASE_URL.endsWith('/api')
    ? '/v1/admin/media'
    : '/api/v1/admin/media'

const filteredFiles = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return mediaFiles.value.filter(file => {
    const matchesSearch = !query || file.name.toLowerCase().includes(query)
    const matchesType = typeFilter.value === 'all' || file.type === typeFilter.value
    return matchesSearch && matchesType
  })
})

const imageCount = computed(() => mediaFiles.value.filter(file => file.type === 'image').length)
const documentCount = computed(() => mediaFiles.value.filter(file => file.type === 'document').length)

function displayAlert(message: string, type: AlertType = 'success') {
  if (alertTimeout) clearTimeout(alertTimeout)
  alertMessage.value = message
  alertType.value = type
  showAlert.value = true
  alertTimeout = setTimeout(() => {
    showAlert.value = false
    alertTimeout = undefined
  }, 5000)
}

function closeAlert() {
  showAlert.value = false
  if (alertTimeout) clearTimeout(alertTimeout)
  alertTimeout = undefined
}

function getErrorMessage(error: any): string {
  const data = error?.response?.data
  if (data?.errors) {
    const firstError = Object.values(data.errors).flat()[0]
    if (firstError) return String(firstError)
  }
  if (data?.message) return String(data.message)
  if (error?.response?.status === 401) return 'Your admin session has expired. Please log in again.'
  if (error?.response?.status === 403) return 'You do not have permission to manage media.'
  if (error?.response?.status === 404) return 'Media API route not found. Check your API base URL and Laravel routes.'
  if (error?.response?.status === 413) return 'The uploaded file is too large for the server.'
  if (!error?.response) return 'Cannot connect to the Laravel backend. Make sure the backend is running.'
  return 'Something went wrong. Please try again.'
}

function getFileTypeFromMime(mimeType: string, name: string): MediaFile['type'] {
  const mime = (mimeType || '').toLowerCase()
  const filename = (name || '').toLowerCase()
  if (mime.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)$/i.test(filename)) return 'image'
  if (mime === 'application/pdf' || mime.includes('document') || mime.includes('word') || /\.(pdf|doc|docx|rtf|txt)$/i.test(filename)) return 'document'
  return 'other'
}

function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(value: string): string {
  if (!value) return 'Unknown date'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

function normalizeUrl(value: string): string {
  if (!value) return ''
  if (/^https?:\/\//i.test(value) || value.startsWith('blob:') || value.startsWith('data:')) return value
  return `${API_ORIGIN}/${value.replace(/^\/+/, '')}`
}

function normalizeMedia(item: any): MediaFile {
  const name = item.name || item.original_name || item.file_name || item.filename || 'Unnamed file'
  const mimeType = item.mime_type || item.mimeType || ''
  const path = item.file_path || item.path || item.image_path || ''
  const rawUrl = item.url || item.file_url || item.image_url || item.full_url || item.public_url || path
  const allowedTypes: MediaFile['type'][] = ['image', 'document', 'other']
  const type: MediaFile['type'] = allowedTypes.includes(item.type)
    ? item.type
    : getFileTypeFromMime(mimeType, name)
  const size = Number(item.size ?? item.size_bytes ?? item.file_size ?? 0)

  return {
    id: Number(item.id),
    name,
    url: normalizeUrl(rawUrl),
    type,
    size: formatFileSize(size),
    date: formatDate(item.created_at || item.createdAt || ''),
    mime_type: mimeType,
    path
  }
}

function extractMedia(response: any): any[] {
  const body = response?.data
  if (Array.isArray(body)) return body
  if (Array.isArray(body?.data)) return body.data
  if (Array.isArray(body?.data?.data)) return body.data.data
  if (Array.isArray(body?.media)) return body.media
  if (Array.isArray(body?.files)) return body.files
  if (Array.isArray(body?.media?.data)) return body.media.data
  if (Array.isArray(body?.files?.data)) return body.files.data
  return []
}

async function fetchMedia(showErrors = true) {
  isLoading.value = true
  try {
    const response = await api.get(MEDIA_ENDPOINT)
    mediaFiles.value = extractMedia(response).map(normalizeMedia)
  } catch (error: any) {
    console.error('Media Library fetch error:', error)
    if (showErrors) displayAlert(getErrorMessage(error), 'error')
  } finally {
    isLoading.value = false
  }
}

function revokeUploadPreviews() {
  uploadPreviews.value.forEach(preview => {
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview)
  })
  uploadPreviews.value = []
}

function openUploadModal() {
  revokeUploadPreviews()
  uploadFiles.value = []
  showUploadModal.value = true
}

function closeUploadModal() {
  if (isUploading.value) return
  showUploadModal.value = false
  uploadFiles.value = []
  revokeUploadPreviews()
}

function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const selectedFiles = Array.from(input.files)
  const maxSize = 10 * 1024 * 1024
  const maxFiles = 20
  const allowedExtensions = /\.(jpg|jpeg|png|gif|webp|pdf|doc|docx)$/i
  const validFiles: File[] = []
  const rejectedFiles: string[] = []

  selectedFiles.forEach(file => {
    if (file.size > maxSize) rejectedFiles.push(`${file.name} (over 10 MB)`)
    else if (!allowedExtensions.test(file.name)) rejectedFiles.push(`${file.name} (unsupported file type)`)
    else validFiles.push(file)
  })

  if (validFiles.length > maxFiles) {
    rejectedFiles.push(`Only ${maxFiles} files can be uploaded at once.`)
    validFiles.splice(maxFiles)
  }

  if (rejectedFiles.length) displayAlert(`Some files were excluded: ${rejectedFiles.join(', ')}`, 'warning')

  revokeUploadPreviews()
  uploadFiles.value = validFiles
  uploadPreviews.value = validFiles.map(file => file.type.startsWith('image/') ? URL.createObjectURL(file) : '')
  input.value = ''
}

function removeSelectedFile(index: number) {
  const preview = uploadPreviews.value[index]
  if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview)
  uploadFiles.value.splice(index, 1)
  uploadPreviews.value.splice(index, 1)
}

async function saveUploads() {
  if (!uploadFiles.value.length) {
    displayAlert('Please select at least one file.', 'warning')
    return
  }
  if (isUploading.value) return

  isUploading.value = true
  try {
    const formData = new FormData()
    uploadFiles.value.forEach(file => formData.append('files[]', file))
    await api.post(MEDIA_ENDPOINT, formData, { headers: { Accept: 'application/json' } })
    showUploadModal.value = false
    uploadFiles.value = []
    revokeUploadPreviews()
    await fetchMedia(false)
    displayAlert('Files uploaded successfully.', 'success')
  } catch (error: any) {
    console.error('Media upload error:', error)
    displayAlert(getErrorMessage(error), 'error')
  } finally {
    isUploading.value = false
  }
}

function openPreview(file: MediaFile) {
  selectedFile.value = file
  showPreviewModal.value = true
}

function closePreview() {
  showPreviewModal.value = false
  selectedFile.value = null
}

async function deleteFile(file: MediaFile) {
  if (!confirm(`Are you sure you want to delete "${file.name}"?`)) return
  try {
    await api.delete(`${MEDIA_ENDPOINT}/${file.id}`)
    mediaFiles.value = mediaFiles.value.filter(item => item.id !== file.id)
    if (selectedFile.value?.id === file.id) closePreview()
    displayAlert('File deleted successfully.', 'success')
  } catch (error: any) {
    console.error('Media deletion error:', error)
    displayAlert(getErrorMessage(error), 'error')
  }
}

async function copyFileName(file: MediaFile) {
  try {
    await navigator.clipboard.writeText(file.name)
    displayAlert('Filename copied.', 'success')
  } catch {
    displayAlert(file.name, 'info')
  }
}

function getFileIcon(file: MediaFile): string {
  if (file.type === 'image') return 'bi bi-image'
  if (file.type === 'document') return 'bi bi-file-earmark-text'
  return 'bi bi-file-earmark'
}

function getFileExtension(name: string): string {
  const parts = name.split('.')
  return parts.length < 2 ? 'FILE' : parts[parts.length - 1].toUpperCase()
}

function handleOverlayClick(event: MouseEvent) {
  if (event.target !== event.currentTarget) return
  closeUploadModal()
  closePreview()
}

onMounted(() => fetchMedia())

onBeforeUnmount(() => {
  revokeUploadPreviews()
  if (alertTimeout) clearTimeout(alertTimeout)
})
</script>

<template>
  <div class="media-page">
    <div v-if="showAlert" class="inline-alert" :class="`alert-${alertType}`" role="alert">
      <i :class="{
        'bi bi-check-circle': alertType === 'success',
        'bi bi-exclamation-circle': alertType === 'error',
        'bi bi-exclamation-triangle': alertType === 'warning',
        'bi bi-info-circle': alertType === 'info'
      }"></i>
      <span>{{ alertMessage }}</span>
      <button type="button" aria-label="Close alert" @click="closeAlert"><i class="bi bi-x-lg"></i></button>
    </div>

    <div class="page-header">
      <div>
        <div class="breadcrumb"><span>Media</span><i class="bi bi-chevron-right"></i><strong>Media Library</strong></div>
        <h1>Media Library</h1>
        <p>Manage images and files used throughout the school website.</p>
      </div>
      <button type="button" class="primary-btn" @click="openUploadModal"><i class="bi bi-cloud-arrow-up"></i><span>Upload Media</span></button>
    </div>

    <div class="summary-grid">
      <div class="summary-card"><div class="summary-icon"><i class="bi bi-images"></i></div><div><span>Total Files</span><strong>{{ mediaFiles.length }}</strong></div></div>
      <div class="summary-card"><div class="summary-icon"><i class="bi bi-image"></i></div><div><span>Images</span><strong>{{ imageCount }}</strong></div></div>
      <div class="summary-card"><div class="summary-icon"><i class="bi bi-file-earmark-text"></i></div><div><span>Documents</span><strong>{{ documentCount }}</strong></div></div>
    </div>

    <div class="toolbar-card">
      <div class="search-wrap"><i class="bi bi-search"></i><input v-model="searchQuery" type="text" placeholder="Search files..." /></div>
      <div class="toolbar-actions">
        <select v-model="typeFilter">
          <option value="all">All Files</option>
          <option value="image">Images</option>
          <option value="document">Documents</option>
          <option value="other">Other</option>
        </select>
        <div class="view-toggle">
          <button type="button" :class="{ active: viewMode === 'grid' }" title="Grid view" @click="viewMode = 'grid'"><i class="bi bi-grid-3x3-gap"></i></button>
          <button type="button" :class="{ active: viewMode === 'list' }" title="List view" @click="viewMode = 'list'"><i class="bi bi-list"></i></button>
        </div>
      </div>
    </div>

    <div class="results-header">
      <span v-if="isLoading">Loading media...</span>
      <span v-else>Showing <strong>{{ filteredFiles.length }}</strong> {{ filteredFiles.length === 1 ? 'file' : 'files' }}</span>
    </div>

    <div v-if="viewMode === 'grid'" class="media-grid">
      <article v-for="file in filteredFiles" :key="file.id" class="media-card">
        <div class="media-preview" :class="{ 'is-image': file.type === 'image' }" @click="openPreview(file)">
          <img v-if="file.type === 'image' && file.url" :src="file.url" :alt="file.name" />
          <div v-else class="file-placeholder"><i :class="getFileIcon(file)"></i><span>{{ getFileExtension(file.name) }}</span></div>
          <div class="preview-overlay"><i class="bi bi-eye"></i> Preview</div>
        </div>
        <div class="media-info">
          <div class="file-name-row">
            <div><strong :title="file.name">{{ file.name }}</strong><span>{{ file.size }} · {{ file.date }}</span></div>
            <div class="more-menu"><button type="button" title="Copy filename" @click="copyFileName(file)"><i class="bi bi-three-dots-vertical"></i></button></div>
          </div>
          <div class="media-actions">
            <button type="button" @click="openPreview(file)"><i class="bi bi-eye"></i> View</button>
            <button type="button" @click="copyFileName(file)"><i class="bi bi-copy"></i> Copy</button>
            <button type="button" class="danger" title="Delete" @click="deleteFile(file)"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      </article>
      <div v-if="!isLoading && filteredFiles.length === 0" class="empty-state"><i class="bi bi-images"></i><strong>No media found</strong><span>Try changing your search or file type filter.</span></div>
    </div>

    <div v-else class="list-card">
      <div v-for="file in filteredFiles" :key="file.id" class="list-item">
        <div class="list-thumbnail" @click="openPreview(file)">
          <img v-if="file.type === 'image' && file.url" :src="file.url" :alt="file.name" />
          <i v-else :class="getFileIcon(file)"></i>
        </div>
        <div class="list-info"><strong>{{ file.name }}</strong><span>{{ file.size }} · {{ file.date }}</span></div>
        <div class="list-type">{{ getFileExtension(file.name) }}</div>
        <div class="list-actions">
          <button type="button" title="Preview" @click="openPreview(file)"><i class="bi bi-eye"></i></button>
          <button type="button" title="Copy filename" @click="copyFileName(file)"><i class="bi bi-copy"></i></button>
          <button type="button" class="danger" title="Delete" @click="deleteFile(file)"><i class="bi bi-trash3"></i></button>
        </div>
      </div>
      <div v-if="!isLoading && filteredFiles.length === 0" class="empty-state"><i class="bi bi-images"></i><strong>No media found</strong><span>Try changing your search or file type filter.</span></div>
    </div>

    <Teleport to="body">
      <div v-if="showUploadModal" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal upload-modal" @click.stop>
          <div class="modal-header">
            <div><h2>Upload Media</h2><p>Select images or files to add to your media library.</p></div>
            <button type="button" class="close-btn" :disabled="isUploading" @click="closeUploadModal"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-body">
            <label class="upload-area">
              <input type="file" multiple accept="image/jpeg,image/png,image/gif,image/webp,.jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx" :disabled="isUploading" @change="handleFileSelect" />
              <i class="bi bi-cloud-arrow-up"></i>
              <strong>Choose files to upload</strong>
              <span>Images, PDF, DOC, and DOCX files are supported.</span>
              <small>Maximum 20 files · 10 MB per file</small>
            </label>
            <div v-if="uploadFiles.length" class="selected-files">
              <div class="selected-header"><strong>Selected Files</strong><span>{{ uploadFiles.length }} {{ uploadFiles.length === 1 ? 'file' : 'files' }}</span></div>
              <div class="selected-list">
                <div v-for="(file, index) in uploadFiles" :key="`${file.name}-${index}`" class="selected-file">
                  <div class="selected-thumbnail">
                    <img v-if="file.type.startsWith('image/')" :src="uploadPreviews[index]" :alt="file.name" />
                    <i v-else class="bi bi-file-earmark-text"></i>
                  </div>
                  <div><strong>{{ file.name }}</strong><span>{{ formatFileSize(file.size) }}</span></div>
                  <button type="button" title="Remove" :disabled="isUploading" @click="removeSelectedFile(index)"><i class="bi bi-x"></i></button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="secondary-btn" :disabled="isUploading" @click="closeUploadModal">Cancel</button>
            <button type="button" class="primary-btn" :disabled="isUploading || !uploadFiles.length" @click="saveUploads"><i :class="isUploading ? 'bi bi-arrow-repeat' : 'bi bi-cloud-arrow-up'"></i>{{ isUploading ? 'Uploading...' : 'Upload Files' }}</button>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="showPreviewModal && selectedFile" class="modal-overlay preview-overlay-modal" @click="handleOverlayClick">
        <div class="preview-modal" @click.stop>
          <div class="modal-header">
            <div><h2>{{ selectedFile.name }}</h2><p>{{ selectedFile.size }} · {{ selectedFile.date }}</p></div>
            <button type="button" class="close-btn" @click="closePreview"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="preview-content">
            <img v-if="selectedFile.type === 'image' && selectedFile.url" :src="selectedFile.url" :alt="selectedFile.name" />
            <div v-else class="large-file-placeholder"><i :class="getFileIcon(selectedFile)"></i><strong>{{ getFileExtension(selectedFile.name) }} File</strong><span>Preview is not available for this file type.</span></div>
          </div>
          <div class="preview-footer">
            <button type="button" class="secondary-btn" @click="copyFileName(selectedFile)"><i class="bi bi-copy"></i> Copy Filename</button>
            <button type="button" class="danger-btn" @click="deleteFile(selectedFile)"><i class="bi bi-trash3"></i> Delete</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.media-page{width:100%;max-width:1500px;margin:0 auto;padding:12px}
.inline-alert{position:relative;display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:9px 12px;border:1px solid transparent;border-radius:6px;font-size:11px}
.inline-alert>span{flex:1}
.inline-alert button{display:flex;align-items:center;justify-content:center;width:23px;height:23px;border:0;border-radius:4px;background:transparent;cursor:pointer}
.alert-success{color:#17643a;background:#eaf7ee;border-color:#c8e9d2}
.alert-error{color:#a52f35;background:#fff0f0;border-color:#f2cccc}
.alert-warning{color:#805a10;background:#fff8e5;border-color:#f1e0ae}
.alert-info{color:#245d81;background:#edf7ff;border-color:#cce7f8}
.page-header{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;margin-bottom:10px}
.breadcrumb{display:flex;align-items:center;gap:5px;margin-bottom:4px;color:#7a8b81;font-size:10px}
.breadcrumb i{font-size:8px}.breadcrumb strong{color:#356047}
.page-header h1{margin:0;color:#103f24;font-size:22px;font-weight:800;line-height:1.1}
.page-header p{margin:3px 0 0;color:#718078;font-size:11px}
.primary-btn,.secondary-btn,.danger-btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-height:30px;padding:0 10px;border:0;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;transition:.2s ease}
.primary-btn{color:#fff;background:#0b6335;box-shadow:0 2px 7px #0b63351a}.primary-btn:hover{background:#084f2a}
.primary-btn:disabled,.secondary-btn:disabled{opacity:.6;cursor:not-allowed}
.secondary-btn{color:#365247;background:#edf2ee}.secondary-btn:hover{background:#e2eae4}
.danger-btn{color:#b44b4b;background:#fff0f0}.danger-btn:hover{background:#ffe2e2}
.summary-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:10px}
.summary-card{display:flex;align-items:center;gap:8px;min-height:62px;padding:8px 10px;border:1px solid #e3eae5;border-radius:7px;background:#fff}
.summary-icon{display:flex;align-items:center;justify-content:center;width:32px;height:32px;flex:0 0 32px;border-radius:6px;color:#0b6335;background:#e9f5ed;font-size:15px}
.summary-card span{display:block;color:#78857f;font-size:10px}
.summary-card strong{display:block;margin-top:2px;color:#183d29;font-size:18px;line-height:1}
.toolbar-card{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px;margin-bottom:7px;border:1px solid #e3eae5;border-radius:7px;background:#fff}
.search-wrap{position:relative;width:min(360px,100%)}
.search-wrap i{position:absolute;top:50%;left:9px;color:#91a098;font-size:11px;transform:translateY(-50%)}
.search-wrap input,.toolbar-actions select{width:100%;height:29px;border:1px solid #dce5df;border-radius:5px;outline:none;color:#263f31;background:#fff;font-family:inherit;font-size:10px}
.search-wrap input{padding:0 8px 0 26px}
.search-wrap input:focus,.toolbar-actions select:focus{border-color:#66a27d;box-shadow:0 0 0 2px #32845114}
.toolbar-actions{display:flex;align-items:center;gap:5px}
.toolbar-actions select{width:120px;padding:0 7px}
.view-toggle{display:flex;padding:2px;border:1px solid #dce5df;border-radius:5px;background:#f5f7f5}
.view-toggle button{display:flex;align-items:center;justify-content:center;width:25px;height:24px;border:0;border-radius:4px;color:#78867e;background:transparent;cursor:pointer}
.view-toggle button.active{color:#0b6335;background:#fff;box-shadow:0 1px 4px #00000012}
.results-header{margin:0 2px 6px;color:#7c8982;font-size:10px}.results-header strong{color:#395b47}
.media-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.media-card{overflow:hidden;border:1px solid #e3eae5;border-radius:7px;background:#fff;transition:.2s ease}
.media-card:hover{border-color:#cbdacf;box-shadow:0 4px 12px #173f290a}
.media-preview{position:relative;display:flex;align-items:center;justify-content:center;height:130px;overflow:hidden;background:#f1f5f2;cursor:pointer}
.media-preview img{width:100%;height:100%;object-fit:cover;transition:transform .25s ease}
.media-card:hover .media-preview img{transform:scale(1.03)}
.preview-overlay{position:absolute;inset:auto 6px 6px;display:flex;align-items:center;justify-content:center;gap:4px;min-height:24px;border-radius:4px;color:#fff;background:#0c2719c7;font-size:9px;font-weight:700;opacity:0;transform:translateY(3px);transition:.2s ease}
.media-preview:hover .preview-overlay{opacity:1;transform:translateY(0)}
.file-placeholder{display:flex;flex-direction:column;align-items:center;gap:4px;color:#648070}
.file-placeholder i{font-size:30px}
.file-placeholder span{padding:2px 5px;border-radius:3px;background:#e3ebe5;font-size:8px;font-weight:800}
.media-info{padding:8px}.file-name-row{display:flex;justify-content:space-between;gap:5px}
.file-name-row>div:first-child{min-width:0}
.file-name-row strong{display:block;overflow:hidden;color:#274633;font-size:10px;font-weight:700;text-overflow:ellipsis;white-space:nowrap}
.file-name-row span{display:block;margin-top:2px;color:#8a958f;font-size:8px}
.more-menu button{display:flex;align-items:center;justify-content:center;width:22px;height:22px;border:0;border-radius:4px;color:#7b8981;background:#f2f5f3;cursor:pointer}
.media-actions{display:grid;grid-template-columns:1fr 1fr 26px;gap:4px;margin-top:6px}
.media-actions button{display:flex;align-items:center;justify-content:center;gap:3px;min-height:25px;padding:0 4px;border:1px solid #e0e7e2;border-radius:4px;color:#4f6457;background:#fff;font-size:9px;font-weight:700;cursor:pointer}
.media-actions button:hover{background:#f4f7f5}
.media-actions button.danger{color:#ad4a4a;border-color:#f0dcdc;background:#fff8f8}
.list-card{overflow:hidden;border:1px solid #e3eae5;border-radius:7px;background:#fff}
.list-item{display:grid;grid-template-columns:44px minmax(0,1fr) 52px 88px;align-items:center;gap:8px;padding:6px 8px;border-bottom:1px solid #edf1ee}
.list-item:last-child{border-bottom:0}
.list-thumbnail{display:flex;align-items:center;justify-content:center;width:44px;height:36px;overflow:hidden;border-radius:5px;color:#658071;background:#f0f4f1;cursor:pointer}
.list-thumbnail img{width:100%;height:100%;object-fit:cover}.list-thumbnail i{font-size:17px}
.list-info{min-width:0}
.list-info strong{display:block;overflow:hidden;color:#274633;font-size:10px;text-overflow:ellipsis;white-space:nowrap}
.list-info span{display:block;margin-top:2px;color:#8a958f;font-size:8px}
.list-type{justify-self:start;padding:3px 5px;border-radius:3px;color:#527060;background:#eef4f0;font-size:8px;font-weight:800}
.list-actions{display:flex;justify-content:flex-end;gap:3px}
.list-actions button{display:flex;align-items:center;justify-content:center;width:25px;height:25px;border:0;border-radius:4px;color:#547062;background:#f1f5f2;cursor:pointer}
.list-actions button:hover{background:#e6eee8}
.list-actions button.danger{color:#b04c4c;background:#fff1f1}
.empty-state{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:150px;gap:4px;border:1px solid #e3eae5;border-radius:7px;color:#8a9890;background:#fff;text-align:center}
.empty-state i{margin-bottom:2px;font-size:24px}.empty-state strong{color:#516158;font-size:11px}.empty-state span{font-size:9px}
.modal-overlay{position:fixed;z-index:1000;inset:0;display:flex;align-items:center;justify-content:center;padding:12px;background:#0c221e80}
.modal,.preview-modal{width:min(560px,100%);max-height:calc(100vh - 24px);overflow-y:auto;border-radius:9px;background:#fff;box-shadow:0 18px 60px #0003}
.modal-header{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:12px 14px 10px;border-bottom:1px solid #e7ede9}
.modal-header h2{margin:0;color:#173e29;font-size:14px}.modal-header p{margin:3px 0 0;color:#87928c;font-size:9px}
.close-btn{display:flex;align-items:center;justify-content:center;width:25px;height:25px;border:0;border-radius:5px;color:#69766f;background:#f1f4f2;cursor:pointer}
.close-btn:hover{background:#e6ebe8}.close-btn:disabled{opacity:.5;cursor:not-allowed}
.modal-body{padding:12px 14px}
.upload-area{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:145px;padding:14px;border:1.5px dashed #b8cdbd;border-radius:7px;color:#678074;background:#f8fbf9;text-align:center;cursor:pointer}
.upload-area:hover{border-color:#5d9870;background:#f3f9f5}
.upload-area input{display:none}.upload-area>i{margin-bottom:6px;color:#0b6335;font-size:28px}
.upload-area strong{color:#294d38;font-size:12px}.upload-area span{margin-top:3px;font-size:9px}.upload-area small{margin-top:6px;color:#9aa59f;font-size:8px}
.selected-files{margin-top:10px}.selected-header{display:flex;justify-content:space-between;margin-bottom:5px}
.selected-header strong{color:#365644;font-size:10px}.selected-header span{color:#89958e;font-size:8px}
.selected-list{display:flex;flex-direction:column;gap:4px;max-height:150px;overflow-y:auto}
.selected-file{display:flex;align-items:center;gap:7px;padding:5px;border:1px solid #e5ebe7;border-radius:5px}
.selected-thumbnail{display:flex;align-items:center;justify-content:center;width:30px;height:30px;flex:0 0 30px;overflow:hidden;border-radius:4px;color:#5f7969;background:#f0f4f1}
.selected-thumbnail img{width:100%;height:100%;object-fit:cover}.selected-thumbnail i{font-size:14px}
.selected-file>div:nth-child(2){min-width:0;flex:1}
.selected-file strong{display:block;overflow:hidden;color:#3c5546;font-size:9px;text-overflow:ellipsis;white-space:nowrap}
.selected-file span{display:block;margin-top:2px;color:#929c96;font-size:8px}
.selected-file button{display:flex;align-items:center;justify-content:center;width:23px;height:23px;border:0;border-radius:4px;color:#aa4d4d;background:#fff0f0;cursor:pointer}
.modal-footer{display:flex;justify-content:flex-end;gap:6px;padding:10px 14px;border-top:1px solid #e7ede9}
.preview-modal{width:min(800px,100%)}
.preview-content{display:flex;align-items:center;justify-content:center;min-height:280px;max-height:65vh;padding:12px;overflow:hidden;background:#f0f3f1}
.preview-content img{max-width:100%;max-height:60vh;object-fit:contain;border-radius:4px}
.large-file-placeholder{display:flex;flex-direction:column;align-items:center;gap:5px;color:#75847b;text-align:center}
.large-file-placeholder i{color:#0b6335;font-size:48px}.large-file-placeholder strong{color:#3e5849;font-size:12px}.large-file-placeholder span{font-size:9px}
.preview-footer{display:flex;justify-content:flex-end;gap:6px;padding:10px 14px;border-top:1px solid #e7ede9}
@media(max-width:1050px){.media-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:850px){.media-page{padding:10px}.media-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:700px){.page-header{align-items:flex-start;flex-direction:column}.page-header .primary-btn{width:100%}.summary-grid{gap:5px}.summary-card{gap:5px;padding:7px;min-height:55px}.summary-icon{width:27px;height:27px;flex-basis:27px;font-size:13px}.summary-card strong{font-size:16px}.toolbar-card{align-items:stretch;flex-direction:column;gap:7px}.search-wrap{width:100%}.toolbar-actions{width:100%}.toolbar-actions select{flex:1}.media-grid{gap:6px}.media-preview{height:110px}.list-item{grid-template-columns:38px minmax(0,1fr) auto;gap:6px}.list-thumbnail{width:38px;height:34px}.list-type{display:none}.list-actions{grid-column:2/-1;justify-content:flex-start}}
@media(max-width:500px){.media-page{padding:8px}.page-header h1{font-size:20px}.summary-card{flex-direction:column;align-items:flex-start;gap:4px}.summary-card strong{font-size:15px}.summary-card span{font-size:9px}.media-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.media-preview{height:95px}.media-info{padding:6px}.media-actions{grid-template-columns:1fr 26px}.media-actions button:nth-child(2){display:none}.modal-overlay{align-items:flex-end;padding:0}.modal,.preview-modal{width:100%;max-height:92vh;border-radius:11px 11px 0 0}.modal-header,.modal-body{padding-left:12px;padding-right:12px}.modal-footer,.preview-footer{padding-left:12px;padding-right:12px}.preview-content{min-height:230px}}
@media(max-width:360px){.media-grid{grid-template-columns:1fr}.media-preview{height:140px}.toolbar-actions{flex-wrap:wrap}.toolbar-actions select{width:100%}}
</style>
