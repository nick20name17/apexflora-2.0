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
import { ordersCoworkerSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'
import { useAddCoworkerMutation } from '@/store/api/coworkers/coworkers'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'

type OrdersCoworkerFormValues = z.infer<typeof ordersCoworkerSchema>

export const OrdersCoworkerModal = () => {
    const [open, setOpen] = useState(false)

    const form = useCustomForm(ordersCoworkerSchema, {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
    })

    const userId = useAppSelector(selectUser)?.id!

    const [addCoworker, { isLoading }] = useAddCoworkerMutation()

    const handleAddCoworker = (data: OrdersCoworkerFormValues) => {
        try {
            addCoworker({
                ...data,
                creator: userId
            }).then(() => {
                setOpen(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (formData: OrdersCoworkerFormValues) => {
        handleAddCoworker(formData)
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
                    <DialogTitle>Додати отримувача замовлень</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className='w-full space-y-4'
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
                            control={form.control}
                            name='phone_number'
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
