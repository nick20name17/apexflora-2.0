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

export const LoyaltyProgram = () => {
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
                        <BreadcrumbPage>Програма лояльності</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='py-4'>
                <h1 className='text-[32px] font-bold text-primary'>
                    Програма лояльності
                </h1>
            </div>
            <div className='border-t border-t-primary pt-4'>
                <ul className='flex flex-col gap-y-4'>
                    <li className='flex items-center justify-between gap-4 rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'>
                        <div>
                            <h2 className='text-xl font-bold text-primary'>
                                Новому користувачеві
                            </h2>
                            <p className='mt-1 text-foreground/60'>
                                Даруємо знижку 7% на перше замовлення з нашого веб-шопу.
                                Обирай кращі пропозиції квітів з додатковою вигодою. 7%
                            </p>
                        </div>
                        <div className='flex size-14 flex-shrink-0 items-center justify-center rounded-md bg-accent p-2 font-bold text-foreground'>
                            7%
                        </div>
                    </li>
                    <li className='flex items-center justify-between gap-4 rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'>
                        <div>
                            <h2 className='text-xl font-bold text-primary'>
                                При замовлені з веб-шопу
                            </h2>
                            <p className='mt-1 text-foreground/60'>
                                Гарантована знижка 3% при кожному наступному замовленні з
                                нашого веб-шопу. Купуйте квіти, професійно та з економією.
                            </p>
                        </div>
                        <div className='flex size-14 flex-shrink-0 items-center justify-center rounded-md bg-accent p-2 font-bold text-foreground'>
                            3%
                        </div>
                    </li>
                    <li className='flex items-center justify-between gap-4 rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'>
                        <div>
                            <h2 className='text-xl font-bold text-primary'>
                                При замовлені з веб-шопу
                            </h2>
                            <p className='mt-1 text-foreground/60'>
                                1% при купівлі на суму від 10 000 ₴. <br />
                                2% при купівлі на суму від 25 000 ₴. <br />
                                3% при купівлі на суму від 40 000 ₴
                            </p>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <div className='flex size-14 flex-shrink-0 items-center justify-center rounded-md bg-accent p-2 font-bold text-foreground'>
                                1%
                            </div>
                            <div className='flex size-14 flex-shrink-0 items-center justify-center rounded-md bg-accent p-2 font-bold text-foreground'>
                                2%
                            </div>
                            <div className='flex size-14 flex-shrink-0 items-center justify-center rounded-md bg-accent p-2 font-bold text-foreground'>
                                3%
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
