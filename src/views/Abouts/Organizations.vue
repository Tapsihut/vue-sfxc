<script setup lang="ts">
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
</script>

<template>
    <section id="hero" class="relative">
        <div
            class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
        >
            <div
                class="absolute inset-0 bg-linear-to-t from-secondary/90 via-background/20 to-transparent"
            ></div>

            <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
                <h1
                    class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md"
                >
                    Student Organizations
                </h1>
                <p class="text-white/80 mt-4 text-lg md:text-xl max-w-xl">
                    Empowering students through leadership, collaboration, and community service.
                </p>
            </div>

            <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
                <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        fill="currentColor"
                        fill-opacity="1"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </div>
    </section>

    <section id="student-council" class="py-24 bg-background scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-20">
                <div class="order-2 md:order-1">
                    <div
                        class="inline-flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-wider text-sm"
                    >
                        Leadership
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
                <div class="order-1 md:order-2 relative group px-6">
                    <div
                        class="absolute -inset-4 bg-primary/10 rounded-2xl -z-10 group-hover:bg-primary/20 transition-colors duration-500 skew-x-12"
                    ></div>
                    <div
                        class="skew-x-12 overflow-hidden rounded-xl shadow-xl border border-border"
                    >
                        <img
                            src="https://placehold.co/600x400"
                            alt="Student Council"
                            class="w-full object-cover aspect-4/3 -skew-x-12 scale-125"
                        />
                    </div>
                </div>
            </div>

            <!-- SCL Officers Flow Chart -->
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h4 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        SCL Officers
                    </h4>
                    <p class="text-muted-foreground">Student Council of Leaders</p>
                </div>

                <!-- President -->
                <div class="flex flex-col items-center">
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
                                    class="bg-card border-2 border-border rounded-xl p-4 shadow-md text-center w-full hover:shadow-lg transition-shadow"
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
                                            class="bg-muted/50 border border-border rounded-lg p-3 text-center hover:bg-muted transition-colors"
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
        <div class="container mx-auto px-4 md:px-8 max-w-6xl">
            <div class="text-center mb-16">
                <div
                    class="inline-flex items-center gap-2 text-tertiary font-bold mb-4 uppercase tracking-wider text-sm"
                >
                    Program Leadership
                </div>
                <h3 class="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    College Presidents & Governors
                </h3>
            </div>

            <!-- Top Level Officers - All Same Level -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div
                    v-for="(officer, index) in collegeOfficers.topLevel"
                    :key="index"
                    class="flex flex-col items-center"
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
                                    class="bg-card border border-border rounded-lg p-3 text-center w-full hover:shadow-md transition-shadow"
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
        <div class="container mx-auto px-4 md:px-8 max-w-6xl">
            <div class="text-center mb-16">
                <div
                    class="inline-flex items-center gap-2 text-secondary font-bold mb-4 uppercase tracking-wider text-sm"
                >
                    Student Development
                </div>
                <h3 class="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                    Interest Clubs and Program-based Organizations
                </h3>
                <p class="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                    As part of the school's commitment to ensuring the genuine transformation of
                    students, various Clubs and Program-based Organizations/Affiliations are
                    available for students to join.
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-12">
                <Card class="border-2 hover:shadow-lg transition-shadow">
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

                <Card class="border-2 hover:shadow-lg transition-shadow">
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

            <div class="bg-background rounded-2xl border-2 border-border p-8 md:p-10">
                <h4 class="text-2xl font-bold text-foreground mb-6">Guidelines & Policies</h4>
                <div class="space-y-6">
                    <div class="flex items-start gap-4">
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

                    <div class="flex items-start gap-4">
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

                    <div class="flex items-start gap-4">
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

    <section id="extension" class="py-24 bg-background scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div class="relative group px-6">
                    <div
                        class="absolute -inset-4 bg-tertiary/10 rounded-2xl -z-10 group-hover:bg-tertiary/20 transition-colors duration-500 -skew-x-12"
                    ></div>
                    <div
                        class="-skew-x-12 overflow-hidden rounded-xl shadow-xl border border-border"
                    >
                        <img
                            src="https://placehold.co/600x400"
                            alt="Extension Programs"
                            class="w-full object-cover aspect-4/3 skew-x-12 scale-125"
                        />
                    </div>
                </div>
                <div>
                    <div
                        class="inline-flex items-center gap-2 text-tertiary font-bold mb-4 uppercase tracking-wider text-sm"
                    >
                        Community Service
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
        <div class="container mx-auto px-4 md:px-8 max-w-5xl">
            <div class="text-center mb-12">
                <h3 class="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                    Our Goals
                </h3>
                <p class="text-muted-foreground text-lg">
                    Through our community development program, we aim to create lasting impact
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                    class="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
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
                    class="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
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
                    class="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
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
                    class="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
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

<style scoped></style>
