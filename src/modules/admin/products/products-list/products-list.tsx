import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { ProductRowCard } from './product-row-card'
import InfiniteScroll from '@/components/shared/infinite-scroll'
import { ProductRowCardSkeleton } from '@/components/shared/product-row-card'
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

export const ProductsList = ({
    shopProducts,
    isDataFetching,
    isDataLoading,
    setOffset,
    offset
}: CatalogueProductsProps) => {
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
        return <ProductRowCardSkeleton />
    }

    return (
        <ScrollArea
            className='!static h-[calc(100vh-265px)] overflow-y-auto'
            id='products'
            asChild
        >
            <div>
                <ul className={cn('grid grid-cols-1 gap-2')}>
                    {shopProducts?.count ? (
                        shopProducts?.results?.map((shopProduct, index) => (
                            <li
                                className='cursor-pointer'
                                key={shopProduct.id}
                            >
                                <ProductRowCard
                                    isOpen={openCardIndex === index}
                                    onToggle={() => handleToggle(index)}
                                    shopProduct={shopProduct}
                                />
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
