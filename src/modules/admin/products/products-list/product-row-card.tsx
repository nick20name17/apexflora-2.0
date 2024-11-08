import { Car, Ship, TimerIcon } from 'lucide-react'

import { EditShopProductModal } from '../modals/edit'
import { RemoveShopProductModal } from '../modals/remove'

import { ProductStatusesCards } from './product-statuses-cards'
import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { ShopProduct } from '@/store/api/shop-products/shop-products.types'

interface ProductRowCardProps {
    isOpen: boolean
    onToggle: () => void
    shopProduct: ShopProduct
}

export const ProductRowCard = ({
    isOpen,
    onToggle,
    shopProduct
}: ProductRowCardProps) => {
    // const userId = useAppSelector(selectUser)?.id

    const isVisiblie = shopProduct?.stocks.some((stock) => stock.is_visible)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={onToggle}
            className={cn(
                'rounded-md border-2 border-secondary p-2 transition-colors data-[state=open]:border-primary data-[state=open]:bg-primary',
                isVisiblie ? '' : 'opacity-65'
            )}
        >
            <article className='grid h-20 grid-cols-[2fr_2fr_1fr_1fr] gap-x-6'>
                <div className='flex h-full items-center gap-x-2'>
                    <div className='h-20 w-28'>
                        {shopProduct.image ? (
                            <img
                                className='h-full w-full rounded-sm object-cover'
                                src={shopProduct?.image}
                                alt={shopProduct?.product?.name}
                            />
                        ) : (
                            <Skeleton className='h-full w-full rounded-sm object-cover' />
                        )}
                    </div>
                    <div className='flex flex-col gap-y-0.5'>
                        <h1
                            className={cn(
                                'font-bold',
                                isOpen ? 'text-secondary' : 'text-primary'
                            )}
                        >
                            {shopProduct.product?.ukr_name}
                        </h1>
                        <span
                            className={cn(
                                'flex items-center gap-x-2 text-sm',
                                isOpen ? 'text-secondary' : 'text-foreground/50'
                            )}
                        >
                            <img
                                className='size-3.5'
                                src={shopProduct.producer?.country?.flag}
                                alt={shopProduct.producer?.country?.name}
                            />
                            {shopProduct?.producer?.name}
                        </span>
                    </div>
                </div>

                <div
                    className={cn(
                        'flex items-center justify-end gap-x-4',
                        isOpen ? 'text-secondary' : 'text-foreground/50'
                    )}
                >
                    <div className='flex flex-col'>
                        {isOpen ? <span className='text-accent'>Колір</span> : null}
                        <span>Білий</span>
                    </div>

                    <div className='flex flex-col'>
                        {isOpen ? <span className='text-accent'>Висота</span> : null}
                        <span>{shopProduct.height}см</span>
                    </div>
                    <div className='flex flex-col'>
                        {isOpen ? <span className='text-accent'>Якість</span> : null}
                        <span>{shopProduct.quality}</span>
                    </div>
                    <div className='flex flex-col'>
                        {isOpen ? (
                            <span className='text-accent'>Вагa/d&nbsp;⌀</span>
                        ) : null}
                        <span>{shopProduct.weight_size || '-'}</span>
                    </div>
                    {isOpen ? (
                        <div className='flex flex-col'>
                            <span className='text-accent'>Зрілість</span>
                            <span>{shopProduct.stage}</span>
                        </div>
                    ) : null}
                    {isOpen ? (
                        <div className='flex flex-col'>
                            <span className='text-accent'>Артикул</span>
                            <span>{shopProduct.origin_id}</span>
                        </div>
                    ) : null}
                </div>

                <div className='flex items-center justify-end gap-x-4'>
                    <div
                        className={cn(
                            'flex items-center gap-x-2',
                            isOpen ? 'text-accent' : 'text-foreground/60'
                        )}
                    >
                        <Ship className='size-6' />
                        <TimerIcon className='size-6' />
                        <Car className='size-6' />
                    </div>
                    {isOpen ? null : <span className='text-primary'> 29 ₴</span>}
                </div>

                <div className='flex items-center justify-end gap-x-2'>
                    <EditShopProductModal shopProduct={shopProduct} />
                    <RemoveShopProductModal shopProduct={shopProduct} />
                    <CollapsibleTrigger asChild>
                        <Button
                            size='sm'
                            className='w-28'
                            variant='outline'
                        >
                            {isOpen ? 'Згорнути' : 'Детальніше'}
                        </Button>
                    </CollapsibleTrigger>
                </div>
            </article>
            <CollapsibleContent>
                <ProductStatusesCards stocks={shopProduct.stocks} />
            </CollapsibleContent>
        </Collapsible>
    )
}

export const ProductRowCardSkeleton = () => {
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
