import { CirclePlus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { AddUserModal } from '../../users/modals/add'
import { AddressSelect } from '../address-select'
import { getStatusName } from '../order-card'
import { ProductsCatalogue } from '../products-catalogue'
import { RecepientSelect } from '../recepient-select'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { orderStatuses } from '@/constants/orders'
import { useCustomForm } from '@/hooks/use-custom-form'
import { useAddAdminOrderMutation } from '@/store/api/orders/orders'
import type { Statuses } from '@/store/api/orders/orders.types'
import { isErrorWithMessage } from '@/utils'

const orderSchema = z.object({
    recipient: z.object({
        id: z.string().min(1, 'Це поле обовязкове'),
        name: z.string().min(1, 'Це поле обовязкове')
    }),
    address: z.object({
        id: z.string().min(1, 'Це поле обовязкове'),
        name: z.string().min(1, 'Це поле обовязкове')
    }),
    order_items: z.array(
        z.object({
            id: z.number().min(1, 'Це поле обовязкове'),
            amount: z.number().min(1, 'Це поле обовязкове')
        })
    ),
    status: z
        .enum(['pending', 'approval', 'shipped', 'delivered', 'canceled'])
        .default('pending'),
    is_supplier: z.boolean().default(false)
})

type OrderFormValues = Zod.infer<typeof orderSchema>

export const AddOrderModal = () => {
    const [open, setOpen] = useState(false)

    const [addOrder, { isLoading }] = useAddAdminOrderMutation()

    const form = useCustomForm(orderSchema, {
        recipient: {
            id: '',
            name: ''
        },
        address: {
            id: '',
            name: ''
        },
        order_items: [],
        status: 'pending',
        is_supplier: false
    })

    const handleAddOrder = (data: OrderFormValues) => {
        const payload = {
            ...data,
            creator: +data.recipient.id,
            discount: 0,
            recipient: +data.recipient.id,
            address: data.address.id === 'self-pick' ? undefined : +data.address.id
        }
        try {
            addOrder(payload)
                .unwrap()
                .then(() => {
                    toast.success(`Замовлення  успішно додано`)
                    setOpen(false)
                    form.reset()
                })
        } catch (error) {
            const isErrorMessage = isErrorWithMessage(error)
            toast.error(isErrorMessage ? error.data.detail : 'Щось пішло не так')
        }
    }

    const onOrderEdit = (formData: OrderFormValues) => {
        handleAddOrder(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button size='sm'>
                    <CirclePlus className='mr-2 size-4' />
                    Додати нове замовлення
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 max-w-[800px] rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle> Додати замовлення</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onOrderEdit)}
                    >
                        <div className='flex flex-wrap items-center gap-4'>
                            <FormField
                                control={form.control}
                                name='recipient'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Отримувач</FormLabel>
                                        <div className='flex items-center gap-x-2'>
                                            <FormControl>
                                                <RecepientSelect
                                                    recepient={field.value}
                                                    setRecepient={field.onChange}
                                                />
                                            </FormControl>
                                            <AddUserModal size='icon' />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='status'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Статус</FormLabel>
                                        <FormControl>
                                            <OrderStatusSelect
                                                status={field.value}
                                                setStatus={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex flex-wrap items-center gap-4'>
                            <FormField
                                control={form.control}
                                name='address'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>
                                            Адреса доставки (обраного отримувача)
                                        </FormLabel>

                                        <div className='flex items-center gap-x-2'>
                                            <FormControl>
                                                <AddressSelect
                                                    disabled={!form.watch('recipient.id')}
                                                    recepientId={
                                                        +form.watch('recipient.id')
                                                    }
                                                    address={field.value}
                                                    setAddress={field.onChange}
                                                />
                                            </FormControl>

                                            {/* <AddUserModal size='icon' /> */}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='order_items'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Каталог продуктів</FormLabel>

                                        <div className='flex items-center gap-x-2'>
                                            <FormControl>
                                                <ProductsCatalogue
                                                    orderItems={field.value}
                                                    setOrderItems={field.onChange}
                                                />
                                            </FormControl>

                                            {/* <AddUserModal size='icon' /> */}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* <div className='flex flex-wrap items-center gap-4 border-b border-b-primary pb-4'>
                            <FormField
                                control={form.control}
                                name='phone_number'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
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
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Електронна пошта</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                inputMode='email'
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
                                name='role'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Роль</FormLabel>
                                        <FormControl>
                                            <RoleSelect
                                                role={field.value}
                                                setRole={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div> */}

                        <div className='grid grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='is_supplier'
                                render={({ field }) => (
                                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2'>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className='space-y-1 leading-none'>
                                            <FormLabel>
                                                Замовлення на надходження
                                            </FormLabel>
                                            <FormDescription>
                                                Якесь пояснення
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={isLoading}
                            type='submit'
                            size='sm'
                            className='w-40'
                        >
                            {isLoading ? <Loader2 className='animate-spin' /> : 'Додати'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

interface OrderStatusSelectProps {
    status: Statuses
    setStatus: React.Dispatch<React.SetStateAction<Statuses>>
}

const OrderStatusSelect = ({ status, setStatus }: OrderStatusSelectProps) => {
    const onStatusChange = (status: string) => {
        setStatus(status as Statuses)
    }

    return (
        <Select
            value={status}
            onValueChange={onStatusChange}
        >
            <SelectTrigger>
                <SelectValue placeholder='Статус замовлення' />
            </SelectTrigger>
            <SelectContent>
                {orderStatuses?.map((orderStatus) => (
                    <SelectItem
                        key={orderStatus}
                        value={orderStatus}
                    >
                        {getStatusName(orderStatus).displayName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
