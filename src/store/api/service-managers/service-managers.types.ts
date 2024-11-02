import type { BaseQueryParams, PatchData, Response } from '@/types/api'

export interface ServiceManager {
    id: number
    client: number
    manager: number
}

export interface ServiceManagerQueryParams extends BaseQueryParams {}

export type ServiceManagersAddData = Omit<ServiceManager, 'id'>

export type ServiceManagersPatchData = PatchData<ServiceManagersAddData>

export type ServiceManagersResponse = Response<ServiceManager>
