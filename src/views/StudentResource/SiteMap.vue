<script setup lang="ts">
import PageHero from '@/components/ui/custom/PageHero.vue'
import { Map, LayoutGrid, Clock } from 'lucide-vue-next'
</script>

<template>
    <!-- Hero -->
    <PageHero
        subtitle="A complete overview of all pages and sections available on the SFXC website."
    >
        <template #title>Site Map</template>
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
                    A structured site map listing all SFXC web pages and resources is being
                    assembled and will be published here soon.
                </p>
                <div class="flex items-center justify-center gap-2.5 mt-10">
                    <Clock class="w-4 h-4 text-muted-foreground" />
                    <p class="text-sm text-muted-foreground">Page currently under development</p>
                </div>
            </div>
        </div>
    </div>
</template>
