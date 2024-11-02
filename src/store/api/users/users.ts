import { api } from '..'

import type {
    UserQueryParams,
    UsersAddData,
    UsersPatchData,
    UsersResponse
} from './users.types'
import { getQueryParamString } from '@/utils'

export const users = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<UsersResponse, Partial<UserQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `users/?${queryString}`
            },
            providesTags: ['Users']
        }),
        getDeletedUsers: build.query<UsersResponse, Partial<UserQueryParams>>({
            query: (params) => {
                const queryString = getQueryParamString(params)
                return `users/deleted/?${queryString}`
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
    useGetDeletedUsersQuery,
    useAddUserMutation,
    usePatchUserMutation,
    useRemoveUserMutation
} = users
