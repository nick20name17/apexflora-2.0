import { CirclePlus, Loader2 } from 'lucide-react'
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
import { useAddColorMutation } from '@/store/api/colors/colors'

type ColorFormValues = Zod.infer<typeof colorSchema>

export const AddColorModal = () => {
    const [open, setOpen] = useState(false)

    const [addColor, { isLoading }] = useAddColorMutation()

    const form = useCustomForm(colorSchema, {
        name: '',
        hex: ''
    })

    const handleAddColor = (data: ColorFormValues) => {
        try {
            addColor(data).then(() => {
                toast.success(`Колір ${data.name} успішно додано`)
                setOpen(false)
                form.reset()
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const onColorEdit = (formData: ColorFormValues) => {
        handleAddColor(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button size='sm'>
                    <CirclePlus className='mr-2 size-4' />
                    Додати новий колір
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Додати колір </DialogTitle>
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
                                'Додати колір'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
