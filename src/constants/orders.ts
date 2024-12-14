import type { Statuses } from '@/store/api/orders/orders.types'

export const orderStatuses: Statuses[] = [
    'approval',
    'pending',
    'shipped',
    'delivered',
    'canceled'
]
