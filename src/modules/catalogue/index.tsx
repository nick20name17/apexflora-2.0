import { useEffect, useState } from 'react'
import { BooleanParam, StringParam, useQueryParam } from 'use-query-params'

import { CatalogueProducts } from './catalogue-products'
import { CatalogueTop } from './catalogue-top'
import { FiltersSidebar } from './filters-sidebar'
import { StatusTabs } from './status-tabs'
import { setCurrentQueryParams } from './store/catalogue'
import { tableConfig } from '@/config/table'
import { useBodyScrollLock } from '@/hooks'
import { useGetShopProductsQuery } from '@/store/api/shop-products/shop-products'
import { useAppDispatch } from '@/store/hooks/hooks'

export interface ActiveFilter {
    id: string
    label: string
}

export const Catalogue = () => {
    const [status] = useQueryParam('status', StringParam)
    const [ordering] = useQueryParam('ordering', StringParam)
    const [promo] = useQueryParam('promo', BooleanParam)
    const [colors] = useQueryParam('colors', StringParam)
    const [price] = useQueryParam('price', StringParam)
    const [height] = useQueryParam('height', StringParam)
    const [categories] = useQueryParam('categories', StringParam)
    const [countries] = useQueryParam('countries', StringParam)

    const [offset, setOffset] = useState(0)

    const queryParams = {
        limit: tableConfig.pagination.pageSize,
        offset,
        statuses: status!,
        ordering: ordering!,
        price: price!,
        height: height!,
        countries: countries!,
        categories: categories!,
        promotion: promo!,
        colors: colors!
    }

    const { data, isLoading, isFetching } = useGetShopProductsQuery(queryParams)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCurrentQueryParams(queryParams))
    }, [queryParams])

    useBodyScrollLock()

    return (
        <div className='flex items-start gap-x-4'>
            <FiltersSidebar />
            <div className='relative mt-4 flex flex-1 flex-col gap-y-4'>
                <CatalogueTop
                    shopProductsCount={data?.count || 0}
                    isDataRetriving={isLoading || isFetching}
                />
                <StatusTabs />
                <CatalogueProducts
                    offset={offset}
                    setOffset={setOffset}
                    shopProducts={data}
                    isDataFetching={isFetching}
                    isDataLoading={isLoading}
                />
            </div>
        </div>
    )
}
