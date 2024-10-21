import type { BaseQueryParams, Response } from '@/types/api'

type StatusProductName = 'delivering' | 'available' | 'pre_order'

interface StatusProductData {
    id: 0
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
