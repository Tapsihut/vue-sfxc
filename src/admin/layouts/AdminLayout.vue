 <script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SFXCLogo from '@/assets/images/sfxc-logo-only.png'
import authService from '@/services/auth'

const router = useRouter()
const route = useRoute()

const mobileMenu = ref(false)
const notificationsOpen = ref(false)
const isLoggingOut = ref(false)
const logoutError = ref('')

interface AdminNotification {
  id: number
  title: string
  message: string
  icon: string
  route: string
  createdAt: string
  read: boolean
}

const notificationWrapper = ref<HTMLElement | null>(null)

const notifications = ref<AdminNotification[]>([
  {
    id: 1,
    title: 'Content activity',
    message: 'Review your website posts and published content.',
    icon: 'bi bi-file-earmark-text-fill',
    route: '/admin/posts',
    createdAt: 'Recently',
    read: false,
  },
  {
    id: 2,
    title: 'Media library',
    message: 'Review images and other uploaded media.',
    icon: 'bi bi-images',
    route: '/admin/media',
    createdAt: 'Recently',
    read: false,
  },
  {
    id: 3,
    title: 'Website settings',
    message: 'Review your website configuration.',
    icon: 'bi bi-gear-fill',
    route: '/admin/settings',
    createdAt: 'Recently',
    read: false,
  },
])

const menuItems = [
  { label: 'Dashboard', icon: 'bi bi-grid-1x2-fill', route: '/admin/dashboard' },
  { label: 'Posts', icon: 'bi bi-file-earmark-richtext-fill', route: '/admin/posts' },
  { label: 'Categories', icon: 'bi bi-tags-fill', route: '/admin/categories' },
  { label: 'Sections', icon: 'bi bi-layout-text-window-reverse', route: '/admin/sections' },
  { label: 'Hero Slides', icon: 'bi bi-images', route: '/admin/hero-slides' },
  { label: 'Programs', icon: 'bi bi-mortarboard-fill', route: '/admin/programs' },
  { label: 'Statistics', icon: 'bi bi-bar-chart-fill', route: '/admin/statistics' },
  { label: 'Media Library', icon: 'bi bi-collection-play-fill', route: '/admin/media' },
  { label: 'Settings', icon: 'bi bi-gear-fill', route: '/admin/settings' },
]

const pageTitle = computed(() => (route.meta.title as string) || 'Dashboard')

const isActive = (path: string) => {
  if (path === '/admin/dashboard') {
    return route.path === '/admin' || route.path === '/admin/dashboard'
  }

  return route.path.startsWith(path)
}

const unreadNotifications = computed(() =>
  notifications.value.filter((notification) => !notification.read),
)

const unreadCount = computed(() => unreadNotifications.value.length)

const closeMobileMenu = () => {
  mobileMenu.value = false
}

const toggleNotifications = () => {
  notificationsOpen.value = !notificationsOpen.value
}

const markAsRead = (notification: AdminNotification) => {
  notification.read = true
}

const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.read = true
  })
}

const openNotification = async (notification: AdminNotification) => {
  markAsRead(notification)
  notificationsOpen.value = false

  try {
    await router.push(notification.route)
  } catch (error) {
    console.error('Unable to open notification:', error)
  }
}

const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as Node

  if (
    notificationWrapper.value &&
    !notificationWrapper.value.contains(target)
  ) {
    notificationsOpen.value = false
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    notificationsOpen.value = false
  }
}

const logout = async () => {
  if (isLoggingOut.value) return

  isLoggingOut.value = true
  logoutError.value = ''

  try {
    await authService.logout()
  } catch (error) {
    console.error('Laravel logout failed:', error)
    logoutError.value =
      'Unable to contact the server to complete logout. Please try again.'
    isLoggingOut.value = false
    return
  }

  mobileMenu.value = false
  notificationsOpen.value = false

  try {
    await router.replace('/login')
  } finally {
    isLoggingOut.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div class="admin-layout">
    <!-- Mobile Overlay -->
    <div
      v-if="mobileMenu"
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>

    <!-- Sidebar -->
    <aside
      class="admin-sidebar"
      :class="{ 'sidebar-open': mobileMenu }"
    >
      <div class="sidebar-header">
        <RouterLink
          to="/admin/dashboard"
          class="brand"
          @click="closeMobileMenu"
        >
          <div class="brand-logo">
            <img :src="SFXCLogo" alt="SFXC Logo" />
          </div>

          <div class="brand-text">
            <strong>SFXC</strong>
            <span>Website Administration</span>
          </div>
        </RouterLink>

        <button
          type="button"
          class="mobile-close"
          aria-label="Close menu"
          @click="closeMobileMenu"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <div class="nav-label">MANAGEMENT</div>

        <RouterLink
          v-for="item in menuItems"
          :key="item.route"
          :to="item.route"
          class="nav-item"
          :class="{ active: isActive(item.route) }"
          @click="closeMobileMenu"
        >
          <span class="nav-icon">
            <i :class="item.icon"></i>
          </span>

          <span class="nav-text">{{ item.label }}</span>

          <span
            v-if="isActive(item.route)"
            class="active-indicator"
          ></span>
        </RouterLink>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <div class="sidebar-divider"></div>

        <RouterLink
          to="/"
          class="sidebar-action website-action"
          @click="closeMobileMenu"
        >
          <span class="action-icon website-icon">
            <i class="bi bi-globe2"></i>
          </span>

          <span class="action-text">
            <strong>View Website</strong>
            <small>Open public website</small>
          </span>

          <span class="action-arrow">
            <i class="bi bi-box-arrow-up-right"></i>
          </span>
        </RouterLink>

        <button
          type="button"
          class="sidebar-action logout-action"
          :disabled="isLoggingOut"
          @click="logout"
        >
          <span class="action-icon logout-icon">
            <i
              :class="isLoggingOut ? 'bi bi-hourglass-split' : 'bi bi-box-arrow-right'"
            ></i>
          </span>

          <span class="action-text">
            <strong>{{ isLoggingOut ? 'Logging out...' : 'Logout' }}</strong>
            <small>Sign out of administration</small>
          </span>

          <span class="action-arrow">
            <i class="bi bi-chevron-right"></i>
          </span>
        </button>

        <p v-if="logoutError" class="logout-error" role="alert">
          {{ logoutError }}
        </p>
      </div>
    </aside>

    <!-- Main Area -->
    <div class="main-area">
      <!-- Top Navbar -->
      <header class="top-navbar">
        <div class="navbar-left">
          <button
            type="button"
            class="mobile-menu-button"
            aria-label="Open menu"
            @click="mobileMenu = true"
          >
            <i class="bi bi-list"></i>
          </button>

          <div class="page-heading">
            <span class="page-system">SFXC Website</span>
            <h1>{{ pageTitle }}</h1>
          </div>
        </div>

        <div class="navbar-right">
          <!-- Notifications -->
          <div
            ref="notificationWrapper"
            class="notification-wrapper"
          >
            <button
              type="button"
              class="notification-button"
              aria-label="Notifications"
              :aria-expanded="notificationsOpen"
              aria-haspopup="dialog"
              @click.stop="toggleNotifications"
            >
              <i class="bi bi-bell-fill"></i>

              <span
                v-if="unreadCount > 0"
                class="notification-count"
              >
                {{ unreadCount > 99 ? '99+' : unreadCount }}
              </span>
            </button>

            <div
              v-if="notificationsOpen"
              class="notification-dropdown"
              role="dialog"
              aria-label="Notifications"
            >
              <div class="notification-header">
                <div>
                  <strong>Notifications</strong>
                  <small>Website activity and updates</small>
                </div>

                <button
                  v-if="unreadCount > 0"
                  type="button"
                  class="notification-mark-all"
                  @click="markAllAsRead"
                >
                  Mark all read
                </button>
              </div>

              <div
                v-if="notifications.length"
                class="notification-list"
              >
                <button
                  v-for="notification in notifications"
                  :key="notification.id"
                  type="button"
                  class="notification-item"
                  :class="{ 'notification-unread': !notification.read }"
                  @click="openNotification(notification)"
                >
                  <span class="notification-item-icon">
                    <i :class="notification.icon"></i>
                  </span>

                  <span class="notification-item-content">
                    <strong>{{ notification.title }}</strong>
                    <small>{{ notification.message }}</small>
                    <small class="notification-time">
                      {{ notification.createdAt }}
                    </small>
                  </span>

                  <span
                    v-if="!notification.read"
                    class="notification-unread-dot"
                    aria-label="Unread"
                  ></span>
                </button>
              </div>

              <div v-else class="notification-empty">
                <i class="bi bi-bell-slash"></i>
                <strong>No notifications yet</strong>
                <small>Website activity will appear here.</small>
              </div>

              <div class="notification-footer">
                <span>{{ unreadCount }} unread</span>
                <button
                  type="button"
                  @click="notificationsOpen = false"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          <!-- Admin Profile -->
          <div class="admin-profile">
            <div class="admin-avatar">A</div>

            <div class="admin-info">
              <strong>Administrator</strong>
              <span>Website Manager</span>
            </div>

            <i class="bi bi-chevron-down profile-arrow"></i>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="admin-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Base */
.admin-layout {
  min-height: 100vh;
  background: #f3f8f5;
  color: #17251d;
}

/* Sidebar */
.admin-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 245px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at top right, rgba(156, 255, 200, 0.09), transparent 32%),
    linear-gradient(180deg, #064e2a 0%, #07562f 55%, #064e2a 100%);
  color: #fff;
  box-shadow: 4px 0 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease;
}

.sidebar-header {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #fff;
  text-decoration: none;
}

.brand-logo {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 0 0 4px rgba(156, 255, 200, 0.03), 0 5px 15px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.brand-logo img {
  width: 31px;
  height: 31px;
  object-fit: contain;
}

.brand-text {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.brand-text strong {
  color: #fff;
  font-size: 14px;
  line-height: 1.1;
  font-weight: 750;
}

.brand-text span {
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.54);
  font-size: 8px;
  line-height: 1.1;
}

.mobile-close {
  display: none;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  cursor: pointer;
}

/* Sidebar Navigation */
.sidebar-nav {
  flex: 1;
  padding: 13px 9px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
}

.nav-label {
  margin: 3px 9px 7px;
  color: rgba(255, 255, 255, 0.38);
  font-size: 8px;
  font-weight: 750;
  letter-spacing: 0.1em;
}

.nav-item {
  position: relative;
  min-height: 38px;
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 2px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 7px;
  color: rgba(255, 255, 255, 0.67);
  text-decoration: none;
  font-size: 11px;
  font-weight: 500;
  transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.065);
  border-color: rgba(255, 255, 255, 0.05);
  color: #fff;
  transform: translateX(1px);
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(156, 255, 200, 0.14), rgba(156, 255, 200, 0.055));
  border-color: rgba(156, 255, 200, 0.08);
  color: #fff;
  box-shadow: inset 0 0 18px rgba(156, 255, 200, 0.025);
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: inherit;
  font-size: 13px;
}

.nav-item:hover .nav-icon {
  background: rgba(255, 255, 255, 0.06);
}

.nav-item.active .nav-icon {
  background: rgba(156, 255, 200, 0.12);
  color: #9cffc8;
}

.nav-text {
  flex: 1;
}

.active-indicator {
  width: 4px;
  height: 4px;
  flex: 0 0 4px;
  border-radius: 50%;
  background: #9cffc8;
  box-shadow: 0 0 7px rgba(156, 255, 200, 0.7);
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 8px 10px 11px;
}

.sidebar-divider {
  height: 1px;
  margin: 0 4px 9px;
  background: rgba(255, 255, 255, 0.09);
}

.sidebar-action {
  width: 100%;
  min-height: 46px;
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 5px;
  padding: 5px 8px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.website-action {
  border: 1px solid rgba(156, 255, 200, 0.2);
  background: linear-gradient(135deg, rgba(156, 255, 200, 0.09), rgba(156, 255, 200, 0.035));
  color: #fff;
}

.website-action:hover {
  background: linear-gradient(135deg, rgba(156, 255, 200, 0.16), rgba(156, 255, 200, 0.06));
  border-color: rgba(156, 255, 200, 0.35);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.website-icon {
  background: rgba(156, 255, 200, 0.12);
  color: #9cffc8;
}

.logout-action {
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.035);
  color: rgba(255, 255, 255, 0.68);
}

.logout-action:hover:not(:disabled) {
  background: rgba(255, 76, 91, 0.1);
  border-color: rgba(255, 130, 140, 0.12);
  color: #ffe1e4;
  transform: translateY(-1px);
}

.logout-action:disabled {
  opacity: 0.65;
  cursor: wait;
}

.action-icon {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  font-size: 14px;
  transition: transform 0.2s;
}

.sidebar-action:hover .action-icon {
  transform: scale(1.05);
}

.logout-icon {
  background: rgba(255, 255, 255, 0.055);
  color: #ffb7bf;
}

.logout-action:hover .logout-icon {
  background: rgba(255, 100, 115, 0.12);
  color: #ff9da8;
}

.action-text {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.action-text strong {
  font-size: 10px;
  line-height: 1.2;
  font-weight: 650;
}

.action-text small {
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.38);
  font-size: 8px;
  line-height: 1.2;
}

.website-action .action-text small {
  color: rgba(156, 255, 200, 0.5);
}

.action-arrow {
  color: rgba(255, 255, 255, 0.35);
  font-size: 10px;
  transition: color 0.2s, transform 0.2s;
}

.website-action:hover .action-arrow {
  color: #9cffc8;
  transform: translate(1px, -1px);
}

.logout-action:hover .action-arrow {
  color: #ffadb6;
  transform: translateX(2px);
}

.logout-error {
  margin: 6px 3px 0;
  color: #ffc6cc;
  font-size: 10px;
  line-height: 1.5;
}

/* Main Area */
.main-area {
  min-height: 100vh;
  margin-left: 245px;
}

/* Navbar */
.top-navbar {
  position: sticky;
  top: 0;
  z-index: 900;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid #e5ece7;
  backdrop-filter: blur(10px);
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-left {
  gap: 12px;
}

.navbar-right {
  gap: 14px;
}

.mobile-menu-button {
  display: none;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfe8e2;
  border-radius: 7px;
  background: #fff;
  color: #064e2a;
  cursor: pointer;
}

.mobile-menu-button:hover {
  background: #f3f8f5;
}

.page-heading {
  display: flex;
  flex-direction: column;
}

.page-system {
  color: #849088;
  font-size: 9px;
  font-weight: 600;
}

.page-heading h1 {
  margin: 2px 0 0;
  color: #064e2a;
  font-size: 17px;
  line-height: 1.1;
  font-weight: 700;
}

/* Notifications */
.notification-wrapper {
  position: relative;
}

.notification-button {
  position: relative;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e8e3;
  border-radius: 7px;
  background: #fff;
  color: #526159;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.notification-button:hover {
  background: #f3f8f5;
  border-color: #d5e2d9;
  color: #064e2a;
}

.notification-button > i {
  font-size: 14px;
}

.notification-count {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  border: 2px solid #fff;
  border-radius: 20px;
  background: #0b6b3a;
  color: #fff;
  font-size: 7px;
  font-weight: 700;
}

.notification-dropdown {
  position: absolute;
  top: 43px;
  right: 0;
  z-index: 1100;
  width: 320px;
  overflow: hidden;
  border: 1px solid #e1e9e4;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 12px 35px rgba(20, 55, 35, 0.13);
  animation: notification-appear 0.16s ease-out;
}

@keyframes notification-appear {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-bottom: 1px solid #edf2ee;
}

.notification-header > div {
  display: flex;
  flex-direction: column;
}

.notification-header strong {
  color: #26362d;
  font-size: 12px;
}

.notification-header small {
  margin-top: 3px;
  color: #8b958f;
  font-size: 9px;
}

.notification-mark-all {
  flex-shrink: 0;
  border: 0;
  background: transparent;
  color: #0b6b3a;
  font-size: 9px;
  font-weight: 700;
  cursor: pointer;
}

.notification-mark-all:hover {
  text-decoration: underline;
}

.notification-list {
  max-height: 340px;
  overflow-y: auto;
}

.notification-item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border: 0;
  border-bottom: 1px solid #f0f3f1;
  background: #fff;
  text-align: left;
  font: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.notification-item:last-child {
  border-bottom: 0;
}

.notification-item:hover {
  background: #f3f8f5;
}

.notification-item.notification-unread {
  background: #f0f8f2;
}

.notification-item.notification-unread:hover {
  background: #e6f3e9;
}

.notification-item-icon {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #eaf7ef;
  color: #0b6b3a;
  font-size: 13px;
}

.notification-item-content {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notification-item-content strong {
  color: #26362d;
  font-size: 11px;
  font-weight: 700;
}

.notification-item-content small {
  color: #7c8981;
  font-size: 10px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.notification-item-content .notification-time {
  color: #9aa49e;
  font-size: 9px;
}

.notification-unread-dot {
  width: 7px;
  height: 7px;
  flex: 0 0 7px;
  align-self: center;
  border-radius: 50%;
  background: #0b6b3a;
}

.notification-empty {
  padding: 28px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  text-align: center;
  color: #87938b;
}

.notification-empty > i {
  color: #0b6b3a;
  font-size: 24px;
}

.notification-empty strong {
  color: #35433b;
  font-size: 11px;
}

.notification-empty small {
  font-size: 9px;
}

.notification-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-top: 1px solid #edf2ee;
  color: #87938b;
  font-size: 9px;
}

.notification-footer button {
  border: 0;
  background: transparent;
  color: #0b6b3a;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
}

.notification-footer button:hover {
  text-decoration: underline;
}

/* Admin Profile */
.admin-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 12px;
  border-left: 1px solid #e3eae5;
}

.admin-avatar {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(145deg, #0b6b3a, #064e2a);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 3px 9px rgba(6, 78, 42, 0.18);
}

.admin-info {
  display: flex;
  flex-direction: column;
}

.admin-info strong {
  color: #35423b;
  font-size: 10px;
  line-height: 1.2;
}

.admin-info span {
  margin-top: 2px;
  color: #8a948e;
  font-size: 8px;
}

.profile-arrow {
  margin-left: 2px;
  color: #9aa49e;
  font-size: 9px;
}

/* Page Content */
.admin-content {
  min-height: calc(100vh - 70px);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 950;
  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(1px);
}

/* Tablet */
@media (max-width: 900px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }

  .admin-sidebar.sidebar-open {
    transform: translateX(0);
  }

  .mobile-close {
    display: flex;
  }

  .main-area {
    margin-left: 0;
  }

  .mobile-menu-button {
    display: flex;
  }

  .top-navbar {
    padding: 0 15px;
  }
}

/* Mobile */
@media (max-width: 576px) {
  .top-navbar {
    height: 62px;
    padding: 0 11px;
  }

  .admin-content {
    min-height: calc(100vh - 62px);
  }

  .page-system {
    font-size: 8px;
  }

  .page-heading h1 {
    font-size: 15px;
  }

  .navbar-right {
    gap: 7px;
  }

  .notification-button {
    width: 32px;
    height: 32px;
  }

  .admin-profile {
    padding-left: 7px;
  }

  .admin-info,
  .profile-arrow {
    display: none;
  }

  .admin-avatar {
    width: 31px;
    height: 31px;
  }

  .notification-dropdown {
    position: fixed;
    top: 57px;
    right: 10px;
    width: calc(100vw - 20px);
    max-width: 340px;
  }
}

/* Small Mobile */
@media (max-width: 380px) {
  .top-navbar {
    padding: 0 8px;
  }

  .navbar-left {
    gap: 7px;
  }

  .mobile-menu-button,
  .notification-button {
    width: 31px;
    height: 31px;
  }

  .page-heading h1 {
    font-size: 14px;
  }

  .brand-text span {
    font-size: 7px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .notification-dropdown {
    animation: none;
  }

  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>