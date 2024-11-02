import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { usePatchUserMutation } from '@/store/api/users/users'
import type { User } from '@/store/api/users/users.types'

interface RestoreUserCellProps {
    user: User
}

export const RestoreUserCell = ({ user }: RestoreUserCellProps) => {
    const [open, setOpen] = useState(false)
    const [patchUser, { isLoading }] = usePatchUserMutation()

    const handlePatchContact = () => {
        try {
            patchUser({
                data: {
                    is_deleted: false
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
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger>
                <Button
                    variant='outline'
                    size='sm'
                >
                    Відновити
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Відновити користувача{' '}
                        <span>{user.first_name + ' ' + user.last_name}</span>?
                    </DialogTitle>
                </DialogHeader>
                <div className='flex items-center justify-end gap-x-4'>
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        size='sm'
                        variant='secondary'
                    >
                        Відмінити
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={handlePatchContact}
                        size='sm'
                        className='flex w-24 items-center gap-x-1.5'
                    >
                        {isLoading ? (
                            <Loader2 className='size-4 animate-spin' />
                        ) : (
                            'Відновити'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
