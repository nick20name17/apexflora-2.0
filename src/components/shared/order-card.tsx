import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Skeleton } from '../ui/skeleton'

import { cn } from '@/lib/utils'

type Statuses =
    | 'pending'
    | 'approval'
    | 'shipped'
    | 'delivered'
    | ('canceled' & (string & {}))

const getStatusName = (statusName: Statuses) => {
    const statuses = {
        pending: {
            displayName: 'Очікує підтвердження',
            className: 'bg-[#FF7300] text-primary'
        },
        approval: {
            displayName: 'Підтверджено',
            className: 'bg-primary text-background'
        },
        shipped: {
            displayName: 'Відправлено',
            className: 'bg-sky-400'
        },
        delivered: {
            displayName: 'Виконано',
            className: 'bg-accent text-primary'
        },
        canceled: {
            displayName: 'Скасовано',
            className: 'bg-destructive text-background'
        }
    }

    return statuses[statusName]
}

export const OrderCard = () => {
    const [open, setOpen] = useState(false)

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-md border-2 border-secondary p-4 transition-colors data-[state=open]:border-primary'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-8'>
                <div className='flex flex-1 items-center justify-between gap-x-4'>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'># Замовлення</span>
                        <span className='text-primary'>44</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Дата оформлення</span>
                        <span className='text-primary'>05.09.2024</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Спосіб оплати</span>
                        <span className='text-primary'>Самовивіз</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Статус</span>
                        <OrderCardStatus statusName='shipped' />
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Знижка</span>
                        <span className='text-primary'>0.15 ₴</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Сума</span>
                        <span className='text-primary'>5555 ₴</span>
                    </div>
                </div>
                <Button
                    size='icon'
                    variant='outline'
                >
                    <ChevronDown
                        className={cn(
                            'size-4 transition-transform',
                            open ? 'rotate-180' : ''
                        )}
                    />
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className='mt-4 flex flex-col gap-y-2'>
                    <OrderItemCard />
                    <OrderItemCard />
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

const OrderItemCard = () => {
    return (
        <div className='flex items-center justify-between gap-x-4 rounded-md border-2 border-secondary p-1'>
            <div className='flex items-center gap-x-2'>
                <div className='h-16 w-24'>
                    {false ? (
                        <Skeleton className='h-full w-full rounded-sm object-cover' />
                    ) : (
                        <img
                            className='h-full w-full rounded-sm object-cover'
                            src={
                                'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
                            }
                            alt='Агапантус Глетсєр'
                        />
                    )}
                </div>
                <div className='flex flex-col gap-y-0.5 text-sm'>
                    <h1 className='font-bold text-primary'>Аліум Нігрум</h1>
                    <span className='text-foreground/60'>Артикул: 114199</span>
                </div>
            </div>
            <div className='grid h-full w-3/4 grid-cols-3 items-center gap-x-4 pr-4'>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Всього</span>
                    <span className='text-primary'>800</span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Знижка</span>
                    <span className='text-primary'>0.15 ₴</span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Сума</span>
                    <span className='text-primary'>5555 ₴</span>
                </div>
            </div>
        </div>
    )
}

const OrderCardStatus = ({ statusName }: { statusName: Statuses }) => {
    const status = getStatusName(statusName)

    return (
        <div className={cn('rounded-md px-2 py-1.5 text-xs', status.className)}>
            {status.displayName}
        </div>
    )
}
