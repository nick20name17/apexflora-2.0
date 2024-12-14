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
import { useRemoveOrdersMutation } from '@/store/api/orders/orders'
import type { Order } from '@/store/api/orders/orders.types'

interface RemoveOrderModalProps {
    order: Order
}

export const RemoveOrderModal = ({ order }: RemoveOrderModalProps) => {
    const [removeOrder, { isLoading }] = useRemoveOrdersMutation()

    const [open, setOpen] = useState(false)

    const handleRemoveOrder = (id: number) => {
        try {
            removeOrder(id).then(() => {
                setOpen(false)
                toast.success(`Замовлення #${order.id} успішно видалено`)
            })
        } catch (error) {
            toast.error('Щось пішло не так')
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
                        Видалити замовлення{' '}
                        <span className='text-destructive'>#{order.id}</span>?
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
                            handleRemoveOrder(order.id)
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
