import { BooleanParam, useQueryParam } from 'use-query-params'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const HasCode1cFilter = () => {
    const [hasCode1c = 'all', setHasCode1c] = useQueryParam('has-code-1c', BooleanParam)

    const handleHasCode1cChange = (hasCode1c: string) => {
        if (hasCode1c === 'all') {
            setHasCode1c(null)
        } else {
            setHasCode1c(hasCode1c === 'code' ? true : false)
        }
    }

    return (
        <Select
            defaultValue={
                hasCode1c === true ? 'code' : hasCode1c === false ? 'no-code' : 'all'
            }
            onValueChange={handleHasCode1cChange}
        >
            <SelectTrigger>
                <SelectValue placeholder='Оберіть наявність зображення' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>Усі товари</SelectItem>
                <SelectItem value='code'>Товари з кодом 1С</SelectItem>
                <SelectItem value='no-code'>Товари без коду 1С</SelectItem>
            </SelectContent>
        </Select>
    )
}
