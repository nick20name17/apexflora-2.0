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
import { useRemoveProducerMutation } from '@/store/api/producers/producers'
import type { Producer } from '@/store/api/shop-products/shop-products.types'

interface RemoveProducerModalProps {
    producer: Producer
}

export const RemoveProducerModal = ({ producer }: RemoveProducerModalProps) => {
    const [removeProducer, { isLoading }] = useRemoveProducerMutation()

    const [open, setOpen] = useState(false)

    const handleRemoveProducer = (id: number) => {
        try {
            removeProducer(id).then(() => {
                setOpen(false)
                toast.success('Виробника успішно видалено')
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
                    variant='destructive'
                    size='icon'
                >
                    <Trash2 className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>
                        Видалити колір{' '}
                        <span className='text-destructive'>{producer.name}</span>?
                    </DialogTitle>
                </DialogHeader>

                <div className='flex items-center justify-end gap-x-4'>
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        size='sm'
                        variant='secondary'
                    >
                        Відмінити
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={() => {
                            handleRemoveProducer(producer.id)
                        }}
                        size='sm'
                        variant='destructive'
                        className='flex w-20 items-center gap-x-1.5'
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
