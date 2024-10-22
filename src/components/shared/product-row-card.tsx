import { AnimatePresence, motion } from 'framer-motion'
import { Car, Heart, Ship, TimerIcon } from 'lucide-react'

import { Button } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Skeleton } from '../ui/skeleton'

import { ProductStatusesCards } from './product-statuses-cards'
import { animations } from '@/config/animations'
import { cn } from '@/lib/utils'
import type { ShopProduct } from '@/store/api/shop-products/shop-products.types'
import {
    useAddToWishListMutation,
    useRemoveFromWishListMutation
} from '@/store/api/wish-list/wish-list'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'

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
    const [addToWishList] = useAddToWishListMutation()
    const [removeFromWishList] = useRemoveFromWishListMutation()

    const userId = useAppSelector(selectUser)?.id

    const handleAddingToFavorites = () => {
        try {
            addToWishList({
                shop_product: shopProduct.id,
                creator: userId
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemovingFromFavorites = () => {
        try {
            removeFromWishList(shopProduct.id)
        } catch (error) {
            console.log(error)
        }
    }

    const onAddingToFavorites = () => {
        if (shopProduct?.in_wish_list) {
            handleRemovingFromFavorites()
        } else {
            handleAddingToFavorites()
        }
    }

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={onToggle}
            className='rounded-md border-2 border-secondary p-2 transition-colors data-[state=open]:border-primary data-[state=open]:bg-primary'
        >
            <article className='grid h-20 grid-cols-[2fr_2fr_1fr_1fr] gap-x-6'>
                <div className='flex h-full items-center gap-x-2'>
                    <div className='h-20 w-28'>
                        {shopProduct.image ? (
                            <img
                                className='h-full w-full rounded-sm object-cover'
                                src={shopProduct.image}
                                alt={shopProduct.product.name}
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
                            {shopProduct.product.ukr_name}
                        </h1>
                        <span
                            className={cn(
                                'flex items-center gap-x-2 text-sm',
                                isOpen ? 'text-secondary' : 'text-foreground/50'
                            )}
                        >
                            <img
                                className='size-3.5'
                                src={shopProduct.producer.country.flag}
                                alt={shopProduct.producer.country.name}
                            />
                            {shopProduct.producer.name}
                        </span>
                    </div>
                </div>

                <div
                    className={cn(
                        'flex items-center justify-end gap-x-4',
                        isOpen ? 'text-secondary' : 'text-foreground/50'
                    )}
                >
                    <AnimatePresence
                        initial={false}
                        mode='popLayout'
                    >
                        <motion.div
                            {...animations.popLayout}
                            className='flex flex-col'
                        >
                            {isOpen ? <span className='text-accent'>Колір</span> : null}
                            <span>Білий</span>
                        </motion.div>

                        <motion.div
                            {...animations.popLayout}
                            className='flex flex-col'
                        >
                            {isOpen ? <span className='text-accent'>Висота</span> : null}
                            <span>{shopProduct.height}см</span>
                        </motion.div>
                        <motion.div
                            {...animations.popLayout}
                            className='flex flex-col'
                        >
                            {isOpen ? <span className='text-accent'>Якість</span> : null}
                            <span>{shopProduct.quality}</span>
                        </motion.div>
                        <motion.div
                            {...animations.popLayout}
                            className='flex flex-col'
                        >
                            {isOpen ? (
                                <span className='text-accent'>Вагa/d&nbsp;⌀</span>
                            ) : null}
                            <span>{shopProduct.weight_size || '-'}</span>
                        </motion.div>
                        {isOpen ? (
                            <motion.div
                                {...animations.popLayout}
                                className='flex flex-col'
                            >
                                <span className='text-accent'>Зрілість</span>
                                <span>{shopProduct.stage}</span>
                            </motion.div>
                        ) : null}
                        {isOpen ? (
                            <motion.div
                                {...animations.popLayout}
                                className='flex flex-col'
                            >
                                <span className='text-accent'>Артикул</span>
                                <span>{shopProduct.origin_id}</span>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>

                <div className='flex items-center justify-end gap-x-4'>
                    <AnimatePresence
                        initial={false}
                        mode='popLayout'
                    >
                        <motion.div
                            {...animations.popLayout}
                            className={cn(
                                'flex items-center gap-x-2',
                                isOpen ? 'text-accent' : 'text-foreground/60'
                            )}
                        >
                            <Ship className='size-6' />
                            <TimerIcon className='size-6' />
                            <Car className='size-6' />
                        </motion.div>
                        {isOpen ? null : (
                            <motion.span
                                {...animations.popLayout}
                                className='text-primary'
                            >
                                {' '}
                                29 ₴
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <div className='flex items-center justify-end gap-x-2'>
                    <Button
                        onClick={onAddingToFavorites}
                        className='size-12'
                        size='icon'
                        variant={shopProduct?.in_wish_list ? 'accent' : 'outline'}
                    >
                        <Heart className='size-5' />
                    </Button>
                    <CollapsibleTrigger asChild>
                        <Button
                            className='w-28'
                            variant='outline'
                        >
                            {isOpen ? 'Згорнути' : 'Детальніше'}
                        </Button>
                    </CollapsibleTrigger>
                </div>
            </article>
            <CollapsibleContent>
                <ProductStatusesCards stockProducts={shopProduct.stocks} />
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
