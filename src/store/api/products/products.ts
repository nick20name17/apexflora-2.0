import { api } from '..'

import type {
    ProductAddData,
    ProductPatchData,
    ProductQueryParams,
    ProductResponse
} from './products.types'
import { getQueryParamString } from '@/utils'

export const statusProducts = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<ProductResponse, Partial<ProductQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `products/?${queryString}`
            },
            providesTags: ['Products']
        }),
        addProduct: build.mutation<void, Partial<ProductAddData>>({
            query: (data) => ({
                url: `products/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Products']
        }),
        patchProduct: build.mutation<void, ProductPatchData>({
            query: (data) => ({
                url: `products/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Products']
        })
    })
})

export const { useGetProductsQuery, useAddProductMutation, usePatchProductMutation } =
    statusProducts
