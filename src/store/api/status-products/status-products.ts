import { api } from '..'

import type {
    StatusProductQueryParams,
    StatusProductResponse
} from './status-products.types'
import { getQueryParamString } from '@/utils'

export const statusProducts = api.injectEndpoints({
    endpoints: (build) => ({
        getStatusProducts: build.query<
            StatusProductResponse,
            Partial<StatusProductQueryParams>
        >({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `status-products/?${queryString}`
            },
            providesTags: ['StatusProducts']
        })
    })
})

export const { useGetStatusProductsQuery } = statusProducts
