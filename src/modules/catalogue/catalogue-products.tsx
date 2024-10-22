import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { ProductRowCard, ProductTileCard } from '@/components/shared'
import InfiniteScroll from '@/components/shared/infinite-scroll'
import { ProductRowCardSkeleton } from '@/components/shared/product-row-card'
import { ProductTileCardSkeleton } from '@/components/shared/product-tile-card'
import { tableConfig } from '@/config/table'
import { cn } from '@/lib/utils'
import type { ShopProductResponse } from '@/store/api/shop-products/shop-products.types'

interface CatalogueProductsProps {
    shopProducts: ShopProductResponse | undefined
    isDataFetching: boolean
    isDataLoading: boolean
    offset: number
    setOffset: React.Dispatch<React.SetStateAction<number>>
}

export const CatalogueProducts = ({
    shopProducts,
    isDataFetching,
    isDataLoading,
    setOffset,
    offset
}: CatalogueProductsProps) => {
    const [view] = useQueryParam('view', StringParam)

    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null)

    const handleToggle = (index: number) => {
        setOpenCardIndex(openCardIndex === index ? null : index)
    }

    const [hasMore, setHasMore] = useState(true)

    const next = () => {
        setOffset((prev) => prev + tableConfig.pagination.pageSize)

        if (offset + tableConfig.pagination.pageSize > shopProducts?.count!) {
            setHasMore(false)
        }
    }

    if (isDataLoading) {
        return view === 'lines' ? <ProductRowCardSkeleton /> : <ProductTileCardSkeleton />
    }

    return (
        <ScrollArea
            className='!static h-[calc(100vh-265px)] overflow-y-auto'
            id='products'
            asChild
        >
            <div>
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
                <InfiniteScroll
                    hasMore={hasMore}
                    isLoading={isDataFetching}
                    next={next}
                    threshold={1}
                >
                    {hasMore && !isDataLoading ? (
                        <Loader2 className='mx-auto my-6 size-6 animate-spin text-primary' />
                    ) : null}
                </InfiniteScroll>
            </div>
        </ScrollArea>
    )
}
