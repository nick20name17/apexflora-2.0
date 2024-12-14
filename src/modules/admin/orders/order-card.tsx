import { format } from 'date-fns'
import { Check, ChevronDown, Info, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { EditOrderModal } from './actions/edit'
import { RemoveOrderModal } from './actions/remove'
import { RemoveOrderItemsModal } from './actions/remove-order-items'
import { OrderStatusSelect } from './order-status-select'
import { getStatusProductsDisplay } from '@/components/shared/product-statuses-cards'
import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { usePatchOrderItemsMutation } from '@/store/api/order-items/order-items'
import type { OrderItemsAddData } from '@/store/api/order-items/order-items.types'
import type { Order, OrderItem, Statuses } from '@/store/api/orders/orders.types'
import { isErrorWithMessage } from '@/utils'

export const getStatusName = (statusName: Statuses) => {
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

export const AdminOrderCard = ({ order }: OrderCardProps) => {
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
                <div className='grid flex-1 grid-cols-[1fr,2fr,repeat(4,1fr),2fr] gap-x-4'>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'># Замовлення</span>
                        <span className='text-primary'>{order.id}</span>
                    </div>
                    <UserInfo order={order} />
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
                        <OrderStatusSelect order={order} />
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
                <div className='space-x-2'>
                    <EditOrderModal order={order} />
                    <RemoveOrderModal order={order} />
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
                </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className='mt-4 flex flex-col gap-y-2'>
                    {order.order_items.length ? (
                        order.order_items.map((orderItem) => (
                            <AdminOrderItemCard
                                key={orderItem.id}
                                orderItem={orderItem}
                                order={order}
                            />
                        ))
                    ) : (
                        <div className='text-primary'>Немає товарів для замовлення</div>
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

const PriceInput = ({ orderItem }: { orderItem: OrderItem }) => {
    const form = useForm({
        defaultValues: {
            price: orderItem.price
        }
    })

    const currentPrice = form.watch('price')

    const [isFocused, setIsFocused] = useState(false)

    const [patchOrderItem, { isLoading }] = usePatchOrderItemsMutation()

    const handlePatchOrderItem = async (id: number, data: Partial<OrderItemsAddData>) => {
        try {
            await patchOrderItem({ id, data })
                .unwrap()
                .then(() => {
                    toast.success(
                        `Ціну товару ${orderItem.stock_product.shop_product.product.name} успішно змінено на ${currentPrice} ₴`
                    )
                    setIsFocused(false)
                })
        } catch (error) {
            const isErrorMessage = isErrorWithMessage(error)
            toast.error((isErrorMessage && error.data.detail) || 'Щось пішло не так')
        }
    }

    const onSubmit = (data: { price: number }) => {
        handlePatchOrderItem(orderItem.id, data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='relative w-full'
            >
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='relative overflow-hidden'>
                                    <span className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50'>
                                        ₴
                                    </span>
                                    <Input
                                        {...field}
                                        className='peer h-7 p-1 pl-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0'
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder='0.00'
                                        type='number'
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    onFocus={() => setIsFocused(true)}
                    type='submit'
                    size='icon'
                    className={cn(
                        'absolute right-1 top-1/2 size-5 shrink-0 -translate-y-1/2 rounded-full transition-all',
                        isFocused
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-full opacity-0'
                    )}
                    disabled={!currentPrice?.toString().trim() || isLoading}
                >
                    {isLoading ? (
                        <Loader2 className='!size-3 animate-spin' />
                    ) : (
                        <Check className='!size-3' />
                    )}
                </Button>
            </form>
        </Form>
    )
}

const AmountInput = ({ orderItem }: { orderItem: OrderItem }) => {
    const form = useForm({
        defaultValues: {
            amount: orderItem.amount
        }
    })

    const currentAmount = form.watch('amount')

    const [isFocused, setIsFocused] = useState(false)

    const [patchOrderItem, { isLoading }] = usePatchOrderItemsMutation()

    const handlePatchOrderItem = async (id: number, data: Partial<OrderItemsAddData>) => {
        try {
            await patchOrderItem({ id, data })
                .unwrap()
                .then(() => {
                    toast.success(
                        `Кількість товару ${orderItem.stock_product.shop_product.product.name} успішно змінено на ${currentAmount}`
                    )
                    setIsFocused(false)
                })
        } catch (error) {
            const isErrorMessage = isErrorWithMessage(error)
            toast.error((isErrorMessage && error.data.detail) || 'Щось пішло не так')
        }
    }

    const onSubmit = (data: { amount: number }) => {
        handlePatchOrderItem(orderItem.id, data)
    }

    const roundToPackaging = (value: number) => {
        const packaging = orderItem?.stock_product?.shop_product?.packaging_of || 1
        return Math.round(value / packaging) * packaging
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='relative w-full'
            >
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name='amount'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='overflow-hidden'>
                                    <Input
                                        {...field}
                                        className='h-7 p-1 text-sm focus-visible:ring-0 focus-visible:ring-offset-0'
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={(e) => {
                                            const roundedValue = roundToPackaging(
                                                Number(e.target.value)
                                            )
                                            form.setValue('amount', roundedValue)
                                            setIsFocused(false)
                                        }}
                                        placeholder='4'
                                        type='number'
                                        step={
                                            orderItem?.stock_product?.shop_product
                                                ?.packaging_of || 1
                                        }
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    onFocus={() => setIsFocused(true)}
                    type='submit'
                    size='icon'
                    className={cn(
                        'absolute right-1 top-1/2 size-5 shrink-0 -translate-y-1/2 rounded-full transition-all',
                        isFocused
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-full opacity-0'
                    )}
                    disabled={!currentAmount?.toString().trim() || isLoading}
                >
                    {isLoading ? (
                        <Loader2 className='!size-3 animate-spin' />
                    ) : (
                        <Check className='!size-3' />
                    )}
                </Button>
            </form>
        </Form>
    )
}

const UserInfo = ({ order }: { order: Order }) => {
    const creatorFullName =
        order?.creator?.first_name.charAt(0).toUpperCase().concat('.') +
        ' ' +
        order?.creator?.last_name

    const recipientFullName =
        order?.recipient?.first_name.charAt(0).toUpperCase().concat('.') +
        ' ' +
        order?.recipient?.last_name

    return (
        <Popover>
            <div className='flex gap-x-2'>
                <PopoverTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button
                        variant='ghost'
                        size='icon'
                        className='size-7 rounded-full text-primary'
                    >
                        <Info />
                    </Button>
                </PopoverTrigger>
                <div className='max-w-52 space-y-1 text-left'>
                    <div className='text-xs'>Користувач / Отримувач</div>
                    <div className='truncate text-primary'>
                        {creatorFullName} / {order?.recipient ? recipientFullName : '-'}
                    </div>
                </div>
            </div>
            <PopoverContent
                onClick={(e) => e.stopPropagation()}
                align='start'
                className='w-[600px]'
            >
                <h3 className='text-left text-lg font-medium text-primary'>
                    Інформація про користувача та отримувача
                </h3>
                <div className='mt-4 flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Адреса замовлення</span>
                    <span className='text-primary'>
                        {order?.address?.city
                            ? order?.address?.city + ', ' + order?.address?.street
                            : 'Самовивіз'}
                    </span>
                </div>
                <div className='mt-4 grid grid-cols-2 gap-4'>
                    <div>
                        <h4 className='text-left font-medium text-primary'>Користувач</h4>
                        <div className='mt-2 grid gap-2'>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Ім'я та прізвище</span>
                                <span className='text-primary'>
                                    {order?.creator?.first_name +
                                        ' ' +
                                        order?.creator?.last_name}
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Пошта</span>
                                <a
                                    href={`mailto:${order?.creator?.email}`}
                                    className='text-primary underline'
                                >
                                    {order.creator.email}
                                </a>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Телефон</span>
                                <a
                                    href={`tel:${order?.creator?.phone_number}`}
                                    className='text-primary underline'
                                >
                                    {order.creator.phone_number}
                                </a>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Місто</span>
                                <span className='text-primary'>{order.creator.city}</span>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Компанія</span>
                                <span className='text-primary'>
                                    {order.creator.company}
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Відповідальний менеджер</span>
                                <span className='text-primary'>
                                    {order?.creator?.service_manager?.first_name +
                                        ' ' +
                                        order?.creator?.service_manager?.last_name}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4
                            className={cn(
                                'text-left font-medium',
                                order.recipient ? 'text-primary' : 'text-primary/50'
                            )}
                        >
                            {order.recipient ? 'Отримувач' : 'Отримувач відсутній'}
                        </h4>
                        {order.recipient ? (
                            <div className='mt-2 grid gap-2'>
                                <div className='flex flex-col items-start gap-y-0.5'>
                                    <span className='text-xs'>Ім'я та прізвище</span>
                                    <span className='text-primary'>
                                        {order?.recipient?.first_name +
                                            ' ' +
                                            order?.recipient?.last_name}
                                    </span>
                                </div>
                                <div className='flex flex-col items-start gap-y-0.5'>
                                    <span className='text-xs'>Пошта</span>
                                    <a
                                        href={`mailto:${order?.recipient?.email}`}
                                        className='text-primary underline'
                                    >
                                        {order?.recipient?.email}
                                    </a>
                                </div>
                                <div className='flex flex-col items-start gap-y-0.5'>
                                    <span className='text-xs'>Телефон</span>
                                    <a
                                        href={`tel:${order?.recipient?.phone_number}`}
                                        className='text-primary underline'
                                    >
                                        {order?.recipient?.phone_number}
                                    </a>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

interface OrderItemCardProps {
    orderItem: OrderItem
    order: Order
}

const AdminOrderItemCard = ({ orderItem, order }: OrderItemCardProps) => {
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
            <div className='grid h-full w-3/4 grid-cols-6 items-center gap-x-4 pr-4'>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Статус</span>
                    <span className='flex items-center gap-1 text-primary [&_svg]:size-4 [&_svg]:shrink-0'>
                        {getStatusProductsDisplay(orderItem.stock_product.status.id).icon}
                        {getStatusProductsDisplay(orderItem.stock_product.status.id).name}
                    </span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Ціна</span>
                    <PriceInput orderItem={orderItem} />
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <Tooltip delayDuration={500}>
                        <TooltipTrigger className='flex items-center gap-x-1 text-xs'>
                            <Info className='size-3' /> Кількість{' '}
                            {orderItem.stock_product.quantity} /{' '}
                            {orderItem.stock_product.shop_product.packaging_of}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Доступна кількість / Пакування</p>
                        </TooltipContent>
                    </Tooltip>
                    <AmountInput orderItem={orderItem} />
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
                <div className='flex justify-end'>
                    <RemoveOrderItemsModal
                        order={order}
                        orderItem={orderItem}
                    />
                </div>
            </div>
        </div>
    )
}
