import { format } from 'date-fns'
import { Loader2, Pencil } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
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
import { discountSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks/use-custom-form'
import { usePatchDiscountMutation } from '@/store/api/discounts/discounts'
import type { Discount } from '@/store/api/discounts/discounts.types'

type DiscountFormValues = Zod.infer<typeof discountSchema>

interface EditDiscountProps {
    discount: Discount
}

export const EditDiscountModal = ({ discount }: EditDiscountProps) => {
    const [open, setOpen] = useState(false)

    const [patchDiscount, { isLoading }] = usePatchDiscountMutation()

    const handlePatchDiscount = (data: DiscountFormValues) => {
        const formattedData = {
            ...data,
            start_date: format(new Date(data?.start_date!), 'yyyy-MM-dd'),
            end_date: format(new Date(data?.end_date!), 'yyyy-MM-dd')
        }

        try {
            patchDiscount({
                data: formattedData,
                id: discount.id
            }).then(() => {
                toast.success(`Знижку ${data.name} успішно відредаговано`)
                setOpen(false)
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const form = useCustomForm(discountSchema, {
        name: discount.name,
        percentage: parseInt(discount.percentage).toString(),
        start_date: new Date(discount.start_date),
        end_date: new Date(discount.end_date)
    })

    const onDiscountEdit = (formData: DiscountFormValues) => {
        handlePatchDiscount(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button size='icon'>
                    <Pencil className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Редагувати знижку {discount.name}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onDiscountEdit)}
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Назва знижки</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='8 Березня'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='percentage'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Відсоток</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='number'
                                            inputMode='numeric'
                                            placeholder='10'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center gap-x-4'>
                            <FormField
                                control={form.control}
                                name='start_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Початок знижки</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                className='w-full'
                                                date={
                                                    field.value
                                                        ? new Date(field.value)
                                                        : undefined
                                                }
                                                setDate={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='end_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Кінець знижки</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                className='w-full'
                                                date={
                                                    field.value
                                                        ? new Date(field.value)
                                                        : undefined
                                                }
                                                setDate={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={isLoading}
                            type='submit'
                            size='sm'
                            className='w-40'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Регадувати знижку'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
