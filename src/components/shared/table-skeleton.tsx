import { Skeleton } from '../ui/skeleton'
import { TableCell, TableRow } from '../ui/table'

import { tableConfig } from '@/config/table'

interface TableSkeletonProps {
    columnsCount: number
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
    columnsCount: cellCount
}) => {
    return Array.from({ length: tableConfig.pagination.pageSize }).map((_, index) => (
        <TableRow
            className='p-0'
            key={index}
        >
            <TableCell
                colSpan={cellCount}
                className='h-14 px-1 py-1.5'
            >
                <Skeleton className='h-14 w-full' />
            </TableCell>
        </TableRow>
    ))
}
