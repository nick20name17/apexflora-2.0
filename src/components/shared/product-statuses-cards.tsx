import { Car, ShoppingBasket } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'

import { cn } from '@/lib/utils'

export const ProductStatusesCards = () => {
    return (
        <div className='grid grid-cols-3 gap-2 pt-4'>
            <ProductStatusCard key={1} />
            <ProductStatusCard key={2} />
            <ProductStatusCard key={3} />
        </div>
    )
}

const ProductStatusCard = () => {
    const [addedToCart, setAddedToCart] = useState(false)

    const onAddingToCart = () => {
        setAddedToCart(!addedToCart)
    }

    return (
        <div className='w-full rounded-lg bg-secondary/20 p-4 text-sm text-background'>
            <div className='flex items-center justify-between gap-x-2 pb-2'>
                <div className='flex items-center gap-x-2'>
                    <Car className='size-6 text-accent' />

                    <div className='flex flex-col'>
                        <span>В наявності</span>
                        <span className='text-xs'>1288 шт</span>
                    </div>
                </div>
                <div className='flex h-10 items-center justify-center rounded-md bg-accent p-2 text-foreground'>
                    -10%
                </div>
            </div>
            <div className='flex items-center justify-between gap-x-2 border-y border-y-background/60 py-2'>
                <div>
                    Ціна за шт: <span className='text-accent'>96,14 ₴</span>
                </div>
                <div>
                    Сума: <span className='text-accent'>9 544,55₴ </span>
                </div>
            </div>
            <div className='flex items-center justify-between gap-x-2 border-t border-t-background/60 pt-2'>
                <div>
                    Ціна за шт: <span className='text-accent'>96,14 ₴</span>
                </div>
                <Button
                    onClick={onAddingToCart}
                    className={cn(
                        'w-28',
                        addedToCart ? 'bg-[#FF7300] hover:bg-[#FF7300]/85' : ''
                    )}
                    variant='accent'
                    size='sm'
                >
                    <ShoppingBasket className='mr-2 size-4' />
                    {addedToCart ? 'Видалити' : 'В кошик'}
                </Button>
            </div>
        </div>
    )
}
