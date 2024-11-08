import { api } from '..'

import type {
    StocksAddData,
    StocksFullData,
    StocksPatchData,
    StocksQueryParams,
    StocksResponse
} from './stock.types'
import { getQueryParamString } from '@/utils'

export const stocks = api.injectEndpoints({
    endpoints: (build) => ({
        getStocks: build.query<StocksResponse, Partial<StocksQueryParams>>({
            query: (queryParams) => {
                const queryString = getQueryParamString(queryParams)
                return `stock?${queryString}`
            },
            providesTags: ['Stocks']
        }),
        getStockFullData: build.query<StocksFullData, number>({
            query: (id) => {
                return `stock/${id}/full-data/`
            },
            providesTags: ['Stocks']
        }),
        addStock: build.mutation<void, StocksAddData>({
            query: (data) => ({
                url: `stock/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Stocks']
        }),
        patchStock: build.mutation<void, Partial<StocksPatchData>>({
            query: ({ id, data }) => ({
                url: `stock/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Stocks']
        }),
        removeStock: build.mutation<void, number>({
            query: (id) => ({
                url: `stock/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Stocks']
        })
    })
})

export const {
    useGetStocksQuery,
    useGetStockFullDataQuery,
    useAddStockMutation,
    usePatchStockMutation,
    useRemoveStockMutation
} = stocks
