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
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { producerSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks/use-custom-form'
import { useAddProducerMutation } from '@/store/api/producers/producers'

type ProducerFormValues = Zod.infer<typeof producerSchema>

export const AddProducerModal = () => {
    const [open, setOpen] = useState(false)

    const [addProducer, { isLoading }] = useAddProducerMutation()

    const form = useCustomForm(producerSchema, {
        name: '',
        country: ''
    })

    const handleAddProducer = (data: ProducerFormValues) => {
        try {
            addProducer(data).then(() => {
                toast.success(`Виробник ${data.name} успішно додано`)
                setOpen(false)
                form.reset()
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const onProducerEdit = (formData: ProducerFormValues) => {
        handleAddProducer(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button size='sm'>
                    <CirclePlus className='mr-2 size-4' />
                    Додати нового виробника
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Додати виробника</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onProducerEdit)}
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder='Bibo Flowers'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='country'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder='NL'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={isLoading}
                            type='submit'
                            size='sm'
                            className='w-40'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Додати виробника'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
