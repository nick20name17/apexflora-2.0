import type { Categories } from '../categories/categories.types'

import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface Product {
    id: number
    name: string
    ukr_name: string
    description: string
    category: Categories
}

export interface ProductAddData extends Omit<Product, 'id' | 'category'> {
    category: number
}

export type ProductPatchData = PatchData<ProductAddData>

export type ProductResponse = Response<Product>

export interface ProductQueryParams extends BaseQueryParams {
    search: string
    ordering: string
}
