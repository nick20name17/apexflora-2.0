import { Car, Clock, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'

import { CheckoutCard } from './checkout-card'
import { CheckoutForm } from './checkout-form'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/constants/routes'
import { useGetBasketsQuery } from '@/store/api/baskets/baskets'

export const Checkout = () => {
    const { data: baskets, isLoading } = useGetBasketsQuery({
        limit: 1000
    })

    return (
        <div className='w-full pt-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={routes.main}>Головна</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Оформлення замовлення</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='mt-8 flex items-start justify-between gap-x-20'>
                {isLoading ? (
                    <CheckoutSkeleton />
                ) : baskets?.count === 0 ? (
                    <div className='flex flex-col items-start gap-y-4'>
                        <h1 className='text-[32px] font-bold text-primary'>
                            Кошик пустий
                        </h1>

                        <Button
                            variant='outline'
                            asChild
                        >
                            <Link to={routes.catalogue}>Продовжити покупки</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <CheckoutForm />
                        <CheckoutProducts />
                    </>
                )}
            </div>
        </div>
    )
}

const CheckoutSkeleton = () => {
    return (
        <>
            <div className='flex-1'>
                <Skeleton className='size-full h-10 w-64' />

                <div className='mt-4 border-t border-t-primary'>
                    <Skeleton className='mt-4 h-12 w-full' />
                    <Skeleton className='mt-4 h-12 w-full' />
                    <Skeleton className='mt-4 h-12 w-full' />
                </div>

                <div className='mt-4 border-t border-t-primary'>
                    <Skeleton className='mt-4 h-12 w-full' />
                </div>

                <div className='mt-4 border-y border-y-primary pb-4'>
                    <Skeleton className='mt-4 h-12 w-full' />
                </div>
            </div>
            <div className='flex-1'>
                <Skeleton className='size-full h-12 w-64' />

                <div className='mt-2 border-t border-t-primary'>
                    <Skeleton className='mt-4 h-10 w-full' />
                </div>
                <div className='mt-4 border-t border-t-primary'>
                    <Skeleton className='mt-4 h-20 w-full' />
                    {/* <Skeleton className='mt-4 h-24 w-full' /> */}
                </div>

                <div className='mt-4 border-t border-t-primary'>
                    <Skeleton className='mt-4 h-8 w-full' />
                    <Skeleton className='mt-2 h-8 w-full' />
                </div>

                <div className='mt-4 border-t border-t-primary'>
                    <Skeleton className='mt-4 h-12 w-full' />
                </div>
            </div>
        </>
    )
}

const CheckoutProducts = () => {
    const { data: baskets } = useGetBasketsQuery({
        limit: 1000
    })
    const products = {
        delivery: baskets?.results.filter((item) => item.stock_product.status.id === 1),
        available: baskets?.results.filter((item) => item.stock_product.status.id === 2),
        preOrder: baskets?.results.filter((item) => item.stock_product.status.id === 3)
    }

    const totalPrices = {
        available:
            products.available?.reduce((acc, item) => {
                return acc + item.amount * +item.stock_product.retail_price
            }, 0) || 0,
        delivery:
            products.delivery?.reduce((acc, item) => {
                return acc + item.amount * +item.stock_product.retail_price
            }, 0) || 0,
        preOrder:
            products.preOrder?.reduce((acc, item) => {
                return acc + item.amount * +item.stock_product.retail_price
            }, 0) || 0
    }

    const totalPrice = totalPrices.available + totalPrices.delivery + totalPrices.preOrder

    const totalDiscounts = {
        available:
            products.available?.reduce((acc, item) => {
                return acc + item.discount
            }, 0) || 0,
        delivery:
            products.delivery?.reduce((acc, item) => {
                return acc + item.discount
            }, 0) || 0,
        preOrder:
            products.preOrder?.reduce((acc, item) => {
                return acc + item.discount
            }, 0) || 0
    }

    const totalDiscount =
        totalDiscounts.available + totalDiscounts.delivery + totalDiscounts.preOrder

    return (
        <div className='flex-1'>
            <h1 className='border-b border-b-primary pb-2 text-[32px] font-bold text-primary'>
                Ваше замовлення
            </h1>
            <div className='mt-3 border-b border-b-primary py-2'>
                {products.available?.length ? (
                    <div>
                        <div className='flex items-center justify-between gap-x-4 text-xl text-primary'>
                            <div className='flex items-center gap-x-2'>
                                <CreditCard className='size-6' />
                                <span>В наявності</span>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                {totalDiscounts?.available > 0 ? (
                                    <span className='text-sm text-foreground/80 line-through'>
                                        {totalPrices.available} ₴
                                    </span>
                                ) : null}
                                <span>{totalPrices.available} ₴</span>
                            </div>
                        </div>
                        <div className='mt-2 flex flex-col gap-y-4 border-t border-t-primary py-4'>
                            {products.available.map((basket) => (
                                <CheckoutCard
                                    key={basket.id}
                                    basketProduct={basket}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}

                {products.delivery?.length ? (
                    <div>
                        <div className='flex items-center justify-between gap-x-4 text-xl text-primary'>
                            <div className='flex items-center gap-x-2'>
                                <Car className='size-6' />
                                <span>В дорозі</span>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                {totalDiscounts?.delivery > 0 ? (
                                    <span className='text-sm text-foreground/80 line-through'>
                                        {totalPrices.delivery} ₴
                                    </span>
                                ) : null}
                                <span>{totalPrices.delivery} ₴</span>
                            </div>
                        </div>
                        <div className='mt-2 flex flex-col gap-y-4 border-t border-t-primary py-4'>
                            {products.delivery.map((basket) => (
                                <CheckoutCard
                                    key={basket.id}
                                    basketProduct={basket}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}

                {products.preOrder?.length ? (
                    <div>
                        <div className='flex items-center justify-between gap-x-4 text-xl text-primary'>
                            <div className='flex items-center gap-x-2'>
                                <Clock className='size-6' />
                                <span>Передзамовлення</span>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                {totalDiscounts?.preOrder > 0 ? (
                                    <span className='text-sm text-foreground/80 line-through'>
                                        {totalPrices.preOrder} ₴
                                    </span>
                                ) : null}
                                <span>{totalPrices.preOrder} ₴</span>
                            </div>
                        </div>
                        <div className='mt-2 flex flex-col gap-y-4 border-t border-t-primary py-4'>
                            {products.preOrder.map((basket) => (
                                <CheckoutCard
                                    key={basket.id}
                                    basketProduct={basket}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>

            <div className='border-b border-b-primary py-2 text-lg font-medium text-primary'>
                <div className='flex items-center justify-between gap-x-4'>
                    Сума <span>{totalPrice} ₴</span>
                </div>
                <div className='mt-1 flex items-center justify-between gap-x-4'>
                    Знижка <span>{totalDiscount} ₴</span>
                </div>
            </div>

            <div className='flex items-center justify-between pt-2 text-2xl text-primary'>
                Всього <span> {totalPrice - totalDiscount} ₴</span>
            </div>
        </div>
    )
}
