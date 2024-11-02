import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import type { Roles } from '@/store/api/users/users.types'

interface RoleSelectProps {
    role: Roles
    setRole: (role: Roles) => void
}

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

export const RoleSelect = ({ role, setRole }: RoleSelectProps) => {
    return (
        <Select
            defaultValue={role}
            onValueChange={setRole}
        >
            <SelectTrigger>
                <SelectValue placeholder='Оберіть роль' />
            </SelectTrigger>
            <SelectContent>
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
