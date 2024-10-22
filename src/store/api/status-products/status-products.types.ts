import type { BaseQueryParams, Response } from '@/types/api'

type StatusProductName = 'delivering' | 'available' | 'pre_order'

export interface StatusProductData {
    id: number
    name: StatusProductName
}

export type StatusProductResponse = Response<StatusProductData>

export interface StatusProductQueryParams extends BaseQueryParams {
    search: string
    ordering: string
    limit: number
    offset: number
    name: StatusProductName
}
