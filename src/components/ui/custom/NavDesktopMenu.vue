<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import type { NavigationItem } from '@/types/navigation'

const props = defineProps<{
    items: NavigationItem[]
}>()

const router = useRouter()

const getLinksCount = (item: NavigationItem): number =>
    item.groups?.reduce((total, group) => total + group.links.length, 0) ?? 0

const useTwoColumns = (item: NavigationItem): boolean =>
    (item.groups?.length ?? 0) > 1 || getLinksCount(item) > 6
</script>

<template>
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem v-for="item in props.items" :key="item.name">
                <!-- Link Type -->
                <NavigationMenuLink
                    v-if="item.type === 'link'"
                    as-child
                    :class="navigationMenuTriggerStyle() + ' bg-transparent! shadow-none! ring-0!'"
                >
                    <RouterLink :to="item.to!" class="cursor-pointer">
                        {{ item.name }}
                    </RouterLink>
                </NavigationMenuLink>

                <!-- Dropdown Type -->
                <template v-else-if="item.type === 'dropdown'">
                    <NavigationMenuTrigger
                        class="cursor-pointer"
                        @click="item.to ? router.push(item.to) : undefined"
                    >
                        {{ item.name }}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div
                            class="grid gap-3 p-6"
                            :class="useTwoColumns(item) ? 'w-150 grid-cols-2' : 'w-100 grid-cols-1'"
                        >
                            <template v-for="(group, groupIndex) in item.groups" :key="groupIndex">
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
                                        <p class="text-sm font-semibold text-foreground">
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
                                            <a
                                                v-if="subItem.external"
                                                :href="subItem.to as string"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="block p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 cursor-pointer group"
                                            >
                                                <div
                                                    class="text-sm font-medium text-foreground group-hover:text-primary transition-colors"
                                                >
                                                    {{ subItem.name }}
                                                </div>
                                                <div
                                                    v-if="subItem.description"
                                                    class="text-xs text-muted-foreground mt-0.5"
                                                >
                                                    {{ subItem.description }}
                                                </div>
                                            </a>
                                            <RouterLink
                                                v-else
                                                :to="subItem.to"
                                                class="block p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 cursor-pointer group"
                                            >
                                                <div
                                                    class="text-sm font-medium text-foreground group-hover:text-primary transition-colors"
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
</template>
