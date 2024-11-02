import { api } from '..'

import type {
    ServiceManagerQueryParams,
    ServiceManagersAddData,
    ServiceManagersPatchData,
    ServiceManagersResponse
} from './service-managers.types'
import { getQueryParamString } from '@/utils'

export const serviceManager = api.injectEndpoints({
    endpoints: (build) => ({
        getServiceManager: build.query<
            ServiceManagersResponse,
            ServiceManagerQueryParams
        >({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `service-managers/?${queryString}`
            },
            providesTags: ['ServiceManager']
        }),

        addSeriviceManager: build.mutation<void, Partial<ServiceManagersAddData>>({
            query: (data) => ({
                url: `service-managers/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ServiceManager']
        }),
        patchSeriviceManager: build.mutation<void, ServiceManagersPatchData>({
            query: ({ data, id }) => ({
                url: `service-managers/${id}/`,
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['ServiceManager']
        }),
        removeSeriviceManager: build.mutation<void, number>({
            query: (id) => ({
                url: `service-managers/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['ServiceManager']
        })
    })
})

export const {
    useGetServiceManagerQuery,
    useAddSeriviceManagerMutation,
    usePatchSeriviceManagerMutation,
    useRemoveSeriviceManagerMutation
} = serviceManager
