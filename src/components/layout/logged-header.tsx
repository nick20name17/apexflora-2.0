import {
    Facebook,
    Heart,
    Instagram,
    LetterText,
    ShoppingBasket,
    UserIcon
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Logo } from '../logo'
import { CatalogueSheet } from '../shared/catalogue-sheet'

import { PhoneDropdown, SearchBar } from '@/components/shared'
import { routes } from '@/constants/routes'
import { useGetBasketsQuery } from '@/store/api/baskets/baskets'

export const LoggedHeader = () => {
    const { data: baskets } = useGetBasketsQuery({
        limit: 1000
    })

    const totalBasketPrice = baskets?.results.reduce((acc, item) => {
        return acc + item.amount * +item.stock_product.retail_price
    }, 0)

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
                            {totalBasketPrice || 0} ₴
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
