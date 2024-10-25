import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface Country {
    code: string
    flag: string
    name: string
}

export interface ProducersData {
    id: number
    name: string
    country: Country
}

export interface ProducersCountriesData {
    id: number
    name: string
    country: string
}

export type ProducersAddData = Omit<ProducersCountriesData, 'id'>

export type ProducersPatchData = PatchData<ProducersAddData>

export type ProducersResponse = Response<ProducersData>

export interface ProducersQueryParams extends BaseQueryParams {
    name: string
    search: string
    ordering: string
    country: string
}
