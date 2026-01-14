import { http } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";

import { ApiEndpoint } from "@/types/api/endpoint";
import type { Person } from "@/types/person/person";
import type { PersonDetail } from "@/types/person/personDetail";

export async function getPersons(keyword: string): Promise<ApiResponse<Person[]>> 
{
    return http<ApiResponse<Person[]>>(`${ApiEndpoint.PERSON}?search=${keyword}`);
}

export async function getPersonDetail(id: number): Promise<ApiResponse<PersonDetail>>
{
    return http<ApiResponse<PersonDetail>>(`${ApiEndpoint.PERSON}/${id}`);
}