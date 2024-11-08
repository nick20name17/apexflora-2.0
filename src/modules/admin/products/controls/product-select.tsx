import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { AddProductModal } from '../modals/add-product'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useGetProductsQuery } from '@/store/api/products/products'

interface Product {
    name: string
    id: string
}

interface ProductSelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    product: Product | null
    setProduct: (product: Product | null) => void
}

const defaultLimit = 140

export const ProductSelect = ({ product, setProduct, className }: ProductSelectProps) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
    }, 250)

    const { data, isLoading, isFetching } = useGetProductsQuery({
        offset: 0,
        limit: defaultLimit,
        search: search || ''
    })

    const products = data?.results || []

    const options = useMemo(() => {
        return products.map((product) => ({
            id: product.id.toString(),
            name: product?.ukr_name
        }))
    }, [products])

    return (
        <div className='flex items-center gap-x-2'>
            <Popover
                modal
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        className={cn('w-full justify-between truncate', className)}
                        variant='outline'
                        size='sm'
                        role='combobox'
                        aria-expanded={open}
                    >
                        <span className='truncate'>
                            {' '}
                            {product?.name ? product?.name : 'Оберіть продукт'}
                        </span>
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-96 p-0'>
                    <Command>
                        <div
                            className='flex items-center border-b px-3'
                            cmdk-input-wrapper=''
                        >
                            <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
                            <input
                                defaultValue={search}
                                className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                                onChange={(e) => handleSearch(e.currentTarget.value)}
                                placeholder='Введіть назву продукт'
                            />
                        </div>

                        {isFetching || isLoading ? (
                            <div className='py-6 text-center text-sm'>
                                Завантаження...
                            </div>
                        ) : options.length > 0 ? (
                            <CommandList>
                                <CommandGroup>
                                    {options.map((option) => (
                                        <CommandItem
                                            key={option?.id}
                                            value={option?.id}
                                            onSelect={(selectedName) => {
                                                const selectedProduct = options.find(
                                                    (opt) => opt?.id === selectedName
                                                )

                                                setProduct(
                                                    selectedProduct &&
                                                        selectedProduct?.id ===
                                                            product?.id
                                                        ? null
                                                        : selectedProduct || null
                                                )

                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    product?.id === option?.id
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {option?.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        ) : (
                            <CommandEmpty>Продуктів не знайдено</CommandEmpty>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
            <AddProductModal size='icon' />
        </div>
    )
}
