import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import heroBg1 from '@/assets/images/main/hero_bg_01.webp'
import heroBg2 from '@/assets/images/main/hero_bg_02.webp'
import heroBg3 from '@/assets/images/main/hero_bg_03.webp'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { routes } from '@/constants/routes'
import { cn } from '@/lib/utils'

export const Hero = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <>
            <h1 className='sr-only'>Apex Flora</h1>
            <Carousel
                setApi={setApi}
                opts={{
                    loop: true
                }}
                plugins={[
                    Autoplay({
                        delay: 5000
                    })
                ]}
                className='relative mt-10 w-[calc(100%+16px)]'
            >
                <CarouselContent className='w-full'>
                    <CarouselItem>
                        <div
                            className='flex h-[508px] flex-col items-start justify-center gap-y-4 rounded-3xl bg-background bg-cover bg-center p-20 text-background'
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${heroBg1})`
                            }}
                        >
                            <h3 className='max-w-[500px] text-5xl'>Apex Flora</h3>
                            <p className='text-xl'> Квіти гуртом, з усього світу!</p>
                            <Button
                                variant='secondary'
                                asChild
                            >
                                <Link to={routes.catalogue}>До каталогу</Link>
                            </Button>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div
                            className='flex h-[508px] flex-col items-start justify-center gap-y-4 rounded-3xl bg-background bg-cover bg-center p-20 text-background'
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${heroBg2})`
                            }}
                        >
                            <h1 className='max-w-[500px] text-5xl'>
                                -10% на перше замволення з сайту
                            </h1>
                            <p className='text-xl'>
                                Реєструйтесь, робіть замовлення та отримуйте додаткову
                                знижку
                            </p>
                            <Button
                                variant='secondary'
                                asChild
                            >
                                <Link to={routes.catalogue}>До каталогу</Link>
                            </Button>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div
                            className='flex h-[508px] flex-col items-start justify-center gap-y-4 rounded-3xl bg-background bg-cover bg-center p-20 text-background'
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${heroBg3})`
                            }}
                        >
                            <h1 className='max-w-[500px] text-5xl'>
                                Купуй квіти за вигідною ціною!
                            </h1>
                            <p className='text-xl'>
                                Обирай квіти серед більше 1000 позицій, за найкращими
                                цінами
                            </p>
                            <Button
                                variant='secondary'
                                asChild
                            >
                                <Link to={routes.catalogue}>До каталогу</Link>
                            </Button>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <div className='absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-x-2'>
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            className={cn(
                                'h-1.5 w-10 rounded-full bg-background/50 transition-colors',
                                {
                                    'bg-background': index + 1 === current
                                }
                            )}
                            onClick={() => api?.scrollTo(index)}
                        ></button>
                    ))}
                </div>
                <div className='absolute bottom-10 right-20 z-10'>
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </>
    )
}
