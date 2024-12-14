import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useLazyGetPreordersCSVQuery } from '@/store/api/orders/orders'
import { isErrorWithMessage } from '@/utils'

export const DownloadCSVBtn = () => {
    const [trigger, { isLoading }] = useLazyGetPreordersCSVQuery()

    const getCSV = () => {
        trigger()
            .unwrap()
            .then((res) => {
                const url = window.URL.createObjectURL(
                    new Blob([res], { type: 'text/csv' })
                )

                const formattedDateTime = format(new Date(), 'yyyy-MM-dd-HH-mm')

                const a = document.createElement('a')
                a.href = url
                a.download = `Передзамовлення-${formattedDateTime}.csv`
                a.click()
            })
            .catch((error) => {
                const isErrorMessage = isErrorWithMessage(error)
                toast.error(
                    (isErrorMessage && error.data.detail) ||
                        'Помилка завантаження передзамовлення'
                )
            })
    }

    return (
        <Button
            disabled={isLoading}
            onClick={getCSV}
            variant='accent'
            size='sm'
            className='w-40'
        >
            {isLoading ? <Loader2 className='animate-spin' /> : 'Завантажити CSV'}
        </Button>
    )
}
