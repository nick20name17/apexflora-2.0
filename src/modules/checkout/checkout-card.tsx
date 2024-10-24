import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { Basket } from '@/store/api/baskets/baskets.types'

interface CheckoutCardProps {
    basketProduct: Basket
}

export const CheckoutCard = ({ basketProduct }: CheckoutCardProps) => {
    const totalPrice = basketProduct.amount * +basketProduct.stock_product.retail_price

    const totalPriceWithDiscount = totalPrice - basketProduct.discount

    return (
        <div className='flex items-center justify-between gap-x-6 rounded-md border border-secondary p-2'>
            <div className='flex items-center gap-x-2'>
                <div className='h-16 w-24'>
                    {basketProduct.stock_product.shop_product.image ? (
                        <img
                            className='h-full w-full rounded-sm object-cover'
                            src={basketProduct.stock_product.shop_product.image}
                            alt={
                                basketProduct.stock_product.shop_product.product.ukr_name
                            }
                        />
                    ) : (
                        <Skeleton className='h-full w-full rounded-sm object-cover' />
                    )}
                </div>
                <div className='flex flex-col gap-y-1'>
                    <h1 className='font-bold text-primary'>
                        {basketProduct.stock_product.shop_product.product.ukr_name}
                    </h1>
                    <span className='flex items-center gap-x-1 text-xs text-foreground/60'>
                        Артикул:{' '}
                        <span>
                            {basketProduct.stock_product.shop_product.origin_id || '-'}
                        </span>
                    </span>
                </div>
            </div>
            <div className='flex w-1/2 items-center justify-between gap-x-4 pr-4'>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Всього</span>
                    <span className='text-primary'>{basketProduct.amount}</span>
                </div>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Знижка</span>
                    <span className='text-primary'>{basketProduct.discount} ₴</span>
                </div>

                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Сума</span>
                    <span
                        className={cn(
                            basketProduct.discount > 0 ? 'flex items-center gap-x-1' : ''
                        )}
                    >
                        {basketProduct.discount > 0 ? (
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
