import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { EditDiscountModal } from '../modals/edit'
import { RemoveDiscountModal } from '../modals/remove'

import type { Discount } from '@/store/api/discounts/discounts.types'

export const columns: ColumnDef<Discount>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='w-40'>Назва знижки</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.name}</div>
        }
    },
    {
        accessorKey: 'percentage',
        header: () => <div className='w-24'>Відсоток</div>,
        cell: ({ row }) => {
            return <div className='w-24'>{row.original.percentage} %</div>
        }
    },
    {
        accessorKey: 'start_date',
        header: () => <div className='w-32'>Дата початку</div>,
        cell: ({ row }) => {
            return (
                <div className='w-32'>
                    {format(row.original.start_date, 'dd.MM.yyyy')}
                </div>
            )
        }
    },
    {
        accessorKey: 'end_date',
        header: () => <div className='w-32'>Дата завершення</div>,
        cell: ({ row }) => {
            return (
                <div className='w-32'>{format(row.original.end_date, 'dd.MM.yyyy')}</div>
            )
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div className='w-24'>Дії</div>,
        cell: ({ row }) => {
            return (
                <div className='flex w-24 items-center gap-x-2'>
                    <EditDiscountModal discount={row.original} />
                    <RemoveDiscountModal discount={row.original} />
                </div>
            )
        }
    }
]
