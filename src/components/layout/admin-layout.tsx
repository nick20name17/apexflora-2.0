import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { MetaHead } from '../meta-head'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { Toaster } from '../ui/sonner'

import { AdminSidebar } from './admin-sidebar'
import { ErrorPage } from '@/pages'

export const AdminLayout = () => {
    return (
        <QueryParamProvider
            adapter={ReactRouter6Adapter}
            options={{
                updateType: 'replaceIn'
            }}
        >
            <MetaHead />
            <SidebarProvider>
                <AdminSidebar />
                <main className='w-full px-4'>
                    <SidebarTrigger />

                    <ErrorBoundary fallback={<ErrorPage message='Щось пішло не так' />}>
                        <Outlet />
                    </ErrorBoundary>
                </main>
            </SidebarProvider>

            <Toaster
                richColors
                duration={6000}
            />
        </QueryParamProvider>
    )
}
