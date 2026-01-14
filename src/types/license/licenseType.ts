export const LicenseType = {
    ID_CARD: 'ID',
    DRIVER: 'Driver',
    FIREARM: 'Firearm'
} as const

export type LicenseType = typeof LicenseType[keyof typeof LicenseType]