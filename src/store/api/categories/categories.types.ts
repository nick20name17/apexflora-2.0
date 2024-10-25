import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface Categories {
    id: number
    name: string
    parent: number
    children: Categories[]
}

export interface CategoriesQueryParams extends BaseQueryParams {
    name: string
    ordering: string
    only_parent: boolean
    ids: string
    level: number
    search: string
}

export type CategoriessAddData = Omit<Categories, 'id' | 'children'>

export type CategoriessPatchData = PatchData<CategoriessAddData>

export type CategoriessResponse = Response<Categories>
