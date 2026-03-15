<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { IroUpdate } from '@/data/iroData'

const props = defineProps<{
    item: IroUpdate
    index: number
}>()
</script>

<template>
    <Card
        v-motion
        :initial="{ opacity: 0, scale: 0.94 }"
        :visible-once="{
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 90,
                damping: 16,
                delay: props.index * 90,
            },
        }"
        class="overflow-hidden border-border rounded-xl hover:shadow-lg transition-shadow flex flex-col group bg-card p-0"
    >
        <div class="h-56 overflow-hidden">
            <img
                :src="props.item.image"
                :alt="props.item.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <CardHeader class="pb-2">
            <div class="mb-2">
                <Badge variant="secondary" class="font-bold">
                    {{ props.item.category }}
                </Badge>
            </div>
            <CardTitle class="text-xl font-bold line-clamp-2 transition-colors text-foreground">
                {{ props.item.title }}
            </CardTitle>
            <div class="flex items-center text-xs text-muted-foreground pt-1 space-x-4">
                <div class="flex items-center">
                    <span>by: {{ props.item.author }}</span>
                </div>
                <div class="flex items-center">
                    <span>{{ props.item.date }}</span>
                </div>
            </div>
        </CardHeader>
        <CardContent class="flex-1">
            <CardDescription class="text-sm line-clamp-3">
                {{ props.item.excerpt }}
            </CardDescription>
        </CardContent>
    </Card>
</template>
