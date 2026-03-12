export const tourTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
]

export const tourPrograms = [
    'Bachelor of Science in Information Technology',
    'Bachelor of Science in Business Administration',
    'Bachelor of Science in Hospitality Management',
    'Bachelor of Elementary Education',
    'Bachelor of Secondary Education',
    'TESDA Programs',
    'Senior High School',
    'Not Sure Yet',
]

// Philippine holidays
export const getHolidays = (year: number) => [
    new Date(year, 1, 25),
    new Date(year, 3, 17),
    new Date(year, 3, 18),
    new Date(year, 4, 1),
    new Date(year, 5, 12),
    new Date(year, 7, 21),
    new Date(year, 7, 25),
    new Date(year, 10, 30),
    new Date(year, 11, 25),
    new Date(year, 11, 30),
    new Date(year, 11, 31),
]

export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
