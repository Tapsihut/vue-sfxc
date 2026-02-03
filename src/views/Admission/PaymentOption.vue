<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface PaymentMethod {
  name: string
  description: string
  details: string[]
}

const paymentMethods: PaymentMethod[] = [
  {
    name: 'Cash Payment',
    description: 'Direct payment at the Cashier\'s Office',
    details: [
      'Pay in full or installment basis',
      'Official receipt issued immediately',
      'Available during office hours',
      'No additional processing fees'
    ]
  },
  {
    name: 'Bank Deposit',
    description: 'Deposit to official SFXC bank accounts',
    details: [
      'Land Bank of the Philippines',
      'Account Name: St. Francis Xavier College',
      'Submit deposit slip to Cashier\'s Office',
      'Processing within 1-2 business days'
    ]
  },
  {
    name: 'Online Banking',
    description: 'Transfer via online banking platforms',
    details: [
      'GCash, PayMaya, or Bank Apps supported',
      'Email proof of payment to cashier@sfxc.edu.ph',
      'Include student name and ID number',
      'Confirmation within 24 hours'
    ]
  },
  {
    name: 'Payment Centers',
    description: 'Pay through authorized payment centers',
    details: [
      'Bayad Center, Cebuana Lhuillier',
      'ML Kwarta Padala, Palawan Express',
      'Present valid government ID',
      'Submit official receipt to Cashier\'s Office'
    ]
  }
]
</script>

<template>
  <section id="hero" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>

      <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
          Payment Options
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-2xl">
          Convenient and secure payment methods for your tuition and fees
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  </section>

  <div class="min-h-screen bg-background py-20 md:py-32">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Mode of Payment Section -->
      <div class="mb-32">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 tracking-tight">Mode of Payment</h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your preferred payment method for a seamless transaction experience
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <Card
            v-for="method in paymentMethods"
            :key="method.name"
            class="group relative overflow-hidden border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
          >
            <div class="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader class="relative pb-4">
              <div class="flex items-center gap-4 mb-3">
                <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <CardTitle class="text-2xl mb-1">{{ method.name }}</CardTitle>
                </div>
              </div>
              <p class="text-muted-foreground">{{ method.description }}</p>
            </CardHeader>
            <CardContent class="relative">
              <ul class="space-y-4">
                <li
                  v-for="(detail, index) in method.details"
                  :key="index"
                  class="flex items-start gap-3"
                >
                  <div class="shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <div class="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span class="text-sm text-muted-foreground leading-relaxed">{{ detail }}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator class="my-20" />

      <!-- Cashier Service Hours -->
      <div>
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 tracking-tight">Cashier Service Hours</h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our Cashier's Office is ready to assist you with your payment needs
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <Card class="border-2 shadow-lg overflow-hidden">
            <div class="bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-8 border-b">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold mb-1">Monday - Friday</h3>
                    <p class="text-muted-foreground">Regular Business Days</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-3xl font-bold text-primary">8:00 AM</p>
                  <div class="flex items-center justify-end gap-2 my-1">
                    <div class="w-8 h-0.5 bg-border"></div>
                  </div>
                  <p class="text-3xl font-bold text-primary">5:00 PM</p>
                </div>
              </div>
            </div>
            
            <CardContent class="p-8">
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-4">
                  <h4 class="font-semibold text-lg flex items-center gap-2">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Important Notes
                  </h4>
                  <ul class="space-y-2 text-sm text-muted-foreground">
                    <li class="flex items-start gap-2">
                      <span class="text-primary mt-1">•</span>
                      <span>Closed on weekends and holidays</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-primary mt-1">•</span>
                      <span>Lunch break: 12:00 PM - 1:00 PM</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-primary mt-1">•</span>
                      <span>Bring valid ID for transactions</span>
                    </li>
                  </ul>
                </div>

                <div class="space-y-4">
                  <h4 class="font-semibold text-lg flex items-center gap-2">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Information
                  </h4>
                  <div class="space-y-3">
                    <div class="flex items-center gap-3 text-sm">
                      <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span class="font-medium">0909-088-85380</span>
                    </div>
                    <div class="flex items-center gap-3 text-sm">
                      <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span class="font-medium">cashier@sfxc.edu.ph</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>