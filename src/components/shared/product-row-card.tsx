import { AnimatePresence, motion } from 'framer-motion'
import { Car, Heart, Ship, TimerIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Skeleton } from '../ui/skeleton'

import { ProductStatusesCards } from './product-statuses-cards'
import { animations } from '@/config/animations'
import { cn } from '@/lib/utils'

export const ProductRowCard = () => {
    const [open, setOpen] = useState(false)
    const [isAddedToFavorites, setIsAddedToFavorites] = useState(false)

    const onAddingToFavorites = () => {
        setIsAddedToFavorites(!isAddedToFavorites)
    }

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-md border-2 border-secondary p-2 transition-colors data-[state=open]:border-primary data-[state=open]:bg-primary'
        >
            <motion.article
                {...animations.popLayout}
                className='grid h-20 grid-cols-[1fr_2fr_1fr_1fr] grid-rows-1 gap-x-6'
            >
                <div className='flex h-full items-center gap-x-2'>
                    <div className='h-full w-28'>
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
                        <h1
                            className={cn(
                                'font-bold',
                                open ? 'text-secondary' : 'text-primary'
                            )}
                        >
                            Аліум Нігрум
                        </h1>
                        <span
                            className={cn(
                                'text-sm',
                                open ? 'text-secondary' : 'text-foreground/50'
                            )}
                        >
                            🇨🇮 Gia Flowers
                        </span>
                    </div>
                </div>

                <div
                    className={cn(
                        'flex items-center justify-end gap-x-4',
                        open ? 'text-secondary' : 'text-foreground/50'
                    )}
                >
                    <AnimatePresence
                        initial={false}
                        mode='popLayout'
                    >
                        <motion.div
                            {...animations.popLayout}
                            className='flex flex-col'
                        >
                            {open ? <span className='text-accent'>Колір</span> : null}
                            <span>Білий</span>
                        </motion.div>

                        <motion.div
                            {...animations.popLayout}
                            className='flex flex-col'
                        >
                            {open ? <span className='text-accent'>Вагa/d ⌀</span> : null}
                            <span>50см</span>
                        </motion.div>
                        <motion.div
                            {...animations.popLayout}
                            className='flex flex-col'
                        >
                            {open ? <span className='text-accent'>Якість</span> : null}
                            <span>А1</span>
                        </motion.div>
                        <motion.div
                            {...animations.popLayout}
                            className='flex flex-col'
                        >
                            {open ? <span className='text-accent'>Вага</span> : null}
                            <span>13</span>
                        </motion.div>
                        {open ? (
                            <motion.div
                                {...animations.popLayout}
                                className='flex flex-col'
                            >
                                <span className='text-accent'>Зрілість</span>
                                <span>13</span>
                            </motion.div>
                        ) : null}
                        {open ? (
                            <motion.div
                                {...animations.popLayout}
                                className='flex flex-col'
                            >
                                <span className='text-accent'>Артикул</span>
                                <span>154545</span>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>

                <div className='flex items-center justify-end gap-x-4'>
                    <AnimatePresence
                        initial={false}
                        mode='popLayout'
                    >
                        <motion.div
                            {...animations.popLayout}
                            className={cn(
                                'flex items-center gap-x-2',
                                open ? 'text-accent' : 'text-foreground/60'
                            )}
                        >
                            <Ship className='size-6' />
                            <TimerIcon className='size-6' />
                            <Car className='size-6' />
                        </motion.div>
                        {open ? null : (
                            <motion.span
                                {...animations.popLayout}
                                className='text-primary'
                            >
                                {' '}
                                29 ₴
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <div className='flex items-center justify-end gap-x-2'>
                    <Button
                        onClick={onAddingToFavorites}
                        className='size-12'
                        size='icon'
                        variant={isAddedToFavorites ? 'accent' : 'outline'}
                    >
                        <Heart className='size-5' />
                    </Button>
                    <CollapsibleTrigger asChild>
                        <Button
                            className='w-28'
                            variant='outline'
                        >
                            {open ? 'Згорнути' : 'Детальніше'}
                        </Button>
                    </CollapsibleTrigger>
                </div>
            </motion.article>
            <CollapsibleContent>
                <ProductStatusesCards />
            </CollapsibleContent>
        </Collapsible>
    )
}
