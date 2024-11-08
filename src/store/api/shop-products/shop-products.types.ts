import type { ColorsData } from '../colors/colors.types'
import type { Discount } from '../discounts/discounts.types'
import type { Product } from '../orders/orders.types'
import type { ProducersData } from '../producers/producers.types'
import type { StatusProductData } from '../status-products/status-products.types'

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
    producer: ProducersData
    product: Product
    colors: ColorsData[]
    stocks: Stock[]
}

export interface Stock {
    id: number
    shop_product: InnerShopProduct
    status: StatusProductData
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

export interface ShopProductsAddData {
    product: number
    colors: number[]
    origin_id: string
    producer: number
    height: number
    weight_size: number
    stage: number
    packaging_of: number
    quality: string
    code_1c: string
    width: number
    length: number
    main_property: string
    image: FormData
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
    promotion: boolean | null
    has_code_1c: boolean | null
    has_image: boolean | null
    is_visible: boolean | null
    search: string
    ordering: string
}

export interface SupplierOrderData {
    product_status: number
    file: FormData
    category: string
}

export interface SupplierOrderResponse {
    amount_total: number
    count_updated: number
    not_updated: number
    order_id: number
}

export type ShopProductResponse = Response<ShopProduct> & {
    possible_letters: string[]
}
