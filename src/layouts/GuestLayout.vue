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

const isMobileMenuOpen = ref(false)

const activeSubmenu = ref<string | null>(null)

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
        <header>
            <nav class="bg-white shadow-sm sticky top-0 z-50 border-b">
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-20 bg-white relative z-50">
                        <div class="flex items-center">
                            <img
                                src="@/assets/images/sfxc-logo-with-name.jpg"
                                alt="St. Francis Xavier College Logo"
                                class="w-54 md:w-70 h-auto object-contain"
                            />
                        </div>
                        <div class="hidden md:flex items-center space-x-4 lg:space-x-6">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink
                                            as-child
                                            :class="navigationMenuTriggerStyle()"
                                        >
                                            <RouterLink to="/">Home</RouterLink>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Abouts</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul class="grid w-50 gap-2">
                                                <li>
                                                    <NavigationMenuLink as-child
                                                        ><RouterLink
                                                            to="#"
                                                            class="block p-3 hover:bg-accent rounded-md"
                                                            >Background</RouterLink
                                                        ></NavigationMenuLink
                                                    >
                                                </li>
                                                <li>
                                                    <NavigationMenuLink as-child
                                                        ><RouterLink
                                                            to="#"
                                                            class="block p-3 hover:bg-accent rounded-md"
                                                            >Mission & Vision</RouterLink
                                                        ></NavigationMenuLink
                                                    >
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Academics</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul class="grid w-50 gap-2">
                                                <li>
                                                    <NavigationMenuLink as-child
                                                        ><RouterLink
                                                            to="#"
                                                            class="block p-3 hover:bg-accent rounded-md"
                                                            >Tesda</RouterLink
                                                        ></NavigationMenuLink
                                                    >
                                                </li>
                                                <li>
                                                    <NavigationMenuLink as-child
                                                        ><RouterLink
                                                            to="#"
                                                            class="block p-3 hover:bg-accent rounded-md"
                                                            >Programs</RouterLink
                                                        ></NavigationMenuLink
                                                    >
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>News</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul class="grid w-50 gap-2">
                                                <li>
                                                    <NavigationMenuLink as-child
                                                        ><RouterLink
                                                            to="#"
                                                            class="block p-3 hover:bg-accent rounded-md"
                                                            >Newsletters</RouterLink
                                                        ></NavigationMenuLink
                                                    >
                                                </li>
                                                <li>
                                                    <NavigationMenuLink as-child
                                                        ><RouterLink
                                                            to="#"
                                                            class="block p-3 hover:bg-accent rounded-md"
                                                            >Announcements</RouterLink
                                                        ></NavigationMenuLink
                                                    >
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink
                                            as-child
                                            :class="navigationMenuTriggerStyle()"
                                        >
                                            <RouterLink to="/contact">Contact</RouterLink>
                                        </NavigationMenuLink>
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
                            <RouterLink
                                to="/"
                                class="flex items-center w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg"
                            >
                                Home
                            </RouterLink>

                            <div>
                                <button
                                    @click="toggleSubmenu('abouts')"
                                    class="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg group"
                                >
                                    <span>Abouts</span>
                                    <ChevronDown
                                        class="w-4 h-4 transition-transform duration-200 text-gray-500"
                                        :class="{ 'rotate-180': activeSubmenu === 'abouts' }"
                                    />
                                </button>

                                <div
                                    v-if="activeSubmenu === 'abouts'"
                                    class="px-4 py-2 space-y-1 bg-gray-50 rounded-b-lg mx-2 mt-1"
                                >
                                    <RouterLink
                                        to="#"
                                        class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >Background</RouterLink
                                    >
                                    <RouterLink
                                        to="#"
                                        class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >Mission & Vision</RouterLink
                                    >
                                    <RouterLink
                                        to="#"
                                        class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >Clubs</RouterLink
                                    >
                                    <RouterLink
                                        to="#"
                                        class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >Student Council</RouterLink
                                    >
                                </div>
                            </div>

                            <div>
                                <button
                                    @click="toggleSubmenu('academics')"
                                    class="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg group"
                                >
                                    <span>Academics</span>
                                    <ChevronDown
                                        class="w-4 h-4 transition-transform duration-200 text-gray-500"
                                        :class="{ 'rotate-180': activeSubmenu === 'academics' }"
                                    />
                                </button>

                                <div
                                    v-if="activeSubmenu === 'academics'"
                                    class="px-4 py-2 space-y-1 bg-gray-50 rounded-b-lg mx-2 mt-1"
                                >
                                    <RouterLink
                                        to="#"
                                        class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >Tesda</RouterLink
                                    >
                                    <RouterLink
                                        to="#"
                                        class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >College Programs</RouterLink
                                    >
                                    <RouterLink
                                        to="#"
                                        class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >Scholarship</RouterLink
                                    >
                                </div>
                            </div>

                            <div>
                                <button
                                    @click="toggleSubmenu('news')"
                                    class="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg group"
                                >
                                    <span>News</span>
                                    <ChevronDown
                                        class="w-4 h-4 transition-transform duration-200 text-gray-500"
                                        :class="{ 'rotate-180': activeSubmenu === 'news' }"
                                    />
                                </button>

                                <div
                                    v-if="activeSubmenu === 'news'"
                                    class="px-4 py-2 space-y-1 bg-gray-50 rounded-b-lg mx-2 mt-1"
                                >
                                    <RouterLink
                                        to="#"
                                        class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >Latest News</RouterLink
                                    >
                                    <RouterLink
                                        to="#"
                                        class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                        >Announcements</RouterLink
                                    >
                                </div>
                            </div>

                            <Separator class="my-4" />

                            <Button class="w-full justify-center" href="/login">Login</Button>
                        </div>
                    </div>
                </Transition>
            </nav>
        </header>

        <main class="p-6">
            <slot />
        </main>
    </div>
</template>
