import { format } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Skeleton } from '../ui/skeleton'

import { cn } from '@/lib/utils'
import type { Order, OrderItem, Statuses } from '@/store/api/orders/orders.types'

const getStatusName = (statusName: Statuses) => {
    const statuses = {
        pending: {
            displayName: 'Очікує підтвердження',
            className: 'bg-[#FF7300] text-primary'
        },
        approval: {
            displayName: 'Підтверджено',
            className: 'bg-primary text-background'
        },
        shipped: {
            displayName: 'Відправлено',
            className: 'bg-sky-400'
        },
        delivered: {
            displayName: 'Виконано',
            className: 'bg-accent text-primary'
        },
        canceled: {
            displayName: 'Скасовано',
            className: 'bg-destructive text-background'
        }
    }

    return statuses[statusName]
}

interface OrderCardProps {
    order: Order
}

export const OrderCard = ({ order }: OrderCardProps) => {
    const [open, setOpen] = useState(false)

    const totalPrice = order.order_items.reduce((acc, item) => {
        return acc + item.amount * item.price
    }, 0)

    const totalPriceWithDiscount = totalPrice - order.discount

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-md border-2 border-secondary p-4 transition-colors data-[state=open]:border-primary'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-8'>
                <div className='flex flex-1 items-center justify-between gap-x-4'>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'># Замовлення</span>
                        <span className='text-primary'>{order.id}</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Дата оформлення</span>
                        <span className='text-primary'>
                            {format(order.created_at, 'dd.MM.yyyy')}
                        </span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Спосіб оплати</span>
                        <span className='text-primary'>Самовивіз</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Статус</span>
                        <OrderCardStatus statusName={order.status} />
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Знижка</span>
                        <span className='text-primary'>{order.discount} ₴</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Сума</span>
                        <span
                            className={cn(
                                order.discount > 0 ? 'flex items-center gap-x-1' : ''
                            )}
                        >
                            {order.discount > 0 ? (
                                <span className='text-sm text-foreground/80 line-through'>
                                    {totalPrice} ₴
                                </span>
                            ) : null}
                            <span className='text-primary'>
                                {totalPriceWithDiscount} ₴
                            </span>
                        </span>
                    </div>
                </div>
                <Button
                    size='icon'
                    variant='outline'
                >
                    <ChevronDown
                        className={cn(
                            'size-4 transition-transform',
                            open ? 'rotate-180' : ''
                        )}
                    />
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className='mt-4 flex flex-col gap-y-2'>
                    {order.order_items.map((orderItem) => (
                        <OrderItemCard
                            key={orderItem.id}
                            orderItem={orderItem}
                        />
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

interface OrderItemCardProps {
    orderItem: OrderItem
}

const OrderItemCard = ({ orderItem }: OrderItemCardProps) => {
    const totalPrice = orderItem.amount * orderItem.price
    const totalPriceWithDiscount = totalPrice - orderItem.discount

    return (
        <div className='flex items-center justify-between gap-x-4 rounded-md border-2 border-secondary p-1'>
            <div className='flex items-center gap-x-2'>
                <div className='h-16 w-24'>
                    {orderItem.stock_product.shop_product.image ? (
                        <img
                            className='h-full w-full rounded-sm object-cover'
                            src={orderItem.stock_product.shop_product.image}
                            alt={orderItem.stock_product.shop_product.product.name}
                        />
                    ) : (
                        <Skeleton className='h-full w-full rounded-sm object-cover' />
                    )}
                </div>
                <div className='flex flex-col gap-y-0.5 text-sm'>
                    <h1 className='font-bold text-primary'>
                        {orderItem.stock_product.shop_product.product.name}
                    </h1>
                    <span className='text-foreground/60'>
                        Артикул: {orderItem.stock_product.shop_product.origin_id}
                    </span>
                </div>
            </div>
            <div className='grid h-full w-3/4 grid-cols-3 items-center gap-x-4 pr-4'>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Всього</span>
                    <span className='text-primary'>{orderItem.amount}</span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Знижка</span>
                    <span className='text-primary'>{orderItem.discount}</span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Сума</span>
                    <span
                        className={cn(
                            orderItem.discount > 0 ? 'flex items-center gap-x-1' : ''
                        )}
                    >
                        {orderItem.discount > 0 ? (
                            <span className='text-sm text-foreground/80 line-through'>
                                {totalPrice} ₴
                            </span>
                        ) : null}
                        <span className='text-primary'>{totalPriceWithDiscount} ₴</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

const OrderCardStatus = ({ statusName }: { statusName: Statuses }) => {
    const status = getStatusName(statusName)

    return (
        <div className={cn('rounded-md px-2 py-1 text-xs', status.className)}>
            {status.displayName}
        </div>
    )
}
