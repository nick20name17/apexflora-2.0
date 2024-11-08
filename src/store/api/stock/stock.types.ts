import type { Discount } from '../discounts/discounts.types'
import type { ShopProduct } from '../shop-products/shop-products.types'
import type { StatusProductData } from '../status-products/status-products.types'

import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface Stock {
    id: number
    shop_product: ShopProduct
    status: StatusProductData
    quantity: number
    retail_price: string
    stock_price: string
    promotion: boolean
    discounts: Discount[]
}

export interface StocksFullData {
    id: number
    shop_product: number
    status: number
    quantity: number
    quantity_sold: number
    retail_price: string
    stock_price: string
    promotion: boolean
    creator: number
    is_visible: boolean
    discounts: number[]
}

export interface StocksAddData {
    shop_product: number
    status: StatusProductData
    quantity: number
    quantity_sold: number
    retail_price: string
    stock_price: string
    promotion: boolean
    creator: number
    is_visible: boolean
    discounts: number[]
}

export type StocksPatchData = PatchData<StocksAddData>

export type StocksResponse = Response<Stock>

export interface StocksQueryParams extends BaseQueryParams {
    name: string
    storage: string
    status: string
    quantity: string
    quantity_sold: string
    retail_price: string
    stock_price: string
    promotion: string
    categories: string
    search: string
    ordering: string
}
