<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import PageHero from '@/components/ui/custom/PageHero.vue'
import SectionHeader from '@/components/ui/custom/SectionHeader.vue'
import CollegeTile from '@/components/ui/custom/CollegeTile.vue'
import ProgramTile from '@/components/ui/custom/ProgramTile.vue'
import { colleges, otherPrograms } from '@/data/academicPrograms'
import { usePrograms } from '@/composables/usePrograms'

const {
    selectedCollege,
    programsSection,
    filteredPrograms,
    selectedCollegeName,
    selectCollege,
    navigateToProgram,
} = usePrograms()
</script>

<template>
    <div class="min-h-screen bg-background pb-24">
        <PageHero
            subtitle="Forming Xavier Knights committed to service, excellence, and Christ-centeredness."
            subtitleMax="max-w-2xl"
        >
            <template #title>Academic Programs</template>
        </PageHero>

        <!-- Content Wrapper -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <!-- Intro -->
            <div class="mb-24">
                <div
                    class="flex items-center gap-4 mb-6"
                    v-motion
                    :initial="{ opacity: 0, x: -24 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 600, ease: 'easeOut' },
                    }"
                >
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Our Mission</span
                    >
                </div>
                <div
                    class="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 120, duration: 600, ease: 'easeOut' },
                    }"
                >
                    <p>
                        At St. Francis Xavier College, we form Xavier Knights, committed to service,
                        strengthened by fortitude, driven toward excellence, and grounded in
                        Christ-centeredness.
                    </p>
                    <p>
                        Here, you don't just learn — you grow in character, conviction, and purpose.
                        Our holistic education shapes not only what you know, but who you become.
                    </p>
                    <div
                        class="border-l-4 border-tertiary pl-6 md:pl-8 py-4 my-10 bg-muted/30 rounded-r-lg"
                    >
                        <p class="text-2xl md:text-3xl font-bold text-primary mb-2 leading-tight">
                            This is where leaders are formed.<br />
                            This is where impact begins.
                        </p>
                    </div>
                    <p class="font-bold text-foreground text-xl">
                        Choose SFXC. Become a Xavier Knight.
                    </p>
                </div>
            </div>

            <Separator class="my-16" />

            <!-- College Selection Section -->
            <div class="mt-16 md:mt-24">
                <div class="mb-12">
                    <SectionHeader
                        label="Colleges"
                        title="Start your Xavier Knight Education today"
                        description="Select a college to explore our various programs and find the path that fits your goals."
                    />
                </div>

                <!-- College Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <CollegeTile
                        v-for="(college, index) in colleges"
                        :key="college.id"
                        :college="college"
                        :is-selected="selectedCollege === college.code"
                        :index="index"
                        @select="selectCollege"
                    />
                </div>

                <!-- Programs Grid -->
                <Transition name="slide-down">
                    <div
                        v-if="selectedCollege && filteredPrograms.length > 0"
                        class="mt-8"
                        ref="programsSection"
                    >
                        <div
                            class="flex items-center gap-4 mb-8"
                            v-motion
                            :initial="{ opacity: 0, x: -24 }"
                            :enter="{
                                opacity: 1,
                                x: 0,
                                transition: { duration: 500, ease: 'easeOut' },
                            }"
                        >
                            <div class="w-8 h-0.5 bg-primary"></div>
                            <h2 class="text-2xl md:text-3xl font-bold text-foreground">
                                {{ selectedCollegeName }}
                            </h2>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <ProgramTile
                                v-for="(program, index) in filteredPrograms"
                                :key="program.id"
                                :program="program"
                                :index="index"
                                @navigate="navigateToProgram"
                            />
                        </div>
                    </div>
                </Transition>
            </div>

            <Separator class="my-16" />

            <!-- Other Programs Section -->
            <div class="py-8">
                <SectionHeader
                    label="More Opportunities"
                    title="Explore Other Programs"
                    description="Discover other educational opportunities and offices dedicated to your success:"
                />

                <div
                    class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
                    v-motion
                    :initial="{ opacity: 0, y: 16 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 300, duration: 600, ease: 'easeOut' },
                    }"
                >
                    <router-link
                        v-for="program in otherPrograms"
                        :key="program.name"
                        :to="program.link"
                        class="group flex flex-col gap-2 rounded-xl border border-border p-5 hover:border-primary/50 hover:bg-muted/30 transition-all duration-200"
                    >
                        <span
                            class="font-semibold text-foreground group-hover:text-primary transition-colors"
                            >{{ program.name }}</span
                        >
                        <span class="text-sm text-muted-foreground leading-relaxed">{{
                            program.description
                        }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.4s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-1rem);
}
</style>
