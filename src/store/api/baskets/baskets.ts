import { api } from '..'

import type {
    BasketAddData,
    BasketPatchData,
    BasketsQueryParams,
    BasketsResponse
} from './baskets.types'
import { getQueryParamString } from '@/utils'

export const basket = api.injectEndpoints({
    endpoints: (build) => ({
        getBaskets: build.query<BasketsResponse, Partial<BasketsQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `baskets/?${queryString}`
            },
            // serializeQueryArgs: ({ queryArgs }) => {
            //     const { offset, ...newQueryArgs } = queryArgs

            //     return newQueryArgs
            // },
            // merge: (currentCache, newItems, { arg }) => {
            //     if (arg?.offset! < arg.limit!) {
            //         return newItems
            //     }

            //     return {
            //         ...currentCache,
            //         ...newItems,
            //         results: [...currentCache.results, ...newItems.results]
            //     }
            // },
            // forceRefetch({ currentArg, previousArg }) {
            //     return currentArg?.offset !== previousArg?.offset
            // },
            providesTags: ['Basket']
        }),
        patchBasket: build.mutation<void, BasketPatchData>({
            query: ({ id, data }) => ({
                url: `baskets/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Basket']
        }),
        addBasket: build.mutation<void, Partial<BasketAddData>>({
            query: (data) => ({
                url: `baskets/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Basket']
        }),
        removeBasket: build.mutation<void, number>({
            query: (id) => ({
                url: `baskets/${id}/`,
                method: 'DELETE'
            }),
            // async onQueryStarted(id, { dispatch, queryFulfilled }) {
            //     const queryParams = store.getState().catalogue.catalogueQueryParams

            //     const patchResult = dispatch(
            //         basket.util.updateQueryData('getBaskets', queryParams, (draft) => {
            //             const basketProduct = draft.results.find((item) => item.id === id)

            //             if (basketProduct) {
            //                 const index = draft.results.indexOf(basketProduct)
            //                 draft.results.splice(index, 1)
            //             }
            //         })
            //     )

            //     try {
            //         await queryFulfilled
            //     } catch {
            //         patchResult.undo()
            //     }
            // },
            invalidatesTags: ['ShopProducts', 'Basket']
        })
    })
})

export const {
    useGetBasketsQuery,
    useAddBasketMutation,
    usePatchBasketMutation,
    useRemoveBasketMutation
} = basket
