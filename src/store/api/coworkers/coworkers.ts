import { api } from '..'

import type {
    CoworkerQueryParams,
    CoworkersAddData,
    CoworkersPatchData,
    CoworkersResponse
} from './coworkers.types'
import { getQueryParamString } from '@/utils'

export const coworkers = api.injectEndpoints({
    endpoints: (build) => ({
        getCoworkers: build.query<CoworkersResponse, CoworkerQueryParams>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `users-coworkers/?${queryString}`
            },
            providesTags: ['Coworkers']
        }),

        addCoworker: build.mutation<void, Partial<CoworkersAddData>>({
            query: (data) => ({
                url: `users-coworkers/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Coworkers']
        }),
        patchCoworker: build.mutation<void, CoworkersPatchData>({
            query: ({ data, id }) => ({
                url: `users-coworkers/${id}/`,
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['Coworkers']
        }),
        removeCoworker: build.mutation<void, number>({
            query: (id) => ({
                url: `users-coworkers/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Coworkers']
        })
    })
})

export const {
    useGetCoworkersQuery,
    useAddCoworkerMutation,
    usePatchCoworkerMutation,
    useRemoveCoworkerMutation
} = coworkers
