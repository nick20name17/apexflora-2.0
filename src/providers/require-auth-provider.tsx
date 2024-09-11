import { type PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { publicRoutes, routes } from '@/constants/routes'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectIsAuth } from '@/store/slices/auth'

export const RequireAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation()

    const isProtectedRoute = publicRoutes.some((route) => route !== location.pathname)

    const isAuth = useAppSelector(selectIsAuth)

    if (isProtectedRoute && !isAuth) {
        return (
            <Navigate
                to={routes.signIn}
                state={{ from: location }}
                replace
            />
        )
    }

    return children
}
