import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { z } from 'zod'

import { ForgetPassword } from './forget-password'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInSchema } from '@/config/validation-schemas'
import { routes } from '@/constants/routes'
import { useCustomForm } from '@/hooks'

type SignInFormValues = z.infer<typeof signInSchema>

export const SignInForm = () => {
    const form = useCustomForm(signInSchema)

    const [error] = useState('')

    const isLoading = false

    const onSubmit = (values: SignInFormValues) => {
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form
                    className='space-y-4'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Електронна пошта</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='nickname@gmail.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='.......'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ForgetPassword />
                    <Button
                        className='w-full'
                        disabled={isLoading}
                        type='submit'
                    >
                        {isLoading ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                            'Продовжити'
                        )}
                    </Button>
                </form>
            </Form>

            <div className='mt-4 text-center text-sm text-muted-foreground'>
                Новий користувач?{' '}
                <Link
                    className='text-primary transition-colors hover:text-accent'
                    to={routes.signUp}
                >
                    Зареєструйтесь
                </Link>
            </div>

            {error ? (
                <div className='mt-4 text-sm font-medium text-destructive'>{error}</div>
            ) : null}
            {/* <div className='mt-5 flex justify-end'>
                <ForgetPasswordModal disabled={isLoading} />
            </div> */}
        </div>
    )
}
