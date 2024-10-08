import { Menu, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from '../logo'

import { PhoneDropdown } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { routes } from '@/constants/routes'

export const Header = () => {
    return (
        <header className='h-[90px] bg-primary'>
            <div className='container flex h-full items-center justify-between'>
                <div className='flex items-center gap-x-12 max-xs:gap-x-6'>
                    <Logo className='!h-10 !w-16' />
                    <CatalogueSheet />
                    <div className='max-sm:hidden'>
                        <div className='text-sm text-background max-md:hidden'>
                            З’явилися питання? Зв’яжіться з нами
                        </div>
                        <PhoneDropdown />
                    </div>
                </div>

                <div className='flex items-center gap-x-2 text-background'>
                    <UserIcon className='h-5 w-5' />
                    <Link
                        className='text-background transition-colors hover:text-accent'
                        to={routes.signIn}
                    >
                        Вхід
                    </Link>
                    /
                    <Link
                        className='text-background transition-colors hover:text-accent'
                        to={routes.signUp}
                    >
                        Реєстрація
                    </Link>
                </div>
            </div>
        </header>
    )
}

const CatalogueSheet = () => {
    const [open, setOpen] = useState(false)

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
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Троянди</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Листові квіти</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Листові квіти</Link>
                        </li>{' '}
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Темно-білий квіт</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Світло-білий квіт</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Троянди</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Листові квіти</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Листові квіти</Link>
                        </li>{' '}
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Темно-білий квіт</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Світло-білий квіт</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className='border-b border-primary pb-3 text-[28px] text-primary'>
                        Флористична фурнітура
                    </h3>
                    <ul className='mt-5 grid grid-cols-4 gap-4 text-foreground/50 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3'>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Троянди</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Листові квіти</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Листові квіти</Link>
                        </li>{' '}
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Темно-білий квіт</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Світло-білий квіт</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Троянди</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Листові квіти</Link>
                        </li>
                        <li
                            className='transition-colors hover:text-primary'
                            onClick={() => setOpen(false)}
                        >
                            <Link to={routes.catalogue}>Листові квіти</Link>
                        </li>
                    </ul>
                </div>
            </SheetContent>
        </Sheet>
    )
}
