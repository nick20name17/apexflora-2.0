import { useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const OrderingSelect = () => {
    const [ordering, setOrdering] = useState('name')

    return (
        <Select
            defaultValue={ordering}
            onValueChange={setOrdering}
        >
            <SelectTrigger className='w-40'>
                <SelectValue placeholder='Оберіть сортування' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='name'>За назвою (А-Я)</SelectItem>
                <SelectItem value='-name'>За назвою (Я-А)</SelectItem>
                <SelectItem value='category'>За категорією</SelectItem>
                <SelectItem value='price'>Найдорожчі</SelectItem>
                <SelectItem value='-price'>Найдешевші</SelectItem>
            </SelectContent>
        </Select>
    )
}
