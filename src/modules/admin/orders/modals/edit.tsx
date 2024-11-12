import { Loader2, Pencil } from 'lucide-react'
import { array, object, string, type infer as zodInfer } from 'zod'

import { CategorySelect } from '../controls/category-select'
import { ColorsSelect } from '../controls/colors-select'
import { ProducerSelect } from '../controls/producer-select'
import { ProductSelect } from '../controls/product-select'

import { addShopProductSchema } from './add'
import { addProductSchema } from './add-product'
import { FilePicker } from '@/components/shared/file-picker'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useCustomForm } from '@/hooks'
import { usePatchProductMutation } from '@/store/api/products/products'
import { usePatchShopProductsMutation } from '@/store/api/shop-products/shop-products'
import type { ShopProduct } from '@/store/api/shop-products/shop-products.types'

const editShopProductSchema = object({
    ...addShopProductSchema.omit({
        image: true
    }).shape,
    image: array(
        object({
            url: string()
        })
    ).min(1, 'Необхідно додати зображення'),
    ...addProductSchema.shape
})

type EditShopProductFormData = zodInfer<typeof editShopProductSchema>

interface EditShopProductModalProps {
    shopProduct: ShopProduct
}

export const EditShopProductModal = ({ shopProduct }: EditShopProductModalProps) => {
    const { product } = shopProduct

    const form = useCustomForm(editShopProductSchema, {
        height: shopProduct?.height?.toString(),
        origin_id: shopProduct?.origin_id,
        stage: shopProduct.stage?.toString(),
        weight_size: shopProduct?.weight_size?.toString(),
        packaging_of: shopProduct?.packaging_of?.toString(),
        quality: shopProduct?.quality,
        producer: {
            id: shopProduct.producer?.id?.toString(),
            name: shopProduct.producer?.name
        },
        product: {
            id: product?.id?.toString(),
            name: product?.ukr_name
        },
        colors: shopProduct?.colors?.map((color) => color.id?.toString()),
        image: shopProduct?.image
            ? [
                  {
                      url: shopProduct?.image
                  }
              ]
            : [],
        description: product?.description || '',
        category: shopProduct?.product?.category?.id?.toString(),
        name: product?.name,
        ukr_name: product?.ukr_name
    })

    const [editShopProduct, { isLoading }] = usePatchShopProductsMutation()
    const [editProduct] = usePatchProductMutation()

    const onShopProductEdit = (data: EditShopProductFormData) => {
        const formData = new FormData()
        formData.append('shopProduct', data.image[0].url)
        try {
            editShopProduct({
                id: shopProduct.id,
                data: {
                    origin_id: data.origin_id,
                    height: +data.height,
                    weight_size: +data.weight_size,
                    stage: +data.stage,
                    packaging_of: +data.packaging_of,
                    quality: data.quality,
                    producer: +data.producer!,
                    product: +data.product!,
                    colors: data.colors.map((color) => +color),
                    image: formData
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onProductEdit = (data: EditShopProductFormData) => {
        try {
            editProduct({
                id: product.id,
                data: {
                    name: data.name,
                    ukr_name: data.ukr_name,
                    description: data.description,
                    category: +data.category
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (data: EditShopProductFormData) => {
        onShopProductEdit(data)
        onProductEdit(data)
    }

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
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle> Додати товар для продажу</DialogTitle>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=''
                        >
                            <ScrollArea className='h-[600px] pb-3 pr-3'>
                                <div className='flex items-center gap-4'>
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
                                </div>
                                <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem className='mt-4 min-w-40 flex-1'>
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

                                <Separator className='my-4' />

                                <FormField
                                    control={form.control}
                                    name='image'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Зображення</FormLabel>
                                            <FormControl>
                                                <FilePicker
                                                    accept={[
                                                        '.png',
                                                        '.jpg',
                                                        '.jpeg',
                                                        '.webp'
                                                    ]}
                                                    multiple={false}
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='mt-4 flex items-center gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='height'
                                        render={({ field }) => (
                                            <FormItem className='min-w-40 flex-1'>
                                                <FormLabel>Висота</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='10'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='weight_size'
                                        render={({ field }) => (
                                            <FormItem className='min-w-40 flex-1'>
                                                <FormLabel>Вага</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='10'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='packaging_of'
                                        render={({ field }) => (
                                            <FormItem className='min-w-40 flex-1'>
                                                <FormLabel>Пакування</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='10'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='mt-4 flex items-center gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='stage'
                                        render={({ field }) => (
                                            <FormItem className='min-w-40 flex-1'>
                                                <FormLabel>Зрілість</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='1'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='origin_id'
                                        render={({ field }) => (
                                            <FormItem className='min-w-40 flex-1'>
                                                <FormLabel>Артикул</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='707'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='quality'
                                        render={({ field }) => (
                                            <FormItem className='min-w-40 flex-1'>
                                                <FormLabel>Якість</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='A1'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mt-4 flex items-center gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='producer'
                                        render={({ field }) => (
                                            <FormItem className='min-w-40 flex-1'>
                                                <FormLabel>Виробник</FormLabel>
                                                <FormControl>
                                                    <ProducerSelect
                                                        producer={field.value}
                                                        setProducer={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='product'
                                        render={({ field }) => (
                                            <FormItem className='min-w-40 flex-1'>
                                                <FormLabel>Продукт</FormLabel>
                                                <FormControl>
                                                    <ProductSelect
                                                        product={field.value}
                                                        setProduct={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mt-4 flex items-center gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='colors'
                                        render={({ field }) => (
                                            <FormItem className='min-w-40 flex-1'>
                                                <FormLabel>Кольори</FormLabel>
                                                <FormControl>
                                                    <ColorsSelect
                                                        colors={field.value}
                                                        setColors={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </ScrollArea>

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
