import { useState } from 'react'
import { toast } from 'sonner'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { orderStatuses } from '@/constants/orders'
import { cn } from '@/lib/utils'
import { usePatchOrdersMutation } from '@/store/api/orders/orders'
import type { Order, OrdersAddData, Statuses } from '@/store/api/orders/orders.types'
import { isErrorWithMessage } from '@/utils'

const getStatusName = (statusName: Statuses) => {
    const statuses = {
        pending: {
            displayName: 'Очікує підтвердження',
            className: 'bg-[#FF7300] text-primary'
        },
        approval: {
            displayName: 'Підтверджено',
            className: 'bg-primary text-background'
        },
        shipped: {
            displayName: 'Відправлено',
            className: 'bg-sky-400'
        },
        delivered: {
            displayName: 'Виконано',
            className: 'bg-accent text-primary'
        },
        canceled: {
            displayName: 'Скасовано',
            className: 'bg-destructive text-background'
        }
    }

    return statuses[statusName]
}

interface OrderStatusSelectProps {
    order: Order
}

export const OrderStatusSelect = ({ order }: OrderStatusSelectProps) => {
    const [status, setStatus] = useState<Statuses>(order.status)

    const [patchOrder] = usePatchOrdersMutation()

    const handlePatchOrder = async (id: number, data: Partial<OrdersAddData>) => {
        try {
            await patchOrder({ id, data })
                .unwrap()
                .then(() => {
                    toast.success(
                        `Статус замовлення #${order.id} успішно змінено на ${getStatusName(status).displayName}`
                    )
                })
        } catch (error) {
            const isErrorMessage = isErrorWithMessage(error)
            toast.error((isErrorMessage && error.data.detail) || 'Щось пішло не так')
        }
    }

    const { className } = getStatusName(status)

    const onStatusChange = (status: string) => {
        setStatus(status as Statuses)
        handlePatchOrder(order.id, { status: status as Statuses })
    }

    return (
        <Select
            value={status}
            onValueChange={onStatusChange}
        >
            <SelectTrigger
                className={cn(
                    'h-7 border-none p-2 focus-visible:ring-transparent focus-visible:ring-offset-0',
                    className
                )}
            >
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
