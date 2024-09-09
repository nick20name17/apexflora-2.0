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
import { ordersAddressSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'

export const OrdersAddressForm = () => {
    const form = useCustomForm(ordersAddressSchema)

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
                    name='streeet'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Вулиця</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='вул. Чорновола 24'
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
                    {isLoading ? <Loader2 className='size-4 animate-spin' /> : 'Додати'}
                </Button>
            </form>
        </Form>
    )
}
