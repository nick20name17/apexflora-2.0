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
import { useRemoveShopProductsMutation } from '@/store/api/shop-products/shop-products'
import type { ShopProduct } from '@/store/api/shop-products/shop-products.types'

interface RemoveShopProductModalProps {
    shopProduct: ShopProduct
}

export const RemoveShopProductModal = ({ shopProduct }: RemoveShopProductModalProps) => {
    const [removeShopProduct, { isLoading }] = useRemoveShopProductsMutation()

    const [open, setOpen] = useState(false)

    const handleRemoveShopProduct = (id: number) => {
        try {
            removeShopProduct(id).then(() => {
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
                        Видалити товар для продажу{' '}
                        <span className='text-destructive'>
                            {shopProduct.product.name}
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
                            handleRemoveShopProduct(shopProduct.id)
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
