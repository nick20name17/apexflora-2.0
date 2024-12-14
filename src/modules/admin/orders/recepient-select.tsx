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
import { useGetUsersQuery } from '@/store/api/users/users'

interface Recepient {
    name: string
    id: string
}

interface RecepientSelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    recepient: Recepient | null
    setRecepient: (recepient: Recepient | null) => void
}

const defaultLimit = 140

export const RecepientSelect = ({
    recepient,
    setRecepient,
    className
}: RecepientSelectProps) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
    }, 250)

    const { data, isLoading, isFetching } = useGetUsersQuery({
        offset: 0,
        limit: defaultLimit,
        search: search || ''
    })

    const recepients = data?.results || []

    const options = useMemo(() => {
        return recepients.map((recepient) => ({
            id: recepient.id.toString(),
            name: recepient?.first_name + ' ' + recepient?.last_name
        }))
    }, [recepients])

    return (
        <div className='flex w-full items-center gap-x-2'>
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
                            {recepient?.name ? recepient?.name : 'Оберіть користувача'}
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
                                placeholder='Введіть назву користувача'
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
                                                const selectedRecepient = options.find(
                                                    (opt) => opt?.id === selectedName
                                                )

                                                setRecepient(
                                                    selectedRecepient &&
                                                        selectedRecepient?.id ===
                                                            recepient?.id
                                                        ? null
                                                        : selectedRecepient || null
                                                )

                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 size-4',
                                                    recepient?.id === option?.id
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
                            <CommandEmpty>Користувачів не знайдено</CommandEmpty>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
