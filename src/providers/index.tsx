import { type PropsWithChildren } from 'react'

import { AuthProvider } from '@/providers/auth-provider'
import { ThemeProvider } from '@/providers/theme-provider'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider
            defaultTheme='light'
            storageKey='vite-ui-theme'
        >
            <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
    )
}
