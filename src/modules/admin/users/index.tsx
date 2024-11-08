import { StringParam, useQueryParam } from 'use-query-params'

import { SearchBar } from '../components/search-bar'

import { ActiveFilter } from './active-filter'
import { AddUserModal } from './modals/add'
import { RoleFilter } from './role-filter'
import { usersColumns } from './table/columns'
import { DataTable } from './table/table'
import { Skeleton } from '@/components/ui/skeleton'
import { tableConfig } from '@/config/table'
import { useGetUsersQuery } from '@/store/api/users/users'

export const Users = () => {
    const [search] = useQueryParam('search', StringParam)
    const [role] = useQueryParam('role', StringParam)
    const [isActive] = useQueryParam('is_active', StringParam)

    const queryParams = {
        search: search || '',
        limit: tableConfig.pagination.pageSize,
        is_active: isActive === 'all' ? undefined : isActive === 'active',
        role: role === 'all' ? '' : role || ''
    }

    const { data, isLoading } = useGetUsersQuery(queryParams)

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
                    <h1 className='text-3xl font-bold text-primary'>Користувачі</h1>
                </div>
                <AddUserModal />
            </div>

            <div className='flex items-center justify-between gap-x-4'>
                <SearchBar
                    resetOffset={false}
                    placeholder='Пошук користувачів'
                />
                <ActiveFilter />
                <RoleFilter />
            </div>

            <DataTable
                columns={usersColumns}
                data={data?.results || []}
                isLoading={isLoading}
            />
        </section>
    )
}
