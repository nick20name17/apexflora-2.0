import type { BonusProgram } from '../bonuses/bonuses.types'
import type { Coworker } from '../coworkers/coworkers.types'

import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export type Roles = 'admin' | 'manager' | 'client'
export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    phone_number: string
    company: string
    position: string
    role: Roles
    city: string
    service_manager: ServiceManager
    is_active: boolean
    code_1c: string
    bonus_program: BonusProgram
    coworkers: Coworker[]
    last_login: string
    is_deleted: boolean
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

export type UsersPatchData = PatchData<UsersAddData>

export type UsersResponse = Response<User>

export interface UserQueryParams extends BaseQueryParams {
    search: string
    role: string
    is_active: boolean
}
