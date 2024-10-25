import { CirclePlus, Loader2 } from 'lucide-react'
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { bonusLimitsSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks/use-custom-form'
import { useAddBonusLimitMutation } from '@/store/api/bonuses/bonuses'

type BonusLimitsFormValues = Zod.infer<typeof bonusLimitsSchema>

interface AddBonusLimitsModalProps {
    size?: 'icon' | 'sm'
}

export const AddBonusLimitsModal = ({ size = 'sm' }: AddBonusLimitsModalProps) => {
    const [open, setOpen] = useState(false)

    const [addBonusLimits, { isLoading }] = useAddBonusLimitMutation()

    const form = useCustomForm(bonusLimitsSchema, {
        accumulation_limit: '',
        discount: ''
    })

    const handleAddBonusLimits = (data: BonusLimitsFormValues) => {
        try {
            addBonusLimits({
                accumulation_limit: +data.accumulation_limit,
                discount: +data.discount
            }).then(() => {
                toast.success(`Бонусний ліміт ${data.accumulation_limit} успішно додано`)
                setOpen(false)
                form.reset()
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const onBonusLimitsAdd = (formData: BonusLimitsFormValues) => {
        handleAddBonusLimits(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='flex items-center gap-x-2'
                    size={size}
                >
                    <CirclePlus className='size-4' />
                    {size === 'icon' ? '' : 'Додати бонусний ліміт'}
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Додати бонусний ліміт</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onBonusLimitsAdd)}
                    >
                        <FormField
                            control={form.control}
                            name='accumulation_limit'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ліміт </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='100'
                                            type='number'
                                            inputMode='numeric'
                                            {...field}
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
                                    <FormLabel>Відсоток знижки</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder='3'
                                            type='number'
                                            inputMode='numeric'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={isLoading}
                            type='submit'
                            size='sm'
                            className='w-60'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Додати бонусний ліміт'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
