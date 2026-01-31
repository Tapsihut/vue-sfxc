<script setup lang="ts">
import { computed } from 'vue'

interface SchoolLogoProps {
    variant?: 'horizontal' | 'vertical' | 'logo-only' | 'text-only'
    logoSrc: string
    textSrc: string
    alt?: string
    logoClass?: string
    textClass?: string
}

const props = withDefaults(defineProps<SchoolLogoProps>(), {
    variant: 'horizontal',
    alt: 'SFXC Logo',
    logoClass: '',
    textClass: '',
})

const containerClasses = computed(() => {
    const baseClasses = 'inline-flex items-center'

    switch (props.variant) {
        case 'horizontal':
            return `${baseClasses} flex-row gap-3`
        case 'vertical':
            return `${baseClasses} flex-col gap-2`
        case 'logo-only':
        case 'text-only':
            return baseClasses
        default:
            return baseClasses
    }
})

const showLogo = computed(
    () =>
        props.variant === 'horizontal' ||
        props.variant === 'vertical' ||
        props.variant === 'logo-only',
)

const showText = computed(
    () =>
        props.variant === 'horizontal' ||
        props.variant === 'vertical' ||
        props.variant === 'text-only',
)
</script>

<template>
    <div :class="containerClasses">
        <img
            v-if="showLogo"
            :src="logoSrc"
            :alt="alt"
            :class="['object-contain h-auto', props.logoClass]"
        />
        <img
            v-if="showText"
            :src="textSrc"
            :alt="`${alt} Text`"
            :class="['object-contain h-auto', props.textClass]"
        />
    </div>
</template>
