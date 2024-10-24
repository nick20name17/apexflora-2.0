import { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

interface OrderedModalProps {
    initialOpen: boolean
}
export const OrderedModal = ({ initialOpen }: OrderedModalProps) => {
    const [open, setOpen] = useState(initialOpen)

    useEffect(() => {
        if (open === false) {
            window.history.replaceState({}, '')
        }
    }, [open])

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ваше замовлення успішно оформлено</DialogTitle>
                    <DialogDescription>
                        Для остаточного підтвердження замовлення, найближчим часом, з вами
                        звяжеться наш менеджер.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
