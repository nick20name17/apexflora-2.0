import {
    CarIcon,
    Heart,
    LayoutDashboard,
    LogOut,
    PercentCircle,
    Settings,
    UserIcon
} from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { Footer } from './footer'
import { LoggedHeader } from './logged-header'
import { MetaHead } from '@/components/meta-head'
import { Toaster } from '@/components/ui/sonner'
import { adminRoutes, routes } from '@/constants/routes'
import { useCurrentUserRole } from '@/hooks/use-current-user-role'
import { cn } from '@/lib/utils'
import { ErrorPage } from '@/pages'
import { useAppDispatch } from '@/store/hooks/hooks'
import { logout } from '@/store/slices/auth'

export const SettingsLayout = () => (
    <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
            updateType: 'replaceIn'
        }}
    >
        <MetaHead />
        <LoggedHeader />
        <main className='container'>
            <div className='flex items-start gap-x-6'>
                <SettingsSidebar />
                <ErrorBoundary fallback={<ErrorPage message='Щось пішло не так' />}>
                    <Outlet />
                </ErrorBoundary>
            </div>
        </main>
        <Footer />
        <Toaster />
    </QueryParamProvider>
)

const SettingsSidebar = () => {
    const isUser = useCurrentUserRole('user')

    const { pathname } = useLocation()

    const dispatch = useAppDispatch()

    return (
        <aside className='min-w-72 bg-secondary max-lg:hidden'>
            <div className='flex items-center gap-x-2.5 bg-primary p-4 text-background'>
                <UserIcon className='size-8 flex-shrink-0' />
                <div className='flex flex-col'>
                    <span>Головний Адмін</span>
                    <span>admin@apexflora.com.ua</span>
                </div>
            </div>

            <nav className='px-4 py-6'>
                <ul className='flex h-full min-h-[580px] flex-col gap-y-2'>
                    {isUser ? null : (
                        <li
                            className={cn(
                                'cursor-pointer rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary',
                                pathname === adminRoutes.colors
                                    ? 'bg-primary text-background'
                                    : ''
                            )}
                        >
                            <NavLink
                                className='flex items-center gap-x-2 p-3'
                                to={adminRoutes.colors}
                            >
                                <LayoutDashboard className='size-5' />
                                Адмін
                            </NavLink>
                        </li>
                    )}
                    <li
                        className={cn(
                            'cursor-pointer rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.favorites
                                ? 'bg-primary text-background'
                                : ''
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3'
                            to={routes.favorites}
                        >
                            <Heart className='size-5' />
                            Збережені
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.orders ? 'bg-primary text-background' : ''
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3'
                            to={routes.orders}
                        >
                            <CarIcon className='size-5' />
                            Мої замовлення
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.settings
                                ? 'bg-primary text-background'
                                : ''
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3'
                            to={routes.settings}
                        >
                            <Settings className='size-5' />
                            Налаштування
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.loyaltyProgram
                                ? 'bg-primary text-background'
                                : ''
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3'
                            to={routes.loyaltyProgram}
                        >
                            <PercentCircle className='size-5' />
                            Програма лояльності
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.balance
                                ? 'bg-primary text-background'
                                : ''
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3'
                            to={routes.balance}
                        >
                            Баланс
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.addvertisement
                                ? 'bg-primary text-background'
                                : ''
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3'
                            to={routes.addvertisement}
                        >
                            Рекламація
                        </NavLink>
                    </li>

                    <li
                        onClick={() => dispatch(logout())}
                        className='mt-auto cursor-pointer justify-self-end rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary'
                    >
                        <button className='flex items-center gap-x-2 p-3'>
                            <LogOut className='size-5' />
                            Вийти
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
