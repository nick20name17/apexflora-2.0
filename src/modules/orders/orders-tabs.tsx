import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface OrdersTabsProps {
    status: string
    onStatusChange: (status: string) => void
}

export const OrdersTabs = ({ onStatusChange, status }: OrdersTabsProps) => {
    return (
        <Tabs
            className='w-full'
            defaultValue={status}
            onValueChange={onStatusChange}
        >
            <TabsList className='h-12 w-full bg-secondary'>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='orders'
                >
                    Історія замовлень
                </TabsTrigger>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='pre-orders'
                >
                    Мої передзамовлення
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
