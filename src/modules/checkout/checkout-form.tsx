import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BooleanParam, useQueryParam } from 'use-query-params'
import { type infer as zodInfer } from 'zod'

import { OrdersCoworkerModal } from './modals/coworker-addres'
import { DeliverAddressModal } from './modals/deliver-addres'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { addOrderSchema } from '@/config/validation-schemas'
import { routes } from '@/constants/routes'
import { useCustomForm } from '@/hooks'
import { cn } from '@/lib/utils'
import { useGetCoworkersQuery } from '@/store/api/coworkers/coworkers'
import { useGetDeliverAddressQuery } from '@/store/api/deliver-address/deliver-address'
import { useAddOrderMutation } from '@/store/api/orders/orders'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'

type CheckoutFormValues = zodInfer<typeof addOrderSchema>

export const CheckoutForm = () => {
    const user = useAppSelector(selectUser)
    const navigate = useNavigate()

    const [_, setCheckout] = useQueryParam('checkout', BooleanParam)

    const userId = user?.id!

    const [addOrder, { isLoading }] = useAddOrderMutation()

    const handleAddOrder = (values: CheckoutFormValues) => {
        try {
            addOrder({
                address: +values.address,
                recipient: +values.recepient,
                creator: userId,
                status: 'pending'
            }).then(() => {
                setCheckout(true)
                navigate(routes.catalogue, {
                    state: {
                        isOrdered: true
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [step, setStep] = useState(1)

    const { data: deliveryAddresses } = useGetDeliverAddressQuery({
        creator: userId
    })

    const deliverAddress = deliveryAddresses?.results || []

    const { data: coworkers } = useGetCoworkersQuery({
        creator: userId
    })

    const userCoworkers = coworkers?.results || []

    const defaultAddressId = deliverAddress?.[deliverAddress?.length - 1]?.id.toString()

    const defaultUserCoworkerId =
        userCoworkers?.[userCoworkers?.length - 1]?.id.toString()

    const form = useCustomForm(addOrderSchema, {
        username: user?.first_name + ' ' + user?.last_name,
        phone_number: user?.phone_number || '',
        address: defaultAddressId,
        recepient: defaultUserCoworkerId
    })

    const { address, phone_number, recepient, username } = form.watch()

    const onCheckout = (values: CheckoutFormValues) => {
        handleAddOrder(values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onCheckout)}
                className='flex-1 space-y-4'
            >
                <h2
                    className={cn(
                        'border-b border-b-primary pb-4 text-xl font-bold text-primary transition-opacity',
                        step === 1 ? '' : 'opacity-25'
                    )}
                >
                    1. Контактна інформація
                </h2>
                {step === 1 ? (
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Прізвище та ім’я</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='shadcn'
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
                                            placeholder='+380679999569'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            onClick={() => setStep(2)}
                            disabled={!phone_number || !username}
                            className='w-full'
                            type='button'
                        >
                            Продовжити
                        </Button>
                    </div>
                ) : null}

                <h2
                    className={cn(
                        'border-b border-b-primary pb-4 text-xl font-bold text-primary transition-opacity',
                        step === 2 ? '' : 'opacity-25'
                    )}
                >
                    2. Інформація про отримувача
                </h2>
                {step === 2 ? (
                    <FormField
                        control={form.control}
                        name='recepient'
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Отримувач</FormLabel>
                                    <div className='flex items-center gap-x-4'>
                                        <Select
                                            disabled={deliverAddress.length === 0}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Оберіть отримувача' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {userCoworkers.map((userCoworker) => (
                                                    <SelectItem
                                                        key={userCoworker.id}
                                                        value={userCoworker.id.toString()}
                                                    >
                                                        {userCoworker.first_name +
                                                            ' ' +
                                                            userCoworker.last_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <OrdersCoworkerModal />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                <div className='flex items-center gap-x-4'>
                                    <Button
                                        className='flex-1'
                                        onClick={() => setStep(3)}
                                        disabled={!recepient}
                                        type='button'
                                    >
                                        Продовжити
                                    </Button>
                                    <Button
                                        className='flex-1'
                                        variant='secondary'
                                        onClick={() => setStep(1)}
                                        type='button'
                                    >
                                        Назад
                                    </Button>
                                </div>
                            </>
                        )}
                    />
                ) : (
                    ''
                )}

                <h2
                    className={cn(
                        'border-b border-b-primary pb-4 text-xl font-bold text-primary transition-opacity',
                        step === 3 ? '' : 'opacity-25'
                    )}
                >
                    3. Доставка
                </h2>

                {step === 3 ? (
                    <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Адреса доставки</FormLabel>
                                    <div className='flex items-center gap-x-4'>
                                        <Select
                                            disabled={deliverAddress.length === 0}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Оберіть адресу доставки' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {deliverAddress.map((deliverAddress) => (
                                                    <SelectItem
                                                        key={deliverAddress.id}
                                                        value={deliverAddress.id.toString()}
                                                    >
                                                        {deliverAddress.street}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <DeliverAddressModal />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                <div className='flex items-center gap-x-4'>
                                    <Button
                                        className='flex-1'
                                        disabled={!address || isLoading}
                                        type='submit'
                                    >
                                        Замовити
                                    </Button>
                                    <Button
                                        className='flex-1'
                                        variant='secondary'
                                        onClick={() => setStep(2)}
                                        type='button'
                                    >
                                        Назад
                                    </Button>
                                </div>
                            </>
                        )}
                    />
                ) : (
                    ''
                )}
            </form>
        </Form>
    )
}
