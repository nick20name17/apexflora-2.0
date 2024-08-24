import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { MetaHead } from '@/components/meta-head'
import { Toaster } from '@/components/ui/sonner'
import { ErrorPage } from '@/pages/error-page'

export const Layout = () => (
    <>
        <MetaHead />
        <main>
            <ErrorBoundary fallback={<ErrorPage message='Something went wrong' />}>
                <Outlet />
            </ErrorBoundary>
        </main>
        <Toaster />
    </>
)
