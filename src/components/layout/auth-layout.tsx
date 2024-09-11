import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, useNavigate } from 'react-router-dom'

import { MetaHead } from '@/components/meta-head'
import { routes } from '@/constants/routes'
import { ErrorPage } from '@/pages'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectIsAuth } from '@/store/slices/auth'

export const AuthLayout = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate(routes.main)
        }
    }, [])

    return (
        <>
            <MetaHead />
            <main>
                <ErrorBoundary fallback={<ErrorPage message='Something went wrong' />}>
                    <Outlet />
                </ErrorBoundary>
            </main>
        </>
    )
}
