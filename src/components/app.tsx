import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from './layout/auth-layout'
import { SettingsLayout } from './layout/settings-layout'
import '@/assets/styles/global.css'
import { Layout } from '@/components/layout/layout'
import { routes } from '@/constants/routes'
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
                element: <CartPage />
            },
            {
                path: routes.checkout,
                element: <CheckoutPage />
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
            <Layout
                showFooter={false}
                useContainer={false}
            />
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
        element: <SettingsLayout />,
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
        path: '*',
        element: <ErrorPage />
    }
])

export const App = () => <RouterProvider router={router} />
