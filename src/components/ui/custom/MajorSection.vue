<script setup lang="ts">
import ProgramAccordionItem from '@/components/ui/custom/ProgramAccordionItem.vue'
import type { Major } from '@/data/programTypes'

const props = defineProps<{
    major: Major
    expandedItems: Record<string, boolean>
}>()

defineEmits<{
    toggle: [title: string]
}>()
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 110, damping: 20 },
        }"
        class="space-y-6 scroll-mt-28"
    >
        <div class="border-b border-border pb-2">
            <h3 class="text-2xl font-bold text-primary">{{ props.major.name }}</h3>
        </div>
        <p class="text-muted-foreground leading-relaxed text-lg">{{ props.major.description }}</p>
        <div class="space-y-3">
            <ProgramAccordionItem
                v-for="(section, idx) in props.major.details"
                :key="section.title"
                :section="section"
                :is-expanded="!!props.expandedItems[section.title]"
                :index="idx"
                @toggle="$emit('toggle', section.title)"
            />
        </div>
    </div>
</template>
