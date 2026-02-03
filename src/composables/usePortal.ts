// Mock implementation of usePortal composable
import { ref, computed } from 'vue'

// Shared global state
const currentRole = ref<string | null>(localStorage.getItem('user-role'))

// Composable function
export function usePortal() {
  const setRole = (role: string) => {
    currentRole.value = role
    localStorage.setItem('user-role', role)
  }

  // Logout function to clear the user role
  const logout = () => {
    currentRole.value = null
    localStorage.removeItem('user-role')
  }

  // Computed properties
  const userRole = computed(() => currentRole.value)

  // Format the portal type for display
  const portalType = computed(() => {
    if (!currentRole.value) return ''
    return currentRole.value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  })

  return {
    userRole,
    portalType,
    setRole,
    logout,
  }
}
