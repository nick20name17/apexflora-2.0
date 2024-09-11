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
    addvertisement: '/addvertisement',
    checkout: '/checkout'
} as const

export const publicRoutes = [
    routes.main,
    routes.signIn,
    routes.signUp,
    routes.passwordReset
] as const
