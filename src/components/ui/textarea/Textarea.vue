<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <textarea
    v-model="modelValue"
    :class="cn(
      'flex min-h-20 w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-base text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      props.class,
    )"
  />
</template>
