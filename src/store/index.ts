import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import { listenerMiddleware } from './middleware/auth'
import { authReducer } from './slices/auth'
import { shopProductsReducer } from './slices/shop-products'
import { catalogueSlice } from '@/modules/catalogue/store/catalogue'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        catalogue: catalogueSlice.reducer,
        shopProducts: shopProductsReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .prepend(listenerMiddleware.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
