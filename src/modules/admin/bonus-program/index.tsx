import { StringParam, useQueryParam } from 'use-query-params'

import { SearchBar } from '../components/search-bar'

import { AddBonusProgramsModal } from './modals/add'
import { columns } from './table/columns'
import { DataTable } from './table/table'
import { Skeleton } from '@/components/ui/skeleton'
import { tableConfig } from '@/config/table'
import { useGetBonusProgramsQuery } from '@/store/api/bonuses/bonuses'

export const BonusPrograms = () => {
    const [search] = useQueryParam('search', StringParam)

    const { data, isLoading } = useGetBonusProgramsQuery({
        offset: 0,
        limit: tableConfig.pagination.pageSize,
        search: search || ''
    })

    return (
        <section className='mt-10 flex flex-col gap-y-4'>
            <div className='flex items-center justify-between gap-x-8'>
                <div className='flex items-center gap-x-4'>
                    {isLoading ? (
                        <Skeleton className='size-10 rounded-lg' />
                    ) : (
                        <div className='flex size-10 items-center justify-center rounded-lg bg-secondary'>
                            {data?.count}
                        </div>
                    )}
                    <h1 className='text-3xl font-bold text-primary'>Бонусні програми</h1>
                </div>
                <AddBonusProgramsModal />
            </div>

            <div>
                <SearchBar placeholder='Пошук бонусних програм' />
            </div>

            <DataTable
                columns={columns}
                data={data?.results || []}
                isLoading={isLoading}
            />
        </section>
    )
}
