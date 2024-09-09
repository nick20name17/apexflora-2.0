import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

import { OrderingSelect, ViewTabs } from '@/components/shared'
import type { View } from '@/components/shared/view-tabs'
import { Button } from '@/components/ui/button'
import { animations } from '@/config/animations'

export const CatalogueTop = () => {
    const [view, setView] = useState<View>('tiles')

    return (
        <div
            className='flex items-center justify-between gap-x-2'
            id='catalogue-top'
        >
            <div className='flex items-center gap-x-4'>
                <span className='text-primary'>Знайдено товарів: 12</span>
                <AppliedFilters />
            </div>
            <div className='flex items-center gap-x-4'>
                <OrderingSelect />
                <ViewTabs
                    view={view}
                    setView={setView}
                />
            </div>
        </div>
    )
}

const AppliedFilters = () => {
    const [filters, setFilters] = useState(['Листові квіти', 'Україна', 'Листові квіти3'])

    const onFilterRemove = (filter: string) => {
        setFilters(filters.filter((f) => f !== filter))
    }

    return (
        <ul className='flex flex-wrap items-center gap-2'>
            <AnimatePresence
                initial={false}
                mode='popLayout'
            >
                {filters.map((filter) => (
                    <motion.li
                        {...animations.popLayout}
                        key={filter}
                    >
                        <Button
                            onClick={() => onFilterRemove(filter)}
                            className='h-4 rounded-full bg-secondary px-4 py-3 text-xs text-primary transition-colors hover:text-background'
                        >
                            {filter}
                            <X className='ml-2 size-4' />
                        </Button>
                    </motion.li>
                ))}
                {filters.length ? (
                    <motion.li {...animations.popLayout}>
                        <Button
                            onClick={() => setFilters([])}
                            className='text-destructive/ h-4 rounded-full bg-destructive/15 px-4 py-3 text-xs text-destructive transition-colors hover:bg-destructive hover:text-background'
                        >
                            Скинути все
                            <X className='ml-2 size-4' />
                        </Button>
                    </motion.li>
                ) : null}
            </AnimatePresence>
        </ul>
    )
}
