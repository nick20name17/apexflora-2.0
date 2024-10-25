import { api } from '..'

import type {
    Discount,
    DiscountsAddData,
    DiscountsPatchData,
    DiscountsQueryParams,
    DiscountsResponse
} from './discounts.types'
import { getQueryParamString } from '@/utils'

export const discounts = api.injectEndpoints({
    endpoints: (build) => ({
        getAllDiscounts: build.query<Discount[], void>({
            query: () => 'discounts/all/',
            providesTags: ['Discounts']
        }),

        getDiscounts: build.query<DiscountsResponse, Partial<DiscountsQueryParams>>({
            query: (queryParams) => {
                const queryString = getQueryParamString(queryParams)
                return `discounts?${queryString}`
            },
            providesTags: ['Discounts']
        }),
        getDiscount: build.query<Discount, number>({
            query: (id) => `discounts/${id}`,
            providesTags: ['Discounts']
        }),
        addDiscount: build.mutation<void, DiscountsAddData>({
            query: (data) => ({
                url: `discounts/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Discounts']
        }),
        patchDiscount: build.mutation<void, DiscountsPatchData>({
            query: ({ id, data }) => ({
                url: `discounts/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Discounts']
        }),
        removeDiscount: build.mutation<void, number>({
            query: (id) => ({
                url: `discounts/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Discounts']
        })
    })
})

export const {
    useGetAllDiscountsQuery,
    useGetDiscountQuery,
    useRemoveDiscountMutation,
    usePatchDiscountMutation,
    useAddDiscountMutation,
    useGetDiscountsQuery
} = discounts
