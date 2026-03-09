<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
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

interface TourForm {
    firstName: string
    lastName: string
    email: string
    phone: string
    tourDate: Date | null
    tourTime: string
    visitors: string
    program: string
    message: string
}

const form = ref<TourForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tourDate: null,
    tourTime: '',
    visitors: '1',
    program: '',
    message: '',
})

const isSubmitted = ref(false)
const isLoading = ref(false)

const tourTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

const programs = [
    'Bachelor of Science in Information Technology',
    'Bachelor of Science in Business Administration',
    'Bachelor of Science in Hospitality Management',
    'Bachelor of Elementary Education',
    'Bachelor of Secondary Education',
    'TESDA Programs',
    'Senior High School',
    'Not Sure Yet',
]

// Philippine holidays for 2025
const holidays = [
    new Date(2025, 1, 25), // EDSA Revolution
    new Date(2025, 3, 17), // Maundy Thursday
    new Date(2025, 3, 18), // Good Friday
    new Date(2025, 4, 1), // Labor Day
    new Date(2025, 5, 12), // Independence Day
    new Date(2025, 7, 21), // Ninoy Aquino Day
    new Date(2025, 7, 25), // National Heroes Day
    new Date(2025, 10, 30), // Bonifacio Day
    new Date(2025, 11, 25), // Christmas
    new Date(2025, 11, 30), // Rizal Day
    new Date(2025, 11, 31), // New Year's Eve
]

// Current month and year
const currentDate = new Date()
const selectedMonth = ref(currentDate.getMonth())
const selectedYear = ref(currentDate.getFullYear())

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const daysInMonth = computed(() => {
    return new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
    return new Date(selectedYear.value, selectedMonth.value, 1).getDay()
})

const calendarDays = computed(() => {
    const days = []
    const totalDays = daysInMonth.value
    const firstDay = firstDayOfMonth.value

    // Add empty slots for days before the month starts
    for (let i = 0; i < firstDay; i++) {
        days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= totalDays; day++) {
        days.push(day)
    }

    return days
})

const isWeekend = (day: number | null) => {
    if (!day) return false
    const date = new Date(selectedYear.value, selectedMonth.value, day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
}

const isHoliday = (day: number | null) => {
    if (!day) return false
    const date = new Date(selectedYear.value, selectedMonth.value, day)
    return holidays.some(
        (holiday) =>
            holiday.getDate() === day &&
            holiday.getMonth() === selectedMonth.value &&
            holiday.getFullYear() === selectedYear.value,
    )
}

const isPastDate = (day: number | null) => {
    if (!day) return false
    const date = new Date(selectedYear.value, selectedMonth.value, day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
}

const isDisabled = (day: number | null) => {
    return isWeekend(day) || isHoliday(day) || isPastDate(day)
}

const isSelected = (day: number | null) => {
    if (!day || !form.value.tourDate) return false
    const date = new Date(selectedYear.value, selectedMonth.value, day)
    return (
        date.getDate() === form.value.tourDate.getDate() &&
        date.getMonth() === form.value.tourDate.getMonth() &&
        date.getFullYear() === form.value.tourDate.getFullYear()
    )
}

const selectDate = (day: number | null) => {
    if (!day || isDisabled(day)) return
    form.value.tourDate = new Date(selectedYear.value, selectedMonth.value, day)
}

const previousMonth = () => {
    if (selectedMonth.value === 0) {
        selectedMonth.value = 11
        selectedYear.value--
    } else {
        selectedMonth.value--
    }
}

const nextMonth = () => {
    if (selectedMonth.value === 11) {
        selectedMonth.value = 0
        selectedYear.value++
    } else {
        selectedMonth.value++
    }
}

const formatDate = (date: Date | null) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const handleSubmit = async () => {
    if (!form.value.tourDate) {
        alert('Please select a tour date')
        return
    }

    isLoading.value = true

    setTimeout(() => {
        isLoading.value = false
        isSubmitted.value = true
    }, 1500)
}

const resetForm = () => {
    form.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        tourDate: null,
        tourTime: '',
        visitors: '1',
        program: '',
        message: '',
    }
    isSubmitted.value = false
}

const setupObserver = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
                        setTimeout(() => el.classList.add('reveal-visible'), i * 100)
                    })
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.1 },
    )
    document.querySelectorAll('.reveal-group').forEach((el) => observer.observe(el))
}

onMounted(setupObserver)

watch(isSubmitted, async () => {
    await nextTick()
    setupObserver()
})
</script>

<template>
    <section id="hero" class="relative h-[75dvh] overflow-hidden">
        <img
            src="/src/assets/images/sfxc-building.jpg"
            alt="SFXC Building"
            class="absolute inset-0 w-full h-full object-cover"
        />
        <div
            class="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10 z-1"
        ></div>
        <div
            class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent z-1"
        ></div>
        <div
            class="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-primary/25 to-transparent z-1"
        ></div>
        <div class="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
            <div class="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-16 pb-12 md:pb-16 reveal-group">
                <div class="hidden md:flex items-center gap-4 mb-6 reveal-item">
                    <div class="w-10 h-0.5 bg-primary"></div>
                    <span class="text-white/50 text-xs font-medium uppercase tracking-[0.3em]"
                        >St. Francis Xavier College</span
                    >
                </div>
                <h1
                    class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 reveal-item"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    Schedule Campus Tour
                </h1>
                <p class="text-base md:text-lg text-white/60 max-w-xl leading-relaxed reveal-item">
                    Book your visit to SFXC and see our campus first-hand.
                </p>
            </div>
        </div>
    </section>

    <div class="bg-background">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <div class="grid lg:grid-cols-[1fr_1.65fr] gap-16 items-start">
                <!-- Left sidebar -->
                <div class="reveal-group lg:sticky lg:top-24">
                    <div class="flex items-center gap-4 mb-4 reveal-item">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]"
                            >Campus Tour</span
                        >
                    </div>
                    <h2 class="text-3xl font-bold text-foreground mb-4 reveal-item">
                        Plan Your Visit
                    </h2>
                    <p class="text-muted-foreground leading-relaxed mb-10 reveal-item">
                        See SFXC up close. Meet faculty, explore our facilities, and get a real feel
                        for student life before you enroll.
                    </p>

                    <!-- What to expect -->
                    <div class="space-y-6 mb-10 reveal-item">
                        <div class="flex items-start gap-4">
                            <div
                                class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"
                            >
                                <MapPin class="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p class="font-semibold text-foreground text-sm mb-1">
                                    Campus Walkthrough
                                </p>
                                <p class="text-sm text-muted-foreground leading-relaxed">
                                    Tour classrooms, labs, the library, and student facilities.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div
                                class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"
                            >
                                <GraduationCap class="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p class="font-semibold text-foreground text-sm mb-1">
                                    Meet Admissions
                                </p>
                                <p class="text-sm text-muted-foreground leading-relaxed">
                                    Talk to an admissions officer about your program of interest.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div
                                class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"
                            >
                                <Clock class="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p class="font-semibold text-foreground text-sm mb-1">
                                    ~45 Minutes
                                </p>
                                <p class="text-sm text-muted-foreground leading-relaxed">
                                    Tours run Monday–Friday, 9 AM to 4 PM.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Contact info -->
                    <div class="border-t border-border pt-8 reveal-item space-y-3">
                        <p
                            class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4"
                        >
                            Need help?
                        </p>
                        <div class="flex items-center gap-3 text-sm">
                            <Phone class="w-4 h-4 text-primary shrink-0" />
                            <span class="text-foreground">0909-088-85380</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <Mail class="w-4 h-4 text-primary shrink-0" />
                            <span class="text-foreground break-all"
                                >admission.scholarship@sfxc.edu.ph</span
                            >
                        </div>
                    </div>
                </div>

                <!-- Right: Form / Success -->
                <div class="reveal-group">
                    <!-- Booking Form -->
                    <Card v-if="!isSubmitted" class="reveal-item">
                        <CardContent class="p-6 md:p-10">
                            <form @submit.prevent="handleSubmit" class="space-y-8">
                                <!-- Section: Personal Information -->
                                <div>
                                    <div class="flex items-center gap-3 mb-5">
                                        <div
                                            class="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center"
                                        >
                                            <Users class="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <h3 class="font-semibold text-foreground">
                                            Personal Information
                                        </h3>
                                    </div>
                                    <div class="space-y-4">
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <Label for="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    v-model="form.firstName"
                                                    placeholder="Juan"
                                                    required
                                                />
                                            </div>
                                            <div class="space-y-2">
                                                <Label for="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    v-model="form.lastName"
                                                    placeholder="Dela Cruz"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <Label for="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    v-model="form.email"
                                                    placeholder="juan@email.com"
                                                    required
                                                />
                                            </div>
                                            <div class="space-y-2">
                                                <Label for="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    v-model="form.phone"
                                                    placeholder="09XX XXX XXXX"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <Label for="program">Program of Interest</Label>
                                            <Select v-model="form.program" required>
                                                <option value="">Select a program</option>
                                                <option
                                                    v-for="program in programs"
                                                    :key="program"
                                                    :value="program"
                                                >
                                                    {{ program }}
                                                </option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div class="border-t border-border"></div>

                                <!-- Section: Tour Schedule -->
                                <div>
                                    <div class="flex items-center gap-3 mb-5">
                                        <div
                                            class="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center"
                                        >
                                            <Calendar class="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <h3 class="font-semibold text-foreground">Tour Schedule</h3>
                                    </div>

                                    <!-- Calendar -->
                                    <div class="space-y-2">
                                        <Label>Select Date</Label>
                                        <div
                                            class="border border-border rounded-xl p-4 bg-muted/20"
                                        >
                                            <!-- Header -->
                                            <div class="flex items-center justify-between mb-4">
                                                <button
                                                    type="button"
                                                    @click="previousMonth"
                                                    class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors cursor-pointer"
                                                >
                                                    <ChevronLeft class="w-4 h-4" />
                                                </button>
                                                <span class="text-sm font-semibold"
                                                    >{{ monthNames[selectedMonth] }}
                                                    {{ selectedYear }}</span
                                                >
                                                <button
                                                    type="button"
                                                    @click="nextMonth"
                                                    class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors cursor-pointer"
                                                >
                                                    <ChevronRight class="w-4 h-4" />
                                                </button>
                                            </div>

                                            <!-- Day Names -->
                                            <div class="grid grid-cols-7 mb-2">
                                                <div
                                                    v-for="day in dayNames"
                                                    :key="day"
                                                    class="text-center text-[10px] font-medium text-muted-foreground py-1"
                                                >
                                                    {{ day }}
                                                </div>
                                            </div>

                                            <!-- Calendar Days -->
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
                                                        day &&
                                                            !isDisabled(day) &&
                                                            !isSelected(day) &&
                                                            'hover:bg-primary/10 hover:text-primary cursor-pointer',
                                                        isWeekend(day) &&
                                                            'text-red-300 cursor-not-allowed',
                                                        isHoliday(day) &&
                                                            'bg-orange-100 text-orange-500 cursor-not-allowed',
                                                        isPastDate(day) &&
                                                            !isWeekend(day) &&
                                                            !isHoliday(day) &&
                                                            'text-muted-foreground cursor-not-allowed opacity-40',
                                                        isSelected(day) &&
                                                            'bg-primary text-primary-foreground shadow-sm font-bold',
                                                    ]"
                                                >
                                                    {{ day }}
                                                </button>
                                            </div>

                                            <!-- Legend -->
                                            <div
                                                class="mt-4 pt-3 border-t border-border flex flex-wrap gap-4 text-[10px]"
                                            >
                                                <div class="flex items-center gap-1.5">
                                                    <div
                                                        class="w-2.5 h-2.5 rounded-sm bg-red-300 opacity-70"
                                                    ></div>
                                                    <span class="text-muted-foreground"
                                                        >Weekends</span
                                                    >
                                                </div>
                                                <div class="flex items-center gap-1.5">
                                                    <div
                                                        class="w-2.5 h-2.5 rounded-sm bg-orange-400"
                                                    ></div>
                                                    <span class="text-muted-foreground"
                                                        >Holidays</span
                                                    >
                                                </div>
                                                <div class="flex items-center gap-1.5">
                                                    <div
                                                        class="w-2.5 h-2.5 rounded-sm bg-primary"
                                                    ></div>
                                                    <span class="text-muted-foreground"
                                                        >Selected</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Time – pill grid -->
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

                                    <!-- Visitors – pill grid -->
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
                                    <Label for="message"
                                        >Message
                                        <span class="text-muted-foreground font-normal"
                                            >(Optional)</span
                                        ></Label
                                    >
                                    <Textarea
                                        id="message"
                                        v-model="form.message"
                                        rows="3"
                                        placeholder="Any specific interests or questions about your visit?"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    class="w-full"
                                    size="lg"
                                    :disabled="isLoading"
                                >
                                    <span v-if="isLoading" class="flex items-center gap-2">
                                        <svg
                                            class="animate-spin w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                class="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                stroke-width="4"
                                            ></circle>
                                            <path
                                                class="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            ></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                    <span v-else>Request Campus Tour</span>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <!-- Success State -->
                    <Card v-else class="reveal-item">
                        <CardContent class="p-8 md:p-12">
                            <div class="text-center">
                                <div
                                    class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <Check class="w-8 h-8 text-green-600" />
                                </div>
                                <h2 class="text-2xl font-bold text-foreground mb-2">
                                    You're All Set!
                                </h2>
                                <p class="text-muted-foreground mb-8">
                                    Your campus tour request has been submitted. We'll confirm your
                                    schedule via email.
                                </p>

                                <div
                                    class="bg-muted/40 rounded-xl p-6 text-left max-w-sm mx-auto mb-8"
                                >
                                    <p
                                        class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4"
                                    >
                                        Tour Summary
                                    </p>
                                    <div class="space-y-3">
                                        <div class="flex justify-between text-sm">
                                            <span class="text-muted-foreground">Name</span>
                                            <span class="font-medium text-foreground"
                                                >{{ form.firstName }} {{ form.lastName }}</span
                                            >
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-muted-foreground">Date</span>
                                            <span class="font-medium text-foreground">{{
                                                formatDate(form.tourDate)
                                            }}</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-muted-foreground">Time</span>
                                            <span class="font-medium text-foreground">{{
                                                form.tourTime
                                            }}</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-muted-foreground">Visitors</span>
                                            <span class="font-medium text-foreground"
                                                >{{ form.visitors }}
                                                {{
                                                    form.visitors === '1' ? 'person' : 'people'
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>

                                <p class="text-sm text-muted-foreground mb-6">
                                    Confirmation sent to
                                    <span class="font-medium text-foreground">{{
                                        form.email
                                    }}</span>
                                </p>

                                <Button @click="resetForm" variant="outline">
                                    Schedule Another Tour
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.reveal-item {
    opacity: 0;
    transform: translateY(2rem);
    transition:
        opacity 0.6s ease,
        transform 0.6s ease;
}

.reveal-item.reveal-visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
