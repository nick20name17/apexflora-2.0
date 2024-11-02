import { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const roles = [
    {
        label: 'Клієнт',
        value: 'client'
    },
    {
        label: 'Менеджер',
        value: 'manager'
    },
    {
        label: 'Адміністратор',
        value: 'admin'
    }
] as const

export const RoleFilter = () => {
    const [role = 'all', setRole] = useQueryParam('role', StringParam)

    useEffect(() => {
        setRole(role)
    }, [])

    return (
        <Select
            defaultValue={role!}
            onValueChange={setRole}
        >
            <SelectTrigger>
                <SelectValue placeholder='Оберіть роль' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>Усі ролі</SelectItem>
                {roles.map((role) => (
                    <SelectItem
                        key={role.value}
                        value={role.value}
                    >
                        {role.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
