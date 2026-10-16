<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import GuestLayout from '@/layouts/GuestLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()

const layouts = {
  guest: GuestLayout,
  default: GuestLayout,
  auth: AuthLayout,
}

const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const currentLayout = computed(() => {
  if (isAdminRoute.value) return undefined

  const layoutName = (route.meta.layout as keyof typeof layouts) || 'guest'

  return layouts[layoutName] ?? GuestLayout
})
</script>

<template>
  <RouterView v-if="isAdminRoute" />

  <component v-else :is="currentLayout">
    <RouterView />
  </component>
</template>

