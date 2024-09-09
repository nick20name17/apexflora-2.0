import { useState } from 'react'

import { DualSliderWithInputs } from './dual-slider-with-inputs'
import fireIcon from '@/assets/icons/fire.png'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

export const FiltersSidebar = () => {
    const [price, setPrice] = useState([5, 100])

    return (
        <ScrollArea className='h-[calc(100vh-95px)] w-64 bg-secondary px-6 pb-6 pt-2 max-[1128px]:hidden'>
            <Accordion type='multiple'>
                <AccordionItem value='category'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Категорія
                    </AccordionTrigger>
                    <AccordionContent className='space-y-2 px-1 pb-3'>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Не троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Не троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Не троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Троянди
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Не троянди
                            </label>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='country'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Країна
                    </AccordionTrigger>
                    <AccordionContent className='space-y-2 px-1 pb-3'>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Бельгія
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Україна
                            </label>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='color'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Колір
                    </AccordionTrigger>
                    <AccordionContent className='space-y-2 px-1 pb-3'>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='flex items-center gap-x-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                <div className='size-4 rounded-full bg-green-500'></div>
                                Зелений
                            </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Checkbox id='terms' />
                            <label
                                htmlFor='terms'
                                className='flex items-center gap-x-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                <div className='size-4 rounded-full bg-blue-500'></div>
                                Синій
                            </label>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='price'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Ціна за штуку, ₴
                    </AccordionTrigger>
                    <AccordionContent>
                        <DualSliderWithInputs
                            className='mt-2'
                            minStepsBetweenThumbs={0}
                            step={5}
                            max={100}
                            min={5}
                            value={price}
                            setValue={setPrice}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='height'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Висота, см.
                    </AccordionTrigger>
                    <AccordionContent>
                        <DualSliderWithInputs
                            className='mt-2'
                            minStepsBetweenThumbs={0}
                            step={5}
                            max={100}
                            min={5}
                            value={price}
                            setValue={setPrice}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className='mt-4 flex items-center gap-x-3'>
                <Checkbox id='terms' />
                <label
                    htmlFor='terms'
                    className='flex items-center gap-x-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Промо ціна
                    <img
                        className='w-3'
                        src={fireIcon}
                        alt='fire'
                    />
                </label>
            </div>
        </ScrollArea>
    )
}
