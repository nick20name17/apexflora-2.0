import { Edit, Loader2, TrashIcon } from 'lucide-react'
import { useState } from 'react'

import { OrdersCoworkerForm } from '../forms/orders-coworker-form'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useRemoveCoworkerMutation } from '@/store/api/coworkers/coworkers'
import type { Coworker } from '@/store/api/coworkers/coworkers.types'

export const EditCoworkerModal = ({ coworker }: { coworker: Coworker }) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
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
                <OrdersCoworkerForm
                    setOpen={setOpen}
                    coworker={coworker}
                />
            </DialogContent>
        </Dialog>
    )
}

export const RemoveCoworkerModal = ({ coworker }: { coworker: Coworker }) => {
    const [open, setOpen] = useState(false)

    const [removeCoworker, { isLoading }] = useRemoveCoworkerMutation()

    const onRemove = () => {
        try {
            removeCoworker(coworker.id).then(() => {
                setOpen(false)
            })
        } catch (error) {
            console.log(error)
        }
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
                        className='w-24'
                        disabled={isLoading}
                        onClick={onRemove}
                        size='sm'
                        variant='destructive'
                    >
                        {isLoading ? (
                            <Loader2 className='size-4 animate-spin' />
                        ) : (
                            'Видалити'
                        )}
                    </Button>
                    <Button
                        className='w-24'
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
