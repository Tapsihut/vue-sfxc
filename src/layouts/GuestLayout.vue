<script setup lang="ts">
import { ref } from 'vue'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Menu, X, ChevronDown } from 'lucide-vue-next'
import Footer from '@/components/ui/custom/Footer.vue'
import SchoolLogo from '@/components/ui/custom/logo/SchoolLogo.vue'
import SFXCLogoOnly from '@/assets/images/sfxc-logo-only.png'
import SFXCTextOnly from '@/assets/images/sfxc-text-only.png'


const isMobileMenuOpen = ref(false)
const activeSubmenu = ref<string | null>(null)

interface NavigationLink {
    name: string
    to: string | { name: string }
}

interface NavigationItem {
    name: string
    type: 'link' | 'dropdown'
    to?: string | { name: string }
    items?: NavigationLink[]
}

const navigationItems = ref<NavigationItem[]>([
    {
        name: 'Home',
        type: 'link',
        to: { name: 'home' },
    },
    {
        name: 'About',
        type: 'dropdown',
        items: [
            { name: 'School Patron', to: { name: 'school-patron' } },
            { name: 'Vision & Mission', to: { name: 'vision-mission' } },
            { name: 'Organizations', to: { name: 'organizations' } },
        ],
    },
    {
        name: 'Academics',
        type: 'dropdown',
        items: [
            { name: 'Tesda', to: { name: 'tesda' } },
            { name: 'College Programs', to: '#' },
            { name: 'Scholarship', to: { name: 'scholarship' } },
        ],
    },
    {
        name: 'Admission',
        type: 'dropdown',
        items: [
            { name: 'Enrollment', to: { name: 'enrollment' } },
            { name: 'Requirements', to: '#' },
            { name: 'Payment Options', to: '#' },
        ],
    },
    {
        name: 'News',
        type: 'dropdown',
        items: [
            { name: 'Latest News', to: { name: 'news' } },
            { name: 'Announcements', to: '#' },
        ],
    },
    { name: 'Contact',
        type: 'link',
        to: '/contact',
    },
])

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    if (!isMobileMenuOpen.value) activeSubmenu.value = null
}

const toggleSubmenu = (menuName: string) => {
    if (activeSubmenu.value === menuName) {
        activeSubmenu.value = null
    } else {
        activeSubmenu.value = menuName
    }
}
</script>

<template>
    <div class="min-h-screen bg-background font-sans">
        <header class="bg-white shadow-sm sticky top-0 z-50 border-b">
            <nav>
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-20 bg-white relative z-50">
                        <div class="flex items-center">
                            <SchoolLogo
                                :logo-src="SFXCLogoOnly"
                                :text-src="SFXCTextOnly"
                                variant="horizontal"
                                alt="Company Name"
                                logo-class="w-16"
                                text-class="w-50"
                            />
                        </div>
                        <div class="hidden md:flex items-center space-x-1">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem
                                        v-for="item in navigationItems"
                                        :key="item.name"
                                    >
                                        <!-- Link Type -->
                                        <NavigationMenuLink
                                            v-if="item.type === 'link'"
                                            as-child
                                            :class="navigationMenuTriggerStyle()"
                                        >
                                            <RouterLink :to="item.to!">{{ item.name }}</RouterLink>
                                        </NavigationMenuLink>

                                        <!-- Dropdown Type -->
                                        <template v-else-if="item.type === 'dropdown'">
                                            <NavigationMenuTrigger>{{
                                                item.name
                                            }}</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul class="grid w-50 gap-2">
                                                    <li
                                                        v-for="subItem in item.items"
                                                        :key="subItem.name"
                                                    >
                                                        <NavigationMenuLink as-child>
                                                            <RouterLink
                                                                :to="subItem.to"
                                                                class="block p-3 hover:bg-accent rounded-md"
                                                            >
                                                                {{ subItem.name }}
                                                            </RouterLink>
                                                        </NavigationMenuLink>
                                                    </li>
                                                </ul>
                                            </NavigationMenuContent>
                                        </template>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                            <Button href="/login">Login</Button>
                        </div>

                        <div class="md:hidden">
                            <Button variant="ghost" size="icon" @click="toggleMobileMenu">
                                <X v-if="isMobileMenuOpen" class="h-6 w-6" />
                                <Menu v-else class="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="transform -translate-y-4 opacity-0"
                    enter-to-class="transform translate-y-0 opacity-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="transform translate-y-0 opacity-100"
                    leave-to-class="transform -translate-y-4 opacity-0"
                >
                    <div
                        v-if="isMobileMenuOpen"
                        class="absolute top-20 left-0 w-full bg-white border-b shadow-xl md:hidden z-40 max-h-[calc(100vh-5rem)] overflow-y-auto"
                    >
                        <div class="flex flex-col p-4 pb-6 space-y-2">
                            <template v-for="item in navigationItems" :key="item.name">
                                <!-- Link Type -->
                                <RouterLink
                                    v-if="item.type === 'link'"
                                    :to="item.to!"
                                    class="flex items-center w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg"
                                >
                                    {{ item.name }}
                                </RouterLink>

                                <!-- Dropdown Type -->
                                <div v-else-if="item.type === 'dropdown'">
                                    <button
                                        @click="toggleSubmenu(item.name.toLowerCase())"
                                        class="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg group"
                                    >
                                        <span>{{ item.name }}</span>
                                        <ChevronDown
                                            class="w-4 h-4 transition-transform duration-200 text-gray-500"
                                            :class="{
                                                'rotate-180':
                                                    activeSubmenu === item.name.toLowerCase(),
                                            }"
                                        />
                                    </button>

                                    <div
                                        v-if="activeSubmenu === item.name.toLowerCase()"
                                        class="px-4 py-2 space-y-1 bg-gray-50 rounded-b-lg mx-2 mt-1"
                                    >
                                        <RouterLink
                                            v-for="subItem in item.items"
                                            :key="subItem.name"
                                            :to="subItem.to"
                                            class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >
                                            {{ subItem.name }}
                                        </RouterLink>
                                    </div>
                                </div>
                            </template>

                            <Separator class="my-4" />

                            <Button class="w-full justify-center" href="/login">Login</Button>
                        </div>
                    </div>
                </Transition>
            </nav>
        </header>

        <main class="w-full">
            <slot />
        </main>

        <Footer />
    </div>
</template>
