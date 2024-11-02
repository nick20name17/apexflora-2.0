import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useGetUsersQuery } from '@/store/api/users/users'

interface ManagerSelecttProps {
    manager: string
    setManager: (manager: string) => void
}
export const ManagerSelect = ({ manager, setManager }: ManagerSelecttProps) => {
    const { data: managers } = useGetUsersQuery({
        limit: 100,
        offset: 0,
        role: 'manager,admin'
    })

    const managersOptions =
        managers?.results?.map((manager) => ({
            label: manager.first_name + ' ' + manager.last_name,
            value: manager.id.toString()
        })) || []

    return (
        <div className='flex items-center gap-x-2'>
            <Select
                defaultValue={manager}
                onValueChange={setManager}
            >
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть відповідального менеджера' />
                </SelectTrigger>
                <SelectContent>
                    {managersOptions?.map((manager) => (
                        <SelectItem
                            key={manager.value}
                            value={manager.value}
                        >
                            {manager.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
