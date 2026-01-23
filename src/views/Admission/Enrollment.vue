<script setup lang="ts">
import { ref } from 'vue'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type StudentType = 'new' | 'returnee' | 'transferee' | 'old' | 'second-courser' | null

interface EnrollmentForm {
  studentType: StudentType
  lastName: string
  firstName: string
  middleName: string
  ext: string
  nickname: string
  programApplied: string
  year: string
  email: string
  dateOfBirth: string
  age: string
  sex: string
  civilStatus: string
  placeOfBirth: string
  contactNumber: string
  permanentAddress: string
  religion: string
  secondarySchool: string
  yearGraduated: string
  fatherLastName: string
  fatherFirstName: string
  fatherMiddleName: string
  fatherAddress: string
  fatherContact: string
  fatherOccupation: string
  motherLastName: string
  motherFirstName: string
  motherMiddleName: string
  motherAddress: string
  motherContact: string
  motherOccupation: string
  guardianLastName: string
  guardianFirstName: string
  guardianMiddleName: string
  guardianAddress: string
  guardianContact: string
  guardianOccupation: string
  desiredCourse: string
  agreement: boolean
}

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

const formData = ref<EnrollmentForm>({
  studentType: null,
  lastName: '',
  firstName: '',
  middleName: '',
  ext: '',
  nickname: '',
  programApplied: '',
  year: '',
  email: '',
  dateOfBirth: '',
  age: '',
  sex: '',
  civilStatus: '',
  placeOfBirth: '',
  contactNumber: '',
  permanentAddress: '',
  religion: '',
  secondarySchool: '',
  yearGraduated: '',
  fatherLastName: '',
  fatherFirstName: '',
  fatherMiddleName: '',
  fatherAddress: '',
  fatherContact: '',
  fatherOccupation: '',
  motherLastName: '',
  motherFirstName: '',
  motherMiddleName: '',
  motherAddress: '',
  motherContact: '',
  motherOccupation: '',
  guardianLastName: '',
  guardianFirstName: '',
  guardianMiddleName: '',
  guardianAddress: '',
  guardianContact: '',
  guardianOccupation: '',
  desiredCourse: '',
  agreement: false
})

const handleSubmit = () => {
  if (!formData.value.agreement) {
    alert('Please agree to the terms and conditions')
    return
  }
  console.log('Form submitted:', formData.value)
  alert('Enrollment form submitted successfully!')
}
</script>

<template>
  <div class="min-h-screen bg-white py-8 md:py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-lg p-6 md:p-8 border-2 border-black">
        <!-- Student Type Selection -->
        <div class="mb-8">
          <label class="block text-black font-semibold mb-4">Student Type:</label>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                v-model="formData.studentType" 
                value="new"
                class="w-4 h-4 accent-black cursor-pointer"
              />
              <span class="text-sm md:text-base text-black">New Student</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                v-model="formData.studentType" 
                value="returnee"
                class="w-4 h-4 accent-black cursor-pointer"
              />
              <span class="text-sm md:text-base text-black">Returnee</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                v-model="formData.studentType" 
                value="transferee"
                class="w-4 h-4 accent-black cursor-pointer"
              />
              <span class="text-sm md:text-base text-black">Transferee</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                v-model="formData.studentType" 
                value="old"
                class="w-4 h-4 accent-black cursor-pointer"
              />
              <span class="text-sm md:text-base text-black">Old Student</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                v-model="formData.studentType" 
                value="second-courser"
                class="w-4 h-4 accent-black cursor-pointer"
              />
              <span class="text-sm md:text-base text-black">Second Courser</span>
            </label>
          </div>
        </div>

        <!-- Part I: Personal Information -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-black mb-6 pb-2 border-b-2 border-black">Part I: Personal Information</h3>
          
          <FieldGroup>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Field>
                <FieldLabel>Last Name *</FieldLabel>
                <Input 
                  v-model="formData.lastName"
                  type="text" 
                  required
                />
              </Field>
              <Field>
                <FieldLabel>First Name *</FieldLabel>
                <Input 
                  v-model="formData.firstName"
                  type="text" 
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Middle Name</FieldLabel>
                <Input 
                  v-model="formData.middleName"
                  type="text" 
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
                <FieldLabel>Nickname</FieldLabel>
                <Input 
                  v-model="formData.nickname"
                  type="text" 
                />
              </Field>
              <Field>
                <FieldLabel>Email Address *</FieldLabel>
                <Input 
                  v-model="formData.email"
                  type="email" 
                  required
                />
              </Field>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <FieldLabel>Year *</FieldLabel>
                <Select 
                  v-model="formData.year"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Date of Birth *</FieldLabel>
                <Input 
                  v-model="formData.dateOfBirth"
                  type="date" 
                  required
                />
              </Field>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Field>
                <FieldLabel>Age *</FieldLabel>
                <Input 
                  v-model="formData.age"
                  type="number" 
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
              <Field>
                <FieldLabel>Civil Status *</FieldLabel>
                <Select 
                  v-model="formData.civilStatus"
                  required
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Religion</FieldLabel>
                <Input 
                  v-model="formData.religion"
                  type="text" 
                />
              </Field>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Place of Birth *</FieldLabel>
                <Input 
                  v-model="formData.placeOfBirth"
                  type="text" 
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Contact Number *</FieldLabel>
                <Input 
                  v-model="formData.contactNumber"
                  type="tel" 
                  required
                />
              </Field>
            </div>

            <Field>
              <FieldLabel>Permanent Address *</FieldLabel>
              <Textarea 
                v-model="formData.permanentAddress"
                required
                rows="2"
              />
            </Field>
          </FieldGroup>
        </div>

        <!-- Part II: Education Background -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-black mb-6 pb-2 border-b-2 border-black">Part II: Education Background</h3>
          
          <FieldGroup>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Secondary (SHS) *</FieldLabel>
                <Input 
                  v-model="formData.secondarySchool"
                  type="text" 
                  required
                  placeholder="School Name"
                />
              </Field>
              <Field>
                <FieldLabel>Year Graduated *</FieldLabel>
                <Input 
                  v-model="formData.yearGraduated"
                  type="text" 
                  required
                  placeholder="YYYY"
                />
              </Field>
            </div>
          </FieldGroup>
        </div>

        <!-- Part III: Family Background -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-black mb-6 pb-2 border-b-2 border-black">Part III: Family Background</h3>
          
          <!-- Father's Information -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Father's Information</h4>
            <FieldGroup>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input 
                    v-model="formData.fatherLastName"
                    type="text" 
                  />
                </Field>
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input 
                    v-model="formData.fatherFirstName"
                    type="text" 
                  />
                </Field>
                <Field>
                  <FieldLabel>Middle Name</FieldLabel>
                  <Input 
                    v-model="formData.fatherMiddleName"
                    type="text" 
                  />
                </Field>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input 
                    v-model="formData.fatherAddress"
                    type="text" 
                  />
                </Field>
                <Field>
                  <FieldLabel>Contact Number</FieldLabel>
                  <Input 
                    v-model="formData.fatherContact"
                    type="tel" 
                  />
                </Field>
                <Field>
                  <FieldLabel>Occupation</FieldLabel>
                  <Input 
                    v-model="formData.fatherOccupation"
                    type="text" 
                  />
                </Field>
              </div>
            </FieldGroup>
          </div>

          <!-- Mother's Information -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Mother's Information</h4>
            <FieldGroup>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input 
                    v-model="formData.motherLastName"
                    type="text" 
                  />
                </Field>
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input 
                    v-model="formData.motherFirstName"
                    type="text" 
                  />
                </Field>
                <Field>
                  <FieldLabel>Middle Name</FieldLabel>
                  <Input 
                    v-model="formData.motherMiddleName"
                    type="text" 
                  />
                </Field>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input 
                    v-model="formData.motherAddress"
                    type="text" 
                  />
                </Field>
                <Field>
                  <FieldLabel>Contact Number</FieldLabel>
                  <Input 
                    v-model="formData.motherContact"
                    type="tel" 
                  />
                </Field>
                <Field>
                  <FieldLabel>Occupation</FieldLabel>
                  <Input 
                    v-model="formData.motherOccupation"
                    type="text" 
                  />
                </Field>
              </div>
            </FieldGroup>
          </div>

          <!-- Guardian's Information -->
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Guardian's Information (If applicable)</h4>
            <FieldGroup>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input 
                    v-model="formData.guardianLastName"
                    type="text" 
                  />
                </Field>
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input 
                    v-model="formData.guardianFirstName"
                    type="text" 
                  />
                </Field>
                <Field>
                  <FieldLabel>Middle Name</FieldLabel>
                  <Input 
                    v-model="formData.guardianMiddleName"
                    type="text" 
                  />
                </Field>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input 
                    v-model="formData.guardianAddress"
                    type="text" 
                  />
                </Field>
                <Field>
                  <FieldLabel>Contact Number</FieldLabel>
                  <Input 
                    v-model="formData.guardianContact"
                    type="tel" 
                  />
                </Field>
                <Field>
                  <FieldLabel>Occupation</FieldLabel>
                  <Input 
                    v-model="formData.guardianOccupation"
                    type="text" 
                  />
                </Field>
              </div>
            </FieldGroup>
          </div>
        </div>

        <!-- Part IV: Desired Program -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-black mb-6 pb-2 border-b-2 border-black">Part IV: Desired Program to Enroll In</h3>
          
          <FieldGroup>
            <Field>
              <FieldLabel>Course *</FieldLabel>
              <Select 
                v-model="formData.desiredCourse"
                required
              >
                <option value="">Select Course</option>
                <option v-for="program in programs" :key="program" :value="program">{{ program }}</option>
              </Select>
            </Field>
          </FieldGroup>
        </div>

        <!-- Promo Banner -->
        <div class="mb-8 bg-gray-100 text-black rounded-lg p-6 shadow-md border-2 border-gray-300">
          <p class="text-center font-semibold mb-2">
            Secure your slot one (1) month before the start of classes and enjoy a 20% discount on tuition fees!
          </p>
          <p class="text-center text-sm">
            For more information, message us on our FB page: <strong>St. Francis Xavier College</strong>, or call <strong>0909-088-85380</strong>.
          </p>
          <p class="text-center text-sm mt-2 font-bold">
            Be a proud Xavier Knight — enroll as early as today!
          </p>
        </div>

        <!-- Agreement -->
        <div class="mb-6">
          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="formData.agreement"
              required
              class="w-5 h-5 mt-0.5 accent-black cursor-pointer"
            />
            <span class="text-sm text-gray-700">
              I confirm that the information I have given in this form is true, complete and accurate. I agree to fill-out this Student Information Form (SIF) and hereby authorize sharing of the information furnished on this form with St. Francis Xavier College in accordance with Philippine Data Privacy Act of 2012. *
            </span>
          </label>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center">
          <button 
            type="submit"
            class="bg-black text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg border-2 border-black"
          >
            Submit Enrollment Form
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
