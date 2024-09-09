import { motion } from 'framer-motion'
import { Car, Ship, TimerIcon } from 'lucide-react'

import { Skeleton } from '../ui/skeleton'

import { animations } from '@/config/animations'

export const ProductTileCard = () => {
    return (
        <motion.article
            {...animations.popLayout}
            className='flex h-40 items-start overflow-hidden rounded-md border border-foreground/25 max-md:h-auto max-md:flex-col'
        >
            <div className='h-full w-32 max-md:h-52 max-md:w-full max-xs:h-60'>
                {false ? (
                    <Skeleton className='h-full w-full rounded-none object-cover' />
                ) : (
                    <img
                        className='h-full w-full object-cover'
                        src={
                            'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
                        }
                        alt='Агапантус Глетсєр'
                    />
                )}
            </div>
            <div className='flex-1 p-3 max-md:w-full'>
                <div className='flex items-start justify-between gap-x-2'>
                    <div>
                        <h1 className='font-bold text-primary'>Агапантус Глетсєр</h1>
                        <p className='mt-1 text-xs text-foreground/60'>Артикул: 114199</p>
                    </div>
                    <img
                        className='size-4'
                        src='https://apex-flora.s3.amazonaws.com/static/flags/ke_16.png'
                        alt='flag'
                    ></img>
                </div>
                <div className='mt-2 flex items-center justify-between gap-x-2 border-t border-t-primary pt-2 text-xs'>
                    <div className='flex flex-col gap-y-0.5'>
                        <span className='text-foreground/60'>Колір</span>
                        <span className='text-primary'>Green</span>
                    </div>
                    <div className='flex flex-col gap-y-0.5'>
                        <span className='text-foreground/60'>Висота</span>
                        <span className='text-primary'>70см</span>
                    </div>
                    <div className='flex flex-col gap-y-0.5'>
                        <span className='text-foreground/60'>Якість</span>
                        <span className='text-primary'>А1</span>
                    </div>
                    <div className='flex flex-col gap-y-0.5'>
                        <span className='text-foreground/60'>Вага</span>
                        <span className='text-primary'>20</span>
                    </div>
                </div>
                <div className='mt-2 flex items-center justify-between gap-x-2 border-t border-t-primary pt-2'>
                    <div className='flex items-center gap-x-2 text-foreground/60'>
                        <Ship className='size-6' />
                        <TimerIcon className='size-6' />
                        <Car className='size-6' />
                    </div>
                    <span className='text-primary'> 29 ₴</span>
                </div>
            </div>
        </motion.article>
    )
}
