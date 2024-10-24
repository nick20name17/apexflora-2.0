import type { PatchData, Response } from '@/types/api'

export interface Contacts {
    id: number
    name: string
    email: string
    phone_number: string
    text: string
    is_read: boolean
    comment: string
}

export type ContactsAddData = Omit<Contacts, 'id' | 'is_read' | 'comment'>

export type ContactsPatchData = PatchData<ContactsAddData>

export type ContactsResponse = Response<Contacts>
