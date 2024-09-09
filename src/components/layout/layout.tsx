import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { Footer } from './footer'
import { LoggedHeader } from './logged-header'
import { MetaHead } from '@/components/meta-head'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { ErrorPage } from '@/pages'

interface LayoutProps {
    showHeader?: boolean
    showFooter?: boolean
    useContainer?: boolean
}

export const Layout = ({
    showHeader = true,
    showFooter = true,
    useContainer = true
}: LayoutProps) => (
    <>
        <MetaHead />
        {showHeader ? <LoggedHeader /> : null}
        <main className={cn(useContainer ? 'container' : 'px-4')}>
            <ErrorBoundary fallback={<ErrorPage message='Something went wrong' />}>
                <Outlet />
            </ErrorBoundary>
        </main>
        {showFooter ? <Footer className='mt-32' /> : null}
        <Toaster />
    </>
)
