import { type PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { AuthProvider } from '@/providers/auth-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { store } from '@/store'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Provider store={store}>
            <ThemeProvider
                defaultTheme='light'
                storageKey='vite-ui-theme'
            >
                <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
        </Provider>
    )
}
