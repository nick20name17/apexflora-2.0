import { type ColumnDef } from '@tanstack/react-table'

import { IsReadCell } from './cells/is-read'
import { NoteCell } from './cells/note-cell'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import type { Contacts } from '@/store/api/contacts/contacts.types'
import { trunc } from '@/utils'

export const columns: ColumnDef<Contacts>[] = [
    {
        accessorKey: 'is_read',
        header: () => <div className='w-24'>Прочитано</div>,
        cell: ({ row }) => (
            <div className='h-5 w-24'>
                <IsReadCell
                    key={row.original.is_read.toString() + row.original.id}
                    contact={row.original}
                />
            </div>
        )
    },
    {
        accessorKey: 'name',
        header: () => <div className='w-48'>Ім’я </div>,
        cell: ({ row }) => {
            return <div className='w-48'>{row.original.name}</div>
        }
    },
    {
        accessorKey: 'email',
        header: () => <div className='w-60'>Пошта</div>,
        cell: ({ row }) => {
            return <div className='w-60'>{row.original.email}</div>
        }
    },
    {
        accessorKey: 'phone_number',
        header: () => <div className='w-48'>Номер телефон</div>,
        cell: ({ row }) => {
            return <div className='w-48'>{row.original.phone_number}</div>
        }
    },
    {
        accessorKey: 'text',
        header: () => <div className='w-60'>Повідомлення</div>,
        cell: ({ row }) => {
            return row.original.text.length >= 100 ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger
                            className='w-60'
                            asChild
                        >
                            <span className='truncate'>
                                {trunc(row.original.text, 100)}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{row.original.text}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <div className='w-60'>{row.original.text}</div>
            )
        }
    },
    {
        accessorKey: 'comment',
        header: () => <div className='w-72'>Коментар</div>,
        cell: ({ row }) => (
            <NoteCell
                key={row.original.comment + row.original.id}
                contact={row.original}
            />
        )
    }
]
