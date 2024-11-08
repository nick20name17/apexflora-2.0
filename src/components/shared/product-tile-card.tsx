import { AnimatePresence, motion } from 'framer-motion'
import { Car, Ship, TimerIcon } from 'lucide-react'

import { Skeleton } from '../ui/skeleton'

import { ProductRowCard } from './product-row-card'
import { animations } from '@/config/animations'
import type { ShopProduct } from '@/store/api/shop-products/shop-products.types'

interface ProductTileCardProps {
    isOpen: boolean
    onToggle: () => void
    shopProduct: ShopProduct
}

export const ProductTileCard = ({
    isOpen,
    onToggle,
    shopProduct
}: ProductTileCardProps) => {
    return (
        <>
            <article
                onClick={onToggle}
                className='flex h-40 items-start overflow-hidden rounded-md border border-foreground/25 max-md:h-auto max-md:flex-col'
            >
                <div className='h-full w-32 max-md:h-52 max-md:w-full max-xs:h-60'>
                    {shopProduct.image ? (
                        <img
                            className='h-full w-full object-cover'
                            src={shopProduct?.image}
                            alt={shopProduct?.product?.name}
                        />
                    ) : (
                        <Skeleton className='h-full w-full rounded-none object-cover' />
                    )}
                </div>
                <div className='flex-1 p-3 max-md:w-full'>
                    <div className='flex items-start justify-between gap-x-2'>
                        <div>
                            <h1 className='font-bold text-primary'>
                                {shopProduct?.product?.ukr_name}
                            </h1>
                            <p className='mt-1 text-xs text-foreground/60'>
                                Артикул: <span>{shopProduct.origin_id}</span>
                            </p>
                        </div>
                        <img
                            className='size-4'
                            src={shopProduct.producer?.country?.flag}
                            alt={shopProduct.producer?.country?.name}
                        />
                    </div>
                    <div className='mt-2 flex items-center justify-between gap-x-2 border-t border-t-primary pt-2 text-xs'>
                        <div className='flex flex-col gap-y-0.5'>
                            <span className='text-foreground/60'>Колір</span>
                            <span className='text-primary'>Green</span>
                        </div>
                        <div className='flex flex-col gap-y-0.5'>
                            <span className='text-foreground/60'>Висота</span>
                            <span className='text-primary'>{shopProduct.height}см</span>
                        </div>
                        <div className='flex flex-col gap-y-0.5'>
                            <span className='text-foreground/60'>Якість</span>
                            <span className='text-primary'>{shopProduct.quality}</span>
                        </div>
                        <div className='flex flex-col gap-y-0.5'>
                            <span className='text-foreground/60'>Вагa/d ⌀</span>
                            <span className='text-primary'>
                                {shopProduct.weight_size}г
                            </span>
                        </div>
                    </div>
                    <div className='mt-2 flex items-center justify-between gap-x-2 border-t border-t-primary pt-2'>
                        <div className='flex items-center gap-x-2 text-foreground/60'>
                            <Ship className='size-6' />
                            <TimerIcon className='size-6' />
                            <Car className='size-6' />
                        </div>
                        <span className='text-primary'>--- ₴</span>
                    </div>
                </div>
            </article>
            <AnimatePresence mode='popLayout'>
                {isOpen ? (
                    <motion.div
                        {...animations.popLayout}
                        className='absolute bottom-10 right-0 z-10 w-full'
                    >
                        <ProductRowCard
                            isOpen={isOpen}
                            onToggle={onToggle}
                            shopProduct={shopProduct}
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    )
}

export const ProductTileCardSkeleton = () => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className='h-40 rounded-md'
                >
                    <Skeleton className='h-full w-full rounded-sm' />
                </div>
            ))}
        </div>
    )
}
