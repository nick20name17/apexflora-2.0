import { api } from '..'

import type {
    OrderItemsAddData,
    OrderItemsPatchData,
    OrderItemsQueryParams,
    OrderItemsResponse
} from './order-items.types'
import { getQueryParamString } from '@/utils'

export const orderItems = api.injectEndpoints({
    endpoints: (build) => ({
        getOrderItems: build.query<OrderItemsResponse, Partial<OrderItemsQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `order-items/?${queryString}`
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
            providesTags: ['OrderItems']
        }),
        addOrderItems: build.mutation<void, Partial<OrderItemsAddData>>({
            query: (data) => ({
                url: `order-items/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['OrderItems', 'Orders']
        }),
        patchOrderItems: build.mutation<void, OrderItemsPatchData>({
            query: ({ data, id }) => ({
                url: `order-items/${id}/`,
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['OrderItems', 'Orders']
        }),
        removeOrderItems: build.mutation<void, number>({
            query: (id) => ({
                url: `order-items/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['OrderItems', 'Orders']
        })
    })
})

export const {
    useGetOrderItemsQuery,
    useAddOrderItemsMutation,
    usePatchOrderItemsMutation,
    useRemoveOrderItemsMutation
} = orderItems
