import type { Coworker } from '../coworkers/coworkers.types'

import type { PatchData, Response } from '@/types/api'

export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    phone_number: string
    company: string
    position: string
    role: string
    city: string
    service_manager: ServiceManager
    is_active: boolean
    code_1c: string
    bonus_program: BonusProgram
    coworkers: Coworker[]
    last_login: string
}

export type UsersAddData = Omit<
    User,
    'id' | 'is_active' | 'last_login' | 'coworkers' | 'service_manager' | 'bonus_program'
> & {
    service_manager: number
    bonus_program: number
    password: string
}

export interface ServiceManager {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
}

export interface BonusProgram {
    id: number
    title: string
    default: boolean
    limits: Limits
}

export interface Limits {
    id: number
    accumulation_limit: number
    discount: number
}

export type UsersPatchData = PatchData<UsersAddData>

export type UsersResponse = Response<User>
