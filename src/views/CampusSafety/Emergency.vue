<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import PageHero from '@/components/ui/custom/PageHero.vue'
import SectionHeader from '@/components/ui/custom/SectionHeader.vue'
import ContactGroupCard from '@/components/ui/custom/ContactGroupCard.vue'
import ProcedureCard from '@/components/ui/custom/ProcedureCard.vue'
import { useEmergency } from '@/composables/useEmergency'

const { contactGroups, procedures } = useEmergency()
</script>

<template>
    <PageHero subtitle="Procedures to follow in the event of an emergency on campus.">
        <template #title>Emergency &amp; Disaster<br />Preparedness Plan</template>
    </PageHero>

    <div class="min-h-screen bg-background pb-24">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <!-- Key Contacts Section -->
            <div class="mb-20">
                <SectionHeader
                    label="Campus Safety"
                    title="Key Contact Details"
                    description="Save these numbers. In any emergency, knowing who to call can save lives."
                />
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <ContactGroupCard
                        v-for="(group, i) in contactGroups"
                        :key="group.id"
                        :group="group"
                        :delay="i * 150"
                    />
                </div>
            </div>

            <Separator class="my-16" />

            <!-- Procedures Section -->
            <div class="mb-12">
                <SectionHeader
                    label="Procedures"
                    title="Emergency Procedures"
                    description="The following procedures should be followed in the event of an emergency."
                />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProcedureCard
                    v-for="(procedure, i) in procedures"
                    :key="procedure.id"
                    :item="procedure"
                    :delay="i * 100"
                />
            </div>

            <Separator class="mt-20" />
        </div>
    </div>
</template>
