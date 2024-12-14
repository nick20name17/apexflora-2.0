import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { OrdersProductsList } from './orders-products-list'
import { StatusTabs } from './status-tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { AdminOrderItem } from '@/store/api/orders/orders.types'
import { useGetShopProductsQuery } from '@/store/api/shop-products/shop-products'

interface ProductsCatalogueProps {
    orderItems: AdminOrderItem[]
    setOrderItems: (orderItems: AdminOrderItem[]) => void
}

export const ProductsCatalogue = ({
    orderItems,
    setOrderItems
}: ProductsCatalogueProps) => {
    const [open, setOpen] = useState(false)

    const [offset, setOffset] = useState(0)
    const [status, setStatus] = useState('1')
    const [search, setSearch] = useState('')

    const {
        data: products,
        isLoading,
        isFetching
    } = useGetShopProductsQuery({
        limit: 24,
        offset,
        statuses: status,
        search
    })
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='w-full justify-between'
                    size='sm'
                    variant='secondary'
                >
                    Каталог <Badge>{orderItems.length}</Badge>
                </Button>
            </DialogTrigger>
            <DialogContent className='h-[93%] max-w-[94%]'>
                <DialogHeader className='flex flex-row items-center justify-between gap-4'>
                    <DialogTitle>Знайдено товарів: {products?.count || 0}</DialogTitle>
                    <Button
                        variant='accent'
                        onClick={() => setOpen(false)}
                        size='sm'
                    >
                        Зберегти
                    </Button>
                </DialogHeader>

                <StatusTabs
                    status={status}
                    setStatus={setStatus}
                />

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    setOffset={setOffset}
                />

                <OrdersProductsList
                    shopProducts={products}
                    isDataFetching={isFetching}
                    isDataLoading={isLoading}
                    offset={offset}
                    setOffset={setOffset}
                    setOrderItems={setOrderItems}
                    orderItems={orderItems}
                />
            </DialogContent>
        </Dialog>
    )
}

interface SearchBarProps {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    setOffset: React.Dispatch<React.SetStateAction<number>>
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, setOffset }) => {
    const debouncedSetSearch = useDebouncedCallback((searchTerm: string) => {
        setSearch(searchTerm)
    }, 300)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        debouncedSetSearch(searchTerm)
        setOffset(0)
    }

    return (
        <Input
            defaultValue={search || ''}
            onChange={handleSearch}
            placeholder='Пошук товару'
        />
    )
}
