import { Car, Clock, CreditCard, ShoppingBasket } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { StepperSelect } from '../ui/stepper-select'

import fireIcon from '@/assets/icons/fire.png'
import { cn } from '@/lib/utils'
import {
    useAddBasketMutation,
    useRemoveBasketMutation
} from '@/store/api/baskets/baskets'
import type { Stock } from '@/store/api/shop-products/shop-products.types'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'

const getStatusProductsDisplay = (status: number) => {
    switch (status) {
        case 1:
            return {
                name: 'В дорозі',
                icon: <Car className='size-6' />
            }
        case 2:
            return {
                name: 'В наявності',
                icon: <CreditCard className='size-6' />
            }
        case 3:
            return {
                name: 'Передзамовлення',
                icon: <Clock className='size-6' />
            }
        default:
            return {
                name: 'В дорозі',
                icon: <Car className='size-6' />
            }
    }
}

interface ProductStatusesCardProps {
    stockProducts: Stock[]
}

export const ProductStatusesCards = ({ stockProducts }: ProductStatusesCardProps) => {
    return (
        <div className='grid grid-cols-3 gap-2 pt-4'>
            {stockProducts.map((stockProduct) => (
                <ProductStatusCard
                    key={stockProduct.id}
                    stockProduct={stockProduct}
                />
            ))}
        </div>
    )
}

const ProductStatusCard = ({ stockProduct }: { stockProduct: Stock }) => {
    const [addToBasket] = useAddBasketMutation()
    const [removeFromBasket] = useRemoveBasketMutation()
    const currentUserId = useAppSelector(selectUser)?.id

    const [amount, setAmount] = useState(stockProduct.shop_product.packaging_of)

    const [addedToCart, setAddedToCart] = useState(false)

    const isAvailable = stockProduct.quantity > 0

    const onAddingToCart = () => {
        setAddedToCart(!addedToCart)

        if (addedToCart) {
            removeFromBasket(stockProduct.id)
        } else {
            addToBasket({
                stock_product: stockProduct.id,
                amount,
                creator: currentUserId!
            })
        }
    }

    const { name, icon } = getStatusProductsDisplay(stockProduct.status.id)

    const productQuantity =
        stockProduct.status.id === 3 ? '∞' : stockProduct.quantity + ' шт'

    return (
        <div className='w-full rounded-lg bg-secondary/20 p-4 text-sm text-background'>
            <div className='flex items-center justify-between gap-x-2 pb-2'>
                <div className='flex items-center gap-x-3'>
                    {icon}

                    <div className='flex flex-col'>
                        <span>{name}</span>
                        <span className='text-sm text-secondary/60'>
                            {productQuantity}
                        </span>
                    </div>
                </div>
                <div className='flex items-center gap-x-2'>
                    {stockProduct.promotion ? (
                        <div className='-mt-1 size-4'>
                            <img
                                src={fireIcon}
                                alt='Вогонь'
                            />
                        </div>
                    ) : null}
                    {stockProduct.visible_discount > 0 ? (
                        <div className='flex h-10 items-center justify-center rounded-md bg-accent p-2 text-foreground'>
                            {stockProduct.visible_discount}%
                        </div>
                    ) : null}
                </div>
            </div>
            <div className='flex items-center justify-between gap-x-2 border-y border-y-background/60 py-2'>
                <div>
                    Ціна за шт:{' '}
                    <span className='text-accent'>{stockProduct.retail_price} ₴</span>
                </div>
                <div>
                    Сума: <span className='text-accent'>9 544,55₴ </span>
                </div>
            </div>
            <div className='flex items-center justify-between gap-x-2 border-t border-t-background/60 pt-2'>
                <StepperSelect
                    onChange={setAmount}
                    disabled={!isAvailable}
                    step={stockProduct.shop_product.packaging_of}
                    max={stockProduct.quantity || stockProduct.shop_product.packaging_of}
                    min={stockProduct.shop_product.packaging_of}
                />
                <Button
                    disabled={!isAvailable}
                    onClick={onAddingToCart}
                    className={cn(
                        'w-36',
                        addedToCart ? 'bg-[#FF7300] hover:bg-[#FF7300]/85' : ''
                    )}
                    variant='accent'
                    size='sm'
                >
                    {isAvailable ? <ShoppingBasket className='mr-2 size-4' /> : null}
                    {!isAvailable
                        ? 'Немає в наявності'
                        : addedToCart
                          ? 'Видалити'
                          : 'В кошик'}
                </Button>
            </div>
        </div>
    )
}
