import { api } from '..'

import type {
    ShopProductQueryParams,
    ShopProductResponse,
    ShopProductsAddData,
    ShopProductsPatchData,
    SupplierOrderData,
    SupplierOrderResponse
} from './shop-products.types'
import { getQueryParamString } from '@/utils'

export const shopProducts = api.injectEndpoints({
    endpoints: (build) => ({
        getShopProducts: build.query<
            ShopProductResponse,
            Partial<ShopProductQueryParams>
        >({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `shop-products/?${queryString}`
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
            providesTags: ['ShopProducts']
        }),
        addShopProducts: build.mutation<void, Partial<ShopProductsAddData>>({
            query: (data) => ({
                url: `shop-products/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ShopProducts']
        }),
        addSupplierOrder: build.mutation<SupplierOrderResponse, SupplierOrderData>({
            query: (data) => ({
                url: `shop_products/import-supplier-order/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ShopProducts', 'Orders']
        }),
        patchShopProducts: build.mutation<void, ShopProductsPatchData>({
            query: ({ data, id }) => ({
                url: `shop-products/${id}/`,
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['ShopProducts']
        }),
        removeShopProducts: build.mutation<void, number>({
            query: (id) => ({
                url: `shop-products/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['ShopProducts']
        })
    })
})

export const {
    useGetShopProductsQuery,
    useAddShopProductsMutation,
    usePatchShopProductsMutation,
    useAddSupplierOrderMutation,
    useRemoveShopProductsMutation
} = shopProducts
