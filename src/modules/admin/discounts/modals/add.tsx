import { format } from 'date-fns'
import { CirclePlus, Loader2 } from 'lucide-react'
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
import { useAddDiscountMutation } from '@/store/api/discounts/discounts'

type DiscountFormValues = Zod.infer<typeof discountSchema>

interface AddDiscountModalProps {
    size?: 'sm' | 'icon'
}

export const AddDiscountModal = ({ size = 'sm' }: AddDiscountModalProps) => {
    const [open, setOpen] = useState(false)

    const [addDiscount, { isLoading }] = useAddDiscountMutation()

    const form = useCustomForm(discountSchema, {
        name: '',
        percentage: '',
        start_date: '' as any,
        end_date: '' as any
    })

    const handleAddDiscount = (data: DiscountFormValues) => {
        try {
            addDiscount({
                ...data,
                start_date: format(new Date(data?.start_date!), 'yyyy-MM-dd'),
                end_date: format(new Date(data?.end_date!), 'yyyy-MM-dd')
            }).then(() => {
                toast.success(`Знижку ${data.name} успішно додано`)
                setOpen(false)
                form.reset()
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const onDiscountEdit = (formData: DiscountFormValues) => {
        handleAddDiscount(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='flex-shrink-0 gap-x-2'
                    size={size}
                >
                    <CirclePlus className='size-4' />
                    {size === 'icon' ? '' : ' Додати нову знижку'}
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Додати знижку</DialogTitle>
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
                            className='w-36'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Додати знижку'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
