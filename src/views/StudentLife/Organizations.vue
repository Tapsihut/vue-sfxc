<script setup lang="ts">
import { Users, Lightbulb } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PageHero from '@/components/ui/custom/PageHero.vue'
import GoalCard from '@/components/ui/custom/GoalCard.vue'
import { sclOfficers, collegeOfficers, goalCards, clubPolicies } from '@/data/organizations'
</script>

<template>
    <PageHero
        subtitle="Empowering students through leadership, collaboration, and community service."
    >
        <template #title>Student Organizations</template>
    </PageHero>

    <section id="student-council" class="py-24 bg-background scroll-mt-16">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-20">
                <div
                    class="order-2 md:order-1"
                    v-motion
                    :initial="{ opacity: 0, x: -30 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                            >Leadership</span
                        >
                    </div>
                    <h3 class="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                        Student Council
                    </h3>
                    <div class="space-y-4 text-muted-foreground text-lg leading-relaxed">
                        <p>
                            The Student Council of Leaders helps to facilitate the planning and
                            implementation of all students related activities, projects, and
                            programs. SCL members are elected every year.
                        </p>
                        <p>
                            The official student body is duly organized and elected at large by the
                            students themselves (If Face-to-Face) or appointed by the program heads
                            (If No Face-to-Face) with due recognition and authority for the school,
                            as the students' official representative in matters affecting them.
                        </p>
                    </div>
                </div>
                <div
                    class="order-1 md:order-2 relative group px-6"
                    v-motion
                    :initial="{ opacity: 0, x: 30 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                >
                    <div class="overflow-hidden rounded-xl shadow-xl border border-border">
                        <img
                            src="https://placehold.co/600x400"
                            alt="Student Council"
                            class="w-full object-cover aspect-4/3 scale-125"
                        />
                    </div>
                </div>
            </div>

            <!-- SCL Officers Flow Chart -->
            <div class="max-w-5xl mx-auto">
                <div
                    class="text-center mb-12"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                >
                    <div class="flex items-center gap-6 mb-4 justify-center">
                        <div class="flex-1 h-px bg-border max-w-24"></div>
                        <span class="text-muted-foreground/60 text-xs uppercase tracking-widest"
                            >Organizational Chart</span
                        >
                        <div class="flex-1 h-px bg-border max-w-24"></div>
                    </div>
                    <h4 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        SCL Officers
                    </h4>
                    <p class="text-muted-foreground text-sm">Student Council of Leaders</p>
                </div>

                <!-- President -->
                <div
                    class="flex flex-col items-center"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 600 } }"
                >
                    <div
                        class="bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg shadow-primary/20 text-center min-w-48"
                    >
                        <div
                            class="w-20 h-20 rounded-full bg-primary-foreground/20 mx-auto mb-3 overflow-hidden border-3 border-primary-foreground/50"
                        >
                            <img
                                src="https://placehold.co/150x150"
                                alt="President"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <p class="font-bold text-lg">{{ sclOfficers[0]?.name }}</p>
                        <p class="text-sm opacity-90">{{ sclOfficers[0]?.position }}</p>
                    </div>

                    <!-- Connector Line -->
                    <div class="w-px h-8 bg-border"></div>
                    <div class="w-[80%] max-w-4xl h-px bg-border"></div>

                    <!-- Vice Presidents & Secretary & PIO Row -->
                    <div
                        class="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mt-0 relative"
                    >
                        <template
                            v-for="(officer, index) in sclOfficers[0]?.subordinates"
                            :key="index"
                        >
                            <div
                                class="flex flex-col items-center"
                                v-motion
                                :initial="{ opacity: 0, y: 20 }"
                                :visible-once="{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: index * 100, duration: 500 },
                                }"
                            >
                                <div class="w-px h-8 bg-border"></div>
                                <div
                                    class="bg-card border-2 border-border rounded-xl p-4 shadow-md text-center w-full hover:border-primary/40 hover:shadow-lg transition-all duration-150"
                                >
                                    <div
                                        class="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-3 overflow-hidden border-2 border-primary/30"
                                    >
                                        <img
                                            src="https://placehold.co/150x150"
                                            :alt="officer.position"
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p class="font-semibold text-foreground">{{ officer.name }}</p>
                                    <p class="text-xs text-muted-foreground mt-1">
                                        {{ officer.position }}
                                    </p>
                                </div>

                                <template v-if="officer.subordinates?.length">
                                    <div class="w-px h-6 bg-border"></div>
                                    <div
                                        class="flex flex-col gap-3 w-full"
                                        :class="{
                                            'items-center':
                                                officer.subordinates &&
                                                officer.subordinates.length === 1,
                                        }"
                                    >
                                        <div
                                            v-for="(sub, subIndex) in officer.subordinates"
                                            :key="subIndex"
                                            class="bg-muted/50 border border-border rounded-lg p-3 text-center hover:bg-muted hover:border-border/80 transition-colors duration-150"
                                        >
                                            <div
                                                class="w-12 h-12 rounded-full bg-secondary/20 mx-auto mb-2 overflow-hidden border border-secondary/30"
                                            >
                                                <img
                                                    src="https://placehold.co/150x150"
                                                    :alt="sub.position"
                                                    class="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p class="font-medium text-sm text-foreground">
                                                {{ sub.name }}
                                            </p>
                                            <p class="text-xs text-muted-foreground">
                                                {{ sub.position }}
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- College Presidents/Governors -->
    <section id="college-governors" class="py-24 bg-muted/20 scroll-mt-16">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <div
                class="mb-16"
                v-motion
                :initial="{ opacity: 0, y: 24 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            >
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-8 h-0.5 bg-tertiary"></div>
                    <span class="text-tertiary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Program Leadership</span
                    >
                </div>
                <h3 class="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    College Presidents &amp; Governors
                </h3>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="college-org-chart">
                <div
                    v-for="(officer, index) in collegeOfficers.topLevel"
                    :key="index"
                    class="flex flex-col items-center"
                    v-motion
                    :initial="{ opacity: 0, y: 20 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 100, duration: 500 },
                    }"
                >
                    <div
                        class="bg-tertiary text-tertiary-foreground rounded-xl p-5 shadow-lg shadow-tertiary/20 text-center w-full"
                    >
                        <div
                            class="w-16 h-16 rounded-full bg-tertiary-foreground/20 mx-auto mb-3 overflow-hidden border-2 border-tertiary-foreground/50"
                        >
                            <img
                                src="https://placehold.co/150x150"
                                :alt="officer.position"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <p class="font-bold text-sm">{{ officer.name }}</p>
                        <p class="text-xs opacity-90">{{ officer.position }}</p>
                    </div>

                    <template v-if="officer.hasSubordinates && officer.governors">
                        <div class="w-px h-6 bg-border"></div>
                        <div class="w-full h-px bg-border"></div>
                        <div class="grid grid-cols-2 gap-3 w-full mt-0">
                            <div
                                v-for="(gov, govIndex) in officer.governors"
                                :key="govIndex"
                                class="flex flex-col items-center"
                            >
                                <div class="w-px h-4 bg-border"></div>
                                <div
                                    class="bg-card border border-border rounded-lg p-3 text-center w-full hover:border-tertiary/40 hover:shadow-md transition-all duration-150"
                                >
                                    <div
                                        class="w-12 h-12 rounded-full bg-tertiary/10 mx-auto mb-2 overflow-hidden border border-tertiary/30"
                                    >
                                        <img
                                            src="https://placehold.co/150x150"
                                            :alt="gov.position"
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p class="font-medium text-xs text-foreground">
                                        {{ gov.name }}
                                    </p>
                                    <p class="text-xs text-muted-foreground">{{ gov.position }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>

    <section id="clubs" class="py-24 bg-background scroll-mt-16">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <div
                class="mb-16"
                v-motion
                :initial="{ opacity: 0, y: 24 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            >
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-8 h-0.5 bg-secondary"></div>
                    <span class="text-secondary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Student Development</span
                    >
                </div>
                <h3 class="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                    Interest Clubs &amp; Program-based Organizations
                </h3>
                <p class="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
                    As part of the school's commitment to ensuring the genuine transformation of
                    students, various Clubs and Program-based Organizations/Affiliations are
                    available for students to join.
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-12">
                <Card
                    class="border-2 hover:shadow-lg transition-shadow duration-150"
                    v-motion
                    :initial="{ opacity: 0, x: -24 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
                >
                    <CardHeader>
                        <div
                            class="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4"
                        >
                            <Users class="w-6 h-6 text-secondary" />
                        </div>
                        <CardTitle>Communication &amp; Teamwork</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription class="text-base">
                            These clubs and organizations play a vital role in honing students'
                            communication skills, fostering creative thinking, and teaching them how
                            to work effectively with others.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card
                    class="border-2 hover:shadow-lg transition-shadow duration-150"
                    v-motion
                    :initial="{ opacity: 0, x: 24 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
                >
                    <CardHeader>
                        <div
                            class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4"
                        >
                            <Lightbulb class="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle>Self-Discovery</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription class="text-base">
                            Provide opportunities for students to discover more about themselves,
                            becoming fully aware of their strengths, weaknesses, needs, desires, and
                            habits.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>

            <!-- Guidelines & Policies -->
            <div
                class="bg-background rounded-2xl border-2 border-border p-8 md:p-10"
                v-motion
                :initial="{ opacity: 0, y: 32 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
            >
                <h4 class="text-2xl font-bold text-foreground mb-6">Guidelines &amp; Policies</h4>
                <div class="space-y-6">
                    <div
                        v-for="policy in clubPolicies"
                        :key="policy.number"
                        class="flex items-start gap-4"
                    >
                        <div class="shrink-0">
                            <div
                                class="w-8 h-8 rounded-full flex items-center justify-center"
                                :class="
                                    policy.variant === 'destructive'
                                        ? 'bg-destructive/20'
                                        : 'bg-secondary/20'
                                "
                            >
                                <span
                                    class="text-sm font-bold"
                                    :class="
                                        policy.variant === 'destructive'
                                            ? 'text-destructive'
                                            : 'text-secondary'
                                    "
                                    >{{ policy.number }}</span
                                >
                            </div>
                        </div>
                        <div>
                            <h5 class="font-semibold text-foreground mb-2">{{ policy.title }}</h5>
                            <p class="text-muted-foreground leading-relaxed">
                                {{ policy.description }}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    class="mt-8 pt-6 border-t border-border text-muted-foreground text-sm leading-relaxed"
                >
                    These measures collectively support the development of students in a safe,
                    organized, and supportive environment, contributing to their overall growth and
                    self-awareness.
                </div>
            </div>
        </div>
    </section>

    <section id="extension" class="py-24 bg-muted/10 border-t border-border scroll-mt-16">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div
                    class="relative group px-6"
                    v-motion
                    :initial="{ opacity: 0, x: -30 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                >
                    <div class="overflow-hidden rounded-xl shadow-xl border border-border">
                        <img
                            src="https://placehold.co/600x400"
                            alt="Extension Programs"
                            class="w-full object-cover aspect-4/3 scale-125"
                        />
                    </div>
                </div>
                <div
                    v-motion
                    :initial="{ opacity: 0, x: 30 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-tertiary"></div>
                        <span class="text-tertiary font-semibold text-xs uppercase tracking-[0.3em]"
                            >Community Service</span
                        >
                    </div>
                    <h3 class="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                        Extension Programs
                    </h3>
                    <div class="space-y-4 text-muted-foreground text-lg leading-relaxed">
                        <p>
                            SFXC organized programs and opportunities designed to develop social
                            awareness, personal internalization, and meaningful contribution to
                            nation building.
                        </p>
                        <div class="bg-tertiary/10 rounded-xl p-6 border border-tertiary/20">
                            <h4 class="font-bold text-foreground mb-3">
                                Community Development Services Program 2025
                            </h4>
                            <p class="text-base italic mb-3 text-tertiary">
                                "S-Serbisyo ug Amuma sa mga F-Familia para sa X-eXelente ug
                                Malamboung C-Comunidad"
                            </p>
                            <p class="text-base">
                                Aims to provide assistance to partner communities through child
                                protection, peer guidance, sustainable livelihood development,
                                socio-economic improvement, and combating digital divide.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="goals" class="py-24 bg-muted/30 scroll-mt-16">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <div
                class="mb-12"
                v-motion
                :initial="{ opacity: 0, y: 24 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            >
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Community Impact</span
                    >
                </div>
                <h3 class="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
                    Our Goals
                </h3>
                <p class="text-muted-foreground text-base md:text-lg">
                    Through our community development program, we aim to create lasting impact
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GoalCard
                    v-for="(goal, index) in goalCards"
                    :key="goal.title"
                    :title="goal.title"
                    :description="goal.description"
                    :icon="goal.icon"
                    :icon-bg-class="goal.iconBgClass"
                    :icon-color-class="goal.iconColorClass"
                    :delay="index * 80"
                />
            </div>
        </div>
    </section>
</template>
