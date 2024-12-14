import { useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { SearchBar } from '../components/search-bar'

import { AddOrderModal } from './actions/add'
import { DownloadCSVBtn } from './dowload-csv-btn'
import { AdminOrderCard } from './order-card'
import { OrdersTabs } from './orders-tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { tableConfig } from '@/config/table'
import { OrderCardSkeleton } from '@/modules/orders'
import { useGetOrdersQuery } from '@/store/api/orders/orders'

const statusHeading: Record<string, string> = {
    'pre-orders': 'Передзамовлення',
    supplier: 'Надхоження',
    orders: 'Замовлення'
}

export const Orders = () => {
    const [offset] = useState(0)

    const [search] = useQueryParam('search', StringParam)
    const [status] = useQueryParam('status', StringParam)

    const {
        currentData: orders,
        isLoading,
        isFetching
    } = useGetOrdersQuery({
        offset,
        limit: tableConfig.pagination.pageSize,
        search: search || '',
        is_preorder: status === 'pre-orders',
        is_supplier: status === 'supplier'
    })

    return (
        <section className='mt-10 flex flex-col gap-y-4'>
            <div className='flex items-center justify-between gap-x-8'>
                <div className='flex items-center gap-x-4'>
                    {isLoading ? (
                        <Skeleton className='size-10 rounded-lg' />
                    ) : (
                        <div className='flex h-10 min-w-10 items-center justify-center rounded-lg bg-secondary px-1'>
                            {orders?.count}
                        </div>
                    )}
                    <h1 className='text-3xl font-bold text-primary'>
                        {statusHeading[status || 'orders']}
                    </h1>
                </div>
                <div className='flex items-center gap-4'>
                    {/* <AddFileModal /> */}
                    <DownloadCSVBtn />
                    <AddOrderModal />
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
                <OrdersTabs />
            </div>

            <ScrollArea className='h-[calc(100vh-260px)] [&>*>div]:space-y-4'>
                {isLoading ? (
                    <OrderCardSkeleton />
                ) : orders?.count ? (
                    orders?.results.map((order) => (
                        <AdminOrderCard
                            order={order}
                            key={order.id}
                        />
                    ))
                ) : (
                    !isFetching && (
                        <div className='flex h-20 items-center justify-center rounded-md border-2 border-secondary p-2 text-center text-2xl text-primary'>
                            Нічого не знайдено
                        </div>
                    )
                )}
            </ScrollArea>
        </section>
    )
}
