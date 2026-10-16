
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SFXCLogoOnly from '@/assets/images/sfxc-logo-only.png'
import SFXCTextOnly from '@/assets/images/sfxc-text-only.png'
import loginImage1 from '@/assets/images/login/login-image-01.jpg'
import loginImage2 from '@/assets/images/login/login-image-02.jpg'
import loginImage3 from '@/assets/images/login/login-image-03.jpg'
import authService from '@/services/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const images = [loginImage1, loginImage2, loginImage3]
const currentImage = ref(0)
let slideInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  slideInterval = setInterval(() => {
    currentImage.value = (currentImage.value + 1) % images.length
  }, 5000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

const handleLogin = async (): Promise<void> => {
  errorMessage.value = ''
  const normalizedEmail = email.value.trim()

  if (!normalizedEmail || !password.value) {
    errorMessage.value = 'Please enter your email and password.'
    return
  }

  isLoading.value = true

  try {
    const response = await authService.login(normalizedEmail, password.value)

    if (!response.user?.is_admin) {
      errorMessage.value = 'Your account is not authorized to access the admin dashboard.'
      return
    }

    await router.push('/admin')
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const data = error.response?.data

      if (status === 419 || data?.message === 'CSRF token mismatch.') {
        errorMessage.value = 'Your security session is invalid. Please refresh the page and try again.'
      } else if (status === 401) {
        errorMessage.value = data?.message ?? 'Invalid email or password.'
      } else if (status === 403) {
        errorMessage.value = data?.message ?? 'You are not authorized to access the admin dashboard.'
      } else if (status === 422) {
        errorMessage.value = data?.errors?.email?.[0] ?? data?.errors?.password?.[0] ?? data?.message ?? 'Please check your email and password.'
      } else if (!error.response) {
        errorMessage.value = 'Cannot connect to the server. Please check that Laravel is running and your connection settings are correct.'
      } else {
        errorMessage.value = data?.message ?? 'Unable to sign in. Please try again.'
      }
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

const goToForgotPassword = (): void => {
  router.push('/forgot-password')
}
</script>

<template>
  <div class="login-page">
    <div class="login-wrapper">
      <div class="login-box">
        <div class="logo-area">
          <img :src="SFXCLogoOnly" alt="SFXC Logo" class="school-logo" />
          <img :src="SFXCTextOnly" alt="St. Francis Xavier College" class="school-text" />
        </div>

        <div class="welcome-section">
          <h1>Welcome Back!</h1>
          <p>Sign in to your SFXC account</p>
        </div>

        <div v-if="errorMessage" class="alert" role="alert" aria-live="polite">
          {{ errorMessage }}
        </div>

        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" placeholder="Enter your email" autocomplete="username" required :disabled="isLoading" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="password-wrapper">
              <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" autocomplete="current-password" required :disabled="isLoading" />
              <button type="button" class="password-toggle" :disabled="isLoading" :aria-label="showPassword ? 'Hide password' : 'Show password'" :aria-pressed="showPassword" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-2.67 3.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              </button>
            </div>
          </div>

          <div class="forgot-wrapper">
            <button type="button" class="forgot-password" :disabled="isLoading" @click="goToForgotPassword">Forgot Password?</button>
          </div>

          <button type="submit" class="btn-login" :disabled="isLoading">
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="loading-content">
              <span class="spinner"></span>
              Signing In...
            </span>
          </button>
        </form>
      </div>

      <div class="image-box">
        <div class="image-slideshow">
          <div v-for="(image, index) in images" :key="image" class="slide" :class="{ active: currentImage === index }" :style="{ backgroundImage: `url(${image})` }"></div>
        </div>
        <div class="image-overlay"></div>
        <div class="image-content">
          <div class="since-text">SFXC • Since 1991</div>
          <h2>EXCELLENCE<br />IN EDUCATION</h2>
          <div class="divider"></div>
          <p>Empowering learners through quality education, faith, and service.</p>
        </div>
        <div class="slide-indicators">
          <button v-for="(_, index) in images" :key="index" type="button" class="indicator" :class="{ active: currentImage === index }" :aria-label="`Show slide ${index + 1}`" :aria-pressed="currentImage === index" @click="currentImage = index"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page{min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:30px;box-sizing:border-box;background:#f3f8f5}
.login-wrapper{width:1100px;max-width:100%;display:flex;background:#fff;border-radius:25px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.12)}
.login-box{width:50%;padding:60px;box-sizing:border-box}
.logo-area{display:flex;align-items:center;gap:16px;margin-bottom:45px}
.school-logo{width:75px;height:75px;object-fit:contain}
.school-text{width:190px;max-width:calc(100% - 90px);height:auto;object-fit:contain}
.welcome-section{margin-bottom:30px}
.welcome-section h1{margin:0 0 8px;color:#123c2a;font-size:34px;font-weight:700;line-height:1.2}
.welcome-section p{margin:0;color:#6b7280;font-size:15px}
.alert{margin-bottom:20px;padding:12px 15px;border:1px solid #f5c2c2;border-radius:10px;background:#fff1f1;color:#b42318;font-size:14px;line-height:1.5;overflow-wrap:anywhere}
.login-form{width:100%}
.form-group{margin-bottom:22px}
.form-group label{display:block;margin-bottom:8px;color:#24352d;font-size:14px;font-weight:600}
.form-group input{width:100%;height:52px;padding:0 15px;box-sizing:border-box;border:1px solid #d7dfda;border-radius:12px;outline:none;background:#fff;color:#1f2937;font-family:inherit;font-size:14px;transition:border-color .2s ease,box-shadow .2s ease}
.form-group input::placeholder{color:#9ca3af}
.form-group input:focus{border-color:#0b6b3a;box-shadow:0 0 0 3px rgba(11,107,58,.1)}
.form-group input:disabled{background:#f5f7f6;cursor:not-allowed}
.password-wrapper{position:relative}
.password-wrapper input{padding-right:50px}
.password-toggle{position:absolute;top:50%;right:15px;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:30px;height:30px;padding:0;border:none;background:transparent;color:#6b7280;cursor:pointer}
.password-toggle:hover{color:#0b6b3a}
.password-toggle:disabled,.forgot-password:disabled{cursor:not-allowed;opacity:.6}
.forgot-wrapper{display:flex;justify-content:flex-end;margin-top:-8px;margin-bottom:25px}
.forgot-password{padding:0;border:none;background:transparent;color:#0b6b3a;font-size:13px;font-weight:600;cursor:pointer}
.forgot-password:hover{text-decoration:underline}
.btn-login{width:100%;min-height:52px;padding:12px;border:none;border-radius:12px;background:#0b6b3a;color:#fff;font-family:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s ease,transform .2s ease,box-shadow .2s ease}
.btn-login:hover:not(:disabled){background:#095c32;box-shadow:0 8px 20px rgba(11,107,58,.18);transform:translateY(-1px)}
.btn-login:disabled{opacity:.7;cursor:not-allowed}
.loading-content{display:flex;align-items:center;justify-content:center;gap:10px}
.spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.image-box{position:relative;width:50%;min-height:650px;overflow:hidden;background:#0b6b3a}
.image-slideshow{position:absolute;inset:0}
.slide{position:absolute;inset:0;background-position:center;background-size:cover;background-repeat:no-repeat;opacity:0;transition:opacity 1s ease}
.slide.active{opacity:1}
.image-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(4,73,38,.9),rgba(11,107,58,.72))}
.image-content{position:absolute;z-index:2;top:50%;left:0;right:0;transform:translateY(-50%);padding:60px;color:#fff}
.since-text{margin-bottom:20px;font-size:14px;font-weight:500;letter-spacing:1px;opacity:.9}
.image-content h2{margin:0;font-size:50px;font-weight:800;line-height:1.08;letter-spacing:1px}
.divider{width:65px;height:4px;margin:25px 0;border-radius:10px;background:#fff}
.image-content p{max-width:400px;margin:0;font-size:16px;line-height:1.7;opacity:.92}
.slide-indicators{position:absolute;z-index:3;bottom:30px;left:60px;display:flex;gap:8px}
.indicator{width:25px;height:4px;padding:0;border:none;border-radius:10px;background:rgba(255,255,255,.4);cursor:pointer;transition:width .3s ease,background .3s ease}
.indicator.active{width:40px;background:#fff}
@media(max-width:900px){.login-page{padding:20px}.login-box{padding:40px}.logo-area{margin-bottom:35px}.school-logo{width:60px;height:60px}.school-text{width:160px}.welcome-section h1{font-size:30px}.image-box{min-height:600px}.image-content{padding:40px}.image-content h2{font-size:40px}.slide-indicators{left:40px}}
@media(max-width:700px){.login-page{padding:15px}.login-wrapper{width:100%;display:block;border-radius:20px}.login-box{width:100%;padding:35px 25px}.image-box{display:none}.logo-area{justify-content:center;margin-bottom:30px}.school-logo{width:60px;height:60px}.school-text{width:160px}.welcome-section{text-align:center}.welcome-section h1{font-size:28px}.welcome-section p{font-size:14px}}
@media(max-width:576px){.login-page{padding:10px}.login-wrapper{border-radius:16px}.login-box{padding:30px 20px}.image-box{display:none}.logo-area{gap:10px;margin-bottom:30px}.school-logo{width:50px;height:50px}.school-text{width:140px}.welcome-section h1{font-size:26px}.welcome-section p{font-size:14px}.form-group input,.btn-login{min-height:50px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>