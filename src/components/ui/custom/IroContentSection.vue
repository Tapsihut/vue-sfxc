<script setup lang="ts">
import type { ProgramSection } from '@/data/iroData'

const props = defineProps<{
    section: ProgramSection
}>()
</script>

<template>
    <div class="space-y-5">
        <div class="border-b border-border pb-2">
            <h3 class="text-2xl font-bold text-primary">{{ props.section.title }}</h3>
        </div>

        <div class="text-muted-foreground space-y-4">
            <template v-for="(block, idx) in props.section.contentBlocks" :key="idx">
                <p v-if="block.type === 'paragraph'" class="leading-relaxed text-lg">
                    {{ block.content }}
                </p>

                <h4
                    v-else-if="block.type === 'subtitle'"
                    class="font-bold text-foreground text-xl mt-8"
                >
                    {{ block.content }}
                </h4>

                <ul
                    v-else-if="block.type === 'list'"
                    class="list-disc list-outside space-y-3 ml-6 text-lg"
                >
                    <li
                        v-for="(item, i) in block.items"
                        :key="i"
                        class="leading-relaxed pl-1"
                        v-motion
                        :initial="{ opacity: 0, x: 24 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 450, delay: i * 70, ease: 'easeOut' },
                        }"
                    >
                        {{ item }}
                    </li>
                </ul>

                <div v-else-if="block.type === 'html'" class="text-lg" v-html="block.content"></div>
            </template>
        </div>
    </div>
</template>
