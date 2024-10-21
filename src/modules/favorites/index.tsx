import { Link } from 'react-router-dom'
import { StringParam, useQueryParam } from 'use-query-params'

import { CatalogueProducts } from '../catalogue/catalogue-products'

import { OrderingSelect, ViewTabs } from '@/components/shared'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { routes } from '@/constants/routes'
import { useGetShopProductsQuery } from '@/store/api/shop-products/shop-products'

export const Favorites = () => {
    const [ordering] = useQueryParam('ordering', StringParam)

    const { data, isLoading, isFetching } = useGetShopProductsQuery({
        limit: 10,
        offset: 0,
        in_wish_list: 'true',
        ordering: ordering!
    })

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
                        <BreadcrumbPage>Збережене</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex items-center justify-between gap-x-4 py-4'>
                <h1 className='text-[32px] font-bold text-primary'>Збережене</h1>

                <div className='flex items-center gap-x-4'>
                    <OrderingSelect />
                    <ViewTabs />
                </div>
            </div>
            <div className='relative border-t border-t-primary pt-4'>
                <CatalogueProducts
                    isDataRetriving={isFetching || isLoading}
                    shopProducts={data}
                />
            </div>
        </div>
    )
}
