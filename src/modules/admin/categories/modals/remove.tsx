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
import { useRemoveCategoriesMutation } from '@/store/api/categories/categories'
import type { Categories } from '@/store/api/categories/categories.types'

interface RemoveCategoriesModalProps {
    category: Categories
}

export const RemoveCategoriesModal = ({ category }: RemoveCategoriesModalProps) => {
    const [removeCategories, { isLoading }] = useRemoveCategoriesMutation()

    const [open, setOpen] = useState(false)

    const handleRemoveCategories = (id: number) => {
        try {
            removeCategories(id).then(() => {
                setOpen(false)
                toast.success('Категорію успішно видалено')
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
                        Видалити категорію{' '}
                        <span className='text-destructive'>{category.name}</span>?
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
                            handleRemoveCategories(category.id)
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
