<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

interface ProgramSection {
  title: string
  contentBlocks: {
    type: 'paragraph' | 'list' | 'subtitle' | 'html'
    content?: string
    items?: string[]
  }[]
}

interface Major {
  name: string
  fullName: string
  description: string[]
  sections: ProgramSection[]
}

const programDetails: ProgramSection[] = [
  {
    title: 'WHAT ARE THE MAJOR ACHIEVEMENTS OF THE COLLEGE OF TEACHER EDUCATION?',
    contentBlocks: [
      { type: 'paragraph', content: 'With the College of Teacher Education’s consistent and recent history of national recognition, the Bachelor of Secondary Education offers quality education that students and parents can trust.' },
      { type: 'html', content: '<strong>March 2025:</strong> Top 6 Best Performing School Nationwide in Category A (100+ examinees) in the March 2025 Licensure Examination for Professional Teachers (LEPT), Elementary Level' },
      { type: 'html', content: '<strong>March 2024:</strong> Julcris Jabonero (BSEd 2023 Graduate), scored 91.20% in the March 2024 LEPT, Elementary Level, achieving Top 7 rank in the Philippines.' },
      { type: 'html', content: '<strong>Elementary Education Passing Rates</strong><br>SFXC First-timers: 91.95%<br>National Average: 46.77%' },
      { type: 'html', content: '<strong>Secondary Education Passing Rates</strong><br>SFXC First-timers: 92.50%<br>National Average: 62.27%' },
      { type: 'paragraph', content: 'September 2023 LEPT performance was marked with a 100% passing rate in the Elementary Level.' },
      { type: 'html', content: '<strong>October 2022:</strong> Roljane Manilag (BSEd 2021 Graduate), scored 94.20% in the October 2022 LEPT Elementary Level, securing Top 2 rank in the Philippines. At the same time, Albie Catoto, SFXC Unit Earner 2021 Graduate, secured the Top 8 rank in the Philippines with a score of 92.80%.' }
    ]
  },
  {
    title: 'CAN I PURSUE THE BACHELOR OF SECONDARY EDUCATION PROGRAM ONLINE AT ST. FRANCIS XAVIER COLLEGE?',
    contentBlocks: [
      { type: 'paragraph', content: 'SFXC\'s BSEd program is offered as a blended program, combining both face-to-face, in-person classes and online learning. This flexible approach ensures that students benefit from hands-on experiences, direct interaction with faculty, and collaborative activities with peers, all of which are essential for developing strong communication, critical thinking, and language skills.' }
    ]
  },
  {
    title: 'WHAT IS THE TYPICAL DURATION OF THE PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'The program usually takes about four years to complete if attending full-time. Part-time students may take longer, depending on their course load. Graduates can review and take the board exam (LEPT- Licensure examination for Professional Teachers) after finishing the program at SFXC.' }
    ]
  },
  {
    title: 'WHAT ARE THE PRE-REQUISITES FOR ADMISSION?',
    contentBlocks: [
      { type: 'paragraph', content: 'To be eligible for admission to the BSEd program, applicants must meet the following requirements:' },
      { type: 'list', items: [
        'High School Diploma or its equivalent',
        'Completed Application Form',
        'Submission of required documents such as Birth Certificate, and Transcript of Records (for transferees).'
      ]}
    ]
  },
  {
    title: 'HOW CAN I APPLY FOR THE BSED PROGRAM?',
    contentBlocks: [
      { type: 'html', content: 'To enroll, <router-link to="/admission/enrollment" class="text-primary hover:underline font-bold">click here</router-link> to learn more.' },
      { type: 'paragraph', content: 'Interested applicants are encouraged to submit their applications through the Admission and Scholarship Office. They can provide further information and assistance with the application process. Please ensure that all required documents are submitted before the deadline to be considered for admission.' },
      { type: 'paragraph', content: 'For further inquiries, kindly visit or contact offices any time between 8:00 AM to 5:00 PM, Monday to Friday.' },
      { type: 'html', content: '<div class="mt-4"><strong class="text-foreground">𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC Scholarship Office<br>Email: Admission.scholarship@sfxc.edu.ph</div>' },
      { type: 'html', content: '<div class="mt-2"><strong class="text-foreground">𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑\'𝐒 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC - Registrar\'s Office<br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>' }
    ]
  },
  {
    title: 'HOW CAN I CONTACT THE BSED PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'For inquiries regarding the Bachelor of Secondary Education program, please contact us at cte@sfxc.edu.ph.' }
    ]
  }
]

const majors: Major[] = [
  {
    name: 'Major in English',
    fullName: 'BACHELOR OF SECONDARY EDUCATION MAJOR IN ENGLISH',
    description: [
      'The Bachelor of Secondary Education Major in English (BSEd English) is a program designed to train future educators in teaching English at the secondary school level. It focuses on language proficiency, literary analysis, and effective teaching strategies, equipping graduates with the skills to inspire students, enhance their communication abilities, and foster a love for literature.',
      'Graduates are expected to possess a broad knowledge of language and literature, enabling them to deliver effective teaching and facilitate meaningful learning experiences. They are trained to use English as a glocal language within multilingual contexts, ensuring relevance and adaptability in diverse classrooms. The program emphasizes the importance of acquiring an extensive reading background in language, literature, and related fields, while also fostering proficiency in both oral and written communication, vital for their professional success.'
    ],
    sections: [
      {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Core subjects typically include:' },
          { type: 'list', items: [
            'English Grammar and Composition',
            'Literary Analysis and Criticism',
            'World and Philippine Literature',
            'Linguistics',
            'Creative Writing',
            'Teaching Methods in English',
            'Language and Communication',
            'Classroom Management',
            'Educational Psychology',
            'Assessment and Evaluation in Education',
            'Curriculum Development',
            'Reading and Writing Instruction'
          ]}
        ]
      },
      {
        title: 'WHAT ARE THE OPPORTUNITIES AFTER COMPLETING BSEd-ENGLISH?',
        contentBlocks: [
          { type: 'paragraph', content: 'BSEd English opens up roles and occupation opportunities, including:' },
          { type: 'list', items: [
            'High School English Teacher',
            'College or University Instructor',
            'Literature Specialist',
            'English Tutor',
            'Content Developer',
            'Educational Consultant',
            'Editor/Proofreader',
            'Writer/Journalist',
            'Language Program Coordinator',
            'Corporate Trainer'
          ]}
        ]
      },
      {
        title: 'WHAT SKILLS CAN I EXPECT TO DEVELOP IN THE SFXC BSEd-ENGLISH PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Key skills developed during the course include:' },
          { type: 'list', items: [
            'Effective Communication',
            'Critical Thinking',
            'Literary Analysis',
            'Classroom Management',
            'Curriculum Design',
            'Creative Writing',
            'Research and Analysis',
            'Teaching Methodology',
            'Problem-Solving'
          ]}
        ]
      },
      {
        title: 'CAN I PURSUE HIGHER STUDIES AFTER BSEd-ENGLISH?',
        contentBlocks: [
          { type: 'paragraph', content: 'Yes, there are several options for further studies after completing BSEd English, such as:' },
          { type: 'list', items: [
            'Master\'s in English or Literature',
            'Master\'s in Linguistics',
            'Master of Fine Arts (MFA) in Creative Writing',
            'Doctoral Studies (PhD)',
            'Master of Fine Arts (MFA)',
            'Master\'s in Journalism or Media Studies',
            'Master of Education (M.Ed.)',
            'Master\'s in TESOL (Teaching English to Speakers of Other Languages)',
            'Teaching English as a Foreign Language/Teaching English to Speakers of Other Languages'
          ]}
        ]
      },
      {
        title: 'IS BSEd ENGLISH SUITABLE FOR NON-NATIVE ENGLISH SPEAKERS?',
        contentBlocks: [
          { type: 'paragraph', content: 'The BSEd in English is a great option for non-native speakers aiming to improve their language skills and become effective educators. It enhances fluency in reading, writing, speaking, and listening, while teaching methods for instructing both native and non-native learners. With dedication, it can lead to rewarding careers in education, especially in ESL and diverse settings.' }
        ]
      },
      {
        title: 'WHAT IS THE DIFFERENCE BETWEEN A BSED MAJOR IN ENGLISH AND A BA IN ENGLISH LANGUAGE?',
        contentBlocks: [
          { type: 'paragraph', content: 'The main difference lies in the focus of study:' },
          { type: 'paragraph', content: 'Bachelor of Secondary Education Major in English is designed for students aiming to become secondary school teachers, with a curriculum that combines English language studies and pedagogy, preparing them to teach English at the secondary school level.' },
          { type: 'paragraph', content: 'Bachelor of Arts in English Language focuses on the study of English linguistics, grammar, and language use. It is designed for students interested in understanding and mastering the language in various contexts, such as communication, writing, and analysis.' }
        ]
      },
      {
        title: 'CAN I PURSUE A CAREER IN WRITING AFTER COMPLETING BSEd-ENGLISH?',
        contentBlocks: [
          { type: 'paragraph', content: 'Definitely. After completing a BSEd in English, you can pursue a career in writing. The program helps you develop strong writing, analytical, and communication skills, all of which are valuable in writing careers.' }
        ]
      },
      {
        title: 'DO I NEED A STRONG BACKGROUND IN ENGLISH TO PURSE THIS PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'A strong background in English is helpful, but not required. Most BSEd English programs cater to students with varying proficiency levels. What matters most is a genuine interest in the language and a desire to improve your skills in different contexts. If you\'re motivated to learn, this program is a great fit.' }
        ]
      },
      {
        title: 'HOW CAN I ENHANCE MY EMPLOYABILITY AFTER GRADUATION?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can enhance their employability by:' },
          { type: 'list', items: [
            'Gaining Practical Experience',
            'Earning Certifications',
            'Developing a Portfolio',
            'Staying Updated',
            'Improving Digital Literacy',
            'Seeking Mentorship'
          ]}
        ]
      },
      {
        title: 'CAN I PURSUE THE BSEd MAJOR IN ENGLISH ONLINE AT ST. FRANCIS XAVIER COLLEGE?',
        contentBlocks: [
          { type: 'paragraph', content: 'SFXC’s BSEd Major in English combines face-to-face, in-person classes and online learning. This flexible approach ensures that students benefit from hands-on experiences, direct interaction with faculty, and collaborative activities with peers.' }
        ]
      },
      {
        title: 'WHAT IS THE TYPICAL DURATION OF THE PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'The program usually takes about four years to complete if attending full-time. Part-time students may take longer, depending on their course load. Graduates can review and take the board exam (LEPT—Licensure Examination for Professional Teachers) after finishing the program at SFXC.' }
        ]
      },
      {
        title: 'WHAT ARE THE PRE-REQUISITES FOR ADMISSION?',
        contentBlocks: [
          { type: 'paragraph', content: 'To be eligible for admission to the BSEd major in English program, applicants must meet the following requirements:' },
          { type: 'list', items: [
            'High School Diploma or its equivalent',
            'Completed Application Form',
            'Submission of required documents such as Birth Certificate, and Transcript of Records (for transferees).'
          ]}
        ]
      },
      {
        title: 'HOW CAN I APPLY FOR THE BSED-MAJOR IN ENGLISH PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Interested applicants are encouraged to submit their applications using the contact details provided below or visit the Admission and Scholarship Office for further information and assistance with the application process. Please ensure that all required documents are submitted before the deadline to be considered for admission.' },
          { type: 'paragraph', content: 'For further inquiries, kindly visit or contact offices any time between 8:00 AM to 5:00 PM, Monday to Friday.' },
          { type: 'html', content: '<div class="mt-4"><strong class="text-foreground">𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: <a href="https://facebook.com/sfxc" target="_blank" class="text-primary hover:underline">SFXC Scholarship Office</a><br>Email: Admission.scholarship@sfxc.edu.ph</div>' },
          { type: 'html', content: '<div class="mt-2"><strong class="text-foreground">𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑\'𝐒 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: <a href="https://facebook.com/sfxcregistrar" target="_blank" class="text-primary hover:underline">SFXC - Registrar\'s Office</a><br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>' }
        ]
      }
    ]
  },
  {
    name: 'Major in Mathematics',
    fullName: 'BACHELOR OF SECONDARY EDUCATION MAJOR IN MATHEMATICS',
    description: [
      'The Bachelor of Secondary Education Major in Mathematics (BSEd-Math) prepares students to teach high school math. It does this by equipping aspiring educators with a strong foundation in mathematical concepts and structures essential for teaching at the secondary level. It blends advanced math courses with teaching training, including methods and hands-on experience, preparing graduates to teach math effectively.',
      'Graduates are expected to utilize effective teaching strategies and leverage appropriate technologies to deliver mathematical content. The program emphasizes fostering critical thinking, problem-solving, and analytical skills in learners while ensuring graduates are proficient in solving problems across various mathematical disciplines, including algebra, geometry, trigonometry, calculus, statistics, and modern mathematics. Additionally, the program promotes an appreciation for the practical applications of mathematics in real-world and interdisciplinary contexts, preparing educators to inspire and engage their students effectively.'
    ],
    sections: [
      {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Core subjects typically include:' },
          { type: 'list', items: [
            'Mathematical Logic',
            'Educational Psychology',
            'Teaching Methods for Mathematics',
            'Statistics & Probability',
            'Algebra',
            'Geometry',
            'Trigonometry',
            'Calculus',
            'Classroom Management'
          ]}
        ]
      },
      {
        title: 'WHAT ARE THE OPPORTUNITIES AFTER COMPLETING BSEd MAJOR IN MATHEMATICS?',
        contentBlocks: [
          { type: 'paragraph', content: 'BSEd Major in Mathematics opens up roles and occupation opportunities, including:' },
          { type: 'list', items: [
            'High School Mathematics Teacher',
            'Mathematics Tutor',
            'Curriculum Developer',
            'Academic Coordinator',
            'Data Analyst or Statistician',
            'Education Researcher',
            'Online Math Instructor',
            'Educational Administrator',
            'Education Consultant',
            'Operational research analyst'
          ]}
        ]
      },
      {
        title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Key skills developed during the course include:' },
          { type: 'list', items: [
            'Strong mathematical problem-solving abilities',
            'Effective teaching and communication techniques',
            'Classroom management',
            'Curriculum design and lesson planning',
            'Critical thinking and analytical skills',
            'Educational psychology knowledge',
            'Time management and organization',
            'Adaptability to diverse learning styles',
            'Effective Communication'
          ]}
        ]
      },
      {
        title: 'CAN I PURSUE HIGHER STUDIES AFTER BSEd-MATH?',
        contentBlocks: [
          { type: 'paragraph', content: 'Yes, there are several options for further studies after completing BSEd Major in Mathematics, such as:' },
          { type: 'list', items: [
            'Master of Arts in Education (MAEd) in Mathematics or Mathematics of Education in Mathematics',
            'Master of Science in Mathematics Education (MS Math Ed)',
            'Master of Arts in Teaching (MAT) in Mathematics',
            'Doctor of Philosophy (PhD) in Mathematics Education or EdD in Mathematics Education'
          ]}
        ]
      },
      {
        title: 'HOW CAN I ENHANCE MY EMPLOYABILITY AFTER GRADUATION?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can enhance their employability by:' },
          { type: 'list', items: [
            'Gaining Practical Experience',
            'Earning Certifications',
            'Developing a Portfolio',
            'Networking',
            'Staying Updated',
            'Improving your Digital Literacy',
            'Seeking Mentorship'
          ]}
        ]
      },
      {
        title: 'CAN I PURSUE THE BSEd MAJOR IN MATHEMATICS ONLINE AT ST. FRANCIS XAVIER COLLEGE?',
        contentBlocks: [
          { type: 'paragraph', content: 'SFXC’s BSEd Major in Mathematics combines face-to-face, in-person classes and online learning. This flexible approach ensures that students benefit from hands-on experiences, direct interaction with faculty, and collaborative activities with peers.' }
        ]
      },
      {
        title: 'WHAT IS THE TYPICAL DURATION OF THE PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'The program usually takes about four years to complete if attending full-time. Part-time students may take longer, depending on their course load. Graduates can review and take the board exam (LEPT—Licensure Examination for Professional Teachers) after finishing the program at SFXC.' }
        ]
      },
      {
        title: 'WHAT ARE THE PRE-REQUISITES FOR ADMISSION?',
        contentBlocks: [
          { type: 'paragraph', content: 'To be eligible for admission to the BSEd major in Mathematics program, applicants must meet the following requirements:' },
          { type: 'list', items: [
            'High School Diploma or its equivalent',
            'Completed Application Form',
            'Submission of required documents such as Birth Certificate, and Transcript of Records (for transferees).'
          ]}
        ]
      },
      {
        title: 'HOW CAN I APPLY FOR THE BSED-MAJOR IN MATHEMATICS PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Interested applicants are encouraged to submit their applications using the contact details provided below or visit the Admission and Scholarship Office for further information and assistance with the application process. Please ensure that all required documents are submitted before the deadline to be considered for admission.' },
          { type: 'paragraph', content: 'For further inquiries, kindly visit or contact offices any time between 8:00 AM to 5:00 PM, Monday to Friday.' },
          { type: 'html', content: '<div class="mt-4"><strong class="text-foreground">𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: <a href="https://facebook.com/sfxc" target="_blank" class="text-primary hover:underline">SFXC Scholarship Office</a><br>Email: Admission.scholarship@sfxc.edu.ph</div>' },
          { type: 'html', content: '<div class="mt-2"><strong class="text-foreground">𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑\'𝐒 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: <a href="https://facebook.com/sfxcregistrar" target="_blank" class="text-primary hover:underline">SFXC - Registrar\'s Office</a><br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>' }
        ]
      }
    ]
  }
]

const expanded = ref<Record<string, boolean>>({})

const toggle = (title: string, prefix = '') => {
  const key = prefix ? `${prefix}-${title}` : title
  expanded.value[key] = !expanded.value[key]
}

const scrollToMajor = (majorName: string) => {
  const id = majorName.toLowerCase().replace(/\s+/g, '-')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Dummy data for Program Updates
const programUpdates = [
  {
    id: 1,
    title: 'Pre-Service Teachers Pinning Ceremony 2026',
    date: 'March 15, 2026',
    excerpt: 'Join us as we celebrate the deployment of our 4th-year BSEd students to their respective cooperating schools for practice teaching.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'CTE Department',
    category: 'Event'
  },
  {
    id: 2,
    title: 'New Educational Technology Laboratory',
    date: 'February 28, 2026',
    excerpt: 'The CTE is proud to announce the opening of a new EdTech laboratory, providing pre-service teachers with hands-on experience using modern teaching tools.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'Academic Affairs',
    category: 'Facility'
  },
  {
    id: 3,
    title: 'Alumni Spotlight: 100% LET Passing Rate Achieved',
    date: 'January 20, 2026',
    excerpt: 'Read about how our recent batch of BSEd alumni achieved an outstanding 100% passing rate in the Licensure Examination for Teachers.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'Alumni Network',
    category: 'Feature'
  }
]
</script>

<template>
  <section id="home" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('https://placehold.co/1920x1080/000000/FFFFFF?text=1920x1080')] bg-cover bg-center bg-no-repeat"
    >
      <div
        class="absolute inset-0 bg-linear-to-t from-primary/90 via-background/20 to-transparent"
      ></div>

      <!-- <div class="relative z-10 mt-auto w-full md:max-w-5xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1
          class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md"
        >
          Bachelor of Secondary Education
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-2xl bg-black/40 p-4 rounded-md inline-block">
          <span class="block font-bold mb-1 text-white">College of Teachers Education</span>
          An undergraduate program that prepares future educators to teach various subjects in the secondary level, guiding learners toward character development and academic excellence.
        </p>
      </div> -->

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

  <div class="space-y-16 pb-12 px-4 pt-12 md:px-8 max-w-7xl mx-auto">
    
    <div class="grid lg:grid-cols-3 gap-10">
      
      <!-- Main Content (Left) -->
      <div class="lg:col-span-2 space-y-16">
        <h2 class="text-3xl font-bold text-foreground">Bachelor of Secondary Education</h2>

        <!-- Program Strategy / Overview content -->
        <div class="prose max-w-none text-muted-foreground space-y-6 text-justify">
          <p>
            The Bachelor of Secondary Education (BSEd) is an undergraduate teacher education program designed to equip learners with adequate and relevant competencies to teach in their chosen area of specialization/major in the secondary level.
          </p>
          <p>
            It aims to develop highly motivated and competent teachers specializing in the content and pedagogy for secondary education. After successful completion of all academic requirements, graduates of this program should be able to practice the teaching profession in the secondary level.
          </p>
          
          <div class="mt-8 bg-muted/40 border border-border p-6 rounded-md">
            <h3 class="text-base sm:text-lg font-bold text-foreground uppercase leading-snug">
              St. Francis Xavier College Offers Two Majors Under the Bachelor of Secondary Education Program:
            </h3>
            <ul class="list-disc pl-6 space-y-2 mt-6">
              <li v-for="major in majors" :key="major.name" class="text-primary">
                <button 
                  @click="scrollToMajor(major.name)"
                  class="text-lg hover:underline text-left outline-none focus:outline-none"
                >
                  {{ major.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Dropdowns Section -->
        <div class="space-y-6">
          <div class="border-b border-border pb-2">
            <h3 class="text-2xl font-bold text-primary">Program Details</h3>
          </div>
          
          <div class="space-y-3">
            <Card v-for="section in programDetails" :key="section.title" class="border border-border rounded-md overflow-hidden bg-card">
              <Button @click="toggle(section.title)" variant="ghost" class="w-full flex justify-start items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 rounded-none transition-colors text-left font-semibold text-card-foreground h-auto relative whitespace-normal">
                <span class="font-bold text-lg leading-none w-4 shrink-0 text-center text-primary">{{ expanded[section.title] ? '-' : '+' }}</span>
                <span class="text-left w-full">{{ section.title }}</span>
              </Button>
              
              <div v-show="expanded[section.title]" class="p-6 border-t border-border bg-card">
                <template v-for="(block, idx) in section.contentBlocks" :key="idx">
                  
                  <p v-if="block.type === 'paragraph'" class="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                    {{ block.content }}
                  </p>
                  
                  <h4 v-else-if="block.type === 'subtitle'" class="font-bold text-foreground text-md mt-6 mb-3">
                    {{ block.content }}
                  </h4>
                  
                  <ul v-else-if="block.type === 'list'" class="list-disc list-inside space-y-2 text-muted-foreground ml-2 mb-4 last:mb-0">
                    <li v-for="(item, i) in block.items" :key="i" class="leading-relaxed">{{ item }}</li>
                  </ul>
                  
                  <div v-else-if="block.type === 'html'" class="text-muted-foreground mb-4 last:mb-0" v-html="block.content"></div>
                  
                </template>
              </div>
            </Card>
          </div>
        </div>

        <!-- Dynamic Major Sections -->
        <div class="space-y-16">
          <div 
            v-for="major in majors" 
            :key="major.name" 
            :id="major.name.toLowerCase().replace(/\s+/g, '-')"
            class="scroll-mt-24 space-y-8 pt-8 border-t-2 border-border/50"
          >
            <div class="space-y-4">
              <h2 class="text-3xl font-black tracking-tight text-primary">{{ major.fullName }}</h2>
              <div class="prose max-w-none text-muted-foreground text-justify">
                <p v-for="(descPara, i) in major.description" :key="i" class="mb-4">{{ descPara }}</p>
              </div>
            </div>

            <div class="space-y-3">
              <Card v-for="section in major.sections" :key="section.title" class="border border-border rounded-md overflow-hidden bg-card">
                <Button @click="toggle(section.title, major.name)" variant="ghost" class="w-full flex justify-start items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 rounded-none transition-colors text-left font-semibold text-card-foreground h-auto relative whitespace-normal">
                  <span class="font-bold text-lg leading-none w-4 shrink-0 text-center text-primary">{{ expanded[`${major.name}-${section.title}`] ? '-' : '+' }}</span>
                  <span class="text-left w-full">{{ section.title }}</span>
                </Button>
                
                <div v-show="expanded[`${major.name}-${section.title}`]" class="p-6 border-t border-border bg-card">
                  <template v-for="(block, idx) in section.contentBlocks" :key="idx">
                    <p v-if="block.type === 'paragraph'" class="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                      {{ block.content }}
                    </p>
                    <h4 v-else-if="block.type === 'subtitle'" class="font-bold text-foreground text-md mt-6 mb-3">
                      {{ block.content }}
                    </h4>
                    <ul v-else-if="block.type === 'list'" class="list-disc list-inside space-y-2 text-muted-foreground ml-2 mb-4 last:mb-0">
                      <li v-for="(item, i) in block.items" :key="i" class="leading-relaxed">{{ item }}</li>
                    </ul>
                    <div v-else-if="block.type === 'html'" class="text-muted-foreground mb-4 last:mb-0" v-html="block.content"></div>
                  </template>
                </div>
              </Card>
            </div>
          </div>
        </div>

      </div>

      <!-- Sidebar (Right) -->
      <div class="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-max">
        <Card class="overflow-hidden shadow-lg bg-card border-border">
          <CardHeader class="pb-4">
            <div class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted">
              <img src="https://placehold.co/600x600/000000/FFFFFF?text=600x600" alt="Program Head" class="w-full h-full object-cover" />
            </div>
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">[Program Head Name]</CardTitle>
            <CardDescription class="text-sm font-medium">Program Head, BSEd</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator class="mb-6"/>

            <div class="space-y-4">
              <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
              
              <div class="space-y-3 text-sm text-card-foreground">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Email:</span>
                  <span>cte@sfxc.edu.ph</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Phone:</span>
                  <span>(085) 123-4567 loc 301</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Location:</span>
                  <span>CTE Building, 2nd Floor<br/>Saint Francis Xavier College</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Program Governor Card -->
        <Card class="overflow-hidden shadow-lg bg-card border-border">
          <CardHeader class="pb-4">
            <div class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted">
              <img src="https://placehold.co/600x600/000000/FFFFFF?text=600x600" alt="Program Governor" class="w-full h-full object-cover" />
            </div>
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">[Governor Name]</CardTitle>
            <CardDescription class="text-sm font-medium">Governor, BSEd</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator class="mb-6"/>

            <div class="space-y-4">
              <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
              
              <div class="space-y-3 text-sm text-card-foreground">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Email:</span>
                  <span>governor.cte@sfxc.edu.ph</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
    </div>

    <!-- Program Updates Section -->
    <div class="space-y-6">
      <div class="border-b border-border pb-2">
        <h3 class="text-2xl font-bold text-primary">Program Updates</h3>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          v-for="item in programUpdates" 
          :key="item.id" 
          class="overflow-hidden border-border rounded-xl hover:shadow-lg transition-shadow flex flex-col group bg-card p-0"
        >
          <div class="h-56 overflow-hidden">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <CardHeader class="pb-2">
            <div class="mb-2">
              <Badge variant="secondary" class="font-bold">
                {{ item.category }}
              </Badge>
            </div>
            <CardTitle class="text-xl font-bold line-clamp-2 transition-colors text-foreground">
              {{ item.title }}
            </CardTitle>
            <div class="flex items-center text-xs text-muted-foreground pt-1 space-x-4">
              <div class="flex items-center">
                <span>by: {{ item.author }}</span>
              </div>
              <div class="flex items-center">
                <span>{{ item.date }}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent class="flex-1">
            <CardDescription class="text-sm line-clamp-3">
              {{ item.excerpt }}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>