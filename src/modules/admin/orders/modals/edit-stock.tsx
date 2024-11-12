import { DialogDescription } from '@radix-ui/react-dialog'
import { Loader2, Pencil } from 'lucide-react'
import { array, boolean, number, object, string, type infer as zodInfer } from 'zod'

import { DiscountsSelect } from '../controls/discount-select'

import { getStatusProductsDisplay } from '@/components/shared/status-tabs'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
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

const editStockSchema = object({
    price: number({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    discount: array(
        string({
            required_error: "Це поле є обов'яковим"
        })
    ),
    promo: boolean().default(false),
    is_visible: boolean().default(false)
})

type FileFormData = zodInfer<typeof editStockSchema>

interface EditStockModalProps {
    stock: Stock
}

export const EditStockModal = ({ stock }: EditStockModalProps) => {
    const form = useCustomForm(editStockSchema, {
        price: +stock.retail_price,
        discount: [],
        promo: stock.promotion,
        is_visible: !stock.is_visible
    })

    // const { data } = useGetDiscountsQuery({})
    // const discounts = data?.results || []

    const onFileAdd = (data: FileFormData) => {
        console.log(data)
    }

    const onSubmit = (data: FileFormData) => {
        onFileAdd(data)
    }

    const { name, icon } = getStatusProductsDisplay(stock.status.id)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size='icon'
                    variant='accent'
                >
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редагувати статус</DialogTitle>
                    <DialogDescription className='flex items-center gap-x-2'>
                        {icon}
                        {name}
                    </DialogDescription>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4'
                        >
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ціна</FormLabel>
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

                            <FormField
                                control={form.control}
                                name='discount'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Знижки</FormLabel>
                                        <FormControl>
                                            <DiscountsSelect
                                                discounts={field.value}
                                                setDiscounts={field.onChange}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='promo'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>

                                                <div className='space-y-1 leading-none'>
                                                    <FormLabel>Промо ціна</FormLabel>
                                                </div>
                                            </FormItem>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='is_visible'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>

                                                <div className='space-y-1 leading-none'>
                                                    <FormLabel>Приховати</FormLabel>
                                                </div>
                                            </FormItem>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
