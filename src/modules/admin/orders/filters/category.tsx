import { StringParam, useQueryParam } from 'use-query-params'

import { MultiSelect } from '@/components/ui/multi-select'
import { useGetAllCategoriesQuery } from '@/store/api/categories/categories'

export const CategoryFilter = () => {
    const [categories, setCategories] = useQueryParam('categories', StringParam)

    const { data } = useGetAllCategoriesQuery({})

    const categoriesOptions =
        data?.map((category) => ({
            label: category.name,
            value: category.id.toString()
        })) || []

    const handleCategoriesChange = (value: string[]) => {
        setCategories(value.length > 0 ? value.join(',') : null)
    }

    return (
        <MultiSelect
            modalPopover
            maxCount={1}
            options={categoriesOptions}
            onValueChange={handleCategoriesChange}
            defaultValue={categories ? categories.split(',') : []}
            placeholder='Оберіть категорії'
            animation={0}
        />
    )
}
