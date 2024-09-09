import { Car, Clock, CreditCard } from 'lucide-react'
import { useState } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const CategoryTabs = () => {
    const [category, setCategory] = useState('delivery')

    return (
        <Tabs
            id='category-tabs'
            className='w-full'
            defaultValue={category}
            onValueChange={setCategory}
        >
            <TabsList className='h-12 w-full bg-secondary'>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='delivery'
                >
                    <Car className='mr-2 size-4' />В дорозі
                </TabsTrigger>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='pickup'
                >
                    <CreditCard className='mr-2 size-4' />В наявності
                </TabsTrigger>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='pre-order'
                >
                    <Clock className='mr-2 size-4' />
                    Передзамовлення
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
