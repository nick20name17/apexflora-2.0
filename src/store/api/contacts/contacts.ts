import { api } from '..'

import type { ContactsAddData } from './contacts.types'

export const producers = api.injectEndpoints({
    endpoints: (build) => ({
        addContact: build.mutation<void, ContactsAddData>({
            query: (data) => ({
                url: `contact-us/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ContactUs']
        })
    })
})

export const { useAddContactMutation } = producers
