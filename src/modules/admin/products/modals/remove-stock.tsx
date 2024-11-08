import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { getStatusProductsDisplay } from '@/components/shared/product-statuses-cards'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useRemoveStockMutation } from '@/store/api/stock/stock'
import type { Stock } from '@/store/api/stock/stock.types'

interface RemoveStockModalProps {
    stock: Stock
}

export const RemoveStockModal = ({ stock }: RemoveStockModalProps) => {
    const [removeStock, { isLoading }] = useRemoveStockMutation()
    console.log(stock)

    const [open, setOpen] = useState(false)

    const handleRemoveStock = (id: number) => {
        try {
            removeStock(id).then(() => {
                setOpen(false)
                toast.success('Товар для продажу успішно видалено')
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
                        Видалити cтатус{' '}
                        <span className='text-destructive'>
                            {getStatusProductsDisplay(stock.status.id).name.toLowerCase()}
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
                            handleRemoveStock(stock.id)
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
