import { api } from '..'

import type {
    PasswordChange,
    PasswordReset,
    PasswordResetConfirmData
} from './passwords.types'

export const passwords = api.injectEndpoints({
    endpoints: (build) => ({
        passwordReset: build.mutation<void, PasswordReset>({
            query: (userData) => ({
                url: 'users/password-reset/',
                method: 'POST',
                body: userData
            })
        }),
        passwordResetConfirm: build.mutation<void, PasswordResetConfirmData>({
            query: (data) => ({
                url: `users/password-reset-confirm/${data.uidb64}/${data.token}/`,
                method: 'POST',
                body: data
            })
        }),
        passwordChange: build.mutation<void, PasswordChange>({
            query: ({ data, id }) => ({
                url: `users/${id}/password-change/`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    usePasswordResetMutation,
    usePasswordResetConfirmMutation,
    usePasswordChangeMutation
} = passwords
