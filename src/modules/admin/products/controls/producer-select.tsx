import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { AddProducerModal } from '../../producers/modals/add'

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
import { useGetProducersQuery } from '@/store/api/producers/producers'

interface Producer {
    name: string
    id: string
}

interface ProducerSelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    producer: Producer | null
    setProducer: (producer: Producer | null) => void
}

const defaultLimit = 140

export const ProducerSelect = ({
    producer,
    setProducer,
    className
}: ProducerSelectProps) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
    }, 250)

    const { data, isLoading, isFetching } = useGetProducersQuery({
        offset: 0,
        limit: defaultLimit,
        search: search || ''
    })

    const producers = data?.results || []

    const options = useMemo(() => {
        return producers.map((producer) => ({
            id: producer.id.toString(),
            name: producer?.name
        }))
    }, [producers])

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
                            {producer?.name ? producer?.name : 'Оберіть виробника'}
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
                                placeholder='Введіть назву виробника'
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
                                                const selectedProducer = options.find(
                                                    (opt) => opt?.id === selectedName
                                                )

                                                setProducer(
                                                    selectedProducer &&
                                                        selectedProducer?.id ===
                                                            producer?.id
                                                        ? null
                                                        : selectedProducer || null
                                                )

                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 size-4',
                                                    producer?.id === option?.id
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
                            <CommandEmpty>Виробників не знайдено</CommandEmpty>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
            <AddProducerModal size='icon' />
        </div>
    )
}
