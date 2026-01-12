export const ApiEndpoint = {
    GET_USER: 'me',
    GET_UNITS: 'units',
}

export type ApiEndpoint = typeof ApiEndpoint[keyof typeof ApiEndpoint];