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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { categoriesSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks/use-custom-form'
import {
    useGetAllCategoriesQuery,
    usePatchCategoriesMutation
} from '@/store/api/categories/categories'
import type { Categories } from '@/store/api/categories/categories.types'

type CategoriesFormValues = Zod.infer<typeof categoriesSchema>

interface EditCategoriesProps {
    category: Categories
}

export const EditCategoriesModal = ({ category }: EditCategoriesProps) => {
    const [open, setOpen] = useState(false)

    const [patchCategories, { isLoading }] = usePatchCategoriesMutation()

    const { data: categories } = useGetAllCategoriesQuery({})

    const handlePatchCategories = (data: CategoriesFormValues) => {
        try {
            patchCategories({
                data: {
                    ...data,
                    parent: +data.parent
                },
                id: category.id
            }).then(() => {
                toast.success(`Виробник ${data.name} успішно відредагований`)
                setOpen(false)
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const form = useCustomForm(categoriesSchema, {
        name: category.name,
        parent: category?.parent?.toString()
    })

    const onCategoriesEdit = (formData: CategoriesFormValues) => {
        handlePatchCategories(formData)
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
                    <DialogTitle>Редагувати категорію {category.name}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onCategoriesEdit)}
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Назва категорії</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Гвоздика'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='parent'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Батьківська категорія</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field?.value?.toString()}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder='Оберіть батьківську категорію' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories?.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category?.id?.toString()}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
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
                                'Додати категорію'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
