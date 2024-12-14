import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface DeliverAddress {
    id: number
    creator: number
    street: string
    city: string
    title: string
    description: string
}

export interface DeliverAddressQueryParams extends BaseQueryParams {
    creator?: number
}

export type DeliverAddressAddData = Omit<DeliverAddress, 'id'>

export type DeliverAddressPatchData = PatchData<DeliverAddressAddData>

export type DeliverAddressResponse = Response<DeliverAddress>
