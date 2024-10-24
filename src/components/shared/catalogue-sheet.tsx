import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { routes } from '@/constants/routes'
import { useGetCategoriesQuery } from '@/store/api/categories/categories'

export const CatalogueSheet = () => {
    const [open, setOpen] = useState(false)

    const { data: flowersData } = useGetCategoriesQuery({
        name: 'Квіти'
    })

    const flowers = flowersData?.results?.[0]?.children || []

    const { data: furnituresData } = useGetCategoriesQuery({
        name: 'Фурнітура'
    })

    const furnitures = furnituresData?.results?.[0]?.children || []

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}
        >
            <SheetTrigger asChild>
                <Button variant='secondary'>
                    <Menu className='mr-2 size-4 max-sm:mr-0' />
                    <span className='max-sm:hidden'>Каталог</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                className='grid grid-cols-2 gap-4 pt-12 max-md:grid-cols-1'
                side='top'
            >
                <SheetTitle className='sr-only'>Каталог</SheetTitle>
                <div className=''>
                    <h3 className='border-b border-primary pb-3 text-[28px] text-primary'>
                        Квіти
                    </h3>
                    <ul className='mt-5 grid grid-cols-4 gap-4 text-foreground/50 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3'>
                        {flowers?.map((category) => (
                            <li
                                key={category.id}
                                className='transition-colors hover:text-primary'
                                onClick={() => setOpen(false)}
                            >
                                <Link
                                    to={{
                                        pathname: routes.catalogue,
                                        search: `?categories=${category.id}`
                                    }}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className='border-b border-primary pb-3 text-[28px] text-primary'>
                        Флористична фурнітура
                    </h3>
                    <ul className='mt-5 grid grid-cols-4 gap-4 text-foreground/50 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3'>
                        {furnitures?.map((category) => (
                            <li
                                key={category.id}
                                className='transition-colors hover:text-primary'
                                onClick={() => setOpen(false)}
                            >
                                <Link
                                    to={{
                                        pathname: routes.catalogue,
                                        search: `?categories=${category.id}`
                                    }}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </SheetContent>
        </Sheet>
    )
}
