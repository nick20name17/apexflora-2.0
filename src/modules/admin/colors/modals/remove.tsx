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
import { useRemoveColorMutation } from '@/store/api/colors/colors'
import type { Color } from '@/store/api/shop-products/shop-products.types'

interface RemoveColorModalProps {
    color: Color
}

export const RemoveColorModal = ({ color }: RemoveColorModalProps) => {
    const [removeColor, { isLoading }] = useRemoveColorMutation()

    const [open, setOpen] = useState(false)

    const handleRemoveColor = (id: number) => {
        try {
            removeColor(id).then(() => {
                setOpen(false)
                toast.success('Колір успішно видалено')
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
                        <span className='text-destructive'>{color.name}</span>?
                    </DialogTitle>
                </DialogHeader>

                <Button
                    disabled={isLoading}
                    onClick={() => {
                        handleRemoveColor(color.id)
                    }}
                    size='sm'
                    variant='destructive'
                    className='ml-auto flex w-16 items-center gap-x-1.5'
                >
                    {isLoading ? <Loader2 className='size-4 animate-spin' /> : 'Так'}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
