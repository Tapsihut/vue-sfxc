<script setup lang="ts">
import { ref } from 'vue'

type SettingsTab =
  | 'general'
  | 'contact'
  | 'social'
  | 'homepage'
  | 'admin'

const activeTab = ref<SettingsTab>('general')
const savedMessage = ref(false)

const settings = ref({
  general: {
    schoolName: 'St. Francis Xavier College',
    shortName: 'SFXC',
    tagline: 'Education, Faith, and Service',
    description:
      'St. Francis Xavier College provides quality education grounded in faith, excellence, and service.',
    websiteUrl: 'https://sfxc.edu.ph',
  },

  contact: {
    address: '',
    phone: '',
    email: '',
    officeHours: '',
  },

  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    tiktok: '',
  },

  homepage: {
    showHeroSlides: true,
    showPrograms: true,
    showStatistics: true,
    showLatestNews: true,
    showEvents: true,
    newsLimit: 6,
  },

  admin: {
    compactSidebar: false,
    showNotifications: true,
    confirmDelete: true,
  },
})

function saveSettings() {
  savedMessage.value = true

  window.setTimeout(() => {
    savedMessage.value = false
  }, 2500)

  console.log('SFXC settings saved:', settings.value)
}

function resetSettings() {
  const confirmed = confirm(
    'Are you sure you want to reset the current settings?',
  )

  if (!confirmed) return

  settings.value = {
    general: {
      schoolName: 'St. Francis Xavier College',
      shortName: 'SFXC',
      tagline: 'Education, Faith, and Service',
      description:
        'St. Francis Xavier College provides quality education grounded in faith, excellence, and service.',
      websiteUrl: 'https://sfxc.edu.ph',
    },

    contact: {
      address: '',
      phone: '',
      email: '',
      officeHours: '',
    },

    social: {
      facebook: '',
      instagram: '',
      youtube: '',
      tiktok: '',
    },

    homepage: {
      showHeroSlides: true,
      showPrograms: true,
      showStatistics: true,
      showLatestNews: true,
      showEvents: true,
      newsLimit: 6,
    },

    admin: {
      compactSidebar: false,
      showNotifications: true,
      confirmDelete: true,
    },
  }
}

function selectTab(tab: SettingsTab) {
  activeTab.value = tab
}

function toggleSetting(
  object:
    | typeof settings.value.homepage
    | typeof settings.value.admin,
  key: string,
) {
  if (key in object) {
    const value = object[key as keyof typeof object]

    if (typeof value === 'boolean') {
      ;(object as Record<string, unknown>)[key] = !value
    }
  }
}
</script>

<template>
  <div class="settings-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <span>Admin</span>
          <i class="bi bi-chevron-right"></i>
          <strong>Settings</strong>
        </div>

        <h1>Settings</h1>
        <p>
          Manage the general configuration of the SFXC website.
        </p>
      </div>

      <div class="header-actions">
        <button
          type="button"
          class="secondary-btn"
          @click="resetSettings"
        >
          <i class="bi bi-arrow-counterclockwise"></i>
          Reset
        </button>

        <button
          type="button"
          class="primary-btn"
          @click="saveSettings"
        >
          <i class="bi bi-check-lg"></i>
          Save Changes
        </button>
      </div>
    </div>

    <!-- Saved Message -->
    <Transition name="fade">
      <div
        v-if="savedMessage"
        class="saved-message"
      >
        <i class="bi bi-check-circle-fill"></i>
        Settings saved successfully.
      </div>
    </Transition>

    <!-- Settings Layout -->
    <div class="settings-layout">
      <!-- Sidebar -->
      <aside class="settings-sidebar">
        <button
          type="button"
          :class="{ active: activeTab === 'general' }"
          @click="selectTab('general')"
        >
          <i class="bi bi-building"></i>

          <span>
            <strong>General</strong>
            <small>School information</small>
          </span>
        </button>

        <button
          type="button"
          :class="{ active: activeTab === 'contact' }"
          @click="selectTab('contact')"
        >
          <i class="bi bi-telephone"></i>

          <span>
            <strong>Contact</strong>
            <small>Contact information</small>
          </span>
        </button>

        <button
          type="button"
          :class="{ active: activeTab === 'social' }"
          @click="selectTab('social')"
        >
          <i class="bi bi-share"></i>

          <span>
            <strong>Social Media</strong>
            <small>Social links</small>
          </span>
        </button>

        <button
          type="button"
          :class="{ active: activeTab === 'homepage' }"
          @click="selectTab('homepage')"
        >
          <i class="bi bi-house"></i>

          <span>
            <strong>Homepage</strong>
            <small>Homepage display</small>
          </span>
        </button>

        <button
          type="button"
          :class="{ active: activeTab === 'admin' }"
          @click="selectTab('admin')"
        >
          <i class="bi bi-sliders"></i>

          <span>
            <strong>Admin Preferences</strong>
            <small>Dashboard preferences</small>
          </span>
        </button>
      </aside>

      <!-- Content -->
      <main class="settings-content">
        <!-- General -->
        <section
          v-if="activeTab === 'general'"
          class="settings-card"
        >
          <div class="section-header">
            <div class="section-icon">
              <i class="bi bi-building"></i>
            </div>

            <div>
              <h2>General Information</h2>
              <p>
                Basic information about the school website.
              </p>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="school-name">
                School Name
              </label>

              <input
                id="school-name"
                v-model="settings.general.schoolName"
                type="text"
                placeholder="School name"
              />
            </div>

            <div class="form-group">
              <label for="short-name">
                Short Name
              </label>

              <input
                id="short-name"
                v-model="settings.general.shortName"
                type="text"
                placeholder="SFXC"
              />
            </div>

            <div class="form-group full">
              <label for="tagline">
                Tagline
              </label>

              <input
                id="tagline"
                v-model="settings.general.tagline"
                type="text"
                placeholder="School tagline"
              />
            </div>

            <div class="form-group full">
              <label for="website-url">
                Website URL
              </label>

              <input
                id="website-url"
                v-model="settings.general.websiteUrl"
                type="url"
                placeholder="https://example.com"
              />
            </div>

            <div class="form-group full">
              <label for="school-description">
                Website Description
              </label>

              <textarea
                id="school-description"
                v-model="settings.general.description"
                rows="4"
                placeholder="Enter a short description of the school."
              ></textarea>

              <small>
                This can be used for website metadata and introductory
                content.
              </small>
            </div>
          </div>
        </section>

        <!-- Contact -->
        <section
          v-if="activeTab === 'contact'"
          class="settings-card"
        >
          <div class="section-header">
            <div class="section-icon">
              <i class="bi bi-telephone"></i>
            </div>

            <div>
              <h2>Contact Information</h2>
              <p>
                Information visitors can use to contact the school.
              </p>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group full">
              <label for="address">
                School Address
              </label>

              <textarea
                id="address"
                v-model="settings.contact.address"
                rows="3"
                placeholder="Enter the complete school address."
              ></textarea>
            </div>

            <div class="form-group">
              <label for="phone">
                Phone Number
              </label>

              <input
                id="phone"
                v-model="settings.contact.phone"
                type="text"
                placeholder="Contact number"
              />
            </div>

            <div class="form-group">
              <label for="email">
                Email Address
              </label>

              <input
                id="email"
                v-model="settings.contact.email"
                type="email"
                placeholder="school@example.com"
              />
            </div>

            <div class="form-group full">
              <label for="office-hours">
                Office Hours
              </label>

              <input
                id="office-hours"
                v-model="settings.contact.officeHours"
                type="text"
                placeholder="Monday - Friday, 8:00 AM - 5:00 PM"
              />
            </div>
          </div>
        </section>

        <!-- Social Media -->
        <section
          v-if="activeTab === 'social'"
          class="settings-card"
        >
          <div class="section-header">
            <div class="section-icon">
              <i class="bi bi-share"></i>
            </div>

            <div>
              <h2>Social Media</h2>
              <p>
                Add the official social media links of the school.
              </p>
            </div>
          </div>

          <div class="social-list">
            <div class="social-row">
              <div class="social-icon facebook">
                <i class="bi bi-facebook"></i>
              </div>

              <div class="social-label">
                <strong>Facebook</strong>
                <span>Official Facebook page</span>
              </div>

              <input
                v-model="settings.social.facebook"
                type="url"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div class="social-row">
              <div class="social-icon instagram">
                <i class="bi bi-instagram"></i>
              </div>

              <div class="social-label">
                <strong>Instagram</strong>
                <span>Official Instagram account</span>
              </div>

              <input
                v-model="settings.social.instagram"
                type="url"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div class="social-row">
              <div class="social-icon youtube">
                <i class="bi bi-youtube"></i>
              </div>

              <div class="social-label">
                <strong>YouTube</strong>
                <span>Official YouTube channel</span>
              </div>

              <input
                v-model="settings.social.youtube"
                type="url"
                placeholder="https://youtube.com/..."
              />
            </div>

            <div class="social-row">
              <div class="social-icon tiktok">
                <i class="bi bi-tiktok"></i>
              </div>

              <div class="social-label">
                <strong>TikTok</strong>
                <span>Official TikTok account</span>
              </div>

              <input
                v-model="settings.social.tiktok"
                type="url"
                placeholder="https://tiktok.com/@..."
              />
            </div>
          </div>
        </section>

        <!-- Homepage -->
        <section
          v-if="activeTab === 'homepage'"
          class="settings-card"
        >
          <div class="section-header">
            <div class="section-icon">
              <i class="bi bi-house"></i>
            </div>

            <div>
              <h2>Homepage Display</h2>
              <p>
                Choose which content blocks appear on the public
                homepage.
              </p>
            </div>
          </div>

          <div class="setting-list">
            <div class="setting-row">
              <div>
                <strong>Hero Slides</strong>
                <span>
                  Display the homepage hero slider.
                </span>
              </div>

              <label class="switch">
                <input
                  v-model="settings.homepage.showHeroSlides"
                  type="checkbox"
                />

                <span></span>
              </label>
            </div>

            <div class="setting-row">
              <div>
                <strong>Programs</strong>
                <span>
                  Display featured academic programs.
                </span>
              </div>

              <label class="switch">
                <input
                  v-model="settings.homepage.showPrograms"
                  type="checkbox"
                />

                <span></span>
              </label>
            </div>

            <div class="setting-row">
              <div>
                <strong>Statistics</strong>
                <span>
                  Display school statistics.
                </span>
              </div>

              <label class="switch">
                <input
                  v-model="settings.homepage.showStatistics"
                  type="checkbox"
                />

                <span></span>
              </label>
            </div>

            <div class="setting-row">
              <div>
                <strong>Latest News</strong>
                <span>
                  Display the latest published posts.
                </span>
              </div>

              <label class="switch">
                <input
                  v-model="settings.homepage.showLatestNews"
                  type="checkbox"
                />

                <span></span>
              </label>
            </div>

            <div class="setting-row">
              <div>
                <strong>Events</strong>
                <span>
                  Display upcoming school events.
                </span>
              </div>

              <label class="switch">
                <input
                  v-model="settings.homepage.showEvents"
                  type="checkbox"
                />

                <span></span>
              </label>
            </div>

            <div class="setting-row news-limit-row">
              <div>
                <strong>News Display Limit</strong>
                <span>
                  Number of news posts displayed on the homepage.
                </span>
              </div>

              <input
                v-model.number="settings.homepage.newsLimit"
                type="number"
                min="1"
                max="20"
              />
            </div>
          </div>
        </section>

        <!-- Admin Preferences -->
        <section
          v-if="activeTab === 'admin'"
          class="settings-card"
        >
          <div class="section-header">
            <div class="section-icon">
              <i class="bi bi-sliders"></i>
            </div>

            <div>
              <h2>Admin Preferences</h2>
              <p>
                Configure how the admin dashboard behaves.
              </p>
            </div>
          </div>

          <div class="setting-list">
            <div class="setting-row">
              <div>
                <strong>Compact Sidebar</strong>
                <span>
                  Use a smaller sidebar in the admin dashboard.
                </span>
              </div>

              <label class="switch">
                <input
                  v-model="settings.admin.compactSidebar"
                  type="checkbox"
                />

                <span></span>
              </label>
            </div>

            <div class="setting-row">
              <div>
                <strong>Show Notifications</strong>
                <span>
                  Display the notification button in the navbar.
                </span>
              </div>

              <label class="switch">
                <input
                  v-model="settings.admin.showNotifications"
                  type="checkbox"
                />

                <span></span>
              </label>
            </div>

            <div class="setting-row">
              <div>
                <strong>Confirm Before Delete</strong>
                <span>
                  Ask for confirmation before deleting content.
                </span>
              </div>

              <label class="switch">
                <input
                  v-model="settings.admin.confirmDelete"
                  type="checkbox"
                />

                <span></span>
              </label>
            </div>
          </div>

          <div class="notice-box">
            <i class="bi bi-info-circle"></i>

            <div>
              <strong>Frontend-only settings</strong>
              <p>
                These settings currently exist only in the browser
                application. A backend or database will be required
                before these values can be shared between devices or
                administrators.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- Bottom Actions -->
    <div class="bottom-actions">
      <span>
        <i class="bi bi-shield-check"></i>
        Changes are currently stored in the frontend application.
      </span>

      <div>
        <button
          type="button"
          class="secondary-btn"
          @click="resetSettings"
        >
          Reset
        </button>

        <button
          type="button"
          class="primary-btn"
          @click="saveSettings"
        >
          <i class="bi bi-check-lg"></i>
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  padding: 20px;
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 6px;
  color: #7a8b81;
  font-size: 11px;
}

.breadcrumb i {
  font-size: 9px;
}

.breadcrumb strong {
  color: #356047;
}

.page-header h1 {
  margin: 0;
  color: #103f24;
  font-size: 25px;
  font-weight: 800;
  line-height: 1.1;
}

.page-header p {
  margin: 5px 0 0;
  color: #718078;
  font-size: 12px;
}

.header-actions {
  display: flex;
  gap: 7px;
}

/* Buttons */
.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 34px;
  padding: 0 13px;
  border: 0;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.primary-btn {
  color: #fff;
  background: #0b6335;
  box-shadow: 0 3px 10px rgba(11, 99, 53, 0.15);
}

.primary-btn:hover {
  background: #084f2a;
}

.secondary-btn {
  color: #365247;
  background: #edf2ee;
}

.secondary-btn:hover {
  background: #e2eae4;
}

/* Saved message */
.saved-message {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 11px;
  margin-bottom: 12px;
  border: 1px solid #cfe5d5;
  border-radius: 7px;
  color: #27663e;
  background: #eff9f2;
  font-size: 11px;
  font-weight: 700;
}

.saved-message i {
  font-size: 13px;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-3px);
}

/* Layout */
.settings-layout {
  display: grid;
  grid-template-columns: 225px minmax(0, 1fr);
  gap: 13px;
  align-items: start;
}

/* Sidebar */
.settings-sidebar {
  position: sticky;
  top: 85px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 7px;
  border: 1px solid #e3eae5;
  border-radius: 9px;
  background: #fff;
}

.settings-sidebar button {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 9px;
  border: 0;
  border-radius: 7px;
  color: #68776f;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;
}

.settings-sidebar button:hover {
  color: #28523a;
  background: #f3f7f4;
}

.settings-sidebar button.active {
  color: #0b6335;
  background: #eaf5ed;
}

.settings-sidebar button > i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  border-radius: 6px;
  background: #f0f4f1;
  font-size: 13px;
}

.settings-sidebar button.active > i {
  background: #d9ebdf;
}

.settings-sidebar button span {
  min-width: 0;
}

.settings-sidebar button strong {
  display: block;
  font-size: 11px;
  line-height: 1.2;
}

.settings-sidebar button small {
  display: block;
  margin-top: 2px;
  color: #96a19b;
  font-size: 8px;
}

/* Content */
.settings-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #e3eae5;
  border-radius: 9px;
  background: #fff;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 13px;
  margin-bottom: 15px;
  border-bottom: 1px solid #edf1ee;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: 8px;
  color: #0b6335;
  background: #eaf5ed;
  font-size: 15px;
}

.section-header h2 {
  margin: 0;
  color: #193e2a;
  font-size: 15px;
  font-weight: 800;
}

.section-header p {
  margin: 3px 0 0;
  color: #89948e;
  font-size: 10px;
}

/* Forms */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #4d6255;
  font-size: 10px;
  font-weight: 700;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #dce5df;
  border-radius: 6px;
  outline: none;
  color: #263f31;
  background: #fff;
  font-family: inherit;
  font-size: 11px;
  transition: 0.2s ease;
}

.form-group input {
  height: 34px;
}

.form-group textarea {
  min-height: 75px;
  resize: vertical;
  line-height: 1.5;
}

.form-group input:focus,
.form-group textarea:focus,
.social-row input:focus,
.news-limit-row input:focus {
  border-color: #66a27d;
  box-shadow: 0 0 0 2px rgba(50, 132, 81, 0.08);
}

.form-group small {
  display: block;
  margin-top: 4px;
  color: #929c96;
  font-size: 9px;
}

/* Social */
.social-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-row {
  display: grid;
  grid-template-columns: 36px 155px minmax(0, 1fr);
  align-items: center;
  gap: 9px;
  padding: 8px;
  border: 1px solid #e7ede9;
  border-radius: 7px;
  background: #fbfcfb;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 7px;
  color: #fff;
  font-size: 15px;
  background: #5d7567;
}

.social-icon.facebook {
  background: #1877f2;
}

.social-icon.instagram {
  background: #b84e85;
}

.social-icon.youtube {
  background: #d92d2d;
}

.social-icon.tiktok {
  background: #222;
}

.social-label strong {
  display: block;
  color: #3c5647;
  font-size: 11px;
}

.social-label span {
  display: block;
  margin-top: 2px;
  color: #929c96;
  font-size: 8px;
}

.social-row input {
  width: 100%;
  height: 32px;
  padding: 0 9px;
  border: 1px solid #dce5df;
  border-radius: 6px;
  outline: none;
  color: #263f31;
  background: #fff;
  font-family: inherit;
  font-size: 10px;
}

/* Settings list */
.setting-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #e7ede9;
  border-radius: 7px;
  overflow: hidden;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  min-height: 58px;
  padding: 9px 11px;
  border-bottom: 1px solid #edf1ee;
}

.setting-row:last-child {
  border-bottom: 0;
}

.setting-row > div {
  min-width: 0;
}

.setting-row strong {
  display: block;
  color: #365444;
  font-size: 11px;
}

.setting-row span {
  display: block;
  margin-top: 3px;
  color: #929c96;
  font-size: 9px;
}

.news-limit-row input {
  width: 70px;
  height: 31px;
  padding: 0 8px;
  border: 1px solid #dce5df;
  border-radius: 6px;
  outline: none;
  color: #294535;
  font-size: 11px;
  text-align: center;
}

/* Switch */
.switch {
  position: relative;
  display: block;
  width: 35px;
  height: 20px;
  flex: 0 0 35px;
  cursor: pointer;
}

.switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.switch span {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: #ccd5cf;
  transition: 0.2s ease;
}

.switch span::after {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  content: '';
  transition: 0.2s ease;
}

.switch input:checked + span {
  background: #0b6335;
}

.switch input:checked + span::after {
  left: 18px;
}

/* Notice */
.notice-box {
  display: flex;
  gap: 9px;
  margin-top: 13px;
  padding: 10px;
  border: 1px solid #dce9df;
  border-radius: 7px;
  color: #5e7567;
  background: #f5f9f6;
}

.notice-box > i {
  color: #0b6335;
  font-size: 14px;
}

.notice-box strong {
  display: block;
  color: #3d5a49;
  font-size: 10px;
}

.notice-box p {
  margin: 3px 0 0;
  color: #7d8c83;
  font-size: 9px;
  line-height: 1.5;
}

/* Bottom actions */
.bottom-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 13px;
  padding: 10px 12px;
  border: 1px solid #e3eae5;
  border-radius: 9px;
  background: #fff;
}

.bottom-actions > span {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #8a958f;
  font-size: 9px;
}

.bottom-actions > span i {
  color: #4e8060;
}

.bottom-actions > div {
  display: flex;
  gap: 6px;
}

/* Responsive */
@media (max-width: 850px) {
  .settings-page {
    padding: 16px;
  }

  .settings-layout {
    grid-template-columns: 190px minmax(0, 1fr);
  }

  .social-row {
    grid-template-columns: 36px 120px minmax(0, 1fr);
  }
}

@media (max-width: 700px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions button {
    flex: 1;
  }

  .settings-layout {
    display: flex;
    flex-direction: column;
  }

  .settings-sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }

  .settings-sidebar button {
    padding: 8px;
  }

  .settings-content {
    width: 100%;
  }

  .bottom-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .bottom-actions > div {
    width: 100%;
  }

  .bottom-actions button {
    flex: 1;
  }
}

@media (max-width: 520px) {
  .settings-page {
    padding: 12px;
  }

  .page-header h1 {
    font-size: 22px;
  }

  .settings-sidebar {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .form-group.full {
    grid-column: auto;
  }

  .settings-card {
    padding: 12px;
  }

  .social-row {
    grid-template-columns: 36px 1fr;
  }

  .social-row input {
    grid-column: 1 / -1;
  }

  .setting-row {
    min-height: 55px;
  }
}

@media (max-width: 380px) {
  .header-actions {
    flex-direction: column;
  }

  .header-actions button {
    width: 100%;
  }

  .section-header {
    align-items: flex-start;
  }

  .bottom-actions > div {
    flex-direction: column;
  }

  .bottom-actions button {
    width: 100%;
  }
}
</style>
