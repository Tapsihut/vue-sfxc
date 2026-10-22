<script setup lang="ts">
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
} from '@/components/ui/card'
import PageHero from '@/components/ui/custom/PageHero.vue'
import { useOfficeDirectory } from '@/composables/useOfficeDirectory'

const {
    departments,
    searchQuery,
    activeDept,
    filteredOffices,
} = useOfficeDirectory()

const hasSearchQuery = computed(() => searchQuery.value.trim().length > 0)

const clearSearch = () => {
    searchQuery.value = ''
    activeDept.value = departments[0] ?? 'All Offices'
}

const phoneNumbers = (phone: string) =>
    phone.split(/[|,;]/).map((number) => number.trim()).filter(Boolean)

const phoneHref = (phone: string) =>
    `tel:${phone.replace(/[^\d+]/g, '')}`

const formatDepartment = (department: string) =>
    department.replace(/^[A-Z]\.\s/, '')
</script>

<template>
    <div class="min-h-screen bg-background">
        <PageHero
            subtitle="Find the right department, connect with our offices, and get the assistance you need."
        >
            <template #title>Office Directory</template>
        </PageHero>

        <main class="pb-20">
            <!-- INTRODUCTION -->
            <section class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-8">
                <div class="max-w-3xl">
                    <p class="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                        St. Francis Xavier College
                    </p>

                    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        How can we help you?
                    </h1>

                    <p class="mt-4 text-muted-foreground leading-relaxed">
                        Browse our directory to find contact information for academic
                        departments, administrative offices, and student services.
                    </p>
                </div>
            </section>

            <!-- SEARCH -->
            <section class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-8">
                <Card class="border border-border/70 shadow-sm overflow-hidden">
                    <CardContent class="p-5 sm:p-7">
                        <div class="flex flex-col lg:flex-row lg:items-center gap-5">
                            <div class="flex-1 min-w-0">
                                <label
                                    for="office-search"
                                    class="block text-sm font-semibold text-foreground mb-2"
                                >
                                    Search the directory
                                </label>

                                <div class="relative">
                                    <svg
                                        class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>

                                    <Input
                                        id="office-search"
                                        v-model="searchQuery"
                                        type="search"
                                        placeholder="Search by office, department, phone, or email..."
                                        aria-label="Search office directory"
                                        class="h-12 pl-12 pr-10 rounded-lg"
                                    />

                                    <button
                                        v-if="hasSearchQuery"
                                        type="button"
                                        aria-label="Clear search"
                                        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                                        @click="searchQuery = ''"
                                    >
                                        <svg
                                            class="h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="m18 6-12 12" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="lg:w-56 lg:pt-7">
                                <div class="flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
                                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <svg
                                            class="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.8"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M3 21h18" />
                                            <path d="M5 21V7l8-4v18" />
                                            <path d="M19 21V11l-6-4" />
                                            <path d="M9 9v.01" />
                                            <path d="M9 12v.01" />
                                            <path d="M9 15v.01" />
                                            <path d="M9 18v.01" />
                                        </svg>
                                    </div>

                                    <div>
                                        <p class="text-2xl font-bold text-foreground leading-none">
                                            {{ filteredOffices.length }}
                                        </p>
                                        <p class="text-xs text-muted-foreground mt-1">
                                            Offices found
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- DEPARTMENT FILTERS -->
                        <div class="mt-6 pt-5 border-t border-border/60">
                            <div class="flex flex-col sm:flex-row sm:items-start gap-3">
                                <span class="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-2 shrink-0">
                                    Departments
                                </span>

                                <div class="flex flex-wrap gap-2">
                                    <Button
                                        v-for="dept in departments"
                                        :key="dept"
                                        type="button"
                                        size="sm"
                                        :variant="activeDept === dept ? 'default' : 'outline'"
                                        class="rounded-md font-medium"
                                        @click="activeDept = dept"
                                    >
                                        {{ formatDepartment(dept) }}
                                    </Button>

                                    <Button
                                        v-if="hasSearchQuery"
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        class="text-muted-foreground"
                                        @click="clearSearch"
                                    >
                                        Reset filters
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <!-- MAIN CONTENT -->
            <section class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <!-- CAMPUS INFORMATION -->
                    <aside class="lg:col-span-4 space-y-5">
                        <Card class="overflow-hidden border border-border/70 shadow-sm">
                            <div class="h-1.5 bg-primary"></div>

                            <CardContent class="p-5 sm:p-6">
                                <div class="flex items-center gap-3 mb-5">
                                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <svg
                                            class="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.7"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M3 21h18" />
                                            <path d="M5 21V7l8-4v18" />
                                            <path d="M19 21V11l-6-4" />
                                            <path d="M9 9v.01" />
                                            <path d="M9 12v.01" />
                                            <path d="M9 15v.01" />
                                            <path d="M9 18v.01" />
                                        </svg>
                                    </div>

                                    <div>
                                        <p class="text-xs font-semibold uppercase tracking-wider text-primary">
                                            Visit us
                                        </p>
                                        <h2 class="text-lg font-bold text-foreground">
                                            Main Campus
                                        </h2>
                                    </div>
                                </div>

                                <div class="space-y-5">
                                    <div class="flex items-start gap-3">
                                        <svg
                                            class="h-5 w-5 mt-0.5 text-primary shrink-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.8"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>

                                        <div>
                                            <p class="text-sm font-semibold text-foreground">
                                                Campus Address
                                            </p>
                                            <p class="mt-1 text-sm text-muted-foreground leading-relaxed">
                                                Barangay 5, San Francisco, Agusan del Sur,
                                                Philippines 8501
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-start gap-3">
                                        <svg
                                            class="h-5 w-5 mt-0.5 text-primary shrink-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.8"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>

                                        <div>
                                            <p class="text-sm font-semibold text-foreground">
                                                Telephone
                                            </p>

                                            <div class="mt-2 flex flex-col gap-2">
                                                <a
                                                    href="tel:+63858390321"
                                                    class="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    +63 85 8390321
                                                </a>
                                                <a
                                                    href="tel:+63859855006"
                                                    class="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    +63 85 9855006
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex items-start gap-3">
                                        <svg
                                            class="h-5 w-5 mt-0.5 text-primary shrink-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.8"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            aria-hidden="true"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 6v6l4 2" />
                                        </svg>

                                        <div>
                                            <p class="text-sm font-semibold text-foreground">
                                                Office Hours
                                            </p>
                                            <p class="mt-1 text-sm text-muted-foreground">
                                                Monday – Friday
                                            </p>
                                            <p class="text-sm text-muted-foreground">
                                                8:00 AM – 5:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=St.+Francis+Xavier+College+San+Francisco+Agusan+del+Sur"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                                >
                                    <svg
                                        class="h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M3 11 22 2 13 21l-2-8-8-2Z" />
                                    </svg>
                                    Get Directions
                                </a>
                            </CardContent>
                        </Card>

                        <!-- HELP PANEL -->
                        <div class="rounded-xl border border-border/70 bg-muted/20 p-5">
                            <div class="flex items-start gap-3">
                                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background border border-border/70 text-primary">
                                    <svg
                                        class="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v-4" />
                                        <path d="M12 8h.01" />
                                    </svg>
                                </div>

                                <div>
                                    <h3 class="text-sm font-semibold text-foreground">
                                        Not sure where to go?
                                    </h3>
                                    <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
                                        Use the search above to find an office that can assist
                                        with your concern. Contact details may vary by department.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <!-- OFFICE LIST -->
                    <div class="lg:col-span-8 min-w-0">
                        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
                            <div>
                                <p class="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-2">
                                    Directory
                                </p>
                                <h2 class="text-2xl font-bold tracking-tight text-foreground">
                                    Departments &amp; Offices
                                </h2>
                                <p class="mt-2 text-sm text-muted-foreground">
                                    Official college contact information.
                                </p>
                            </div>

                            <p class="text-sm text-muted-foreground">
                                Showing
                                <span class="font-semibold text-foreground">
                                    {{ filteredOffices.length }}
                                </span>
                                {{ filteredOffices.length === 1 ? 'office' : 'offices' }}
                            </p>
                        </div>

                        <Card
                            v-if="filteredOffices.length > 0"
                            class="border border-border/70 shadow-sm overflow-hidden"
                        >
                            <CardContent class="p-0">
                                <article
                                    v-for="(office, index) in filteredOffices"
                                    :key="office.id"
                                    class="p-5 sm:p-6 transition-colors hover:bg-muted/20"
                                    :class="index < filteredOffices.length - 1 ? 'border-b border-border/60' : ''"
                                >
                                    <div class="flex items-start gap-4">
                                        <!-- OFFICE ICON -->
                                        <div class="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/30 text-primary">
                                            <svg
                                                class="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1.8"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                aria-hidden="true"
                                            >
                                                <path d="M3 21h18" />
                                                <path d="M5 21V7l8-4v18" />
                                                <path d="M19 21V11l-6-4" />
                                                <path d="M9 9v.01" />
                                                <path d="M9 12v.01" />
                                                <path d="M9 15v.01" />
                                                <path d="M9 18v.01" />
                                            </svg>
                                        </div>

                                        <div class="flex-1 min-w-0">
                                            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                <div class="min-w-0">
                                                    <h3 class="text-base sm:text-lg font-bold text-foreground leading-snug">
                                                        {{ office.name }}
                                                    </h3>

                                                    <p class="mt-1.5 text-xs font-medium text-muted-foreground">
                                                        {{ formatDepartment(office.department) }}
                                                    </p>
                                                </div>
                                            </div>

                                            <!-- CONTACT INFORMATION -->
                                            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                                <div
                                                    v-if="office.phone"
                                                    class="flex items-start gap-2.5 min-w-0"
                                                >
                                                    <svg
                                                        class="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="1.8"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                    </svg>

                                                    <div class="flex flex-wrap gap-x-3 gap-y-1 min-w-0">
                                                        <a
                                                            v-for="number in phoneNumbers(office.phone)"
                                                            :key="number"
                                                            :href="phoneHref(number)"
                                                            class="text-sm text-muted-foreground hover:text-primary hover:underline break-all"
                                                        >
                                                            {{ number }}
                                                        </a>
                                                    </div>
                                                </div>

                                                <div
                                                    v-if="office.email || office.email2"
                                                    class="flex items-start gap-2.5 min-w-0"
                                                >
                                                    <svg
                                                        class="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="1.8"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        aria-hidden="true"
                                                    >
                                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                    </svg>

                                                    <div class="flex min-w-0 flex-col gap-1.5">
                                                        <a
                                                            v-if="office.email"
                                                            :href="`mailto:${office.email}`"
                                                            class="text-sm text-muted-foreground hover:text-primary hover:underline break-all"
                                                        >
                                                            {{ office.email }}
                                                        </a>

                                                        <a
                                                            v-if="office.email2"
                                                            :href="`mailto:${office.email2}`"
                                                            class="text-sm text-muted-foreground hover:text-primary hover:underline break-all"
                                                        >
                                                            {{ office.email2 }}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- CONTACT ACTIONS -->
                                            <div
                                                v-if="office.phone || office.email"
                                                class="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-4"
                                            >
                                                <a
                                                    v-if="office.phone"
                                                    :href="phoneNumbers(office.phone)[0] ? phoneHref(phoneNumbers(office.phone)[0]!) : undefined"
                                                    class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                                >
                                                    <svg
                                                        class="h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="1.8"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                    </svg>
                                                    Call Office
                                                </a>

                                                <a
                                                    v-if="office.email"
                                                    :href="`mailto:${office.email}`"
                                                    class="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                                                >
                                                    <svg
                                                        class="h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="1.8"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        aria-hidden="true"
                                                    >
                                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                    </svg>
                                                    Send Email
                                                </a>
                                            </div>

                                            <p
                                                v-if="!office.phone && !office.email && !office.email2"
                                                class="mt-4 text-sm italic text-muted-foreground"
                                            >
                                                Contact information is not available.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </CardContent>
                        </Card>

                        <!-- EMPTY STATE -->
                        <Card
                            v-else
                            class="border border-border/70 shadow-sm"
                        >
                            <CardContent class="px-6 py-16 text-center">
                                <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                    <svg
                                        class="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </div>

                                <h3 class="mt-5 text-lg font-bold text-foreground">
                                    No offices found
                                </h3>

                                <p class="mt-2 mx-auto max-w-sm text-sm text-muted-foreground leading-relaxed">
                                    No offices match your current search or department filter.
                                    Try a different keyword or reset the filters.
                                </p>

                                <Button
                                    type="button"
                                    variant="outline"
                                    class="mt-5"
                                    @click="clearSearch"
                                >
                                    Clear Search &amp; Filters
                                </Button>
                            </CardContent>
                        </Card>

                        <p class="mt-5 text-xs leading-relaxed text-muted-foreground">
                            For the most accurate information, contact the relevant office
                            directly before visiting the campus.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
