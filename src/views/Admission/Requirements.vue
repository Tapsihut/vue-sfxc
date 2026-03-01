<script setup lang="ts">
import { ref } from 'vue'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { BookOpen, GraduationCap, ShieldCheck, MonitorCog, Calculator, Briefcase, Sparkles, Target, Users, ChevronRight, Facebook, ChevronDown } from 'lucide-vue-next'

interface Requirement {
  name: string
  description: string
}

interface Course {
  name: string
  description: string
}

interface Program {
  id: string
  title: string
  question: string
  collegeName: string
  image: string
  courses: Course[]
}

const selectedStudentType = ref<'freshmen' | 'transferee' | 'cross-enrollee' | 'international'>('freshmen')
const selectedProgram = ref<string>('abel')
const expandedCourses = ref<Record<string, boolean>>({})

const toggleCourse = (programId: string, courseIndex: number) => {
  const key = `${programId}-${courseIndex}`
  expandedCourses.value[key] = !expandedCourses.value[key]
}

const programs: Program[] = [
  {
    id: 'abel',
    title: 'ARTS AND SCIENCES',
    question: 'Interested in Language, Communication, and Creative Thinking?',
    collegeName: 'College of Arts and Sciences',
    image: 'https://placehold.co/600x400',
    courses: [
      {
        name: 'Bachelor of Arts in English Language (ABEL)',
        description: 'ABEL is ideal for students who love reading, writing, and expressing ideas. This program develops strong communication, critical thinking, and analytical skills. Graduates may pursue careers in education, writing, media, corporate communication, content creation, or further studies in law and graduate school. If you enjoy working with words and ideas, this course can open many doors.'
      }
    ]
  },
  {
    id: 'cte',
    title: 'TEACHER EDUCATION',
    question: 'Are you an Aspiring Teacher or Educator?',
    collegeName: 'College of Teacher Education',
    image: 'https://placehold.co/600x400',
    courses: [
      {
        name: 'Bachelor of Elementary Education (BEEd)',
        description: 'BEEd is designed for students who want to teach and inspire young learners. This program focuses on child development, teaching strategies, and classroom management. It is best suited for individuals who are patient, creative, and passionate about shaping children\'s foundational learning years.'
      },
      {
        name: 'Bachelor of Secondary Education (BSEd) – English',
        description: 'This program prepares students to teach English at the secondary level. It is ideal for those who enjoy literature, language, and communication and want to help students develop confidence in speaking, reading, and writing.'
      },
      {
        name: 'Bachelor of Secondary Education (BSEd) – Mathematics',
        description: 'BSEd Math is for students who enjoy numbers, logic, and problem-solving. The program trains future math educators to explain complex concepts clearly and effectively, preparing them for teaching careers in secondary schools.'
      }
    ]
  },
  {
    id: 'ccje',
    title: 'CRIMINAL JUSTICE EDUCATION',
    question: 'Do you value Public Service, Law, and Community Safety?',
    collegeName: 'College of Criminal Justice Education',
    image: 'https://placehold.co/600x400',
    courses: [
      {
        name: 'Bachelor of Science in Criminology',
        description: 'BS Criminology is suited for students interested in law enforcement, public safety, and the criminal justice system. The program provides foundational knowledge in crime prevention, investigation, and correctional administration. Graduates may pursue careers in law enforcement agencies, forensic services, or public safety institutions.'
      }
    ]
  },
  {
    id: 'ctom',
    title: 'TECHNOLOGY & OFFICE MANAGEMENT',
    question: 'Are you excited by Office Management, Technology, and Systems?',
    collegeName: 'College of Technology & Office Management',
    image: 'https://placehold.co/600x400',
    courses: [
      {
        name: 'Bachelor of Science in Office Administration',
        description: 'This program prepares students for professional administrative and office-based roles. It focuses on office procedures, records management, and organizational skills—ideal for students who are detail-oriented, organized, and comfortable working in professional environments.'
      },
      {
        name: 'Bachelor of Science in Information Technology',
        description: 'BS Information Technology is for students who are interested in computers, systems, and digital solutions. The program covers programming, networking, and information systems, preparing graduates for careers in the fast-growing tech industry.'
      }
    ]
  },
  {
    id: 'cbe-accounting',
    title: 'BUSINESS EDUCATION',
    question: 'Do Money Matters like Accounting, Finance, and Financial Analysis interest you?',
    collegeName: 'College of Business Education',
    image: 'https://placehold.co/600x400',
    courses: [
      {
        name: 'Bachelor of Science in Accountancy',
        description: 'This program is designed for students aiming to become Certified Public Accountants (CPAs). It requires discipline, analytical thinking, and strong numerical skills, and prepares graduates for professional accounting and auditing careers.'
      },
      {
        name: 'Bachelor of Science in Accounting Information System',
        description: 'This course combines accounting principles with information technology. It is ideal for students who want to work with computerized accounting systems and financial data management.'
      },
      {
        name: 'Bachelor of Science in Internal Auditing',
        description: 'BS Internal Auditing focuses on risk management, compliance, and internal control systems. It is suited for students who are analytical, detail-oriented, and committed to ethical standards.'
      },
      {
        name: 'Bachelor of Science in Management Accounting',
        description: 'This program emphasizes financial planning, budgeting, and decision-making. Graduates support management by providing financial insights that guide business strategies.'
      }
    ]
  },
  {
    id: 'cbe-business',
    title: 'BUSINESS EDUCATION',
    question: 'Do you have a penchant for Business, Leadership, and Entrepreneurship?',
    collegeName: 'College of Business Education',
    image: 'https://placehold.co/600x400',
    courses: [
      {
        name: 'Bachelor of Science in Entrepreneurship',
        description: 'BS Entrepreneurship is ideal for students who dream of starting and managing their own business. The program develops creativity, innovation, and business planning skills, preparing students for entrepreneurial ventures and enterprise management.'
      },
      {
        name: 'Bachelor of Science in Business Administration',
        description: 'This flexible program prepares students for various roles in the business world. Students may choose a specialization that fits their interests and career goals: Financial Management, Marketing Management, Operations Management, Human Resources Management, or Business Economics.'
      }
    ]
  }
]

const freshmenRequirements: Requirement[] = [
  { name: 'Form 138 (Report Card)', description: 'Original copy from senior high school' },
  { name: 'Certificate of Good Moral Character', description: 'From previous school' },
  { name: 'PSA Birth Certificate', description: 'Photocopy of the Philippine Statistics Authority (PSA) Birth Certificate' },
  { name: '2x2 ID Pictures', description: 'Four (4) pieces of 2x2 colored picture (white background)' },
  { name: 'Brown Envelopes', description: 'Four (4) long brown envelopes' },
  { name: 'Note', description: 'Form 137-A will be officially requested by the Office of the Registrar.' },
]

const transfereeRequirements: Requirement[] = [
  { name: 'Certificate of Transfer Credential', description: 'Transfer credentials certificate' },
  { name: 'Transcript of Records', description: 'Informative Copy of Transcript of Records for Evaluation' },
  { name: 'Certificate of Good Moral Character', description: 'From previous institution' },
  { name: 'PSA Birth Certificate', description: 'Photocopy of PSA Birth Certificate' },
  { name: '2x2 ID Pictures', description: 'Four (4) pieces of 2x2 colored picture' },
  { name: 'Mailing Envelopes', description: 'Four (4) mailing envelopes (long size)' },
  { name: 'Brown Envelopes', description: 'Four (4) brown envelopes (long size)' },
]

const crossEnrolleeRequirements: Requirement[] = [
  { name: 'Certificate to Cross-Enroll', description: 'Issued by home institution, signed by the Registrar, indicating total units and subjects to be taken.' },
]

const internationalRequirements: Requirement[] = [
  { name: 'Personal Appearance', description: 'Required for all foreign applicants' },
  { name: 'Letter of Intent', description: 'Formal letter expressing intent to study' },
  { name: 'Official Transcript of Records', description: 'Authenticated by the Philippine Embassy in the country of origin' },
  { name: 'Affidavit of Support', description: 'By parent/guardian (authenticated at the Philippine Embassy)' },
  { name: 'Passport', description: 'A photocopy of a passport valid for at least six (6) months' },
  { name: '2x2 ID Pictures', description: 'Two (2) pieces of 2x2 colored photos' },
  { name: 'Application Form', description: 'Duly accomplished Personal History Statement or Application Form' },
  { name: 'Certificate of Good Moral Character', description: 'Authenticated copy' },
  { name: 'Medical Health Certificate', description: 'With chest X-ray, HIV, and Hepatitis-B results' },
  { name: 'Quarantine Medical Examination', description: 'Results from examination' },
  { name: 'English Proficiency Test', description: 'Non-native English speakers must pass or attend a tutorial' },
  { name: 'NICA Clearance', description: 'National Intelligence Coordinating Agency clearance' },
]

const enrollmentSteps = [
  {
    step: 1,
    title: 'Student Information Profile',
    description: 'Visit the Admission & Scholarship Office for profiling. Submit required documents. Old students must update profiles. Undergo medical history interview at the Clinic. Sign routing form.'
  },
  {
    step: 2,
    title: 'Payment of Registration Fee',
    description: 'Proceed to Cashier. Option 1: ECPay Partner Outlets (7/11, Gaisano, etc.) - send receipt photo to Accounts and Finance FB. Option 2: Over-the-counter at Cashier. Sign routing form.'
  },
  {
    step: 3,
    title: 'Enlisting of Intended Subjects',
    description: 'Visit department office. Enlist subjects according to program. Secure evaluation and approval from Dean/Program Head. Sign routing form.'
  },
  {
    step: 4,
    title: 'Validation of Payment and Enrollment',
    description: 'Proceed to Assessment Office. Office will assess total enrolled units and validate enrollment registration. Sign routing form.'
  },
  {
    step: 5,
    title: 'Release of School ID',
    description: 'Visit OSAS. Fill out School ID form and submit 2x2 picture with clear background. Receive School ID. Sign routing form.'
  }
]

const currentRequirements = () => {
  if (selectedStudentType.value === 'international') return internationalRequirements
  if (selectedStudentType.value === 'cross-enrollee') return crossEnrolleeRequirements
  return selectedStudentType.value === 'freshmen' ? freshmenRequirements : transfereeRequirements
}
</script>

<template>
  <section id="hero" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-primary/5 bg-no-repeat"
    >
      <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>

      <!-- <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
          Admission Requirements
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-2xl">
          Complete guide to admission requirements and enrollment process
        </p>
      </div> -->

      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  </section>

  <div class="min-h-screen bg-background py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Admission Hub Info -->
      <div class="mb-16">
        <h1 class="text-3xl md:text-4xl font-bold text-foreground mb-6">Admission Hub</h1>
        <p class="text-lg text-muted-foreground mb-6">
          This Admission Hub section is your go-to place for all things related to enrolling at SFXC and becoming a Xavier Knight. Run by the Admission and Scholarship Office, this hub helps interested parents and students…
        </p>
        <ul class="list-disc list-inside text-lg text-muted-foreground mb-8 pl-6 space-y-2">
          <li><router-link to="/academics/programs" class="text-tertiary hover:underline font-medium">Decide on a course;</router-link></li>
          <li><router-link to="/admission/guide" class="text-tertiary hover:underline font-medium">Learn how to enroll;</router-link></li>
          <li><router-link to="/academics/scholarship" class="text-tertiary hover:underline font-medium">Discover financial aid opportunities (scholarships and grants);</router-link></li>
          <li><router-link to="/academics/enrollment" class="text-tertiary hover:underline font-medium">Enroll online;</router-link> and</li>
          <li><router-link to="/admission/tour" class="text-tertiary hover:underline font-medium">Schedule a campus tour</router-link></li>
        </ul>

        <h2 class="text-2xl font-bold text-foreground mb-4">What is the Admission and Scholarship Office (ADSO)?</h2>
        <p class="text-lg text-muted-foreground mb-4">
          The Admission and Scholarship Office (ADSO) is mandated to implement and oversee all policies related to student admission, enrollment, and scholarship administration. It ensures that enrollees are given importance. The office also manages institutional, government, and private scholarship grants, ensuring compliance with national regulations such as CHED-UniFAST guidelines.
        </p>
        <p class="text-lg text-muted-foreground mb-8">
          The ADSO maintains records, processes documentation, and coordinates with internal and external offices to guarantee accurate reporting and transparent fund utilization.
        </p>

        <h2 class="text-2xl font-bold text-foreground mb-4">ADSO Objectives</h2>
        <p class="text-lg text-muted-foreground mb-4">
          The Admission & Scholarship Office transactions are guided by the following objectives:
        </p>
        <ul class="list-disc list-inside text-lg text-muted-foreground pl-6 space-y-2">
          <li>To maintain an efficient, systematic, and transparent admission process.</li>
          <li>To promote accessibility to educational opportunities through scholarships and financial aid.</li>
          <li>To maintain accurate and confidential student and grantee records.</li>
          <li>To ensure compliance with institutional and national education policies.</li>
          <li>To strengthen linkages with external partners for expanded scholarship opportunities.</li>
          <li>To cultivate a culture of excellence, accountability, and service within the office and among student-grantees.</li>
        </ul>
      </div>

      <Separator class="my-16" />

      <!-- What Course Should I Choose Section -->
      <div class="mb-16">
        <div class="mb-12 text-center md:text-left">
          <h2 class="text-3xl md:text-4xl font-black mb-3 text-primary uppercase tracking-wide">What Course Should I Choose?</h2>
          <div class="h-1.5 w-24 bg-tertiary mb-6 mx-auto md:mx-0"></div>
          <p class="text-lg text-muted-foreground max-w-3xl">A Guide for Students Finding Their Path at St. Francis Xavier College</p>
        </div>

        <div class="space-y-6 text-lg text-muted-foreground mb-16">
          <p>
            Choosing a college course is an exciting milestone—but it can also feel overwhelming. With so many options available, many students find themselves asking the same question: “What course is right for me?”
          </p>
          <p>
            At St. Francis Xavier College, we understand that choosing a program is not just about trends or peer pressure. It’s about discovering where your interests, strengths, and future goals meet. This guide is designed to help you understand the programs offered at SFXC and identify which course aligns best with who you are and who you want to become.
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
            <p class="font-bold text-primary">Your answers to these questions matter. A course becomes meaningful when it fits you.</p>
          </div>
        </div>

        <!-- Program Selector -->
        <div class="mb-16">
          <div class="mb-8">
            <h3 class="text-xl md:text-2xl font-bold text-foreground mb-4 text-center">Select a College Program</h3>
            <div class="flex flex-wrap gap-2 md:gap-3 justify-center">
              <Button
                variant="ghost"
                @click="selectedProgram = 'abel'"
                :class="[
                  'px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300',
                  selectedProgram === 'abel' 
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90' 
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                ]"
              >
                Arts & Sciences
              </Button>
              <Button
                variant="ghost"
                @click="selectedProgram = 'cte'"
                :class="[
                  'px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300',
                  selectedProgram === 'cte' 
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90' 
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                ]"
              >
                Teacher Education
              </Button>
              <Button
                variant="ghost"
                @click="selectedProgram = 'ccje'"
                :class="[
                  'px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300',
                  selectedProgram === 'ccje' 
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90' 
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                ]"
              >
                Criminology
              </Button>
              <Button
                variant="ghost"
                @click="selectedProgram = 'ctom'"
                :class="[
                  'px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300',
                  selectedProgram === 'ctom' 
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90' 
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                ]"
              >
                Tech & Office
              </Button>
              <Button
                variant="ghost"
                @click="selectedProgram = 'cbe-accounting'"
                :class="[
                  'px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300',
                  selectedProgram === 'cbe-accounting' 
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90' 
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                ]"
              >
                Accounting
              </Button>
              <Button
                variant="ghost"
                @click="selectedProgram = 'cbe-business'"
                :class="[
                  'px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300',
                  selectedProgram === 'cbe-business' 
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90' 
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                ]"
              >
                Business
              </Button>
            </div>
          </div>

          <!-- Program Info -->
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
                <p class="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Courses Offered</p>
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
                        <h4 class="text-base font-semibold text-foreground leading-tight hover:text-tertiary transition-colors">{{ course.name }}</h4>
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

        <!-- Conclusion Box -->
        <div class="mt-24 mb-16 max-w-4xl mx-auto">
          <div class="text-center md:text-left">
            <h3 class="text-3xl md:text-4xl font-black mb-3 text-primary uppercase tracking-wide">Your Future Starts With The Right Choice</h3>
            <div class="h-1.5 w-24 bg-tertiary mb-8 mx-auto md:mx-0"></div>
          </div>
          
          <div class="space-y-6 text-lg text-muted-foreground mb-16">
            <p class="leading-relaxed">
              There is no single "best" course—only the course that best matches you. At St. Francis Xavier College, we are committed to guiding you not just toward a degree, but toward a purposeful future.
            </p>
          </div>
            
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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">      <!-- Requirements Section -->
      <div class="mb-20">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold mb-3 text-foreground">Document Requirements</h2>
          <p class="text-lg text-muted-foreground">
            Select your student type to view the specific requirements.
          </p>
        </div>

        <div class="overflow-hidden flex flex-col md:flex-row border border-border rounded-2xl shadow-sm">
          <!-- Left Side: Student Type Selection -->
          <div class="w-full md:w-1/3 lg:w-1/4 bg-muted/30 p-4 md:p-6 border-b md:border-b-0 md:border-r border-border flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible">
            <h3 class="text-lg font-semibold text-foreground mb-2 md:mb-4 px-2 hidden md:block">Student Type</h3>
            <Button
              variant="ghost"
              @click="selectedStudentType = 'freshmen'"
              :class="[
                'justify-center md:justify-start px-4 py-3 md:py-6 text-sm md:text-base font-medium rounded-xl transition-all duration-300 border-2 whitespace-nowrap',
                selectedStudentType === 'freshmen' 
                  ? 'bg-tertiary text-tertiary-foreground border-secondary shadow-md' 
                  : 'border-transparent hover:bg-tertiary/10 text-muted-foreground hover:text-foreground'
              ]"
            >
              Freshmen
            </Button>
            <Button
              variant="ghost"
              @click="selectedStudentType = 'transferee'"
              :class="[
                'justify-center md:justify-start px-4 py-3 md:py-6 text-sm md:text-base font-medium rounded-xl transition-all duration-300 border-2 whitespace-nowrap',
                selectedStudentType === 'transferee' 
                  ? 'bg-tertiary text-tertiary-foreground border-secondary shadow-md' 
                  : 'border-transparent hover:bg-tertiary/10 text-muted-foreground hover:text-foreground'
              ]"
            >
              Transferee
            </Button>
            <Button
              variant="ghost"
              @click="selectedStudentType = 'cross-enrollee'"
              :class="[
                'justify-center md:justify-start px-4 py-3 md:py-6 text-sm md:text-base font-medium rounded-xl transition-all duration-300 border-2 whitespace-nowrap',
                selectedStudentType === 'cross-enrollee' 
                  ? 'bg-tertiary text-tertiary-foreground border-secondary shadow-md' 
                  : 'border-transparent hover:bg-tertiary/10 text-muted-foreground hover:text-foreground'
              ]"
            >
              Cross-Enrollee
            </Button>
            <Button
              variant="ghost"
              @click="selectedStudentType = 'international'"
              :class="[
                'justify-center md:justify-start px-4 py-3 md:py-6 text-sm md:text-base font-medium rounded-xl transition-all duration-300 border-2 whitespace-nowrap',
                selectedStudentType === 'international' 
                  ? 'bg-tertiary text-tertiary-foreground border-secondary shadow-md' 
                  : 'border-transparent hover:bg-tertiary/10 text-muted-foreground hover:text-foreground'
              ]"
            >
              International
            </Button>
          </div>

          <!-- Right Side: Requirements List -->
          <div class="w-full md:w-2/3 lg:w-3/4 p-4 sm:p-6 md:p-8">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-foreground mb-2">
                {{ 
                  selectedStudentType === 'freshmen' ? 'Freshmen Requirements' :
                  selectedStudentType === 'transferee' ? 'Transferee Requirements' :
                  selectedStudentType === 'cross-enrollee' ? 'Cross-Enrollee Requirements' :
                  'International Requirements'
                }}
              </h3>
              <p class="text-muted-foreground">
                {{ 
                  selectedStudentType === 'freshmen' 
                    ? 'For new students applying to SFXC' 
                    : selectedStudentType === 'transferee'
                    ? 'For students transferring from other institutions'
                    : selectedStudentType === 'cross-enrollee'
                    ? 'For students from other schools who wish to cross-enroll at SFXC'
                    : 'For international students applying to SFXC'
                }}
              </p>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div
                v-for="(req, index) in currentRequirements()"
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

        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Separator class="my-20" />

      <!-- Enrollment Guide Section -->
      <div>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">How to Enroll at SFXC</h2>
          <p class="text-muted-foreground">The College implements a systematic enrollment process to ensure that all students are properly registered and credited for their academic work. The following steps will be followed for enrollment of new students, old students, and transferee students.</p>
        </div>

        <div class="space-y-8">
          <div
            v-for="(step, index) in enrollmentSteps"
            :key="step.step"
            class="flex gap-6"
          >
            <div class="shrink-0">
              <div class="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                {{ step.step }}
              </div>
              <div
                v-if="index < enrollmentSteps.length - 1"
                class="w-0.5 h-12 bg-border mx-auto mt-2"
              ></div>
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
      <div>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
        </div>

        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-bold text-foreground mb-2">What if I late enroll in SFXC?</h3>
            <p class="text-muted-foreground mb-2">
              Late enrollment begins on the first day of classes for returning students. It includes a corresponding late enrollment fee. Enrollment officially closes two (2) weeks after the start of classes (e.g., if classes begin on August 12, enrollment ends on August 26).
            </p>
            <h4 class="font-semibold text-foreground mt-4 mb-1">New Students</h4>
            <p class="text-muted-foreground">
              New students who enroll a day after the official enrollment period may still be accommodated without penalty, subject to approval.
            </p>
          </div>

          <div>
            <h3 class="text-xl font-bold text-foreground mb-2">What if I am a former student who wants to be readmitted to SFXC?</h3>
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
              Foreign students must comply with the same basic admission requirements as local students. There are different categories of Foreign Students, as well as different admission requirements for Foreign Students.
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

      <Separator class="my-20" />

    </div>
  </div>
</template>
