<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PageHero from '@/components/ui/custom/PageHero.vue'
import { useRecognitions } from '@/composables/useRecognitions'

const { recognitions, categories, searchQuery, activeCategory, filteredRecognitions, clear } =
    useRecognitions()
</script>

<template>
    <div class="min-h-screen bg-background pb-24">
        <PageHero
            subtitle="A testament to our unwavering commitment to quality education, continuous improvement, and global standards."
            subtitleMax="max-w-2xl"
        >
            <template #title>
                Accreditations &amp;<br class="hidden sm:block" />
                Recognitions
            </template>
        </PageHero>

        <!-- Sticky Toolbar -->
        <section
            class="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 lg:px-12 py-4 shadow-sm"
        >
            <div
                class="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
            >
                <div
                    class="relative w-full md:max-w-md"
                    v-motion
                    :initial="{ opacity: 0, y: -10 }"
                    :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 500 } }"
                >
                    <svg
                        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <Input
                        v-model="searchQuery"
                        placeholder="Search accreditations or awards..."
                        class="pl-9 bg-muted/40 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-ring transition-all"
                    />
                </div>

                <div
                    class="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar"
                    v-motion
                    :initial="{ opacity: 0, y: -10 }"
                    :enter="{ opacity: 1, y: 0, transition: { delay: 700, duration: 500 } }"
                >
                    <Button
                        v-for="cat in categories"
                        :key="cat"
                        @click="activeCategory = cat"
                        :variant="activeCategory === cat ? 'default' : 'ghost'"
                        size="sm"
                        class="whitespace-nowrap"
                    >
                        {{ cat }}
                    </Button>
                </div>
            </div>
        </section>

        <!-- Recognition Grid -->
        <section
            class="max-w-7xl mx-auto px-6 lg:px-12 mt-12"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
            <Transition name="fade">
                <div
                    v-if="filteredRecognitions.length === 0"
                    class="flex flex-col items-center justify-center py-24 text-center"
                >
                    <div
                        class="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4"
                    >
                        <svg
                            class="w-6 h-6 text-muted-foreground"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-foreground mb-1">
                        No recognitions found
                    </h3>
                    <p class="text-muted-foreground mb-6">
                        We couldn't find anything matching your search criteria.
                    </p>
                    <Button @click="clear" variant="link" size="sm"> Clear all filters </Button>
                </div>
            </Transition>

            <TransitionGroup
                name="list"
                tag="div"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            >
                <div
                    v-for="(item, index) in filteredRecognitions"
                    :key="item.id"
                    class="group relative aspect-square overflow-hidden cursor-pointer"
                    v-motion
                    :initial="{ opacity: 0, y: 15 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: index * 50,
                            duration: 500,
                            type: 'tween',
                            ease: 'easeOut',
                        },
                    }"
                >
                    <img
                        :src="item.image"
                        class="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                        class="absolute inset-0 mix-blend-multiply opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                        :class="item.color"
                    ></div>
                    <div class="absolute inset-0 p-4 sm:p-6 flex flex-col text-white z-10">
                        <div class="flex items-start gap-2 sm:gap-3">
                            <span
                                class="text-6xl sm:text-7xl font-black leading-none tracking-tighter"
                                >{{ index + 1 }}</span
                            >
                            <h3
                                class="text-lg sm:text-xl font-bold uppercase leading-tight mt-1 sm:mt-2 tracking-wide"
                            >
                                {{ item.title }}
                            </h3>
                        </div>
                        <div class="mt-auto flex justify-center sm:justify-start pb-2 sm:pb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="w-20 h-20 sm:w-24 sm:h-24 text-white opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                                v-html="item.icon"
                            ></svg>
                        </div>
                        <div
                            class="absolute inset-0 bg-black/80 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                        >
                            <p class="text-sm font-bold text-white mb-2 uppercase tracking-wider">
                                {{ item.badge }}
                            </p>
                            <p class="text-xs text-white/80 mb-4">{{ item.organization }}</p>
                            <p class="text-sm text-white/90 leading-relaxed">
                                {{ item.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        </section>
    </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
}
.list-leave-active {
    position: absolute;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
