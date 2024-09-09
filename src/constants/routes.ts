export const routes = {
    main: '/',
    catalogue: '/catalogue',
    cart: '/cart',
    orders: '/orders',
    settings: '/settings',
    signUp: '/sign-up',
    signIn: '/sign-in',
    passwordReset: '/password-reset',
    paymentAndDelivery: '/payment-and-delivery',
    favorites: '/favorites',
    loyaltyProgram: '/loyalty-program',
    balance: '/balance',
    addvertisement: '/addvertisement'
} as const

export const publicRoutes = [
    routes.main,
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
