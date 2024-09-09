import { Link } from 'react-router-dom'

import { OrdersTabs } from './orders-tabs'
import { OrderCard } from '@/components/shared'
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

export const Orders = () => {
    return (
        <div className='w-full py-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={routes.main}>Головна</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Замовлення</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='py-4'>
                <h1 className='text-[32px] font-bold text-primary'>Замовлення</h1>
            </div>
            <div className='border-t border-t-primary pt-4'>
                <OrdersTabs />

                <ScrollArea
                    className='mt-4 h-[calc(100vh-230px)] overflow-y-auto'
                    id='products'
                >
                    <ul className='grid grid-cols-1 gap-y-2'>
                        {true ? (
                            Array.from({ length: 18 }).map((_, index) => (
                                <li
                                    className='cursor-pointer'
                                    key={index}
                                >
                                    <OrderCard />
                                </li>
                            ))
                        ) : (
                            <div className='flex h-20 items-center justify-center rounded-md border-2 border-secondary p-2 text-center text-2xl text-primary'>
                                Нічого не знайдено
                            </div>
                        )}
                    </ul>
                </ScrollArea>
            </div>
        </div>
    )
}
