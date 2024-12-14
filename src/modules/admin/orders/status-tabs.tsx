import { getStatusProductsDisplay } from '@/components/shared/product-statuses-cards'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetStatusProductsQuery } from '@/store/api/status-products/status-products'

interface StatusTabsProps {
    status: string
    setStatus: React.Dispatch<React.SetStateAction<string>>
}

export const StatusTabs = ({ status, setStatus }: StatusTabsProps) => {
    const { data, isLoading } = useGetStatusProductsQuery({})

    const statusProducts = data?.results || []

    if (isLoading) {
        return <Skeleton className='h-12 w-full' />
    }

    return (
        <Tabs
            className='w-full'
            defaultValue={status}
            onValueChange={setStatus}
        >
            <TabsList className='h-12 w-full bg-secondary'>
                {statusProducts.map((statusProduct) => {
                    const { name, icon } = getStatusProductsDisplay(statusProduct.id)

                    return (
                        <TabsTrigger
                            key={statusProduct.id}
                            className='flex- h-full flex-1 items-center gap-x-2 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                            value={statusProduct.id.toString()}
                        >
                            {icon}
                            {name}
                        </TabsTrigger>
                    )
                })}
            </TabsList>
        </Tabs>
    )
}
