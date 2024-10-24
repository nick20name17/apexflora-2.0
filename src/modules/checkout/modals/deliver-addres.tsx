import { Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
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
import { useAddDeliverAddressMutation } from '@/store/api/deliver-address/deliver-address'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'

type DeliverAddressFormValues = z.infer<typeof ordersAddressSchema>
export const DeliverAddressModal = () => {
    const [open, setOpen] = useState(false)

    const form = useCustomForm(ordersAddressSchema, {
        city: '',
        street: ''
    })

    const userId = useAppSelector(selectUser)?.id!

    const [addAddress, { isLoading }] = useAddDeliverAddressMutation()

    const handleAddAddress = (data: DeliverAddressFormValues) => {
        try {
            addAddress({
                ...data,
                creator: userId
            }).then(() => {
                setOpen(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (values: DeliverAddressFormValues) => {
        handleAddAddress(values)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    size='icon'
                    type='button'
                >
                    <Plus className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Додати адресу доставки</DialogTitle>
                </DialogHeader>
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
                            name='street'
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
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Додати'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
