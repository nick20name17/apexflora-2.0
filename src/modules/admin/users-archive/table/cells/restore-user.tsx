import { useState } from 'react'
import { toast } from 'sonner'

import { Checkbox } from '@/components/ui/checkbox'
import { usePatchUserMutation } from '@/store/api/users/users'
import type { User } from '@/store/api/users/users.types'

interface RestoreUserCellProps {
    user: User
}

export const RestoreUserCell = ({ user }: RestoreUserCellProps) => {
    const [isDeleted, setIsDeleted] = useState(!!user.is_deleted)

    const [patchUser] = usePatchUserMutation()

    const handlePatchContact = (isDeleted: boolean) => {
        try {
            patchUser({
                data: {
                    is_deleted: isDeleted
                },
                id: user.id
            })
                .unwrap()
                .then(() => {
                    toast.success(
                        `Користувача ${user.first_name} ${user.last_name} успішно відновлено`
                    )
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Checkbox
            className='size-5'
            onCheckedChange={() => {
                setIsDeleted((prev) => !prev)
                handlePatchContact(isDeleted)
            }}
            checked={isDeleted}
        />
    )
}
