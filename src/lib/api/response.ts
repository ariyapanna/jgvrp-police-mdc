export interface ApiResponse<T> 
{
    success: boolean,
    data: T,
    message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]>
{
    count: number
}