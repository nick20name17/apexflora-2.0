import { ChevronDown, Facebook, Instagram, LetterText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Logo } from '../logo'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { routes } from '@/constants/routes'
import { cn } from '@/lib/utils'

export const Footer = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <footer className={cn('bg-primary px-6 pb-6 pt-14', className)}>
            <div className='container px-0'>
                <div className='flex items-start justify-between gap-8 max-md:flex-col'>
                    <div>
                        <Logo className='h-[44px] w-[72px]' />
                        <div className='mt-4 text-sm text-background'>
                            З’явилися питання? Зв’яжіться з нами
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='mt-0.5 flex items-center gap-x-2 border-none bg-transparent px-1 text-left text-xl text-background'>
                                067 999 95 69
                                <ChevronDown className='size-4' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link
                                        tabIndex={-1}
                                        to='tel:+380679999569'
                                    >
                                        067 999 95 69
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link
                                        tabIndex={-1}
                                        to='tel:+380639999569'
                                    >
                                        063 999 95 69
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link
                                        tabIndex={-1}
                                        to='tel:+380639999569'
                                    >
                                        063 999 95 69
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <FooterLinks />
                </div>

                <FooterBottom />
            </div>
        </footer>
    )
}

const FooterLinks = () => {
    return (
        <div className='grid grid-cols-3 gap-6 text-background max-md:w-full max-md:border-t max-md:border-background max-md:py-5 max-xs:grid-cols-1'>
            <div>
                <h3 className='sr-only font-bold'>Авторизація</h3>
                <ul className='flex flex-col gap-y-2'>
                    <li>
                        <Link
                            className='text-background transition-colors hover:text-accent'
                            to={routes.signIn}
                        >
                            Вхід
                        </Link>
                    </li>
                    <li>
                        {' '}
                        <Link
                            className='text-background transition-colors hover:text-accent'
                            to={routes.signUp}
                        >
                            Реєстрація
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className='font-bold'>Головна</h3>
                <ul className='mt-3 flex flex-col gap-y-2'>
                    <li>
                        <Link
                            className='text-background transition-colors hover:text-accent'
                            to={routes.catalogue}
                        >
                            Каталог
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='text-background transition-colors hover:text-accent'
                            to=''
                        >
                            Контакти
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className='font-bold'>Про компанію</h3>
                <ul className='mt-3 flex flex-col gap-y-2'>
                    <li>
                        <Link
                            className='text-background transition-colors hover:text-accent'
                            to={routes.paymentAndDelivery}
                        >
                            Оплата та доставка
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='text-background transition-colors hover:text-accent'
                            to=''
                        >
                            Про нас
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='text-background transition-colors hover:text-accent'
                            to=''
                        >
                            Оферта
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const FooterBottom = () => {
    return (
        <div className='mt-8 flex items-center justify-between gap-x-4 gap-y-2 border-t border-background pt-5 text-center text-background max-lg:flex-wrap max-lg:justify-center max-xs:justify-start max-xs:text-left'>
            Copyright 2023. All Rights Reserved
            <div className='flex items-center gap-x-2'>
                <span className='max-sm:hidden'>Ми у соц. мережах:</span>

                <Link
                    className='mr-2 flex items-center gap-x-1 hover:!text-accent'
                    to='https://www.facebook.com/apexflora.ua/'
                >
                    <Facebook className='size-4' />
                    Facebook
                </Link>

                <Link
                    className='mr-2 flex items-center gap-x-1 hover:!text-accent'
                    to='https://t.me/apexflora_ua'
                >
                    <LetterText className='size-4' />
                    Telegram
                </Link>

                <Link
                    className='flex items-center gap-x-1 hover:!text-accent'
                    to='https://www.instagram.com/apexflora.ua/'
                >
                    <Instagram className='size-4' />
                    instagram
                </Link>
            </div>
        </div>
    )
}
