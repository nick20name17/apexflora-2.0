import { type ColumnDef } from '@tanstack/react-table'

import { usersColumns } from '../../users/table/columns'

import { RestoreUserCell } from './cells/restore-user'
import type { User } from '@/store/api/users/users.types'

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'is_deleted',
        header: () => <div className='w-20'>Відновити</div>,
        cell: ({ row }) => (
            <RestoreUserCell
                key={row.original.id + String(row.original.is_deleted)}
                user={row.original}
            />
        ),
        id: 'is_deleted'
    },
    ...usersColumns
]
