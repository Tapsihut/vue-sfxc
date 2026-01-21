<script setup lang="ts">
import { ArrowRight, Cross, HeartHandshake, Shield, Star } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
</script>

<template>
    <section id="home" class="relative">
        <div
            class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
        >
            <div
                class="absolute inset-0 bg-linear-to-t from-primary/90 via-background/20 to-transparent"
            ></div>

            <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
                <h1
                    class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md"
                >
                    About SFXC
                </h1>
                <p class="text-white/80 mt-4 text-lg md:text-xl max-w-xl">
                    Shaping the future through faith, excellence, and service.
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

    <section id="history" class="py-24 bg-muted/20 scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8 max-w-4xl">
            <div class="text-center mb-16">
                <div
                    class="inline-flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-wider text-sm"
                >
                    Our History
                </div>
                <h3 class="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                    A Legacy of Faith and Learning
                </h3>
            </div>

            <div class="relative">
                <div class="space-y-12 md:space-y-16">
                    <div class="relative pl-8 md:pl-0 md:pr-1/2 md:pr-12 md:text-right">
                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary md:left-auto md:right-0 md:-mr-1.5"
                        ></div>
                        <div class="md:pr-8">
                            <p class="text-muted-foreground text-lg leading-relaxed">
                                As a head start the Saint Francis Xavier College, Inc. (SFXC) rented
                                an old two-storey residential house of Mr. and Mrs. Demetrio G. del
                                Rosario. It accommodated 108 students enrolled in short-term
                                technical-vocational course certificates, Bachelor of Science in
                                Secretarial Administration, Bachelor of Science in Elementary
                                Education and Bachelor of Arts in English under the tutelage of 20
                                instructors and six members of the administrative staff.
                            </p>
                        </div>
                    </div>

                    <div class="relative pl-8 md:pl-1/2 md:pl-12">
                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-secondary md:right-auto md:left-0 md:-ml-1.5"
                        ></div>
                        <div class="md:pl-8">
                            <p class="text-muted-foreground text-lg leading-relaxed">
                                The SFXC is a non-profit non-stock corporation with a Registration
                                Number DN – 091-00583 granted by the Security and Exchange
                                Commission (SEC) on July 25, 1991 under the direct supervision of
                                the Commission on Higher Education (CHED) and the National Manpower
                                and Youth Council (NMYC) for the baccalaureate degrees and
                                technical-vocational courses, respectively.
                            </p>
                        </div>
                    </div>

                    <div class="relative pl-8 md:pl-0 md:pr-1/2 md:pr-12 md:text-right">
                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-tertiary md:left-auto md:right-0 md:-mr-1.5"
                        ></div>
                        <div class="md:pr-8">
                            <p class="text-muted-foreground text-lg leading-relaxed">
                                Hidden pillars, who stood united to put up a college, were Messrs.
                                Mamerto Prochina, Baltazar Lumangyao, Demetrio del Rosario, Romeo
                                Duron, Emmanuel Plaza, Praxedes Lambaco, and Segundo Guelos. The
                                then Governor Democrito O. Plaza donated 50 units of typewriter for
                                use in the secretarial course.
                            </p>
                        </div>
                    </div>

                    <div class="relative pl-8 md:pl-1/2 md:pl-12">
                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary md:right-auto md:left-0 md:-ml-1.5"
                        ></div>
                        <div class="md:pl-8">
                            <p class="text-muted-foreground text-lg leading-relaxed">
                                The demise of the legendary patriarch of the province of Agusan del
                                Sur paved the way for Ma'am Valentina G. Plaza to stretch her arms
                                in serving its constituents through education. Membership of their
                                respective spouses was given access to be able to address the
                                growing needs and increasing population of the college.
                            </p>
                        </div>
                    </div>

                    <div class="relative pl-8 md:pl-0 md:pr-1/2 md:pr-12 md:text-right">
                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-secondary md:left-auto md:right-0 md:-mr-1.5"
                        ></div>
                        <div class="md:pr-8">
                            <p class="text-muted-foreground text-lg leading-relaxed">
                                A year after its founding in 1990, the Saint Francis Institute of
                                Technology (SFIT) was renamed Saint Francis Xavier College (SFXC),
                                to pay tribute and honor to a Jesuit Missionary, who first set his
                                foot on the continent of Asia and Africa for evangelization and
                                conversion of the native descents into catholic-Christians. It is
                                the same visionary task that this college upholds, that each
                                graduate shall love to serve God unconditionally through the
                                practice of his profession and calling.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="vision" class="py-24 bg-background scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
                <div class="order-2 md:order-1 px-4 md:px-0">
                    <div
                        class="inline-flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-wider text-sm"
                    >
                        Our Vision
                    </div>
                    <h3 class="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                        Empowered & Excellence-Driven
                    </h3>
                    <p class="text-lg text-muted-foreground leading-relaxed">
                        St. Francis Xavier College is a dynamic, empowered, excellence-driven
                        educational institution committed to produce globally-competent and
                        versatile learners for a more meaningful life.
                    </p>
                </div>
                <div class="order-1 md:order-2 relative group px-6">
                    <div
                        class="-skew-x-12 overflow-hidden rounded-xl shadow-xl border border-border"
                    >
                        <img
                            src="https://placehold.co/600x400"
                            alt="SFXC Vision"
                            class="w-full object-cover aspect-4/3 skew-x-12 scale-125"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="mission" class="pb-24 bg-background scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
                <div class="relative group px-6">
                    <div
                        class="-skew-x-12 overflow-hidden rounded-xl shadow-xl border border-border"
                    >
                        <img
                            src="https://placehold.co/600x400"
                            alt="SFXC Mission"
                            class="w-full object-cover aspect-4/3 skew-x-12 scale-125"
                        />
                    </div>
                </div>
                <div>
                    <div
                        class="inline-flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-wider text-sm"
                    >
                        Our Mission
                    </div>
                    <h3 class="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                        Innovative Education for Genuine Transformation
                    </h3>
                    <div class="space-y-4 text-muted-foreground text-lg leading-relaxed">
                        <p>
                            The institution pursues innovative approaches in education to enhance
                            instruction, research and community involvement.
                        </p>
                        <p>
                            It pledges to provide the learners a curricular framework to instill
                            creative and critical thinking in a changing world.
                        </p>
                        <p>Is inculcated to guarantee genuine transformation.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="core" class="py-24 bg-muted/30 overflow-hidden relative">
        <div class="absolute top-0 left-0 right-0 text-primary/5 pointer-events-none">
            <svg
                viewBox="0 0 1925 375"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-auto"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.0021713 0L0.000976562 375.003L1925 0H0.0021713Z"
                    fill="currentColor"
                ></path>
            </svg>
        </div>
        <main
            class="container mx-auto px-4 md:px-8 relative z-10 flex md:flex-row justify-center flex-col gap-15 md:gap-10 lg:gap-25 py-8"
        >
            <!-- Left Side: Header -->
            <div class="max-w-137.5 md:mt-16 text-center md:text-left">
                <p class="text-xl text-primary font-semibold mb-2">Guided by S.F.X.C.</p>
                <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                    Our Core Values <br />
                    Define Us.
                </h2>
                <p class="text-muted-foreground mb-10 text-lg leading-relaxed">
                    At St. Francis Xavier College, our values are not just words—they are the
                    foundation of our identity and the compass that guides our community.
                </p>
            </div>

            <!-- Right Side: The Grid (Layout Preserved, Styles Themed) -->
            <div
                class="flex flex-col items-center gap-7.5 md:grid md:grid-cols-[220px_220px] md:grid-rows-8 lg:grid-cols-[250px_250px] lg:gap-11.25 md:-mt-12.5"
            >
                <!-- Card 1: Service -->
                <Card
                    class="col-start-1 col-end-2 row-start-1 row-end-4 w-62.5 md:w-55 lg:w-62.5 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                    <CardHeader class="p-0">
                        <div class="text-primary">
                            <HeartHandshake />
                        </div>
                    </CardHeader>
                    <CardContent class="p-0">
                        <span class="select-none text-5xl font-bold leading-none text-foreground/20"
                            >S<span class="text-primary">.</span></span
                        >
                        <div class="mt-4">
                            <span class="block text-xl font-bold text-foreground">Service</span>
                            <span class="text-sm text-muted-foreground"
                                >Compassion for community</span
                            >
                        </div>
                    </CardContent>
                </Card>

                <!-- Card 2: Fortitude -->
                <Card
                    class="col-start-2 col-end-3 row-start-2 row-end-5 w-62.5 md:w-55 lg:w-62.5 rounded-3xl border-primary bg-primary p-8 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                    <CardHeader class="p-0">
                        <div class="text-primary-foreground">
                            <Shield />
                        </div>
                    </CardHeader>
                    <CardContent class="p-0 text-primary-foreground">
                        <span class="select-none text-5xl font-bold leading-none opacity-50"
                            >F<span class="text-white">.</span></span
                        >
                        <div class="mt-4">
                            <span class="block text-xl font-bold">Fortitude</span>
                            <span class="text-sm opacity-90">Courage in adversity</span>
                        </div>
                    </CardContent>
                </Card>

                <!-- Card 3: Excellence -->
                <Card
                    class="col-start-1 col-end-2 row-start-4 row-end-7 w-62.5 md:w-55 lg:w-62.5 rounded-3xl border-secondary bg-secondary p-8 shadow-lg shadow-secondary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                    <CardHeader class="p-0">
                        <div class="text-secondary-foreground">
                            <Star />
                        </div>
                    </CardHeader>
                    <CardContent class="p-0 text-secondary-foreground">
                        <span class="select-none text-5xl font-bold leading-none opacity-50"
                            >X<span class="text-foreground">.</span></span
                        >
                        <div class="mt-4">
                            <span class="block text-xl font-bold">Excellence</span>
                            <span class="text-sm opacity-90">Driven by quality</span>
                        </div>
                    </CardContent>
                </Card>

                <!-- Card 4: Christ-Centeredness -->
                <Card
                    class="col-start-2 col-end-3 row-start-5 row-end-8 w-62.5 md:w-55 lg:w-62.5 rounded-3xl p-8 border-tertiary bg-tertiary shadow-lg shadow-tertiary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                    <CardHeader class="p-0">
                        <div class="text-tertiary-foreground">
                            <Cross />
                        </div>
                    </CardHeader>
                    <CardContent class="p-0 text-tertiary-foreground">
                        <span class="select-none text-5xl font-bold leading-none opacity-50"
                            >C<span class="text-foreground">.</span></span
                        >
                        <div class="mt-4">
                            <span class="block text-xl font-bold">Christ-Centeredness</span>
                            <span class="text-sm opacity-90">God in all things</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
        <div class="absolute bottom-0 left-0 right-0 text-primary/5 pointer-events-none rotate-180">
            <svg
                viewBox="0 0 1925 375"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-auto"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.0021713 0L0.000976562 375.003L1925 0H0.0021713Z"
                    fill="currentColor"
                ></path>
            </svg>
        </div>
    </section>

    <section id="core-details" class="py-24 bg-background scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8 max-w-6xl">
            <div class="space-y-20">
                <!-- Service -->
                <div class="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
                    <div class="flex flex-col items-center md:items-start min-w-48">
                        <div
                            class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
                        >
                            <HeartHandshake class="w-10 h-10 text-primary" />
                        </div>
                        <h3 class="text-2xl font-bold text-foreground">Service</h3>
                        <div class="h-1 w-12 bg-primary rounded-full mt-2"></div>
                    </div>
                    <div class="space-y-4">
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            Making decisions and actions which will benefit others
                        </p>
                        <div class="grid gap-2 mt-6">
                            <div
                                v-for="(indicator, index) in [
                                    'Offers availability of time for extracurricular activities',
                                    'Demonstrates initiation in finding innovative resolution',
                                    'Communicates with well-organized ideas and offers critical thoughts',
                                    'Displays positive character and attitude in communicating ideas and aspirations',
                                    'Offers fair treatment to everyone',
                                    'Works without counting much of the time',
                                    'Works hard for the benefit of the family in particular and in the community in general',
                                    'Makes himself/herself available when needed',
                                    'Responsive to the needs of changing time',
                                ]"
                                :key="index"
                                class="flex items-start gap-3 group"
                            >
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 group-hover:scale-150 transition-transform"
                                ></div>
                                <p class="text-muted-foreground leading-relaxed">{{ indicator }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fortitude -->
                <div class="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start">
                    <div class="space-y-4 md:order-1">
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            The act of recognizing strengths and weaknesses and persevering to
                            achieve success
                        </p>
                        <div class="grid gap-2 mt-6">
                            <div
                                v-for="(indicator, index) in [
                                    'Displays persistence and perseverance in all undertakings',
                                    'Maintains a sense of urgency to complete high-priority actions and meets obligations',
                                    'Displays resiliency and takes proactive measures to make improvements',
                                    'Shows mental and emotional strength in facing difficulty courageously',
                                ]"
                                :key="index"
                                class="flex items-start gap-3 group md:justify-end md:text-right"
                            >
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 group-hover:scale-150 transition-transform md:order-2"
                                ></div>
                                <p class="text-muted-foreground leading-relaxed md:order-1">
                                    {{ indicator }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex flex-col items-center md:items-end min-w-48 md:order-2 order-first"
                    >
                        <div
                            class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
                        >
                            <Shield class="w-10 h-10 text-primary" />
                        </div>
                        <h3 class="text-2xl font-bold text-foreground">Fortitude</h3>
                        <div class="h-1 w-12 bg-primary rounded-full mt-2"></div>
                    </div>
                </div>

                <!-- Excellence -->
                <div class="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
                    <div class="flex flex-col items-center md:items-start min-w-48">
                        <div
                            class="w-20 h-20 rounded-2xl bg-secondary/30 flex items-center justify-center mb-4"
                        >
                            <Star class="w-10 h-10 text-secondary" />
                        </div>
                        <h3 class="text-2xl font-bold text-foreground">eXcellence</h3>
                        <div class="h-1 w-12 bg-secondary rounded-full mt-2"></div>
                    </div>
                    <div class="space-y-4">
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            The commitment to giving one's best all the time and constantly seeking
                            improvement
                        </p>
                        <div class="grid gap-2 mt-6">
                            <div
                                v-for="(indicator, index) in [
                                    'Uses creative and critical thinking to analyse difficulties systematically by planning, prioritizing, and organizing work while anticipating and adjusting to changes',
                                    'Always willing to do something beyond expectation',
                                    'Practices tolerance and respect towards differences in religions and other beliefs',
                                ]"
                                :key="index"
                                class="flex items-start gap-3 group"
                            >
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0 group-hover:scale-150 transition-transform"
                                ></div>
                                <p class="text-muted-foreground leading-relaxed">{{ indicator }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Christ-Centeredness -->
                <div class="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start">
                    <div class="space-y-4 md:order-1">
                        <p class="text-lg text-muted-foreground leading-relaxed">
                            Having the faith in turning the ordinary into extraordinary
                        </p>
                        <div class="grid gap-2 mt-6">
                            <div
                                v-for="(indicator, index) in [
                                    'Developing faith in the Lord Jesus Christ',
                                    'Losing oneself in the service of others',
                                    'Being refined by enduring trials and tribulations with a soft heart',
                                    'Cares for the poor, the depressed and the oppressed',
                                    'Glorifies God and makes Christ real to others',
                                    'Maintains humility in spite of tremendous success in life and in profession',
                                ]"
                                :key="index"
                                class="flex items-start gap-3 group md:justify-end md:text-right"
                            >
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-tertiary mt-2.5 shrink-0 group-hover:scale-150 transition-transform md:order-2"
                                ></div>
                                <p class="text-muted-foreground leading-relaxed md:order-1">
                                    {{ indicator }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex flex-col items-center md:items-end min-w-48 md:order-2 order-first"
                    >
                        <div
                            class="w-20 h-20 rounded-2xl bg-tertiary/30 flex items-center justify-center mb-4"
                        >
                            <Cross class="w-10 h-10 text-tertiary" />
                        </div>
                        <h3 class="text-2xl font-bold text-foreground">Christ-Centeredness</h3>
                        <div class="h-1 w-12 bg-tertiary rounded-full mt-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
