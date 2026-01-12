export const Page = {
    HOME: 'home',
    PERSON_LOOKUP: 'person',
    VEHICLE_LOOKUP: 'vehicle',
    TICKETS: 'tickets',
    ARREST_WARRANTS: 'warrants',
    ARREST_RECORDS: 'arrests',
    BOLO: 'bolo',
    PHONE_TRACE: 'trace'
}
export type PageType = typeof Page[keyof typeof Page];