import { AuthFooter } from '../auth-footer'

import { SignUpForm } from './sign-up-form'
import bg from '@/assets/images/sign-in/bg.webp'
import { Logo } from '@/components/logo'

export const SignUp = () => {
    return (
        <div
            className='flex min-h-screen flex-col justify-between bg-background bg-cover bg-center'
            style={{ backgroundImage: `url(${bg})` }}
        >
            <section className='flex items-center justify-center px-2 pt-20'>
                <div>
                    <Logo className='mx-auto h-[60px] w-[98px]' />
                    <div className='mt-10 flex w-[700px] flex-col gap-y-5 rounded-lg bg-background p-10 max-md:w-96 max-md:p-6 max-xs:w-80'>
                        <h1 className='text-center text-[32px] font-bold text-primary'>
                            Реєстрація
                        </h1>
                        <SignUpForm />
                    </div>
                </div>
            </section>

            <AuthFooter />
        </div>
    )
}
