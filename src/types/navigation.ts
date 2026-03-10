import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export interface NavigationLink {
    name: string
    to: RouteLocationRaw
    description?: string
    external?: boolean
}

export interface NavigationGroup {
    label?: string
    links: NavigationLink[]
    icon?: Component
}

export interface NavigationItem {
    name: string
    type: 'link' | 'dropdown'
    to?: RouteLocationRaw
    groups?: NavigationGroup[]
}
