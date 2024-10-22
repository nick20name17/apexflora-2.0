import { useState } from 'react'
import { Link } from 'react-router-dom'

import { OrderCard } from '@/components/shared'
import InfiniteScroll from '@/components/shared/infinite-scroll'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { tableConfig } from '@/config/table'
import { routes } from '@/constants/routes'
import { useGetOrdersQuery } from '@/store/api/orders/orders'
import { Loader2 } from 'lucide-react'
import { OrdersTabs } from './orders-tabs'

export const Orders = () => {
    const [status, setStatus] = useState('orders')
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const { data: orders, isLoading, isFetching } = useGetOrdersQuery({
        offset,
        limit: tableConfig.pagination.pageSize,
        is_preorder: status === 'pre-orders',
    })

    const next = () => {
        setOffset((prev) => prev + tableConfig.pagination.pageSize)

        if (offset + tableConfig.pagination.pageSize > orders?.count!) {
            setHasMore(false)
        }
    }

    const onStatusChange = (status: string) => {
        setStatus(status)
        setOffset(0)
    }

    return (
        <div className='w-full py-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={routes.main}>Головна</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Замовлення</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='py-4'>
                <h1 className='text-[32px] font-bold text-primary'>Замовлення</h1>
            </div>
            <div className='border-t border-t-primary pt-4'>
                <OrdersTabs
                    onStatusChange={onStatusChange}
                    status={status}
                />

                <ScrollArea
                    className='mt-4 h-[calc(100vh-230px)] overflow-y-auto'
                    id='products'
                >
                   <>
                   <ul className='grid grid-cols-1 gap-y-2'>
                        {orders?.count && !isLoading ? (
                            orders?.results.map((order) => (
                                <li
                                    className='cursor-pointer'
                                    key={order.id}
                                >
                                    <OrderCard order={order} />
                                </li>
                            ))
                        ) : isFetching ? <OrderCardSkeleton/ > :(
                            <div className='flex h-20 items-center justify-center rounded-md border-2 border-secondary p-2 text-center text-2xl text-primary'>
                                Нічого не знайдено
                            </div>
                        )}
                    </ul>
                    <InfiniteScroll
                    hasMore={hasMore}
                    isLoading={isFetching}
                    next={next}
                    threshold={1}
                >
                    {hasMore && !isLoading ? (
                        <Loader2 className='mx-auto my-6 size-6 animate-spin text-primary' />
                    ) : null}
                </InfiniteScroll>

                   </>
                </ScrollArea>
            </div>
        </div>
    )
}

export const OrderCardSkeleton = () => {
    return (
        <div className='grid grid-cols-1 gap-2'>
            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className='flex h-20 items-center justify-center rounded-md'
                >
                    <Skeleton className='h-full w-full rounded-sm object-cover' />
                </div>
            ))}
        </div>
    )
}
