import type { Categories } from '../categories/categories.types'
import type { ShopProduct } from '../shop-products/shop-products.types'
import type { StatusProductData } from '../status-products/status-products.types'

import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface OrderItem {
    id: number
    stock_product: StockProduct
    amount: number
    price: number
    creator: number
    discount: number
    percentage: number
}

export interface StockProduct {
    id: number
    shop_product: ShopProduct
    status: StatusProductData
    quantity: number
    retail_price: string
    stock_price: string
    promotion: boolean
}

export interface Product {
    id: number
    name: string
    ukr_name: string
    description: string
    category: Categories
}

export interface Recipient {
    id: number
    creator: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
}

export interface Comment {
    id: number
    order: number
    text: string
    creator: string
}

export interface Address {
    id: number
    creator: number
    street: string
    city: string
    title: string
    description: string
}

export type OrderItemsAddData = Partial<OrderItem>

export type OrderItemsPatchData = PatchData<OrderItemsAddData>

export interface OrderItemsQueryParams extends BaseQueryParams {
    creator: string
    is_supplier: boolean
    created_at: string
    is_preorder: boolean
    stock_status: string
    is_visible: boolean
    search: string
    ordering: string
}

export type OrderItemsResponse = Response<OrderItem>
