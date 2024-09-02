import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from './layout/auth-layout'
import '@/assets/styles/global.css'
import { Layout } from '@/components/layout/layout'
import { routes } from '@/constants/routes'
import {
    CartPage,
    CataloguePage,
    MainPage,
    OrdersPage,
    PasswordResetPage,
    SettingsPage,
    SignInPage,
    SignUpPage
} from '@/pages'
import { ErrorPage } from '@/pages/error-page'
import { PaymentAndDeliveryPage } from '@/pages/payment-and-delivery'

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
                path: routes.catalogue,
                element: <CataloguePage />
            },
            {
                path: routes.cart,
                element: <CartPage />
            },
            {
                path: routes.orders,
                element: <OrdersPage />
            },
            {
                path: routes.settings,
                element: <SettingsPage />
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
        path: '*',
        element: <ErrorPage />
    }
])

export const App = () => <RouterProvider router={router} />
