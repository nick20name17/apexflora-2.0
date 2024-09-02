import { X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

import { cn } from '@/lib/utils'

export const SearchBar = () => {
    const [search, setSearch] = useState('')

    return (
        <div className='relative overflow-hidden p-1'>
            <Input
                className='border-none bg-background/20 text-background placeholder:text-background/50'
                placeholder='Пошук товару'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Button
                onClick={() => setSearch('')}
                className={cn(
                    'absolute top-1/2 size-8 -translate-y-1/2 transition-all',
                    search.length > 0 ? 'right-3.5' : '-right-10'
                )}
                variant='secondary'
            >
                <X className='size-4 flex-shrink-0' />
            </Button>
        </div>
    )
}
