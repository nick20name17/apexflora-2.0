import { CirclePlus, Loader2 } from 'lucide-react'
import { object, string, type infer as zodInfer } from 'zod'

import { CategorySelect } from '../controls/category-select'

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
import { Textarea } from '@/components/ui/textarea'
import { useCustomForm } from '@/hooks'
import { useAddProductMutation } from '@/store/api/products/products'

export const addProductSchema = object({
    name: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    ukr_name: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    description: string({
        required_error: "Це поле є обов'яковим"
    }),
    category: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим")
})

type ProductFormData = zodInfer<typeof addProductSchema>

interface AddProductModalProps {
    size?: 'icon' | 'sm'
}

export const AddProductModal = ({ size = 'sm' }: AddProductModalProps) => {
    const form = useCustomForm(addProductSchema, {
        name: '',
        ukr_name: '',
        description: '',
        category: ''
    })

    const [addProduct, { isLoading }] = useAddProductMutation()

    const onProductAdd = (data: ProductFormData) => {
        try {
            addProduct({
                ...data,
                category: +data.category
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (data: ProductFormData) => {
        onProductAdd(data)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className='flex-shrink-0 gap-x-2'
                    size={size}
                >
                    <CirclePlus className='size-4' />
                    {size === 'icon' ? '' : 'Додати товар'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Додати товар</DialogTitle>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4'
                        >
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Назва англійською</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Rose'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='ukr_name'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Назва українською</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Троянда'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Опис</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='Квітка червоного кольору'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Категорія</FormLabel>
                                        <FormControl>
                                            <CategorySelect
                                                category={field.value}
                                                setCategory={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                className='w-24'
                                type='submit'
                            >
                                {isLoading ? (
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
