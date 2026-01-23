import { http, HttpMethod } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";

import { ApiEndpoint } from "@/types/api/endpoint";
import type { BOLOData } from "@/types/bolo/BOLOData";
import type { CreateBOLO } from "@/types/bolo/createBOLO";

export async function getBOLOs(): Promise<ApiResponse<BOLOData[]>>
{
    return http<ApiResponse<BOLOData[]>>(ApiEndpoint.BOLO);
}

export async function createBOLO(data: CreateBOLO): Promise<ApiResponse<BOLOData>>
{
    return http<ApiResponse<BOLOData>>(ApiEndpoint.BOLO, HttpMethod.POST, data);
}

export async function deleteBOLO(id: number): Promise<ApiResponse<null>>
{
    return http<ApiResponse<null>>(`${ApiEndpoint.BOLO}/${id}`, HttpMethod.DELETE);
}