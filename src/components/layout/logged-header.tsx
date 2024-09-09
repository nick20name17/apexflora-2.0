import {
    Facebook,
    Heart,
    Instagram,
    LetterText,
    Menu,
    ShoppingBasket,
    UserIcon
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from '../logo'

import { PhoneDropdown, SearchBar } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { routes } from '@/constants/routes'

export const LoggedHeader = () => {
    return (
        <header className='bg-secondary'>
            <HeaderTop />
            <div className='h-[90px] bg-primary'>
                <div className='container flex h-full items-center justify-between'>
                    <div className='flex items-center gap-x-12 max-xs:gap-x-6'>
                        <Logo className='!h-10 !w-16' />
                        <CatalogueSheet />
                        <SearchBar />
                    </div>

                    <div className='flex items-center gap-x-6 text-background'>
                        <Link
                            className='flex items-center gap-x-2 transition-colors hover:text-accent'
                            to={routes.favorites}
                        >
                            <Heart className='size-5' />
                            Збережені
                        </Link>
                        <Link
                            className='flex items-center gap-x-2 transition-colors hover:text-accent'
                            to={routes.cart}
                        >
                            <ShoppingBasket className='size-5' />
                            293 ₴
                        </Link>
                        <Link
                            className='flex items-center gap-x-2 transition-colors hover:text-accent'
                            to={routes.settings}
                        >
                            <UserIcon className='size-5' />
                            Головний Адмін
                        </Link>
                    </div>
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

const HeaderTop = () => {
    return (
        <div className='container flex items-center justify-between gap-x-4 py-2 text-xs max-md:hidden'>
            <div className='flex items-center gap-x-1'>
                <span>З’явилися питання? Зв’яжіться з нами</span>
                <PhoneDropdown className='text-xs text-foreground' />
            </div>
            <div className='flex items-center gap-x-2'>
                <div className='flex items-center gap-x-4'>
                    <Link
                        className='flex items-center gap-x-1 transition-colors hover:text-primary'
                        to='https://www.facebook.com/apexflora.ua/'
                    >
                        <Facebook className='size-4' />
                        Facebook
                    </Link>

                    <Link
                        className='flex items-center gap-x-1 transition-colors hover:text-primary'
                        to='https://t.me/apexflora_ua'
                    >
                        <LetterText className='size-4' />
                        Telegram
                    </Link>

                    <Link
                        className='flex items-center gap-x-1 transition-colors hover:text-primary'
                        to='https://www.instagram.com/apexflora.ua/'
                    >
                        <Instagram className='size-4' />
                        instagram
                    </Link>
                </div>
            </div>
        </div>
    )
}
