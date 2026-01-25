export const ApiEndpoint = {
    USER: 'me',
    UNITS: 'units',
    PERSON: 'person',
    VEHICLE: 'vehicle',
    ARREST_WARRANT: 'warrant',
    ARREST_RECORD: 'arrest',
    TICKET: 'ticket',
    BOLO: 'bolo',
    TRACE_PHONE: 'trace',
    CLOSE_MDC: 'close'
}

export type ApiEndpoint = typeof ApiEndpoint[keyof typeof ApiEndpoint];