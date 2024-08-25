import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { Footer } from './footer'
import { Header } from './header'
import { MetaHead } from '@/components/meta-head'
import { Toaster } from '@/components/ui/sonner'
import { ErrorPage } from '@/pages/error-page'

export const Layout = () => (
    <>
        <MetaHead />
        <Header />
        <main className='container'>
            <ErrorBoundary fallback={<ErrorPage message='Something went wrong' />}>
                <Outlet />
            </ErrorBoundary>
        </main>
        <Footer />
        <Toaster />
    </>
)
