'use client'

import { Check, Loader2 } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePatchContactMutation } from '@/store/api/contacts/contacts'
import type { Contacts } from '@/store/api/contacts/contacts.types'

interface NoteCellProps {
    contact: Contacts
}

export const NoteCell = ({ contact }: NoteCellProps) => {
    const [note, setNote] = useState(contact.comment || '')
    const [isEditing, setIsEditing] = useState(false)
    const [patchContact, { isLoading }] = usePatchContactMutation()
    const inputRef = useRef<HTMLInputElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handlePatchContact = useCallback(() => {
        try {
            patchContact({
                data: {
                    comment: note
                },
                id: contact.id
            })
            setIsEditing(false)
        } catch (error) {
            console.error(error)
        }
    }, [note, contact.id, patchContact])

    const handleBlur = useCallback((e: React.FocusEvent) => {
        if (!buttonRef.current?.contains(e.relatedTarget as Node)) {
            setIsEditing(false)
        }
    }, [])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                handlePatchContact()
            }
        },
        [handlePatchContact]
    )

    return (
        <div className='flex w-72 items-center gap-x-2'>
            <Input
                ref={inputRef}
                placeholder='Додайте коментар'
                className='w-60'
                maxLength={100}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onFocus={() => setIsEditing(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />
            {(isEditing || note !== contact.comment) && (
                <Button
                    ref={buttonRef}
                    disabled={isLoading || note === contact.comment}
                    onClick={handlePatchContact}
                    size='icon'
                >
                    {isLoading ? (
                        <Loader2 className='size-4 animate-spin' />
                    ) : (
                        <Check className='size-4' />
                    )}
                </Button>
            )}
        </div>
    )
}
