import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState } from 'react'

import fireIcon from '@/assets/icons/fire.png'
import { getStatusProductsDisplay } from '@/components/shared/product-statuses-cards'
import { Button } from '@/components/ui/button'
import { StepperSelect } from '@/components/ui/stepper-select'
import { cn } from '@/lib/utils'
import type { AdminOrderItem } from '@/store/api/orders/orders.types'
import type { Stock } from '@/store/api/shop-products/shop-products.types'

interface ProductStatusesCardProps {
    stocks: Stock[]
    setOrderItems: (orderItems: AdminOrderItem[]) => void
    orderItems: AdminOrderItem[]
}

export const OrdersProductStatusesCards = ({
    stocks,
    orderItems,
    setOrderItems
}: ProductStatusesCardProps) => {
    return (
        <div className='grid grid-cols-3 gap-2 pt-4'>
            {stocks.map((stock) => (
                <OrdersProductStatusCard
                    key={stock.id}
                    stock={stock}
                    setOrderItems={setOrderItems}
                    orderItems={orderItems}
                />
            ))}
        </div>
    )
}

interface OrdersProductStatusCardProps {
    stock: Stock
    setOrderItems: (orderItems: AdminOrderItem[]) => void
    orderItems: AdminOrderItem[]
}

export const InCartIndicator = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 0.3,
                        type: 'spring'
                    }
                }}
                exit={{
                    opacity: 0,
                    scale: 0,
                    transition: {
                        duration: 0.3,
                        type: 'spring'
                    }
                }}
                className='absolute left-1 top-1 flex size-4 items-center justify-center rounded-full bg-accent text-primary'
            >
                <Check className='size-3' />
            </motion.div>
        </AnimatePresence>
    )
}

const OrdersProductStatusCard = ({
    stock,
    setOrderItems,
    orderItems
}: OrdersProductStatusCardProps) => {
    const [amount, setAmount] = useState(stock.shop_product.packaging_of)

    const isAvailable = stock.quantity > 0

    const { name, icon } = getStatusProductsDisplay(stock.status.id)

    const productQuantity = stock.status.id === 3 ? '∞' : stock.quantity + ' шт'

    const totalPrice = amount * +stock.retail_price
    const inCart = orderItems.some((orderItem) => orderItem.id === stock.id)

    const toggleAddToOrder = () => {
        if (inCart) {
            const newOrderItems = orderItems.filter(
                (orderItem) => orderItem.id !== stock.id
            )

            setOrderItems(newOrderItems)
        } else {
            setOrderItems([
                ...orderItems,
                {
                    id: stock.id,
                    amount: amount
                }
            ])
        }
    }

    return (
        <div
            className={cn(
                'relative w-full rounded-lg bg-secondary/20 p-4 text-sm text-background',
                stock.is_visible ? '' : 'opacity-65'
            )}
        >
            {inCart ? <InCartIndicator /> : null}
            <div className='flex items-center justify-between gap-x-2 pb-2'>
                <div className='flex items-center gap-x-3'>
                    {icon}

                    <div className='flex flex-col'>
                        <span>{name}</span>
                        <div className='flex items-center gap-x-2'>
                            <span className='text-sm text-secondary/60'>
                                {productQuantity}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-x-2'>
                    {stock.promotion ? (
                        <div className='-mt-1 size-4'>
                            <img
                                src={fireIcon}
                                alt='Вогонь'
                            />
                        </div>
                    ) : null}
                    {stock.visible_discount > 0 ? (
                        <div className='flex h-10 items-center justify-center rounded-md bg-accent p-2 text-foreground'>
                            {stock.visible_discount}%
                        </div>
                    ) : null}
                </div>
            </div>
            <div className='flex items-center justify-between gap-x-2 border-y border-y-background/60 py-2'>
                <div>
                    Ціна за шт:{' '}
                    <span className='text-accent'>{stock.retail_price} ₴</span>
                </div>
                <div>
                    Сума: <span className='text-accent'>{totalPrice} ₴</span>
                </div>
            </div>
            <div className='flex items-center justify-between gap-x-2 border-t border-t-background/60 pt-2'>
                <StepperSelect
                    onChange={setAmount}
                    disabled={!isAvailable}
                    step={stock.shop_product.packaging_of}
                    max={stock.quantity || stock.shop_product.packaging_of}
                    min={stock.shop_product.packaging_of}
                />
                <Button
                    disabled={!isAvailable}
                    onClick={toggleAddToOrder}
                    className={cn(
                        'w-36',
                        inCart ? 'bg-[#FF7300] hover:bg-[#FF7300]/85' : ''
                    )}
                    variant='accent'
                    size='sm'
                >
                    {!isAvailable ? 'Не в наявності' : inCart ? 'Видалити' : 'Додати'}
                </Button>
            </div>
        </div>
    )
}
