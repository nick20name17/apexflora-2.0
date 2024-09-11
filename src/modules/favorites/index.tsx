import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
    OrderingSelect,
    ProductRowCard,
    ProductTileCard,
    ViewTabs
} from '@/components/shared'
import type { View } from '@/components/shared/view-tabs'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { ScrollArea } from '@/components/ui/scroll-area'
import { routes } from '@/constants/routes'
import { cn } from '@/lib/utils'

export const Favorites = () => {
    const [view, setView] = useState<View>('tiles')

    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null)

    const handleToggle = (index: number) => {
        setOpenCardIndex(openCardIndex === index ? null : index)
    }

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
                    <ViewTabs
                        view={view}
                        setView={setView}
                    />
                </div>
            </div>
            <div className='border-t border-t-primary pt-4'>
                <ScrollArea
                    className='h-[calc(100vh-240px)] overflow-y-auto'
                    id='products'
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
            </div>
        </div>
    )
}
