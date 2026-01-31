<script setup lang="ts">
import { Quote } from 'lucide-vue-next'
</script>

<template>
    <section id="hero" class="relative">
        <div
            class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
        >
            <div
                class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"
            ></div>

            <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
                <h1
                    class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md"
                >
                    Our School Patron
                </h1>
                <p class="text-white/80 mt-4 text-lg md:text-xl max-w-xl">
                    Saint Francis Xavier - A beacon of faith, service, and evangelization.
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

    <section id="who-was" class="py-24 bg-background scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div class="relative group px-6">
                    <div
                        class="absolute -inset-4 bg-tertiary/10 rounded-2xl -z-10 group-hover:bg-tertiary/20 transition-colors duration-500 skew-x-12"
                    ></div>
                    <div
                        class="skew-x-12 overflow-hidden rounded-xl shadow-xl border border-border"
                    >
                        <img
                            src="https://www.catholicapostolatecenter.org/uploads/9/2/4/6/9246931/637779979_orig.jpg"
                            alt="Saint Francis Xavier"
                            class="w-full object-cover aspect-3/4 -skew-x-12 scale-125"
                        />
                    </div>
                </div>
                <div>
                    <div
                        class="inline-flex items-center gap-2 text-tertiary font-bold mb-4 uppercase tracking-wider text-sm"
                    >
                        Our Patron Saint
                    </div>
                    <h3 class="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                        Who Was St. Francis Xavier?
                    </h3>
                    <div class="space-y-4 text-muted-foreground text-lg leading-relaxed">
                        <p>
                            With encouragement from his friend Ignatius of Loyola, Saint Francis
                            Xavier devoted himself to religious service and became one of the
                            founders of the Jesuit order.
                        </p>
                        <p>
                            Much of his life was spent tending to missions in areas such as India
                            and Japan. He was 46 when he died on China's Shangchuan Island on
                            December 3, 1552.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="missionary" class="py-24 bg-muted/20 scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8 max-w-5xl">
            <div class="text-center mb-16">
                <div
                    class="inline-flex items-center gap-2 text-tertiary font-bold mb-4 uppercase tracking-wider text-sm"
                >
                    His Journey
                </div>
                <h3 class="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                    Missionary Work
                </h3>
            </div>

            <div class="space-y-12 md:space-y-16">
                <div class="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
                    <div class="flex flex-col items-center md:items-start">
                        <div
                            class="w-16 h-16 rounded-xl bg-tertiary/20 flex items-center justify-center mb-3"
                        >
                            <span class="text-2xl font-bold text-tertiary">1540</span>
                        </div>
                        <div class="h-full w-px bg-tertiary/30 hidden md:block mt-2"></div>
                    </div>
                    <div class="space-y-3">
                        <h4 class="text-xl font-bold text-foreground">The Beginning</h4>
                        <p class="text-muted-foreground text-lg leading-relaxed">
                            Impressed by the Jesuits, King John III of Portugal asked the order for
                            missionaries to work in his empire. Though Loyola initially selected
                            others for the task, Xavier stepped in when a fellow priest became ill.
                            He left Rome on March 15, 1540.
                        </p>
                    </div>
                </div>

                <div class="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
                    <div class="flex flex-col items-center md:items-start">
                        <div
                            class="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-3"
                        >
                            <span class="text-2xl font-bold text-primary">1542</span>
                        </div>
                        <div class="h-full w-px bg-primary/30 hidden md:block mt-2"></div>
                    </div>
                    <div class="space-y-3">
                        <h4 class="text-xl font-bold text-foreground">India & Beyond</h4>
                        <p class="text-muted-foreground text-lg leading-relaxed">
                            Xavier arrived in Goa, India, on May 6, 1542. He came to be admired in
                            that country for his ability to live and work side by side with the
                            poor. Seeking more converts, Xavier continued to travel; his stops
                            included Ceylon, the Molucca Islands, the Banda Islands and the Malay
                            Peninsula.
                        </p>
                    </div>
                </div>

                <div class="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
                    <div class="flex flex-col items-center md:items-start">
                        <div
                            class="w-16 h-16 rounded-xl bg-secondary/30 flex items-center justify-center mb-3"
                        >
                            <span class="text-2xl font-bold text-secondary">1549</span>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <h4 class="text-xl font-bold text-foreground">Japan</h4>
                        <p class="text-muted-foreground text-lg leading-relaxed">
                            On August 15, 1549, Xavier landed at Kagoshima, Japan. As he had at his
                            other missions, Xavier adapted to local mores and arranged for the
                            translation of religious texts. These steps helped him reach more
                            converts in the year and a half he spent in Japan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="legacy" class="py-24 bg-background scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div class="order-2 md:order-1">
                    <div
                        class="inline-flex items-center gap-2 text-tertiary font-bold mb-4 uppercase tracking-wider text-sm"
                    >
                        His Final Journey
                    </div>
                    <h3 class="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
                        Last Mission, Death and Legacy
                    </h3>
                    <div class="space-y-4 text-muted-foreground text-lg leading-relaxed">
                        <p>
                            Xavier's next focus for missionary work was China. He travelled to
                            Sancian (Shangchuan) Island, near Canton, but was not able to access the
                            mainland because borders had been closed to foreigners. Before he could
                            find a way inside the country, illness incapacitated Xavier. He died on
                            the island on December 3, 1552, at the age of 46. His body was then
                            taken to Goa.
                        </p>
                        <p>
                            Though he passed away at a relatively young age, Xavier had accomplished
                            much in his life. In addition to being a founding member of the Jesuit
                            order—the Society of Jesus was officially recognized by Pope Paul III in
                            1540—he baptized an estimated 30,000 people.
                        </p>
                        <p>
                            Xavier was beatified by Pope Paul V in 1619 and canonized by Pope
                            Gregory XV in 1622. A famed missionary himself, he is now the patron
                            saint of missionaries.
                        </p>
                    </div>
                </div>
                <div class="order-1 md:order-2 relative group px-6">
                    <div
                        class="-skew-x-12 overflow-hidden rounded-xl shadow-xl border border-border"
                    >
                        <img
                            src="https://placehold.co/600x400"
                            alt="St. Francis Xavier Legacy"
                            class="w-full object-cover aspect-4/3 skew-x-12 scale-125"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="quote" class="py-24 bg-tertiary text-tertiary-foreground overflow-hidden relative">
        <div class="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
            <div class="text-center">
                <Quote class="w-12 h-12 mx-auto mb-6 opacity-50" />
                <blockquote class="text-2xl md:text-3xl font-serif italic leading-relaxed mb-6">
                    In this life, we find our greatest comfort living in the midst of danger, that
                    is, if we confront them solely for the love of God.
                </blockquote>
                <p class="text-lg font-semibold opacity-90">— Saint Francis Xavier</p>
            </div>
        </div>
    </section>

    <section id="logo-rationale" class="py-24 bg-background scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8 max-w-5xl">
            <div class="text-center mb-16">
                <div
                    class="inline-flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-wider text-sm"
                >
                    Our Identity
                </div>
                <h3 class="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                    Logo Rationale
                </h3>
                <p class="text-muted-foreground text-lg max-w-3xl mx-auto">
                    Each element of our logo carries deep meaning, representing the foundations,
                    values, and aspirations of Saint Francis Xavier College.
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
                <div class="flex justify-center md:sticky md:top-24">
                    <div class="relative">
                        <img
                            src="@/assets/images/sfxc-logo-only.png"
                            alt="SFXC Logo"
                            class="relative w-120 h-auto object-contain"
                        />
                    </div>
                </div>

                <div class="space-y-6">
                    <!-- Symbols -->
                    <div class="space-y-6">
                        <h4 class="text-xl font-bold text-foreground mb-4">Symbols & Elements</h4>

                        <div class="flex items-start gap-4">
                            <div class="w-3 h-3 rounded-full bg-tertiary mt-2 shrink-0"></div>
                            <div>
                                <h5 class="font-semibold text-foreground mb-1">
                                    Coat of Arms Shield
                                </h5>
                                <p class="text-muted-foreground leading-relaxed">
                                    Carries the symbols and colors that represents the foundations,
                                    values, and aspirations of SFXC.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-3 h-3 rounded-full bg-tertiary mt-2 shrink-0"></div>
                            <div>
                                <h5 class="font-semibold text-foreground mb-1">Cross</h5>
                                <p class="text-muted-foreground leading-relaxed">
                                    Stands for SFXC's moral and spiritual compass, which is
                                    Christ-centered.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-3 h-3 rounded-full bg-tertiary mt-2 shrink-0"></div>
                            <div>
                                <h5 class="font-semibold text-foreground mb-1">Lily</h5>
                                <p class="text-muted-foreground leading-relaxed">
                                    For Saint Francis Xavier, whose missionary work and achievements
                                    in education were unparalleled.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-3 h-3 rounded-full bg-tertiary mt-2 shrink-0"></div>
                            <div>
                                <h5 class="font-semibold text-foreground mb-1">Open Book</h5>
                                <p class="text-muted-foreground leading-relaxed">
                                    Represents education and its quest.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-3 h-3 rounded-full bg-tertiary mt-2 shrink-0"></div>
                            <div>
                                <h5 class="font-semibold text-foreground mb-1">Tree</h5>
                                <p class="text-muted-foreground leading-relaxed">
                                    Inspired from a humble seed that was nurtured and strengthened
                                    by its environment.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-3 h-3 rounded-full bg-tertiary mt-2 shrink-0"></div>
                            <div>
                                <h5 class="font-semibold text-foreground mb-1">River</h5>
                                <p class="text-muted-foreground leading-relaxed">
                                    Symbolizes Agusan River which marks the province with its hand
                                    of providence and golden opportunities.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Colors -->
                    <div class="space-y-6 pt-6 border-t border-border">
                        <h4 class="text-xl font-bold text-foreground mb-4">Colors</h4>

                        <div class="flex items-start gap-4">
                            <div
                                class="w-8 h-8 rounded-lg bg-primary mt-0.5 shrink-0 border border-border"
                            ></div>
                            <div>
                                <h5 class="font-semibold text-foreground mb-1">Green</h5>
                                <p class="text-muted-foreground leading-relaxed">
                                    Represents hope and growth.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="w-8 h-8 rounded-lg bg-secondary mt-0.5 shrink-0 border border-border"
                            ></div>
                            <div>
                                <h5 class="font-semibold text-foreground mb-1">Yellow</h5>
                                <p class="text-muted-foreground leading-relaxed">
                                    Represents optimism and enlightenment.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="w-8 h-8 rounded-lg bg-tertiary mt-0.5 shrink-0 border border-border"
                            ></div>
                            <div>
                                <h5 class="font-semibold text-foreground mb-1">Blue</h5>
                                <p class="text-muted-foreground leading-relaxed">
                                    Represents stability and depth in character.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Motto -->
                    <div class="pt-6 border-t border-border">
                        <div
                            class="bg-linear-to-br from-primary/10 via-secondary/10 to-tertiary/10 rounded-xl p-6 border border-border"
                        >
                            <h5 class="font-bold text-foreground mb-2 text-lg">
                                "Deo Optimo Maximo"
                            </h5>
                            <p class="text-muted-foreground leading-relaxed italic">
                                "To God, who is the best and the greatest."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
