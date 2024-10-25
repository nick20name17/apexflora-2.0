import { Loader2, Pencil } from 'lucide-react'
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
import { usePatchBonusLimitMutation } from '@/store/api/bonuses/bonuses'
import type { BonusLimit } from '@/store/api/bonuses/bonuses.types'

type BonusLimitFormValues = Zod.infer<typeof bonusLimitsSchema>

interface EditBonusLimitProps {
    bonusLimit: BonusLimit
}

export const EditBonusLimitModal = ({ bonusLimit }: EditBonusLimitProps) => {
    const [open, setOpen] = useState(false)

    const [patchBonusLimit, { isLoading }] = usePatchBonusLimitMutation()

    const handlePatchBonusLimit = (data: BonusLimitFormValues) => {
        try {
            patchBonusLimit({
                data: {
                    accumulation_limit: +data.accumulation_limit,
                    discount: +data.discount
                },
                id: bonusLimit.id
            }).then(() => {
                toast.success(
                    `Бонусний ліміт ${data.accumulation_limit} успішно відредаговано`
                )
                setOpen(false)
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const form = useCustomForm(bonusLimitsSchema, {
        accumulation_limit: bonusLimit.accumulation_limit?.toString(),
        discount: bonusLimit.discount?.toString()
    })

    const onBonusLimitEdit = (formData: BonusLimitFormValues) => {
        handlePatchBonusLimit(formData)
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
                    <DialogTitle>
                        Редагувати бонусний ліміт {bonusLimit.accumulation_limit}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onBonusLimitEdit)}
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
                                'Регадувати бонусний ліміт'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
