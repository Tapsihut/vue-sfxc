<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-vue-next'
import Footer from '@/components/ui/custom/Footer.vue'
import NavDesktopMenu from '@/components/ui/custom/NavDesktopMenu.vue'
import NavMobileMenu from '@/components/ui/custom/NavMobileMenu.vue'
import SchoolLogo from '@/components/ui/custom/logo/SchoolLogo.vue'
import SFXCLogoOnly from '@/assets/images/sfxc-logo-only.png'
import SFXCTextOnly from '@/assets/images/sfxc-text-only.png'
import { navigationItems } from '@/data/navigationItems'
import { useNavigation } from '@/composables/useNavigation'

const { isScrolled, isMobileMenuOpen, toggleMobileMenu } = useNavigation()
</script>

<template>
    <div class="min-h-screen bg-background font-sans">
        <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <nav>
                <div
                    class="transition-all duration-300 border"
                    :class="[
                        isScrolled
                            ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-xl border-white/40 dark:border-white/10'
                            : 'bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm shadow-lg border-white/20 dark:border-white/5',
                    ]"
                >
                    <div class="flex justify-between items-center px-6 h-20">
                        <!-- Logo -->
                        <RouterLink
                            to="/"
                            class="flex items-center transition-transform duration-200 hover:scale-105"
                        >
                            <SchoolLogo
                                :logo-src="SFXCLogoOnly"
                                :text-src="SFXCTextOnly"
                                variant="horizontal"
                                alt="St. Francis Xavier College Logo"
                                logo-class="w-14"
                                text-class="w-44"
                            />
                        </RouterLink>

                        <!-- Desktop Navigation -->
                        <div class="hidden lg:flex items-center">
                            <NavDesktopMenu :items="navigationItems" />
                        </div>

                        <!-- Mobile Menu Button -->
                        <div class="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                class="cursor-pointer"
                                @click="toggleMobileMenu"
                            >
                                <X v-if="isMobileMenuOpen" class="h-6 w-6" />
                                <Menu v-else class="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <NavMobileMenu v-model:open="isMobileMenuOpen" :items="navigationItems" />
            </nav>
        </header>

        <!-- Main Content with Padding for Fixed Header -->
        <main class="w-full max-w-[100vw] relative pt-20">
            <slot />
        </main>

        <Footer />
    </div>
</template>
