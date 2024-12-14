import { StringParam, useQueryParam } from 'use-query-params'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const defaultStatus = 'orders'

export const OrdersTabs = () => {
    const [status, setStatus] = useQueryParam('status', StringParam)

    return (
        <Tabs
            className='w-full'
            defaultValue={status || defaultStatus}
            onValueChange={setStatus}
        >
            <TabsList className='h-12 w-full bg-secondary'>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='orders'
                >
                    Замовлення
                </TabsTrigger>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='pre-orders'
                >
                    Передзамовлення
                </TabsTrigger>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='supplier'
                >
                    Надхоження
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
