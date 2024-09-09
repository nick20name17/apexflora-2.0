import { CatalogueProducts } from './catalogue-products'
import { CatalogueTop } from './catalogue-top'
import { CategoryTabs } from './category-tabs'
import { FiltersSidebar } from './filters-sidebar'
import { useBodyScrollLock } from '@/hooks'

export const Catalogue = () => {
    useBodyScrollLock()

    return (
        <div className='flex items-start gap-x-4'>
            <FiltersSidebar />
            <div className='mt-4 flex flex-1 flex-col gap-y-4'>
                <CatalogueTop />
                <CategoryTabs />
                <CatalogueProducts />
            </div>
        </div>
    )
}
