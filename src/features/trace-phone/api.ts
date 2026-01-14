import { http } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";
import { ApiEndpoint } from "@/types/api/endpoint";
import type { TracePhone } from "@/types/trace-phone/tracePhone";

export async function tracePhone(phone: string): Promise<ApiResponse<TracePhone>> {
    return http<ApiResponse<TracePhone>>(`${ApiEndpoint.TRACE_PHONE}/${phone}`);
}