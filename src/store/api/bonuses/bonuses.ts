import { api } from '..'

import type {
    BonusLimitAddData,
    BonusLimitPatchData,
    BonusLimitResponse,
    BonusLimitsQueryParams,
    BonusProgramAddData,
    BonusProgramPatchData,
    BonusProgramResponse,
    BonusProgramsQueryParams
} from './bonuses.types'
import { getQueryParamString } from '@/utils'

export const bonusLimits = api.injectEndpoints({
    endpoints: (build) => ({
        getBonusLimits: build.query<BonusLimitResponse, Partial<BonusLimitsQueryParams>>({
            query: (queryParams) => {
                const queryString = getQueryParamString(queryParams)
                return `bonuses-limits?${queryString}`
            },
            providesTags: ['BonusLimits']
        }),
        addBonusLimit: build.mutation<void, BonusLimitAddData>({
            query: (data) => ({
                url: `bonuses-limits/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['BonusLimits']
        }),
        patchBonusLimit: build.mutation<void, BonusLimitPatchData>({
            query: ({ id, data }) => ({
                url: `bonuses-limits/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['BonusLimits']
        }),
        removeBonusLimit: build.mutation<void, number>({
            query: (id) => ({
                url: `bonuses-limits/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['BonusLimits']
        }),
        getBonusPrograms: build.query<BonusProgramResponse, BonusProgramsQueryParams>({
            query: (queryParams) => {
                const queryString = getQueryParamString(queryParams)
                return `bonuses-programs?${queryString}`
            },
            providesTags: ['BonusPrograms']
        }),
        addBonusProgram: build.mutation<void, BonusProgramAddData>({
            query: (data) => ({
                url: `bonuses-programs/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['BonusPrograms']
        }),
        patchBonusProgram: build.mutation<void, BonusProgramPatchData>({
            query: ({ id, data }) => ({
                url: `bonuses-programs/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['BonusPrograms']
        }),
        removeBonusProgram: build.mutation<void, number>({
            query: (id) => ({
                url: `bonuses-programs/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['BonusPrograms']
        })
    })
})

export const {
    useAddBonusLimitMutation,
    useGetBonusLimitsQuery,
    usePatchBonusLimitMutation,
    useRemoveBonusLimitMutation,
    useGetBonusProgramsQuery,
    useAddBonusProgramMutation,
    usePatchBonusProgramMutation,
    useRemoveBonusProgramMutation
} = bonusLimits
