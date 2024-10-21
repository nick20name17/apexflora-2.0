import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ProductTileCard } from '@/components/shared'
import { ProductTileCardSkeleton } from '@/components/shared/product-tile-card'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'
import { useGetShopProductsQuery } from '@/store/api/shop-products/shop-products'

export const Flowers = () => {
    const { data: shopProdutcts, isLoading } = useGetShopProductsQuery({
        promotion: true
    })

    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null)

    const handleToggle = (index: number) => {
        setOpenCardIndex(openCardIndex === index ? null : index)
    }

    if (isLoading) {
        return <ProductTileCardSkeleton />
    }
    return (
        <section
            className='mt-8'
            id='flowers'
        >
            <div className='flex flex-wrap items-center justify-between gap-4'>
                <div>
                    <h2 className='text-[32px] text-primary'>Зрізані квіти</h2>
                    <p className='mt-1 text-foreground/60'>
                        Більше 1000 позицій квітів, від кращих виробників з усього світу,
                        в одному місці
                    </p>
                </div>
                <Button asChild>
                    <Link to={routes.catalogue}>До каталогу</Link>
                </Button>
            </div>

            <ul className='mt-5 grid grid-cols-3 gap-2 max-lg:grid-cols-2 max-xs:grid-cols-1'>
                {shopProdutcts?.results?.map((shopProduct, index) => (
                    <li key={shopProduct.id}>
                        <Link to={routes.catalogue}>
                            <ProductTileCard
                                isOpen={openCardIndex === index}
                                onToggle={() => handleToggle(index)}
                                shopProduct={shopProduct}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
