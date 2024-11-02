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

export const adminRoutes = {
    admin: '/admin',
    colors: '/admin/colors',
    bonusLimits: '/admin/bonus-limits',
    bonusPrograms: '/admin/bonus-programs',
    users: '/admin/users',
    archive: '/admin/archive',
    orders: '/admin/orders',
    contacts: '/admin/contacts',
    categories: '/admin/categories',
    producers: '/admin/producers',
    discounts: '/admin/discounts',
    products: '/admin/products'
}

export const publicRoutes = [
    routes.main,
    routes.signIn,
    routes.signUp,
    routes.passwordReset
] as const
