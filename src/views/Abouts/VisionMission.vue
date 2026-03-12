<script setup lang="ts">
import { Cross, HeartHandshake, Shield, Star } from 'lucide-vue-next'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import PageHero from '@/components/ui/custom/PageHero.vue'
</script>

<template>
    <PageHero
        subtitle="Faith, purpose, and excellence — the guiding principles of our institution."
    >
        <template #title>Vision &amp; Mission</template>
    </PageHero>

    <section id="history" class="py-24 bg-muted/20 scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8 max-w-4xl">
            <div class="mb-16">
                <div
                    class="flex items-center gap-4 mb-4"
                    v-motion
                    :initial="{ opacity: 0, x: -16 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
                >
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Our History</span
                    >
                </div>
                <h3
                    class="text-3xl md:text-5xl font-bold text-foreground leading-tight"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 700 } }"
                >
                    A Legacy of Faith<br />and Learning
                </h3>
            </div>

            <div class="relative">
                <div
                    class="hidden md:block absolute left-1/2 -translate-x-px top-0 h-full w-px bg-border"
                ></div>
                <div class="space-y-12 md:space-y-16">
                    <div
                        class="relative pl-8 md:pl-0 md:pr-[calc(50%+2rem)] md:text-right"
                        v-motion
                        :initial="{ opacity: 0, x: -30 }"
                        :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                    >
                        <div
                            class="hidden md:block absolute right-0 top-2 w-3 h-3 rounded-full bg-primary translate-x-[calc(50%+0.5px)] border-2 border-background"
                        ></div>
                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary md:hidden"
                        ></div>
                        <p class="text-muted-foreground text-base md:text-lg leading-relaxed">
                            St. Francis Xavier College, Inc. (SFXC) is a non-profit non-stock
                            corporation with Registration Number DN - 091-00583 granted by the
                            Security and Exchange Commission (SEC) on July 25, 1991. This is under
                            the direct supervision of the Commission on Higher Education (CHED) and
                            the National Manpower and Youth Council (NMYC) for the baccalaureate
                            degrees and technical-vocational courses, respectively.
                        </p>
                    </div>

                    <div
                        class="relative pl-8 md:pl-[calc(50%+2rem)]"
                        v-motion
                        :initial="{ opacity: 0, x: 30 }"
                        :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                    >
                        <div
                            class="hidden md:block absolute left-1/2 top-2 w-3 h-3 rounded-full bg-secondary -translate-x-[calc(50%-0.5px)] border-2 border-background"
                        ></div>
                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-secondary md:hidden"
                        ></div>
                        <p class="text-muted-foreground text-base md:text-lg leading-relaxed">
                            It was founded in 1990 and originally named St. Francis Institute of
                            Technology (SFIT) to honor St. Francis Xavier, a Jesuit missionary who
                            evangelized those in Asia and Africa. The school initially rented an old
                            two-storey residential house of Mr. and Mrs. Demetrio G. del Rosario
                            that accommodated 108 students enrolled in short-term
                            technical-vocational course certificates and three baccalaureate courses
                            (i.e. Bachelor of Science in Secretarial Administration, Bachelor of
                            Science in Elementary Education, and Bachelor of Arts in English) under
                            the tutelage of 20 instructors and six members of the administrative
                            staff.
                        </p>
                    </div>

                    <div
                        class="relative pl-8 md:pl-0 md:pr-[calc(50%+2rem)] md:text-right"
                        v-motion
                        :initial="{ opacity: 0, x: -30 }"
                        :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                    >
                        <div
                            class="hidden md:block absolute right-0 top-2 w-3 h-3 rounded-full bg-tertiary translate-x-[calc(50%+0.5px)] border-2 border-background"
                        ></div>
                        <div
                            class="absolute left-0 top-2 w-3 h-3 rounded-full bg-tertiary md:hidden"
                        ></div>
                        <p class="text-muted-foreground text-base md:text-lg leading-relaxed">
                            The founders of the college were Messrs. Mamerto Prochina, Baltazar
                            Lumangyao, Demetrio del Rosario, Romeo Duron, Emmanuel Plaza, Praxedes
                            Lambaco, and Segundo Guelos. Mr. Democrito O. Plaza, former congressman
                            and governor, personally donated 50 units of typewriter for the
                            secretarial course. After working in public service, Mrs. Valentina G.
                            Plaza, former governor of Agusan del Sur, continued serving the
                            province's constituents through education. Board members of the college
                            expanded to include founders' spouses to address the growing needs and
                            increasing population of the college.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="vision" class="py-24 bg-background scroll-mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
            <div class="grid md:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
                <div
                    class="md:col-span-5 order-2 md:order-1"
                    v-motion
                    :initial="{ opacity: 0, x: -30 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                >
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                            >Our Vision</span
                        >
                    </div>
                    <h3
                        class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight"
                    >
                        Leading with<br />
                        <span class="text-primary italic font-serif font-light"
                            >Excellence &amp; Values</span
                        >
                    </h3>
                    <div
                        class="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary/50 before:to-transparent"
                    >
                        <p class="text-base md:text-lg text-muted-foreground leading-relaxed">
                            An open, leading educational institution upholding excellence-driven and
                            value laden leaders for the socio-economic development of society.
                        </p>
                    </div>
                </div>
                <div
                    class="md:col-span-7 order-1 md:order-2"
                    v-motion
                    :initial="{ opacity: 0, scale: 0.96 }"
                    :visible-once="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
                >
                    <div class="relative group rounded-2xl overflow-hidden shadow-2xl">
                        <div
                            class="absolute inset-0 bg-primary/20 z-10 group-hover:bg-transparent transition-colors duration-500"
                        ></div>
                        <img
                            src="https://placehold.co/800x500"
                            alt="SFXC Vision"
                            class="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-6 mb-24">
                <div class="flex-1 h-px bg-border"></div>
                <span class="text-muted-foreground/40 text-xs uppercase tracking-widest"
                    >Mission</span
                >
                <div class="flex-1 h-px bg-border"></div>
            </div>

            <div class="grid md:grid-cols-12 gap-12 lg:gap-16 items-center" id="mission">
                <div
                    class="md:col-span-7"
                    v-motion
                    :initial="{ opacity: 0, scale: 0.96 }"
                    :visible-once="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
                >
                    <div class="relative group rounded-2xl overflow-hidden shadow-2xl">
                        <div
                            class="absolute inset-0 bg-secondary/20 z-10 group-hover:bg-transparent transition-colors duration-500"
                        ></div>
                        <img
                            src="https://placehold.co/800x500"
                            alt="SFXC Mission"
                            class="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
                <div
                    class="md:col-span-5"
                    v-motion
                    :initial="{ opacity: 0, x: 30 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                >
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                            >Our Mission</span
                        >
                    </div>
                    <h3
                        class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight"
                    >
                        Innovative Education<br />
                        <span class="text-primary italic font-serif font-light"
                            >for Genuine Transformation</span
                        >
                    </h3>
                    <div
                        class="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary/50 before:to-transparent"
                    >
                        <p class="text-base md:text-lg text-muted-foreground leading-relaxed">
                            The institution pursues innovative approaches in education to enhance
                            instruction, research, and community involvement. It pledges to provide
                            the learners a curricular framework to instill creative and critical
                            thinking in a changing world. Strengthening of culture, environmental
                            care, and values formation are inculcated to guarantee genuine
                            transformation.
                        </p>
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
            <div
                class="max-w-137.5 md:mt-16 text-center md:text-left"
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
            >
                <div class="flex items-center gap-4 mb-4 justify-center md:justify-start">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                        >Guided by S.F.X.C.</span
                    >
                </div>
                <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                    Our Core Values <br />Define Us.
                </h2>
                <p class="text-muted-foreground mb-10 text-base md:text-lg leading-relaxed">
                    At St. Francis Xavier College, our values are not just words—they are the
                    foundation of our identity and the compass that guides our community.
                </p>
            </div>

            <div
                class="flex flex-col items-center gap-7.5 md:grid md:grid-cols-[220px_220px] md:grid-rows-8 lg:grid-cols-[250px_250px] lg:gap-11.25 md:-mt-12.5"
            >
                <Card
                    class="col-start-1 col-end-2 row-start-1 row-end-4 w-62.5 md:w-55 lg:w-62.5 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    v-motion
                    :initial="{ opacity: 0, y: 40 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0, duration: 600, type: 'tween', ease: 'easeOut' },
                    }"
                >
                    <CardHeader class="p-0"
                        ><div class="text-primary"><HeartHandshake /></div
                    ></CardHeader>
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

                <Card
                    class="col-start-2 col-end-3 row-start-2 row-end-5 w-62.5 md:w-55 lg:w-62.5 rounded-3xl border-primary bg-primary p-8 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    v-motion
                    :initial="{ opacity: 0, y: 40 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 150, duration: 600, type: 'tween', ease: 'easeOut' },
                    }"
                >
                    <CardHeader class="p-0"
                        ><div class="text-primary-foreground"><Shield /></div
                    ></CardHeader>
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

                <Card
                    class="col-start-1 col-end-2 row-start-4 row-end-7 w-62.5 md:w-55 lg:w-62.5 rounded-3xl border-secondary bg-secondary p-8 shadow-lg shadow-secondary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    v-motion
                    :initial="{ opacity: 0, y: 40 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 300, duration: 600, type: 'tween', ease: 'easeOut' },
                    }"
                >
                    <CardHeader class="p-0"
                        ><div class="text-secondary-foreground"><Star /></div
                    ></CardHeader>
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

                <Card
                    class="col-start-2 col-end-3 row-start-5 row-end-8 w-62.5 md:w-55 lg:w-62.5 rounded-3xl p-8 border-tertiary bg-tertiary shadow-lg shadow-tertiary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    v-motion
                    :initial="{ opacity: 0, y: 40 }"
                    :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 450, duration: 600, type: 'tween', ease: 'easeOut' },
                    }"
                >
                    <CardHeader class="p-0"
                        ><div class="text-tertiary-foreground"><Cross /></div
                    ></CardHeader>
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
                <div
                    class="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start"
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
                >
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

                <div
                    class="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start"
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
                >
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

                <div
                    class="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start"
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
                >
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

                <div
                    class="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start"
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
                >
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
