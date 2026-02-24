<script setup lang="ts">
import { Mail, Phone, MapPin, Facebook, Globe } from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import SchoolLogo from '@/components/ui/custom/logo/SchoolLogo.vue'
import SFXCLogoOnly from '@/assets/images/sfxc-logo-only.png'
import SFXCTextOnly from '@/assets/images/logo-text-white-no-website.png'
</script>

<template>
    <footer class="bg-primary text-primary-foreground">
        <div class="container mx-auto px-4 md:px-8 py-12 md:py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                <!-- Logo -->
                <div class="space-y-4">
                    <div class="flex items-center justify-center">
                        <SchoolLogo
                            :logo-src="SFXCLogoOnly"
                            :text-src="SFXCTextOnly"
                            variant="vertical"
                            logo-class="w-36 filter-[drop-shadow(1px_0_0_white)_drop-shadow(-1px_0_0_white)_drop-shadow(0_1px_0_white)_drop-shadow(0_-1px_0_white)]"
                            text-class="w-62"
                        />
                    </div>
                </div>

                <!-- General Use -->
                <div class="space-y-4">
                    <h3 class="text-lg font-bold">General Use</h3>
                    <ul class="space-y-2">
                        <li>
                            <RouterLink
                                :to="{ name: 'home' }"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                Home
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: 'vision-mission' }"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                Vision & Mission
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="#"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                Academics
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="#"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                Admissions
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="#"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                News and Events
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="#"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                Student Resources
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="#"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                Careers at SFXC
                            </RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Contact Us -->
                <div class="space-y-4">
                    <h3 class="text-lg font-bold">Contact Us</h3>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <MapPin class="w-5 h-5 mt-0.5 shrink-0 text-primary-foreground/80" />
                            <span class="text-primary-foreground/80 text-sm">
                                Barangay 5, San Francisco, Agusan del Sur, Philippines, 8501
                            </span>
                        </li>
                        <li class="flex items-center gap-3">
                            <Phone class="w-5 h-5 shrink-0 text-primary-foreground/80" />
                            <a
                                href="tel:+639853438327"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                +63 985 343 8327
                            </a>
                        </li>
                        <li class="flex items-center gap-3">
                            <Mail class="w-5 h-5 shrink-0 text-primary-foreground/80" />
                            <a
                                href="mailto:communications@sfxc.edu.ph"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                communications@sfxc.edu.ph
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Connect with Us -->
                <div class="space-y-4">
                    <h3 class="text-lg font-bold">Connect with Us</h3>
                    <p class="text-primary-foreground/80 text-sm">
                        Follow us on social media for updates and news.
                    </p>
                    <div class="flex items-start gap-3">
                        <Facebook class="w-5 h-5 shrink-0 text-primary-foreground/80" />
                        <a
                            href="https://www.facebook.com/StFrancisXavierCollegeADS"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            aria-label="Facebook"
                        >
                            St. Francis Xavier College
                        </a>
                    </div>
                    <div class="flex items-start gap-3">
                        <Globe class="w-5 h-5 shrink-0 text-primary-foreground/80" />
                        <a
                            href="https://www.sfxc.edu.ph"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            aria-label="Facebook"
                        >
                            www.sfxc.edu.ph
                        </a>
                    </div>
                </div>

                <!-- For Faculty/Staff -->
                <div class="space-y-4">
                    <h3 class="text-lg font-bold">For Faculty/Staff</h3>
                    <ul class="space-y-2">
                        <li>
                            <RouterLink
                                to="#"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                HR Portal
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="#"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                Facilities Requests
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="#"
                                class="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                            >
                                Professional Development
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <Separator class="bg-primary-foreground/20" />

        <div class="container mx-auto px-4 md:px-8 py-6">
            <div
                class="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-primary-foreground/80"
            >
                <p>
                    &copy; {{ new Date().getFullYear() }} St. Francis Xavier College. All rights
                    reserved.
                </p>
            </div>
        </div>
    </footer>
</template>

<style scoped></style>
