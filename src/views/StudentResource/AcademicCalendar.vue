<script setup lang="ts">
import PageHero from '@/components/ui/custom/PageHero.vue'
import { CalendarDays, BookOpenCheck, Clock } from 'lucide-vue-next'
</script>

<template>
    <PageHero
        subtitle="Key dates, enrollment periods, holidays, and important events for the academic year."
    >
        <template #title>Academic Calendar</template>
    </PageHero>

    <!-- Coming Soon -->
    <div class="min-h-screen bg-background pb-24">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <div class="max-w-2xl mx-auto text-center">
                <div class="flex items-center justify-center gap-4 mb-8">
                    <div class="w-12 h-0.5 bg-border"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Coming Soon</span
                    >
                    <div class="w-12 h-0.5 bg-border"></div>
                </div>
                <h2
                    class="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    We're preparing this page
                </h2>
                <p class="text-lg text-muted-foreground leading-relaxed mb-14">
                    The academic calendar for AY 2025–2026 is being finalized and will be published
                    here soon. Check back for enrollment dates, holidays, and exam schedules.
                </p>
                <div class="flex items-center justify-center gap-2.5 mt-10">
                    <Clock class="w-4 h-4 text-muted-foreground" />
                    <p class="text-sm text-muted-foreground">Page currently under development</p>
                </div>
            </div>
        </div>
    </div>
</template>
