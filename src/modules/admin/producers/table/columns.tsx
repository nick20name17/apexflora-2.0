import { type ColumnDef } from '@tanstack/react-table'

import { EditProducerModal } from '../modals/edit'
import { RemoveProducerModal } from '../modals/remove'

import type { Producer } from '@/store/api/shop-products/shop-products.types'

export const columns: ColumnDef<Producer>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='w-40'>Назва виробника</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.name}</div>
        }
    },
    {
        accessorKey: 'hex',
        header: () => <div className='w-40'>Країна виробника</div>,
        cell: ({ row }) => {
            return (
                <div className='flex w-40 items-center gap-x-2'>
                    <div>
                        <img
                            src={row.original.country.flag}
                            alt={row.original.country.name}
                            className='size-3.5'
                        />
                    </div>
                    {row.original.country.name}({row.original.country.code})
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
                    <EditProducerModal producer={row.original} />
                    <RemoveProducerModal producer={row.original} />
                </div>
            )
        }
    }
]
