export const LicenseStatus = {
    ACTIVE: 'Active',
    EXPIRED: 'Expired'
} as const 

export type LicenseStatus = typeof LicenseStatus[keyof typeof LicenseStatus];