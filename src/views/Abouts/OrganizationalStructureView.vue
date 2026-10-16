<script setup lang="ts">
import { computed, ref } from 'vue'
import {
    Users,
    GraduationCap,
    BriefcaseBusiness,
    BookOpen,
    Building2,
    Wallet,
    Settings,
    ChevronDown,
} from 'lucide-vue-next'
import PageHero from '@/components/ui/custom/PageHero.vue'

type Category = 'Management' | 'Deans' | 'Program Heads' | 'Faculty'

interface Person {
    id: number
    name: string
    position: string
    description: string
    category: Category
    image?: string
}

const filters = [
    { label: 'All', icon: Users },
    { label: 'Management', icon: BriefcaseBusiness },
    { label: 'Deans', icon: Building2 },
    { label: 'Program Heads', icon: GraduationCap },
    { label: 'Faculty', icon: BookOpen },
] as const

type Filter = (typeof filters)[number]['label']

const activeFilter = ref<Filter>('All')

const people: Person[] = [
    {
        id: 1,
        name: 'College President',
        position: 'President',
        description: 'Provides institutional leadership and strategic direction.',
        category: 'Management',
    },
    {
        id: 2,
        name: 'Vice President for Finance',
        position: 'VP – Finance',
        description: 'Oversees financial planning, budgeting, and resource management.',
        category: 'Management',
    },
    {
        id: 3,
        name: 'Vice President for Operations',
        position: 'VP – Operations',
        description: 'Oversees administrative operations and institutional services.',
        category: 'Management',
    },
    {
        id: 4,
        name: 'Academic Affairs',
        position: 'ACAD',
        description: 'Coordinates academic policies, programs, and instructional activities.',
        category: 'Management',
    },
    {
        id: 5,
        name: 'College Dean',
        position: 'Dean',
        description: 'Leads a college and oversees its academic programs and faculty.',
        category: 'Deans',
    },
    {
        id: 6,
        name: 'College Dean',
        position: 'Dean',
        description: 'Provides academic leadership and supports student achievement.',
        category: 'Deans',
    },
    {
        id: 7,
        name: 'Program Head',
        position: 'Program Head',
        description: 'Coordinates curriculum implementation and program activities.',
        category: 'Program Heads',
    },
    {
        id: 8,
        name: 'Program Head',
        position: 'Program Head',
        description: 'Supports faculty coordination and academic program development.',
        category: 'Program Heads',
    },
    {
        id: 9,
        name: 'Faculty Member',
        position: 'Faculty',
        description: 'Provides instruction, student mentoring, and academic support.',
        category: 'Faculty',
    },
    {
        id: 10,
        name: 'Faculty Member',
        position: 'Faculty',
        description: 'Facilitates learning and contributes to academic development.',
        category: 'Faculty',
    },
    {
        id: 11,
        name: 'Faculty Member',
        position: 'Faculty',
        description: 'Supports student learning and classroom instruction.',
        category: 'Faculty',
    },
    {
        id: 12,
        name: 'Faculty Member',
        position: 'Faculty',
        description: 'Contributes to teaching, assessment, and student development.',
        category: 'Faculty',
    },
]

const filteredPeople = computed(() => {
    if (activeFilter.value === 'All') {
        return people
    }

    return people.filter(
        (person) => person.category === activeFilter.value,
    )
})

const management = computed(() =>
    people.filter((person) => person.category === 'Management'),
)

const selectedFilterDescription = computed(() => {
    const descriptions: Record<Filter, string> = {
        All: 'Explore the leadership and academic personnel of the college.',
        Management: 'Institutional leadership and administrative management.',
        Deans: 'Academic leaders responsible for their respective colleges.',
        'Program Heads': 'Leaders coordinating individual academic programs.',
        Faculty: 'Faculty members dedicated to teaching and student development.',
    }

    return descriptions[activeFilter.value]
})

function selectFilter(filter: Filter) {
    activeFilter.value = filter
}

function imageFallback(event: Event) {
    const image = event.target as HTMLImageElement
    image.style.display = 'none'
}
</script>

<template>
    <main class="min-h-screen bg-background">
        <PageHero
            subtitle="Meet the leadership and academic personnel who contribute to the mission, vision, and excellence of St. Francis Xavier College."
        >
            <template #title>Organizational Structure</template>
        </PageHero>

        <!-- Leadership Hierarchy -->
        <section class="bg-background py-12 md:py-16">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                <div class="mx-auto mb-12 max-w-3xl text-center">
                    <div class="mb-3 flex items-center justify-center gap-3">
                        <span class="h-0.5 w-7 bg-secondary"></span>
                        <span class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Institutional Leadership
                        </span>
                        <span class="h-0.5 w-7 bg-secondary"></span>
                    </div>

                    <h2 class="text-2xl font-bold text-foreground md:text-3xl">
                        Leadership Hierarchy
                    </h2>

                    <p class="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        An overview of the leadership roles that guide the
                        institution's administration and academic direction.
                    </p>
                </div>

                <!-- President -->
                <div class="mx-auto flex max-w-sm flex-col items-center text-center">
                    <div class="portrait-ring president-ring">
                        <img
                            src="https://placehold.co/240x240?text=President"
                            alt="College President"
                            class="portrait-image"
                            @error="imageFallback"
                        />
                        <div class="portrait-initials">P</div>
                    </div>

                    <h3 class="mt-4 text-lg font-bold text-foreground md:text-xl">
                        College President
                    </h3>

                    <p class="mt-1 text-sm text-muted-foreground">
                        Institutional Leadership
                    </p>
                </div>

                <!-- Main Connector -->
                <div class="mx-auto flex flex-col items-center">
                    <div class="connector-vertical h-10"></div>
                    <div class="connector-horizontal w-[88%] max-w-4xl"></div>
                </div>

                <!-- Management -->
                <div class="management-grid mx-auto grid max-w-5xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    <article
                        v-for="person in management.filter((p) => p.id !== 1)"
                        :key="person.id"
                        class="person-node flex flex-col items-center text-center"
                    >
                        <div class="connector-vertical management-connector h-6"></div>

                        <div class="portrait-ring management-ring">
                            <img
                                :src="person.image || `https://placehold.co/200x200?text=${encodeURIComponent(person.position)}`"
                                :alt="person.position"
                                class="portrait-image"
                                @error="imageFallback"
                            />
                            <div class="portrait-initials">
                                {{ person.position === 'ACAD' ? 'A' : 'VP' }}
                            </div>
                        </div>

                        <h3 class="mt-3 max-w-xs text-base font-bold text-foreground">
                            {{ person.name }}
                        </h3>

                        <p class="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">
                            {{ person.position }}
                        </p>

                        <p class="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
                            {{ person.description }}
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <!-- Filterable Directory -->
        <section id="personnel-directory" class="border-y border-border bg-muted/20 py-12 md:py-16">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                <div class="mx-auto mb-8 max-w-3xl text-center">
                    <div class="mb-3 flex items-center justify-center gap-3">
                        <span class="h-0.5 w-7 bg-secondary"></span>
                        <span class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            College Personnel
                        </span>
                        <span class="h-0.5 w-7 bg-secondary"></span>
                    </div>

                    <h2 class="text-2xl font-bold text-foreground md:text-3xl">
                        Organizational Directory
                    </h2>

                    <p class="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        Browse the different categories of college leadership
                        and academic personnel.
                    </p>
                </div>

                <!-- Filter Buttons -->
                <div class="mb-8 flex flex-wrap items-center justify-center gap-2">
                    <button
                        v-for="filter in filters"
                        :key="filter.label"
                        type="button"
                        :aria-pressed="activeFilter === filter.label"
                        class="filter-button inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200"
                        :class="activeFilter === filter.label
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-primary'"
                        @click="selectFilter(filter.label)"
                    >
                        <component :is="filter.icon" class="h-4 w-4" />
                        {{ filter.label }}
                    </button>
                </div>

                <p class="mb-8 text-center text-sm text-muted-foreground">
                    {{ selectedFilterDescription }}
                </p>

                <!-- Result Count -->
                <div class="mb-8 flex items-center justify-between border-b border-border pb-3">
                    <p class="text-sm font-medium text-foreground">
                        {{ activeFilter === 'All' ? 'All Personnel' : activeFilter }}
                    </p>

                    <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {{ filteredPeople.length }}
                        {{ filteredPeople.length === 1 ? 'position' : 'positions' }}
                    </span>
                </div>

                <!-- People -->
                <TransitionGroup
                    name="person-list"
                    tag="div"
                    class="directory-grid grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5"
                >
                    <article
                        v-for="person in filteredPeople"
                        :key="person.id"
                        class="directory-person flex min-w-0 flex-col items-center text-center"
                    >
                        <div
                            class="portrait-ring directory-ring transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                :src="person.image || `https://placehold.co/200x200?text=${encodeURIComponent(person.position)}`"
                                :alt="person.name"
                                class="portrait-image"
                                loading="lazy"
                                @error="imageFallback"
                            />

                            <div class="portrait-initials">
                                {{ person.category === 'Management' ? 'M' : person.category === 'Deans' ? 'D' : person.category === 'Program Heads' ? 'PH' : 'F' }}
                            </div>
                        </div>

                        <h3 class="mt-4 text-sm font-bold leading-snug text-foreground sm:text-base">
                            {{ person.name }}
                        </h3>

                        <p class="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">
                            {{ person.position }}
                        </p>

                        <p class="mt-2 max-w-[240px] text-xs leading-relaxed text-muted-foreground">
                            {{ person.description }}
                        </p>
                    </article>
                </TransitionGroup>

                <!-- Empty State -->
                <div
                    v-if="filteredPeople.length === 0"
                    class="py-16 text-center"
                >
                    <Users class="mx-auto h-10 w-10 text-muted-foreground/50" />

                    <h3 class="mt-4 text-lg font-semibold text-foreground">
                        No personnel found
                    </h3>

                    <p class="mt-2 text-sm text-muted-foreground">
                        There are no entries in this category yet.
                    </p>

                    <button
                        type="button"
                        class="mt-4 text-sm font-semibold text-primary hover:underline"
                        @click="selectFilter('All')"
                    >
                        View all personnel
                    </button>
                </div>

                <p class="mt-12 text-center text-xs leading-relaxed text-muted-foreground">
                    Sample directory for demonstration. Official names, photos,
                    and organizational relationships should be verified by SFXC.
                </p>
            </div>
        </section>

        <!-- Organizational Notes -->
        <section class="bg-background py-12 md:py-16">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
                <div class="grid gap-8 sm:grid-cols-3">
                    <article class="text-center">
                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <BriefcaseBusiness class="h-6 w-6" />
                        </div>

                        <h3 class="mt-4 font-bold text-foreground">
                            Management
                        </h3>

                        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Provides strategic direction, leadership, and
                            administrative oversight.
                        </p>
                    </article>

                    <article class="text-center">
                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 text-primary">
                            <GraduationCap class="h-6 w-6" />
                        </div>

                        <h3 class="mt-4 font-bold text-foreground">
                            Academic Leadership
                        </h3>

                        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Deans and program heads coordinate academic
                            programs and support faculty.
                        </p>
                    </article>

                    <article class="text-center">
                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <BookOpen class="h-6 w-6" />
                        </div>

                        <h3 class="mt-4 font-bold text-foreground">
                            Faculty
                        </h3>

                        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Faculty members contribute to quality instruction,
                            mentoring, and student development.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.portrait-ring {
    position: relative;
    display: flex;
    width: 104px;
    height: 104px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 9999px;
    background: hsl(var(--muted));
}

.portrait-image {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    object-fit: cover;
}

.portrait-initials {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    color: hsl(var(--primary));
    font-size: 1.4rem;
    font-weight: 700;
}

.president-ring {
    width: 132px;
    height: 132px;
    border: 4px solid hsl(var(--primary));
    box-shadow: 0 0 0 5px hsl(var(--primary) / 0.08);
}

.management-ring {
    width: 100px;
    height: 100px;
    border: 3px solid hsl(var(--secondary));
}

.directory-ring {
    width: 100px;
    height: 100px;
    border: 3px solid hsl(var(--primary) / 0.7);
    box-shadow: 0 0 0 4px hsl(var(--primary) / 0.06);
}

.connector-vertical {
    width: 2px;
    flex-shrink: 0;
    background: hsl(var(--secondary));
}

.connector-horizontal {
    height: 2px;
    background: hsl(var(--secondary));
}

.management-connector {
    display: none;
}

.person-list-enter-active,
.person-list-leave-active,
.person-list-move {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.person-list-enter-from,
.person-list-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.person-list-leave-active {
    position: absolute;
}

@media (min-width: 1024px) {
    .management-grid {
        position: relative;
    }

    .management-grid::before {
        position: absolute;
        top: 0;
        left: 16.666%;
        right: 16.666%;
        height: 2px;
        background: hsl(var(--secondary));
        content: '';
    }

    .management-connector {
        display: block;
    }
}

@media (max-width: 639px) {
    .president-ring {
        width: 112px;
        height: 112px;
    }

    .management-ring,
    .directory-ring {
        width: 84px;
        height: 84px;
    }

    .filter-button {
        padding: 0.55rem 0.8rem;
        font-size: 0.75rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .person-list-enter-active,
    .person-list-leave-active,
    .person-list-move {
        transition: none;
    }
}
</style>
