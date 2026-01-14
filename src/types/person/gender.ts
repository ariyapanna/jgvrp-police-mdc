export const Gender =
{
    MALE: 'Male',
    FEMALE: 'Female'
}

export type Gender = typeof Gender[keyof typeof Gender];