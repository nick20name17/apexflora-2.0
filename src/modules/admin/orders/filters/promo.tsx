import { BooleanParam, useQueryParam } from 'use-query-params'

import fire from '@/assets/icons/fire.png'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const PromoFilter = () => {
    const [promo = 'all', setPromo] = useQueryParam('promo', BooleanParam)

    const handlePromoChange = (promo: string) => {
        if (promo === 'all') {
            setPromo(null)
        } else {
            setPromo(promo === 'promo' ? true : false)
        }
    }

    return (
        <Select
            defaultValue={promo === true ? 'promo' : promo === false ? 'no-promo' : 'all'}
            onValueChange={handlePromoChange}
        >
            <SelectTrigger>
                <SelectValue placeholder='Оберіть наявність зображення' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>Усі товари</SelectItem>
                <SelectItem value='promo'>
                    <div className='flex items-center gap-x-2'>
                        <img
                            className='w-3'
                            src={fire}
                            alt='fire'
                        />
                        Товари з промо ціною
                    </div>
                </SelectItem>
                <SelectItem value='no-promo'>Товари без промо ціни</SelectItem>
            </SelectContent>
        </Select>
    )
}
