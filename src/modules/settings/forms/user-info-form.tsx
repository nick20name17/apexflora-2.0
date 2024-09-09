import { Loader2 } from 'lucide-react'

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
import { userInfoSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'

export const UserInfoForm = () => {
    const form = useCustomForm(userInfoSchema)

    const isLoading = false

    const onSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form
                className='w-full space-y-4'
                onSubmit={form.handleSubmit(onSubmit)}
            >
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
                    name='company'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Компанія</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Flowers Shop'
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
                    name='position'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Посада</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Менеджер'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className='w-full'
                    disabled={isLoading}
                    type='submit'
                >
                    {isLoading ? <Loader2 className='size-4 animate-spin' /> : 'Змінити'}
                </Button>
            </form>
        </Form>
    )
}
