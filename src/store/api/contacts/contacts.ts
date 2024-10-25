import { api } from '..'

import type {
    ContactsAddData,
    ContactsPatchData,
    ContactsQueryParams,
    ContactsResponse
} from './contacts.types'
import { getQueryParamString } from '@/utils'

export const contacts = api.injectEndpoints({
    endpoints: (build) => ({
        getContacts: build.query<ContactsResponse, Partial<ContactsQueryParams>>({
            query: (queryParams) => {
                const queryString = getQueryParamString(queryParams)
                return `contact-us?${queryString}`
            },
            providesTags: ['ContactUs']
        }),
        addContact: build.mutation<void, ContactsAddData>({
            query: (data) => ({
                url: `contact-us/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ContactUs']
        }),
        patchContact: build.mutation<void, ContactsPatchData>({
            query: ({ id, data }) => ({
                url: `contact-us/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['ContactUs']
        }),
        removeContact: build.mutation<void, number>({
            query: (id) => ({
                url: `contact-us/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['ContactUs']
        })
    })
})

export const {
    useGetContactsQuery,
    useAddContactMutation,
    usePatchContactMutation,
    useRemoveContactMutation
} = contacts
