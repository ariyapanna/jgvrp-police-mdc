import { http } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";

import { ApiEndpoint } from "@/types/api/endpoint";
import type { Vehicle } from "@/types/vehicle/vehicle";

export async function getVehicles(keyword?: string): Promise<ApiResponse<Vehicle[]>> {
    return http<ApiResponse<Vehicle[]>>(`${ApiEndpoint.VEHICLE}?search=${keyword}`);
}