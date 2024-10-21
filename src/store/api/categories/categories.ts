import { api } from '..'

import type {
    Categories,
    CategoriesQueryParams,
    CategoriessAddData,
    CategoriessPatchData,
    CategoriessResponse
} from './categories.types'
import { getQueryParamString } from '@/utils'

export const categories = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<CategoriessResponse, Partial<CategoriesQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `categories/?${queryString}`
            },
            providesTags: ['Categories']
        }),
        getAllCategories: build.query<Categories[], Partial<CategoriesQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `categories/all/?${queryString}`
            },
            providesTags: ['Categories']
        }),
        addCategories: build.mutation<void, Partial<CategoriessAddData>>({
            query: (data) => ({
                url: `categories/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Categories']
        }),
        patchCategories: build.mutation<void, CategoriessPatchData>({
            query: ({ data, id }) => ({
                url: `categories/${id}/`,
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['Categories']
        }),
        removeCategories: build.mutation<void, number>({
            query: (id) => ({
                url: `categories/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Categories']
        })
    })
})

export const {
    useGetCategoriesQuery,
    useGetAllCategoriesQuery,
    useAddCategoriesMutation,
    usePatchCategoriesMutation,
    useRemoveCategoriesMutation
} = categories
