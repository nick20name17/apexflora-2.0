import { createListenerMiddleware } from '@reduxjs/toolkit'

import { api } from '@/store/api'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: api.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners()
        const rememberMe =
            localStorage.getItem('rememberMe') ?? sessionStorage.getItem('token')

        const isRememberMe = rememberMe ? JSON.parse(rememberMe).rememberMe : false

        if (action.payload.refresh && isRememberMe) {
            localStorage.setItem(
                'token',
                JSON.stringify({ refresh: action.payload.refresh })
            )
            localStorage.setItem('id', JSON.stringify({ id: action.payload.user?.id }))
        } else if (action.payload.refresh) {
            localStorage.setItem(
                'token',
                JSON.stringify({ refresh: action.payload.refresh })
            )
            localStorage.setItem('id', JSON.stringify({ id: action.payload.user?.id }))
        }
    }
})
