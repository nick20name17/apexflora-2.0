import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { usePatchContactMutation } from '@/store/api/contacts/contacts'
import type { Contacts } from '@/store/api/contacts/contacts.types'

interface IsReadCellProps {
    contact: Contacts
}

export const IsReadCell = ({ contact }: IsReadCellProps) => {
    const [isRead, setIsRead] = useState(contact.is_read)

    const [patchContact] = usePatchContactMutation()

    const handlePatchContact = (isRead: boolean) => {
        try {
            patchContact({
                data: {
                    is_read: isRead
                },
                id: contact.id
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Checkbox
            className='size-5'
            onCheckedChange={() => {
                setIsRead((prev) => !prev)
                handlePatchContact(!isRead)
            }}
            checked={isRead}
        />
    )
}
