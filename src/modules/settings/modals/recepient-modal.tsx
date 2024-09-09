import { Edit, TrashIcon } from 'lucide-react'
import { useState } from 'react'

import { OrdersRecepientForm } from '../forms/orders-recepient-form'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

export const EditRecepientModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size='icon'
                    variant='outline'
                >
                    <Edit className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редагувати отримувача</DialogTitle>
                </DialogHeader>
                <OrdersRecepientForm />
            </DialogContent>
        </Dialog>
    )
}

export const RemoveRecepientModal = () => {
    const [open, setOpen] = useState(false)

    const onRemove = () => {
        console.log('Remove')
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    size='icon'
                    variant='destructive'
                >
                    <TrashIcon className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Видалити отримувача?</DialogTitle>
                </DialogHeader>
                <div className='ml-auto flex items-center gap-x-4'>
                    <Button
                        onClick={onRemove}
                        size='sm'
                        variant='destructive'
                    >
                        Видалити
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        size='sm'
                        variant='outline'
                    >
                        Відмінити
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
