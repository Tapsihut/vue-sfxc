<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Minus, ChevronRight } from 'lucide-vue-next'
import { parseRequirements } from '@/composables/useFinancialAid'
import type { FinancialAid } from '@/data/financialAids'

defineProps<{
    items: FinancialAid[]
    numbered?: boolean
}>()

const expanded = ref<Record<string, boolean>>({})
const nestedExpanded = ref<Record<string, boolean>>({})

const toggle = (name: string) => {
    expanded.value[name] = !expanded.value[name]
}

const toggleNested = (key: string) => {
    nestedExpanded.value[key] = !nestedExpanded.value[key]
}
</script>

<template>
    <div class="space-y-3">
        <div
            v-for="(aid, index) in items"
            :key="aid.name"
            class="border border-border rounded-md overflow-hidden bg-background"
        >
            <button
                @click="toggle(aid.name)"
                class="w-full flex items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 transition-colors text-left font-semibold text-foreground"
            >
                <span v-if="numbered" class="text-muted-foreground font-medium text-sm w-4">{{ index + 1 }}.</span>
                <Minus v-if="expanded[aid.name]" class="w-4 h-4 shrink-0 text-foreground" stroke-width="2.5" />
                <Plus v-else class="w-4 h-4 shrink-0 text-foreground/80" stroke-width="2.5" />
                <span class="flex-1">{{ aid.name }}</span>
            </button>

            <div v-show="expanded[aid.name]" class="p-6 border-t border-border bg-background">
                <div class="mb-6">
                    <div
                        v-if="aid.amount"
                        class="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" x2="12" y1="2" y2="22" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        {{ aid.amount }}
                    </div>
                    <p class="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                        {{ aid.description }}
                    </p>
                </div>

                <div class="gap-8 grid md:grid-cols-2">
                    <div v-if="aid.requirements && aid.requirements.length > 0">
                        <h4 class="text-sm font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-tertiary">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            REQUIREMENTS
                        </h4>
                        <ul class="space-y-3 text-sm">
                            <li v-for="(req, idx) in parseRequirements(aid.requirements)" :key="idx" class="leading-relaxed">
                                <div v-if="req.subItems" class="bg-muted/30 rounded-md border border-border">
                                    <button
                                        @click="toggleNested(`${aid.name}-req-${idx}`)"
                                        class="w-full flex items-center justify-between p-3 text-left font-medium text-foreground hover:bg-muted/50 transition-colors rounded-md"
                                    >
                                        <span>{{ req.text }}</span>
                                        <ChevronRight
                                            :class="[
                                                'w-4 h-4 shrink-0 transition-transform duration-200 text-muted-foreground',
                                                nestedExpanded[`${aid.name}-req-${idx}`] ? 'rotate-90' : '',
                                            ]"
                                        />
                                    </button>
                                    <div v-show="nestedExpanded[`${aid.name}-req-${idx}`]" class="px-3 pb-3 pt-1">
                                        <ul class="space-y-2 ml-2 border-l-2 border-primary/20 pl-4 py-1">
                                            <li
                                                v-for="(sub, subIdx) in req.subItems"
                                                :key="subIdx"
                                                class="text-muted-foreground text-sm leading-relaxed"
                                            >
                                                {{ sub }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-else class="flex items-start gap-2 pt-1">
                                    <span class="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                                    <span class="text-muted-foreground">{{ req.text }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div v-if="aid.applicationSteps && aid.applicationSteps.length > 0">
                        <h4 class="text-sm font-bold text-foreground mb-3 tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-tertiary">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
                                <path d="M12 11h4" /><path d="M12 16h4" />
                                <path d="M8 11h.01" /><path d="M8 16h.01" />
                            </svg>
                            APPLICATION STEPS
                        </h4>
                        <ul class="list-decimal list-outside ml-4 space-y-2 text-muted-foreground text-sm">
                            <li v-for="(step, idx) in aid.applicationSteps" :key="idx" class="leading-relaxed pl-1">
                                {{ step }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
