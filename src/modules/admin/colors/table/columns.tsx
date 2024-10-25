import { type ColumnDef } from '@tanstack/react-table'

import { EditColorModal } from '../modals/edit'
import { RemoveColorModal } from '../modals/remove'

import type { Color } from '@/store/api/shop-products/shop-products.types'

export const columns: ColumnDef<Color>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='w-40'>Назва кольору</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.name}</div>
        }
    },
    {
        accessorKey: 'hex',
        header: () => <div className='w-40'>Код кольору</div>,
        cell: ({ row }) => {
            return (
                <div className='flex w-40 items-center gap-x-2'>
                    <div
                        style={{ backgroundColor: row.original.hex }}
                        className='size-5 rounded-full border'
                    />
                    <div className='text-xs'>{row.original.hex}</div>
                </div>
            )
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div className='w-24'>Дії</div>,
        cell: ({ row }) => {
            return (
                <div className='flex w-24 items-center gap-x-2'>
                    <EditColorModal color={row.original} />
                    <RemoveColorModal color={row.original} />
                </div>
            )
        }
    }
]
