import { StringParam, useQueryParam } from 'use-query-params'

import { SearchBar } from '../components/search-bar'
import { RoleFilter } from '../users/role-filter'

import { columns } from './table/columns'
import { DataTable } from './table/table'
import { Skeleton } from '@/components/ui/skeleton'
import { tableConfig } from '@/config/table'
import { useGetDeletedUsersQuery } from '@/store/api/users/users'

export const UsersArchive = () => {
    const [search] = useQueryParam('search', StringParam)
    const [role] = useQueryParam('role', StringParam)

    const queryParams = {
        search: search || '',
        limit: tableConfig.pagination.pageSize,
        role: role === 'all' ? '' : role || ''
    }

    const { data, isLoading } = useGetDeletedUsersQuery(queryParams)

    return (
        <section className='mt-10 flex flex-col gap-y-4'>
            <div className='flex items-center justify-between gap-x-8'>
                <div className='flex items-center gap-x-4'>
                    {isLoading ? (
                        <Skeleton className='size-10 rounded-lg' />
                    ) : (
                        <div className='flex h-10 min-w-10 items-center justify-center rounded-lg bg-secondary px-1'>
                            {data?.count}
                        </div>
                    )}
                    <h1 className='text-3xl font-bold text-primary'>
                        Архів користувачів
                    </h1>
                </div>
            </div>

            <div className='flex items-center justify-between gap-x-4'>
                <SearchBar
                    resetOffset={false}
                    placeholder='Пошук користувачів'
                />
                <RoleFilter />
            </div>

            <DataTable
                columns={columns}
                data={data?.results || []}
                isLoading={isLoading}
            />
        </section>
    )
}
