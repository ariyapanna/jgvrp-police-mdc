import type { ApiEndpoint } from "@/types/api/endpoint";

const API_URL = import.meta.env.VITE_API_URL;

export const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
} as const;
export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];

let token: string | null = null;

function getToken(): string | null 
{
    if(!token)
    {
        const params = new URLSearchParams(window.location.search);
        token = params.get('token');
    }
    return token;
}

function buildBasicAuth(token: string): string 
{
  return `Basic ${btoa(`${token}:`)}`;
}

export async function http<T>(endpoint: ApiEndpoint, payload?: any, method: HttpMethod = HttpMethod.GET): Promise<T>
{
    const token = getToken();
    const config: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            // ...(token && { "x-auth-token": token }),
            ...(token && { Authorization: buildBasicAuth(token) }),
        }
    };

    if(payload !== undefined && method !== HttpMethod.GET)
        config.body = JSON.stringify(payload);

    let response: Response;
    try 
    {
        response = await fetch(`${API_URL}/${endpoint}`, config);
    }
    catch
    {
        throw {
            status: null,
            message: 'Too many requests or unable to connect to server. Please try again later.'
        };
    }
    console.log(response);

    if(!response.ok)
    {
        let message = 'Unexpected error occured';
        try
        {
            const error = await response.json().catch(() => ({}));
            if (error?.message) 
                message = error.message;
        }
        catch(_) {}

        if(response.status === 500)
            message = 'Internal server error';

        throw {
            status: response.status,
            message
        };
    }

    return response.json();
}