<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import PageHero from '@/components/ui/custom/PageHero.vue'
import SectionHeader from '@/components/ui/custom/SectionHeader.vue'
import ProcedureCard from '@/components/ui/custom/ProcedureCard.vue'
import { useHealthProtocols } from '@/composables/useHealthProtocols'

const { protocols } = useHealthProtocols()
</script>

<template>
    <PageHero
        subtitle="Health protocols and procedures governing student wellness services at SFXC."
        subtitleMax="max-w-xl"
    >
        <template #title>Safety and Health<br />Office Protocols</template>
    </PageHero>

    <div class="min-h-screen bg-background pb-24">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <!-- Intro -->
            <div class="mb-16">
                <SectionHeader
                    label="Campus Safety"
                    title="Health Protocols"
                    description="The Safety and Health Office ensures student well-being through structured protocols covering health screening, first aid, medication, OJT clearance, uniform exemptions, and dental services."
                />
            </div>

            <Separator class="my-16" />

            <!-- Protocols Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProcedureCard
                    v-for="(protocol, i) in protocols"
                    :key="protocol.id"
                    :item="protocol"
                    :delay="i * 100"
                    title-class="text-base leading-snug"
                />
            </div>

            <Separator class="mt-20" />
        </div>
    </div>
</template>
