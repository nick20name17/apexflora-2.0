import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface Contacts {
    id: number
    name: string
    email: string
    phone_number: string
    text: string
    is_read: boolean
    comment: string
}

export type ContactsAddData = Omit<Contacts, 'id'>

export type ContactsPatchData = PatchData<ContactsAddData>

export type ContactsResponse = Response<Contacts>

export interface ContactsQueryParams extends BaseQueryParams {
    name: string
    search: string
}
