import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface Discount {
    id: number
    name: string
    percentage: string
    start_date: string
    end_date: string
    shop?: number
    stocks?: number[]
}

export type DiscountsAddData = Omit<Discount, 'id'>

export type DiscountsPatchData = PatchData<DiscountsAddData>

export type DiscountsResponse = Response<Discount>

export interface DiscountsQueryParams extends BaseQueryParams {
    name: string
    search: string
    ordering: string
    country: string
}
