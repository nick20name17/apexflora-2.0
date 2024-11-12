import { useState } from 'react'

import { EditQuantity } from '../modals/edit-quantity'
import { EditStockModal } from '../modals/edit-stock'
import { RemoveStockModal } from '../modals/remove-stock'

import fireIcon from '@/assets/icons/fire.png'
import { getStatusProductsDisplay } from '@/components/shared/product-statuses-cards'
import { StepperSelect } from '@/components/ui/stepper-select'
import { cn } from '@/lib/utils'
import type { Stock } from '@/store/api/shop-products/shop-products.types'

interface ProductStatusesCardProps {
    stocks: Stock[]
}

export const ProductStatusesCards = ({ stocks }: ProductStatusesCardProps) => {
    return (
        <div className='grid grid-cols-3 gap-2 pt-4'>
            {stocks.map((stock) => (
                <ProductStatusCard
                    key={stock.id}
                    stock={stock}
                />
            ))}
        </div>
    )
}

const ProductStatusCard = ({ stock }: { stock: Stock }) => {
    const [amount, setAmount] = useState(stock.shop_product.packaging_of)

    const isAvailable = stock.quantity > 0

    const { name, icon } = getStatusProductsDisplay(stock.status.id)

    const productQuantity = stock.status.id === 3 ? '∞' : stock.quantity + ' шт'

    const totalPrice = amount * +stock.retail_price

    return (
        <div
            className={cn(
                'w-full rounded-lg bg-secondary/20 p-4 text-sm text-background',
                stock.is_visible ? '' : 'opacity-65'
            )}
        >
            <div className='flex items-center justify-between gap-x-2 pb-2'>
                <div className='flex items-center gap-x-3'>
                    {icon}

                    <div className='flex flex-col'>
                        <span>{name}</span>
                        <div className='flex items-center gap-x-2'>
                            <span className='text-sm text-secondary/60'>
                                {productQuantity}
                            </span>
                            {stock.status.id === 3 ? null : (
                                <EditQuantity stock={stock} />
                            )}
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
                <div className='flex items-center gap-x-2'>
                    <EditStockModal stock={stock} />
                    <RemoveStockModal stock={stock as any} />
                </div>
            </div>
        </div>
    )
}
