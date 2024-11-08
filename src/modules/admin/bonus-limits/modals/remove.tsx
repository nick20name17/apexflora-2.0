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
import { useRemoveBonusLimitMutation } from '@/store/api/bonuses/bonuses'
import type { BonusLimit } from '@/store/api/bonuses/bonuses.types'

interface RemoveBonusLimitModalProps {
    bonusLimit: BonusLimit
}

export const RemoveBonusLimitModal = ({ bonusLimit }: RemoveBonusLimitModalProps) => {
    const [removeBonusLimit, { isLoading }] = useRemoveBonusLimitMutation()

    const [open, setOpen] = useState(false)

    const handleRemoveBonusLimit = (id: number) => {
        try {
            removeBonusLimit(id).then(() => {
                setOpen(false)
                toast.success('Бонусний ліміт успішно видалено')
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
                        Видалити бонусний ліміт{' '}
                        <span className='text-destructive'>
                            {bonusLimit.accumulation_limit}
                        </span>
                        ?
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
                            handleRemoveBonusLimit(bonusLimit.id)
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
