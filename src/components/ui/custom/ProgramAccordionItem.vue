<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ProgramSection } from '@/data/iroData'

const props = defineProps<{
    section: ProgramSection
    isExpanded: boolean
    index?: number
}>()

defineEmits<{
    toggle: []
}>()
</script>

<template>
    <Card
        v-motion
        :initial="{ opacity: 0, y: 18 }"
        :visible-once="{
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 120,
                damping: 20,
                delay: (props.index ?? 0) * 60,
            },
        }"
        class="border border-border rounded-md overflow-hidden bg-card"
    >
        <Button
            @click="$emit('toggle')"
            variant="ghost"
            class="w-full flex justify-start items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 rounded-none transition-colors text-left font-semibold text-card-foreground h-auto relative whitespace-normal"
        >
            <span class="font-bold text-lg leading-none w-4 shrink-0 text-center text-primary">
                {{ props.isExpanded ? '-' : '+' }}
            </span>
            <span class="text-left w-full">{{ props.section.title }}</span>
        </Button>

        <div v-show="props.isExpanded" class="p-6 border-t border-border bg-card">
            <template v-for="(block, idx) in props.section.contentBlocks" :key="idx">
                <p
                    v-if="block.type === 'paragraph'"
                    class="text-muted-foreground leading-relaxed mb-4 last:mb-0"
                >
                    {{ block.content }}
                </p>

                <h4
                    v-else-if="block.type === 'subtitle'"
                    class="font-bold text-foreground text-md mt-6 mb-3"
                >
                    {{ block.content }}
                </h4>

                <ul
                    v-else-if="block.type === 'list'"
                    class="list-disc list-inside space-y-2 text-muted-foreground ml-2 mb-4 last:mb-0"
                >
                    <li v-for="(item, i) in block.items" :key="i" class="leading-relaxed">
                        {{ item }}
                    </li>
                </ul>

                <div
                    v-else-if="block.type === 'html'"
                    class="text-muted-foreground mb-4 last:mb-0"
                    v-html="block.content"
                ></div>
            </template>
        </div>
    </Card>
</template>
