import { BooleanParam, useQueryParam } from 'use-query-params'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const IsVisibleFilter = () => {
    const [isVisible = 'all', setIsVisible] = useQueryParam('is-visible', BooleanParam)

    const handleIsVisibleChange = (isVisible: string) => {
        if (isVisible === 'all') {
            setIsVisible(null)
        } else {
            setIsVisible(isVisible === 'visible' ? true : false)
        }
    }

    return (
        <Select
            defaultValue={
                isVisible === true
                    ? 'visible'
                    : isVisible === false
                      ? 'no-visible'
                      : 'all'
            }
            onValueChange={handleIsVisibleChange}
        >
            <SelectTrigger>
                <SelectValue placeholder='Оберіть видимість товарів' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>Усі товари</SelectItem>
                <SelectItem value='visible'>Видимі товари</SelectItem>
                <SelectItem value='no-visible'>Приховані товари</SelectItem>
            </SelectContent>
        </Select>
    )
}
