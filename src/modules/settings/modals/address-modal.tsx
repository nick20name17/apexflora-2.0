import { Edit, Loader2, TrashIcon } from 'lucide-react'
import { useState } from 'react'

import { DeliverAddressForm } from '../forms/deliver-address-form'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useRemoveDeliverAddressMutation } from '@/store/api/deliver-address/deliver-address'
import type { DeliverAddress } from '@/store/api/deliver-address/deliver-address.types'

export const EditAddressModal = ({
    deliverAddress
}: {
    deliverAddress: DeliverAddress
}) => {
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
                    <DialogTitle>Редагувати адресу</DialogTitle>
                </DialogHeader>
                <DeliverAddressForm
                    deliverAddress={deliverAddress}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

export const RemoveAddressModal = ({
    deliverAddress
}: {
    deliverAddress: DeliverAddress
}) => {
    const [open, setOpen] = useState(false)

    const [removeAddress, { isLoading }] = useRemoveDeliverAddressMutation()

    const onRemove = () => {
        try {
            removeAddress(deliverAddress?.id).then(() => {
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
                    <DialogTitle>Видалити адресу?</DialogTitle>
                </DialogHeader>
                <div className='ml-auto flex items-center gap-x-4'>
                    <Button
                        className='w-24'
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
