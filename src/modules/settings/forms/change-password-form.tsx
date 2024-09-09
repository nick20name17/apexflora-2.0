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
import { changePasswordSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'

export const ChangePasswordForm = () => {
    const form = useCustomForm(changePasswordSchema)

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
                    name='old_password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Старий пароль</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='••••••••'
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
                    name='new_password1'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Новий пароль</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='••••••••'
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
                    name='new_password2'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Підведження нового паролю</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='••••••••'
                                    type='text'
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
