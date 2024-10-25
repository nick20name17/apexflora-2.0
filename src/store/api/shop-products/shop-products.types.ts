import type { Categories } from '../categories/categories.types'
import type { Discount } from '../discounts/discounts.types'
import type { Country } from '../producers/producers.types'

import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface ShopProduct {
    id: number
    origin_id: string
    height: number
    weight_size: number
    stage: number
    packaging_of: number
    quality: string
    image: string
    in_wish_list: boolean
    width: number
    length: number
    code_1c: string
    main_property: string
    producer: Producer
    product: Product
    colors: Color[]
    stocks: Stock[]
}

export interface Producer {
    id: number
    name: string
    country: Country
}

export interface Product {
    id: number
    name: string
    ukr_name: string
    description: string
    category: Categories
}

export interface Color {
    id: number
    name: string
    hex: string
}

export interface Stock {
    id: number
    shop_product: InnerShopProduct
    status: Status
    quantity: number
    retail_price: string
    stock_price: string
    visible_discount: number
    promotion: boolean
    is_visible: boolean
    discounts: Discount[]
}

export interface InnerShopProduct {
    id: number
    product: number
    colors: number[]
    origin_id: string
    producer: number
    height: number
    weight_size: number
    stage: number
    packaging_of: number
    quality: string
    image: string
    code_1c: string
    width: number
    length: number
    main_property: string
}

export interface Status {
    id: number
    name: string
}

export type ShopProductsAddData = Omit<ShopProduct, 'id'> & {
    producer: number
    product: number
    colors: number[]
    stocks: number
}

export type ShopProductsPatchData = PatchData<ShopProductsAddData>

export interface ShopProductQueryParams extends BaseQueryParams {
    weight_size: string
    stage: string
    packaging_of: string
    quality: string
    code_1c: string
    origin_id: string
    name: string
    category: string
    country: string
    producer: string
    quantity: string
    price: string
    height: string
    startswith: string
    categories: string
    statuses: string
    countries: string
    in_wish_list: boolean
    colors: string
    multicolor: string
    has_discounts: boolean
    promotion: boolean
    has_code_1c: string
    is_visible: string
    search: string
    ordering: string
}

export type ShopProductResponse = Response<ShopProduct>
