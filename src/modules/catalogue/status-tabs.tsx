import { Car, Clock, CreditCard } from 'lucide-react'
import { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetStatusProductsQuery } from '@/store/api/status-products/status-products'

export const getStatusProductsDisplay = (status: number) => {
    switch (status) {
        case 1:
            return {
                name: 'В дорозі',
                icon: <Car className='size-4' />
            }
        case 2:
            return {
                name: 'В наявності',
                icon: <CreditCard className='size-4' />
            }
        case 3:
            return {
                name: 'Передзамовлення',
                icon: <Clock className='size-4' />
            }
        default:
            return {
                name: 'В дорозі',
                icon: <Car className='size-4' />
            }
    }
}

export const StatusTabs = () => {
    const { data, isLoading } = useGetStatusProductsQuery({})

    const statusProducts = data?.results || []

    const [status = '1', setStatus] = useQueryParam('status', StringParam)

    useEffect(() => {
        setStatus(status)
    }, [])

    if (isLoading) {
        return <Skeleton className='h-12 w-full' />
    }

    return (
        <Tabs
            className='w-full'
            defaultValue={status!}
            onValueChange={setStatus}
        >
            <TabsList className='h-12 w-full bg-secondary'>
                {statusProducts.map((statusProduct) => {
                    const { name, icon } = getStatusProductsDisplay(statusProduct.id)

                    return (
                        <TabsTrigger
                            key={statusProduct.id}
                            className='flex- h-full flex-1 items-center gap-x-2 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                            value={statusProduct.id.toString()}
                        >
                            {icon}
                            {name}
                        </TabsTrigger>
                    )
                })}
            </TabsList>
        </Tabs>
    )
}
