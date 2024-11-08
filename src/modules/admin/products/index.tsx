import { useState } from 'react'
import { BooleanParam, StringParam, useQueryParam } from 'use-query-params'

import { SearchBar } from '../components/search-bar'

import { CategoryFilter } from './filters/category'
import { HasCode1cFilter } from './filters/has-code-1c'
import { HasImagesFilter } from './filters/has-images'
import { IsVisibleFilter } from './filters/is-visible'
import { PromoFilter } from './filters/promo'
import { AddShopProductModal } from './modals/add'
import { AddFileModal } from './modals/add-file'
import { ProductsList } from './products-list/products-list'
import { LetterFilter } from '@/components/shared/letter-filter'
import { StatusTabs } from '@/components/shared/status-tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { tableConfig } from '@/config/table'
import { useGetShopProductsQuery } from '@/store/api/shop-products/shop-products'

export const Products = () => {
    const [offset, setOffset] = useState(0)

    const [search] = useQueryParam('search', StringParam)
    const [status] = useQueryParam('status', StringParam)
    const [categories] = useQueryParam('categories', StringParam)
    const [letters] = useQueryParam('letters', StringParam)
    const [promo] = useQueryParam('promo', BooleanParam)
    const [hasCode1c] = useQueryParam('has-code-1c', BooleanParam)
    const [hasImage] = useQueryParam('has-image', BooleanParam)
    const [isVisible] = useQueryParam('is-visible', BooleanParam)

    const { data, isLoading, isFetching } = useGetShopProductsQuery({
        offset,
        limit: tableConfig.pagination.pageSize,
        search: search || '',
        statuses: status || '',
        categories: categories || '',
        startswith: letters || '',
        promotion: promo,
        has_code_1c: hasCode1c,
        has_image: hasImage,
        is_visible: isVisible
    })

    return (
        <section className='mt-10 flex flex-col gap-y-4'>
            <div className='flex items-center justify-between gap-x-8'>
                <div className='flex items-center gap-x-4'>
                    {isLoading ? (
                        <Skeleton className='size-10 rounded-lg' />
                    ) : (
                        <div className='flex h-10 min-w-10 items-center justify-center rounded-lg bg-secondary px-1'>
                            {data?.count}
                        </div>
                    )}
                    <h1 className='text-3xl font-bold text-primary'>Товари</h1>
                </div>
                <div className='flex items-center gap-4'>
                    <AddFileModal />
                    <AddShopProductModal />
                </div>
            </div>

            <div className='space-y-4'>
                <SearchBar placeholder='Пошук товарів' />
                <StatusTabs />
                <LetterFilter posibleLetters={data?.possible_letters || []} />

                <div className='flex items-center justify-between gap-4'>
                    <CategoryFilter />
                    <HasImagesFilter />
                    <PromoFilter />
                    <HasCode1cFilter />
                    <IsVisibleFilter />
                </div>
            </div>

            <ProductsList
                shopProducts={data}
                offset={offset}
                isDataFetching={isFetching}
                isDataLoading={isLoading}
                setOffset={setOffset}
            />
        </section>
    )
}
