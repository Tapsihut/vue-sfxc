<script setup lang="ts">
defineProps<{
    subtitle: string
    subtitleMax?: string
}>()
</script>

<template>
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
                <div
                    class="hidden md:flex items-center gap-4 mb-6"
                    v-motion
                    :initial="{ opacity: 0, x: -20 }"
                    :enter="{ opacity: 1, x: 0, transition: { delay: 200, duration: 700 } }"
                >
                    <div class="w-10 h-0.5 bg-primary"></div>
                    <span class="text-white/50 text-xs font-medium uppercase tracking-[0.3em]"
                        >St. Francis Xavier College</span
                    >
                </div>
                <h1
                    class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4"
                    style="font-family: 'Times New Roman', Times, serif"
                    v-motion
                    :initial="{ opacity: 0, y: 30 }"
                    :enter="{ opacity: 1, y: 0, transition: { delay: 350, duration: 800 } }"
                >
                    <slot name="title" />
                </h1>
                <p
                    class="text-base md:text-lg text-white/60 leading-relaxed"
                    :class="subtitleMax ?? 'max-w-md'"
                    v-motion
                    :initial="{ opacity: 0, y: 20 }"
                    :enter="{ opacity: 1, y: 0, transition: { delay: 500, duration: 700 } }"
                >
                    {{ subtitle }}
                </p>
            </div>
        </div>
    </section>
</template>
