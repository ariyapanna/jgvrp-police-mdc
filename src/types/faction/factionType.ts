export const FactionType = {
    LSPD: 'Los Santos Police Department',
    LSFD: 'Los Santos Fire Department',
    LSSD: 'Los Santos Sheriffs Department',
}

export type FactionType = keyof typeof FactionType