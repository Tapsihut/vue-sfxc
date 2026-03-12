<script setup lang="ts">
import type { MiniNewsItem } from '@/data/homeNews'

defineProps<{
    item: MiniNewsItem
}>()
</script>

<template>
    <div
        class="group relative flex gap-4 bg-card hover:bg-accent/5 rounded-2xl overflow-hidden p-3 transition-colors duration-300 border border-border/40 focus-within:ring-2 focus-within:ring-primary cursor-pointer"
    >
        <div class="w-32 h-32 shrink-0 overflow-hidden rounded-xl">
            <img
                :src="item.image"
                :alt="item.alt"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
        </div>
        <div class="flex flex-col py-2 pr-2 justify-center">
            <span class="text-primary text-xs font-bold uppercase tracking-wider mb-2">
                {{ item.category }}
            </span>
            <h4
                class="font-bold text-foreground mb-2 line-clamp-2 text-base group-hover:text-primary transition-colors"
            >
                {{ item.title }}
            </h4>
            <span class="text-xs text-muted-foreground mt-auto flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    class="mr-1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                {{ item.date }}
            </span>
        </div>
    </div>
</template>
