import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export const PhoneDropdown = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    'mt-0.5 flex items-center gap-x-2 border-none bg-transparent px-1 text-left text-xl text-background',
                    className
                )}
            >
                067 999 95 69
                <ChevronDown className='size-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link
                        tabIndex={-1}
                        to='tel:+380679999569'
                    >
                        067 999 95 69
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        tabIndex={-1}
                        to='tel:+380639999569'
                    >
                        063 999 95 69
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        tabIndex={-1}
                        to='tel:+380639999569'
                    >
                        063 999 95 69
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
