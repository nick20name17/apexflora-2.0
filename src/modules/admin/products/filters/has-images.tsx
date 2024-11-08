import { BooleanParam, useQueryParam } from 'use-query-params'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const HasImagesFilter = () => {
    const [hasImage = 'all', setHasImage] = useQueryParam('has-image', BooleanParam)

    const handleHasImageChange = (hasImage: string) => {
        if (hasImage === 'all') {
            setHasImage(null)
        } else {
            setHasImage(hasImage === 'has-image' ? true : false)
        }
    }

    return (
        <Select
            defaultValue={
                hasImage === true ? 'has-image' : hasImage === false ? 'no-image' : 'all'
            }
            onValueChange={handleHasImageChange}
        >
            <SelectTrigger>
                <SelectValue placeholder='Оберіть наявність зображення' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>Усі товари</SelectItem>
                <SelectItem value='has-image'>Товари з зображенням</SelectItem>
                <SelectItem value='no-image'>Товари без зображення</SelectItem>
            </SelectContent>
        </Select>
    )
}
