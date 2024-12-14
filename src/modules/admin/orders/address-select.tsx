import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

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
import { useGetDeliverAddressQuery } from '@/store/api/deliver-address/deliver-address'

interface Address {
    name: string
    id: string
}

interface AddressSelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    address: Address | null
    setAddress: (address: Address | null) => void
    recepientId: number
    disabled: boolean
}

const defaultLimit = 140

export const AddressSelect = ({
    address,
    setAddress,
    className,
    recepientId,
    disabled
}: AddressSelectProps) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
    }, 250)

    const { data, isLoading, isFetching } = useGetDeliverAddressQuery({
        offset: 0,
        limit: defaultLimit,
        creator: recepientId
    })

    const addresss = data?.results || []

    const options = useMemo(() => {
        return addresss
            .map((address) => ({
                id: address.id.toString(),
                name: address?.city + ', ' + address?.street
            }))
            .concat([{ id: 'self-pick', name: 'Самовивіз' }])
    }, [addresss])

    return (
        <div className='flex w-full items-center gap-x-2'>
            <Popover
                modal
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        disabled={disabled}
                        className={cn('w-full justify-between truncate', className)}
                        variant='outline'
                        size='sm'
                        role='combobox'
                        aria-expanded={open}
                    >
                        <span className='truncate'>
                            {address?.name ? address?.name : 'Оберіть адресу'}
                        </span>
                        <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-96 p-0'>
                    <Command>
                        <div
                            className='flex items-center border-b px-3'
                            cmdk-input-wrapper=''
                        >
                            <Search className='mr-2 size-4 shrink-0 opacity-50' />
                            <input
                                defaultValue={search}
                                className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                                onChange={(e) => handleSearch(e.currentTarget.value)}
                                placeholder='Введіть назву адресу'
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
                                                const selectedAddress = options.find(
                                                    (opt) => opt?.id === selectedName
                                                )

                                                setAddress(
                                                    selectedAddress &&
                                                        selectedAddress?.id ===
                                                            address?.id
                                                        ? null
                                                        : selectedAddress || null
                                                )

                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 size-4',
                                                    address?.id === option?.id
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
                            <CommandEmpty>Адрес не знайдено</CommandEmpty>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
