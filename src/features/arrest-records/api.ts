import { http } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";

import { ApiEndpoint } from "@/types/api/endpoint";
import type { ArrestRecord } from "@/types/arrest-record/arrestRecord";
import type { ArrestRecordDetail } from "@/types/arrest-record/arrestRecordDetail";

export async function getWarrants(keyword?: string): Promise<ApiResponse<ArrestRecord[]>> {
    return http<ApiResponse<ArrestRecord[]>>(`${ApiEndpoint.ARREST_RECORD}?search=${keyword}`);
}

export async function getWarrant(id: number): Promise<ApiResponse<ArrestRecordDetail>> {
    return http<ApiResponse<ArrestRecordDetail>>(`${ApiEndpoint.ARREST_RECORD}/${id}`);
}