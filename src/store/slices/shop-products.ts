import { createSlice } from '@reduxjs/toolkit'

import { shopProducts } from './../api/shop-products/shop-products'

const initialState = {
    count: 0
}

const shopProductsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addMatcher(
            shopProducts.endpoints.getShopProducts.matchFulfilled,
            (state, action) => {
                state.count = action.payload.count
            }
        )
    }
})

export const shopProductsReducer = shopProductsSlice.reducer

export const selectCount = (state: { count: number }) => state?.count
