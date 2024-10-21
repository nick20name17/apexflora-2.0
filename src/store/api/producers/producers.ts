import { api } from '..'

import type {
    ProducersAddData,
    ProducersData,
    ProducersPatchData,
    ProducersQueryParams,
    ProducersResponse
} from './producers.types'
import { getQueryParamString } from '@/utils'

export const producers = api.injectEndpoints({
    endpoints: (build) => ({
        getAllProducers: build.query<ProducersData[], void>({
            query: () => 'producers/all/',
            providesTags: ['Producers']
        }),
        getProducersCountries: build.query<ProducersData[], void>({
            query: (queryParams) => {
                const queryString = getQueryParamString(queryParams)
                return `producers/countries?${queryString}`
            },
            providesTags: ['Producers']
        }),
        getProducers: build.query<ProducersResponse, ProducersQueryParams>({
            query: (queryParams) => {
                const queryString = getQueryParamString(queryParams)
                return `producers?${queryString}`
            },
            providesTags: ['Producers']
        }),
        getColor: build.query<ProducersData, number>({
            query: (id) => `producers/${id}`,
            providesTags: ['Producers']
        }),
        addColor: build.mutation<void, ProducersAddData>({
            query: (data) => ({
                url: `producers/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Producers']
        }),
        patchColor: build.mutation<void, ProducersPatchData>({
            query: ({ id, data }) => ({
                url: `producers/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Producers']
        }),
        removeColor: build.mutation<void, number>({
            query: (id) => ({
                url: `producers/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Producers']
        })
    })
})

export const {
    useGetAllProducersQuery,
    useGetProducersCountriesQuery,
    useAddColorMutation,
    useGetColorQuery,
    useGetProducersQuery,
    useRemoveColorMutation,
    usePatchColorMutation
} = producers
