import { Car } from 'lucide-react'
import { Link } from 'react-router-dom'

import { CartProductCard } from '@/components/shared'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'

export const Cart = () => {
    const isEmpty = false

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
                        <BreadcrumbPage>Кошик</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {isEmpty ? (
                <div className='mt-4 flex flex-col items-center justify-center gap-y-4'>
                    <h1 className='text-[32px] font-bold text-primary'>Кошик пустий</h1>

                    <Button
                        variant='outline'
                        asChild
                    >
                        <Link to={routes.catalogue}>Продовжити покупки</Link>
                    </Button>
                </div>
            ) : (
                <div className='mt-4'>
                    <h1 className='text-[32px] font-bold text-primary'>Кошик</h1>

                    <div className='mt-8'>
                        <div className='flex items-center justify-between gap-x-4 text-xl text-primary'>
                            <div className='flex items-center gap-x-2'>
                                <Car className='size-6' />
                                <span>В наявності</span>
                            </div>
                            <div>
                                <span>290 ₴</span>
                            </div>
                        </div>
                        <div className='mt-2 border-t border-t-secondary py-4'>
                            <CartProductCard />
                        </div>
                    </div>

                    <div className='flex items-center justify-end border-t border-t-secondary py-4'>
                        <span className='text-2xl text-primary'>Всього 290 ₴</span>
                    </div>

                    <div className='flex items-center justify-end gap-4 border-t border-t-secondary pt-4'>
                        <Button
                            variant='outline'
                            asChild
                        >
                            <Link to={routes.catalogue}>Продовжити покупки</Link>
                        </Button>
                        <Button asChild>
                            <Link to={routes.checkout}>Оформити замовлення</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
