<script setup lang="ts">
import { useScheduleTour } from '@/composables/useScheduleTour'
import { tourTimes, tourPrograms } from '@/data/scheduleTour'
import PageHero from '@/components/ui/custom/PageHero.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import {
    Calendar,
    Clock,
    Users,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Check,
    GraduationCap,
    Phone,
    Mail,
} from 'lucide-vue-next'

const {
    form,
    isSubmitted,
    isLoading,
    selectedMonth,
    selectedYear,
    monthNames,
    dayNames,
    calendarDays,
    isWeekend,
    isHoliday,
    isPastDate,
    isDisabled,
    isSelected,
    selectDate,
    previousMonth,
    nextMonth,
    formatDate,
    handleSubmit,
    resetForm,
} = useScheduleTour()
</script>

<template>
    <PageHero subtitle="Book your visit to SFXC and see our campus first-hand.">
        <template #title>Schedule Campus Tour</template>
    </PageHero>

    <div class="bg-background">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <div class="grid lg:grid-cols-[1fr_1.65fr] gap-16 items-start">
                <!-- Left Sidebar -->
                <div
                    class="lg:sticky lg:top-24"
                    v-motion
                    :initial="{ opacity: 0, x: -24 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]">Campus Tour</span>
                    </div>
                    <h2 class="text-3xl font-bold text-foreground mb-4">Plan Your Visit</h2>
                    <p class="text-muted-foreground leading-relaxed mb-10">
                        See SFXC up close. Meet faculty, explore our facilities, and get a real feel
                        for student life before you enroll.
                    </p>

                    <!-- What to expect -->
                    <div class="space-y-6 mb-10">
                        <div class="flex items-start gap-4">
                            <div class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <MapPin class="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p class="font-semibold text-foreground text-sm mb-1">Campus Walkthrough</p>
                                <p class="text-sm text-muted-foreground leading-relaxed">Tour classrooms, labs, the library, and student facilities.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <GraduationCap class="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p class="font-semibold text-foreground text-sm mb-1">Meet Admissions</p>
                                <p class="text-sm text-muted-foreground leading-relaxed">Talk to an admissions officer about your program of interest.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Clock class="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p class="font-semibold text-foreground text-sm mb-1">~45 Minutes</p>
                                <p class="text-sm text-muted-foreground leading-relaxed">Tours run Monday–Friday, 9 AM to 4 PM.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Contact info -->
                    <div class="border-t border-border pt-8 space-y-3">
                        <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Need help?</p>
                        <div class="flex items-center gap-3 text-sm">
                            <Phone class="w-4 h-4 text-primary shrink-0" />
                            <span class="text-foreground">0909-088-85380</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <Mail class="w-4 h-4 text-primary shrink-0" />
                            <span class="text-foreground break-all">admission.scholarship@sfxc.edu.ph</span>
                        </div>
                    </div>
                </div>

                <!-- Right: Form / Success -->
                <div
                    v-motion
                    :initial="{ opacity: 0, x: 24 }"
                    :visible-once="{ opacity: 1, x: 0, transition: { delay: 100, duration: 700 } }"
                >
                    <!-- Booking Form -->
                    <Card v-if="!isSubmitted">
                        <CardContent class="p-6 md:p-10">
                            <form @submit.prevent="handleSubmit" class="space-y-8">
                                <!-- Personal Information -->
                                <div>
                                    <div class="flex items-center gap-3 mb-5">
                                        <div class="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                                            <Users class="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <h3 class="font-semibold text-foreground">Personal Information</h3>
                                    </div>
                                    <div class="space-y-4">
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <Label for="firstName">First Name</Label>
                                                <Input id="firstName" v-model="form.firstName" placeholder="Juan" required />
                                            </div>
                                            <div class="space-y-2">
                                                <Label for="lastName">Last Name</Label>
                                                <Input id="lastName" v-model="form.lastName" placeholder="Dela Cruz" required />
                                            </div>
                                        </div>
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <Label for="email">Email</Label>
                                                <Input id="email" type="email" v-model="form.email" placeholder="juan@email.com" required />
                                            </div>
                                            <div class="space-y-2">
                                                <Label for="phone">Phone Number</Label>
                                                <Input id="phone" type="tel" v-model="form.phone" placeholder="09XX XXX XXXX" required />
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <Label for="program">Program of Interest</Label>
                                            <Select v-model="form.program" required>
                                                <option value="">Select a program</option>
                                                <option v-for="program in tourPrograms" :key="program" :value="program">
                                                    {{ program }}
                                                </option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div class="border-t border-border"></div>

                                <!-- Tour Schedule -->
                                <div>
                                    <div class="flex items-center gap-3 mb-5">
                                        <div class="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                                            <Calendar class="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <h3 class="font-semibold text-foreground">Tour Schedule</h3>
                                    </div>

                                    <!-- Calendar -->
                                    <div class="space-y-2">
                                        <Label>Select Date</Label>
                                        <div class="border border-border rounded-xl p-4 bg-muted/20">
                                            <div class="flex items-center justify-between mb-4">
                                                <button type="button" @click="previousMonth" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                                    <ChevronLeft class="w-4 h-4" />
                                                </button>
                                                <span class="text-sm font-semibold">{{ monthNames[selectedMonth] }} {{ selectedYear }}</span>
                                                <button type="button" @click="nextMonth" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                                    <ChevronRight class="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div class="grid grid-cols-7 mb-2">
                                                <div v-for="day in dayNames" :key="day" class="text-center text-[10px] font-medium text-muted-foreground py-1">
                                                    {{ day }}
                                                </div>
                                            </div>

                                            <div class="grid grid-cols-7 gap-1">
                                                <button
                                                    v-for="(day, index) in calendarDays"
                                                    :key="index"
                                                    type="button"
                                                    @click="selectDate(day)"
                                                    :disabled="!day || isDisabled(day)"
                                                    :class="[
                                                        'h-9 w-full p-0 text-xs rounded-lg transition-all duration-150 font-medium',
                                                        !day && 'invisible',
                                                        day && !isDisabled(day) && !isSelected(day) && 'hover:bg-primary/10 hover:text-primary cursor-pointer',
                                                        isWeekend(day) && 'text-red-300 cursor-not-allowed',
                                                        isHoliday(day) && 'bg-orange-100 text-orange-500 cursor-not-allowed',
                                                        isPastDate(day) && !isWeekend(day) && !isHoliday(day) && 'text-muted-foreground cursor-not-allowed opacity-40',
                                                        isSelected(day) && 'bg-primary text-primary-foreground shadow-sm font-bold',
                                                    ]"
                                                >
                                                    {{ day }}
                                                </button>
                                            </div>

                                            <!-- Legend -->
                                            <div class="mt-4 pt-3 border-t border-border flex flex-wrap gap-4 text-[10px]">
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-2.5 h-2.5 rounded-sm bg-red-300 opacity-70"></div>
                                                    <span class="text-muted-foreground">Weekends</span>
                                                </div>
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-2.5 h-2.5 rounded-sm bg-orange-400"></div>
                                                    <span class="text-muted-foreground">Holidays</span>
                                                </div>
                                                <div class="flex items-center gap-1.5">
                                                    <div class="w-2.5 h-2.5 rounded-sm bg-primary"></div>
                                                    <span class="text-muted-foreground">Selected</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Time selection -->
                                    <div class="mt-6 space-y-3">
                                        <Label>Preferred Time</Label>
                                        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                            <button
                                                v-for="time in tourTimes"
                                                :key="time"
                                                type="button"
                                                @click="form.tourTime = time"
                                                :class="[
                                                    'px-3 py-2 text-sm rounded-lg border transition-all duration-150 cursor-pointer font-medium',
                                                    form.tourTime === time
                                                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                                        : 'border-border hover:border-primary/60 hover:text-primary',
                                                ]"
                                            >
                                                {{ time }}
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Visitors -->
                                    <div class="mt-6 space-y-3">
                                        <Label>Number of Visitors</Label>
                                        <div class="grid grid-cols-5 gap-2">
                                            <button
                                                v-for="n in ['1', '2', '3', '4', '5+']"
                                                :key="n"
                                                type="button"
                                                @click="form.visitors = n === '5+' ? '5' : n"
                                                :class="[
                                                    'py-2.5 text-sm rounded-lg border transition-all duration-150 cursor-pointer font-medium',
                                                    form.visitors === (n === '5+' ? '5' : n)
                                                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                                        : 'border-border hover:border-primary/60 hover:text-primary',
                                                ]"
                                            >
                                                {{ n }}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="border-t border-border"></div>

                                <!-- Message -->
                                <div class="space-y-2">
                                    <Label for="message">Message <span class="text-muted-foreground font-normal">(Optional)</span></Label>
                                    <Textarea id="message" v-model="form.message" rows="3" placeholder="Any specific interests or questions about your visit?" />
                                </div>

                                <Button type="submit" class="w-full" size="lg" :disabled="isLoading">
                                    <span v-if="isLoading" class="flex items-center gap-2">
                                        <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                    <span v-else>Request Campus Tour</span>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <!-- Success State -->
                    <Card
                        v-else
                        v-motion
                        :initial="{ opacity: 0, scale: 0.95 }"
                        :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }"
                    >
                        <CardContent class="p-8 md:p-12">
                            <div class="text-center">
                                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check class="w-8 h-8 text-green-600" />
                                </div>
                                <h2 class="text-2xl font-bold text-foreground mb-2">You're All Set!</h2>
                                <p class="text-muted-foreground mb-8">
                                    Your campus tour request has been submitted. We'll confirm your schedule via email.
                                </p>

                                <div class="bg-muted/40 rounded-xl p-6 text-left max-w-sm mx-auto mb-8">
                                    <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Tour Summary</p>
                                    <div class="space-y-3">
                                        <div class="flex justify-between text-sm">
                                            <span class="text-muted-foreground">Name</span>
                                            <span class="font-medium text-foreground">{{ form.firstName }} {{ form.lastName }}</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-muted-foreground">Date</span>
                                            <span class="font-medium text-foreground">{{ formatDate(form.tourDate) }}</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-muted-foreground">Time</span>
                                            <span class="font-medium text-foreground">{{ form.tourTime }}</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-muted-foreground">Visitors</span>
                                            <span class="font-medium text-foreground">{{ form.visitors }} {{ form.visitors === '1' ? 'person' : 'people' }}</span>
                                        </div>
                                    </div>
                                </div>

                                <p class="text-sm text-muted-foreground mb-6">
                                    Confirmation sent to <span class="font-medium text-foreground">{{ form.email }}</span>
                                </p>

                                <Button @click="resetForm" variant="outline">Schedule Another Tour</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>
