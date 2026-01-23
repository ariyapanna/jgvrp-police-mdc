import { http, HttpMethod } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";

import { ApiEndpoint } from "@/types/api/endpoint";
import type { Ticket } from "@/types/ticket/ticket";

export async function getTickets(keyword?: string): Promise<ApiResponse<Ticket[]>> {
    return http<ApiResponse<Ticket[]>>(`${ApiEndpoint.TICKET}?search=${keyword}`);
}

export async function getTicket(id: number): Promise<ApiResponse<Ticket>> {
    return http<ApiResponse<Ticket>>(`${ApiEndpoint.TICKET}/${id}`);
}

export async function createTicket(targetName: string, reason: string, fine: number): Promise<ApiResponse<Ticket>> {
    return http<ApiResponse<Ticket>>(ApiEndpoint.TICKET, HttpMethod.POST, { name: targetName, reason, fine });
}

export async function deleteTicket(id: number): Promise<ApiResponse<null>> {
    return http<ApiResponse<null>>(`${ApiEndpoint.TICKET}/${id}`, HttpMethod.DELETE);
}