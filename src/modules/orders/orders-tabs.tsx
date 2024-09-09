import { useState } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const OrdersTabs = () => {
    const [status, setStatus] = useState('orders')

    return (
        <Tabs
            className='w-full'
            defaultValue={status}
            onValueChange={setStatus}
        >
            <TabsList className='h-12 w-full bg-secondary'>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='orders'
                >
                    Історія замовлень
                </TabsTrigger>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='pre-orders'
                >
                    Мої передзамовлення
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
