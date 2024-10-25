import { type ColumnDef } from '@tanstack/react-table'

import { EditBonusLimitModal } from '../modals/edit'
import { RemoveBonusLimitModal } from '../modals/remove'

import type { BonusLimit } from '@/store/api/bonuses/bonuses.types'

export const columns: ColumnDef<BonusLimit>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='w-40'>Ліміт</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.accumulation_limit}</div>
        }
    },
    {
        accessorKey: 'hex',
        header: () => <div className='w-40'>Знижка</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.discount}%</div>
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div className='w-24'>Дії</div>,
        cell: ({ row }) => {
            return (
                <div className='flex w-24 items-center gap-x-2'>
                    <EditBonusLimitModal bonusLimit={row.original} />
                    <RemoveBonusLimitModal bonusLimit={row.original} />
                </div>
            )
        }
    }
]
