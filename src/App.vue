<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import GuestLayout from '@/layouts/GuestLayout.vue'

const route = useRoute()

const layouts = {
    guest: GuestLayout,
}

const currentLayout = computed(() => {
    const layoutName = (route.meta.layout as string) || 'default'
    return layouts[layoutName as keyof typeof layouts]
})
</script>

<template>
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>
