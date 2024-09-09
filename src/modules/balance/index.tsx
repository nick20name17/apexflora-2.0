import { Link } from 'react-router-dom'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { routes } from '@/constants/routes'

export const Balance = () => {
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
                        <BreadcrumbPage>Баланс</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='py-4'>
                <h1 className='text-[32px] font-bold text-primary'>Баланс</h1>
            </div>
            <div className='border-t border-t-primary pt-4'>
                <p className='text-2xl font-bold text-foreground/60'>
                    Цей блок знаходиться на стадії розробки
                </p>
            </div>
        </div>
    )
}
