import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ShopProductQueryParams } from '@/store/api/shop-products/shop-products.types'

interface ActiveFilter {
    id: string
    label: string
}

export interface CatalogueState {
    catalogueQueryParams: Partial<ShopProductQueryParams>
    categories: ActiveFilter[]
}

const initialState: CatalogueState = {
    catalogueQueryParams: {},
    categories: []
}

export const catalogueSlice = createSlice({
    name: 'catalogue',
    initialState,
    reducers: {
        setCurrentQueryParams(
            state,
            action: PayloadAction<Partial<ShopProductQueryParams>>
        ) {
            state.catalogueQueryParams = action.payload
        },
        setCategories(state, action: PayloadAction<ActiveFilter[]>) {
            state.categories = action.payload
        }
    }
})

export const { setCurrentQueryParams, setCategories } = catalogueSlice.actions
