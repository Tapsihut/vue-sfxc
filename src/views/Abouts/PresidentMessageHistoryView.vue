<script setup lang="ts">
import { Quote, BookOpen, Landmark, CalendarDays, Users } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import PageHero from '@/components/ui/custom/PageHero.vue'

import presidentPortrait from '@/assets/images/aboutus/President.png'

import historyPhoto1 from '@/assets/images/aboutus/history-1.jpg'
import historyPhoto2 from '@/assets/images/aboutus/history-2.png'
import historyPhoto3 from '@/assets/images/aboutus/history-3.jpg'
import historyPhoto4 from '@/assets/images/aboutus/history-4.png'
import historyPhoto5 from '@/assets/images/aboutus/history-5.jpg'

const historyPhotos = [
    {
        src: historyPhoto1,
        alt: 'St. Francis Xavier College historical photograph 1',
    },
    {
        src: historyPhoto2,
        alt: 'St. Francis Xavier College historical photograph 2',
    },
    {
        src: historyPhoto3,
        alt: 'St. Francis Xavier College historical photograph 3',
    },
    {
        src: historyPhoto4,
        alt: 'St. Francis Xavier College historical photograph 4',
    },
    {
        src: historyPhoto5,
        alt: 'St. Francis Xavier College historical photograph 5',
    },
]
</script>

<template>
    <PageHero
        subtitle="Discover the people, purpose, and history that shape the identity of St. Francis Xavier College."
    >
        <template #title>President’s Message &amp; History</template>
    </PageHero>

    <!-- President's Message -->
    <section
        id="president-message"
        class="py-24 bg-background scroll-mt-16"
    >
        <div class="container mx-auto px-4 md:px-8 max-w-6xl">
            <div class="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
                <!-- President Portrait -->
                <div
                    class="md:col-span-5 md:self-start"
                    v-motion
                    :initial="{ opacity: 0, x: -30 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 700 },
                    }"
                >
                    <div
                        class="relative overflow-hidden rounded-3xl border border-border/50 bg-muted/30 aspect-[4/5]"
                    >
                        <img
                            :src="presidentPortrait"
                            alt="President of St. Francis Xavier College"
                            class="absolute inset-0 h-full w-full object-cover object-top"
                        />

                        <div
                            class="absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary via-secondary to-tertiary"
                        ></div>
                    </div>
                </div>

                <!-- Message Content -->
                <div
                    class="md:col-span-7"
                    v-motion
                    :initial="{ opacity: 0, x: 30 }"
                    :visible-once="{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 700 },
                    }"
                >
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span
                            class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >
                            A Message from Our President
                        </span>
                    </div>

                    <Quote class="w-12 h-12 text-primary/20 mb-5" />

                    <h2
                        class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-foreground leading-tight"
                    >
                        Welcome to
                        <span
                            class="text-primary italic font-serif font-light"
                        >
                            St. Francis Xavier College
                        </span>
                    </h2>

                    <div
                        class="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary before:to-transparent space-y-5"
                    >
                        <p
                            class="text-base md:text-lg text-muted-foreground leading-relaxed"
                        >
                            Welcome to St. Francis Xavier College, where faith,
                            purpose, and excellence guide our commitment to
                            education and service.
                        </p>

                        <p
                            class="text-base md:text-lg text-muted-foreground leading-relaxed"
                        >
                            We believe that education goes beyond academic
                            achievement. It is about developing character,
                            nurturing talents, strengthening values, and
                            preparing learners to make a meaningful
                            contribution to society.
                        </p>

                        <p
                            class="text-base md:text-lg text-muted-foreground leading-relaxed"
                        >
                            As a community, we continue to uphold our commitment
                            to quality education, responsible leadership, and
                            genuine transformation. Together, let us build a
                            future founded on knowledge, compassion, faith,
                            and service.
                        </p>
                    </div>

                    <div class="mt-10 pt-6 border-t border-border/60">
                        <p class="text-lg font-bold text-foreground">
                            Office of the College President
                        </p>
                        <p class="text-sm text-muted-foreground mt-1">
                            St. Francis Xavier College, Inc.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- History Introduction -->
    <section
        id="history"
        class="py-24 bg-muted/20 scroll-mt-16"
    >
        <div class="container mx-auto px-4 md:px-8 max-w-6xl">
            <div
                class="mb-16 max-w-4xl mx-auto"
                v-motion
                :initial="{ opacity: 0, y: 24 }"
                :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 700 },
                }"
            >
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span
                        class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                    >
                        Our History
                    </span>
                </div>

                <h2
                    class="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6"
                >
                    A Legacy of Faith
                    <br />
                    <span class="text-primary italic font-serif font-light">
                        and Learning
                    </span>
                </h2>

                <p
                    class="text-base md:text-lg text-muted-foreground leading-relaxed"
                >
                    St. Francis Xavier College, Inc. has a history rooted in
                    education, service, and the desire to provide learning
                    opportunities to its community. From its beginnings as a
                    small educational institution, the college has continued to
                    pursue its mission of developing learners through academic
                    and technical-vocational education.
                </p>
            </div>

            <!-- Historical Photo Gallery -->
            <div
                class="mb-20"
                v-motion
                :initial="{ opacity: 0, y: 24 }"
                :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 700 },
                }"
            >
                <div class="text-center mb-10">
                    <p
                        class="text-primary font-semibold text-xs uppercase tracking-[0.3em] mb-3"
                    >
                        Our Heritage in Pictures
                    </p>

                    <h3
                        class="text-2xl md:text-3xl font-bold text-foreground"
                    >
                        Moments from Our History
                    </h3>

                    <p
                        class="mt-3 text-muted-foreground max-w-2xl mx-auto"
                    >
                        A glimpse into the people, places, and milestones that
                        have shaped St. Francis Xavier College.
                    </p>
                </div>

                <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 gap-5"
                >
                    <div
                        v-for="(photo, index) in historyPhotos"
                        :key="photo.src"
                        class="group relative overflow-hidden rounded-2xl border border-border/50 bg-background aspect-[4/3] shadow-sm"
                        :class="
                            index === 2
                                ? 'lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-1 lg:aspect-auto lg:min-h-[420px]'
                                : index === 3
                                  ? 'lg:col-span-2 lg:col-start-1 lg:row-start-2'
                                  : index === 4
                                    ? 'lg:col-span-2 lg:col-start-3 lg:row-start-2'
                                    : 'lg:col-span-2'
                        "
                        v-motion
                        :initial="{ opacity: 0, y: 20 }"
                        :visible-once="{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 500,
                                delay: index * 100,
                            },
                        }"
                    >
                        <img
                            :src="photo.src"
                            :alt="photo.alt"
                            loading="lazy"
                            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70"
                        ></div>

                        <div
                            class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"
                        ></div>
                    </div>
                </div>
            </div>

            <!-- History Timeline -->
            <div class="relative max-w-4xl mx-auto">
                <div
                    class="hidden md:block absolute left-1/2 -translate-x-px top-0 h-full w-px bg-border"
                ></div>

                <div class="space-y-12 md:space-y-16">
                    <!-- 1990 -->
                    <div
                        class="relative pl-8 md:pl-0 md:pr-[calc(50%+2rem)] md:text-right"
                        v-motion
                        :initial="{ opacity: 0, x: -30 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 700 },
                        }"
                    >
                        <div
                            class="hidden md:block absolute right-0 top-2 w-3 h-3 rounded-full bg-primary translate-x-[calc(50%+0.5px)] border-2 border-background"
                        ></div>

                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary md:hidden"
                        ></div>

                        <div class="flex items-center gap-3 mb-4 md:justify-end">
                            <CalendarDays
                                class="w-5 h-5 text-primary shrink-0"
                            />
                            <span
                                class="text-primary text-sm font-bold uppercase tracking-widest"
                            >
                                1990
                            </span>
                        </div>

                        <h3
                            class="text-xl md:text-2xl font-bold text-foreground mb-4"
                        >
                            The Beginning
                        </h3>

                        <p
                            class="text-muted-foreground text-base leading-relaxed"
                        >
                            The institution was founded in 1990 under the name
                            St. Francis Institute of Technology (SFIT), honoring
                            St. Francis Xavier, the Jesuit missionary known for
                            his missionary work in Asia and other regions.
                        </p>
                    </div>

                    <!-- Early Years -->
                    <div
                        class="relative pl-8 md:pl-[calc(50%+2rem)]"
                        v-motion
                        :initial="{ opacity: 0, x: 30 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 700 },
                        }"
                    >
                        <div
                            class="hidden md:block absolute left-1/2 top-2 w-3 h-3 rounded-full bg-secondary -translate-x-[calc(50%-0.5px)] border-2 border-background"
                        ></div>

                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-secondary md:hidden"
                        ></div>

                        <div class="flex items-center gap-3 mb-4">
                            <BookOpen
                                class="w-5 h-5 text-secondary shrink-0"
                            />
                            <span
                                class="text-secondary text-sm font-bold uppercase tracking-widest"
                            >
                                Early Years
                            </span>
                        </div>

                        <h3
                            class="text-xl md:text-2xl font-bold text-foreground mb-4"
                        >
                            A Foundation for Learning
                        </h3>

                        <p
                            class="text-muted-foreground text-base leading-relaxed"
                        >
                            In its early years, the institution operated in a
                            rented two-storey residential house owned by
                            Mr. and Mrs. Demetrio G. del Rosario. It accommodated
                            108 students, offering short-term technical-vocational
                            certificate courses and three baccalaureate programs:
                            Bachelor of Science in Secretarial Administration,
                            Bachelor of Science in Elementary Education, and
                            Bachelor of Arts in English.
                        </p>

                        <p
                            class="text-muted-foreground text-base leading-relaxed mt-4"
                        >
                            The school began with 20 instructors and six
                            administrative staff members who helped establish
                            its early educational foundation.
                        </p>
                    </div>

                    <!-- 1991 -->
                    <div
                        class="relative pl-8 md:pl-0 md:pr-[calc(50%+2rem)] md:text-right"
                        v-motion
                        :initial="{ opacity: 0, x: -30 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 700 },
                        }"
                    >
                        <div
                            class="hidden md:block absolute right-0 top-2 w-3 h-3 rounded-full bg-tertiary translate-x-[calc(50%+0.5px)] border-2 border-background"
                        ></div>

                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-tertiary md:hidden"
                        ></div>

                        <div class="flex items-center gap-3 mb-4 md:justify-end">
                            <Landmark
                                class="w-5 h-5 text-tertiary shrink-0"
                            />
                            <span
                                class="text-tertiary text-sm font-bold uppercase tracking-widest"
                            >
                                July 25, 1991
                            </span>
                        </div>

                        <h3
                            class="text-xl md:text-2xl font-bold text-foreground mb-4"
                        >
                            Official Registration
                        </h3>

                        <p
                            class="text-muted-foreground text-base leading-relaxed"
                        >
                            St. Francis Xavier College, Inc. was registered as a
                            non-stock, non-profit corporation with the Securities
                            and Exchange Commission (SEC) under Registration
                            Number DN-091-00583.
                        </p>

                        <p
                            class="text-muted-foreground text-base leading-relaxed mt-4"
                        >
                            The institution's educational programs have been
                            associated with the relevant government agencies
                            overseeing higher education and technical-vocational
                            training.
                        </p>
                    </div>

                    <!-- Founders -->
                    <div
                        class="relative pl-8 md:pl-[calc(50%+2rem)]"
                        v-motion
                        :initial="{ opacity: 0, x: 30 }"
                        :visible-once="{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 700 },
                        }"
                    >
                        <div
                            class="hidden md:block absolute left-1/2 top-2 w-3 h-3 rounded-full bg-primary -translate-x-[calc(50%-0.5px)] border-2 border-background"
                        ></div>

                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary md:hidden"
                        ></div>

                        <div class="flex items-center gap-3 mb-4">
                            <Users
                                class="w-5 h-5 text-primary shrink-0"
                            />
                            <span
                                class="text-primary text-sm font-bold uppercase tracking-widest"
                            >
                                The Founders
                            </span>
                        </div>

                        <h3
                            class="text-xl md:text-2xl font-bold text-foreground mb-4"
                        >
                            A Shared Commitment to Education
                        </h3>

                        <p
                            class="text-muted-foreground text-base leading-relaxed"
                        >
                            The founders included Mamerto Prochina, Baltazar
                            Lumangyao, Demetrio del Rosario, Romeo Duron,
                            Emmanuel Plaza, Praxedes Lambaco, and Segundo Guelos.
                        </p>

                        <p
                            class="text-muted-foreground text-base leading-relaxed mt-4"
                        >
                            Democrito O. Plaza, a former congressman and governor,
                            contributed 50 typewriters for the secretarial course.
                            Valentina G. Plaza also continued serving the people
                            of Agusan del Sur through education after her public
                            service.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Closing Section -->
    <section class="py-20 bg-background">
        <div class="container mx-auto px-4 md:px-8 max-w-5xl">
            <Card
                class="rounded-3xl border-primary/20 overflow-hidden"
                v-motion
                :initial="{ opacity: 0, y: 24 }"
                :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 700 },
                }"
            >
                <CardContent class="p-8 md:p-12 text-center">
                    <div
                        class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                    >
                        <Landmark class="w-8 h-8 text-primary" />
                    </div>

                    <p
                        class="text-primary font-semibold text-xs uppercase tracking-[0.3em] mb-4"
                    >
                        Our Continuing Journey
                    </p>

                    <h2
                        class="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6"
                    >
                        Rooted in Faith.
                        <span
                            class="text-primary italic font-serif font-light"
                        >
                            Committed to Excellence.
                        </span>
                    </h2>

                    <p
                        class="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                    >
                        The story of St. Francis Xavier College reflects a
                        continuing commitment to education, values formation,
                        and service. Its heritage remains an important part of
                        the institution's identity as it continues to prepare
                        learners for the challenges and opportunities of the
                        future.
                    </p>
                </CardContent>
            </Card>
        </div>
    </section>
</template>
