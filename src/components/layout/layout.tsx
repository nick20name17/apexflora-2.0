import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { Footer } from './footer'
import { Header } from './header'
import { LoggedHeader } from './logged-header'
import { MetaHead } from '@/components/meta-head'
import { cn } from '@/lib/utils'
import { ErrorPage } from '@/pages'
import { useAppSelector } from '@/store/hooks/hooks'

interface LayoutProps {
    showHeader?: boolean
    showFooter?: boolean
    useContainer?: boolean
}

export const Layout = ({
    showHeader = true,
    showFooter = true,
    useContainer = true
}: LayoutProps) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth)

    return (
        <QueryParamProvider
            adapter={ReactRouter6Adapter}
            options={{
                updateType: 'replaceIn'
            }}
        >
            <MetaHead />
            {showHeader ? isAuth ? <LoggedHeader /> : <Header /> : null}
            <main className={cn(useContainer ? 'container' : 'px-4')}>
                <ErrorBoundary fallback={<ErrorPage message='Щось пішло не так' />}>
                    <Outlet />
                </ErrorBoundary>
            </main>
            {showFooter ? <Footer className='mt-32' /> : null}
        </QueryParamProvider>
    )
}
