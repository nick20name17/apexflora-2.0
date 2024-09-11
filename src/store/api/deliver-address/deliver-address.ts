import { api } from '..'

import type {
    DeliverAddressAddData,
    DeliverAddressPatchData,
    DeliverAddressQueryParams,
    DeliverAddressResponse
} from './deliver-address.types'
import { getQueryParamString } from '@/utils'

export const deliverAddress = api.injectEndpoints({
    endpoints: (build) => ({
        getDeliverAddress: build.query<DeliverAddressResponse, DeliverAddressQueryParams>(
            {
                query: (params) => {
                    const queryString = getQueryParamString(params)
                    return `deliver-addresses/?${queryString}`
                },
                providesTags: ['DeliverAddress']
            }
        ),
        addDeliverAddress: build.mutation<void, Partial<DeliverAddressAddData>>({
            query: (data) => ({
                url: `deliver-addresses/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['DeliverAddress']
        }),
        patchDeliverAddress: build.mutation<void, DeliverAddressPatchData>({
            query: ({ data, id }) => ({
                url: `deliver-addresses/${id}/`,
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['DeliverAddress']
        }),
        removeDeliverAddress: build.mutation<void, number>({
            query: (id) => ({
                url: `deliver-addresses/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['DeliverAddress']
        })
    })
})

export const {
    useGetDeliverAddressQuery,
    useAddDeliverAddressMutation,
    usePatchDeliverAddressMutation,
    useRemoveDeliverAddressMutation
} = deliverAddress
