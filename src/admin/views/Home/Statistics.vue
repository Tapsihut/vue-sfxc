<template>
  <div class="statistics-page">
    <!-- Notifications -->
    <Transition name="toast">
      <div
        v-if="notification.show"
        class="toast-notification"
        :class="notification.type"
        role="status"
        aria-live="polite"
      >
        <i
          :class="notification.type === 'success'
            ? 'bi bi-check-circle-fill'
            : 'bi bi-exclamation-circle-fill'"
        ></i>
        <span>{{ notification.message }}</span>
        <button type="button" aria-label="Close notification" @click="closeNotification">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </Transition>

    <!-- Header -->
    <header class="page-header">
      <div>
        <div class="breadcrumb">
          <span>Home</span>
          <i class="bi bi-chevron-right"></i>
          <strong>Statistics</strong>
        </div>
        <h1>Statistics</h1>
        <p>Manage the statistics displayed on the SFXC website.</p>
      </div>

      <button class="primary-btn" type="button" @click="openCreateModal">
        <i class="bi bi-plus-lg"></i>
        New Statistic
      </button>
    </header>

    <!-- Summary -->
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon">
          <i class="bi bi-bar-chart-fill"></i>
        </div>
        <div>
          <span>Total Statistics</span>
          <strong>{{ totalStatistics }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon active-icon">
          <i class="bi bi-check-circle-fill"></i>
        </div>
        <div>
          <span>Active Statistics</span>
          <strong>{{ activeStatistics }}</strong>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon inactive-icon">
          <i class="bi bi-pause-circle-fill"></i>
        </div>
        <div>
          <span>Inactive Statistics</span>
          <strong>{{ inactiveStatistics }}</strong>
        </div>
      </div>
    </div>

    <!-- Search and Filter -->
    <section class="filter-card">
      <div class="filter-heading">
        <div>
          <h2>Homepage Statistics</h2>
          <p>Manage the values displayed on your homepage.</p>
        </div>
        <span class="result-count">{{ filteredStatistics.length }} items</span>
      </div>

      <div class="filters">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input v-model="searchQuery" type="text" placeholder="Search statistics..." />
          <button
            v-if="searchQuery"
            type="button"
            aria-label="Clear search"
            @click="searchQuery = ''"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <select v-model="statusFilter" aria-label="Filter by status">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="button" class="refresh-btn" :disabled="loading" @click="loadStatistics()">
          <i class="bi bi-arrow-clockwise" :class="{ spinning: loading }"></i>
          Refresh
        </button>
      </div>
    </section>

    <!-- Loading -->
    <div v-if="loading && statistics.length === 0" class="empty-state">
      <span class="spinner"></span>
      <strong>Loading statistics...</strong>
    </div>

    <!-- Desktop Table -->
    <section v-else class="table-card desktop-table">
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Statistic</th>
              <th>Icon</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="statistic in filteredStatistics" :key="statistic.id">
              <td>
                <div class="order-controls">
                  <span class="order-number">{{ statistic.order }}</span>
                  <div class="move-buttons">
                    <button
                      type="button"
                      title="Move up"
                      :disabled="saving || statistic.order <= 1"
                      @click="moveUp(statistic)"
                    >
                      <i class="bi bi-chevron-up"></i>
                    </button>
                    <button
                      type="button"
                      title="Move down"
                      :disabled="saving || statistic.order >= statistics.length"
                      @click="moveDown(statistic)"
                    >
                      <i class="bi bi-chevron-down"></i>
                    </button>
                  </div>
                </div>
              </td>

              <td>
                <div class="statistic-cell">
                  <div class="statistic-icon">
                    <i :class="getIconClass(statistic.icon)"></i>
                  </div>
                  <div>
                    <strong>{{ statistic.value }}</strong>
                    <span>{{ statistic.label }}</span>
                  </div>
                </div>
              </td>

              <td><code>{{ statistic.icon }}</code></td>

              <!-- VISIBLE STATUS BUTTON -->
              <td>
                <button
                  type="button"
                  class="status-badge"
                  :class="statistic.active ? 'active' : 'inactive'"
                  :disabled="statusUpdatingId === statistic.id"
                  @click="toggleStatus(statistic)"
                >
                  <span v-if="statusUpdatingId === statistic.id" class="button-spinner"></span>
                  <i
                    v-else
                    :class="statistic.active
                      ? 'bi bi-check-circle-fill'
                      : 'bi bi-pause-circle-fill'"
                  ></i>
                  {{
                    statusUpdatingId === statistic.id
                      ? 'Saving...'
                      : statistic.active
                        ? 'Active'
                        : 'Inactive'
                  }}
                </button>
              </td>

              <td>
                <div class="action-buttons">
                  <button
                    type="button"
                    class="icon-btn edit"
                    title="Edit statistic"
                    @click="openEditModal(statistic)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    class="icon-btn delete"
                    title="Delete statistic"
                    :disabled="deletingId === statistic.id"
                    @click="deleteStatistic(statistic)"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredStatistics.length === 0">
              <td colspan="5">
                <div class="empty-state">
                  <i class="bi bi-inbox"></i>
                  <strong>No statistics found</strong>
                  <span>Try changing your search or status filter.</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="table-footer">
        Showing {{ filteredStatistics.length }} of {{ statistics.length }} statistics
      </footer>
    </section>

    <!-- Mobile Cards -->
    <section v-if="!loading || statistics.length > 0" class="mobile-list">
      <article
        v-for="statistic in filteredStatistics"
        :key="statistic.id"
        class="mobile-stat-card"
      >
        <div class="mobile-card-header">
          <div class="statistic-icon">
            <i :class="getIconClass(statistic.icon)"></i>
          </div>
          <div class="mobile-stat-info">
            <strong>{{ statistic.value }}</strong>
            <span>{{ statistic.label }}</span>
          </div>
          <span class="order-number">#{{ statistic.order }}</span>
        </div>

        <div class="mobile-meta">
          <code>{{ statistic.icon }}</code>

          <!-- VISIBLE MOBILE STATUS BUTTON -->
          <button
            type="button"
            class="status-badge"
            :class="statistic.active ? 'active' : 'inactive'"
            :disabled="statusUpdatingId === statistic.id"
            @click="toggleStatus(statistic)"
          >
            <span v-if="statusUpdatingId === statistic.id" class="button-spinner"></span>
            <i
              v-else
              :class="statistic.active
                ? 'bi bi-check-circle-fill'
                : 'bi bi-pause-circle-fill'"
            ></i>
            {{
              statusUpdatingId === statistic.id
                ? 'Saving...'
                : statistic.active
                  ? 'Active'
                  : 'Inactive'
            }}
          </button>
        </div>

        <div class="mobile-actions">
          <button
            type="button"
            :disabled="saving || statistic.order <= 1"
            @click="moveUp(statistic)"
          >
            <i class="bi bi-arrow-up"></i> Up
          </button>
          <button
            type="button"
            :disabled="saving || statistic.order >= statistics.length"
            @click="moveDown(statistic)"
          >
            <i class="bi bi-arrow-down"></i> Down
          </button>
          <button type="button" @click="openEditModal(statistic)">
            <i class="bi bi-pencil"></i> Edit
          </button>
          <button
            type="button"
            class="delete-mobile"
            :disabled="deletingId === statistic.id"
            @click="deleteStatistic(statistic)"
          >
            <i class="bi bi-trash3"></i> Delete
          </button>
        </div>
      </article>

      <div v-if="filteredStatistics.length === 0" class="empty-state mobile-empty">
        <i class="bi bi-inbox"></i>
        <strong>No statistics found</strong>
        <span>Try changing your search or status filter.</span>
      </div>
    </section>

    <!-- Create / Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <section class="statistic-modal" role="dialog" aria-modal="true">
          <header class="modal-header">
            <div>
              <h2>{{ editingStatistic ? 'Edit Statistic' : 'New Statistic' }}</h2>
              <p>
                {{ editingStatistic ? 'Update the statistic details.' : 'Add a statistic to the website.' }}
              </p>
            </div>
            <button type="button" class="close-btn" :disabled="saving" @click="closeModal">
              <i class="bi bi-x-lg"></i>
            </button>
          </header>

          <form @submit.prevent="saveStatistic">
            <div class="form-grid">
              <div class="form-group">
                <label for="stat-value">Statistic Value <span>*</span></label>
                <input
                  id="stat-value"
                  v-model="form.value"
                  type="text"
                  maxlength="100"
                  placeholder="e.g. 5,000+"
                  required
                />
              </div>

              <div class="form-group">
                <label for="stat-label">Label <span>*</span></label>
                <input
                  id="stat-label"
                  v-model="form.label"
                  type="text"
                  maxlength="150"
                  placeholder="e.g. Students"
                  required
                />
              </div>

              <div class="form-group full-width">
                <label for="stat-icon">Bootstrap Icon Class</label>
                <div class="icon-input">
                  <i :class="getIconClass(form.icon)"></i>
                  <input
                    id="stat-icon"
                    v-model="form.icon"
                    type="text"
                    maxlength="100"
                    placeholder="bi bi-people-fill"
                  />
                </div>
                <small>Example: bi bi-people-fill</small>
              </div>

              <div class="form-group">
                <label for="stat-order">Display Order</label>
                <input
                  id="stat-order"
                  v-model.number="form.order"
                  type="number"
                  min="1"
                  step="1"
                  required
                />
              </div>

              <div class="form-group">
                <label>Status</label>
                <label class="switch-row">
                  <input v-model="form.active" type="checkbox" />
                  <span class="switch"></span>
                  <span>{{ form.active ? 'Active' : 'Inactive' }}</span>
                </label>
              </div>
            </div>

            <footer class="modal-footer">
              <button type="button" class="secondary-btn" :disabled="saving" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="primary-btn" :disabled="saving">
                <span v-if="saving" class="button-spinner"></span>
                <i v-else :class="editingStatistic ? 'bi bi-check-lg' : 'bi bi-plus-lg'"></i>
                {{ saving ? 'Saving...' : editingStatistic ? 'Save Changes' : 'Create Statistic' }}
              </button>
            </footer>
          </form>
        </section>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import api from '@/services/api'

interface Statistic {
  id: number
  value: string
  label: string
  icon: string
  order: number
  active: boolean
}

interface StatisticForm {
  value: string
  label: string
  icon: string
  order: number
  active: boolean
}

type NotificationType = 'success' | 'error'

const statistics = ref<Statistic[]>([])
const loading = ref(false)
const saving = ref(false)
const deletingId = ref<number | null>(null)
const statusUpdatingId = ref<number | null>(null)

const searchQuery = ref('')
const statusFilter = ref('all')
const showModal = ref(false)
const editingStatistic = ref<Statistic | null>(null)

const notification = ref({
  show: false,
  message: '',
  type: 'success' as NotificationType,
})

let notificationTimeout: ReturnType<typeof setTimeout> | undefined

const form = ref<StatisticForm>({
  value: '',
  label: '',
  icon: 'bi bi-bar-chart-fill',
  order: 1,
  active: true,
})

function showNotification(message: string, type: NotificationType = 'success') {
  if (notificationTimeout) clearTimeout(notificationTimeout)

  notification.value = { show: true, message, type }

  notificationTimeout = setTimeout(() => {
    notification.value.show = false
  }, 3500)
}

function closeNotification() {
  notification.value.show = false
  if (notificationTimeout) clearTimeout(notificationTimeout)
  notificationTimeout = undefined
}

function getErrorMessage(error: any): string {
  const errors = error?.response?.data?.errors

  if (errors && typeof errors === 'object') {
    const firstError = Object.values(errors).flat()[0]
    if (firstError) return String(firstError)
  }

  if (error?.response?.status === 401) {
    return 'Your session has expired. Please log in again.'
  }

  if (error?.response?.status === 403) {
    return 'You do not have permission to perform this action.'
  }

  return error?.response?.data?.message ||
    error?.message ||
    'Something went wrong. Please try again.'
}

function normalizeStatistic(item: any): Statistic {
  return {
    id: Number(item.id),
    value: String(item.value ?? ''),
    label: String(item.label ?? ''),
    icon: String(item.icon || 'bi bi-bar-chart-fill'),
    order: Number(item.order ?? item.display_order ?? 1),
    active: item.active === true || item.active === 1 || item.active === '1',
  }
}

const filteredStatistics = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return [...statistics.value]
    .filter((item) => {
      const matchesSearch =
        !query ||
        item.value.toLowerCase().includes(query) ||
        item.label.toLowerCase().includes(query) ||
        item.icon.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter.value === 'all' ||
        (statusFilter.value === 'active' && item.active) ||
        (statusFilter.value === 'inactive' && !item.active)

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => a.order - b.order || a.id - b.id)
})

const totalStatistics = computed(() => statistics.value.length)
const activeStatistics = computed(() => statistics.value.filter((item) => item.active).length)
const inactiveStatistics = computed(() => statistics.value.filter((item) => !item.active).length)

function getIconClass(icon: string) {
  return icon?.trim() || 'bi bi-bar-chart-fill'
}

async function loadStatistics(showError = true): Promise<boolean> {
  loading.value = true

  try {
    const response = await api.get('/api/v1/statistics')
    const rows = response.data?.data

    if (!Array.isArray(rows)) {
      throw new Error('The server returned an invalid statistics response.')
    }

    statistics.value = rows
      .map(normalizeStatistic)
      .sort((a: Statistic, b: Statistic) => a.order - b.order || a.id - b.id)

    return true
  } catch (error) {
    console.error('Unable to load statistics:', error)
    if (showError) {
      showNotification(`Unable to load statistics. ${getErrorMessage(error)}`, 'error')
    }
    return false
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  editingStatistic.value = null
  form.value = {
    value: '',
    label: '',
    icon: 'bi bi-bar-chart-fill',
    order: statistics.value.length + 1,
    active: true,
  }
  showModal.value = true
}

function openEditModal(statistic: Statistic) {
  editingStatistic.value = statistic
  form.value = {
    value: statistic.value,
    label: statistic.label,
    icon: statistic.icon,
    order: statistic.order,
    active: statistic.active,
  }
  showModal.value = true
}

function closeModal() {
  if (saving.value) return
  showModal.value = false
  editingStatistic.value = null
}

function handleOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget) closeModal()
}

async function saveStatistic() {
  if (saving.value) return

  const value = form.value.value.trim()
  const label = form.value.label.trim()
  const icon = form.value.icon.trim() || 'bi bi-bar-chart-fill'
  const order = Number(form.value.order)

  if (!value || !label) {
    showNotification('Please enter both the statistic value and label.', 'error')
    return
  }

  if (value.length > 100 || label.length > 150 || icon.length > 100) {
    showNotification('The value, label, or icon exceeds the allowed length.', 'error')
    return
  }

  if (!Number.isInteger(order) || order < 1) {
    showNotification('Display order must be a whole number greater than zero.', 'error')
    return
  }

  saving.value = true
  const editing = Boolean(editingStatistic.value)
  const id = editingStatistic.value?.id

  try {
    const payload = { value, label, icon, order, active: form.value.active }

    if (editing && id) {
      await api.put(`/api/v1/statistics/${id}`, payload)
    } else {
      await api.post('/api/v1/statistics', payload)
    }

    showModal.value = false
    editingStatistic.value = null

    const loaded = await loadStatistics(false)

    if (!loaded) {
      showNotification('Saved successfully, but the list could not be refreshed.', 'error')
      return
    }

    showNotification(
      editing ? 'Statistic updated successfully!' : 'Statistic created successfully!',
      'success',
    )
  } catch (error) {
    console.error('Unable to save statistic:', error)
    showNotification(`Unable to save statistic. ${getErrorMessage(error)}`, 'error')
  } finally {
    saving.value = false
  }
}

async function toggleStatus(statistic: Statistic) {
  if (statusUpdatingId.value !== null) return

  const previousStatus = statistic.active
  const newStatus = !previousStatus
  statusUpdatingId.value = statistic.id
  statistic.active = newStatus

  try {
    await api.put(`/api/v1/statistics/${statistic.id}`, {
      value: statistic.value,
      label: statistic.label,
      icon: statistic.icon,
      order: statistic.order,
      active: newStatus,
    })

    showNotification(
      newStatus
        ? `"${statistic.label}" activated successfully!`
        : `"${statistic.label}" deactivated successfully!`,
      'success',
    )

    await loadStatistics(false)
  } catch (error) {
    statistic.active = previousStatus
    console.error('Unable to update status:', error)
    showNotification(`Unable to update status. ${getErrorMessage(error)}`, 'error')
  } finally {
    statusUpdatingId.value = null
  }
}

async function deleteStatistic(statistic: Statistic) {
  if (deletingId.value !== null) return

  if (!window.confirm(`Are you sure you want to delete "${statistic.label}"?`)) return

  deletingId.value = statistic.id

  try {
    await api.delete(`/api/v1/statistics/${statistic.id}`)
    const loaded = await loadStatistics(false)

    if (loaded) showNotification('Statistic deleted successfully!', 'success')
    else showNotification('Deleted, but the list could not be refreshed.', 'error')
  } catch (error) {
    console.error('Unable to delete statistic:', error)
    showNotification(`Unable to delete statistic. ${getErrorMessage(error)}`, 'error')
  } finally {
    deletingId.value = null
  }
}

async function persistOrder(): Promise<boolean> {
  if (saving.value) return false

  saving.value = true

  const ordered = [...statistics.value].sort((a, b) => a.order - b.order || a.id - b.id)
  const items = ordered.map((item, index) => ({ id: item.id, order: index + 1 }))

  try {
    await api.put('/api/v1/statistics/reorder', { items })
    const loaded = await loadStatistics(false)

    if (!loaded) {
      showNotification('Order saved, but the list could not be refreshed.', 'error')
      return false
    }

    showNotification('Statistics order updated successfully!', 'success')
    return true
  } catch (error) {
    console.error('Unable to reorder statistics:', error)
    await loadStatistics(false)
    showNotification(`Unable to reorder statistics. ${getErrorMessage(error)}`, 'error')
    return false
  } finally {
    saving.value = false
  }
}

async function moveUp(statistic: Statistic) {
  if (saving.value) return

  const sorted = [...statistics.value].sort((a, b) => a.order - b.order || a.id - b.id)
  const index = sorted.findIndex((item) => item.id === statistic.id)
  if (index <= 0) return

const current = sorted[index]
const previous = sorted[index - 1]

if (current && previous) {
  sorted[index - 1] = current
  sorted[index] = previous
}
  statistics.value = sorted.map((item, position) => ({ ...item, order: position + 1 }))

  await persistOrder()
}

async function moveDown(statistic: Statistic) {
  if (saving.value) return

  const sorted = [...statistics.value].sort((a, b) => a.order - b.order || a.id - b.id)
  const index = sorted.findIndex((item) => item.id === statistic.id)
  if (index < 0 || index >= sorted.length - 1) return

const current = sorted[index]
const next = sorted[index + 1]

if (current && next) {
  sorted[index] = next
  sorted[index + 1] = current
}
  statistics.value = sorted.map((item, position) => ({ ...item, order: position + 1 }))

  await persistOrder()
}

onMounted(() => {
  loadStatistics()
})

onBeforeUnmount(() => {
  if (notificationTimeout) clearTimeout(notificationTimeout)
})
</script>

<style scoped>
.statistics-page {
  width: 100%;
  padding: 18px;
  color: #26382d;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 22px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 7px;
  color: #859188;
  font-size: 11px;
}

.breadcrumb strong {
  color: #356047;
}

.page-header h1 {
  margin: 0;
  color: #103f24;
  font-size: 26px;
  font-weight: 800;
}

.page-header p {
  margin: 5px 0 0;
  color: #77847c;
  font-size: 12px;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  min-height: 36px;
  padding: 9px 14px;
  border: 0;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.primary-btn {
  color: #fff;
  background: #0b6335;
}

.primary-btn:hover:not(:disabled) {
  background: #084c29;
}

.secondary-btn {
  color: #365247;
  background: #edf2ee;
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 15px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border: 1px solid #e3eae5;
  border-radius: 9px;
  background: #fff;
}

.summary-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  color: #0b6335;
  background: #e9f5ed;
  font-size: 18px;
}

.summary-icon.active-icon {
  color: #247a4a;
  background: #eaf7ee;
}

.summary-icon.inactive-icon {
  color: #8a7040;
  background: #faf4e7;
}

.summary-card span {
  display: block;
  color: #78857f;
  font-size: 11px;
}

.summary-card strong {
  display: block;
  margin-top: 3px;
  color: #183d29;
  font-size: 21px;
}

.filter-card,
.table-card {
  overflow: hidden;
  border: 1px solid #e3eae5;
  border-radius: 9px;
  background: #fff;
}

.filter-card {
  padding: 14px;
  margin-bottom: 13px;
}

.filter-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.filter-heading h2 {
  margin: 0;
  color: #193e2a;
  font-size: 14px;
}

.filter-heading p {
  margin: 4px 0 0;
  color: #87928c;
  font-size: 11px;
}

.result-count {
  padding: 5px 9px;
  border-radius: 20px;
  color: #376049;
  background: #eef5f0;
  font-size: 10px;
  font-weight: 700;
}

.filters {
  display: flex;
  gap: 10px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
}

.search-box > i {
  position: absolute;
  left: 11px;
  color: #91a098;
  pointer-events: none;
}

.search-box input,
.filters select {
  width: 100%;
  height: 36px;
  padding: 0 11px;
  border: 1px solid #dce5df;
  border-radius: 6px;
  outline: none;
  color: #263f31;
  background: #fff;
  font-size: 11px;
}

.search-box input {
  padding-left: 31px;
  padding-right: 32px;
}

.search-box input:focus,
.filters select:focus {
  border-color: #66a27d;
}

.search-box button {
  position: absolute;
  right: 7px;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 0;
  color: #77847c;
  background: transparent;
  cursor: pointer;
}

.filters select {
  width: 160px;
}

.refresh-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 12px;
  border: 1px solid #dce5df;
  border-radius: 6px;
  color: #365247;
  background: #fff;
  font-size: 11px;
  cursor: pointer;
}

.refresh-btn:hover {
  background: #f4f8f5;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead {
  background: #f5f8f6;
}

th {
  padding: 12px;
  border-bottom: 1px solid #e5ebe7;
  color: #64736b;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

td {
  padding: 12px;
  border-bottom: 1px solid #edf1ee;
  color: #53645a;
  font-size: 11px;
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: 0;
}

.text-right {
  text-align: right;
}

.order-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.order-number {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 27px;
  height: 25px;
  padding: 0 5px;
  border-radius: 5px;
  color: #376049;
  background: #edf5ef;
  font-size: 10px;
  font-weight: 800;
}

.move-buttons {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.move-buttons button {
  display: grid;
  place-items: center;
  width: 22px;
  height: 17px;
  padding: 0;
  border: 1px solid #e0e8e2;
  border-radius: 4px;
  color: #607269;
  background: #fff;
  cursor: pointer;
}

.statistic-cell {
  display: flex;
  align-items: center;
  gap: 9px;
}

.statistic-icon {
  display: grid;
  place-items: center;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 7px;
  color: #0b6335;
  background: #edf6f0;
  font-size: 16px;
}

.statistic-cell strong,
.statistic-cell span {
  display: block;
}

.statistic-cell strong {
  color: #193e2a;
  font-size: 13px;
}

.statistic-cell span {
  margin-top: 2px;
  color: #79867f;
  font-size: 10px;
}

td code,
.mobile-meta code {
  padding: 4px 6px;
  border-radius: 4px;
  color: #4b6255;
  background: #f2f5f3;
  font-family: Consolas, monospace;
  font-size: 9px;
  overflow-wrap: anywhere;
}

/* Status buttons: deliberately visible */
.status-badge {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 92px;
  min-height: 30px;
  padding: 6px 10px;
  border: 1px solid transparent;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  visibility: visible;
  opacity: 1;
  cursor: pointer;
}

.status-badge.active {
  color: #217044;
  border-color: #c9ead4;
  background: #e9f7ee;
}

.status-badge.inactive {
  color: #806a39;
  border-color: #eee1bd;
  background: #faf4e5;
}

.status-badge:hover:not(:disabled) {
  filter: brightness(0.97);
}

.status-badge:disabled {
  cursor: wait;
}

.button-spinner {
  display: inline-block;
  width: 11px;
  height: 11px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.icon-btn.edit {
  color: #3f6b50;
  background: #edf5ef;
}

.icon-btn.delete {
  color: #b24a4a;
  background: #fff0f0;
}

.table-footer {
  padding: 11px 13px;
  border-top: 1px solid #e5ebe7;
  color: #78857f;
  background: #fafcfb;
  font-size: 10px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  gap: 6px;
  color: #87928c;
  text-align: center;
}

.empty-state > i {
  font-size: 26px;
}

.empty-state strong {
  color: #516158;
  font-size: 12px;
}

.empty-state span {
  font-size: 10px;
}

.mobile-list {
  display: none;
}

/* Modal */
.modal-overlay {
  position: fixed;
  z-index: 1500;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(12, 34, 22, 0.52);
}

.statistic-modal {
  width: min(540px, 100%);
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 17px;
  border-bottom: 1px solid #e7ede9;
}

.modal-header h2 {
  margin: 0;
  color: #173e29;
  font-size: 17px;
}

.modal-header p {
  margin: 4px 0 0;
  color: #87928c;
  font-size: 11px;
}

.close-btn {
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  border: 0;
  border-radius: 6px;
  color: #69766f;
  background: #f1f4f2;
  cursor: pointer;
}

.statistic-modal form {
  padding: 17px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #486052;
  font-size: 11px;
  font-weight: 700;
}

.form-group label > span {
  color: #c43e3e;
}

.form-group input:not([type="checkbox"]) {
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #dce5df;
  border-radius: 6px;
  outline: none;
  color: #263f31;
  font-size: 11px;
}

.form-group input:focus {
  border-color: #66a27d;
  box-shadow: 0 0 0 2px rgba(50, 132, 81, 0.08);
}

.full-width {
  grid-column: 1 / -1;
}

.icon-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-input > i {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 6px;
  color: #0b6335;
  background: #edf6f0;
}

.icon-input input {
  flex: 1;
}

.form-group small {
  display: block;
  margin-top: 5px;
  color: #8b9690;
  font-size: 10px;
}

.switch-row {
  display: flex !important;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  cursor: pointer;
}

.switch-row input {
  accent-color: #0b6335;
  width: 16px;
  height: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid #e7ede9;
}

.toast-notification {
  position: fixed;
  z-index: 3000;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 11px;
  width: min(400px, calc(100vw - 32px));
  padding: 14px;
  border: 1px solid #cde8d5;
  border-left: 4px solid #198754;
  border-radius: 9px;
  color: #176b39;
  background: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  font-weight: 600;
}

.toast-notification.error {
  border-color: #f0cccc;
  border-left-color: #dc3545;
  color: #b42332;
}

.toast-notification > i {
  flex-shrink: 0;
  font-size: 18px;
}

.toast-notification > span {
  flex: 1;
  overflow-wrap: anywhere;
}

.toast-notification button {
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  border: 0;
  border-radius: 5px;
  color: inherit;
  background: transparent;
  cursor: pointer;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.spinning {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 760px) {
  .statistics-page {
    padding: 13px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
    gap: 9px;
  }

  .summary-card {
    padding: 11px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .page-header > .primary-btn {
    width: 100%;
  }

  .filters {
    flex-wrap: wrap;
  }

  .search-box {
    flex-basis: 100%;
  }

  .filters select {
    flex: 1;
    width: auto;
  }

  .desktop-table {
    display: none;
  }

  .mobile-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .mobile-stat-card {
    padding: 12px;
    border: 1px solid #e3eae5;
    border-radius: 9px;
    background: #fff;
  }

  .mobile-card-header {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .mobile-card-header .statistic-cell {
    flex: 1;
    min-width: 0;
  }

  .mobile-card-header .statistic-cell > div:last-child {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .mobile-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid #edf1ee;
  }

  .mobile-actions {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 5px;
    margin-top: 10px;
  }

  .mobile-actions button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    min-height: 30px;
    padding: 4px;
    border: 1px solid #e1e8e3;
    border-radius: 5px;
    color: #4e6256;
    background: #fff;
    font-size: 10px;
    cursor: pointer;
  }

  .mobile-actions button.delete-mobile {
    color: #ae4949;
    background: #fff8f8;
  }

  .mobile-empty {
    border: 1px solid #e3eae5;
    border-radius: 9px;
    background: #fff;
  }

  .toast-notification {
    top: 12px;
    right: 12px;
  }
}

@media (max-width: 430px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }

  .statistic-modal {
    max-height: 92vh;
    border-radius: 13px 13px 0 0;
  }

  .mobile-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>