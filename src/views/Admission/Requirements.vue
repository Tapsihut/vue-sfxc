<script setup lang="ts">
import { useAdmissionRequirements } from '@/composables/useAdmissionRequirements'
import PageHero from '@/components/ui/custom/PageHero.vue'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, Facebook } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const {
    programs,
    selectedStudentType,
    selectedProgram,
    expandedCourses,
    toggleCourse,
    currentRequirements,
    requirementsTitle,
    requirementsSubtitle,
} = useAdmissionRequirements()

const enrollmentSteps = [
    {
        step: 1,
        title: 'Student Information Profile',
        description:
            'Visit the Admission & Scholarship Office for profiling. Submit required documents. Old students must update profiles. Undergo medical history interview at the Clinic. Sign routing form.',
    },
    {
        step: 2,
        title: 'Payment of Registration Fee',
        description:
            'Proceed to Cashier. Option 1: ECPay Partner Outlets (7/11, Gaisano, etc.) - send receipt photo to Accounts and Finance FB. Option 2: Over-the-counter at Cashier. Sign routing form.',
    },
    {
        step: 3,
        title: 'Enlisting of Intended Subjects',
        description:
            'Visit department office. Enlist subjects according to program. Secure evaluation and approval from Dean/Program Head. Sign routing form.',
    },
    {
        step: 4,
        title: 'Validation of Payment and Enrollment',
        description:
            'Proceed to Assessment Office. Office will assess total enrolled units and validate enrollment registration. Sign routing form.',
    },
    {
        step: 5,
        title: 'Release of School ID',
        description:
            'Visit OSAS. Fill out School ID form and submit 2x2 picture with clear background. Receive School ID. Sign routing form.',
    },
]
</script>

<template>
    <PageHero subtitle="Complete guide to admission requirements and enrollment process at SFXC.">
        <template #title>Admission Requirements</template>
    </PageHero>

    <div class="bg-background">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <!-- Admission Hub Info -->
            <div
                class="mb-16"
                v-motion
                :initial="{ opacity: 0, y: 24 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
            >
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]">Admission &amp; Scholarship Office</span>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-6">Admission Hub</h2>
                <p class="text-lg text-muted-foreground mb-6">
                    This Admission Hub section is your go-to place for all things related to
                    enrolling at SFXC and becoming a Xavier Knight. Run by the Admission and
                    Scholarship Office, this hub helps interested parents and students…
                </p>
                <ul class="list-disc list-inside text-lg text-muted-foreground mb-8 pl-6 space-y-2">
                    <li>
                        <router-link :to="{ hash: '#courses' }" class="text-tertiary hover:underline font-medium">Decide on a course;</router-link>
                    </li>
                    <li>
                        <router-link :to="{ hash: '#enrollment' }" class="text-tertiary hover:underline font-medium">Learn how to enroll;</router-link>
                    </li>
                    <li>
                        <router-link to="/admission/financial-aid" class="text-tertiary hover:underline font-medium">Discover financial aid opportunities (scholarships and grants);</router-link>
                    </li>
                    <li>
                        <router-link to="/academics/enrollment" class="text-tertiary hover:underline font-medium">Enroll online;</router-link>
                        and
                    </li>
                    <li>
                        <router-link to="/admission/tour" class="text-tertiary hover:underline font-medium">Schedule a campus tour</router-link>
                    </li>
                </ul>

                <h2 class="text-2xl font-bold text-foreground mb-4">
                    What is the Admission and Scholarship Office (ADSO)?
                </h2>
                <p class="text-lg text-muted-foreground mb-4">
                    The Admission and Scholarship Office (ADSO) is mandated to implement and oversee
                    all policies related to student admission, enrollment, and scholarship
                    administration. It ensures that enrollees are given importance. The office also
                    manages institutional, government, and private scholarship grants, ensuring
                    compliance with national regulations such as CHED-UniFAST guidelines.
                </p>
                <p class="text-lg text-muted-foreground mb-8">
                    The ADSO maintains records, processes documentation, and coordinates with
                    internal and external offices to guarantee accurate reporting and transparent
                    fund utilization.
                </p>

                <h2 class="text-2xl font-bold text-foreground mb-4">ADSO Objectives</h2>
                <p class="text-lg text-muted-foreground mb-4">
                    The Admission & Scholarship Office transactions are guided by the following
                    objectives:
                </p>
                <ul class="list-disc list-inside text-lg text-muted-foreground pl-6 space-y-2 mb-4">
                    <li>To maintain an efficient, systematic, and transparent admission process.</li>
                    <li>To promote accessibility to educational opportunities through scholarships and financial aid.</li>
                    <li>To maintain accurate and confidential student and grantee records.</li>
                    <li>To ensure compliance with institutional and national education policies.</li>
                    <li>To strengthen linkages with external partners for expanded scholarship opportunities.</li>
                    <li>To cultivate a culture of excellence, accountability, and service within the office and among student-grantees.</li>
                </ul>
                <p class="text-lg text-muted-foreground mb-8">
                    For assistance with admission and scholarship matters, contact
                    <a href="https://www.facebook.com/SFXC.ADSO" class="text-primary hover:underline font-bold">us here</a>
                </p>
            </div>

            <Separator class="my-16" />

            <!-- Courses Section -->
            <div id="courses" class="mb-16 scroll-mt-24">
                <div
                    class="mb-12"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]">Academic Programs</span>
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What Course Should I Choose?
                    </h2>
                    <p class="text-lg text-muted-foreground max-w-3xl">
                        A Guide for Students Finding Their Path at St. Francis Xavier College
                    </p>
                </div>

                <div
                    class="space-y-6 text-lg text-muted-foreground mb-16"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { delay: 80, duration: 600 } }"
                >
                    <p>
                        Choosing a college course is an exciting milestone—but it can also feel
                        overwhelming. With so many options available, many students find themselves
                        asking the same question: "What course is right for me?"
                    </p>
                    <p>
                        At St. Francis Xavier College, we understand that choosing a program is not
                        just about trends or peer pressure. It's about discovering where your
                        interests, strengths, and future goals meet. This guide is designed to help
                        you understand the programs offered at SFXC and identify which course aligns
                        best with who you are and who you want to become.
                    </p>

                    <div class="border-l-4 border-tertiary pl-6 md:pl-8 py-2 my-10">
                        <h3 class="text-2xl font-bold text-primary mb-4">Start With Yourself</h3>
                        <p class="mb-4">Before choosing a course, take a moment to reflect:</p>
                        <ul class="list-disc list-inside pl-2 space-y-3 mb-6 font-medium text-foreground">
                            <li>What subjects do you genuinely enjoy?</li>
                            <li>What skills come naturally to you?</li>
                            <li>Do you see yourself teaching, managing, creating, serving, or leading?</li>
                            <li>What kind of work environment do you imagine yourself in someday?</li>
                        </ul>
                        <p class="font-bold text-primary">
                            Your answers to these questions matter. A course becomes meaningful when it fits you.
                            <a href="/admission/guide" class="text-foreground hover:underline font-bold">Click here</a>
                            to see our short quiz to help decide your preferred course.
                        </p>
                    </div>
                </div>

                <!-- Program Selector -->
                <div
                    class="mb-16"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 600 } }"
                >
                    <div class="mb-8">
                        <h3 class="text-xl md:text-2xl font-bold text-foreground mb-4 text-center">
                            Select a College Program
                        </h3>
                        <div class="flex flex-wrap gap-2 md:gap-3 justify-center">
                            <Button
                                v-for="{ id, title } in [
                                    { id: 'abel', title: 'Arts & Sciences' },
                                    { id: 'cte', title: 'Teacher Education' },
                                    { id: 'ccje', title: 'Criminology' },
                                    { id: 'ctom', title: 'Tech & Office' },
                                    { id: 'cbe-accounting', title: 'Accounting' },
                                    { id: 'cbe-business', title: 'Business' },
                                ]"
                                :key="id"
                                variant="ghost"
                                @click="selectedProgram = id"
                                :class="[
                                    'px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300',
                                    selectedProgram === id
                                        ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                                        : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground',
                                ]"
                            >
                                {{ title }}
                            </Button>
                        </div>
                    </div>

                    <template v-for="program in programs" :key="program.id">
                        <div v-show="selectedProgram === program.id" class="max-w-4xl mx-auto mt-8">
                            <div class="mb-8">
                                <h3 class="text-2xl md:text-3xl font-bold text-primary leading-tight mb-2">
                                    {{ program.question }}
                                </h3>
                                <p class="text-sm md:text-base font-semibold text-tertiary uppercase tracking-widest">
                                    {{ program.collegeName }}
                                </p>
                            </div>

                            <div class="mb-8">
                                <p class="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                                    Courses Offered
                                </p>
                                <div class="space-y-4">
                                    <div
                                        v-for="(course, index) in program.courses"
                                        :key="index"
                                        class="group border-b border-border/50 pb-4 last:border-0"
                                    >
                                        <button
                                            @click="toggleCourse(program.id, index)"
                                            class="w-full flex items-start gap-4 text-left focus:outline-none"
                                        >
                                            <div class="shrink-0 w-6 h-6 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center text-xs font-bold mt-0.5 group-hover:bg-tertiary group-hover:text-white transition-colors">
                                                {{ index + 1 }}
                                            </div>
                                            <div class="flex-1 min-w-0 flex items-start justify-between gap-4">
                                                <h4 class="text-base font-semibold text-foreground leading-tight hover:text-tertiary transition-colors">
                                                    {{ course.name }}
                                                </h4>
                                                <ChevronDown
                                                    class="w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200"
                                                    :class="{ 'rotate-180': expandedCourses[`${program.id}-${index}`] }"
                                                />
                                            </div>
                                        </button>
                                        <div
                                            v-show="expandedCourses[`${program.id}-${index}`]"
                                            class="pl-10 pr-4 pt-3 text-sm text-muted-foreground leading-relaxed"
                                        >
                                            {{ course.description }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-6 border-t border-border flex items-center justify-between">
                                <Button variant="link" class="p-0 h-auto text-base text-primary hover:text-primary/80 font-medium transition-colors gap-2">
                                    Learn More
                                    <ChevronRight class="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" class="w-10 h-10 bg-primary/5 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                                    <Facebook class="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Conclusion -->
                <div
                    class="mt-24 mb-16 max-w-4xl mx-auto"
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
                >
                    <div class="mb-8">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-8 h-0.5 bg-tertiary"></div>
                            <span class="text-tertiary font-semibold text-xs uppercase tracking-[0.3em]">Your Path Forward</span>
                        </div>
                        <h3 class="text-3xl md:text-4xl font-bold text-foreground">
                            Your Future Starts With The Right Choice
                        </h3>
                    </div>
                    <p class="text-lg text-muted-foreground leading-relaxed mb-16">
                        There is no single "best" course—only the course that best matches you.
                        At St. Francis Xavier College, we are committed to guiding you not just
                        toward a degree, but toward a purposeful future.
                    </p>
                    <div class="flex flex-col md:flex-row gap-12 md:gap-6 items-start justify-between border-t border-border pt-12">
                        <div class="flex flex-col items-start w-full md:w-1/3">
                            <h4 class="text-xl font-bold text-foreground mb-2">Reflect</h4>
                            <p class="text-muted-foreground">Choose a course that genuinely fits your passion and your natural strengths.</p>
                        </div>
                        <div class="flex flex-col items-start w-full md:w-1/3">
                            <h4 class="text-xl font-bold text-foreground mb-2">Research</h4>
                            <p class="text-muted-foreground">Choose a school that offers the environment to support your personal growth.</p>
                        </div>
                        <div class="flex flex-col items-start w-full md:w-1/3">
                            <h4 class="text-xl font-bold text-primary mb-2">Decide</h4>
                            <p class="text-muted-foreground font-medium">Choose St. Francis Xavier College to start building your professional future today.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator class="my-16" />
        </div>

        <!-- Requirements Section -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pb-24">
            <div class="mb-20">
                <div
                    class="mb-10"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-tertiary"></div>
                        <span class="text-tertiary font-semibold text-xs uppercase tracking-[0.3em]">Enrollment Documents</span>
                    </div>
                    <h2 class="text-3xl font-bold mb-3 text-foreground">Document Requirements</h2>
                    <p class="text-lg text-muted-foreground">Select your student type to view the specific requirements.</p>
                </div>

                <div
                    class="overflow-hidden flex flex-col md:flex-row border border-border rounded-2xl shadow-sm"
                    v-motion
                    :initial="{ opacity: 0, y: 32 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 700 } }"
                >
                    <!-- Left: Student Type Selection -->
                    <div class="w-full md:w-1/3 lg:w-1/4 bg-muted/30 p-4 md:p-6 border-b md:border-b-0 md:border-r border-border flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible">
                        <h3 class="text-lg font-semibold text-foreground mb-2 md:mb-4 px-2 hidden md:block">Student Type</h3>
                        <Button
                            v-for="type in (['freshmen', 'transferee', 'cross-enrollee', 'international'] as const)"
                            :key="type"
                            variant="ghost"
                            @click="selectedStudentType = type"
                            :class="[
                                'justify-center md:justify-start px-4 py-3 md:py-6 text-sm md:text-base font-medium rounded-xl transition-all duration-300 border-2 whitespace-nowrap capitalize',
                                selectedStudentType === type
                                    ? 'bg-tertiary text-tertiary-foreground border-secondary shadow-md'
                                    : 'border-transparent hover:bg-tertiary/10 text-muted-foreground hover:text-foreground',
                            ]"
                        >
                            {{ type.replace('-', '\u00A0') }}
                        </Button>
                    </div>

                    <!-- Right: Requirements List -->
                    <div class="w-full md:w-2/3 lg:w-3/4 p-4 sm:p-6 md:p-8">
                        <div class="mb-8">
                            <h3 class="text-2xl font-bold text-foreground mb-2">{{ requirementsTitle }}</h3>
                            <p class="text-muted-foreground">{{ requirementsSubtitle }}</p>
                        </div>
                        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <div
                                v-for="(req, index) in currentRequirements"
                                :key="index"
                                class="bg-muted/30 border border-border p-6 hover:shadow-md transition-all duration-300 rounded-xl"
                            >
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-8 h-8 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center font-bold text-sm mt-0.5">
                                        {{ index + 1 }}
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <h4 class="text-base font-bold text-foreground mb-1.5 leading-tight">{{ req.name }}</h4>
                                        <p class="text-sm text-muted-foreground leading-relaxed">{{ req.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Enrollment Section -->
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
            <Separator class="mb-20" />

            <div id="enrollment" class="scroll-mt-24">
                <div
                    class="mb-12"
                    v-motion
                    :initial="{ opacity: 0, y: 24 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                >
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary font-semibold text-xs uppercase tracking-[0.3em]">Enrollment Process</span>
                    </div>
                    <h2 class="text-3xl font-bold mb-3">How to Enroll at SFXC</h2>
                    <p class="text-muted-foreground">
                        The College implements a systematic enrollment process to ensure that all
                        students are properly registered and credited for their academic work. The
                        following steps will be followed for enrollment of new students, old
                        students, and transferee students.
                    </p>
                </div>

                <div class="space-y-8">
                    <div
                        v-for="(step, index) in enrollmentSteps"
                        :key="step.step"
                        class="flex gap-6"
                        v-motion
                        :initial="{ opacity: 0, x: -24 }"
                        :visible-once="{ opacity: 1, x: 0, transition: { delay: index * 80, duration: 500 } }"
                    >
                        <div class="shrink-0">
                            <div class="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                                {{ step.step }}
                            </div>
                            <div v-if="index < enrollmentSteps.length - 1" class="w-0.5 h-12 bg-border mx-auto mt-2"></div>
                        </div>
                        <div class="flex-1 pb-8">
                            <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
                            <p class="text-muted-foreground whitespace-pre-line">{{ step.description }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator class="my-20" />

            <!-- FAQ Section -->
            <div
                v-motion
                :initial="{ opacity: 0, y: 32 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
            >
                <div class="mb-12">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-8 h-0.5 bg-secondary"></div>
                        <span class="text-secondary font-semibold text-xs uppercase tracking-[0.3em]">FAQ</span>
                    </div>
                    <h2 class="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
                </div>

                <div class="space-y-8">
                    <div>
                        <h3 class="text-xl font-bold text-foreground mb-2">What if I late enroll in SFXC?</h3>
                        <p class="text-muted-foreground mb-2">
                            Late enrollment begins on the first day of classes for returning students.
                            It includes a corresponding late enrollment fee. Enrollment officially closes
                            two (2) weeks after the start of classes (e.g., if classes begin on August 12,
                            enrollment ends on August 26).
                        </p>
                        <h4 class="font-semibold text-foreground mt-4 mb-1">New Students</h4>
                        <p class="text-muted-foreground">
                            New students who enroll a day after the official enrollment period may still be
                            accommodated without penalty, subject to approval.
                        </p>
                    </div>

                    <div>
                        <h3 class="text-xl font-bold text-foreground mb-2">
                            What if I am a former student who wants to be readmitted to SFXC?
                        </h3>
                        <p class="text-muted-foreground mb-2">
                            Returning students will be readmitted under the current curriculum. The following guidelines apply:
                        </p>
                        <ul class="list-disc list-inside text-muted-foreground pl-4 space-y-1">
                            <li>The student must follow the latest curriculum.</li>
                            <li>The Dean identifies equivalent courses from the old curriculum that may be credited.</li>
                            <li>The student must complete all required courses under the new curriculum.</li>
                            <li>The student must present Clearance and College Permanent Record (PCR) for evaluation.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-xl font-bold text-foreground mb-2">What if I am a Foreign Student?</h3>
                        <p class="text-muted-foreground mb-2">
                            Foreign students must comply with the same basic admission requirements as local students.
                            There are different categories of Foreign Students, as well as different admission requirements
                            for Foreign Students.
                        </p>
                        <h4 class="font-semibold text-foreground mt-4 mb-1">Categories of Foreign Student Applicants</h4>
                        <ul class="list-disc list-inside text-muted-foreground pl-4 space-y-1">
                            <li>New Student</li>
                            <li>Transferee/Transfer Student</li>
                            <li>9F Visa Holder (Non-immigrant Student Visa)</li>
                            <li>9A Visa Holder (Non-immigrant for pleasure, business, or health)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Separator class="mt-20" />
        </div>
    </div>
</template>
