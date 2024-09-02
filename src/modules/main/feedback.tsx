import { PlayCircleIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import feedbackOne from '@/assets/video/feedback/feedback_01.mp4'
import feedbackTwo from '@/assets/video/feedback/feedback_02.mp4'
import feedbackThree from '@/assets/video/feedback/feedback_03.mp4'
import feedbackFour from '@/assets/video/feedback/feedback_04.mp4'
import { cn } from '@/lib/utils'

export const Feedback = () => {
    return (
        <section
            className='mt-8'
            id='feedback'
        >
            <h2 className='text-[32px] text-primary'>Відгуки</h2>
            <p className='mt-1 text-foreground/60'>
                Ніхто не скаже про тебе краще, ніж задоволений клієнт. Нам довіряють і для
                нас це найдорожче
            </p>

            <div className='mt-5 flex flex-wrap items-center justify-center gap-4'>
                <InstagramStory
                    className='h-[560px]'
                    url={feedbackOne}
                />
                <InstagramStory
                    className='h-[560px]'
                    url={feedbackTwo}
                />
                <InstagramStory
                    className='h-[560px]'
                    url={feedbackThree}
                />
                <InstagramStory
                    className='h-[560px]'
                    url={feedbackFour}
                />
            </div>
        </section>
    )
}

interface InstagramStoryProps extends React.HTMLAttributes<HTMLDivElement> {
    url: string
}

const InstagramStory: React.FC<InstagramStoryProps> = ({ url, className }) => {
    const [play, setPlay] = useState(false)
    const [duration, setDuration] = useState(0)
    const [progress, setProgress] = useState(0)

    const storyRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        if (storyRef.current) {
            const handleLoadedMetadata = () => {
                setDuration(Math.floor(storyRef.current!.duration))
            }
            storyRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
            return () => {
                storyRef.current?.removeEventListener(
                    'loadedmetadata',
                    handleLoadedMetadata
                )
            }
        }
    }, [url])

    useEffect(() => {
        if (play) {
            storyRef.current?.play()
        } else {
            storyRef.current?.pause()
        }
    }, [play])

    const togglePlay = useCallback(() => {
        setPlay((prev) => !prev)
    }, [])

    const handleTimeUpdate = useCallback(() => {
        const currentTime = storyRef.current?.currentTime || 0
        setProgress((currentTime / duration) * 100)
    }, [duration])

    useEffect(() => {
        const videoElement = storyRef.current
        videoElement?.addEventListener('timeupdate', handleTimeUpdate)
        videoElement?.addEventListener('ended', () => setPlay(false))

        return () => {
            videoElement?.removeEventListener('timeupdate', handleTimeUpdate)
            videoElement?.removeEventListener('ended', () => setPlay(false))
        }
    }, [handleTimeUpdate])

    return (
        <div
            onClick={togglePlay}
            className={cn('relative', className)}
        >
            <div className='absolute left-1/2 top-3 h-1 w-[94%] -translate-x-1/2 transform rounded-full bg-background/50'>
                <div
                    className='h-full rounded-full bg-background [transition:width_250ms_linear]'
                    style={{
                        width: `${progress <= 100 ? progress : 100}%`
                    }}
                ></div>
            </div>
            <Link
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className='absolute left-3 top-7 z-10 flex cursor-pointer items-center gap-2'
                to='https://www.instagram.com/apexflora.ua/'
                target='_blank'
            >
                <div className='h-7 w-7 overflow-hidden rounded-full'>
                    <svg
                        viewBox='0 0 167 167'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M1.45961e-05 -3.05176e-05L0 166.96L166.96 166.96L166.96 -1.59215e-05L1.45961e-05 -3.05176e-05Z'
                            fill='#EE731B'
                        />
                        <path
                            d='M29.345 28.4349C57.005 28.4349 79.465 50.8949 79.465 78.5549L79.465 138.515C51.805 138.515 29.345 116.055 29.345 88.3949L29.345 28.4349Z'
                            fill='#23254F'
                        />
                        <path
                            d='M137.625 28.445L137.625 88.405C137.625 116.065 115.165 138.525 87.5051 138.525L87.5051 78.5649C87.5051 50.9049 109.965 28.4449 137.625 28.445Z'
                            fill='#23254F'
                        />
                    </svg>
                </div>
                <div className='text-sm text-background'>apexflora.ua</div>
            </Link>
            {!play && (
                <button
                    className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer'
                    aria-label='Play video'
                >
                    <PlayCircleIcon className='h-10 w-10 text-background' />
                </button>
            )}
            <video
                ref={storyRef}
                controls={false}
                className='h-full w-full rounded-md object-fill'
                src={url}
            />
        </div>
    )
}
