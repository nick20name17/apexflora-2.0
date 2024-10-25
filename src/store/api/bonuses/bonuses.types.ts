import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface BonusLimit {
    id: number
    accumulation_limit: number
    discount: number
}

export type BonusLimitAddData = Omit<BonusLimit, 'id'>

export type BonusLimitPatchData = PatchData<BonusLimitAddData>

export type BonusLimitResponse = Response<BonusLimit>

export interface BonusLimitsQueryParams extends BaseQueryParams {
    search: string
}

export interface BonusProgram {
    id: number
    title: string
    default: boolean
    limits: BonusLimit[]
}

export type BonusProgramAddData = Omit<BonusProgram, 'id' | 'limits'> & {
    limits: number[]
}

export type BonusProgramPatchData = PatchData<BonusProgramAddData>

export type BonusProgramResponse = Response<BonusProgram>

export interface BonusProgramsQueryParams extends BaseQueryParams {
    search: string
}
