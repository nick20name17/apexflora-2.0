import { useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { SearchBar } from '../components/search-bar'

import { AddShopProductModal } from './modals/add'
import { Skeleton } from '@/components/ui/skeleton'
import { tableConfig } from '@/config/table'
import { useGetOrdersQuery } from '@/store/api/orders/orders'

export const Orders = () => {
    const [offset] = useState(0)

    const [search] = useQueryParam('search', StringParam)

    const { data, isLoading } = useGetOrdersQuery({
        offset,
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
                        <div className='flex h-10 min-w-10 items-center justify-center rounded-lg bg-secondary px-1'>
                            {data?.count}
                        </div>
                    )}
                    <h1 className='text-3xl font-bold text-primary'>Замовлення</h1>
                </div>
                <div className='flex items-center gap-4'>
                    {/* <AddFileModal /> */}
                    <AddShopProductModal />
                </div>
            </div>

            <div className='space-y-4'>
                <SearchBar placeholder='Пошук замовлень' />
                {/* <StatusTabs />

                <div className='flex items-center justify-between gap-4'>
                    <CategoryFilter />
                    <HasImagesFilter />
                    <PromoFilter />
                    <HasCode1cFilter />
                    <IsVisibleFilter />
                </div> */}
            </div>

            {/* <ProductsList
                shopProducts={data}
                offset={offset}
                isDataFetching={isFetching}
                isDataLoading={isLoading}
                setOffset={setOffset}
            /> */}
        </section>
    )
}
