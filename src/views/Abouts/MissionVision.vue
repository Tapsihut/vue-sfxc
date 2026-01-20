<script setup lang="ts">
import { ArrowRight, Cross, HeartHandshake, Shield, Star } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
</script>

<template>
    <section id="home" class="relative overflow-hidden">
        <img src="https://placehold.co/1420x680" class="object-cover mx-auto" alt="" srcset="" />
    </section>

    <section id="mission" class="py-24 bg-background scroll-mt-16">
        <div class="container mx-auto">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
                <div class="order-2 md:order-1 px-4 md:px-0">
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
                        <p>
                            Cultural Preservation, Environmental Care and Values Formation are
                            inculcated to guarantee genuine transformation.
                        </p>
                    </div>
                </div>
                <div class="order-1 md:order-2 relative group">
                    <div
                        class="absolute -inset-4 bg-primary/10 rounded-2xl -z-10 group-hover:bg-primary/20 transition-colors duration-500"
                    ></div>
                    <img
                        src="https://placehold.co/600x400"
                        alt="SFXC Mission"
                        class="rounded-xl shadow-xl w-full object-cover aspect-4/3 border border-border"
                    />
                </div>
            </div>
        </div>
    </section>

    <section id="vision" class="pb-24 bg-background scroll-mt-16">
        <div class="container mx-auto">
            <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
                <div class="relative group">
                    <div
                        class="absolute -inset-4 bg-secondary/30 rounded-2xl -z-10 group-hover:bg-secondary/50 transition-colors duration-500"
                    ></div>
                    <img
                        src="https://placehold.co/600x400"
                        alt="SFXC Vision"
                        class="rounded-xl shadow-xl w-full object-cover aspect-4/3 border border-border"
                    />
                </div>
                <div>
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
            class="container mx-auto relative z-10 flex md:flex-row justify-center flex-col gap-15 md:gap-10 lg:gap-25 px-4 lg:px-8 py-8"
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
                <Button size="lg">
                    <span>Student Life</span>
                    <ArrowRight />
                </Button>
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
</template>

<style scoped></style>
