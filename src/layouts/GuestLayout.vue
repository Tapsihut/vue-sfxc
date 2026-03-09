<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
import {
    Menu,
    X,
    ChevronDown,
    Building2,
    Users,
    GraduationCap,
    FileText,
    Globe,
    Heart,
    Sparkles,
    LayoutDashboard,
} from 'lucide-vue-next'
import Footer from '@/components/ui/custom/Footer.vue'
import SchoolLogo from '@/components/ui/custom/logo/SchoolLogo.vue'
import SFXCLogoOnly from '@/assets/images/sfxc-logo-only.png'
import SFXCTextOnly from '@/assets/images/sfxc-text-only.png'

const isMobileMenuOpen = ref(false)
const activeSubmenu = ref<string | null>(null)
const isScrolled = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

interface NavigationLink {
    name: string
    to: string | { name: string; hash?: string }
    description?: string
}

interface NavigationGroup {
    label?: string
    links: NavigationLink[]
    icon?: any
}

interface NavigationItem {
    name: string
    type: 'link' | 'dropdown'
    to?: string | { name: string }
    groups?: NavigationGroup[]
    icon?: any
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
        to: { name: 'vision-mission' },
        groups: [
            {
                label: 'Overview',
                icon: Building2,
                links: [
                    {
                        name: 'Mission, Vision, and History',
                        to: { name: 'vision-mission' },
                        description: 'Our foundation and values',
                    },
                    {
                        name: 'Contact Us',
                        to: '/contact',
                        description: 'Get in touch with us',
                    },
                ],
            },
            {
                label: 'Governance & Quality',
                icon: LayoutDashboard,
                links: [
                    {
                        name: 'Leadership and Governance',
                        to: '#',
                        description: 'Meet our administration',
                    },
                    {
                        name: 'Office Directory',
                        to: { name: 'office-directory' },
                        description: 'Find the right office',
                    },
                    {
                        name: 'Accreditations & Achievements',
                        to: { name: 'accreditation' },
                        description: 'Our quality standards',
                    },
                ],
            },
            {
                label: 'Campus',
                icon: Sparkles,
                links: [
                    {
                        name: 'Campus Facilities and Virtual Tour',
                        to: { name: 'facilities' },
                        description: 'Explore our campus',
                    },
                ],
            },
        ],
    },
    {
        name: 'Admissions',
        type: 'dropdown',
        to: { name: 'requirements' },
        groups: [
            {
                label: 'Apply',
                icon: FileText,
                links: [
                    {
                        name: 'How to Apply',
                        to: { name: 'requirements', hash: '#enrollment' },
                        description: 'Local & International students',
                    },
                    {
                        name: 'Application Portal Login',
                        to: '#',
                        description: 'Access your application',
                    },
                    {
                        name: 'Visit/Schedule Tour',
                        to: { name: 'schedule-tour' },
                        description: 'See our campus in person',
                    },
                ],
            },
            {
                label: 'Costs & Aid',
                icon: Heart,
                links: [
                    {
                        name: 'Tuition and Financial Aid',
                        to: { name: 'payment-options' },
                        description: 'Investment in your future',
                    },
                    {
                        name: 'Scholarships',
                        to: { name: 'scholarship' },
                        description: 'Philippine/ASEAN-focused',
                    },
                ],
            },
            {
                label: 'Guidance',
                icon: Sparkles,
                links: [
                    {
                        name: 'What Course Should I Choose?',
                        to: { name: 'course-guide' },
                        description: 'Find your path',
                    },
                ],
            },
        ],
    },
    {
        name: 'Academics',
        type: 'dropdown',
        groups: [
            {
                label: 'Programs',
                icon: GraduationCap,
                links: [
                    {
                        name: 'Baccalaureate Programs',
                        to: { name: 'programs' },
                        description: 'Undergraduate degrees',
                    },
                    {
                        name: 'Unit Earner Program',
                        to: { name: 'unit-earner' },
                        description: 'Professional development',
                    },
                    {
                        name: 'Technical Vocational Programs',
                        to: { name: 'tech-voc' },
                        description: 'Skills-based training',
                    },
                ],
            },
            {
                label: 'Offices',
                icon: Building2,
                links: [
                    {
                        name: 'Research Development Office',
                        to: '#',
                        description: 'Advancing knowledge',
                    },
                    {
                        name: 'International Relations Office',
                        to: { name: 'international-relations' },
                        description: 'Global partnerships',
                    },
                ],
            },
        ],
    },
    {
        name: 'Xavier Knight Life',
        type: 'dropdown',
        groups: [
            {
                label: 'Student Life',
                icon: Users,
                links: [
                    {
                        name: 'Office of Student Affairs',
                        to: '#',
                        description: 'Student support services',
                    },
                    {
                        name: 'Campus Housing and Dining',
                        to: '#',
                        description: 'Living on campus',
                    },
                    {
                        name: 'Student Organizations',
                        to: { name: 'organizations' },
                        description: 'Clubs and activities',
                    },
                    {
                        name: 'Athletics and Fitness',
                        to: '#',
                        description: 'Sports and wellness',
                    },
                    {
                        name: 'Health and Wellness',
                        to: '#',
                        description: 'Your wellbeing matters',
                    },
                    {
                        name: 'Career Services',
                        to: '#',
                        description: 'Plan your future',
                    },
                ],
            },
            {
                label: 'Culture & Faith',
                icon: Heart,
                links: [
                    {
                        name: 'Culture and Arts Office',
                        to: '#',
                        description: 'Creative expression',
                    },
                    {
                        name: 'Campus Culture and Traditions',
                        to: '#',
                        description: 'Our unique identity',
                    },
                    {
                        name: 'Recollection',
                        to: '#',
                        description: 'Spiritual growth',
                    },
                    {
                        name: 'Faith (Patron)',
                        to: { name: 'school-patron' },
                        description: 'St. Francis Xavier',
                    },
                    {
                        name: 'Impact Stories',
                        to: '#',
                        description: 'Student experiences',
                    },
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
                icon: LayoutDashboard,
                links: [
                    {
                        name: 'Academic Calendar',
                        to: '#',
                        description: 'Important dates',
                    },
                    {
                        name: 'Policies and Handbooks',
                        to: '#',
                        description: 'Rules and guidelines',
                    },
                    {
                        name: 'Library Access',
                        to: '#',
                        description: 'Research resources',
                    },
                    {
                        name: 'XIMS',
                        to: '#',
                        description: 'Student portal',
                    },
                    {
                        name: 'WIFI Access',
                        to: '#',
                        description: 'Connect to campus',
                    },
                    {
                        name: 'Search and Site Map',
                        to: '#',
                        description: 'Find what you need',
                    },
                ],
            },
            {
                label: 'Campus Safety',
                icon: Sparkles,
                links: [
                    {
                        name: 'Emergency Procedures',
                        to: '#',
                        description: 'Stay safe on campus',
                    },
                    {
                        name: 'Disaster Preparedness',
                        to: '#',
                        description: 'Be ready',
                    },
                    {
                        name: 'Health Protocols',
                        to: '#',
                        description: 'Health and safety',
                    },
                    {
                        name: 'Security Office Contact',
                        to: '#',
                        description: '24/7 support',
                    },
                    {
                        name: 'Incident Reporting',
                        to: '#',
                        description: 'Report concerns',
                    },
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
        <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <nav class="">
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
                                                ' bg-transparent! shadow-none! ring-0!'
                                            "
                                        >
                                            <RouterLink :to="item.to!" class="cursor-pointer">
                                                {{ item.name }}
                                            </RouterLink>
                                        </NavigationMenuLink>

                                        <!-- Dropdown Type -->
                                        <template v-else-if="item.type === 'dropdown'">
                                            <NavigationMenuTrigger
                                                @click="item.to ? $router.push(item.to) : null"
                                                class="cursor-pointer"
                                            >
                                                {{ item.name }}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <div
                                                    class="grid gap-3 p-6"
                                                    :class="
                                                        useTwoColumns(item)
                                                            ? 'w-150 grid-cols-2'
                                                            : 'w-100 grid-cols-1'
                                                    "
                                                >
                                                    <template
                                                        v-for="(group, groupIndex) in item.groups"
                                                        :key="groupIndex"
                                                    >
                                                        <div class="space-y-3">
                                                            <!-- Group Header with Icon -->
                                                            <div
                                                                v-if="group.label"
                                                                class="flex items-center gap-2 px-3 pt-1 pb-2"
                                                            >
                                                                <component
                                                                    :is="group.icon"
                                                                    v-if="group.icon"
                                                                    class="w-4 h-4 text-primary"
                                                                />
                                                                <p
                                                                    class="text-sm font-semibold text-foreground"
                                                                >
                                                                    {{ group.label }}
                                                                </p>
                                                            </div>

                                                            <!-- Links with Descriptions -->
                                                            <div class="space-y-1">
                                                                <NavigationMenuLink
                                                                    v-for="subItem in group.links"
                                                                    :key="subItem.name"
                                                                    as-child
                                                                >
                                                                    <RouterLink
                                                                        :to="subItem.to"
                                                                        class="block p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 cursor-pointer group"
                                                                    >
                                                                        <div
                                                                            class="text-sm font-medium text-foreground group-hover:text-primary transition-colors"
                                                                        >
                                                                            {{ subItem.name }}
                                                                        </div>
                                                                        <div
                                                                            v-if="
                                                                                subItem.description
                                                                            "
                                                                            class="text-xs text-muted-foreground mt-0.5"
                                                                        >
                                                                            {{
                                                                                subItem.description
                                                                            }}
                                                                        </div>
                                                                    </RouterLink>
                                                                </NavigationMenuLink>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </div>
                                            </NavigationMenuContent>
                                        </template>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        <!-- Mobile Menu Button -->
                        <div class="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                @click="toggleMobileMenu"
                                class="cursor-pointer"
                            >
                                <X v-if="isMobileMenuOpen" class="h-6 w-6" />
                                <Menu v-else class="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <Transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="transform -translate-y-2 opacity-0"
                    enter-to-class="transform translate-y-0 opacity-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="transform translate-y-0 opacity-100"
                    leave-to-class="transform -translate-y-2 opacity-0"
                >
                    <div
                        v-if="isMobileMenuOpen"
                        class="mt-2 bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-border/50 lg:hidden max-h-[calc(100vh-120px)] overflow-y-auto"
                    >
                        <div class="flex flex-col p-4 space-y-1">
                            <template v-for="item in navigationItems" :key="item.name">
                                <!-- Link Type -->
                                <RouterLink
                                    v-if="item.type === 'link'"
                                    :to="item.to!"
                                    class="flex items-center w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg transition-colors duration-200 cursor-pointer"
                                    @click="isMobileMenuOpen = false"
                                >
                                    {{ item.name }}
                                </RouterLink>

                                <!-- Dropdown Type -->
                                <div v-else-if="item.type === 'dropdown'" class="space-y-1">
                                    <div
                                        class="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg group cursor-pointer"
                                    >
                                        <RouterLink
                                            v-if="item.to"
                                            :to="item.to"
                                            class="flex-1 text-left"
                                            @click="isMobileMenuOpen = false"
                                        >
                                            {{ item.name }}
                                        </RouterLink>
                                        <span v-else class="flex-1 text-left">{{ item.name }}</span>
                                        <button
                                            @click="toggleSubmenu(item.name.toLowerCase())"
                                            class="p-1 ml-2 rounded hover:bg-accent-foreground/10 transition-colors cursor-pointer"
                                        >
                                            <ChevronDown
                                                class="w-4 h-4 transition-transform duration-200"
                                                :class="{
                                                    'rotate-180':
                                                        activeSubmenu === item.name.toLowerCase(),
                                                }"
                                            />
                                        </button>
                                    </div>

                                    <!-- Submenu Items -->
                                    <Transition
                                        enter-active-class="transition duration-200 ease-out"
                                        enter-from-class="transform -translate-y-1 opacity-0"
                                        enter-to-class="transform translate-y-0 opacity-100"
                                        leave-active-class="transition duration-150 ease-in"
                                        leave-from-class="transform translate-y-0 opacity-100"
                                        leave-to-class="transform -translate-y-1 opacity-0"
                                    >
                                        <div
                                            v-if="activeSubmenu === item.name.toLowerCase()"
                                            class="px-2 py-2 space-y-3 bg-accent/30 rounded-lg ml-2 mr-2"
                                        >
                                            <template
                                                v-for="(group, groupIndex) in item.groups"
                                                :key="groupIndex"
                                            >
                                                <div class="space-y-1">
                                                    <!-- Group Label with Icon -->
                                                    <div
                                                        v-if="group.label"
                                                        class="flex items-center gap-2 px-3 pt-2 pb-1"
                                                    >
                                                        <component
                                                            :is="group.icon"
                                                            v-if="group.icon"
                                                            class="w-3.5 h-3.5 text-primary"
                                                        />
                                                        <p
                                                            class="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                                        >
                                                            {{ group.label }}
                                                        </p>
                                                    </div>

                                                    <!-- Links -->
                                                    <RouterLink
                                                        v-for="subItem in group.links"
                                                        :key="subItem.name"
                                                        :to="subItem.to"
                                                        class="block px-4 py-2.5 rounded-md hover:bg-accent transition-colors duration-200 cursor-pointer"
                                                        @click="isMobileMenuOpen = false"
                                                    >
                                                        <div
                                                            class="text-sm font-medium text-foreground"
                                                        >
                                                            {{ subItem.name }}
                                                        </div>
                                                        <div
                                                            v-if="subItem.description"
                                                            class="text-xs text-muted-foreground mt-0.5"
                                                        >
                                                            {{ subItem.description }}
                                                        </div>
                                                    </RouterLink>
                                                </div>
                                            </template>
                                        </div>
                                    </Transition>
                                </div>
                            </template>
                        </div>
                    </div>
                </Transition>
            </nav>
        </header>

        <!-- Main Content with Padding for Fixed Header -->
        <main class="w-full max-w-[100vw] relative pt-20">
            <slot />
        </main>

        <Footer />
    </div>
</template>
