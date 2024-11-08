import { CirclePlus, Loader2 } from 'lucide-react'
import {
    array,
    instanceof as instanceof_zod,
    object,
    string,
    type infer as zodInfer
} from 'zod'

import { ColorsSelect } from '../controls/colors-select'
import { ProducerSelect } from '../controls/producer-select'
import { ProductSelect } from '../controls/product-select'

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
import { useCustomForm } from '@/hooks'
import { useAddShopProductsMutation } from '@/store/api/shop-products/shop-products'

const objectShema = object({
    id: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    name: string({
        required_error: "Це поле є обов'яковим"
    })
})

export const addShopProductSchema = object({
    height: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    origin_id: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    stage: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    weight_size: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    packaging_of: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    quality: string({
        required_error: "Це поле є обов'яковим"
    }).min(1, "Це поле є обов'яковим"),
    producer: objectShema.nullable(),
    product: objectShema.nullable(),
    colors: array(string()).min(1, 'Оберіть хоча б один колір'),
    image: array(instanceof_zod(File)).min(1, 'Необхідно додати файл')
})

type ShopProductFormData = zodInfer<typeof addShopProductSchema>

export const AddShopProductModal = () => {
    const form = useCustomForm(addShopProductSchema, {
        height: '',
        origin_id: '',
        stage: '',
        weight_size: '',
        packaging_of: '',
        quality: '',
        producer: null,
        product: null,
        colors: [],
        image: []
    })

    const [addShopProduct, { isLoading }] = useAddShopProductsMutation()

    const onShopProductAdd = (data: ShopProductFormData) => {
        const formData = new FormData()
        formData.append('file', data.image[0])
        try {
            addShopProduct({
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
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (data: ShopProductFormData) => {
        onShopProductAdd(data)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='sm'>
                    <CirclePlus className='mr-2 size-4' />
                    Додати товар для продажу
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle> Додати товар для продажу</DialogTitle>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4'
                        >
                            <FormField
                                control={form.control}
                                name='image'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Зображення</FormLabel>
                                        <FormControl>
                                            <FilePicker
                                                caption
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
                            <div className='flex items-center gap-4'>
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

                            <div className='flex items-center gap-4'>
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
                            <div className='flex items-center gap-2'>
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
