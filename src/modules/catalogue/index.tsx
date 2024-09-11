import { useState } from 'react'

import { CatalogueProducts } from './catalogue-products'
import { CatalogueTop } from './catalogue-top'
import { CategoryTabs } from './category-tabs'
import { FiltersSidebar } from './filters-sidebar'
import type { View } from '@/components/shared/view-tabs'
import { useBodyScrollLock } from '@/hooks'

export const Catalogue = () => {
    const [view, setView] = useState<View>('tiles')

    useBodyScrollLock()

    return (
        <div className='flex items-start gap-x-4'>
            <FiltersSidebar />
            <div className='relative mt-4 flex flex-1 flex-col gap-y-4'>
                <CatalogueTop
                    view={view}
                    setView={setView}
                />
                <CategoryTabs />
                <CatalogueProducts view={view} />
            </div>
        </div>
    )
}
