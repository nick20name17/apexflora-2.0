export const PageLoader = () => (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary'>
        <svg
            className='size-16'
            viewBox='0 0 109 111'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <defs>
                <linearGradient
                    gradientTransform='rotate(90)'
                    id='bottom-to-top'
                >
                    <stop
                        offset='0'
                        stopColor='#23254F'
                    >
                        <animate
                            dur='1s'
                            attributeName='offset'
                            fill='freeze'
                            from='1'
                            to='0'
                            repeatCount='indefinite'
                        />
                    </stop>
                    <stop
                        offset='0'
                        stopColor='#C4DD00'
                    >
                        <animate
                            dur='1s'
                            attributeName='offset'
                            fill='freeze'
                            from='1'
                            to='0'
                            repeatCount='indefinite'
                        />
                    </stop>
                </linearGradient>
            </defs>

            <path
                d='M0.339844 0C27.9998 3.62717e-06 50.4598 22.46 50.4598 50.12L50.4598 110.08C22.7998 110.08 0.339832 87.62 0.339836 59.96L0.339844 0Z'
                fill='url(#bottom-to-top)'
            />
            <path
                d='M108.62 0.0100163L108.62 59.97C108.62 87.63 86.1597 110.09 58.4997 110.09L58.4997 50.13C58.4998 22.47 80.9598 0.0100127 108.62 0.0100163Z'
                fill='url(#bottom-to-top)'
            />
        </svg>
    </div>
)
