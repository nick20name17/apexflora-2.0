import { StringParam, useQueryParam } from 'use-query-params'

import { SearchBar } from '../components/search-bar'

import { AddColorModal } from './modals/add'
import { columns } from './table/columns'
import { DataTable } from './table/table'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetAllColorsQuery } from '@/store/api/colors/colors'

export const Colors = () => {
    const [search] = useQueryParam('search', StringParam)

    const { data, isLoading } = useGetAllColorsQuery({ search: search || '' })

    return (
        <section className='mt-10 flex flex-col gap-y-4'>
            <div className='flex items-center justify-between gap-x-8'>
                <div className='flex items-center gap-x-4'>
                    {isLoading ? (
                        <Skeleton className='size-10 rounded-lg' />
                    ) : (
                        <div className='flex size-10 items-center justify-center rounded-lg bg-secondary'>
                            {data?.length}
                        </div>
                    )}
                    <h1 className='text-3xl font-bold text-primary'>Кольори</h1>
                </div>
                <AddColorModal />
            </div>

            <div>
                <SearchBar
                    resetOffset={false}
                    placeholder='Пошук кольорів'
                />
            </div>

            <DataTable
                columns={columns}
                data={data || []}
                isLoading={isLoading}
            />
        </section>
    )
}
