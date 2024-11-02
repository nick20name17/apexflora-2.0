import { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const ActiveFilter = () => {
    const [isActive = 'all', setIsActive] = useQueryParam('is_active', StringParam)

    useEffect(() => {
        setIsActive(isActive)
    }, [])

    return (
        <Select
            defaultValue={isActive!}
            onValueChange={setIsActive}
        >
            <SelectTrigger>
                <SelectValue placeholder='Оберіть активність' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>Усі користувачі</SelectItem>
                <SelectItem value='active'>Активні</SelectItem>
                <SelectItem value='unactive'>Неактивні</SelectItem>
            </SelectContent>
        </Select>
    )
}
