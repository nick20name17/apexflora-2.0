import { Loader2 } from 'lucide-react'
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
import { ordersCoworkerSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'
import {
    useAddCoworkerMutation,
    usePatchCoworkerMutation
} from '@/store/api/coworkers/coworkers'
import type { Coworker } from '@/store/api/coworkers/coworkers.types'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'

type OrdersCoworkerFormValues = z.infer<typeof ordersCoworkerSchema>

interface OrdersCoworkerFormProps {
    setOpen: (open: boolean) => void
    coworker?: Coworker
}

export const OrdersCoworkerForm = ({ setOpen, coworker }: OrdersCoworkerFormProps) => {
    const form = useCustomForm(ordersCoworkerSchema, {
        first_name: coworker?.first_name || '',
        last_name: coworker?.last_name || '',
        email: coworker?.email || '',
        phone_number: coworker?.phone_number || ''
    })

    const coworkerId = coworker?.id!

    const userId = useAppSelector(selectUser)?.id!

    const [addCoworker, { isLoading }] = useAddCoworkerMutation()
    const [patchCoworker, { isLoading: isPatching }] = usePatchCoworkerMutation()

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

    const handlePatchCoworker = (data: OrdersCoworkerFormValues) => {
        try {
            patchCoworker({
                data,
                id: coworkerId
            }).then(() => {
                setOpen(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (formData: OrdersCoworkerFormValues) => {
        if (coworkerId) {
            handlePatchCoworker(formData)
        } else {
            handleAddCoworker(formData)
        }
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
                    disabled={isLoading || isPatching}
                    type='submit'
                >
                    {isLoading || isPatching ? (
                        <Loader2 className='size-4 animate-spin' />
                    ) : coworkerId ? (
                        'Змінити'
                    ) : (
                        'Додати'
                    )}
                </Button>
            </form>
        </Form>
    )
}
