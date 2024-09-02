import { Link } from 'react-router-dom'

import { ProductTileCard } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'

export const FlowersFurniture = () => {
    return (
        <section
            className='mt-8'
            id='flowers-furniture'
        >
            <div className='flex flex-wrap items-center justify-between gap-4'>
                <div>
                    <h2 className='text-[32px] text-primary'>Флористична фурнітура</h2>
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
                {Array.from({ length: 6 }).map((_, index) => (
                    <li key={index}>
                        <Link to={routes.catalogue}>
                            <ProductTileCard />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
