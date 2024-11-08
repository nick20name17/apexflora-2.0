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
import { useRemoveBonusProgramMutation } from '@/store/api/bonuses/bonuses'
import type { BonusProgram } from '@/store/api/bonuses/bonuses.types'

interface RemoveBonusProgramModalProps {
    bonusProgram: BonusProgram
}

export const RemoveBonusProgramModal = ({
    bonusProgram
}: RemoveBonusProgramModalProps) => {
    const [removeBonusProgram, { isLoading }] = useRemoveBonusProgramMutation()

    const [open, setOpen] = useState(false)

    const handleRemoveBonusProgram = (id: number) => {
        try {
            removeBonusProgram(id).then(() => {
                setOpen(false)
                toast.success('Бонусну програму успішно видалено')
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
                        Видалити бонусна програма{' '}
                        <span className='text-destructive'>{bonusProgram.title}</span>?
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
                            handleRemoveBonusProgram(bonusProgram.id)
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
