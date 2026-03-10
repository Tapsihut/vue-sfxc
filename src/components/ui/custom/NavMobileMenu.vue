<script setup lang="ts">
import { ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { NavigationItem } from '@/types/navigation'

const props = defineProps<{
    items: NavigationItem[]
}>()

const open = defineModel<boolean>('open', { required: true })

const activeSubmenu = ref<string | null>(null)

watch(open, (isOpen) => {
    if (!isOpen) activeSubmenu.value = null
})

const toggleSubmenu = (menuName: string) => {
    const key = menuName.toLowerCase()
    activeSubmenu.value = activeSubmenu.value === key ? null : key
}

const closeMenu = () => {
    open.value = false
}
</script>

<template>
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0"
    >
        <div
            v-if="open"
            class="mt-2 bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-border/50 lg:hidden max-h-[calc(100vh-120px)] overflow-y-auto"
        >
            <div class="flex flex-col p-4 space-y-1">
                <template v-for="item in props.items" :key="item.name">
                    <!-- Link Type -->
                    <RouterLink
                        v-if="item.type === 'link'"
                        :to="item.to!"
                        class="flex items-center w-full px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg transition-colors duration-200 cursor-pointer"
                        @click="closeMenu"
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
                                @click="closeMenu"
                            >
                                {{ item.name }}
                            </RouterLink>
                            <span v-else class="flex-1 text-left">{{ item.name }}</span>
                            <button
                                class="p-1 ml-2 rounded hover:bg-accent-foreground/10 transition-colors cursor-pointer"
                                @click="toggleSubmenu(item.name)"
                            >
                                <ChevronDown
                                    class="w-4 h-4 transition-transform duration-200"
                                    :class="{
                                        'rotate-180': activeSubmenu === item.name.toLowerCase(),
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
                                        <template
                                            v-for="subItem in group.links"
                                            :key="subItem.name"
                                        >
                                            <a
                                                v-if="subItem.external"
                                                :href="subItem.to as string"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="block px-4 py-2.5 rounded-md hover:bg-accent transition-colors duration-200 cursor-pointer"
                                            >
                                                <div class="text-sm font-medium text-foreground">
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
                                                class="block px-4 py-2.5 rounded-md hover:bg-accent transition-colors duration-200 cursor-pointer"
                                                @click="closeMenu"
                                            >
                                                <div class="text-sm font-medium text-foreground">
                                                    {{ subItem.name }}
                                                </div>
                                                <div
                                                    v-if="subItem.description"
                                                    class="text-xs text-muted-foreground mt-0.5"
                                                >
                                                    {{ subItem.description }}
                                                </div>
                                            </RouterLink>
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </Transition>
                    </div>
                </template>
            </div>
        </div>
    </Transition>
</template>
