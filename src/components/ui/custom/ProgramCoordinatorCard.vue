<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { ProgramCoordinator } from '@/data/programTypes'

const props = defineProps<{
    coordinator: ProgramCoordinator
    delay?: number
}>()
</script>

<template>
    <Card
        v-motion
        :initial="{ opacity: 0, x: 24 }"
        :visible-once="{
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 18,
                delay: props.delay ?? 0,
            },
        }"
        class="overflow-hidden shadow-lg bg-card border-border"
    >
        <CardHeader class="pb-4">
            <div class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted">
                <img
                    :src="props.coordinator.image"
                    :alt="props.coordinator.name"
                    class="w-full h-full object-cover"
                />
            </div>
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">
                {{ props.coordinator.name }}
            </CardTitle>
            <CardDescription class="text-sm font-medium">
                {{ props.coordinator.role }}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Separator class="mb-6" />
            <div class="space-y-4">
                <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
                <div class="space-y-3 text-sm text-card-foreground">
                    <div
                        v-for="contact in props.coordinator.contacts"
                        :key="contact.label"
                        class="flex items-start gap-3"
                    >
                        <span class="mt-0.5 font-medium text-muted-foreground shrink-0">
                            {{ contact.label }}:
                        </span>
                        <span class="whitespace-pre-line">{{ contact.value }}</span>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
