import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { MetaHead } from '@/components/meta-head'
import { ErrorPage } from '@/pages'

export const AuthLayout = () => (
    <>
        <MetaHead />
        <main>
            <ErrorBoundary fallback={<ErrorPage message='Something went wrong' />}>
                <Outlet />
            </ErrorBoundary>
        </main>
    </>
)
