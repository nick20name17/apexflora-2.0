import { useDebouncedCallback } from 'use-debounce'
import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBarProps extends React.ComponentProps<typeof Input> {
    placeholder?: string
    resetOffset?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Пошук...',
    resetOffset = true,
    className
}) => {
    const [search, setSearch] = useQueryParam('search', StringParam)
    const [, setOffset] = useQueryParam('offset', NumberParam)

    const debouncedSetSearch = useDebouncedCallback((searchTerm: string | undefined) => {
        setSearch(searchTerm)
        if (resetOffset) {
            setOffset(0)
        }
    }, 300)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        debouncedSetSearch(searchTerm ? searchTerm : undefined)
    }

    return (
        <Input
            className={cn(className)}
            defaultValue={search || ''}
            onChange={handleSearch}
            placeholder={placeholder}
        />
    )
}
