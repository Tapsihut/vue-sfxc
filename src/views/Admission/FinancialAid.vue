<script setup lang="ts">
import { useFinancialAid } from '@/composables/useFinancialAid'
import PageHero from '@/components/ui/custom/PageHero.vue'
import ScholarshipAccordion from '@/components/ui/custom/ScholarshipAccordion.vue'

const { chedPrograms, otherGovPrograms } = useFinancialAid()
</script>

<template>
    <PageHero
        subtitle="Explore available scholarships and financial assistance programs for SFXC students."
    >
        <template #title>Scholarships &amp; Financial Aid</template>
    </PageHero>

    <div class="bg-background">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24 space-y-16">
            <!-- Intro -->
            <div
                v-motion
                :initial="{ opacity: 0, y: 32 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
            >
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]">Financial Aid</span>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Accepted Financial Aid at SFXC
                </h2>
                <p class="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                    Education at SFXC is an investment in our students' futures. As our institution
                    continues to strive for the socio-economic development of society, we believe
                    our students deserve quality education. With many of our students coming from
                    humble backgrounds, the Admission and Scholarship Office (ADSO) is more than
                    ready to assist with financial aid for our deserving students. <br /><br />
                    Below is a list of available and accepted financial aid at SFXC. Should there be
                    other scholarships and grants that are not mentioned, contact ADSO for special
                    arrangements.
                </p>
                <div class="mt-6 space-y-2 text-sm md:text-base text-muted-foreground">
                    <p class="text-base md:text-lg font-bold text-foreground">
                        𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄
                    </p>
                    <p><span class="font-semibold text-foreground">Facebook:</span> SFXC Scholarship Office</p>
                    <p><span class="font-semibold text-foreground">Email:</span> Admission.scholarship@sfxc.edu.ph</p>
                    <p><span class="font-semibold text-foreground">Mobile:</span> 0908 885 5380</p>
                </div>
            </div>

            <!-- CHED Programs -->
            <div class="space-y-6">
                <div
                    v-motion
                    :initial="{ opacity: 0, x: -24 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]">CHED Programs</span>
                    </div>
                    <h3 class="text-2xl font-bold text-foreground">CHED Scholarship Programs</h3>
                </div>

                <div
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 600 } }"
                >
                    <ScholarshipAccordion :items="chedPrograms" />
                </div>
            </div>

            <!-- Other Government Programs -->
            <div class="space-y-6">
                <div
                    v-motion
                    :initial="{ opacity: 0, x: -24 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-tertiary"></div>
                        <span class="text-tertiary font-semibold text-xs uppercase tracking-[0.3em]">Government Scholarships</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold text-foreground">
                        Other Scholarship Programs
                    </h3>
                </div>

                <p
                    class="text-muted-foreground leading-relaxed max-w-3xl"
                    v-motion
                    :initial="{ opacity: 0, y: 16 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { delay: 80, duration: 600 } }"
                >
                    The application for the following Government-Funded Scholarship are
                    agency-direct. Scholars need to submit their applications directly to the
                    scholarship giving agency and transact scholarship concerns like requirements
                    and allowances straight from their office. However, announcements and updates
                    regarding various scholarships offers shall be posted by the ADSO once
                    requested.
                </p>

                <div
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { delay: 150, duration: 600 } }"
                >
                    <ScholarshipAccordion :items="otherGovPrograms" :numbered="true" />
                </div>
            </div>
        </div>
    </div>
</template>
