import type { StockProduct } from '../orders/orders.types'

import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface Basket {
    id: number
    stock_product: StockProduct
    amount: number
    created_at: string
    creator: string
    discount: number
    visible_discount: string
}

export interface BasketAddData {
    stock_product: number
    amount: number
    creator: number
}

export type BasketPatchData = PatchData<BasketAddData>

export interface BasketsQueryParams extends BaseQueryParams {
    name: string
    status: string
    amount: string
    search: string
    ordering: string
}

export type BasketsResponse = Response<Basket>
