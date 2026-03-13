<script setup lang="ts">
import { Phone } from 'lucide-vue-next'
import type { ContactGroup } from '@/data/emergencyContacts'

defineProps<{
    group: ContactGroup
    delay?: number
}>()
</script>

<template>
    <div
        class="border border-border rounded-2xl overflow-hidden"
        v-motion
        :initial="{ opacity: 0, y: 28, scale: 0.97 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: delay ?? 0,
                duration: 650,
                type: 'spring',
                stiffness: 100,
                damping: 18,
            },
        }"
    >
        <div class="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
            <component :is="group.icon" class="w-5 h-5 text-primary shrink-0" />
            <span class="font-semibold text-sm text-foreground uppercase tracking-wide">
                {{ group.group }}
            </span>
        </div>

        <div class="divide-y divide-border">
            <div
                v-for="contact in group.contacts"
                :key="contact.name"
                class="flex items-center justify-between px-6 py-4"
            >
                <span class="text-sm text-foreground">{{ contact.name }}</span>
                <a
                    :href="`tel:${contact.number.replace(/-/g, '')}`"
                    class="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer"
                >
                    <Phone class="w-3.5 h-3.5" />
                    {{ contact.number }}
                </a>
            </div>
        </div>
    </div>
</template>
