import { api } from '..'

import { shopProducts } from '../shop-products/shop-products'

import type { WishListAddData } from './wish-list.types'
import { store } from '@/store'

export const wishList = api.injectEndpoints({
    endpoints: (build) => ({
        addToWishList: build.mutation<void, Partial<WishListAddData>>({
            query: (data) => ({
                url: `wish-list/`,
                method: 'POST',
                body: data
            }),
            async onQueryStarted({ shop_product }, { dispatch, queryFulfilled }) {
                const queryParams = store.getState().catalogue.catalogueQueryParams

                const patchResult = dispatch(
                    shopProducts.util.updateQueryData(
                        'getShopProducts',
                        queryParams,
                        (draft) => {
                            const shopProduct = draft.results.find(
                                (shopProduct) => shopProduct.id === shop_product
                            )
                            if (shopProduct) shopProduct.in_wish_list = true
                        }
                    )
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: ['ShopProducts']
        }),
        removeFromWishList: build.mutation<void, number>({
            query: (id) => ({
                url: `wish-list/${id}/delete/`,
                method: 'DELETE'
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const queryParams = store.getState().catalogue.catalogueQueryParams

                const patchResult = dispatch(
                    shopProducts.util.updateQueryData(
                        'getShopProducts',
                        queryParams,
                        (draft) => {
                            const shopProduct = draft.results.find(
                                (shopProduct) => shopProduct.id === id
                            )

                            if (shopProduct) shopProduct.in_wish_list = false
                        }
                    )
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: ['ShopProducts']
        })
    })
})

export const { useAddToWishListMutation, useRemoveFromWishListMutation } = wishList
