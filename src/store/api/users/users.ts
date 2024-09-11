import { api } from '..'

import type { UsersAddData, UsersPatchData, UsersResponse } from './users.types'
import type { BaseQueryParams } from '@/types/api'
import { getQueryParamString } from '@/utils'

export const users = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<UsersResponse, Partial<BaseQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `users/?${queryString}`
            },
            providesTags: ['Users']
        }),

        addUser: build.mutation<void, Partial<UsersAddData>>({
            query: (data) => ({
                url: `users/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        }),
        patchUser: build.mutation<void, UsersPatchData>({
            query: ({ data, id }) => ({
                url: `users/${id}/`,
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['Users']
        }),
        removeUser: build.mutation<void, number>({
            query: (id) => ({
                url: `users/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useGetUsersQuery,

    useAddUserMutation,
    usePatchUserMutation,
    useRemoveUserMutation
} = users
