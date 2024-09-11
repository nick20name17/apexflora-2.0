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
import { ordersAddressSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'
import {
    useAddDeliverAddressMutation,
    usePatchDeliverAddressMutation
} from '@/store/api/deliver-address/deliver-address'
import type { DeliverAddress } from '@/store/api/deliver-address/deliver-address.types'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'

interface DeliverAddressFormProps {
    deliverAddress?: DeliverAddress
    setOpen: (open: boolean) => void
}

type DeliverAddressFormValues = z.infer<typeof ordersAddressSchema>

export const DeliverAddressForm = ({
    deliverAddress,
    setOpen
}: DeliverAddressFormProps) => {
    const form = useCustomForm(ordersAddressSchema, {
        city: deliverAddress?.city || '',
        street: deliverAddress?.street || ''
    })

    const userId = useAppSelector(selectUser)?.id!

    const [addAddress, { isLoading }] = useAddDeliverAddressMutation()
    const [patchAddress, { isLoading: isPatching }] = usePatchDeliverAddressMutation()

    const handlePatchAddress = (data: DeliverAddressFormValues) => {
        try {
            patchAddress({
                data,
                id: deliverAddress?.id!
            }).then(() => {
                setOpen(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddAddress = (data: DeliverAddressFormValues) => {
        console.log(deliverAddress)

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
        if (deliverAddress?.id) {
            handlePatchAddress(values)
        } else {
            handleAddAddress(values)
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
                    disabled={isLoading || isPatching}
                    type='submit'
                >
                    {isLoading || isPatching ? (
                        <Loader2 className='size-4 animate-spin' />
                    ) : deliverAddress?.id ? (
                        'Змінити'
                    ) : (
                        'Додати'
                    )}
                </Button>
            </form>
        </Form>
    )
}
