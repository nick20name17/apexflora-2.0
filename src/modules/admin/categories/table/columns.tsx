import { type ColumnDef } from '@tanstack/react-table'

import { EditCategoriesModal } from '../modals/edit'
import { RemoveCategoriesModal } from '../modals/remove'

import type { Categories } from '@/store/api/categories/categories.types'

export const columns: ColumnDef<Categories>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='w-40'>Назва категорії</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.name}</div>
        }
    },

    {
        accessorKey: 'actions',
        header: () => <div className='w-full text-right'>Дії</div>,
        cell: ({ row }) => {
            return (
                <div className='flex w-full items-center justify-end gap-x-2'>
                    <EditCategoriesModal category={row.original} />
                    <RemoveCategoriesModal category={row.original} />
                </div>
            )
        }
    }
]
