<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface ScholarshipType {
  id: string
  name: string
  description: string
  coverage: string
  requirements: string[]
  slots: number
  eligibility: string[]
}

interface ScholarshipForm {
  scholarshipType: string
  lastName: string
  firstName: string
  middleName: string
  ext: string
  email: string
  contactNumber: string
  dateOfBirth: string
  sex: string
  address: string
  programApplied: string
  yearLevel: string
  previousSchool: string
  gpa: string
  familyIncome: string
  householdMembers: string
  documentProof: string
  essay: string
  agreement: boolean
}

const scholarshipTypes: ScholarshipType[] = [
  {
    id: 'academic',
    name: 'Academic Excellence Scholarship',
    description: 'For students with outstanding academic performance',
    coverage: '50% - 100% tuition fee discount',
    requirements: [
      'High school diploma with honors',
      'Minimum GPA of 90%',
      'Certificate of Good Moral Character',
      'Letter of recommendation from previous school'
    ],
    eligibility: [
      'Must maintain a GPA of 90% or higher each semester',
      'Full-time enrollment required',
      'No failing grades'
    ],
    slots: 20
  },
  {
    id: 'sports',
    name: 'Sports Scholarship',
    description: 'For students who excel in sports and athletics',
    coverage: '25% - 75% tuition fee discount',
    requirements: [
      'Certificate of athletic achievement',
      'Medical certificate',
      'Endorsement from sports coach',
      'Minimum GPA of 85%'
    ],
    eligibility: [
      'Active participation in school sports programs',
      'Must represent the school in competitions',
      'Maintain good academic standing'
    ],
    slots: 15
  },
  {
    id: 'financial',
    name: 'Financial Assistance Grant',
    description: 'For students from low-income families',
    coverage: '30% - 80% tuition fee discount',
    requirements: [
      'Certificate of Income from Barangay',
      'Proof of family financial status',
      'ITR or Certificate of Non-filing',
      'Two valid IDs of parent/guardian'
    ],
    eligibility: [
      'Family income below PHP 30,000 per month',
      'Must maintain satisfactory academic performance',
      'Philippine citizen or permanent resident'
    ],
    slots: 30
  },
  {
    id: 'sibling',
    name: 'Sibling Discount',
    description: 'For families with multiple children enrolled',
    coverage: '15% - 25% tuition fee discount',
    requirements: [
      'Birth certificates of siblings',
      'Valid enrollment proof of siblings',
      'Parent/Guardian valid ID'
    ],
    eligibility: [
      'At least two siblings enrolled simultaneously',
      'Applies to all enrolled siblings',
      'Valid for each semester of concurrent enrollment'
    ],
    slots: 50
  },
  {
    id: 'leadership',
    name: 'Leadership Scholarship',
    description: 'For students with proven leadership skills',
    coverage: '40% - 60% tuition fee discount',
    requirements: [
      'Certificate of leadership positions held',
      'Letter of recommendation',
      'Portfolio of leadership activities',
      'Minimum GPA of 88%'
    ],
    eligibility: [
      'Previous leadership experience required',
      'Must participate in student organizations',
      'Good moral character certification'
    ],
    slots: 10
  },
  {
    id: 'honors',
    name: 'High Honors Scholarship',
    description: 'For valedictorians and salutatorians',
    coverage: '100% tuition fee waiver',
    requirements: [
      'Certificate of valedictorian or salutatorian status',
      'Form 138 (Report Card)',
      'Certificate of Good Moral Character',
      'Two letters of recommendation'
    ],
    eligibility: [
      'Must be valedictorian or salutatorian',
      'From recognized high school',
      'Must maintain 92% GPA each semester'
    ],
    slots: 5
  }
]

const programs = [
  'BS Criminology',
  'BS Accountancy',
  'BS Accounting Information System',
  'BS Management Accounting',
  'BS Internal Auditing',
  'BS Business Administration – Financial Management',
  'BS Business Administration – Marketing Management',
  'BS Business Administration – Operation Management',
  'BS Business Administration – Human Resource Management',
  'BS Business Administration – Economics',
  'BS Entrepreneurship',
  'BS Information Technology',
  'BS Office Administration',
  'Bachelor of Elementary Education',
  'Bachelor of Secondary Education – English',
  'Bachelor of Secondary Education – Math',
  'Bachelor of Arts in English Language',
  'TVET/TESDA – Driving NC II',
  'TVET/TESDA – CSS NC II',
  'TVET/TESDA – Bookkeeping NC III'
]

const formData = ref<ScholarshipForm>({
  scholarshipType: '',
  lastName: '',
  firstName: '',
  middleName: '',
  ext: '',
  email: '',
  contactNumber: '',
  dateOfBirth: '',
  sex: '',
  address: '',
  programApplied: '',
  yearLevel: '',
  previousSchool: '',
  gpa: '',
  familyIncome: '',
  householdMembers: '',
  documentProof: '',
  essay: '',
  agreement: false
})

const selectedScholarship = ref<ScholarshipType | null>(null)
const showForm = ref(false)

const handleScholarshipSelect = (scholarshipId: string) => {
  formData.value.scholarshipType = scholarshipId
  selectedScholarship.value = scholarshipTypes.find(s => s.id === scholarshipId) || null
  showForm.value = true
  
  setTimeout(() => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    formData.value.documentProof = target.files[0]?.name || ''
  }
}

const handleSubmit = () => {
  if (!formData.value.agreement) {
    alert('Please agree to the terms and conditions')
    return
  }
  if (!formData.value.scholarshipType) {
    alert('Please select a scholarship type')
    return
  }
  console.log('Scholarship application submitted:', formData.value)
  alert('Scholarship application submitted successfully! We will review your application and contact you soon.')
}
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Scholarship Programs
        </h1>
        <p class="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
          St. Francis Xavier College is committed to making quality education accessible to all deserving students. 
          Explore our scholarship programs and find the one that fits your qualifications.
        </p>
      </div>

      <!-- Scholarship Benefits Overview -->
      <Card class="mb-12 bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle class="text-2xl">Why Apply for a Scholarship?</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col items-start">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="font-semibold text-foreground mb-2">Financial Relief</h3>
              <p class="text-sm text-muted-foreground">
                Reduce or eliminate tuition costs, allowing you to focus on your studies without financial burden.
              </p>
            </div>
            <div class="flex flex-col items-start">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 class="font-semibold text-foreground mb-2">Recognition</h3>
              <p class="text-sm text-muted-foreground">
                Gain recognition for your academic achievements, talents, or leadership abilities.
              </p>
            </div>
            <div class="flex flex-col items-start">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="font-semibold text-foreground mb-2">Motivation</h3>
              <p class="text-sm text-muted-foreground">
                Stay motivated to maintain high performance and achieve your educational goals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Scholarship Types Grid -->
      <div class="mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-foreground mb-6">Available Scholarships</h2>
        <p class="text-muted-foreground mb-8">
          Select a scholarship program to view details and apply. Click on a card to proceed with your application.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            v-for="scholarship in scholarshipTypes" 
            :key="scholarship.id"
            :class="[
              'cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
              formData.scholarshipType === scholarship.id 
                ? 'ring-2 ring-primary shadow-lg border-primary' 
                : 'hover:border-primary/50'
            ]"
            @click="handleScholarshipSelect(scholarship.id)"
          >
            <CardHeader>
              <div class="flex items-start justify-between mb-2">
                <CardTitle class="text-lg">{{ scholarship.name }}</CardTitle>
                <Badge :variant="scholarship.slots <= 10 ? 'destructive' : 'secondary'">
                  {{ scholarship.slots }} slots
                </Badge>
              </div>
              <CardDescription>{{ scholarship.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div>
                  <p class="text-sm font-semibold text-foreground mb-1">Coverage:</p>
                  <p class="text-sm text-primary font-medium">{{ scholarship.coverage }}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p class="text-sm font-semibold text-foreground mb-2">Requirements:</p>
                  <ul class="text-sm text-muted-foreground space-y-1">
                    <li v-for="(req, idx) in scholarship.requirements.slice(0, 3)" :key="idx" class="flex items-start">
                      <span class="mr-2 text-primary">•</span>
                      <span>{{ req }}</span>
                    </li>
                    <li v-if="scholarship.requirements.length > 3" class="text-xs italic text-muted-foreground/70">
                      +{{ scholarship.requirements.length - 3 }} more...
                    </li>
                  </ul>
                </div>

                <div class="pt-2">
                  <Button 
                    class="w-full" 
                    size="sm"
                    :variant="formData.scholarshipType === scholarship.id ? 'default' : 'outline'"
                  >
                    {{ formData.scholarshipType === scholarship.id ? 'Selected' : 'Select & Apply' }}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator class="my-12" />

      <!-- Application Form -->
      <div v-if="showForm" id="application-form" class="scroll-mt-20">
        <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-lg p-6 md:p-8 border-2">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl md:text-3xl font-bold text-foreground">Application Form</h2>
            <Badge variant="outline" class="text-base px-4 py-2">
              Step 1 of 1
            </Badge>
          </div>

          <!-- Selected Scholarship Info -->
          <div v-if="selectedScholarship" class="mb-8 p-6 bg-linear-to-r from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <p class="text-sm font-semibold text-muted-foreground mb-1">Selected Scholarship:</p>
                <p class="text-xl font-bold text-primary mb-3">{{ selectedScholarship.name }}</p>
                <p class="text-sm text-muted-foreground mb-4">{{ selectedScholarship.description }}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div class="bg-white/70 rounded-lg p-3">
                    <p class="text-xs font-semibold text-muted-foreground mb-1">Coverage</p>
                    <p class="text-sm font-bold text-foreground">{{ selectedScholarship.coverage }}</p>
                  </div>
                  <div class="bg-white/70 rounded-lg p-3">
                    <p class="text-xs font-semibold text-muted-foreground mb-1">Available Slots</p>
                    <p class="text-sm font-bold text-foreground">{{ selectedScholarship.slots }} remaining</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full Requirements -->
            <Separator class="my-4" />
            <div>
              <p class="text-sm font-semibold text-foreground mb-2">Complete Requirements:</p>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li v-for="(req, idx) in selectedScholarship.requirements" :key="idx" class="text-sm text-muted-foreground flex items-start">
                  <span class="mr-2 text-primary">✓</span>
                  <span>{{ req }}</span>
                </li>
              </ul>
            </div>

            <!-- Eligibility Criteria -->
            <Separator class="my-4" />
            <div>
              <p class="text-sm font-semibold text-foreground mb-2">Eligibility Criteria:</p>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li v-for="(criteria, idx) in selectedScholarship.eligibility" :key="idx" class="text-sm text-muted-foreground flex items-start">
                  <span class="mr-2 text-primary">→</span>
                  <span>{{ criteria }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Personal Information -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 class="text-xl font-bold text-foreground">Personal Information</h3>
                <p class="text-sm text-muted-foreground">Please provide your basic personal details</p>
              </div>
            </div>
            
            <FieldGroup>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Field>
                  <FieldLabel>Last Name *</FieldLabel>
                  <Input 
                    v-model="formData.lastName"
                    type="text" 
                    required
                    placeholder="Enter last name"
                  />
                </Field>
                <Field>
                  <FieldLabel>First Name *</FieldLabel>
                  <Input 
                    v-model="formData.firstName"
                    type="text" 
                    required
                    placeholder="Enter first name"
                  />
                </Field>
                <Field>
                  <FieldLabel>Middle Name</FieldLabel>
                  <Input 
                    v-model="formData.middleName"
                    type="text"
                    placeholder="Enter middle name"
                  />
                </Field>
                <Field>
                  <FieldLabel>Ext.</FieldLabel>
                  <Input 
                    v-model="formData.ext"
                    type="text" 
                    placeholder="Jr., Sr., III"
                  />
                </Field>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Email Address *</FieldLabel>
                  <Input 
                    v-model="formData.email"
                    type="email" 
                    required
                    placeholder="your.email@example.com"
                  />
                </Field>
                <Field>
                  <FieldLabel>Contact Number *</FieldLabel>
                  <Input 
                    v-model="formData.contactNumber"
                    type="tel" 
                    required
                    placeholder="09XX-XXX-XXXX"
                  />
                </Field>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Date of Birth *</FieldLabel>
                  <Input 
                    v-model="formData.dateOfBirth"
                    type="date" 
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Sex *</FieldLabel>
                  <Select 
                    v-model="formData.sex"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </Field>
              </div>

              <Field>
                <FieldLabel>Complete Address *</FieldLabel>
                <Textarea 
                  v-model="formData.address"
                  required
                  rows="2"
                  placeholder="House No., Street, Barangay, City, Province"
                />
              </Field>
            </FieldGroup>
          </div>

          <Separator class="my-8" />

          <!-- Academic Information -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 class="text-xl font-bold text-foreground">Academic Information</h3>
                <p class="text-sm text-muted-foreground">Tell us about your academic background</p>
              </div>
            </div>
            
            <FieldGroup>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Program Applied For *</FieldLabel>
                  <Select 
                    v-model="formData.programApplied"
                    required
                  >
                    <option value="">Select Program</option>
                    <option v-for="program in programs" :key="program" :value="program">{{ program }}</option>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Year Level *</FieldLabel>
                  <Select 
                    v-model="formData.yearLevel"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </Select>
                </Field>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Previous School *</FieldLabel>
                  <Input 
                    v-model="formData.previousSchool"
                    type="text" 
                    required
                    placeholder="Name of previous school"
                  />
                </Field>
                <Field>
                  <FieldLabel>General Average / GPA *</FieldLabel>
                  <Input 
                    v-model="formData.gpa"
                    type="text" 
                    required
                    placeholder="e.g., 95%, 1.5"
                  />
                </Field>
              </div>
            </FieldGroup>
          </div>

          <Separator class="my-8" />

          <!-- Financial Information -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 class="text-xl font-bold text-foreground">Financial Information</h3>
                <p class="text-sm text-muted-foreground">Provide details about your family's financial situation</p>
              </div>
            </div>
            
            <FieldGroup>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Total Family Monthly Income *</FieldLabel>
                  <Input 
                    v-model="formData.familyIncome"
                    type="text" 
                    required
                    placeholder="PHP 0.00"
                  />
                </Field>
                <Field>
                  <FieldLabel>Number of Household Members *</FieldLabel>
                  <Input 
                    v-model="formData.householdMembers"
                    type="number" 
                    required
                    placeholder="0"
                    min="1"
                  />
                </Field>
              </div>
            </FieldGroup>
          </div>

          <Separator class="my-8" />

          <!-- Supporting Documents -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 class="text-xl font-bold text-foreground">Supporting Documents</h3>
                <p class="text-sm text-muted-foreground">Upload all required documents in a single PDF file</p>
              </div>
            </div>
            
            <FieldGroup>
              <Field>
                <FieldLabel>Upload Required Documents *</FieldLabel>
                <Input 
                  type="file"
                  @change="handleFileUpload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  class="cursor-pointer"
                />
                <p class="text-xs text-muted-foreground mt-2">
                  Accepted formats: PDF, JPG, PNG. Maximum file size: 10MB
                </p>
                <p v-if="formData.documentProof" class="text-xs text-primary mt-1 font-medium">
                  Selected file: {{ formData.documentProof }}
                </p>
              </Field>
            </FieldGroup>
          </div>

          <Separator class="my-8" />

          <!-- Essay -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 class="text-xl font-bold text-foreground">Personal Statement</h3>
                <p class="text-sm text-muted-foreground">Share your story and why you deserve this scholarship</p>
              </div>
            </div>
            
            <FieldGroup>
              <Field>
                <FieldLabel>Why do you deserve this scholarship? *</FieldLabel>
                <Textarea 
                  v-model="formData.essay"
                  required
                  rows="8"
                  placeholder="Write your essay here (minimum 200 words)...

Please include:
- Your academic and personal achievements
- Your financial situation and how this scholarship will help
- Your future goals and how this education will help you achieve them
- Why you chose St. Francis Xavier College"
                />
                <p class="text-xs text-muted-foreground mt-2">
                  Please write at least 200 words explaining your situation and aspirations.
                </p>
              </Field>
            </FieldGroup>
          </div>

          <!-- Important Notice -->
          <Card class="mb-8 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle class="text-lg flex items-center gap-2">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2 text-sm text-muted-foreground">
                <li class="flex items-start">
                  <span class="mr-2 text-amber-600 font-bold">•</span>
                  <span>All information must be accurate and truthful. False information will result in disqualification.</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2 text-amber-600 font-bold">•</span>
                  <span>Incomplete applications will not be processed. Please ensure all required fields are filled.</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2 text-amber-600 font-bold">•</span>
                  <span>Scholarship approval is subject to verification and available slots.</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2 text-amber-600 font-bold">•</span>
                  <span>Selected applicants will be notified via email within 2-3 weeks.</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2 text-amber-600 font-bold">•</span>
                  <span>Scholarships are renewable each semester based on maintaining eligibility requirements.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <!-- Agreement -->
          <div class="mb-8">
            <Card class="border-2">
              <CardContent class="pt-6">
                <label class="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    v-model="formData.agreement"
                    required
                    class="w-5 h-5 mt-0.5 accent-primary cursor-pointer"
                  />
                  <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    I certify that all information provided in this application is true, complete, and accurate. I understand that any false information may result in the cancellation of my scholarship. I authorize St. Francis Xavier College to verify all information provided and agree to comply with all scholarship requirements and conditions. I have read and understood the eligibility criteria and requirements for the selected scholarship program. *
                  </span>
                </label>
              </CardContent>
            </Card>
          </div>

          <!-- Submit Button -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              type="button"
              variant="outline"
              size="lg"
              class="sm:min-w-200px"
              @click="showForm = false"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              size="lg"
              class="sm:min-w-200px"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </div>

      <!-- Contact Information -->
      <Card class="mt-12 border-2">
        <CardHeader class="bg-linear-to-r from-primary/5 to-transparent">
          <CardTitle class="text-2xl">Need Assistance?</CardTitle>
          <CardDescription>Our Scholarship Office is here to help you</CardDescription>
        </CardHeader>
        <CardContent class="pt-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col items-start p-4 rounded-lg bg-gray-50 border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Office Hours</p>
              <p class="text-sm text-muted-foreground">Monday - Friday</p>
              <p class="text-sm text-muted-foreground">8:00 AM - 5:00 PM</p>
            </div>
            
            <div class="flex flex-col items-start p-4 rounded-lg bg-gray-50 border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Contact Number</p>
              <p class="text-sm text-muted-foreground">0909-088-85380</p>
              <p class="text-xs text-muted-foreground mt-1">Scholarship Office Hotline</p>
            </div>
            
            <div class="flex flex-col items-start p-4 rounded-lg bg-gray-50 border">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="font-semibold text-foreground mb-2">Email Address</p>
              <p class="text-sm text-muted-foreground">scholarship@sfxc.edu.ph</p>
              <p class="text-xs text-muted-foreground mt-1">Allow 24-48 hours for response</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>