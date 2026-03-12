<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { CourseRecommendation } from '@/data/admissionGuide'

defineProps<{
    course: CourseRecommendation
    index: number
}>()
</script>

<template>
    <Card
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :enter="{
            opacity: 1,
            y: 0,
            transition: { delay: index * 120, duration: 550 },
        }"
        class="overflow-hidden"
    >
        <CardHeader class="bg-primary/5">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <Badge variant="default">
                            {{ index === 0 ? 'Best Match' : `Match ${index + 1}` }}
                        </Badge>
                        <Badge variant="outline">{{ course.code }}</Badge>
                    </div>
                    <CardTitle class="text-2xl">{{ course.name }}</CardTitle>
                    <CardDescription class="mt-2 text-base">
                        {{ course.matchReason }}
                    </CardDescription>
                </div>
            </div>
        </CardHeader>

        <CardContent class="pt-6">
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-semibold mb-3">Career Opportunities</h4>
                    <ul class="space-y-2">
                        <li
                            v-for="career in course.careers"
                            :key="career"
                            class="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                            <span class="text-primary mt-1">&#8226;</span>
                            <span>{{ career }}</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-3">Key Skills You'll Develop</h4>
                    <div class="flex flex-wrap gap-2">
                        <Badge v-for="skill in course.skills" :key="skill" variant="secondary">
                            {{ skill }}
                        </Badge>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
