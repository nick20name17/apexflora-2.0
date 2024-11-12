import { AddDiscountModal } from '../../discounts/modals/add'

import { MultiSelect } from '@/components/ui/multi-select'
import { useGetDiscountsQuery } from '@/store/api/discounts/discounts'

interface DiscountSelectProps {
    discounts: string[]
    setDiscounts: (discounts: string[]) => void
}
export const DiscountsSelect = ({ discounts, setDiscounts }: DiscountSelectProps) => {
    const { data } = useGetDiscountsQuery({})
    const discountsData = data?.results || []

    const discountsOptions =
        discountsData.map((discount) => ({
            label: discount.name,
            value: discount.id.toString()
        })) || []

    return (
        <div className='flex items-center gap-x-2'>
            <MultiSelect
                disabled={discountsData.length === 0}
                modalPopover
                maxCount={2}
                defaultValue={discounts}
                options={discountsOptions}
                onValueChange={setDiscounts}
                placeholder='Оберіть знижки'
                animation={0}
            />
            <AddDiscountModal size='icon' />
        </div>
    )
}
