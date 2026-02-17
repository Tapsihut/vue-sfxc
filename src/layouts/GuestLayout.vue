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

interface NavigationGroup {
    label?: string
    links: NavigationLink[]
}

interface NavigationItem {
    name: string
    type: 'link' | 'dropdown'
    to?: string | { name: string }
    groups?: NavigationGroup[]
}

const navigationItems = ref<NavigationItem[]>([
    {
        name: 'Home',
        type: 'link',
        to: { name: 'home' },
    },
    {
        name: 'About Us',
        type: 'dropdown',
        groups: [
            {
                label: 'Overview',
                links: [
                    { name: 'Mission, Vision, and History', to: { name: 'vision-mission'} },
                    { name: 'Contact Us', to: '/contact' },
                ],
            },
            {
                label: 'Governance & Quality',
                links: [
                    { name: 'Leadership and Governance', to: '#' },
                    { name: 'Office Directory', to: '#' },
                    { name: 'Accreditations, Rankings, and Major Achievements', to: '#' },
                ],
            },
            {
                label: 'Campus',
                links: [{ name: 'Campus Facilities and Virtual Tour', to: '#' }],
            },
        ],
    },
    {
        name: 'Community',
        type: 'dropdown',
        groups: [
            {
                label: 'Community',
                links: [
                    { name: 'News and Events Calendar', to: { name: 'news' } },
                    { name: 'Media Gallery', to: '#' },
                    { name: 'Alumni', to: '#' },
                    { name: 'Careers at SFXC', to: '#' },
                ],
            },
            {
                label: 'Outreach',
                links: [
                    { name: 'Outreach Programs', to: '#' },
                    { name: 'Partner Barangays/Agencies', to: '#' },
                    { name: 'Volunteer Opportunities', to: '#' },
                    { name: 'Impact Stories', to: '#' },
                ],
            },
        ],
    },
    {
        name: 'Admissions',
        type: 'dropdown',
        groups: [
            {
                label: 'Apply',
                links: [
                    { name: 'How to Apply (Local/International)', to:  { name: 'requirements' } },
                    // { name: 'Requirements and Deadlines', to: { name: 'requirements' } },
                    { name: 'Application Portal Login', to: '#' },
                    { name: 'Visit/Schedule Tour', to: { name: 'schedule-tour'} },
                ],
            },
            {
                label: 'Costs & Aid',
                links: [
                    { name: 'Tuition and Financial Aid', to: { name: 'payment-options'} },
                    { name: 'Scholarships (Philippine/ASEAN-focused)', to: { name: 'scholarship' } },
                ],
            },
            {
                label: 'Guidance',
                links: [{ name: 'What Course Should I Choose?', to: { name: 'course-guide' } }],
            },
        ],
    },
    {
        name: 'Academics',
        type: 'dropdown',
        groups: [
            {
                label: 'Programs',
                links: [
                    { name: 'Baccalaureate Programs', to: {name: 'programs'} },
                    { name: 'Unit Earner Program', to: '#' },
                    { name: 'Technical Vocational Programs', to: '#' },
                ],
            },
            {
                label: 'Offices',
                links: [
                    { name: 'International Relations Office', to: '#' },
                    { name: 'Research Office', to: '#' },
                ],
            },
            {
                label: 'Recognitions',
                links: [
                    { name: 'Faculty Achievements', to: '#' },
                    { name: 'External Appointment of Faculty Members', to: '#' },
                    { name: 'Institutional Recognition/s', to: '#' },
                    { name: 'Program-level Recognitions/s', to: '#' },
                ],
            },
            {
                label: 'Learning',
                links: [{ name: 'Alternative Learning Arrangements', to: '#' }],
            },
        ],
    },
    {
        name: 'Xavier Knight Life',
        type: 'dropdown',
        groups: [
            {
                label: 'Student Life',
                links: [
                    { name: 'Office of Student Affairs and Services', to: '#' },
                    { name: 'Campus Housing and Dining', to: '#' },
                    { name: 'Student Organizations and Clubs', to: { name: 'organizations' } },
                    { name: 'Athletics and Fitness', to: '#' },
                    { name: 'Health and Wellness', to: '#' },
                    { name: 'Career Services', to: '#' },
                ],
            },
            {
                label: 'Culture & Faith',
                links: [
                    { name: 'Culture and Arts Office', to: '#' },
                    { name: 'Campus Culture and Traditions', to: '#' },
                    { name: 'Recollection', to: '#' },
                    { name: 'Faith (Patron)', to: { name: 'school-patron' } },
                    { name: 'Impact Stories', to: '#' },
                ],
            },
        ],
    },
    {
        name: 'More',
        type: 'dropdown',
        groups: [
            {
                label: 'Student Resources',
                links: [
                    { name: 'Academic Calendar', to: '#' },
                    { name: 'Policies and Handbooks', to: '#' },
                    { name: 'Library Access', to: '#' },
                    { name: 'XIMS', to: '#' },
                    { name: 'WIFI Access', to: '#' },
                    { name: 'Search and Site Map', to: '#' },
                ],
            },
            {
                label: 'Campus Safety',
                links: [
                    { name: 'Emergency Procedures', to: '#' },
                    { name: 'Disaster Preparedness', to: '#' },
                    { name: 'Health Protocols', to: '#' },
                    { name: 'Security Office Contact', to: '#' },
                    { name: 'Incident Reporting', to: '#' },
                ],
            },
        ],
    },
])

const getLinksCount = (item: NavigationItem) =>
    item.groups?.reduce((total, group) => total + group.links.length, 0) ?? 0

const useTwoColumns = (item: NavigationItem) =>
    (item.groups?.length ?? 0) > 1 || getLinksCount(item) > 6

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
                                alt="St. Francis Xavier College Logo"
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
                                            :class="
                                                navigationMenuTriggerStyle() +
                                                ' px-3 py-2 text-sm font-medium'
                                            "
                                        >
                                            <RouterLink :to="item.to!">{{ item.name }}</RouterLink>
                                        </NavigationMenuLink>

                                        <!-- Dropdown Type -->
                                        <template v-else-if="item.type === 'dropdown'">
                                            <NavigationMenuTrigger>{{
                                                item.name
                                            }}</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul
                                                    class="grid gap-2 p-2"
                                                    :class="
                                                        useTwoColumns(item)
                                                            ? 'w-130 grid-cols-2'
                                                            : 'w-56 grid-cols-1'
                                                    "
                                                >
                                                    <template
                                                        v-for="(group, groupIndex) in item.groups"
                                                        :key="groupIndex"
                                                    >
                                                        <li
                                                            class="col-span-1"
                                                            :class="{
                                                                'mb-2': useTwoColumns(item),
                                                            }"
                                                        >
                                                            <p
                                                                v-if="group.label"
                                                                class="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                                            >
                                                                {{ group.label }}
                                                            </p>
                                                            <ul class="grid gap-1">
                                                                <li
                                                                    v-for="subItem in group.links"
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
                                                        </li>
                                                    </template>
                                                </ul>
                                            </NavigationMenuContent>
                                        </template>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
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
                                        <template
                                            v-for="(group, groupIndex) in item.groups"
                                            :key="groupIndex"
                                        >
                                            <p
                                                v-if="group.label"
                                                class="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                            >
                                                {{ group.label }}
                                            </p>
                                            <RouterLink
                                                v-for="subItem in group.links"
                                                :key="subItem.name"
                                                :to="subItem.to"
                                                class="block px-4 py-2 text-sm rounded-md hover:text-accent-foreground hover:bg-accent"
                                            >
                                                {{ subItem.name }}
                                            </RouterLink>
                                        </template>
                                    </div>
                                </div>
                            </template>
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
