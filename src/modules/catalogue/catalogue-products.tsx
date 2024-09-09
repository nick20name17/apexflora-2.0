import { ScrollArea } from '@radix-ui/react-scroll-area'

import { ProductRowCard } from '@/components/shared'

export const CatalogueProducts = () => {
    return (
        <ScrollArea
            className='h-[calc(100vh-230px)] overflow-y-auto'
            id='products'
        >
            <ul className='grid grid-cols-1 gap-y-2'>
                {true ? (
                    Array.from({ length: 18 }).map((_, index) => (
                        <li
                            className='cursor-pointer'
                            key={index}
                        >
                            {/* <ProductTileCard /> */}
                            <ProductRowCard />
                        </li>
                    ))
                ) : (
                    <div className='flex h-20 items-center justify-center rounded-md border-2 border-secondary p-2 text-center text-2xl text-primary'>
                        Нічого не знайдено
                    </div>
                )}
            </ul>
        </ScrollArea>
    )
}
