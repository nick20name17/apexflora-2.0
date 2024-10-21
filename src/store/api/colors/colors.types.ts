import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface ColorsData {
    id: number
    name: string
    hex: string
}

export type ColorsAddData = Omit<ColorsData, 'id'>

export type ColorsPatchData = PatchData<ColorsAddData>

export type ColorsResponse = Response<ColorsData>

export interface ColorsQueryParams extends BaseQueryParams {
    name: string
    search: string
    ordering: string
}
