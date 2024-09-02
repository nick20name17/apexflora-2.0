import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { Footer } from './footer'
import { LoggedHeader } from './logged-header'
import { MetaHead } from '@/components/meta-head'
import { Toaster } from '@/components/ui/sonner'
import { ErrorPage } from '@/pages/error-page'

export const Layout = () => (
    <>
        <MetaHead />
        <LoggedHeader />
        <main className='container'>
            <ErrorBoundary fallback={<ErrorPage message='Something went wrong' />}>
                <Outlet />
            </ErrorBoundary>
        </main>
        <Footer />
        <Toaster />
    </>
)
