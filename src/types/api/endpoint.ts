export const ApiEndpoint = {
    USER: 'me',
    UNITS: 'units',
    PERSON: 'person',
    VEHICLE: 'vehicle',
    TRACE_PHONE: 'trace'
}

export type ApiEndpoint = typeof ApiEndpoint[keyof typeof ApiEndpoint];