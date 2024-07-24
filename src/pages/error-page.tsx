import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'

interface ErrorProps {
    message?: string
}

export const ErrorPage: React.FC<ErrorProps> = ({ message = 'Page not found' }) => {
    const navigate = useNavigate()
    const onClick = () => navigate(routes.home)

    return (
        <div className='flex min-h-[100vh] items-center justify-center'>
            <div className='flex flex-col items-center gap-y-5'>
                <h1 className='text-center text-5xl'>{message}</h1>
                <Button onClick={onClick}>Go to homepage</Button>
            </div>
        </div>
    )
}
