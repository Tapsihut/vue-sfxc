<script setup lang="ts">
import type { Component } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-vue-next'

const props = defineProps<{
    title: string
    icon: Component
    items: string[]
}>()
</script>

<template>
    <Card class="border-0 shadow-sm">
        <CardHeader>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <component :is="props.icon" class="h-5 w-5 text-primary" />
                </div>
                <CardTitle class="text-xl">{{ props.title }}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <ul class="space-y-4">
                <li
                    v-for="(item, i) in props.items"
                    :key="item"
                    class="flex items-center gap-3"
                    v-motion
                    :initial="{ opacity: 0, x: -16 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 400, delay: i * 60, ease: 'easeOut' },
                    }"
                >
                    <CheckCircle2 class="h-5 w-5 text-primary shrink-0" />
                    <span class="text-muted-foreground">{{ item }}</span>
                </li>
            </ul>
        </CardContent>
    </Card>
</template>
