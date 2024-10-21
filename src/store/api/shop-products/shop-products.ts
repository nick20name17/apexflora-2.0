import { api } from '..'

import type {
    ShopProductQueryParams,
    ShopProductResponse,
    ShopProductsAddData,
    ShopProductsPatchData
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
    useRemoveShopProductsMutation
} = shopProducts
