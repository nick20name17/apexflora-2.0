import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useRemoveOrderItemsMutation } from '@/store/api/order-items/order-items'
import type { Order, OrderItem } from '@/store/api/orders/orders.types'
import { isErrorWithMessage } from '@/utils'

interface RemoveOrderItemsModalProps {
    orderItem: OrderItem
    order: Order
}

export const RemoveOrderItemsModal = ({
    orderItem,
    order
}: RemoveOrderItemsModalProps) => {
    const [removeOrderItems, { isLoading }] = useRemoveOrderItemsMutation()

    const [open, setOpen] = useState(false)

    const handleRemoveOrderItems = async (id: number) => {
        try {
            await removeOrderItems(id)
                .unwrap()
                .then(() => {
                    setOpen(false)
                    toast.success(
                        `${orderItem.stock_product.shop_product.product.name} видалено із  замовлення #${order.id}`
                    )
                })
        } catch (error) {
            const isErrorMessage = isErrorWithMessage(error)
            toast.error(isErrorMessage ? error.data.detail : 'Щось пішло не так')
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    onClick={(e) => e.stopPropagation()}
                    variant='destructive'
                    size='icon'
                >
                    <Trash2 className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>
                        Видалити{' '}
                        <span className='text-destructive'>
                            {orderItem.stock_product.shop_product.product.name}
                        </span>{' '}
                        із замовлення #{order.id}?
                    </DialogTitle>
                </DialogHeader>

                <div className='flex items-center justify-end gap-x-4'>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpen(false)
                        }}
                        size='sm'
                        variant='secondary'
                    >
                        Відмінити
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveOrderItems(orderItem.id)
                        }}
                        size='sm'
                        variant='destructive'
                        className='flex w-24 items-center gap-x-1.5'
                    >
                        {isLoading ? (
                            <Loader2 className='size-4 animate-spin' />
                        ) : (
                            'Видалити'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
