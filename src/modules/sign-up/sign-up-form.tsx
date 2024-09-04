import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { z } from 'zod'

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
import { signUpSchema } from '@/config/validation-schemas'
import { routes } from '@/constants/routes'
import { useCustomForm } from '@/hooks'

type SignUpFormValues = z.infer<typeof signUpSchema>

export const SignUpForm = () => {
    const form = useCustomForm(signUpSchema)

    const [error] = useState('')

    const isLoading = false

    const onSubmit = (values: SignUpFormValues) => {
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid w-full grid-cols-2 gap-4 max-md:grid-cols-1'>
                        <div className='space-y-4'>
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
                                                type='email'
                                                inputMode='email'
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
                                name='first_name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ім'я</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Андрій'
                                                type='text'
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
                                name='last_name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Прізвище</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Степаненко'
                                                type='text'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='space-y-4'>
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name='city'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Місто</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Рівне'
                                                type='text'
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
                                name='phone'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Номер телефону</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='tel'
                                                inputMode='tel'
                                                placeholder='38 067 999 95 69'
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
                        </div>
                    </div>
                    <Button
                        className='mt-5 w-full'
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
                Вже зареєстровані?{' '}
                <Link
                    className='text-primary transition-colors hover:text-accent'
                    to={routes.signIn}
                >
                    Увійти
                </Link>
            </div>

            {error ? (
                <div className='mt-4 text-sm font-medium text-destructive'>{error}</div>
            ) : null}
        </div>
    )
}
