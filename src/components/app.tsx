import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AdminLayout } from './layout/admin-layout'
import { AuthLayout } from './layout/auth-layout'
import { SettingsLayout } from './layout/settings-layout'
import '@/assets/styles/global.css'
import { Layout } from '@/components/layout/layout'
import { adminRoutes, routes } from '@/constants/routes'
import {
    AddvertismentPage,
    BalancePage,
    CartPage,
    CataloguePage,
    CheckoutPage,
    ErrorPage,
    FavoritesPage,
    LoyaltyProgramPage,
    MainPage,
    OrdersPage,
    PasswordResetPage,
    PaymentAndDeliveryPage,
    SettingsPage,
    SignInPage,
    SignUpPage
} from '@/pages'
import { ColorsPage } from '@/pages/admin/colors-page'
import { DiscountsPage } from '@/pages/admin/discounts-page'
import { ProducersPage } from '@/pages/admin/producers-page'
import { RequireAuthProvider } from '@/providers/require-auth-provider'

const router = createBrowserRouter([
    {
        path: routes.main,
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <MainPage />
            },

            {
                path: routes.cart,
                element: (
                    <RequireAuthProvider>
                        <CartPage />
                    </RequireAuthProvider>
                )
            },
            {
                path: routes.checkout,
                element: (
                    <RequireAuthProvider>
                        <CheckoutPage />
                    </RequireAuthProvider>
                )
            },
            {
                path: routes.passwordReset,
                element: <PasswordResetPage />
            },
            {
                path: routes.paymentAndDelivery,
                element: <PaymentAndDeliveryPage />
            }
        ]
    },
    {
        path: routes.catalogue,
        element: (
            <RequireAuthProvider>
                {' '}
                <Layout
                    showFooter={false}
                    useContainer={false}
                />
            </RequireAuthProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <CataloguePage />
            }
        ]
    },
    {
        path: routes.main,
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: routes.signIn,
                element: <SignInPage />
            },
            {
                path: routes.signUp,
                element: <SignUpPage />
            }
        ]
    },
    {
        path: routes.main,
        element: (
            <RequireAuthProvider>
                <SettingsLayout />
            </RequireAuthProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: routes.settings,
                element: <SettingsPage />
            },
            {
                path: routes.orders,
                element: <OrdersPage />
            },
            {
                path: routes.favorites,
                element: <FavoritesPage />
            },
            {
                path: routes.loyaltyProgram,
                element: <LoyaltyProgramPage />
            },
            {
                path: routes.balance,
                element: <BalancePage />
            },
            {
                path: routes.addvertisement,
                element: <AddvertismentPage />
            }
        ]
    },
    {
        path: adminRoutes.admin,
        element: (
            <RequireAuthProvider>
                <AdminLayout />
            </RequireAuthProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: adminRoutes.colors,
                element: <ColorsPage />
            },
            {
                path: adminRoutes.producers,
                element: <ProducersPage />
            },
            {
                path: adminRoutes.discounts,
                element: <DiscountsPage />
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])

export const App = () => <RouterProvider router={router} />
