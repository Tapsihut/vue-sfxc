<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    ExternalLink,
    GraduationCap,
    ShieldCheck,
} from 'lucide-vue-next'
import PageHero from '@/components/ui/custom/PageHero.vue'
import SectionHeader from '@/components/ui/custom/SectionHeader.vue'
import OsasSupportCard from '@/components/ui/custom/OsasSupportCard.vue'
import { useOsas } from '@/composables/useOsas'

const { services, programs, organizations, supportSections, academicYear, scrollTo } = useOsas()
</script>

<template>
    <PageHero
        subtitle="Fostering holistic student development, welfare, and a vibrant campus life in accordance with CHED Memorandum Order No. 09, s. 2013."
        subtitleMax="max-w-xl"
    >
        <template #title>Office of Student<br />Affairs &amp; Services</template>
    </PageHero>

    <div class="min-h-screen bg-background pb-24">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <!-- About OSAS -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                <!-- Left: Description + Services -->
                <div class="lg:col-span-2 space-y-10">
                    <div>
                        <SectionHeader label="About" title="Who We Are" />
                        <p
                            class="text-lg text-muted-foreground leading-relaxed mt-4"
                            v-motion
                            :initial="{ opacity: 0, y: 16 }"
                            :visible-once="{
                                opacity: 1,
                                y: 0,
                                transition: { delay: 300, duration: 600, ease: 'easeOut' },
                            }"
                        >
                            The Office of Student Affairs and Services (OSAS) is responsible for
                            implementing student services and programs at SFXC that support
                            students' academic experiences and promote holistic student development.
                        </p>
                    </div>

                    <!-- Services Offered -->
                    <div
                        v-motion
                        :initial="{ opacity: 0, y: 16 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 600, ease: 'easeOut' },
                        }"
                    >
                        <p
                            class="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4"
                        >
                            Services Offered — AY {{ academicYear }}
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="service in services"
                                :key="service"
                                class="inline-flex items-center px-3 py-1.5 rounded-full border border-border bg-muted/40 text-xs text-foreground font-medium"
                            >
                                {{ service }}
                            </span>
                        </div>
                    </div>

                    <!-- Basic Processes -->
                    <div
                        v-motion
                        :initial="{ opacity: 0, y: 12 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 500, ease: 'easeOut' },
                        }"
                    >
                        <p
                            class="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3"
                        >
                            Basic Processes
                        </p>
                        <p class="text-sm text-muted-foreground leading-relaxed">
                            Student programs &amp; services · Clearance · Complaints · Student
                            concerns · All other engagement involving students.
                        </p>
                    </div>
                </div>

                <!-- Right: Contact Card -->
                <div
                    v-motion
                    :initial="{ opacity: 0, x: 24 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 700, type: 'spring', stiffness: 90, damping: 18 },
                    }"
                >
                    <div class="border border-border rounded-2xl overflow-hidden sticky top-24">
                        <div
                            class="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30"
                        >
                            <GraduationCap class="w-5 h-5 text-primary shrink-0" />
                            <span
                                class="font-semibold text-sm text-foreground uppercase tracking-wide"
                                >OSAS Office</span
                            >
                        </div>
                        <div class="divide-y divide-border">
                            <div class="flex items-start gap-3 px-6 py-4">
                                <MapPin
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Location</p>
                                    <p class="text-sm text-foreground">
                                        2nd Floor, SFXC Administrative Building
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 px-6 py-4">
                                <Clock
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Office Hours</p>
                                    <p class="text-sm text-foreground">
                                        Monday – Friday · 8:00 AM – 5:00 PM
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 px-6 py-4">
                                <Phone
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Phone</p>
                                    <a
                                        href="tel:+639088856201"
                                        class="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                                        >+639 088 856 201</a
                                    >
                                </div>
                            </div>
                            <div class="flex items-start gap-3 px-6 py-4">
                                <Mail
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Email</p>
                                    <a
                                        href="mailto:osas@sfxc.edu.ph"
                                        class="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                                        >osas@sfxc.edu.ph</a
                                    >
                                </div>
                            </div>
                            <div class="flex items-start gap-3 px-6 py-4">
                                <ExternalLink
                                    class="w-4 h-4 text-primary shrink-0 mt-0.5"
                                    aria-hidden="true"
                                />
                                <div>
                                    <p class="text-xs text-muted-foreground mb-0.5">Facebook</p>
                                    <a
                                        href="https://www.facebook.com/sfxcosas"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                                        >facebook.com/sfxcosas</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Program Quick-Nav Cards -->
            <div class="mb-20">
                <SectionHeader
                    label="Programs &amp; Services"
                    title="What We Offer"
                    class="mb-10"
                />
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        v-for="(prog, i) in programs"
                        :key="prog.id"
                        @click="scrollTo(prog.id)"
                        class="group flex flex-col items-start gap-4 p-6 border border-border rounded-2xl bg-background hover:bg-muted/30 text-left transition-colors duration-200 cursor-pointer"
                        v-motion
                        :initial="{ opacity: 0, y: 20 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: { delay: i * 80, duration: 500, ease: 'easeOut' },
                        }"
                    >
                        <div
                            class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10"
                        >
                            <component :is="prog.icon" class="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p class="font-semibold text-foreground text-sm leading-tight mb-1.5">
                                {{ prog.title }}
                            </p>
                            <p class="text-xs text-muted-foreground leading-relaxed">
                                {{ prog.description }}
                            </p>
                        </div>
                    </button>
                </div>
            </div>

            <Separator class="my-16" />

            <!-- Student Organizations & Clubs -->
            <div id="organizations" class="mb-20 scroll-mt-24">
                <SectionHeader
                    label="Campus Life"
                    title="Student Organizations &amp; Clubs"
                    description="Accredited, recognized, and authorized student organizations, councils, and governments for AY 2025–26."
                    class="mb-10"
                />

                <div
                    class="border border-border rounded-2xl overflow-hidden"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 700, ease: 'easeOut' },
                    }"
                >
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-border bg-muted/30">
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap w-8"
                                    >
                                        #
                                    </th>
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground"
                                    >
                                        Organization
                                    </th>
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                                    >
                                        Specialization
                                    </th>
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                                    >
                                        Faculty Adviser
                                    </th>
                                    <th
                                        class="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                                    >
                                        President / Head
                                    </th>
                                    <th
                                        class="text-right px-5 py-3.5 font-semibold text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                                    >
                                        Fee
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                <tr
                                    v-for="(org, i) in organizations"
                                    :key="org.name"
                                    class="hover:bg-muted/20 transition-colors duration-150"
                                >
                                    <td
                                        class="px-5 py-4 text-xs text-muted-foreground tabular-nums"
                                    >
                                        {{ i + 1 }}
                                    </td>
                                    <td class="px-5 py-4">
                                        <p class="font-medium text-foreground leading-snug">
                                            {{ org.name }}
                                        </p>
                                    </td>
                                    <td class="px-5 py-4 whitespace-nowrap">
                                        <span
                                            class="inline-flex items-center px-2.5 py-1 rounded-lg bg-muted/60 text-muted-foreground text-xs font-medium"
                                        >
                                            {{ org.specialization }}
                                        </span>
                                    </td>
                                    <td
                                        class="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap"
                                    >
                                        {{ org.adviser }}
                                    </td>
                                    <td
                                        class="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap"
                                    >
                                        {{ org.president }}
                                    </td>
                                    <td
                                        class="px-5 py-4 text-sm text-right font-medium text-foreground whitespace-nowrap tabular-nums"
                                    >
                                        {{ org.fee }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Separator class="my-16" />

            <!-- Supporting Services: Sports · Guidance · Career -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <OsasSupportCard
                    v-for="section in supportSections"
                    :key="section.id"
                    :id="section.id"
                    :title="section.title"
                    :subtitle="section.subtitle"
                    :icon="section.icon"
                    :description="section.description"
                    :list-label="section.listLabel"
                    :items="section.items"
                >
                    <!-- Guidance-specific contact info -->
                    <template v-if="section.id === 'guidance'">
                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm">
                                <MapPin class="w-3.5 h-3.5 text-primary shrink-0" />
                                <span class="text-muted-foreground"
                                    >Inside OSAS, 2nd Floor Admin Bldg.</span
                                >
                            </div>
                            <div class="flex items-center gap-2 text-sm">
                                <Clock class="w-3.5 h-3.5 text-primary shrink-0" />
                                <span class="text-muted-foreground">Mon–Fri, 8:00 AM–5:00 PM</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm">
                                <Mail class="w-3.5 h-3.5 text-primary shrink-0" />
                                <a
                                    href="mailto:guidanceoffice@sfxc.edu.ph"
                                    class="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                                    >guidanceoffice@sfxc.edu.ph</a
                                >
                            </div>
                            <div class="flex items-center gap-2 text-sm">
                                <Phone class="w-3.5 h-3.5 text-primary shrink-0" />
                                <a
                                    href="tel:+639088856201"
                                    class="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                                    >+639 088 856 201</a
                                >
                            </div>
                        </div>
                    </template>
                    <!-- Career-specific notice -->
                    <template v-else-if="section.id === 'career'">
                        <div class="flex items-center gap-2 text-sm">
                            <ShieldCheck class="w-3.5 h-3.5 text-primary shrink-0" />
                            <span class="text-muted-foreground text-xs"
                                >Operated under the Guidance Office</span
                            >
                        </div>
                    </template>
                </OsasSupportCard>
            </div>

            <Separator class="mt-20" />
        </div>
    </div>
</template>
