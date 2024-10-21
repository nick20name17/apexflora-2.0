import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { ProductRowCard, ProductTileCard } from '@/components/shared'
import { ProductRowCardSkeleton } from '@/components/shared/product-row-card'
import { ProductTileCardSkeleton } from '@/components/shared/product-tile-card'
import { cn } from '@/lib/utils'
import type { ShopProductResponse } from '@/store/api/shop-products/shop-products.types'

interface CatalogueProductsProps {
    shopProducts: ShopProductResponse | undefined
    isDataRetriving: boolean
}

export const CatalogueProducts = ({
    shopProducts,
    isDataRetriving
}: CatalogueProductsProps) => {
    const [view] = useQueryParam('view', StringParam)

    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null)

    const handleToggle = (index: number) => {
        setOpenCardIndex(openCardIndex === index ? null : index)
    }

    if (isDataRetriving) {
        return view === 'lines' ? <ProductRowCardSkeleton /> : <ProductTileCardSkeleton />
    }

    return (
        <ScrollArea
            className='!static h-[calc(100vh-265px)] overflow-y-auto'
            id='products'
            asChild
        >
            <ul
                className={cn(
                    'grid gap-2',
                    view === 'tiles' && shopProducts?.count
                        ? 'grid-cols-2'
                        : 'grid-cols-1'
                )}
            >
                {shopProducts?.count ? (
                    shopProducts?.results?.map((shopProduct, index) => (
                        <li
                            className='cursor-pointer'
                            key={shopProduct.id}
                        >
                            {view === 'tiles' ? (
                                <ProductTileCard
                                    isOpen={openCardIndex === index}
                                    onToggle={() => handleToggle(index)}
                                    shopProduct={shopProduct}
                                />
                            ) : (
                                <ProductRowCard
                                    isOpen={openCardIndex === index}
                                    onToggle={() => handleToggle(index)}
                                    shopProduct={shopProduct}
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <div className='flex h-20 w-full items-center justify-center rounded-md border-2 border-secondary p-2 text-center text-2xl text-primary'>
                        Нічого не знайдено
                    </div>
                )}
            </ul>
        </ScrollArea>
    )
}
