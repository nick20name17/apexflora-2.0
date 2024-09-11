import { ScrollArea } from '@radix-ui/react-scroll-area'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { ProductRowCard, ProductTileCard } from '@/components/shared'
import type { View } from '@/components/shared/view-tabs'
import { cn } from '@/lib/utils'

interface CatalogueProductsProps {
    view: View
}
export const CatalogueProducts = ({ view }: CatalogueProductsProps) => {
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null)

    const handleToggle = (index: number) => {
        setOpenCardIndex(openCardIndex === index ? null : index)
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
                    view === 'tiles' ? 'grid-cols-2' : 'grid-cols-1'
                )}
            >
                <AnimatePresence
                    initial={false}
                    mode='popLayout'
                >
                    {true ? (
                        Array.from({ length: 18 }).map((_, index) => (
                            <li
                                className='cursor-pointer'
                                key={index}
                            >
                                {view === 'tiles' ? (
                                    <ProductTileCard
                                        key={index}
                                        isOpen={openCardIndex === index}
                                        onToggle={() => handleToggle(index)}
                                    />
                                ) : (
                                    <ProductRowCard
                                        key={index}
                                        isOpen={openCardIndex === index}
                                        onToggle={() => handleToggle(index)}
                                    />
                                )}
                            </li>
                        ))
                    ) : (
                        <div className='flex h-20 items-center justify-center rounded-md border-2 border-secondary p-2 text-center text-2xl text-primary'>
                            Нічого не знайдено
                        </div>
                    )}
                </AnimatePresence>
            </ul>
        </ScrollArea>
    )
}
