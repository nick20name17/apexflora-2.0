import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface Coworker {
    id: number
    creator: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
}

export interface CoworkerQueryParams extends BaseQueryParams {
    creator: number
}

export type CoworkersAddData = Omit<Coworker, 'id'> & {
    creator: number
}

export type CoworkersPatchData = PatchData<CoworkersAddData>

export type CoworkersResponse = Response<Coworker>
