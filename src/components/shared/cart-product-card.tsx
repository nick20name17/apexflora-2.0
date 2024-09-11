import { Trash } from 'lucide-react'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { StepperSelect } from '../ui/stepper-input'

export const CartProductCard = () => {
    const onProductRemove = () => {
        console.log('Remove')
    }
    return (
        <div className='flex items-center justify-between gap-x-6 rounded-md border border-secondary p-2'>
            <div className='flex items-center gap-x-2'>
                <div className='h-20 w-28'>
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
                <div className='flex flex-col gap-y-1'>
                    <h1 className='font-bold text-primary'>Аліум Нігрум</h1>
                    <span className='text-xs text-foreground/60'>🇨🇮 Gia Flowers</span>
                </div>
            </div>
            <div className='w-9/12x flex items-center justify-between gap-x-4 pr-4'>
                <StepperSelect
                    step={5}
                    max={100}
                    min={5}
                />
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Знижка</span>
                    <span className='text-primary'>0.15 ₴</span>
                </div>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Ціна</span>
                    <span className='text-primary'>33 ₴</span>
                </div>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Сума</span>
                    <span className='text-primary'>5555 ₴</span>
                </div>
                <Button
                    className='flex-shrink-0'
                    size='icon'
                    variant='destructive'
                    onClick={onProductRemove}
                >
                    <Trash className='size-4' />
                </Button>
            </div>
        </div>
    )
}
