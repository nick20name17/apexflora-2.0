import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import '@/assets/styles/global.css'
import { Layout } from '@/components/layout'
import { routes } from '@/constants/routes'
import {
    CartPage,
    CataloguePage,
    HomePage,
    OrdersPage,
    PasswordResetPage,
    SettingsPage,
    SignInPage,
    SignUpPage
} from '@/pages'
import { ErrorPage } from '@/pages/error-page'
import { RequireAuthProvider } from '@/providers/require-auth-provider'

const router = createBrowserRouter([
    {
        path: routes.home,
        element: (
            <RequireAuthProvider>
                <Layout />
            </RequireAuthProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: routes.signIn,
                element: <SignInPage />
            },
            {
                path: routes.signUp,
                element: <SignUpPage />
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
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])

export const App = () => <RouterProvider router={router} />
