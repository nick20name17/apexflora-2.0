import { Facebook, Instagram, LetterText } from 'lucide-react'
import { Link } from 'react-router-dom'

export const AuthFooter = () => {
    return (
        <footer className='max-sm: flex items-center justify-between gap-x-4 gap-y-2 p-8 text-center text-background max-lg:flex-wrap max-lg:justify-center'>
            <span>
                З’явилися питання? Зв’яжіться з нами{' '}
                <Link
                    className='transition-colors hover:text-accent'
                    to='tel:+380800501930'
                >
                    0 800 501 930
                </Link>
            </span>

            <div className='flex items-center gap-x-4'>
                <span className='max-sm:hidden'> Ми у соц. мережах:</span>
                <Link
                    className='flex items-center gap-x-1 transition-colors hover:text-accent'
                    to='https://www.facebook.com/apexflora.ua/'
                >
                    <Facebook className='size-4' />
                    Facebook
                </Link>

                <Link
                    className='flex items-center gap-x-1 transition-colors hover:text-accent'
                    to='https://t.me/apexflora_ua'
                >
                    <LetterText className='size-4' />
                    Telegram
                </Link>

                <Link
                    className='flex items-center gap-x-1 transition-colors hover:text-accent'
                    to='https://www.instagram.com/apexflora.ua/'
                >
                    <Instagram className='size-4' />
                    instagram
                </Link>
            </div>
        </footer>
    )
}
