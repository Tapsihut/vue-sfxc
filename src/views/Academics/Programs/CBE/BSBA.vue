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
  description: string
  details: ProgramSection[]
}

const programDescription = "The Bachelor of Science in Business Administration (BSBA) program provides a holistic understanding of business principles by integrating the functional areas of management, marketing, finance, operations, and entrepreneurship. The program emphasizes critical thinking, strategic decision-making, and leadership skills, equipping graduates to navigate the complexities of modern business environments. By focusing on the synergy between business functions, the program prepares students to drive organizational success and sustainability in dynamic, global markets."

const programDetails: ProgramSection[] = [
  {
    title: 'CAN I PURSUE THIS DEGREE ONLINE AT SFXC?',
    contentBlocks: [
      { type: 'paragraph', content: 'At St. Francis Xavier College, the BS Business Administration is offered as a blended program, combining both face-to-face, in-person classes and online learning. This flexible approach ensures that students benefit from hands-on experiences, direct interaction with faculty, and collaborative activities with peers while also accommodating the convenience of online education for certain aspects of the curriculum.' }
    ]
  },
  {
    title: 'WHAT IS THE TYPICAL DURATION OF THIS PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'This program typically takes four years to complete for full-time students, while part-time students may need more time based on their course load.' }
    ]
  },
  {
    title: 'ARE INTERNSHIPS PART OF THIS PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'Definitely, internships are included to provide students with hands-on experience and exposure to real-world business environments.' }
    ]
  },
  {
    title: 'WHAT ARE THE PREREQUISITES FOR ADMISSION TO THIS PROGRAM?',
    contentBlocks: [
      { type: 'paragraph', content: 'To be eligible for admission to the BS Business Administration program, applicants must have the following requirements:' },
      { type: 'list', items: [
        'High school diploma or its equivalent',
        'Completed application form',
        'Submission of required documents such as birth certificate, and transcript of records (for transferees)'
      ]}
    ]
  },
  {
    title: 'HOW CAN I APPLY AND ENROLL IN THE BS BUSINESS ADMINISTRATION PROGRAM?',
    contentBlocks: [
      { type: 'html', content: 'To enroll, <router-link to="/admission/enrollment" class="text-primary hover:underline font-bold">click here</router-link> to learn more.' },
      { type: 'paragraph', content: 'Interested applicants are encouraged to submit their applications through the Admission and Scholarship Office. They can provide further information and assistance with the application process. Please ensure that all required documents are submitted before the deadline to be considered for admission.' },
      { type: 'paragraph', content: 'For further inquiries, kindly visit or contact offices any time between 8:00 AM to 5:00 PM, Monday to Friday.' },
      { type: 'html', content: '<div class="mt-4"><strong class="text-foreground">𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐀𝐍𝐃 𝐒𝐂𝐇𝐎𝐋𝐀𝐑𝐒𝐇𝐈𝐏 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC Scholarship Office<br>Email: Admission.scholarship@sfxc.edu.ph</div>' },
      { type: 'html', content: '<div class="mt-2"><strong class="text-foreground">𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐑\'𝐒 𝐎𝐅𝐅𝐈𝐂𝐄</strong><br>Facebook: SFXC - Registrar\'s Office<br>Email: registraroffice@sfxc.edu.ph<br>Mobile: 0908 885 3687</div>' }
    ]
  },
  {
    title: 'HOW DO I CONTACT THE BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION?',
    contentBlocks: [
      { type: 'paragraph', content: 'For inquiries regarding the Bachelor of Science in Business Administration program, please contact us at bsba@sfxc.edu.ph.' }
    ]
  }
]

const majors: Major[] = [
  {
    name: 'Major in Marketing Management',
    description: 'The Marketing Management program is designed to prepare students for dynamic careers in marketing, market research, advertising, and public relations. It offers a comprehensive curriculum that combines theoretical foundations with practical applications, focusing on consumer behavior, brand management, digital marketing, and strategic planning. Graduates are equipped with the technical expertise, creative mindset, and adaptability needed to thrive in a rapidly evolving marketplace and take on leadership roles in the marketing field.',
    details: [
      {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Core subjects typically include:' },
          { type: 'list', items: [
            'Marketing Principles',
            'Consumer Behavior',
            'Advertising and Sales Promotion',
            'Market Research',
            'Digital Marketing',
            'Business Ethics',
            'Financial Management',
            'Strategic Marketing'
          ]}
        ]
      },
      {
        title: 'WHAT ARE THE POSSIBLE OCCUPATIONS AND INDUSTRIES FOR SOMEONE WITH THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'BSBA-Marketing Management opens up roles and occupation opportunities, including:' },
          { type: 'list', items: [
            'Marketing Specialist',
            'Sales Executive/Manager',
            'Brand Manager',
            'Digital Marketing Specialist',
            'Market Research Analyst',
            'Public Relations Specialist',
            'Advertising Manager',
            'Product Manager',
            'Retail Manager',
            'Corporate Communications Manager'
          ]}
        ]
      },
      {
        title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Key skills developed during the course include:' },
          { type: 'list', items: [
            'Market Research and Analysis',
            'Brand Management',
            'Digital Marketing Proficiency',
            'Advertising and Promotions',
            'Consumer Behavior Analysis',
            'Strategic Planning',
            'Sales and Negotiation Skills'
          ]}
        ]
      },
      {
        title: 'WHAT INDUSTRIES WILL MOST LIKELY HIRE BSBA MAJOR IN MARKETING MANAGEMENT GRADUATES?',
        contentBlocks: [
          { type: 'paragraph', content: 'BSBA-MM graduates are needed in various industries, including:' },
          { type: 'list', items: [
            'Advertising',
            'Retail',
            'E-commerce',
            'Real Estate',
            'Banking',
            'Technology Sectors'
          ]}
        ]
      },
      {
        title: 'HOW CAN I ENHANCE MY EMPLOYABILITY AFTER GRADUATION?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can enhance their employability by:' },
          { type: 'list', items: [
            'Acquiring hands-on experience through internships or part-time work',
            'Earning certifications relevant to your field',
            'Expanding your professional network',
            'Cultivating high-demand skills',
            'Exploring opportunities for international exposure.',
            'Strengthening your resume and online profile.',
            'Considering advanced education or specialized training.',
            'Keeping up with the latest industry developments.'
          ]}
        ]
      },
      {
        title: 'WHAT FURTHER EDUCATION OPTIONS ARE AVAILABLE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates of the Bachelor of Science in Business Administration Major in Marketing Management have several further education options, including:' },
          { type: 'list', items: [
            'Master of Business Administration (MBA)',
            "Master's in Marketing",
            'Certifications in specialized marketing fields like digital marketing or data analytics.'
          ]}
        ]
      }
    ]
  },
  {
    name: 'Major in Financial Management',
    description: 'The Bachelor of Science, Major in Financial Management program provides students with a robust foundation in financial theories, principles, and practices, preparing them for careers in financial planning, investment management, banking, and corporate finance. The program emphasizes the development of analytical and problem-solving skills, empowering graduates to assess financial risks, make informed decisions, and create value in various organizational settings. With a strong focus on financial innovation and global trends, the program ensures graduates are competitive and future-ready in the field of financial management.',
    details: [
      {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Core subjects typically include:' },
          { type: 'list', items: [
            'Financial Accounting',
            'Managerial Finance',
            'Investment Analysis',
            'Corporate Finance',
            'Financial Markets',
            'Business Law'
          ]}
        ]
      },
      {
        title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Students will develop skills such as:' },
          { type: 'list', items: [
            'Financial Analysis',
            'Decision-making',
            'Budgeting',
            'Investment Strategies',
            'Understanding of Financial Systems'
          ]}
        ]
      },
      {
        title: 'WHAT ARE THE POSSIBLE OCCUPATIONS AND INDUSTRIES FOR SOMEONE WITH THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can pursue roles and occupations including:' },
          { type: 'list', items: [
            'Financial Analysts',
            'Investment Bankers',
            'Credit Managers',
            'Financial Planners'
          ]}
        ]
      },
      {
        title: 'WHAT INDUSTRIES WILL MOST LIKELY HIRE BSBA MAJOR IN FINANCIAL MANAGEMENT GRADUATES?',
        contentBlocks: [
          { type: 'paragraph', content: 'BSBA Major in Financial Management graduates are needed in various industries, including:' },
          { type: 'list', items: [
            'Banking',
            'Insurance',
            'Investment Firms',
            'Accounting Firms',
            'Corporate Finance Departments',
            'Government Agencies'
          ]}
        ]
      },
      {
        title: 'WHAT FURTHER EDUCATION OPTIONS ARE AVAILABLE?',
        contentBlocks: [
          { type: 'paragraph', content: 'To further a career in BSBA Major in Financial Management, graduates may pursue a Master\'s in Business Administration (MBA), certifications in finance, or specialized finance degrees to advance their careers.' }
        ]
      },
      {
        title: 'ARE INTERNSHIPS PART OF THE PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Absolutely! The BSBA Major in Financial Management program includes an internship component where students gain hands-on experience in real-world settings. Internships typically take place in the final year of the program and provide students with valuable exposure to the industry, helping them apply theoretical knowledge to practical challenges.' }
        ]
      },
      {
        title: 'HOW CAN I ENHANCE MY EMPLOYABILITY AFTER GRADUATION?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can enhance their employability by:' },
          { type: 'list', items: [
            'Gaining practical experience through internships or part-time jobs',
            'Obtaining relevant certifications',
            'Networking with professionals in the industry',
            'Participating in tech-related clubs or organizations'
          ]}
        ]
      }
    ]
  },
  {
    name: 'Major in Operations Management',
    description: 'The BSBA major in Operations Management is a dynamic degree program that focuses on the efficient management of business processes, resources, and supply chains. It equips students with essential knowledge in production planning, logistics, quality management, and strategic decision-making to optimize organizational performance. Through a combination of theoretical insights and practical applications, students develop problem-solving skills and analytical thinking necessary for enhancing productivity and operational efficiency. Graduates of this program are prepared to take on leadership roles in various industries, driving business success through innovation and effective resource management.',
    details: [
      {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Core subjects typically include:' },
          { type: 'list', items: [
            'Operations Management and TQM',
            'Management Information System',
            'Logistic and Strategic Management',
            'Marketing Management',
            'International Business and Trade',
            'Facilities Management',
            'Entrepreneurial Management',
            'Productivity and Quality Tools'
          ]}
        ]
      },
      {
        title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Students will develop skills such as:' },
          { type: 'list', items: [
            'Problem-solving and decision-making',
            'Process optimization',
            'Project management',
            'Leadership and teamwork',
            'Communication and presentation',
            'Data analysis and forecasting'
          ]}
        ]
      },
      {
        title: 'WHAT ARE THE POSSIBLE OCCUPATIONS AND INDUSTRIES FOR SOMEONE WITH THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can pursue roles and occupation including:' },
          { type: 'list', items: [
            'Operations Analyst/Manager',
            'Production Planner/Scheduler',
            'Logistics Coordinator',
            'Quality Assurance Specialist',
            'Customer Service Supervisor',
            'Project Manager'
          ]}
        ]
      },
      {
        title: 'WHICH INDUSTRIES ARE LIKELY TO HIRE BSBA MAJOR IN OPERATIONS MANAGEMENT GRADUATES?',
        contentBlocks: [
          { type: 'paragraph', content: 'BSBA OpMan graduates are needed in various industries, including:' },
          { type: 'list', items: [
            'Manufacturing and Production',
            'Logistics and Supply Chain',
            'Retail and E-commerce',
            'Hospitality and Tourism',
            'Healthcare Operations',
            'Financial Services',
            'Technology and IT Services',
            'Consulting Firms',
            'Government and Public Sector',
            'Education and Training'
          ]}
        ]
      },
      {
        title: 'HOW CAN I ENHANCE MY EMPLOYABILITY AFTER GRADUATION?',
        contentBlocks: [
          { type: 'list', items: [
            'Acquire hands-on experience through internships or part-time work.',
            'Earn certifications relevant to your field.',
            'Expand your professional network.',
            'Cultivate high-demand skills.',
            'Explore opportunities for international exposure.',
            'Strengthen your resume and online profile.',
            'Consider advanced education or specialized training.',
            'Keep up with the latest industry developments.'
          ]}
        ]
      },
      {
        title: 'WHAT FURTHER EDUCATION OPTIONS ARE AVAILABLE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates of the Bachelor of Science in Business Administration Major in Operations Management have several further education options, including:' },
          { type: 'list', items: [
            'Master of Business Administration (MBA)',
            'Master’s in Supply Chain Management',
            'Master’s in Information Technology (IT)',
            'Master’s in Industrial Engineering',
            'Certifications in Project Management'
          ]}
        ]
      }
    ]
  },
  {
    name: 'Major in Business Economics',
    description: 'BSBA - Business Economics is a comprehensive program that equips students with the knowledge and analytical skills needed to understand economic principles and their impact on business decision-making. It combines business management with economic theory. This program covers key areas such as microeconomics, macroeconomics, market analysis, financial economics, and economic policy. Through data-driven approaches and strategic thinking, students learn to assess economic trends, optimize business performance, and contribute to sustainable economic growth. Graduates of this program are well-prepared for careers in economic research, financial planning, business consulting, and policy analysis, playing a crucial role in shaping business strategies in a competitive global market.',
    details: [
      {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED BY THIS PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Core subjects typically include:' },
          { type: 'list', items: [
            'The Entrepreneurial Mind',
            'Basic Macroeconomics',
            'Advance Macroeconomics',
            'Advance Microeconomics',
            'Mathematics for Business and Economics',
            'Economic Statistics',
            'Monetary and Fiscal Economics',
            'Labor Economics',
            'Economic Development'
          ]}
        ]
      },
      {
        title: 'WHAT SKILLS WILL I GAIN WITH THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Students will develop skills such as:' },
          { type: 'list', items: [
            'Analytical Skills',
            'Critical Thinking',
            'Decision-Making',
            'Data Analysis',
            'Communication Skills',
            'Strategic Planning'
          ]}
        ]
      },
      {
        title: 'WHAT ARE POSSIBLE OCCUPATIONS FOR SOMEONE WITH THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can pursue roles and occupation including:' },
          { type: 'list', items: [
            'Business Analyst',
            'Market Research Analyst',
            'Financial Analyst',
            'Economic Consultant',
            'Management Trainee',
            'Entrepreneur',
            'Policy Analyst'
          ]}
        ]
      },
      {
        title: 'WHAT ARE IDEAL INDUSTRIES FOR BSBA - BUSINESS ECONOMICS GRADUATES?',
        contentBlocks: [
          { type: 'paragraph', content: 'BSBA Bus. Econ. graduates are needed in various industries, including:' },
          { type: 'list', items: [
            'Banking and Finance',
            'Consulting',
            'Government and Public Sector',
            'Education and Research',
            'Corporate Management',
            'Trade and International Business',
            'Manufacturing and Supply Chain'
          ]}
        ]
      },
      {
        title: 'AFTER GRADUATION, HOW CAN I ENHANCE MY EMPLOYABILITY WITH THIS COURSE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can enhance their employability by:' },
          { type: 'list', items: [
            'Acquire hands-on experience through internships or part-time work.',
            'Earn certifications relevant to your field.',
            'Expand your professional network.',
            'Cultivate high-demand skills.',
            'Explore opportunities for international exposure.',
            'Strengthen your resume and online profile.',
            'Consider advanced education or specialized training.',
            'Keep up with the latest industry developments.'
          ]}
        ]
      },
      {
        title: 'WHAT ARE THE AVAILABLE OPTIONS FOR CONTINUING EDUCATION?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can pursue a Master’s degree in Business Administration (MBA), Economics, or related fields, as well as specialized certifications.' }
        ]
      }
    ]
  },
  {
    name: 'Major in Human Resource Management',
    description: 'The BSBA major in Human Resource Management is a specialized program that prepares students for the dynamic field of people management and organizational development. It provides a strong foundation in talent acquisition, employee relations, compensation and benefits, training and development, and labor laws. Through a blend of theoretical knowledge and practical applications, students gain the skills needed to foster a productive workplace culture and drive organizational success. Graduates of this program are equipped to take on key roles in human resource departments, ensuring that businesses attract, develop, and retain top talent in a competitive global market.',
    details: [
      {
        title: 'WHAT ARE THE CORE SUBJECTS COVERED IN THIS PROGRAM?',
        contentBlocks: [
          { type: 'paragraph', content: 'Core subjects typically include:' },
          { type: 'list', items: [
            'Human Resource Management',
            'Organizational Behavior',
            'Labor and Employment Law',
            'Recruitment and Selection',
            'Compensation and Benefits',
            'Performance Management',
            'Training and Development',
            'Strategic HRM',
            'Industrial Relations'
          ]}
        ]
      },
      {
        title: 'WHAT SKILLS WILL I GAIN FROM THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Students will develop skills such as:' },
          { type: 'list', items: [
            'Leadership and Management',
            'Communication',
            'Problem-Solving',
            'Decision-Making',
            'Knowledge of HR Laws and Ethics',
            'Strategic Thinking',
            'Negotiation and Conflict Resolution',
            'Data Analysis'
          ]}
        ]
      },
      {
        title: 'WHAT ARE THE POSSIBLE OCCUPATIONS AND INDUSTRIES FOR SOMEONE WITH THIS DEGREE?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can pursue roles and occupation including:' },
          { type: 'list', items: [
            'Human Resources Manager',
            'Recruitment Specialist',
            'Compensation and Benefits Manager',
            'Training and Development Specialist',
            'Employee Relations Manager',
            'HR Consultant',
            'Payroll Manager',
            'Organizational Development Specialist',
            'Talent Acquisition Specialist',
            'Labor Relations Specialist'
          ]}
        ]
      },
      {
        title: 'WHAT INDUSTRIES ARE LIKELY TO HIRE BSBA MAJOR IN HUMAN RESOURCES MANAGEMENT GRADUATES?',
        contentBlocks: [
          { type: 'paragraph', content: 'BSBA Human Resources Management graduates are needed in various industries, including:' },
          { type: 'list', items: [
            'Corporate Business',
            'Healthcare',
            'Retail',
            'Education',
            'Hospitality',
            'Government and Public Sector',
            'Finance and Banking',
            'Technology',
            'Manufacturing',
            'Nonprofit Organizations'
          ]}
        ]
      },
      {
        title: 'HOW CAN I ENHANCE MY EMPLOYABILITY AFTER GRADUATION?',
        contentBlocks: [
          { type: 'paragraph', content: 'Graduates can enhance their employability by:' },
          { type: 'list', items: [
            'Internships and Work Experience',
            'Certifications',
            'Networking',
            'Soft Skills Development',
            'Stay Informed',
            'Build a Professional Online Presence',
            'Seek Mentorship',
            'Develop Technical Skills'
          ]}
        ]
      },
      {
        title: 'WHAT FURTHER EDUCATION OPTIONS ARE AVAILABLE?',
        contentBlocks: [
          { type: 'paragraph', content: 'To further a career in BSBA major in HRM, graduates may pursue:' },
          { type: 'list', items: [
            'Master’s in Human Resources Management (MHRM)',
            'MBA with HR focus',
            'Master’s in Industrial-Organizational Psychology',
            'Master’s in Labor Relations or Employment Law',
            'HR Certifications',
            'Doctoral Programs',
            'Certifications in Related Fields'
          ]}
        ]
      }
    ]
  }
]

const expanded = ref<Record<string, boolean>>({})
const expandedMajors = ref<Record<string, Record<string, boolean>>>({})

const toggle = (title: string) => {
  expanded.value[title] = !expanded.value[title]
}

const toggleMajor = (majorName: string, title: string) => {
  if (!expandedMajors.value[majorName]) {
    expandedMajors.value[majorName] = {}
  }
  expandedMajors.value[majorName][title] = !expandedMajors.value[majorName][title]
}

const scrollToMajor = (name: string) => {
  const id = name.toLowerCase().replace(/\s+/g, '-')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Dummy data for Program Updates styled like NewsAndUpdates
const programUpdates = [
  {
    id: 1,
    title: 'Business Administration Week 2026',
    date: 'March 15, 2026',
    excerpt: 'Join us as we celebrate the Business Administration Week with seminars, skills competitions, and a keynote speech from industry experts.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'CBE Department',
    category: 'Event'
  },
  {
    id: 2,
    title: 'New Virtual Assistant Certification Integration',
    date: 'February 28, 2026',
    excerpt: 'The BSBA program is proud to announce a new partnership that integrates specialized Virtual Assistant certification within our curriculum.',
    image: 'https://placehold.co/800x600/000000/FFFFFF?text=800x600',
    author: 'Academic Affairs',
    category: 'Curriculum'
  },
  {
    id: 3,
    title: 'Alumni Spotlight: Managing Multinational Operations',
    date: 'January 20, 2026',
    excerpt: 'Read about how our BSBA alumni are leading operational and administrative functions across global corporate offices.',
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

        <!-- Intro Description -->
        <div class="space-y-4">
          <h2 class="text-3xl font-bold text-foreground">Bachelor of Science in Business Administration</h2>
          <p class="text-muted-foreground leading-relaxed text-lg">{{ programDescription }}</p>

          <div class="mt-8 space-y-4 bg-muted/30 p-6 rounded-lg border border-border">
            <h3 class="font-bold text-foreground text-lg uppercase">St. Francis Xavier College offers five majors under the BS Business Administration program:</h3>
            <ul class="flex flex-col space-y-2">
              <li v-for="major in majors" :key="major.name">
                <button 
                  @click="scrollToMajor(major.name)" 
                  class="text-primary hover:underline flex items-center gap-2 font-medium text-left transition-colors"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
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

        <!-- Majors Section -->
        <div v-for="major in majors" :key="major.name" :id="major.name.toLowerCase().replace(/\s+/g, '-')" class="space-y-6 scroll-mt-28">
          <div class="border-b border-border pb-2">
            <h3 class="text-2xl font-bold text-primary">{{ major.name }}</h3>
          </div>
          <p class="text-muted-foreground leading-relaxed text-lg">{{ major.description }}</p>
          <div class="space-y-3">
            <Card v-for="section in major.details" :key="section.title" class="border border-border rounded-md overflow-hidden bg-card">
              <Button @click="toggleMajor(major.name, section.title)" variant="ghost" class="w-full flex justify-start items-center gap-3 p-4 bg-muted/20 hover:bg-muted/50 rounded-none transition-colors text-left font-semibold text-card-foreground h-auto relative whitespace-normal">
                <span class="font-bold text-lg leading-none w-4 shrink-0 text-center text-primary">{{ expandedMajors[major.name]?.[section.title] ? '-' : '+' }}</span>
                <span class="text-left w-full">{{ section.title }}</span>
              </Button>
              
              <div v-show="expandedMajors[major.name]?.[section.title]" class="p-6 border-t border-border bg-card">
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

      <!-- Sidebar (Right) -->
      <div class="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-max">
        <Card class="overflow-hidden shadow-lg bg-card border-border">
          <CardHeader class="pb-4">
            <div class="aspect-square w-full overflow-hidden rounded-md mb-4 bg-muted">
              <img src="https://placehold.co/600x600/000000/FFFFFF?text=600x600" alt="Program Head" class="w-full h-full object-cover" />
            </div>
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">Jerome Seraspe</CardTitle>
            <CardDescription class="text-sm font-medium">Program Head, BSBA</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator class="mb-6"/>

            <div class="space-y-4">
              <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
              
              <div class="space-y-3 text-sm text-card-foreground">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Email:</span>
                  <span>bsba@sfxc.edu.ph</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Phone:</span>
                  <span>(085) 123-4567 loc 101</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Location:</span>
                  <span>CBE Building, 2nd Floor<br/>Saint Francis Xavier College</span>
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
            
            <CardTitle class="text-xl font-bold uppercase tracking-wide text-primary">Elaija Grace V. Galinada</CardTitle>
            <CardDescription class="text-sm font-medium">Governor, BSBA</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator class="mb-6"/>

            <div class="space-y-4">
              <h4 class="font-semibold text-lg text-foreground">Contact Information</h4>
              
              <div class="space-y-3 text-sm text-card-foreground">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 font-medium text-muted-foreground">Email:</span>
                  <span>galinada.elaijagrace@sfxc.edu.ph</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
    </div>

    <!-- Program Updates Section (Design referenced from NewsAndUpdates) -->
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
