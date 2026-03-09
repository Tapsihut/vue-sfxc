<script setup lang="ts">
import { onMounted } from 'vue'
import { Users, Lightbulb, Heart, CheckCircle } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Officer {
    name: string
    position: string
    avatar?: string
}

interface OfficerWithSubs extends Officer {
    subordinates?: OfficerWithSubs[]
}

const sclOfficers: OfficerWithSubs[] = [
    {
        name: 'Juan Dela Cruz',
        position: 'President',
        subordinates: [
            {
                name: 'Maria Santos',
                position: 'Vice President - Internal',
                subordinates: [
                    { name: 'Pedro Reyes', position: 'Finance' },
                    { name: 'Ana Garcia', position: 'Assistant Finance' },
                ],
            },
            {
                name: 'Jose Rizal',
                position: 'Vice President - External',
                subordinates: [
                    { name: 'Carlos Lopez', position: 'Logistic' },
                    { name: 'Rosa Mendoza', position: 'Assistant Logistic' },
                ],
            },
            {
                name: 'Elena Cruz',
                position: 'General Secretary',
                subordinates: [{ name: 'Marco Tan', position: 'Assistant Secretary' }],
            },
            {
                name: 'Sofia Ramos',
                position: 'PIO',
            },
        ],
    },
]

const collegeOfficers = {
    topLevel: [
        {
            name: 'Roberto Villa',
            position: 'CBE President',
            hasSubordinates: true,
            governors: [
                { name: 'Liza Fernandez', position: 'BSA Governor' },
                { name: 'Miguel Torres', position: 'BSBA Governor' },
                { name: 'Carmen Diaz', position: 'BSOA Governor' },
                { name: 'Antonio Cruz', position: 'BSIT Governor' },
            ],
        },
        { name: 'Patricia Gomez', position: 'BSCRIM Governor', hasSubordinates: false },
        { name: 'Ricardo Santos', position: 'BEEd Governor', hasSubordinates: false },
        { name: 'Isabella Reyes', position: 'BSEd Governor', hasSubordinates: false },
    ],
}

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
                        setTimeout(() => el.classList.add('reveal-visible'), i * 100)
                    })
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.1 },
    )
    document.querySelectorAll('.reveal-group').forEach((el) => observer.observe(el))
})
</script>

<template>
    <section id="hero" class="relative h-[75dvh] overflow-hidden">
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
            <div class="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-16 pb-12 md:pb-16 reveal-group">
                <div class="hidden md:flex items-center gap-4 mb-6 reveal-item">
                    <div class="w-10 h-0.5 bg-primary"></div>
                    <span class="text-white/50 text-xs font-medium uppercase tracking-[0.3em]"
                        >St. Francis Xavier College</span
                    >
                </div>
                <h1
                    class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 reveal-item"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    Student Organizations
                </h1>
                <p class="text-base md:text-lg text-white/60 max-w-xl leading-relaxed reveal-item">
                    Empowering students through leadership, collaboration, and community service.
                </p>
            </div>
        </div>
    </section>

    <section id="student-council" class="py-24 bg-background scroll-mt-16">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-20 reveal-group">
                <div class="order-2 md:order-1 reveal-item">
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
                <div class="order-1 md:order-2 relative group px-6 reveal-item">
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
            <div class="max-w-5xl mx-auto reveal-group">
                <div class="text-center mb-12 reveal-item">
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
                <div class="flex flex-col items-center reveal-item">
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
                            <div class="flex flex-col items-center">
                                <!-- Vertical connector -->
                                <div class="w-px h-8 bg-border"></div>

                                <!-- Officer Card -->
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

                                <!-- Subordinates -->
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
            <div class="mb-16 reveal-group">
                <div class="flex items-center gap-4 mb-4 reveal-item">
                    <div class="w-8 h-0.5 bg-tertiary"></div>
                    <span class="text-tertiary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Program Leadership</span
                    >
                </div>
                <h3
                    class="text-3xl md:text-4xl font-bold text-foreground leading-tight reveal-item"
                >
                    College Presidents &amp; Governors
                </h3>
            </div>

            <!-- Top Level Officers - All Same Level -->
            <div
                class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 reveal-group"
                id="college-org-chart"
            >
                <div
                    v-for="(officer, index) in collegeOfficers.topLevel"
                    :key="index"
                    class="flex flex-col items-center reveal-item"
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

                    <!-- CBE Subordinates -->
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
            <div class="mb-16 reveal-group">
                <div class="flex items-center gap-4 mb-4 reveal-item">
                    <div class="w-8 h-0.5 bg-secondary"></div>
                    <span class="text-secondary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Student Development</span
                    >
                </div>
                <h3
                    class="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4 reveal-item"
                >
                    Interest Clubs &amp; Program-based Organizations
                </h3>
                <p
                    class="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed reveal-item"
                >
                    As part of the school's commitment to ensuring the genuine transformation of
                    students, various Clubs and Program-based Organizations/Affiliations are
                    available for students to join.
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-12 reveal-group">
                <Card class="border-2 hover:shadow-lg transition-shadow duration-150 reveal-item">
                    <CardHeader>
                        <div
                            class="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4"
                        >
                            <Users class="w-6 h-6 text-secondary" />
                        </div>
                        <CardTitle>Communication & Teamwork</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription class="text-base">
                            These clubs and organizations play a vital role in honing students'
                            communication skills, fostering creative thinking, and teaching them how
                            to work effectively with others.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card class="border-2 hover:shadow-lg transition-shadow duration-150 reveal-item">
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

            <div class="bg-background rounded-2xl border-2 border-border p-8 md:p-10 reveal-group">
                <h4 class="text-2xl font-bold text-foreground mb-6 reveal-item">
                    Guidelines &amp; Policies
                </h4>
                <div class="space-y-6">
                    <div class="flex items-start gap-4 reveal-item">
                        <div class="shrink-0">
                            <div
                                class="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center"
                            >
                                <span class="text-sm font-bold text-secondary">1</span>
                            </div>
                        </div>
                        <div>
                            <h5 class="font-semibold text-foreground mb-2">
                                Application Submission
                            </h5>
                            <p class="text-muted-foreground leading-relaxed">
                                All program-based organizations and interest clubs must submit their
                                application documents to the Office of Student Affairs and Services
                                (OSAS) at the beginning of the academic year. This ensures that all
                                groups are officially recognized and can operate within the school's
                                framework.
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4 reveal-item">
                        <div class="shrink-0">
                            <div
                                class="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center"
                            >
                                <span class="text-sm font-bold text-secondary">2</span>
                            </div>
                        </div>
                        <div>
                            <h5 class="font-semibold text-foreground mb-2">
                                Fund Collection Approval
                            </h5>
                            <p class="text-muted-foreground leading-relaxed">
                                Any fund collections by student organizations must be accompanied by
                                a resolution for approval. This process ensures transparency and
                                proper management of funds, allowing for organized and sanctioned
                                fundraising activities.
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4 reveal-item">
                        <div class="shrink-0">
                            <div
                                class="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center"
                            >
                                <span class="text-sm font-bold text-destructive">3</span>
                            </div>
                        </div>
                        <div>
                            <h5 class="font-semibold text-foreground mb-2">Anti-Hazing Policy</h5>
                            <p class="text-muted-foreground leading-relaxed">
                                Hazing is strictly prohibited for both recognized and non-recognized
                                student organizations. This policy is crucial in maintaining a safe
                                and respectful environment for all students, protecting their
                                well-being and fostering a culture of respect and dignity within the
                                school's community.
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
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center reveal-group">
                <div class="relative group px-6 reveal-item">
                    <div class="overflow-hidden rounded-xl shadow-xl border border-border">
                        <img
                            src="https://placehold.co/600x400"
                            alt="Extension Programs"
                            class="w-full object-cover aspect-4/3 scale-125"
                        />
                    </div>
                </div>
                <div class="reveal-item">
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
            <div class="mb-12 reveal-group">
                <div class="flex items-center gap-4 mb-4 reveal-item">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Community Impact</span
                    >
                </div>
                <h3
                    class="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2 reveal-item"
                >
                    Our Goals
                </h3>
                <p class="text-muted-foreground text-base md:text-lg reveal-item">
                    Through our community development program, we aim to create lasting impact
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-group">
                <div
                    class="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow duration-150 cursor-default reveal-item"
                >
                    <div
                        class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4"
                    >
                        <CheckCircle class="w-6 h-6 text-primary" />
                    </div>
                    <h4 class="font-bold text-foreground mb-2">Child Protection</h4>
                    <p class="text-sm text-muted-foreground">
                        Protecting children against criminality and deterring crimes
                    </p>
                </div>

                <div
                    class="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow duration-150 cursor-default reveal-item"
                >
                    <div
                        class="w-12 h-12 rounded-lg bg-secondary/30 flex items-center justify-center mb-4"
                    >
                        <Users class="w-6 h-6 text-secondary" />
                    </div>
                    <h4 class="font-bold text-foreground mb-2">Peer Guidance</h4>
                    <p class="text-sm text-muted-foreground">
                        Working with peers who share similar interests and aspirations
                    </p>
                </div>

                <div
                    class="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow duration-150 cursor-default reveal-item"
                >
                    <div
                        class="w-12 h-12 rounded-lg bg-tertiary/30 flex items-center justify-center mb-4"
                    >
                        <Lightbulb class="w-6 h-6 text-tertiary" />
                    </div>
                    <h4 class="font-bold text-foreground mb-2">Livelihood Ideas</h4>
                    <p class="text-sm text-muted-foreground">
                        Igniting sustainable livelihood and economic development
                    </p>
                </div>

                <div
                    class="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow duration-150 cursor-default reveal-item"
                >
                    <div
                        class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4"
                    >
                        <Heart class="w-6 h-6 text-primary" />
                    </div>
                    <h4 class="font-bold text-foreground mb-2">Digital Literacy</h4>
                    <p class="text-sm text-muted-foreground">
                        Eradicating computer illiteracy and combating digital divide
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.reveal-item {
    opacity: 0;
    transform: translateY(2rem);
    transition:
        opacity 0.6s ease,
        transform 0.6s ease;
}

.reveal-item.reveal-visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
