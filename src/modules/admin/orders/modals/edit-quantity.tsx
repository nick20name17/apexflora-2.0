import { Loader2, Pencil } from 'lucide-react'
import { useState } from 'react'
import { object, string, type infer as zodInfer } from 'zod'

import { getStatusProductsDisplay } from '@/components/shared/status-tabs'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCustomForm } from '@/hooks'
import type { Stock } from '@/store/api/shop-products/shop-products.types'
import { useGetStockFullDataQuery, usePatchStockMutation } from '@/store/api/stock/stock'

const editQuantity = object({
    quantity: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим")
})

type EditQuantityFormData = zodInfer<typeof editQuantity>

interface EditQuantityModalProps {
    stock: Stock
}

export const EditQuantity = ({ stock }: EditQuantityModalProps) => {
    const [isMinus, setIsMinus] = useState(false)
    const [error, setError] = useState('')

    const form = useCustomForm(editQuantity, {
        quantity: ''
    })

    const { data: stockFullData } = useGetStockFullDataQuery(stock.id)
    const [patchStock] = usePatchStockMutation()

    const handlePatchQuantity = (data: EditQuantityFormData) => {
        setError('')
        try {
            patchStock({
                data: {
                    quantity: +data.quantity
                },
                id: stock.id
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (data: EditQuantityFormData) => {
        if (!stock) return

        const currentQuantity = stock.quantity
        const adjustment = +data.quantity
        const newQuantity = isMinus
            ? currentQuantity - adjustment
            : currentQuantity + adjustment

        if (isMinus && adjustment > currentQuantity) {
            setError('Введена кількість перевищує доступну кількість')
            return
        }

        const dataToPatch = {
            quantity: newQuantity,
            id: stock.id
        }

        handlePatchQuantity(dataToPatch as any)
    }

    const { name, icon } = getStatusProductsDisplay(stock.status.id)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className='size-6'
                    size='icon'
                    variant='accent'
                >
                    <Pencil className='size-0.5' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редагувати кількість</DialogTitle>
                    <DialogDescription className='flex items-center gap-x-2'>
                        {icon}
                        {name}
                    </DialogDescription>
                    <div className='flex items-center gap-x-2'>
                        <span>Надходження:</span>
                        <span className='font-medium text-primary'>{stock.quantity}</span>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <span>Продано:</span>
                        <span className='font-medium text-primary'>
                            {stockFullData?.quantity_sold}
                        </span>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4'
                        >
                            <FormField
                                control={form.control}
                                name='quantity'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Кількість</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='100'
                                                {...field}
                                                type='number'
                                                inputMode='numeric'
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                <Checkbox
                                    checked={isMinus}
                                    onCheckedChange={(value) => setIsMinus(!!value)}
                                />

                                <FormLabel>Відняти кількість</FormLabel>
                            </div>

                            <Button
                                className='w-24'
                                type='submit'
                            >
                                {false ? (
                                    <Loader2 className='size-4 animate-spin' />
                                ) : (
                                    'Додати'
                                )}
                            </Button>

                            {error ? (
                                <div className='mt-4 text-sm font-medium text-destructive'>
                                    {error}
                                </div>
                            ) : null}
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
