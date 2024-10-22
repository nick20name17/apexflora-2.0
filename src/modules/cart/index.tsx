import { Car, Clock, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'

import { CartProductCard } from '@/components/shared'
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

export const Cart = () => {
    const { data: baskets, isLoading } = useGetBasketsQuery({
        limit: 1000
    })

    const totalBasketPrice = baskets?.results.reduce((acc, item) => {
        return acc + item.amount * +item.stock_product.retail_price
    }, 0)

    const isEmpty = baskets?.count === 0

    const products = {
        available: baskets?.results.filter((item) => item.stock_product.status.id === 2),
        delivery: baskets?.results.filter((item) => item.stock_product.status.id === 1),
        preOrder: baskets?.results.filter((item) => item.stock_product.status.id === 3)
    }

    const totalPrices = {
        available: products.available?.reduce((acc, item) => {
            return acc + item.amount * +item.stock_product.retail_price
        }, 0),
        delivery: products.delivery?.reduce((acc, item) => {
            return acc + item.amount * +item.stock_product.retail_price
        }, 0),
        preOrder: products.preOrder?.reduce((acc, item) => {
            return acc + item.amount * +item.stock_product.retail_price
        }, 0)
    }

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
                        <BreadcrumbPage>Кошик</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {isEmpty ? (
                <div className='mt-8 flex flex-col items-start gap-y-4'>
                    <h1 className='text-[32px] font-bold text-primary'>Кошик пустий</h1>

                    <Button
                        variant='outline'
                        asChild
                    >
                        <Link to={routes.catalogue}>Продовжити покупки</Link>
                    </Button>
                </div>
            ) : (
                <div className='mt-4'>
                    <h1 className='text-[32px] font-bold text-primary'>Кошик</h1>

                    {isLoading ? (
                        <CartSkeleton />
                    ) : (
                        <div className='mt-8 flex flex-col gap-y-4'>
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
                                    <div className='mt-2 flex flex-col gap-y-4 border-t border-t-secondary py-4'>
                                        {products.available.map((basket) => (
                                            <CartProductCard
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
                                    <div className='mt-2 flex flex-col gap-y-4 border-t border-t-secondary py-4'>
                                        {products.delivery.map((basket) => (
                                            <CartProductCard
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
                                    <div className='mt-2 flex flex-col gap-y-4 border-t border-t-secondary py-4'>
                                        {products.preOrder.map((basket) => (
                                            <CartProductCard
                                                key={basket.id}
                                                basketProduct={basket}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}

                    <div className='flex items-center justify-end border-t border-t-secondary py-4'>
                        <span className='text-2xl text-primary'>
                            Всього {totalBasketPrice} ₴
                        </span>
                    </div>

                    <div className='flex items-center justify-end gap-4 border-t border-t-secondary pt-4'>
                        <Button
                            variant='outline'
                            asChild
                        >
                            <Link to={routes.catalogue}>Продовжити покупки</Link>
                        </Button>
                        <Button asChild>
                            <Link to={routes.checkout}>Оформити замовлення</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

const CartSkeleton = () => {
    return (
        <div className='mt-8 flex flex-col gap-y-4'>
            <div>
                <div className='flex items-center justify-between gap-x-4 text-xl text-primary'>
                    <div className='flex items-center gap-x-2'>
                        <Skeleton className='size-6 rounded-full' />
                        <Skeleton className='h-4 w-10 rounded-md' />
                    </div>
                    <Skeleton className='h-6 w-14 rounded-md' />
                </div>
                <div className='mt-2 flex flex-col gap-y-4 border-t border-t-secondary py-4'>
                    <Skeleton className='h-[100px] w-full rounded-md' />
                    <Skeleton className='h-[100px] w-full rounded-md' />
                </div>
            </div>
            <div>
                <div className='flex items-center justify-between gap-x-4 text-xl text-primary'>
                    <div className='flex items-center gap-x-2'>
                        <Skeleton className='size-6 rounded-full' />
                        <Skeleton className='h-4 w-10 rounded-md' />
                    </div>
                    <Skeleton className='h-6 w-14 rounded-md' />
                </div>
                <div className='mt-2 flex flex-col gap-y-4 border-t border-t-secondary py-4'>
                    <Skeleton className='h-[100px] w-full rounded-md' />
                    <Skeleton className='h-[100px] w-full rounded-md' />
                </div>
            </div>
        </div>
    )
}
