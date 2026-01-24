import { http, HttpMethod } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";

import { ApiEndpoint } from "@/types/api/endpoint";
import type { ArrestWarrant } from "@/types/arrest-warrant/arrestWarrant";

export async function getWarrants(keyword?: string): Promise<ApiResponse<ArrestWarrant[]>> {
    return http<ApiResponse<ArrestWarrant[]>>(`${ApiEndpoint.ARREST_WARRANT}?search=${keyword}`);
}

export async function getWarrant(id: number): Promise<ApiResponse<ArrestWarrant>> {
    return http<ApiResponse<ArrestWarrant>>(`${ApiEndpoint.ARREST_WARRANT}/${id}`);
}

export async function createWarrant(targetName: string, reason: string, duration: number, fine: number): Promise<ApiResponse<ArrestWarrant>> {
    return http<ApiResponse<ArrestWarrant>>(ApiEndpoint.ARREST_WARRANT, HttpMethod.POST, { name: targetName, reason, duration, fine });
}

export async function updateWarrant(id: number, reason: string, duration: number, fine: number): Promise<ApiResponse<ArrestWarrant>> {
    return http<ApiResponse<ArrestWarrant>>(`${ApiEndpoint.ARREST_WARRANT}/${id}`, HttpMethod.PUT, { reason, duration, fine });
}

export async function deleteWarrant(id: number): Promise<ApiResponse<null>> {
    return http<ApiResponse<null>>(`${ApiEndpoint.ARREST_WARRANT}/${id}`, HttpMethod.DELETE);
}