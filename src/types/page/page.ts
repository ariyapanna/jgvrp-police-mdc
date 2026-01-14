export const Page = {
    HOME: 'home',
    PERSON_LOOKUP: 'person',
    PERSON_DETAIL: 'person-detail',
    VEHICLE_LOOKUP: 'vehicle',
    TICKETS: 'tickets',
    ARREST_WARRANTS: 'warrants',
    ARREST_RECORDS: 'arrests',
    BOLO: 'bolo',
    PHONE_TRACE: 'trace',
    QR_CODE: 'qr-code',
}
export type PageType = typeof Page[keyof typeof Page];