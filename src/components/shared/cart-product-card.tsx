import { Trash } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { StepperInput } from '../ui/stepper-input'
import { StepperSelect } from '../ui/stepper-select'

import { cn } from '@/lib/utils'
import {
    usePatchBasketMutation,
    useRemoveBasketMutation
} from '@/store/api/baskets/baskets'
import type { Basket } from '@/store/api/baskets/baskets.types'

interface CartProductCardProps {
    basketProduct: Basket
}

export const CartProductCard = ({ basketProduct }: CartProductCardProps) => {
    const isPreorder = basketProduct.stock_product.status.id === 3

    const [amount, setAmount] = useState(basketProduct.amount)

    const [removeBasket] = useRemoveBasketMutation()
    const [patchBasket] = usePatchBasketMutation()

    const onProductRemove = async () => {
        try {
            await removeBasket(basketProduct.id)
        } catch (error) {
            console.log(error)
        }
    }

    const onAmountChange = (amount: number) => {
        setAmount(amount)
        patchBasket({
            id: basketProduct.id,
            data: {
                amount
            }
        })
    }

    const totalPrice = amount * +basketProduct.stock_product.retail_price

    const totalPriceWithDiscount = totalPrice - basketProduct.discount

    return (
        <div className='flex items-center justify-between gap-x-6 rounded-md border border-secondary p-2'>
            <div className='flex items-center gap-x-2'>
                <div className='h-20 w-28'>
                    {basketProduct.stock_product.shop_product?.image ? (
                        <img
                            className='h-full w-full rounded-sm object-cover'
                            src={basketProduct.stock_product.shop_product?.image}
                            alt={
                                basketProduct.stock_product.shop_product?.product?.ukr_name
                            }
                        />
                    ) : (
                        <Skeleton className='h-full w-full rounded-sm object-cover' />
                    )}
                </div>
                <div className='flex flex-col gap-y-1'>
                    <h1 className='font-bold text-primary'>
                        {basketProduct.stock_product.shop_product?.product?.ukr_name}
                    </h1>
                    <span className='flex items-center gap-x-1 text-xs text-foreground/60'>
                        Артикул:{' '}
                        <span>
                            {basketProduct.stock_product.shop_product?.origin_id || '-'}
                        </span>
                    </span>
                </div>
            </div>
            <div className='w-9/12x flex items-center justify-between gap-x-4 pr-4'>
                {isPreorder ? (
                    <StepperInput
                        onChange={onAmountChange}
                        defaultValue={basketProduct.amount}
                        step={basketProduct.stock_product.shop_product.packaging_of}
                        max={Infinity}
                        min={basketProduct.stock_product.shop_product.packaging_of}
                    />
                ) : (
                    <StepperSelect
                        onChange={onAmountChange}
                        defaultValue={basketProduct.amount}
                        step={basketProduct.stock_product.shop_product.packaging_of}
                        max={basketProduct.stock_product.quantity}
                        min={basketProduct.stock_product.shop_product.packaging_of}
                    />
                )}

                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Знижка</span>
                    <span className='text-primary'>{basketProduct.discount} ₴</span>
                </div>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Ціна за шт.</span>
                    <span className='text-primary'>
                        {basketProduct.stock_product.retail_price} ₴
                    </span>
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
                <Button
                    className='flex-shrink-0'
                    size='icon'
                    variant='destructive'
                    onClick={onProductRemove}
                >
                    <Trash className='size-4' />
                </Button>
            </div>
        </div>
    )
}
