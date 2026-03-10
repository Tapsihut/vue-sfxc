<script setup lang="ts">
import { Briefcase, GraduationCap, Clock } from 'lucide-vue-next'
</script>

<template>
    <!-- Hero -->
    <section class="relative h-[75dvh] overflow-hidden">
        <img
            src="/src/assets/images/sfxc-building.jpg"
            alt="SFXC Building"
            class="absolute inset-0 w-full h-full object-cover"
        />
        <div
            class="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10 z-1"
        ></div>
        <div
            class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent z-1"
        ></div>
        <div
            class="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-primary/25 to-transparent z-1"
        ></div>
        <div class="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
            <div class="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-16 pb-12 md:pb-16">
                <div class="hidden md:flex items-center gap-4 mb-6">
                    <div class="w-10 h-0.5 bg-primary"></div>
                    <span class="text-white/50 text-xs font-medium uppercase tracking-[0.3em]"
                        >St. Francis Xavier College</span
                    >
                </div>
                <h1
                    class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    Career Services
                </h1>
                <p class="text-base md:text-lg text-white/60 max-w-xl leading-relaxed">
                    Empowering students with the guidance and tools to launch successful careers.
                </p>
            </div>
        </div>
    </section>

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
                    Detailed information about career counseling, job placement, and employment
                    resources is being prepared and will be available soon.
                </p>
                <div class="flex items-center justify-center gap-2.5 mt-10">
                    <Clock class="w-4 h-4 text-muted-foreground" />
                    <p class="text-sm text-muted-foreground">Page currently under development</p>
                </div>
            </div>
        </div>
    </div>
</template>
