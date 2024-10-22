import { api } from '..'

import type {
    OrdersAddData,
    OrdersPatchData,
    OrdersQueryParams,
    OrdersResponse
} from './orders.types'
import { getQueryParamString } from '@/utils'

export const orders = api.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query<OrdersResponse, Partial<OrdersQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `orders/?${queryString}`
            },
            serializeQueryArgs: ({ queryArgs }) => {
                const { offset, ...newQueryArgs } = queryArgs

                return newQueryArgs
            },
            merge: (currentCache, newItems, { arg }) => {
                if (arg?.offset! < arg.limit!) {
                    return newItems
                }

                return {
                    ...currentCache,
                    ...newItems,
                    results: [...currentCache.results, ...newItems.results]
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.offset !== previousArg?.offset
            },
            providesTags: ['Orders']
        }),
        addOrders: build.mutation<void, Partial<OrdersAddData>>({
            query: (data) => ({
                url: `orders/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Orders']
        }),
        patchOrders: build.mutation<void, OrdersPatchData>({
            query: ({ data, id }) => ({
                url: `orders/${id}/`,
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['Orders']
        }),
        removeOrders: build.mutation<void, number>({
            query: (id) => ({
                url: `orders/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Orders']
        })
    })
})

export const {
    useGetOrdersQuery,
    useAddOrdersMutation,
    usePatchOrdersMutation,
    useRemoveOrdersMutation
} = orders
