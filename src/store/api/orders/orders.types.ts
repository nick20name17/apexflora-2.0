import type { Categories } from '../categories/categories.types'
import type { ShopProduct } from '../shop-products/shop-products.types'
import type { StatusProductData } from '../status-products/status-products.types'

import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export type Statuses =
    | 'pending'
    | 'approval'
    | 'shipped'
    | 'delivered'
    | ('canceled' & (string & {}))

export interface Order {
    id: number
    order_items: OrderItem[]
    status: Statuses
    created_at: string
    recipient: Recipient
    creator: string
    comments: Comment[]
    discount: number
    address: Address
    is_visible: boolean
    is_supplier: boolean
}

export interface OrdersAddData {
    status: Statuses
    recipient: number
    creator: number
    is_supplier: boolean
    discount: string
    address: number
}

export type OrdersPatchData = PatchData<OrdersAddData>

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

export interface OrdersQueryParams extends BaseQueryParams {
    creator: string
    is_supplier: boolean
    created_at: string
    is_preorder: boolean
    stock_status: string
    is_visible: boolean
    search: string
    ordering: string
}

export type OrdersResponse = Response<Order>
