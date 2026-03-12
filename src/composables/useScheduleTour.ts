import { ref, computed } from 'vue'
import { getHolidays, monthNames, dayNames } from '@/data/scheduleTour'

export interface TourForm {
    firstName: string
    lastName: string
    email: string
    phone: string
    tourDate: Date | null
    tourTime: string
    visitors: string
    program: string
    message: string
}

const emptyForm = (): TourForm => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tourDate: null,
    tourTime: '',
    visitors: '1',
    program: '',
    message: '',
})

export const useScheduleTour = () => {
    const form = ref<TourForm>(emptyForm())
    const isSubmitted = ref(false)
    const isLoading = ref(false)

    const currentDate = new Date()
    const selectedMonth = ref(currentDate.getMonth())
    const selectedYear = ref(currentDate.getFullYear())

    const daysInMonth = computed(() =>
        new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate(),
    )

    const firstDayOfMonth = computed(() =>
        new Date(selectedYear.value, selectedMonth.value, 1).getDay(),
    )

    const calendarDays = computed(() => {
        const days: (number | null)[] = []
        for (let i = 0; i < firstDayOfMonth.value; i++) days.push(null)
        for (let day = 1; day <= daysInMonth.value; day++) days.push(day)
        return days
    })

    const isWeekend = (day: number | null) => {
        if (!day) return false
        const d = new Date(selectedYear.value, selectedMonth.value, day).getDay()
        return d === 0 || d === 6
    }

    const isHoliday = (day: number | null) => {
        if (!day) return false

        const currentYearHolidays = getHolidays(selectedYear.value)

        return currentYearHolidays.some(
            (h) => h.getDate() === day && h.getMonth() === selectedMonth.value,
        )
    }

    const isPastDate = (day: number | null) => {
        if (!day) return false
        const date = new Date(selectedYear.value, selectedMonth.value, day)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date < today
    }

    const isDisabled = (day: number | null) => isWeekend(day) || isHoliday(day) || isPastDate(day)

    const isSelected = (day: number | null) => {
        if (!day || !form.value.tourDate) return false
        const date = new Date(selectedYear.value, selectedMonth.value, day)
        return (
            date.getDate() === form.value.tourDate.getDate() &&
            date.getMonth() === form.value.tourDate.getMonth() &&
            date.getFullYear() === form.value.tourDate.getFullYear()
        )
    }

    const selectDate = (day: number | null) => {
        if (!day || isDisabled(day)) return
        form.value.tourDate = new Date(selectedYear.value, selectedMonth.value, day)
    }

    const previousMonth = () => {
        if (selectedMonth.value === 0) {
            selectedMonth.value = 11
            selectedYear.value--
        } else {
            selectedMonth.value--
        }
    }

    const nextMonth = () => {
        if (selectedMonth.value === 11) {
            selectedMonth.value = 0
            selectedYear.value++
        } else {
            selectedMonth.value++
        }
    }

    const formatDate = (date: Date | null) => {
        if (!date) return ''
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}`
    }

    const handleSubmit = async () => {
        if (!form.value.tourDate) {
            alert('Please select a tour date')
            return
        }
        isLoading.value = true
        setTimeout(() => {
            isLoading.value = false
            isSubmitted.value = true
        }, 1500)
    }

    const resetForm = () => {
        form.value = emptyForm()
        isSubmitted.value = false
    }

    return {
        form,
        isSubmitted,
        isLoading,
        selectedMonth,
        selectedYear,
        monthNames,
        dayNames,
        calendarDays,
        isWeekend,
        isHoliday,
        isPastDate,
        isDisabled,
        isSelected,
        selectDate,
        previousMonth,
        nextMonth,
        formatDate,
        handleSubmit,
        resetForm,
    }
}
