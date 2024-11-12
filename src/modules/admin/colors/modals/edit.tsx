import { Loader2, Pencil } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { colorSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks/use-custom-form'
import { usePatchColorMutation } from '@/store/api/colors/colors'
import type { ColorsData } from '@/store/api/colors/colors.types'

type ColorFormValues = Zod.infer<typeof colorSchema>

interface EditColorProps {
    color: ColorsData
}

export const EditColorModal = ({ color }: EditColorProps) => {
    const [open, setOpen] = useState(false)

    const [patchColor, { isLoading }] = usePatchColorMutation()

    const handlePatchColor = (data: ColorFormValues) => {
        try {
            patchColor({
                data,
                id: color.id
            }).then(() => {
                toast.success(`Колір ${data.name} успішно відредаговано`)
                setOpen(false)
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const form = useCustomForm(colorSchema, {
        name: color.name,
        hex: color.hex
    })

    const onColorEdit = (formData: ColorFormValues) => {
        handlePatchColor(formData)
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
                    <DialogTitle>Редагувати колір {color.name}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onColorEdit)}
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder='Зелений'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='hex'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ColorPicker
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={isLoading}
                            type='submit'
                            size='sm'
                            className='w-28'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Редагувати'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
