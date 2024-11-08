import { AddCategoryModal } from '../../categories/modals/add'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useGetAllCategoriesQuery } from '@/store/api/categories/categories'

interface CategorylectProps {
    category: string
    setCategory: (categories: string) => void
}
export const CategorySelect = ({ category, setCategory }: CategorylectProps) => {
    const { data } = useGetAllCategoriesQuery({})

    return (
        <div className='flex items-center gap-2'>
            <Select
                defaultValue={category}
                onValueChange={setCategory}
            >
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть категорію' />
                </SelectTrigger>
                <SelectContent>
                    {data?.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                        >
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <AddCategoryModal size='icon' />
        </div>
    )
}
