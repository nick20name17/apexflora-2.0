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
import { useGetCitiesQuery } from '@/store/api/cities/cities'

interface City {
    name: string
    ref: string
}

interface CitySelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    city: City | null
    setCity: (city: City | null) => void
}

export const CitySelect = ({ city, setCity, className }: CitySelectProps) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
    }, 250)

    const { data, isLoading, isFetching } = useGetCitiesQuery({
        search
    })

    const options = useMemo(() => {
        if (data?.data) {
            return data.data.map((city) => ({
                ref: city.Ref,
                name: city.Description
            }))
        }
        return []
    }, [data?.data])

    return (
        <Popover
            modal
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    className={cn('justify-between', className)}
                    variant='outline'
                    size='sm'
                    role='combobox'
                    aria-expanded={open}
                >
                    {city?.name && city.name ? city.name : 'Виберіть місто'}
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
                            placeholder='Введіть назву населеного пункту'
                        />
                    </div>

                    {isFetching || isLoading ? (
                        <div className='py-6 text-center text-sm'>Завантаження...</div>
                    ) : options.length > 0 ? (
                        <CommandList>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.name}
                                        value={option.name}
                                        onSelect={(selectedRef) => {
                                            const selectedCity = options.find(
                                                (opt) => opt.name === selectedRef
                                            )

                                            setCity(
                                                selectedCity &&
                                                    selectedCity.name === city?.name
                                                    ? null
                                                    : selectedCity || null
                                            )

                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                city?.name === option.name
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        {option.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    ) : (
                        <CommandEmpty>Міст не знайдено</CommandEmpty>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    )
}
