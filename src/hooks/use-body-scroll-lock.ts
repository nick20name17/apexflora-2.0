import { useEffect } from 'react'

export const useBodyScrollLock = (isLocked: boolean = true) => {
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = ''
        }

        return () => {
            document.body.style.overflowY = ''
        }
    }, [isLocked])
}
