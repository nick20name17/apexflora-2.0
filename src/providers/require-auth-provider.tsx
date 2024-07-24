import { type PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { protectedRoutes, routes } from '@/constants/routes'

export const RequireAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation()

    const isProtectedRoute = protectedRoutes.some((route) => route === location.pathname)

    const isAuth = false

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
