import { Facebook, Instagram, LetterText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SignInForm } from './sign-in-form'
import bg from '@/assets/images/sign-in/bg.webp'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

export const SignIn = () => {
    return (
        <div
            className='flex h-screen flex-col justify-between bg-background bg-cover bg-center'
            style={{ backgroundImage: `url(${bg})` }}
        >
            <section className='flex items-center justify-center px-2 pt-20'>
                <div>
                    <Logo className='mx-auto h-[60px] w-[98px]' />
                    <div className='mt-10 flex w-[400px] flex-col gap-y-5 rounded-lg bg-background p-10 max-md:w-80 max-md:p-6'>
                        <h1 className='text-center text-[32px] font-bold text-primary'>
                            Вхід
                        </h1>
                        <SignInForm />
                    </div>
                </div>
            </section>

            <footer className='max-sm: flex items-center justify-between gap-x-4 gap-y-2 p-8 text-center text-background max-lg:flex-wrap max-lg:justify-center'>
                <span>
                    З’явилися питання? Зв’яжіться з нами{' '}
                    <Button
                        variant='link'
                        asChild
                    >
                        <Link to='tel:+380800501930'>0 800 501 930</Link>
                    </Button>
                </span>

                <div className='flex items-center gap-x-2'>
                    <span className='max-sm:hidden'> Ми у соц. мережах:</span>
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
            </footer>
        </div>
    )
}
