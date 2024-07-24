export const routes = {
    home: '/',
    catalogue: '/catalogue',
    cart: '/cart',
    orders: '/orders',
    settings: '/settings',
    signUp: '/sign-up',
    signIn: '/sign-in',
    passwordReset: '/password-reset'
} as const

export const publicRoutes = [
    routes.home,
    routes.signIn,
    routes.signUp,
    routes.passwordReset
] as const

export const protectedRoutes = [
    routes.catalogue,
    routes.cart,
    routes.orders,
    routes.settings,
    routes.signUp,
    routes.signIn,
    routes.passwordReset
] as const
