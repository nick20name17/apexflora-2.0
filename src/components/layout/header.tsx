import { UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Logo } from '../logo'
import { CatalogueSheet } from '../shared/catalogue-sheet'

import { PhoneDropdown } from '@/components/shared'
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
